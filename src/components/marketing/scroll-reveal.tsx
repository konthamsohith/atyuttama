"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "framer-motion";

/**
 * ScrollReveal — scroll-driven text reveal (the Framer "Scroll reveal" effect).
 *
 * The paragraph is split into words; as the element scrolls through the
 * viewport, `scrollYProgress` drives each word from dim + blurred to bright +
 * sharp, one after another, so the copy "develops" as the reader scrolls.
 */

interface ScrollRevealProps {
    text: string;
    className?: string;
}

const ScrollWord = ({
    children,
    progress,
    range,
}: {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0.12, 1]);
    const blurPx = useTransform(progress, range, [6, 0]);
    const filter = useMotionTemplate`blur(${blurPx}px)`;
    return (
        <motion.span className="mr-[0.25em] inline-block" style={{ opacity, filter }}>
            {children}
        </motion.span>
    );
};

const ScrollReveal = ({ text, className }: ScrollRevealProps) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "end 0.45"],
    });

    const words = text.split(" ");
    const total = words.length;

    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / total;
                const end = Math.min(1, (i + 1) / total);
                return (
                    <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </ScrollWord>
                );
            })}
        </p>
    );
};

export default ScrollReveal;
