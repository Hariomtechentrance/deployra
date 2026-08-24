import "server-only";

/**
 * In-memory sliding-window rate limiter, keyed per route + client IP.
 *
 * This holds state in the Node process, so it only works correctly on a
 * single instance. Render's starter plan runs one instance, so this is
 * sufficient today; if this ever scales to multiple instances, swap this
 * for a shared store (e.g. Redis) so limits are enforced across instances.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

// Sweep expired buckets periodically so this map doesn't grow unbounded.
setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  },
  5 * 60 * 1000,
).unref();

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Returns true if the request is within limits, false if it should be
 * rejected with a 429. `windowMs` is the sliding window size, `max` is how
 * many requests are allowed within that window.
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= max) return false;

  bucket.count += 1;
  return true;
}
