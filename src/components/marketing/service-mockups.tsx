"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 1, 0.5, 1] as const; // Cinematic smooth deceleration curve

/* ----------------------------------------------------------------------------------
   Full-bleed image preview — the mockup image fills the entire section.
---------------------------------------------------------------------------------- */
const FullImageMock = ({ src, alt, label }: { src: string; alt: string; label: string }) => (
    <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
    >
        {/* The mockup image, filling the whole panel */}
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />

        {/* Volumetric light sweep */}
        <motion.div
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-10 pointer-events-none"
            animate={{ x: ["-120%", "260%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
        {/* Soft depth vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 z-10 pointer-events-none" />

        {/* Tiny HUD system tag */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/[0.05] font-mono text-[6.5px] text-[#E6C565]">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-[0.2em] truncate max-w-[180px]">{label}</span>
        </div>
    </motion.div>
);

const MOCKUPS = [
    { src: "/mockups/app%20development.png", alt: "App Development" },
    { src: "/mockups/Ai%20Solution.png", alt: "AI Solution" },
    { src: "/mockups/web.png", alt: "Web Development" },
    { src: "/mockups/digital.png", alt: "Digital Marketing" },
    { src: "/mockups/uiux.png", alt: "UI/UX Design" },
];

export const ServiceMockup = ({ index, label }: { index: number; label: string }) => {
    const mock = MOCKUPS[index] ?? MOCKUPS[0];
    return <FullImageMock src={mock.src} alt={mock.alt} label={label} />;
};

export default ServiceMockup;
