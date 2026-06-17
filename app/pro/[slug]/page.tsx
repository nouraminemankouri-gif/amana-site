import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { BookingPicker } from "@/components/booking/BookingPicker";
import { getExpertBySlug } from "@/lib/experts";
import { SEED_EXPERTS } from "@/lib/seed-data";

export async function generateStaticParams() {
  return SEED_EXPERTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) return { title: "Expert" };
  const desc = `${expert.role ?? ""}. ${expert.intent ?? ""}. ${expert.format ?? ""}.`.trim();
  return {
    title: expert.nom,
    description: desc,
  };
}

export default async function ProPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) notFound();

  const services = (expert.services ?? []).map((s) => ({
    id: s.id,
    title: s.title,
    duration_minutes: s.duration_minutes,
    price_eur: s.price_eur,
  }));
  const isDemo = expert.isSeed || !expert.bookingEnabled;

  return (
    <>
      <PageHeading eyebrow={expert.universLabel} title={expert.nom} />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-16">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-5">
            <p className="font-display italic text-2xl text-[var(--sauge)]">
              {expert.pageBody?.saugeIntro ?? expert.intent ?? ""}
            </p>
            {expert.role && (
              <p className="mt-6 text-[0.7rem] uppercase tracking-[0.28em] text-[var(--encre-soft)]">
                {expert.role}
              </p>
            )}
            {expert.format && (
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.28em] text-[var(--encre-soft)]">
                {expert.format}
              </p>
            )}
          </Reveal>
          <Reveal delay={150} as="div" className="md:col-span-7">
            {expert.bio && (
              <p className="text-lg leading-[1.8] text-[var(--encre-soft)]">{expert.bio}</p>
            )}
          </Reveal>
        </div>
      </section>

      {expert.pageBody && expert.pageBody.items.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
          {expert.pageBody.sectionEyebrow && (
            <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
              <>{expert.pageBody.sectionEyebrow}</>
            </Reveal>
          )}
          <ul className="mt-12 space-y-12">
            {expert.pageBody.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 80} as="li">
                <>
                  <p className="font-display text-2xl md:text-3xl text-[var(--ink)]">→ {it.title}</p>
                  {it.duration && (
                    <p className="mt-3 text-[0.85rem] tracking-[0.18em] uppercase text-[var(--or)]">
                      {it.duration}
                    </p>
                  )}
                  {it.lines && it.lines.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {it.lines.map((line) => (
                        <li key={line} className="text-base md:text-lg text-[var(--encre-soft)]">
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                  {it.body && (
                    <p className="mt-6 max-w-[64ch] text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
                      {it.body}
                    </p>
                  )}
                </>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <section
        id="reservation"
        className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]"
      >
        <Reveal>
          <BookingPicker
            expertSlug={expert.slug}
            expertName={expert.nom}
            timezone={expert.timezone}
            services={services}
            isDemo={isDemo}
          />
        </Reveal>
      </section>
    </>
  );
}
