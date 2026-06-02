"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FlowStep {
    title: string;
    image: string;
    /** Optional supporting line revealed under the active step. */
    desc?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 4200; // ms per auto-advance

/**
 * Step Flow — a recreation of the Framer "Step Flow" component:
 * a left column of numbered steps where the active step sits in a soft
 * rounded panel, paired with a large image on the right that crossfades
 * as the step changes. Auto-advances, pausing while hovered; hover or
 * click any step to jump to it.
 */
export function StepFlow({ steps, activeBg = "#F4F4F4" }: { steps: FlowStep[]; activeBg?: string }) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    // single self-resetting timer: every step change (auto OR manual) clears the
    // old timeout and schedules exactly one next advance, so it can never skip.
    useEffect(() => {
        if (paused) return;
        const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), DURATION);
        return () => clearTimeout(id);
    }, [active, paused, steps.length]);

    return (
        <div
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* step list */}
            <div className="flex flex-col gap-1.5">
                {steps.map((s, i) => {
                    const isActive = i === active;
                    return (
                        <button
                            key={s.title}
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            onClick={() => setActive(i)}
                            className={`relative w-full rounded-2xl px-6 py-5 text-left transition-colors duration-300 lg:px-7 lg:py-6 ${
                                isActive ? "shadow-sm" : "hover:bg-[#F4F4F4]/55"
                            }`}
                            style={isActive ? { backgroundColor: activeBg } : undefined}
                        >
                            <span
                                className={`absolute right-6 top-4 font-base text-xs tabular-nums transition-colors duration-300 lg:right-7 ${
                                    isActive ? "text-[#201D1D]/45" : "text-[#201D1D]/30"
                                }`}
                            >
                                0{i + 1}
                            </span>
                            <span
                                className={`block font-heading font-normal leading-tight tracking-tight transition-colors duration-300 text-2xl lg:text-[30px] ${
                                    isActive ? "text-[#201D1D]" : "text-[#201D1D]/55"
                                }`}
                            >
                                {s.title}
                            </span>
                            {s.desc && (
                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            transition={{ duration: 0.4, ease: EASE }}
                                            className="max-w-md overflow-hidden font-base text-[15px] leading-relaxed text-[#201D1D]/55"
                                        >
                                            {s.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* image */}
            <div className="relative">
                <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-3xl bg-[#201D1D]/5 shadow-[0_36px_80px_-40px_rgba(32,29,29,0.4)] ring-1 ring-[#201D1D]/10">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={active}
                            src={steps[active].image}
                            alt={steps[active].title}
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
