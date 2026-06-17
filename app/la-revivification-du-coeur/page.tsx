import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Quote } from "@/components/Quote";
import { MomentsForm } from "./MomentsForm";

export const metadata: Metadata = {
  title: "La revivification du cœur",
  description:
    "AMĀNA est là pour accompagner, faciliter et soutenir les croyants dans leur vie quotidienne, dans leurs épreuves et dans leur lien avec الله.",
  alternates: { canonical: "/la-revivification-du-coeur" },
};

export default function RevivificationPage() {
  return (
    <>
      <PageHeading
        eyebrow="La revivification du cœur"
        title="Revenir à l'essentiel, même au cœur du quotidien"
      />

      <section className="mx-auto max-w-[800px] px-6 md:px-10 pb-16 prose-amana">
        <Reveal as="p" className="font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
          <>
            AMĀNA est là pour accompagner, faciliter et soutenir les croyants dans leur vie quotidienne, dans leurs épreuves et dans leur lien avec <span className="ar">الله</span>.
          </>
        </Reveal>

        <Reveal delay={150} as="p" className="mt-12 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
          <>
            Nos journées sont pleines. Remplies de responsabilités, de sollicitations, de pensées qui s&apos;enchaînent. Et au milieu de tout cela … il y a ce lien, parfois fragile, que l&apos;on cherche à préserver.
          </>
        </Reveal>

        <Reveal delay={210} as="p" className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
          <>
            Ce moment où l&apos;on sait qu&apos;il est temps de se tourner vers <span className="ar">الله</span> …mais où le cœur est lourd, l&apos;esprit dispersé ou simplement fatigué.
          </>
        </Reveal>

        <Reveal delay={280} as="p" className="mt-10 font-display italic text-xl md:text-2xl text-[var(--sauge)] leading-[1.4]">
          <>AMĀNA est née aussi pour cela.</>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
          <>Nous ne vivons pas dans un monde qui facilite le rappel</>
        </Reveal>
        <Reveal delay={120} as="p" className="mt-8 max-w-[68ch] font-display italic text-xl md:text-2xl text-[var(--ink)] leading-[1.4]">
          <>Et ce que nous ressentons n&apos;est pas nouveau …</>
        </Reveal>
      </section>

      <Quote
        text={`"Les cœurs rouillent comme le fer rouille." On demanda : "Qu'est-ce qui les polit ?" Il répondit : "Le rappel d'Allah et la récitation du Coran."`}
        source="Rapporté par al-Bayhaqi"
      />

      <section className="mx-auto max-w-[800px] px-6 md:px-10 py-16 md:py-24 prose-amana">
        <Reveal as="p" className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
          <>
            Notre attention est sans cesse sollicitée, ce qui accélère nos rythmes, et éloigne parfois, sans même que l&apos;on s&apos;en rende compte. Et pourtant … le besoin de se reconnecter, lui, est toujours là.
          </>
        </Reveal>
        <Reveal delay={150} as="p" className="mt-6 font-display italic text-xl md:text-2xl text-[var(--sauge)] leading-[1.4]">
          <>Silencieux. Profond. Viscéral.</>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
          <>Une présence discrète, au moment où tu en as besoin</>
        </Reveal>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <Reveal delay={120} as="div" className="md:col-span-7 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              AMĀNA ne propose pas simplement des services, elle propose aussi une présence.
            </p>
            <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Une présence douce, non intrusive, qui te rappelle, qui t&apos;accompagne, qui te recentre.
            </p>
            <p className="mt-6 font-display italic text-xl md:text-2xl text-[var(--ink)] leading-[1.4]">
              Parfois, il ne s&apos;agit pas de faire plus. Il s&apos;agit simplement de revenir.
            </p>
          </Reveal>
          <Reveal delay={200} as="div" className="md:col-span-5 prose-amana">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--or)]">Notre intention :</p>
            <p className="mt-6 font-display italic text-lg md:text-xl text-[var(--ink)] leading-[1.5]">
              Accompagne sans remplacer &ndash; soutenir sans alourdir &ndash; rappeler sans imposer.
            </p>
            <p className="mt-6 text-base leading-[1.85] text-[var(--encre-soft)]">
              Chaque parole, chaque présence, chaque format est orienté vers une seule direction : se rapprocher d&apos; <span className="ar">الله</span>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
          <>Parce que parfois, il suffit d&apos;un rappel au bon moment</>
        </Reveal>
        <div className="mt-10 max-w-[68ch] prose-amana">
          <Reveal delay={120} as="p" className="font-display italic text-xl md:text-2xl text-[var(--ink)] leading-[1.4]">
            <>Un mot. Une voix. Un instant de pause … et le cœur s&apos;éveille à nouveau.</>
          </Reveal>
          <Reveal delay={200} as="p" className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            <>Ce que nous cherchons à offrir, c&apos;est cette facilité.</>
          </Reveal>
          <Reveal delay={260} as="p" className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            <>Dans un espace qui rassemble et accompagne avec sincérité.</>
          </Reveal>
          <Reveal delay={320} as="p" className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            <>Dans les moments importants, comme dans les moments ordinaires.</>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-6 md:px-10 py-24 md:py-32 border-t border-[rgba(31,42,42,0.08)]">
        <Reveal>
          <p className="font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
            Pour recevoir ces moments au cœur de ta journée, tu peux laisser ton numéro.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-12">
            <MomentsForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
