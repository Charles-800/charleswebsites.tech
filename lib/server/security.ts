import { NextRequest } from 'next/server';

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateBuckets = new Map<string, RateLimitBucket>();

function pruneExpiredBuckets(now: number): void {
  if (rateBuckets.size < 500) return;
  for (const [key, bucket] of rateBuckets.entries()) {
    if (bucket.resetAt <= now) {
      rateBuckets.delete(key);
    }
  }
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'unknown';
}

export function checkRateLimit(
  namespace: string,
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${namespace}:${identifier}`;
  const existing = rateBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');

  // Allow server-to-server or same-origin calls where browsers omit Origin header
  if (!origin) return true;
  if (!host) return false;

  try {
    const originHost = new URL(origin).host.toLowerCase();
    if (originHost === host.toLowerCase()) return true;

    const configuredUrls = [
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.SITE_URL,
      process.env.APP_URL,
    ];
    for (const rawUrl of configuredUrls) {
      if (!rawUrl || rawUrl === 'MY_APP_URL' || !rawUrl.startsWith('http')) continue;
      if (new URL(rawUrl).host.toLowerCase() === originHost) return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function sanitizeSingleLine(input: string, maxLength: number): string {
  return input
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}
