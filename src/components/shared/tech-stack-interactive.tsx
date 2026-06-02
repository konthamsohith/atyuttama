"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TechStackInteractive — "document cards" that open like a book.
 *
 * Each technology is a closed colour cover; click it and the cover swings open
 * on its spine (3D flip) to reveal the inside page with the full details.
 * Prev / next / dots move between technologies; auto-advances while closed.
 */

type Tech = {
    name: string;
    logo: string;
    subtitle: string;
    desc: string;
    tag: string;
    bg: string;
};

const STACK: Tech[] = [
    { name: "Next.js", logo: "/images/tech/nextjs.svg", tag: "Framework", subtitle: "Our React framework", desc: "The React framework we build on — server rendering, file-based routing, and image optimization that ship fast pages by default.", bg: "#111111" },
    { name: "React", logo: "/images/tech/react.svg", tag: "UI Library", subtitle: "Component-driven UI", desc: "Component-driven interfaces that stay maintainable as products grow, with a vast ecosystem behind every feature.", bg: "#0b84c7" },
    { name: "TypeScript", logo: "/images/tech/typescript.svg", tag: "Language", subtitle: "Typed, safe to scale", desc: "Static typing that catches bugs before they ship and keeps the codebase safe to change months down the line.", bg: "#2f6fbf" },
    { name: "Tailwind CSS", logo: "/images/tech/tailwind.svg", tag: "Styling", subtitle: "Styling, on-brand", desc: "Utility-first styling for pixel-perfect, consistent UI — fast to build and trivial to keep on-brand.", bg: "#1593c4" },
    { name: "Node.js", logo: "/images/tech/nodejs.svg", tag: "Runtime", subtitle: "Backend runtime", desc: "A battle-tested runtime for APIs and services that scale, sharing one language across the whole stack.", bg: "#3f7e3c" },
    { name: "PostgreSQL", logo: "/images/tech/postgresql.svg", tag: "Database", subtitle: "Relational database", desc: "A rock-solid relational database for data you can trust — strong guarantees, rich querying, proven at scale.", bg: "#336791" },
    { name: "MongoDB", logo: "/images/tech/mongodb.svg", tag: "Database", subtitle: "Document database", desc: "A flexible document store for fast-moving schemas and content-heavy products that evolve quickly.", bg: "#3a9134" },
    { name: "GraphQL", logo: "/images/tech/graphql.svg", tag: "API", subtitle: "Typed API layer", desc: "A typed API layer that lets the front end ask for exactly the data it needs — nothing more, nothing less.", bg: "#cc2f93" },
];

const DURATION = 4500;

export function TechStackInteractive() {
    const [active, setActive] = useState(0);
    const [open, setOpen] = useState(false);
    const [paused, setPaused] = useState(false);
    const total = STACK.length;
    const t = STACK[active];

    // auto-advance only while closed and not hovered
    useEffect(() => {
        if (paused || open) return;
        const id = setInterval(() => setActive((a) => (a + 1) % total), DURATION);
        return () => clearInterval(id);
    }, [paused, open, total]);

    const go = (i: number) => {
        setOpen(false);
        setActive((i + total) % total);
    };

    return (
        <div
            className="mt-12 flex w-full max-w-[380px] flex-col items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* book area — perspective lets the cover swing in 3D */}
            <div className="relative h-[460px] w-full [perspective:1800px]">
                {/* decorative stack behind */}
                {[2, 1].map((o) => {
                    const peek = STACK[(active + o) % total];
                    return (
                        <div
                            key={o}
                            aria-hidden
                            className="absolute inset-0 rounded-[24px] shadow-[0_20px_50px_-30px_rgba(32,29,29,0.5)]"
                            style={{
                                backgroundColor: peek.bg,
                                transform: `translateY(${o * 14}px) scale(${1 - o * 0.05})`,
                                opacity: 1 - o * 0.25,
                                zIndex: 0,
                            }}
                        />
                    );
                })}

                {/* ── INSIDE PAGE (revealed when open) ── */}
                <div className="absolute inset-0 z-[1] overflow-hidden rounded-[24px] border border-[#201D1D]/10 bg-white p-7 shadow-[0_30px_70px_-30px_rgba(32,29,29,0.45)]">
                    <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: t.bg }} />
                    <div className="flex h-full flex-col">
                        <div className="flex items-start justify-between">
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${t.bg}14` }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={t.logo} alt={t.name} className="h-7 w-auto max-w-[32px] object-contain" />
                            </span>
                            <span className="font-heading text-2xl leading-none text-[#201D1D]/15">
                                {String(active + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <h3 className="font-heading text-2xl font-normal tracking-tight text-[#201D1D]">{t.name}</h3>
                            <span className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest" style={{ backgroundColor: `${t.bg}14`, color: t.bg }}>
                                {t.tag}
                            </span>
                        </div>

                        <p className="mt-4 font-base text-[15px] leading-relaxed text-[#201D1D]/65">{t.desc}</p>

                        <div className="mt-auto flex items-center justify-between border-t border-[#201D1D]/10 pt-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#201D1D]/40">Our stack</span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#201D1D]/45 underline-offset-4 hover:text-[#201D1D] hover:underline cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── COVER (flips open) ── */}
                <motion.button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? `Close ${t.name}` : `Open ${t.name}`}
                    className="absolute inset-0 z-[2] origin-left rounded-[24px] [transform-style:preserve-3d] cursor-pointer"
                    animate={{ rotateY: open ? -158 : 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* front of cover */}
                    <span
                        className="absolute inset-0 flex flex-col rounded-[24px] p-7 text-left shadow-[0_30px_70px_-30px_rgba(32,29,29,0.5)] [backface-visibility:hidden]"
                        style={{ backgroundColor: t.bg }}
                    >
                        <span className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={t.logo}
                            alt={t.name}
                            className="h-9 w-auto max-w-[40px] object-contain"
                            style={{ filter: "brightness(0) invert(1)" }}
                        />
                        <span className="mt-auto">
                            <span className="block font-mono text-lg font-medium uppercase tracking-[0.12em] text-white md:text-xl">
                                {t.name}
                            </span>
                            <span className="mt-1.5 block font-base text-sm text-white/70">{t.subtitle}</span>
                            <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                                Tap to open
                            </span>
                        </span>
                    </span>

                    {/* back of cover (inside of the lid) */}
                    <span
                        className="absolute inset-0 rounded-[24px] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                        style={{ backgroundColor: t.bg, filter: "brightness(0.8)" }}
                    >
                        <span className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                    </span>
                </motion.button>
            </div>

            {/* ── Controls ── */}
            <div className="mt-7 flex items-center gap-5">
                <button
                    type="button"
                    aria-label="Previous"
                    onClick={() => go(active - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#201D1D]/15 bg-white text-[#201D1D] transition hover:border-[#E6C565] hover:bg-[#E6C565] cursor-pointer"
                >
                    <ChevronLeft className="size-5" />
                </button>

                <div className="flex items-center gap-2">
                    {STACK.map((s, i) => (
                        <button
                            key={s.name}
                            type="button"
                            aria-label={`Go to ${s.name}`}
                            onClick={() => go(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                i === active ? "w-6 bg-[#E6C565]" : "w-1.5 bg-[#201D1D]/15 hover:bg-[#201D1D]/30"
                            }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    aria-label="Next"
                    onClick={() => go(active + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#201D1D]/15 bg-white text-[#201D1D] transition hover:border-[#E6C565] hover:bg-[#E6C565] cursor-pointer"
                >
                    <ChevronRight className="size-5" />
                </button>
            </div>
        </div>
    );
}
