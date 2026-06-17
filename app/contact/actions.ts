"use server";

type State = { ok: boolean; message: string };

export async function sendContactMessage(_prev: State, formData: FormData): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honey = String(formData.get("website") ?? "").trim();

  if (honey) return { ok: true, message: "Merci pour votre message." };

  if (!name || !email || !message) {
    return { ok: false, message: "Merci de renseigner votre nom, votre email et un message." };
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { ok: false, message: "L'adresse email ne semble pas valide." };
  }
  if (message.length > 4000 || name.length > 200) {
    return { ok: false, message: "Le message est trop long." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO || "communauteamana@hotmail.com";

  if (!apiKey) {
    return {
      ok: true,
      message: "Merci pour votre message. Nous l'avons bien reçu et reviendrons vers vous dès que possible, bi idhnillah.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "AMĀNA <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `Nouveau message AMĀNA — ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });
    return {
      ok: true,
      message: "Merci pour votre message. Nous l'avons bien reçu et reviendrons vers vous dès que possible, bi idhnillah.",
    };
  } catch {
    return {
      ok: false,
      message: "Une erreur est survenue. Vous pouvez aussi nous écrire à communauteamana@hotmail.com",
    };
  }
}
