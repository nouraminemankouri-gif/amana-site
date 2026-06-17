import {
  pgTable,
  text,
  uuid,
  timestamp,
  jsonb,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ---------- AMANA tables ----------

export type AvailabilityRules = {
  weekdays: Partial<
    Record<
      "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
      Array<{ start: string; end: string }>
    >
  >;
  slot_duration_minutes: number;
  buffer_minutes: number;
  min_notice_hours: number;
  max_advance_days: number;
  excluded_dates: string[];
};

export type ServiceItem = {
  id: string;
  title: string;
  duration_minutes: number;
  price_eur: number | null;
  description?: string;
};

export const experts = pgTable("experts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  email: text("email").notNull().unique(),
  nom: text("nom").notNull(),
  intent: text("intent"),
  role: text("role"),
  bio: text("bio"),
  univers: text("univers").notNull(),
  photoUrl: text("photo_url"),
  format: text("format"),

  googleCalendarId: text("google_calendar_id"),
  googleRefreshTokenEnc: text("google_refresh_token_enc"),
  googleAccessTokenEnc: text("google_access_token_enc"),
  googleTokenExpiresAt: timestamp("google_token_expires_at", { withTimezone: true }),
  googleScope: text("google_scope"),

  timezone: text("timezone").notNull().default("Europe/Paris"),
  availabilityRules: jsonb("availability_rules")
    .$type<AvailabilityRules>()
    .notNull()
    .default(sql`'{
      "weekdays": {},
      "slot_duration_minutes": 60,
      "buffer_minutes": 15,
      "min_notice_hours": 24,
      "max_advance_days": 60,
      "excluded_dates": []
    }'::jsonb`),

  services: jsonb("services").$type<ServiceItem[]>(),

  status: text("status").notNull().default("draft"),
  charteSignedAt: timestamp("charte_signed_at", { withTimezone: true }),
  charteIp: text("charte_ip"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  expertId: uuid("expert_id")
    .notNull()
    .references(() => experts.id, { onDelete: "cascade" }),
  serviceId: text("service_id"),
  slotStart: timestamp("slot_start", { withTimezone: true }).notNull(),
  slotEnd: timestamp("slot_end", { withTimezone: true }).notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  clientMessage: text("client_message"),
  googleEventId: text("google_event_id"),
  status: text("status").notNull().default("confirmed"),
  cancellationReason: text("cancellation_reason"),
  cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  cancelToken: text("cancel_token"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const auditLog = pgTable("audit_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  expertId: uuid("expert_id").references(() => experts.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  payload: jsonb("payload"),
  ip: text("ip"),
  ua: text("ua"),
  hmac: text("hmac").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- Auth.js standard tables (Drizzle adapter compatible) ----------

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date", withTimezone: true }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    pk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
  },
  (vt) => ({
    pk: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
