"use client";
import { useState } from "react";

export type BookingFormValues = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessage: string;
  honeypot: string;
};

export function BookingForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (v: BookingFormValues) => void | Promise<void>;
  submitting: boolean;
}) {
  const [v, setV] = useState<BookingFormValues>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientMessage: "",
    honeypot: "",
  });
  const [err, setErr] = useState<string | null>(null);

  function handle<K extends keyof BookingFormValues>(k: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setV((s) => ({ ...s, [k]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (v.clientName.trim().length < 2) return setErr("Merci d'indiquer votre nom.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.clientEmail)) {
      return setErr("Merci d'indiquer un email valide.");
    }
    await onSubmit(v);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="b-name" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--encre-soft)]">
          Votre nom
        </label>
        <input
          id="b-name"
          required
          value={v.clientName}
          onChange={handle("clientName")}
          className="mt-2 w-full bg-transparent border-b border-[rgba(31,42,42,0.18)] py-2 text-[1rem] text-[var(--ink)] focus:border-[var(--sauge)] focus:outline-none transition-colors"
          autoComplete="name"
          maxLength={120}
        />
      </div>
      <div>
        <label htmlFor="b-email" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--encre-soft)]">
          Votre email
        </label>
        <input
          id="b-email"
          type="email"
          required
          value={v.clientEmail}
          onChange={handle("clientEmail")}
          className="mt-2 w-full bg-transparent border-b border-[rgba(31,42,42,0.18)] py-2 text-[1rem] text-[var(--ink)] focus:border-[var(--sauge)] focus:outline-none transition-colors"
          autoComplete="email"
          maxLength={180}
        />
      </div>
      <div>
        <label htmlFor="b-phone" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--encre-soft)]">
          Téléphone (facultatif)
        </label>
        <input
          id="b-phone"
          type="tel"
          value={v.clientPhone}
          onChange={handle("clientPhone")}
          className="mt-2 w-full bg-transparent border-b border-[rgba(31,42,42,0.18)] py-2 text-[1rem] text-[var(--ink)] focus:border-[var(--sauge)] focus:outline-none transition-colors"
          autoComplete="tel"
          maxLength={40}
        />
      </div>
      <div>
        <label htmlFor="b-msg" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--encre-soft)]">
          Quelques mots (facultatif)
        </label>
        <textarea
          id="b-msg"
          value={v.clientMessage}
          onChange={handle("clientMessage")}
          rows={4}
          className="mt-2 w-full bg-transparent border-b border-[rgba(31,42,42,0.18)] py-2 text-[1rem] text-[var(--ink)] focus:border-[var(--sauge)] focus:outline-none transition-colors resize-none"
          maxLength={4000}
        />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Site web
          <input
            tabIndex={-1}
            autoComplete="off"
            value={v.honeypot}
            onChange={handle("honeypot")}
          />
        </label>
      </div>
      {err && (
        <p role="alert" className="text-[0.85rem] text-[#a83232]">
          {err}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500 disabled:opacity-50"
      >
        {submitting ? "Envoi en cours…" : "Confirmer la réservation"}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
