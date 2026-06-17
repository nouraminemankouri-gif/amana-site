import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb, schema } from "./db";
import { encryptToken } from "./crypto";
import { eq } from "drizzle-orm";
import { GOOGLE_SCOPES, hasGoogleCreds } from "./google";
import { logAudit } from "./audit";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      isAdmin?: boolean;
      expertSlug?: string | null;
    } & DefaultSession["user"];
  }
}

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ??
  "reseauxalliancesolutions@gmail.com,communauteamana@hotmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const authConfigured = hasGoogleCreds();

const db = getDb();
const adapter = db
  ? DrizzleAdapter(db, {
      usersTable: schema.users,
      accountsTable: schema.accounts,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    })
  : undefined;

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter,
  trustHost: true,
  session: { strategy: db ? "database" : "jwt" },
  providers: hasGoogleCreds()
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              scope: GOOGLE_SCOPES.join(" "),
              access_type: "offline",
              prompt: "consent",
              include_granted_scopes: "true",
            },
          },
        }),
      ]
    : [],
  callbacks: {
    async signIn({ account, profile }) {
      // Sync tokens into experts table on Google sign in
      if (account?.provider !== "google" || !profile?.email) return true;
      const dbi = getDb();
      if (!dbi) return true;
      try {
        const email = String(profile.email).toLowerCase();
        const refreshTok = account.refresh_token ?? null;
        const accessTok = account.access_token ?? null;
        const expiresAt = account.expires_at
          ? new Date(account.expires_at * 1000)
          : new Date(Date.now() + 3500 * 1000);

        const existing = await dbi.query.experts.findFirst({
          where: eq(schema.experts.email, email),
        });
        if (existing) {
          const update: Partial<typeof schema.experts.$inferInsert> = {
            updatedAt: new Date(),
          };
          if (accessTok) update.googleAccessTokenEnc = encryptToken(accessTok);
          if (refreshTok) update.googleRefreshTokenEnc = encryptToken(refreshTok);
          if (account.scope) update.googleScope = account.scope;
          update.googleTokenExpiresAt = expiresAt;
          await dbi.update(schema.experts).set(update).where(eq(schema.experts.id, existing.id));
          await logAudit({ expertId: existing.id, action: "oauth.grant", payload: { email } });
        } else {
          const slug = email.split("@")[0]!.replace(/[^a-z0-9-]/g, "-").slice(0, 40) || `pro-${Date.now()}`;
          await dbi.insert(schema.experts).values({
            slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
            email,
            nom: (profile.name as string) || email,
            univers: "afiyah",
            googleAccessTokenEnc: accessTok ? encryptToken(accessTok) : null,
            googleRefreshTokenEnc: refreshTok ? encryptToken(refreshTok) : null,
            googleScope: account.scope ?? null,
            googleTokenExpiresAt: expiresAt,
            status: "draft",
          });
          await logAudit({ action: "oauth.grant.new", payload: { email } });
        }
      } catch (e) {
        console.error("[auth.signIn] sync expert failed", e);
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = (user?.id as string) ?? session.user.id;
        const email = (session.user.email ?? "").toLowerCase();
        session.user.isAdmin = ADMIN_EMAILS.includes(email);
        const dbi = getDb();
        if (dbi && email) {
          try {
            const exp = await dbi.query.experts.findFirst({
              where: eq(schema.experts.email, email),
            });
            session.user.expertSlug = exp?.slug ?? null;
          } catch {
            session.user.expertSlug = null;
          }
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/pro/onboarding",
  },
});

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
