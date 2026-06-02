"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * MagneticHoverCards — recreation of the Framer "social grid" component
 * (framer.com/m/social-grid-gP9vhs.js).
 *
 * A grid of brand wordmarks, each cell framed with corner registration
 * brackets and sitting on a highlighted panel. A soft highlight band slowly
 * slides down through each panel on a loop (staggered per cell).
 *
 * Logos are lightweight wordmark/glyph approximations; swap `logos` to supply
 * real artwork.
 */

// ---- glyphs ----------------------------------------------------------------

const burst = (spokes: number) => (
    <svg width="13" height="13" viewBox="0 0 24 24" className="shrink-0">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {Array.from({ length: spokes }).map((_, i) => {
                const a = (Math.PI / (spokes / 2)) * i;
                const r = (n: number) => Number(n.toFixed(3));
                return (
                    <line
                        key={i}
                        x1={r(12 + Math.cos(a) * 3)}
                        y1={r(12 + Math.sin(a) * 3)}
                        x2={r(12 + Math.cos(a) * 10)}
                        y2={r(12 + Math.sin(a) * 10)}
                    />
                );
            })}
        </g>
    </svg>
);

// OpenAI "blossom" mark.
const OpenAIGlyph = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" className="shrink-0" fill="currentColor" aria-hidden>
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
);

// Grok slashed-circle mark.
const GrokGlyph = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="8.3" />
        <path d="M19 5 8 16" />
    </svg>
);

// ---- logos -----------------------------------------------------------------

const Logo = ({ glyph, children, italic }: { glyph?: ReactNode; children: ReactNode; italic?: boolean }) => (
    <span className={`flex items-center gap-1.5 text-[12px] font-medium leading-none tracking-tight text-white ${italic ? "italic font-heading" : ""}`}>
        {glyph}
        {children}
    </span>
);

const DEFAULT_LOGOS: ReactNode[] = [
    <Logo key="brandson" italic>brandson</Logo>,
    <Logo key="openai" glyph={<OpenAIGlyph />}>OpenAI</Logo>,
    <Logo key="perplexity" glyph={burst(8)}>perplexity</Logo>,
    <Logo key="m1ke" italic>m1ke</Logo>,
    <Logo key="claude" glyph={burst(12)}>Claude</Logo>,
    <Logo key="grok" glyph={<GrokGlyph />}>Grok</Logo>,
];

// ---- cell ------------------------------------------------------------------

const Bracket = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
    const base = "pointer-events-none absolute z-20 h-2 w-2 border-white/30";
    const map = {
        tl: "top-1 left-1 border-l border-t",
        tr: "top-1 right-1 border-r border-t",
        bl: "bottom-1 left-1 border-l border-b",
        br: "bottom-1 right-1 border-r border-b",
    } as const;
    return <span className={`${base} ${map[pos]}`} />;
};

const Cell = ({ children, index }: { children: ReactNode; index: number }) => (
    <div className="relative flex items-center justify-center">
        {/* highlighted panel with a highlight band that slowly slides down */}
        <span className="pointer-events-none absolute inset-1 overflow-hidden rounded-md bg-white/[0.05] ring-1 ring-inset ring-white/10">
            <motion.span
                className="absolute inset-x-0 h-full"
                style={{
                    background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)",
                }}
                initial={{ y: "-110%" }}
                animate={{ y: "110%" }}
                transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.6,
                    delay: index * 0.4,
                }}
            />
        </span>
        <Bracket pos="tl" />
        <Bracket pos="tr" />
        <Bracket pos="bl" />
        <Bracket pos="br" />
        <div className="relative z-10">{children}</div>
    </div>
);

// ---- grid ------------------------------------------------------------------

interface MagneticHoverCardsProps {
    width?: number;
    height?: number;
    columns?: number;
    logos?: ReactNode[];
    className?: string;
}

const MagneticHoverCards = ({
    width = 240,
    height = 140,
    columns = 3,
    logos = DEFAULT_LOGOS,
    className,
}: MagneticHoverCardsProps) => {
    const rows = Math.ceil(logos.length / columns);
    return (
        <div
            className={`grid ${className ?? ""}`}
            style={{
                width,
                height,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {logos.map((logo, i) => (
                <Cell key={i} index={i}>
                    {logo}
                </Cell>
            ))}
        </div>
    );
};

export default MagneticHoverCards;
