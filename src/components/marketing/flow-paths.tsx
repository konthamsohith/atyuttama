"use client";

import { motion } from "framer-motion";

/**
 * AnimatedFlowPaths — faithful recreation of the Framer "Animated Flow Paths"
 * component (framer.com/m/Animated-Flow-Paths-0GK1.js).
 *
 * A left source node (database) feeds cubic-bézier paths fanning out to N
 * right-side target icons. A blue "shimmer" travels each path via an animated
 * stroke-dashoffset over a faint static base path — left → right, staggered,
 * looping with a delay. Colours and behaviour match the source.
 */

interface AnimatedFlowPathsProps {
    width?: number;
    height?: number;
    pathCount?: number;
    /** Static base-path colour. */
    pathColor?: string;
    /** Travelling shimmer colour. */
    shimmerColor?: string;
    strokeWidth?: number;
    /** Shimmer length as a fraction of the path (0–1). */
    shimmerLength?: number;
    /** Seconds for one shimmer to cross a path. */
    duration?: number;
    /** Pause between loops, in seconds. */
    loopDelay?: number;
    /** Bézier control-point strength (1 = default S-curve). */
    curvature?: number;
    className?: string;
}

type IconType = "grid" | "star" | "blob" | "clover";
const TARGET_ICONS: IconType[] = ["grid", "star", "blob", "clover"];

const EASE_SMOOTH = [0.95, 0.04, 0.44, 1] as const;
const TARGET_COLOR = "#6B7280";

// 5-point star path centered at (cx, cy).
function starPath(cx: number, cy: number, s: number) {
    const outer = s * 0.52;
    const inner = s * 0.24;
    let d = "";
    for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return d + "Z";
}

function TargetIcon({ type, x, y, size }: { type: IconType; x: number; y: number; size: number }) {
    const s = size;
    switch (type) {
        case "grid": {
            const o = s * 0.22;
            const r = s * 0.16;
            return (
                <g fill={TARGET_COLOR}>
                    <circle cx={x - o} cy={y - o} r={r} />
                    <circle cx={x + o} cy={y - o} r={r} />
                    <circle cx={x - o} cy={y + o} r={r} />
                    <circle cx={x + o} cy={y + o} r={r} />
                </g>
            );
        }
        case "star":
            return <path d={starPath(x, y, s)} fill={TARGET_COLOR} />;
        case "blob": {
            const w = s * 0.34;
            const h = s * 0.46;
            // a rounded "comma"/leaf — straight left edge, rounded right
            const d = `M ${x - w} ${y - h} L ${x} ${y - h} C ${x + w * 1.6} ${y - h}, ${x + w * 1.6} ${y + h}, ${x} ${y + h} L ${x - w} ${y + h} Q ${x - w * 0.4} ${y}, ${x - w} ${y - h} Z`;
            return <path d={d} fill={TARGET_COLOR} />;
        }
        case "clover": {
            const o = s * 0.26;
            const r = s * 0.15;
            return (
                <g fill={TARGET_COLOR}>
                    <circle cx={x} cy={y - o} r={r} />
                    <circle cx={x - o} cy={y + o * 0.5} r={r} />
                    <circle cx={x + o} cy={y + o * 0.5} r={r} />
                    <circle cx={x} cy={y + o * 0.2} r={r * 0.8} />
                </g>
            );
        }
    }
}

const AnimatedFlowPaths = ({
    width = 240,
    height = 150,
    pathCount = 4,
    pathColor = "#E5E7EB",
    shimmerColor = "#3B82F6",
    strokeWidth = 2,
    shimmerLength = 0.2,
    duration = 2.5,
    loopDelay = 0.8,
    curvature = 1,
    className,
}: AnimatedFlowPathsProps) => {
    const cy = height / 2;
    const srcX = 50; // arrowhead tip / path origin
    const tgtX = width - 34; // path terminus
    const iconX = width - 16; // target icon center

    const n = Math.max(1, pathCount);
    const span = height * 0.74;
    const gap = n > 1 ? span / (n - 1) : 0;

    const paths = Array.from({ length: n }, (_, i) => {
        const ty = cy + (i - (n - 1) / 2) * gap;
        const dx = (tgtX - srcX) * 0.5 * curvature;
        return {
            i,
            ty,
            d: `M ${srcX} ${cy} C ${srcX + dx} ${cy}, ${tgtX - dx} ${ty}, ${tgtX} ${ty}`,
        };
    });

    const stagger = 0.15;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            aria-label="Animated data flow paths"
            role="img"
        >
            <defs>
                <linearGradient id="flow-db" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0081FB" />
                    <stop offset="100%" stopColor="#0064E0" />
                </linearGradient>
            </defs>

            {/* Static base paths */}
            {paths.map((p) => (
                <path
                    key={`base-${p.i}`}
                    d={p.d}
                    fill="none"
                    stroke={pathColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            ))}

            {/* Travelling shimmer overlay */}
            {paths.map((p) => (
                <motion.path
                    key={`shimmer-${p.i}`}
                    d={p.d}
                    fill="none"
                    stroke={shimmerColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={`${shimmerLength} 2`}
                    initial={{ strokeDashoffset: shimmerLength, opacity: 0 }}
                    animate={{ strokeDashoffset: [shimmerLength, -1], opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration,
                        times: [0, 0.15, 0.85, 1],
                        ease: EASE_SMOOTH,
                        repeat: Infinity,
                        repeatDelay: loopDelay,
                        delay: p.i * stagger,
                    }}
                />
            ))}

            {/* Target icons */}
            {paths.map((p, idx) => (
                <TargetIcon key={`icon-${p.i}`} type={TARGET_ICONS[idx % TARGET_ICONS.length]} x={iconX} y={p.ty} size={20} />
            ))}

            {/* Left source: database cylinder + blue arrowhead */}
            <g>
                {(() => {
                    const dbx = 20;
                    const w = 11; // half-width
                    const top = cy - 13;
                    const bot = cy + 13;
                    const ry = 3.4;
                    return (
                        <g fill="url(#flow-db)">
                            <path d={`M ${dbx - w} ${top} L ${dbx - w} ${bot} A ${w} ${ry} 0 0 0 ${dbx + w} ${bot} L ${dbx + w} ${top} Z`} />
                            <ellipse cx={dbx} cy={top} rx={w} ry={ry} />
                            <ellipse cx={dbx} cy={cy - 4} rx={w} ry={ry} fillOpacity={0.85} />
                            <ellipse cx={dbx} cy={cy + 5} rx={w} ry={ry} fillOpacity={0.85} />
                        </g>
                    );
                })()}
                {/* blue arrowhead at the convergence point */}
                <path d={`M ${srcX - 8} ${cy - 6} L ${srcX} ${cy} L ${srcX - 8} ${cy + 6} Z`} fill="#2563EB" />
            </g>
        </svg>
    );
};

export default AnimatedFlowPaths;
