"use client";

import { motion } from "framer-motion";

/**
 * AnimatedTextReveal — recreation of the Framer "Animated Text Reveal /
 * Scroll Reveal" component (framer.com/m/Scroll-reveal-1-1-a79i.js).
 *
 * Words transition from dim + blurred to bright + sharp, left → right, like a
 * reader's eye moving along the line. The original is scroll-driven; in this
 * fixed tile it auto-plays a clean cycle: reveal each word in sequence, hold
 * the full sentence, then fade all out together and replay.
 */

interface AnimatedTextRevealProps {
    text?: string;
    width?: number;
    height?: number;
    className?: string;
}

const DEFAULT_TEXT =
    "We design and build digital products, AI tools, and brands that move people.";

// cycle shape (fractions of the total duration)
const REVEAL_SPAN = 0.55; // all words have appeared by here
const WORD_FADE = 0.06; // per-word fade-in length
const HOLD_END = 0.86; // sentence stays fully lit until here, then clears

const AnimatedTextReveal = ({
    text = DEFAULT_TEXT,
    width = 240,
    height = 150,
    className,
}: AnimatedTextRevealProps) => {
    const words = text.split(" ");
    const n = words.length;

    return (
        <div
            className={`relative flex items-center overflow-hidden ${className ?? ""}`}
            style={{ width, height }}
        >
            <p className="flex flex-wrap gap-x-1 gap-y-0.5 px-4 font-base text-[12.5px] font-medium leading-relaxed text-white">
                {words.map((word, i) => {
                    const tStart = Math.max(0.001, (i / n) * REVEAL_SPAN);
                    const tEnd = Math.min(tStart + WORD_FADE, HOLD_END - 0.02);
                    return (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0.16, filter: "blur(4px)" }}
                            animate={{
                                opacity: [0.16, 0.16, 1, 1, 0.16],
                                filter: ["blur(4px)", "blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"],
                            }}
                            transition={{
                                duration: 5,
                                times: [0, tStart, tEnd, HOLD_END, 1],
                                ease: "easeOut",
                                repeat: Infinity,
                                repeatDelay: 0.3,
                            }}
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </p>
        </div>
    );
};

export default AnimatedTextReveal;
