"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * ExpandHoverList — a numbered list whose rows expand on hover (or tap) to
 * reveal a description. The active row's number, title, and arrow shift to the
 * brand accent; the rest stay muted. One row is always open (defaults to the
 * first), so it reads well on touch too.
 */

export type ExpandItem = {
    title: string;
    desc: string;
};

export function ExpandHoverList({ items }: { items: ExpandItem[] }) {
    const [active, setActive] = useState(0);

    return (
        <div className="mt-12 border-t border-[#201D1D]/12">
            {items.map((item, i) => {
                const isOpen = i === active;
                return (
                    <div
                        key={item.title}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => setActive(i)}
                        className="group cursor-pointer border-b border-[#201D1D]/12"
                    >
                        <div className="flex items-start gap-5 py-7 md:gap-8 md:py-8">
                            {/* index */}
                            <span
                                className={`shrink-0 font-heading text-2xl leading-none transition-colors duration-300 md:text-3xl ${
                                    isOpen ? "text-[#C9A646]" : "text-[#201D1D]/25 group-hover:text-[#201D1D]/40"
                                }`}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* title + expanding body */}
                            <div className="min-w-0 flex-1">
                                <h3
                                    className={`font-heading text-2xl font-normal tracking-tight transition-all duration-300 md:text-3xl lg:text-[2rem] ${
                                        isOpen
                                            ? "translate-x-0 text-[#201D1D]"
                                            : "text-[#201D1D]/35 group-hover:translate-x-1 group-hover:text-[#201D1D]/55"
                                    }`}
                                >
                                    {item.title}
                                </h3>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-3 max-w-xl font-base text-[15px] leading-relaxed text-[#201D1D]/60 md:text-base">
                                                {item.desc}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* arrow */}
                            <span
                                className={`mt-1 flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                    isOpen
                                        ? "bg-[#E6C565] text-[#201D1D]"
                                        : "bg-[#201D1D]/5 text-[#201D1D]/40 group-hover:bg-[#201D1D] group-hover:text-white"
                                }`}
                            >
                                <ArrowRight
                                    className={`size-5 transition-transform duration-300 ${isOpen ? "translate-x-0" : "group-hover:translate-x-0.5"}`}
                                    strokeWidth={1.8}
                                />
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
