"use client";
import { useState } from "react";

export function MomentsForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p
        role="status"
        className="font-display italic text-xl md:text-2xl text-[var(--sauge)] leading-[1.4]"
      >
        Barak Allahou Fikoum
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-8"
    >
      <label className="block">
        <span className="block text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)] mb-3">
          Prénom
        </span>
        <input
          required
          type="text"
          name="firstname"
          autoComplete="given-name"
          maxLength={120}
          className="w-full bg-transparent border-0 border-b border-[rgba(31,42,42,0.2)] focus:border-[var(--sauge)] outline-none py-3 text-lg text-[var(--ink)] transition-colors"
        />
      </label>

      <label className="block">
        <span className="block text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)] mb-3">
          Numéro de téléphone <span aria-hidden className="text-[var(--or)]">*</span>
        </span>
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={30}
          className="w-full bg-transparent border-0 border-b border-[rgba(31,42,42,0.2)] focus:border-[var(--sauge)] outline-none py-3 text-lg text-[var(--ink)] transition-colors"
        />
      </label>

      <label className="flex items-start gap-3 text-[0.85rem] leading-[1.6] text-[var(--encre-soft)]">
        <input
          required
          type="checkbox"
          name="consent"
          className="mt-1 accent-[var(--sauge)]"
        />
        <span>
          En cochant cette case, j&apos;accepte de recevoir les « Moments AMĀNA » et que mes données soient utilisées uniquement dans ce cadre.
          <br />
          Vous pouvez vous désinscrire à tout moment via un lien présent dans les messages.
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
      >
        Soumettre
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
