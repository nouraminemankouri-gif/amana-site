-- AMĀNA initial schema

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Auth.js users
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text,
  "email" text NOT NULL,
  "emailVerified" timestamptz,
  "image" text
);

CREATE TABLE IF NOT EXISTS "account" (
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "provider" text NOT NULL,
  "providerAccountId" text NOT NULL,
  "refresh_token" text,
  "access_token" text,
  "expires_at" integer,
  "token_type" text,
  "scope" text,
  "id_token" text,
  "session_state" text,
  PRIMARY KEY ("provider", "providerAccountId")
);

CREATE TABLE IF NOT EXISTS "session" (
  "sessionToken" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "expires" timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS "verificationToken" (
  "identifier" text NOT NULL,
  "token" text NOT NULL,
  "expires" timestamptz NOT NULL,
  PRIMARY KEY ("identifier", "token")
);

-- Experts
CREATE TABLE IF NOT EXISTS "experts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" text NOT NULL UNIQUE,
  "email" text NOT NULL UNIQUE,
  "nom" text NOT NULL,
  "intent" text,
  "role" text,
  "bio" text,
  "univers" text NOT NULL,
  "photo_url" text,
  "format" text,
  "google_calendar_id" text,
  "google_refresh_token_enc" text,
  "google_access_token_enc" text,
  "google_token_expires_at" timestamptz,
  "google_scope" text,
  "timezone" text NOT NULL DEFAULT 'Europe/Paris',
  "availability_rules" jsonb NOT NULL DEFAULT '{
    "weekdays": {},
    "slot_duration_minutes": 60,
    "buffer_minutes": 15,
    "min_notice_hours": 24,
    "max_advance_days": 60,
    "excluded_dates": []
  }'::jsonb,
  "services" jsonb,
  "status" text NOT NULL DEFAULT 'draft',
  "charte_signed_at" timestamptz,
  "charte_ip" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "experts_status_idx" ON "experts" ("status");
CREATE INDEX IF NOT EXISTS "experts_univers_idx" ON "experts" ("univers");

-- Bookings
CREATE TABLE IF NOT EXISTS "bookings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "expert_id" uuid NOT NULL REFERENCES "experts"("id") ON DELETE CASCADE,
  "service_id" text,
  "slot_start" timestamptz NOT NULL,
  "slot_end" timestamptz NOT NULL,
  "client_name" text NOT NULL,
  "client_email" text NOT NULL,
  "client_phone" text,
  "client_message" text,
  "google_event_id" text,
  "status" text NOT NULL DEFAULT 'confirmed',
  "cancellation_reason" text,
  "cancelled_at" timestamptz,
  "cancel_token" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "bookings_expert_idx" ON "bookings" ("expert_id");
CREATE INDEX IF NOT EXISTS "bookings_slot_idx" ON "bookings" ("slot_start");
CREATE UNIQUE INDEX IF NOT EXISTS "bookings_unique_active_slot" ON "bookings" ("expert_id", "slot_start") WHERE "status" = 'confirmed';

-- Audit log
CREATE TABLE IF NOT EXISTS "audit_log" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "expert_id" uuid REFERENCES "experts"("id") ON DELETE SET NULL,
  "action" text NOT NULL,
  "payload" jsonb,
  "ip" text,
  "ua" text,
  "hmac" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "audit_action_idx" ON "audit_log" ("action");
CREATE INDEX IF NOT EXISTS "audit_created_idx" ON "audit_log" ("created_at" DESC);
