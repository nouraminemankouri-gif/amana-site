"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { fr } from "date-fns/locale";
import { addDays, isSameDay, startOfDay } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { SlotGrid } from "./SlotGrid";
import { BookingForm, type BookingFormValues } from "./BookingForm";
import { BookingConfirmation } from "./BookingConfirmation";

type Slot = { start: string; end: string };
type Service = { id: string; title: string; duration_minutes: number; price_eur: number | null };

type Mode = "live" | "demo" | "inactive";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BookingPicker({
  expertSlug,
  expertName,
  timezone,
  services,
  isDemo,
}: {
  expertSlug: string;
  expertName: string;
  timezone: string;
  services: Service[];
  isDemo: boolean;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [serviceId, setServiceId] = useState<string | null>(services[0]?.id ?? null);
  const [day, setDay] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [mode, setMode] = useState<Mode>("demo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    slotStart: string;
    serviceTitle: string | null;
    googleSynced: boolean;
    clientEmail: string;
  } | null>(null);

  const today = useMemo(() => startOfDay(new Date()), []);

  // Fetch slots once when component mounts
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const from = new Date();
        const to = addDays(from, 30);
        const url = `/api/availability/${encodeURIComponent(expertSlug)}?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`fetch ${res.status}`);
        const j = (await res.json()) as { slots: Slot[]; mode: Mode };
        if (cancelled) return;
        setAllSlots(j.slots ?? []);
        setMode(j.mode ?? "demo");
      } catch (e) {
        if (!cancelled) setError("Impossible de charger les disponibilités. Réessayez plus tard.");
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [expertSlug]);

  // Slots per selected day
  useEffect(() => {
    if (!day) {
      setSlots([]);
      return;
    }
    const filtered = allSlots.filter((s) => {
      const z = toZonedTime(new Date(s.start), timezone);
      return isSameDay(startOfDay(z), startOfDay(toZonedTime(day, timezone)));
    });
    setSlots(filtered);
  }, [day, allSlots, timezone]);

  // Days that have at least one slot
  const enabledDays = useMemo(() => {
    const set = new Set<string>();
    for (const s of allSlots) {
      const z = toZonedTime(new Date(s.start), timezone);
      set.add(formatInTimeZone(z, timezone, "yyyy-MM-dd"));
    }
    return set;
  }, [allSlots, timezone]);

  const isDayDisabled = (d: Date) => {
    const key = formatInTimeZone(d, timezone, "yyyy-MM-dd");
    return !enabledDays.has(key);
  };

  async function submitBooking(v: BookingFormValues) {
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertSlug,
          slotStart: selectedSlot,
          serviceId: serviceId ?? undefined,
          clientName: v.clientName.trim(),
          clientEmail: v.clientEmail.trim(),
          clientPhone: v.clientPhone.trim() || null,
          clientMessage: v.clientMessage.trim() || null,
          honeypot: v.honeypot,
        }),
      });
      const j = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        message?: string;
        slotStart?: string;
        serviceTitle?: string | null;
        googleSynced?: boolean;
      };
      if (!res.ok || !j.ok) {
        if (res.status === 503) {
          setError(
            j.message ??
              "Le système de réservation en ligne sera ouvert très bientôt. Écrivez à communauteamana@hotmail.com pour entrer en relation.",
          );
          setSubmitting(false);
          return;
        }
        if (j.error === "slot_taken") {
          setError("Ce créneau vient d'être réservé. Choisissez-en un autre.");
        } else if (j.error === "rate_limited") {
          setError("Trop de tentatives. Réessayez dans une minute.");
        } else {
          setError("Une erreur est survenue. Réessayez ou écrivez à communauteamana@hotmail.com.");
        }
        setSubmitting(false);
        return;
      }
      setConfirmation({
        slotStart: j.slotStart ?? selectedSlot,
        serviceTitle: j.serviceTitle ?? null,
        googleSynced: Boolean(j.googleSynced),
        clientEmail: v.clientEmail.trim(),
      });
      setStep(4);
    } catch (e) {
      console.error(e);
      setError("Une erreur réseau est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedService = services.find((s) => s.id === serviceId) ?? services[0] ?? null;

  return (
    <div className="border border-[rgba(31,42,42,0.12)] bg-[var(--bg)] p-6 md:p-10">
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)] ornament-line">
          <span>Prendre rendez-vous</span>
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--encre-soft)]">
          Étape {Math.min(step, 3)} / 3
        </p>
      </div>

      {(isDemo || mode === "demo") && (
        <p className="mt-6 text-[0.8rem] text-[var(--encre-soft)] italic leading-[1.6]">
          Cette fiche est en mode démonstration. Les créneaux affichés sont indicatifs.
          La réservation en ligne sera ouverte très bientôt, bi idhniLlah.
        </p>
      )}

      <div aria-live="polite" className="sr-only">
        {loading ? "Chargement des créneaux" : ""}
        {error ?? ""}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section
            key="s1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-10"
          >
            {services.length > 1 && (
              <div className="mb-10">
                <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--encre-soft)]">
                  Choisir une formule
                </p>
                <div className="mt-4 grid gap-3">
                  {services.map((s) => {
                    const sel = serviceId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setServiceId(s.id)}
                        aria-pressed={sel}
                        className={`text-left px-5 py-4 border transition-colors ${
                          sel
                            ? "border-[var(--sauge)] bg-[rgba(90,111,90,0.06)]"
                            : "border-[rgba(31,42,42,0.16)] hover:border-[var(--sauge)]"
                        }`}
                      >
                        <p className="font-display text-lg text-[var(--ink)]">{s.title}</p>
                        <p className="mt-1 text-[0.85rem] text-[var(--encre-soft)]">
                          {s.duration_minutes} min{s.price_eur != null ? ` · ${s.price_eur}€` : ""}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--encre-soft)]">
              Choisir une date
            </p>
            <div className="mt-4 amana-daypicker">
              <DayPicker
                mode="single"
                locale={fr}
                weekStartsOn={1}
                selected={day ?? undefined}
                onSelect={(d) => {
                  if (d) {
                    setDay(d);
                    setStep(2);
                    setSelectedSlot(null);
                  }
                }}
                disabled={[{ before: today }, isDayDisabled]}
                fromMonth={today}
                toMonth={addDays(today, 60)}
              />
            </div>
            {loading && (
              <p className="mt-4 text-[0.85rem] text-[var(--encre-soft)] italic">
                Chargement des disponibilités…
              </p>
            )}
            {error && (
              <p className="mt-4 text-[0.85rem] text-[#a83232]">{error}</p>
            )}
          </motion.section>
        )}

        {step === 2 && day && (
          <motion.section
            key="s2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-10"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="font-display text-2xl text-[var(--ink)]">
                {formatInTimeZone(day, timezone, "EEEE d MMMM", { locale: fr })}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSelectedSlot(null);
                }}
                className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--encre-soft)] hover:text-[var(--sauge)] transition-colors"
              >
                ← Changer de date
              </button>
            </div>
            <div className="mt-6">
              <SlotGrid
                slots={slots}
                timezone={timezone}
                selected={selectedSlot}
                onSelect={(iso) => {
                  setSelectedSlot(iso);
                  setStep(3);
                }}
              />
            </div>
          </motion.section>
        )}

        {step === 3 && selectedSlot && (
          <motion.section
            key="s3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-10"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="font-display italic text-xl text-[var(--sauge)]">
                {formatInTimeZone(new Date(selectedSlot), timezone, "EEEE d MMMM, HH:mm", { locale: fr })}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                }}
                className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--encre-soft)] hover:text-[var(--sauge)] transition-colors"
              >
                ← Changer d&apos;horaire
              </button>
            </div>
            {selectedService && (
              <p className="mt-2 text-[0.85rem] text-[var(--encre-soft)]">
                {selectedService.title} · {selectedService.duration_minutes} min
                {selectedService.price_eur != null ? ` · ${selectedService.price_eur}€` : ""}
              </p>
            )}
            <div className="mt-8">
              <BookingForm onSubmit={submitBooking} submitting={submitting} />
            </div>
            {error && (
              <p role="alert" className="mt-4 text-[0.85rem] text-[#a83232]">
                {error}
              </p>
            )}
          </motion.section>
        )}

        {step === 4 && confirmation && (
          <motion.section
            key="s4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-10"
          >
            <BookingConfirmation
              expertName={expertName}
              serviceTitle={confirmation.serviceTitle}
              slotStart={confirmation.slotStart}
              timezone={timezone}
              googleSynced={confirmation.googleSynced}
              clientEmail={confirmation.clientEmail}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
