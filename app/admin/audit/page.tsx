import { PageHeading } from "@/components/PageHeading";
import { getDb, schema } from "@/lib/db";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminAudit() {
  const db = getDb()!;
  const rows = await db.select().from(schema.auditLog).orderBy(desc(schema.auditLog.createdAt)).limit(300);
  return (
    <>
      <PageHeading eyebrow="Administration" title="Journal d'audit" />
      <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-32 font-sans-amana text-[0.85rem]">
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="border-b border-[rgba(31,42,42,0.08)] py-2">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--or)]">
                {new Date(r.createdAt).toISOString()} · {r.action}
              </p>
              <p className="text-[var(--encre-soft)] break-all">
                hmac {r.hmac.slice(0, 16)}…
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
