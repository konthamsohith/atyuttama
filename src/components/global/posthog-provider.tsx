"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";

/**
 * Captures a $pageview on every App Router navigation.
 * (We disable PostHog's automatic pageview capture and do it here so SPA
 * route changes are tracked correctly.)
 */
function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const ph = usePostHog();

    useEffect(() => {
        if (!pathname || !ph) return;
        let url = window.origin + pathname;
        const query = searchParams.toString();
        if (query) url += "?" + query;
        ph.capture("$pageview", { $current_url: url });
    }, [pathname, searchParams, ph]);

    return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        // Skip init if the key isn't configured yet (e.g. the placeholder in .env.local).
        if (!key || key.startsWith("phc_REPLACE")) return;

        posthog.init(key, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
            capture_pageview: false, // handled manually below for the App Router
            capture_pageleave: true,
            person_profiles: "identified_only",
        });
    }, []);

    return (
        <PHProvider client={posthog}>
            <Suspense fallback={null}>
                <PostHogPageView />
            </Suspense>
            {children}
        </PHProvider>
    );
}

export default PostHogProvider;
