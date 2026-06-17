import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écrivez à AMĀNA. Chaque message est lu avec attention.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeading
        eyebrow="Contact"
        title="Amāna est un projet, porté par une intention sincère et une vision collective."
        intro="Si vous souhaitez nous contacter, poser une question, partager une idée ou manifester votre intérêt pour la plateforme, vous pouvez nous écrire."
      />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-16">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-5">
            <p className="font-display italic text-2xl text-[var(--ink)] leading-[1.4] max-w-[28ch]">
              Chaque message est lu avec attention.
            </p>
            <p className="mt-8 text-[var(--encre-soft)] leading-[1.8]">
              Nous vous remercions pour votre patience et votre bienveillance.
            </p>
            <p className="mt-6 text-[var(--encre-soft)] leading-[1.8]">
              Les réservations sont actuellement traitées de manière personnalisée, afin de garantir un accompagnement attentif et parfaitement adapté à chaque besoin.
            </p>
            <p className="mt-12 font-display italic text-xl text-[var(--sauge)]">
              Qu&apos; <span className="ar">الله</span> mette la baraka dans chaque intention sincère.
            </p>
          </Reveal>

          <Reveal delay={120} as="div" className="md:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
