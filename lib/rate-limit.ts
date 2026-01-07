const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

export function rateLimit(key: string, limit: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    // Cleanup old entries periodically (simple optimization)
    if (rateLimitMap.size > 10000) {
        rateLimitMap.clear();
    }

    if (!record) {
        rateLimitMap.set(key, { count: 1, lastReset: now });
        return false;
    }

    if (now - record.lastReset > windowMs) {
        record.count = 1;
        record.lastReset = now;
        return false;
    }

    if (record.count >= limit) {
        return true;
    }

    record.count++;
    return false;
}
