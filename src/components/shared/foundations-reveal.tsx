"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "framer-motion";

/**
 * FoundationsReveal — app-icon tiles whose logos develop from blurred to sharp
 * as the section scrolls through the viewport (a scroll-reveal). Each tile is
 * mapped to a slice of the scroll progress, so they sharpen one after another.
 */

type Item = { name: string; logo: string };

const PALETTE = ["#201d1d", "#0f2747", "#1b1b1b", "#13294a", "#262321", "#10331f", "#2a1530", "#16273b"];

function Tile({
    item,
    bg,
    progress,
    range,
    fullColor = false,
}: {
    item: Item;
    bg: string;
    progress: MotionValue<number>;
    range: [number, number];
    fullColor?: boolean;
}) {
    const [start, end] = range;
    const mid = (start + end) / 2;

    const blur = useTransform(progress, [start, end], [10, 0]);
    const filterColor = useMotionTemplate`blur(${blur}px)`;
    const filterMono = useMotionTemplate`blur(${blur}px) brightness(0) invert(1)`;
    const filter = fullColor ? filterColor : filterMono;
    const logoOpacity = useTransform(progress, [start, end], [0.35, 1]);
    const logoScale = useTransform(progress, [start, end], [0.9, 1]);
    const nameOpacity = useTransform(progress, [mid, end], [0, 1]);
    const ringOpacity = useTransform(progress, [mid, end], [0, 1]);

    return (
        <div
            className="relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px] border border-white/10 p-4 shadow-[0_24px_50px_-26px_rgba(0,0,0,0.7)]"
            style={{ background: `linear-gradient(150deg, ${bg}, #1a1817)` }}
        >
            <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            {/* gold reveal ring */}
            <motion.span
                aria-hidden
                style={{ opacity: ringOpacity }}
                className="pointer-events-none absolute inset-0 rounded-[28px] ring-2 ring-inset ring-[#E6C565]/70"
            />
            {fullColor ? (
                <span className="flex size-14 items-center justify-center md:size-16">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                        src={item.logo}
                        alt={item.name}
                        draggable={false}
                        style={{ filter, opacity: logoOpacity, scale: logoScale }}
                        className="h-full w-full select-none object-contain"
                    />
                </span>
            ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <motion.img
                    src={item.logo}
                    alt={item.name}
                    draggable={false}
                    style={{ filter, opacity: logoOpacity, scale: logoScale }}
                    className="h-12 w-auto max-w-[52px] select-none object-contain md:h-14 md:max-w-[60px]"
                />
            )}
            <motion.span style={{ opacity: nameOpacity }} className="font-base text-[13px] font-medium text-white/80">
                {item.name}
            </motion.span>
        </div>
    );
}

export function FoundationsReveal({ items, fullColor = false }: { items: Item[]; fullColor?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
    const n = items.length;

    return (
        <div ref={ref} className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
            {items.map((item, i) => {
                const start = i / n;
                const end = Math.min(1, (i + 1.2) / n);
                return <Tile key={item.name} item={item} bg={PALETTE[i % PALETTE.length]} progress={scrollYProgress} range={[start, end]} fullColor={fullColor} />;
            })}
        </div>
    );
}
