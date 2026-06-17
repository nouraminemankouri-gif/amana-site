import { createHmac } from "node:crypto";
import { getDb } from "./db";
import { auditLog } from "./schema";

export type AuditEntry = {
  expertId?: string | null;
  action: string;
  payload?: Record<string, unknown> | null;
  ip?: string | null;
  ua?: string | null;
};

function sign(input: string): string {
  const key = process.env.AUDIT_HMAC_KEY;
  if (!key) return "no-key";
  return createHmac("sha256", key).update(input).digest("hex");
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  const db = getDb();
  const createdAt = new Date().toISOString();
  const payloadStr = JSON.stringify(entry.payload ?? {});
  const hmac = sign(`${entry.expertId ?? ""}|${entry.action}|${payloadStr}|${createdAt}`);
  if (!db) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[audit:nodb]", entry.action, hmac.slice(0, 12));
    }
    return;
  }
  try {
    await db.insert(auditLog).values({
      expertId: entry.expertId ?? null,
      action: entry.action,
      payload: entry.payload ?? {},
      ip: entry.ip ?? null,
      ua: entry.ua ?? null,
      hmac,
    });
  } catch (e) {
    console.error("[audit] write failed", e);
  }
}
