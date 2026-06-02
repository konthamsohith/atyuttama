"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

type Category = {
    key: "essential" | "analytics" | "marketing" | "preferences";
    title: string;
    desc: string;
    locked?: boolean;
};

const CATEGORIES: Category[] = [
    { key: "essential", title: "Essential", desc: "Required for the site to work — security, navigation, and core features. Always on.", locked: true },
    { key: "analytics", title: "Analytics", desc: "Help us understand how the site is used so we can improve it. Anonymous and aggregated." },
    { key: "marketing", title: "Marketing", desc: "Used to measure campaigns and show relevant content. Off unless you turn them on." },
    { key: "preferences", title: "Preferences", desc: "Remember your choices, like theme or language, for a smoother visit." },
];

const STORAGE_KEY = "atyuttama_cookie_prefs";

export default function CookieSettingsPage() {
    const [prefs, setPrefs] = useState<Record<string, boolean>>({
        essential: true,
        analytics: true,
        marketing: false,
        preferences: true,
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setPrefs((p) => ({ ...p, ...JSON.parse(stored), essential: true }));
        } catch {
            /* ignore */
        }
    }, []);

    const toggle = (key: string, locked?: boolean) => {
        if (locked) return;
        setPrefs((p) => ({ ...p, [key]: !p[key] }));
        setSaved(false);
    };

    const save = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch {
            /* ignore */
        }
        setSaved(true);
    };

    return (
        <>
            <PageHero
                eyebrow="Legal"
                title="Cookie Settings"
                subtitle="You're in control. Choose which cookies we can use — essential ones keep the site working, the rest are up to you."
            />

            <div className="w-full bg-white py-16 lg:py-24">
                <Wrapper>
                    <Container>
                        <div className="mx-auto max-w-2xl">
                            <div className="flex flex-col gap-4">
                                {CATEGORIES.map((c) => {
                                    const on = prefs[c.key];
                                    return (
                                        <div
                                            key={c.key}
                                            className="flex items-start justify-between gap-6 rounded-2xl border border-[#201D1D]/10 bg-white p-6"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h2 className="font-heading text-lg font-normal text-[#201D1D]">{c.title}</h2>
                                                    {c.locked && (
                                                        <span className="rounded-md bg-[#F4F4F4] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#201D1D]/50">
                                                            Always on
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-2 font-base text-sm leading-relaxed text-[#201D1D]/60">{c.desc}</p>
                                            </div>
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={on}
                                                aria-label={`Toggle ${c.title} cookies`}
                                                disabled={c.locked}
                                                onClick={() => toggle(c.key, c.locked)}
                                                className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                                                    on ? "bg-[#E6C565]" : "bg-neutral-300"
                                                } ${c.locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                                            >
                                                <span
                                                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                                        on ? "translate-x-5" : "translate-x-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <Button
                                    onClick={save}
                                    style={{ borderRadius: "0.75rem" }}
                                    className="bg-[#201D1D] text-white hover:bg-neutral-800 font-base font-normal h-auto px-7 py-3.5 cursor-pointer shadow-lg"
                                >
                                    Save preferences
                                </Button>
                                {saved && <span className="font-base text-sm text-[#201D1D]/60">Saved — thanks.</span>}
                            </div>

                            <p className="mt-8 font-base text-sm leading-relaxed text-[#201D1D]/45">
                                Read more in our{" "}
                                <a href="/privacy-policy" className="underline underline-offset-2 hover:text-[#201D1D]">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                    </Container>
                </Wrapper>
            </div>
        </>
    );
}
