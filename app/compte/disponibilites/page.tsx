import { auth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function DisponibilitesPage() {
  const session = await auth();
  const email = (session?.user?.email ?? "").toLowerCase();
  const db = getDb()!;
  const expert = await db.query.experts.findFirst({ where: eq(schema.experts.email, email) });
  const rules = expert?.availabilityRules;

  return (
    <>
      <PageHeading eyebrow="Espace expert" title="Mes disponibilités" />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 space-y-8">
        <Reveal>
          <p className="text-[0.95rem] text-[var(--encre-soft)] leading-[1.8]">
            Vos disponibilités sont calculées à partir de votre agenda Google. Les plages ci-dessous définissent les fenêtres dans lesquelles AMĀNA cherche des créneaux libres.
          </p>
        </Reveal>
        {rules && (
          <Reveal delay={100}>
            <pre className="text-[0.8rem] text-[var(--encre-soft)] bg-[var(--ivoire-deep)] p-6 overflow-auto leading-[1.6]">
{JSON.stringify(rules, null, 2)}
            </pre>
          </Reveal>
        )}
        <Reveal delay={200}>
          <p className="text-[0.85rem] text-[var(--encre-soft)] italic">
            L&apos;édition fine des règles arrive très bientôt. En attendant, écrivez à AMĀNA pour les ajuster.
          </p>
        </Reveal>
      </section>
    </>
  );
}
