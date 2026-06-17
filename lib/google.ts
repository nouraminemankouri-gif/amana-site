import { google } from "googleapis";
import { encryptToken, decryptToken } from "./crypto";
import { getDb } from "./db";
import { experts as expertsTable } from "./schema";
import { eq } from "drizzle-orm";
import { logAudit } from "./audit";
import { SITE } from "./site";

export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "openid",
];

export function hasGoogleCreds(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function newOAuth2Client() {
  if (!hasGoogleCreds()) throw new Error("GOOGLE_CLIENT_ID/SECRET missing");
  const baseUrl = process.env.NEXTAUTH_URL ?? SITE.url;
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${baseUrl}/api/auth/callback/google`,
  );
}

type ExpertRow = typeof expertsTable.$inferSelect;

async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const wait = 250 * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

export async function ensureFreshAccessToken(expert: ExpertRow): Promise<string | null> {
  if (!expert.googleRefreshTokenEnc) return null;
  const now = Date.now();
  const exp = expert.googleTokenExpiresAt ? new Date(expert.googleTokenExpiresAt).getTime() : 0;
  if (expert.googleAccessTokenEnc && exp > now + 60_000) {
    try {
      return decryptToken(expert.googleAccessTokenEnc);
    } catch {
      // fall through to refresh
    }
  }
  const refresh = decryptToken(expert.googleRefreshTokenEnc);
  const oauth2 = newOAuth2Client();
  oauth2.setCredentials({ refresh_token: refresh });
  try {
    const { credentials } = await withRetry(() => oauth2.refreshAccessToken());
    const access = credentials.access_token!;
    const expiresAt = credentials.expiry_date ? new Date(credentials.expiry_date) : new Date(now + 3500 * 1000);
    const db = getDb();
    if (db) {
      await db
        .update(expertsTable)
        .set({
          googleAccessTokenEnc: encryptToken(access),
          googleTokenExpiresAt: expiresAt,
          updatedAt: new Date(),
        })
        .where(eq(expertsTable.id, expert.id));
    }
    return access;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("invalid_grant")) {
      const db = getDb();
      if (db) {
        await db
          .update(expertsTable)
          .set({ status: "paused", updatedAt: new Date() })
          .where(eq(expertsTable.id, expert.id));
      }
      await logAudit({
        expertId: expert.id,
        action: "oauth.invalid_grant",
        payload: { email: expert.email },
      });
      try {
        if (process.env.RESEND_API_KEY) {
          const { Resend } = await import("resend");
          const r = new Resend(process.env.RESEND_API_KEY);
          await r.emails.send({
            from: "AMĀNA <onboarding@resend.dev>",
            to: ["communauteamana@hotmail.com"],
            subject: "AMĀNA — token Google invalide",
            text: `L'expert ${expert.email} (${expert.slug}) a un token Google invalide. Le profil est passé en pause.`,
          });
        }
      } catch {}
    }
    throw e;
  }
}

export async function getFreeBusy(expert: ExpertRow, fromIso: string, toIso: string) {
  const access = await ensureFreshAccessToken(expert);
  if (!access) return [];
  const oauth2 = newOAuth2Client();
  oauth2.setCredentials({ access_token: access });
  const cal = google.calendar({ version: "v3", auth: oauth2 });
  const calId = expert.googleCalendarId ?? "primary";
  const res = await withRetry(() =>
    cal.freebusy.query({
      requestBody: {
        timeMin: fromIso,
        timeMax: toIso,
        items: [{ id: calId }],
        timeZone: expert.timezone,
      },
    }),
  );
  const busy = res.data.calendars?.[calId]?.busy ?? [];
  return busy.map((b) => ({ start: b.start!, end: b.end! }));
}

export async function createCalendarEvent(params: {
  expert: ExpertRow;
  serviceTitle: string;
  startIso: string;
  endIso: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  message?: string | null;
}): Promise<string | null> {
  const { expert } = params;
  const access = await ensureFreshAccessToken(expert);
  if (!access) return null;
  const oauth2 = newOAuth2Client();
  oauth2.setCredentials({ access_token: access });
  const cal = google.calendar({ version: "v3", auth: oauth2 });

  const description = [
    `Réservation AMĀNA`,
    `Service : ${params.serviceTitle}`,
    `Client : ${params.clientName} <${params.clientEmail}>`,
    params.clientPhone ? `Téléphone : ${params.clientPhone}` : null,
    params.message ? `\nMessage :\n${params.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await withRetry(() =>
    cal.events.insert({
      calendarId: expert.googleCalendarId ?? "primary",
      sendUpdates: "all",
      requestBody: {
        summary: `AMĀNA — ${params.serviceTitle}`,
        description,
        start: { dateTime: params.startIso, timeZone: expert.timezone },
        end: { dateTime: params.endIso, timeZone: expert.timezone },
        attendees: [
          { email: params.clientEmail, displayName: params.clientName },
          { email: expert.email, displayName: expert.nom, organizer: true },
        ],
        reminders: { useDefault: true },
      },
    }),
  );
  return res.data.id ?? null;
}

export async function deleteCalendarEvent(expert: ExpertRow, eventId: string): Promise<void> {
  const access = await ensureFreshAccessToken(expert);
  if (!access) return;
  const oauth2 = newOAuth2Client();
  oauth2.setCredentials({ access_token: access });
  const cal = google.calendar({ version: "v3", auth: oauth2 });
  await withRetry(() =>
    cal.events.delete({
      calendarId: expert.googleCalendarId ?? "primary",
      eventId,
      sendUpdates: "all",
    }),
  );
}

export async function revokeRefreshToken(refreshTokenPlain: string): Promise<void> {
  try {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(refreshTokenPlain)}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch {
    // best effort
  }
}
