"use client";
import { signIn } from "next-auth/react";

export function GoogleConnectButton({ disabled, label }: { disabled?: boolean; label?: string }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => signIn("google", { callbackUrl: "/compte" })}
      className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500 disabled:opacity-50"
    >
      {label ?? "Connecter mon agenda Google"}
      <span aria-hidden>→</span>
    </button>
  );
}
