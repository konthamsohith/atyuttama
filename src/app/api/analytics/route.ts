import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const HOST = process.env.POSTHOG_API_HOST || "https://us.posthog.com";
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const PERSONAL_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const API_KEY = process.env.ANALYTICS_API_KEY;

// CORS so your other dashboard (different origin) can call this endpoint.
const cors: Record<string, string> = {
    "Access-Control-Allow-Origin": process.env.ANALYTICS_ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, x-api-key, Content-Type",
};

async function hogql(query: string): Promise<unknown[][]> {
    const res = await fetch(`${HOST}/api/projects/${PROJECT_ID}/query/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PERSONAL_KEY}`,
        },
        body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
        cache: "no-store",
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`PostHog query failed (${res.status}): ${text.slice(0, 300)}`);
    }
    const data = (await res.json()) as { results?: unknown[][] };
    return data.results ?? [];
}

const pair = (rows: unknown[][]) => rows.map((r) => ({ label: String(r[0]), count: Number(r[1]) || 0 }));

export function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: cors });
}

export async function GET(req: NextRequest) {
    const provided =
        req.headers.get("x-api-key") ||
        (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");

    if (!API_KEY || provided !== API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: cors });
    }
    if (!PROJECT_ID || !PERSONAL_KEY) {
        return NextResponse.json(
            { error: "Server not configured: set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY." },
            { status: 500, headers: cors }
        );
    }

    const days = Math.min(365, Math.max(1, Number(req.nextUrl.searchParams.get("days")) || 30));
    const since = `now() - INTERVAL ${days} DAY`;

    // Optional ?host=example.com filter (sanitized to prevent injection).
    const rawHost = req.nextUrl.searchParams.get("host") || "";
    const host = /^[a-zA-Z0-9.:_-]+$/.test(rawHost) ? rawHost : "";
    const hostFilter = host ? ` AND properties.$host = '${host}'` : "";

    const pv = `event = '$pageview' AND timestamp >= ${since}${hostFilter}`;

    try {
        const [totals, daily, topPages, referrers, devices, countries, topEvents] = await Promise.all([
            hogql(`SELECT count() AS pageviews, count(DISTINCT person_id) AS visitors FROM events WHERE ${pv}`),
            hogql(
                `SELECT toDate(timestamp) AS day, count() AS pageviews, count(DISTINCT person_id) AS visitors
                 FROM events WHERE ${pv} GROUP BY day ORDER BY day`
            ),
            hogql(
                `SELECT properties.$current_url AS url, count() AS views
                 FROM events WHERE ${pv} GROUP BY url ORDER BY views DESC LIMIT 10`
            ),
            hogql(
                `SELECT coalesce(nullIf(properties.$referring_domain, ''), '(direct / none)') AS referrer, count() AS views
                 FROM events WHERE ${pv} GROUP BY referrer ORDER BY views DESC LIMIT 10`
            ),
            hogql(
                `SELECT coalesce(properties.$device_type, 'Unknown') AS device, count() AS views
                 FROM events WHERE ${pv} GROUP BY device ORDER BY views DESC`
            ),
            hogql(
                `SELECT coalesce(properties.$geoip_country_name, 'Unknown') AS country, count(DISTINCT person_id) AS visitors
                 FROM events WHERE ${pv} GROUP BY country ORDER BY visitors DESC LIMIT 10`
            ),
            hogql(
                `SELECT event, count() AS count
                 FROM events WHERE timestamp >= ${since}${hostFilter} AND event NOT LIKE '$%'
                 GROUP BY event ORDER BY count DESC LIMIT 10`
            ),
        ]);

        const [pageviews = 0, visitors = 0] = (totals[0] as number[]) ?? [];

        return NextResponse.json(
            {
                range: { days, host: host || null },
                totals: { pageviews: Number(pageviews) || 0, visitors: Number(visitors) || 0 },
                daily: daily.map((r) => ({
                    day: r[0],
                    pageviews: Number(r[1]) || 0,
                    visitors: Number(r[2]) || 0,
                })),
                topPages: topPages.map((r) => ({ url: r[0], views: Number(r[1]) || 0 })),
                topReferrers: pair(referrers).map((r) => ({ referrer: r.label, views: r.count })),
                devices: pair(devices).map((r) => ({ device: r.label, views: r.count })),
                countries: countries.map((r) => ({ country: r[0], visitors: Number(r[1]) || 0 })),
                topEvents: pair(topEvents).map((r) => ({ event: r.label, count: r.count })),
                generatedAt: new Date().toISOString(),
            },
            { headers: cors }
        );
    } catch (e) {
        const message = e instanceof Error ? e.message : "Query failed";
        return NextResponse.json({ error: message }, { status: 502, headers: cors });
    }
}
