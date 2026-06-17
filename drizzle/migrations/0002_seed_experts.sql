-- Seed des deux experts existants : Coach Rachida et Dar Balkis
-- Lecture seule depuis lib/seed-data.ts si la DB est vide. Cette migration insère
-- les profils dans la table experts pour activer le workflow connecté.

INSERT INTO "experts" (
  "slug", "email", "nom", "intent", "role", "bio", "univers", "format",
  "timezone", "availability_rules", "services", "status"
) VALUES
(
  'coach-rachida',
  'coach.rachida@amana.demo',
  'COACH Rachida',
  'Révélatrice de guerrières',
  'Coaching sportif et alimentaire',
  'Je vous accompagne à retrouver un équilibre durable, avec douceur et exigence.',
  'afiyah',
  'Distanciel',
  'Europe/Paris',
  '{
    "weekdays": {
      "monday": [{"start":"09:00","end":"12:00"},{"start":"14:00","end":"18:00"}],
      "tuesday": [{"start":"09:00","end":"12:00"},{"start":"14:00","end":"18:00"}],
      "wednesday": [{"start":"09:00","end":"12:00"}],
      "thursday": [{"start":"09:00","end":"12:00"},{"start":"14:00","end":"18:00"}],
      "friday": [{"start":"09:00","end":"12:00"}]
    },
    "slot_duration_minutes": 60,
    "buffer_minutes": 15,
    "min_notice_hours": 24,
    "max_advance_days": 45,
    "excluded_dates": []
  }'::jsonb,
  '[
    {"id":"individuel-1h","title":"Coaching individuel live (zoom) — séance 1h","duration_minutes":60,"price_eur":39},
    {"id":"groupe-1h","title":"Coaching en groupe live (zoom) — séance 1h","duration_minutes":60,"price_eur":39}
  ]'::jsonb,
  'draft'
),
(
  'dar-balkis',
  'dar.balkis@amana.demo',
  'DAR Balkis',
  'Gardienne du savoir féminin',
  'Infirmière spécialisée en santé féminine',
  'J''accompagne les femmes à mieux se connaître, remettre Allah au juste milieu et se reconnecter à leur fitrah.',
  'afiyah',
  'Distanciel',
  'Europe/Paris',
  '{
    "weekdays": {
      "monday": [{"start":"09:00","end":"12:00"},{"start":"14:00","end":"18:00"}],
      "tuesday": [{"start":"09:00","end":"12:00"},{"start":"14:00","end":"18:00"}],
      "wednesday": [{"start":"09:00","end":"12:00"}],
      "thursday": [{"start":"09:00","end":"12:00"},{"start":"14:00","end":"18:00"}],
      "friday": [{"start":"09:00","end":"12:00"}]
    },
    "slot_duration_minutes": 90,
    "buffer_minutes": 15,
    "min_notice_hours": 24,
    "max_advance_days": 45,
    "excluded_dates": []
  }'::jsonb,
  '[
    {"id":"atelier-cycle","title":"À la découverte du cycle féminin — 1h30","duration_minutes":90,"price_eur":65},
    {"id":"atelier-puberte","title":"En route vers la puberté — 1h45","duration_minutes":105,"price_eur":55}
  ]'::jsonb,
  'draft'
)
ON CONFLICT (slug) DO NOTHING;
