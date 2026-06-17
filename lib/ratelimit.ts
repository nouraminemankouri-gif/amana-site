import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Limiter = {
  limit: (key: string) => Promise<{ success: boolean; remaining: number; reset: number }>;
};

const noop: Limiter = {
  async limit() {
    return { success: true, remaining: 999, reset: Date.now() + 60_000 };
  },
};

let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (_redis) return _redis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  _redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return _redis;
}

export function buildLimiter(prefix: string, requests: number, window: `${number} ${"s" | "m" | "h"}`): Limiter {
  const redis = getRedis();
  if (!redis) return noop;
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix: `amana:${prefix}`,
    analytics: false,
  });
  return {
    async limit(key: string) {
      const r = await rl.limit(key);
      return { success: r.success, remaining: r.remaining, reset: r.reset };
    },
  };
}

export const availabilityLimiter = buildLimiter("availability", 60, "1 m");
export const bookingsLimiter = buildLimiter("bookings", 10, "1 m");
export const onboardingLimiter = buildLimiter("onboarding", 20, "1 m");

export function ipFromHeaders(h: Headers): string {
  const xf = h.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}
