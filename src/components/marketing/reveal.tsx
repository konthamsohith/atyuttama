"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** Stagger offset in seconds. */
    delay?: number;
    /** Initial vertical offset in px (use a negative value to drop in from above). */
    y?: number;
    /** Animate every time it enters the viewport, instead of just once. */
    repeat?: boolean;
}

/**
 * Reveal — a scroll-triggered fade/slide for individual elements.
 *
 * Fires when the element scrolls into view (a touch before it's fully visible),
 * so content "develops" down the page. Pass a staggered `delay` to siblings to
 * make a group reveal one after another.
 */
const Reveal = ({ children, className, delay = 0, y = 24, repeat = false }: RevealProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: !repeat, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
