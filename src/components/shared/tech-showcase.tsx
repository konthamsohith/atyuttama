"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * TechShowcase — "Modern Technologies" section.
 *
 * Left: heading + copy + a button. Right: a folder sitting on glowing rings;
 * clicking the folder (or the button) fans the tech logos out along a dotted
 * arc above it, each a dark tile with its colour logo and name.
 */

type Item = { name: string; logo: string };

const VB_W = 1000;
const VB_H = 600;
const LIGHT_TILE = new Set(["AWS", "Next.js"]); // dark logos that need a light tile

const FOLDER = { x: 500, y: 520 }; // origin the tiles fly out from (viewBox units)

// Scattered cloud above the folder (viewBox units): tiles spread roughly even
// across the width with per-item jitter, and a pseudo-random vertical position,
// so they land scattered rather than on a neat arc. Deterministic (no Math.random)
// so server and client render the same positions.
const SC_X0 = 110;
const SC_X1 = 890;
const SC_Y0 = 55;
const SC_Y1 = 235; // band kept ABOVE the box
const GOLDEN = 0.6180339887; // low-discrepancy: every height different, looks random not tiered
const frac = (x: number) => x - Math.floor(x);
function scatterAt(i: number, n: number) {
    // Even horizontal spacing keeps every neighbour apart (gap > tile width), so
    // each tile gets a UNIQUE height from a golden-ratio sequence — spread across
    // the whole band, non-repeating, reads as a true scatter with no overlap.
    const t = n > 1 ? i / (n - 1) : 0.5;
    const x = SC_X0 + (SC_X1 - SC_X0) * t;
    const y = SC_Y0 + (SC_Y1 - SC_Y0) * frac(0.13 + i * GOLDEN);
    return { x, y };
}

export function TechShowcase({
    items,
    eyebrow = "Built with",
    title,
    desc = "We use modern, proven tools and frameworks to build fast, scalable, and reliable products.",
    hint = "Our modern stack",
    centerIcon,
    centerImage = "/images/folder-223.png",
    openImage,
}: {
    items: Item[];
    eyebrow?: string;
    title?: ReactNode;
    desc?: string;
    hint?: string;
    centerIcon?: ReactNode;
    centerImage?: string;
    /** When set, `centerImage` shows while closed and this cross-fades in while open. */
    openImage?: string;
}) {
    const stageRef = useRef<HTMLDivElement>(null);
    const [stageW, setStageW] = useState(0);
    const n = items.length;
    const pts = items.map((_, i) => scatterAt(i, n));

    // Purely scroll-driven: the box opens when it scrolls into view and closes
    // when it leaves — triggered on the box's OWN visibility, with a -12% bottom
    // margin so it opens just as it comes up the screen and closes as it exits.
    const boxRef = useRef<HTMLDivElement>(null);
    const open = useInView(boxRef, { amount: 0.4, margin: "0px 0px -12% 0px" });

    // measure the stage so we can convert viewBox units → px for the fly-out
    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;
        setStageW(el.clientWidth);
        const ro = new ResizeObserver(([e]) => setStageW(e.contentRect.width));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    const sf = stageW / VB_W; // scale factor (uniform, container keeps the viewBox aspect)

    return (
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* ── Left: copy ── */}
            <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#E6C565]">{eyebrow}</span>
                <h2 className="mt-5 font-heading text-4xl font-normal leading-[1.04] tracking-tight text-white md:text-5xl lg:text-6xl">
                    {title ?? (
                        <>
                            Modern
                            <br />
                            <span className="text-[#E6C565]">Technologies</span>
                        </>
                    )}
                </h2>
                <p className="mt-6 max-w-md font-base text-lg leading-relaxed text-white/55">{desc}</p>
            </div>

            {/* ── Right: folder + arc ── */}
            <div className="relative mx-auto w-full max-w-[600px]">
                <div ref={stageRef} className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
                    {/* glowing ground rings */}
                    <div className="pointer-events-none absolute bottom-[8%] left-1/2 -translate-x-1/2">
                        <div className="absolute left-1/2 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E6C565]/15 blur-[60px]" />
                        <div className="absolute left-1/2 top-1/2 h-24 w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] border border-[#E6C565]/15" />
                        <div className="absolute left-1/2 top-1/2 h-36 w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] border border-dashed border-white/10" />
                    </div>

                    {/* scattered marker dots */}
                    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" fill="none">
                        {pts.map((p, i) => (
                            <motion.circle
                                key={i}
                                cx={p.x}
                                cy={p.y}
                                r={3}
                                fill="#E6C565"
                                animate={{ opacity: open ? 0.7 : 0 }}
                                transition={{ duration: 0.3, delay: open ? i * 0.05 : (n - 1 - i) * 0.04 }}
                            />
                        ))}
                    </svg>

                    {/* logo tiles */}
                    {items.map((it, i) => {
                        const p = pts[i];
                        const light = LIGHT_TILE.has(it.name);
                        // closed offset: from this tile's arc spot back to the folder (px)
                        const dx = (FOLDER.x - p.x) * sf;
                        const dy = (FOLDER.y - p.y) * sf;
                        return (
                            // outer = position only (pure CSS, stays put)
                            <div
                                key={it.name}
                                className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%` }}
                            >
                                {/* inner = animated: flies out from the folder, then back in */}
                                <motion.div
                                    className="flex flex-col items-center"
                                    initial={false}
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        scale: open ? 1 : 0.2,
                                        x: open ? 0 : dx,
                                        y: open ? 0 : dy,
                                    }}
                                    transition={{
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: open ? 0.12 + i * 0.06 : (n - 1 - i) * 0.05,
                                    }}
                                >
                                    <div
                                        className={`flex size-11 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-sm md:size-12 ${
                                            light ? "border-black/5 bg-white" : "border-white/10 bg-white/[0.06]"
                                        }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={it.logo} alt={it.name} draggable={false} className="h-5 w-auto max-w-[24px] object-contain md:h-6 md:max-w-[28px]" />
                                    </div>
                                    <span className="mt-1.5 whitespace-nowrap font-base text-[10px] font-medium text-white/70">{it.name}</span>
                                </motion.div>
                            </div>
                        );
                    })}

                    {/* center: tools icon (if provided) or the folder */}
                    <div ref={boxRef} className="absolute bottom-[-6%] left-1/2 z-20 -translate-x-1/2">
                        {centerIcon ? (
                            <motion.div
                                initial={false}
                                animate={{ scale: open ? 0.8 : 1.05, y: open ? 8 : 0 }}
                                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                className="flex items-end justify-center"
                            >
                                <span className="relative flex size-24 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#E6C565] to-[#c79a3c] text-[#201D1D] shadow-[0_24px_55px_-18px_rgba(230,197,101,0.55)] ring-1 ring-white/20 md:size-28">
                                    <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
                                    {centerIcon}
                                </span>
                            </motion.div>
                        ) : openImage ? (
                            <motion.div
                                initial={false}
                                animate={{ scale: open ? 1.12 : 1, y: open ? -6 : 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                className="relative aspect-square w-[160px] origin-bottom select-none md:w-[185px]"
                            >
                                {/* closed */}
                                <motion.img
                                    src={centerImage}
                                    alt="Our tech box"
                                    draggable={false}
                                    initial={false}
                                    animate={{ opacity: open ? 0 : 1, scale: open ? 0.94 : 1 }}
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className="absolute inset-0 h-full w-full object-contain"
                                />
                                {/* open */}
                                <motion.img
                                    src={openImage}
                                    alt="Our tech box, open"
                                    draggable={false}
                                    initial={false}
                                    animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.94 }}
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className="absolute inset-0 h-full w-full object-contain"
                                />
                            </motion.div>
                        ) : (
                            <motion.img
                                src={centerImage}
                                alt="Our tech"
                                draggable={false}
                                initial={false}
                                animate={{ scale: open ? 0.7 : 1.1, y: open ? 10 : 0 }}
                                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                className="h-auto w-[240px] origin-bottom select-none md:w-[300px]"
                            />
                        )}
                    </div>
                </div>

                {/* hint */}
                <div className="mt-1 flex flex-col items-center gap-1 text-white/40">
                    <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                        <ChevronDown className="size-4" />
                    </motion.span>
                    <span className="font-base text-xs">{open ? hint : "Scroll to open"}</span>
                </div>
            </div>
        </div>
    );
}
