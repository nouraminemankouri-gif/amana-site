"use client";
import { useActionState } from "react";
import { sendContactMessage } from "./actions";

const initial = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initial);

  return (
    <form action={formAction} className="space-y-8">
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      <Field label="Nom" required>
        <input
          required
          type="text"
          name="name"
          autoComplete="name"
          maxLength={200}
          className="w-full bg-transparent border-0 border-b border-[rgba(31,42,42,0.2)] focus:border-[var(--sauge)] outline-none py-3 text-lg text-[var(--ink)] transition-colors"
        />
      </Field>

      <Field label="E-mail" required>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="w-full bg-transparent border-0 border-b border-[rgba(31,42,42,0.2)] focus:border-[var(--sauge)] outline-none py-3 text-lg text-[var(--ink)] transition-colors"
        />
      </Field>

      <Field label="Message" required>
        <textarea
          required
          name="message"
          rows={6}
          maxLength={4000}
          className="w-full bg-transparent border border-[rgba(31,42,42,0.2)] focus:border-[var(--sauge)] outline-none p-4 text-lg text-[var(--ink)] transition-colors resize-y"
        />
      </Field>

      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500 disabled:opacity-50"
        >
          {pending ? "Envoi" : "Nous contacter"}
          <span aria-hidden>→</span>
        </button>

        {state.message && (
          <p
            role={state.ok ? "status" : "alert"}
            className={`text-[0.85rem] ${state.ok ? "text-[var(--sauge)]" : "text-[#a23a2e]"}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)] mb-3">
        {label} {required && <span aria-hidden className="text-[var(--or)]">*</span>}
      </span>
      {children}
    </label>
  );
}
