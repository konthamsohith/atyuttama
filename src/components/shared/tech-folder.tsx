"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * TechFolder — a folder that spills its contents on click.
 *
 * Closed, it reads "Click to view our tech". Click it and the front flap tips
 * open while the tech logos fan up and out of the folder in a staggered arch.
 * Click again and they tuck back in.
 */

type Item = { name: string; logo: string };

const CHIP = 64; // px, tile size

export function TechFolder({ items, label = "Click to view our tech" }: { items: Item[]; label?: string }) {
    const [open, setOpen] = useState(false);
    const n = items.length;

    return (
        <div className="mt-8 flex w-full flex-col items-center">
            <div
                className="relative flex w-full max-w-2xl items-end justify-center transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ height: open ? 340 : 190 }}
            >
                {/* soft gold glow behind the folder */}
                <div className="pointer-events-none absolute bottom-6 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full bg-[#E6C565]/15 blur-[70px]" />

                {/* ── flying logo chips ── */}
                {items.map((it, i) => {
                    const t = n > 1 ? i / (n - 1) - 0.5 : 0; // -0.5 .. 0.5
                    const x = t * 520; // horizontal spread
                    const y = -130 + Math.abs(t) * 48; // arch: middle highest
                    const rotate = t * 18;
                    return (
                        <motion.div
                            key={it.name}
                            className="absolute bottom-[112px] flex flex-col items-center"
                            style={{ left: "50%", marginLeft: -CHIP / 2, zIndex: 10 }}
                            initial={false}
                            animate={{
                                x: open ? x : 0,
                                y: open ? y : -8,
                                rotate: open ? rotate : 0,
                                opacity: open ? 1 : 0,
                                scale: open ? 1 : 0.5,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 240,
                                damping: 20,
                                delay: open ? i * 0.05 : (n - 1 - i) * 0.03,
                            }}
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_14px_30px_-12px_rgba(32,29,29,0.35)] ring-1 ring-black/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={it.logo} alt={it.name} draggable={false} className="h-8 w-auto max-w-[36px] object-contain" />
                            </div>
                            <span className="mt-2 whitespace-nowrap font-base text-[11px] font-medium text-white/75">
                                {it.name}
                            </span>
                        </motion.div>
                    );
                })}

                {/* ── folder (image) ── */}
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-label={open ? "Hide tech" : "View our tech"}
                    className="relative z-20 flex cursor-pointer flex-col items-center"
                >
                    <motion.img
                        src="/images/folder-223.png"
                        alt="Our tech folder"
                        draggable={false}
                        animate={{ y: open ? 3 : 0, scale: open ? 1.04 : 1 }}
                        whileHover={{ scale: open ? 1.04 : 1.03 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="h-auto w-[150px] select-none"
                    />
                    <span className="mt-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                        <span className={`inline-block transition-transform duration-300 ${open ? "rotate-90" : ""}`}>▸</span>
                        {open ? "Close" : label}
                    </span>
                </button>
            </div>
        </div>
    );
}
