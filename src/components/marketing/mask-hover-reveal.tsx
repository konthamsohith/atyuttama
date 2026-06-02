"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

/**
 * MaskHoverReveal — recreation of the Framer "Lorenzo Interactive Portrait"
 * (framer.com/m/LorenzoInteractivePortrait-oP29.js).
 *
 * A grayscale base image with a full-colour copy revealed through a circular
 * mask that tracks the cursor in real time (no spring smoothing, like the
 * source). The reveal fades out when the cursor leaves.
 */

interface MaskHoverRevealProps {
    image?: string;
    width?: number;
    height?: number;
    /** Reveal circle radius in px. */
    radius?: number;
    className?: string;
}

const MaskHoverReveal = ({
    image = "/images/testimonials/person1.jpg",
    width = 240,
    height = 150,
    radius = 58,
    className,
}: MaskHoverRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const mx = useMotionValue(50);
    const my = useMotionValue(50);

    const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${mx}% ${my}%, #000 55%, rgba(0,0,0,0.45) 78%, transparent 100%)`;

    const onMove = (e: React.MouseEvent) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
    };

    return (
        <div
            ref={ref}
            onMouseEnter={() => setActive(true)}
            onMouseMove={onMove}
            onMouseLeave={() => setActive(false)}
            className={`relative overflow-hidden rounded-md ${className ?? ""}`}
            style={{ width, height }}
        >
            {/* Base layer — grayscale */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})`, filter: "grayscale(1) brightness(0.5) contrast(1.05)" }}
            />

            {/* Reveal layer — full colour through the cursor mask */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    WebkitMaskImage: mask,
                    maskImage: mask,
                }}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: active ? 0.12 : 0.4, ease: "easeOut" }}
            />

            {/* subtle vignette + label, matching the tile chrome */}
            <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/10" />
            <span className="pointer-events-none absolute left-2 top-2 z-10 font-mono text-[8px] uppercase tracking-widest text-white/60">
                Reveal
            </span>
        </div>
    );
};

export default MaskHoverReveal;
