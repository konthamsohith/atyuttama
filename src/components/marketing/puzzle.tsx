"use client";

import React, { useState, useEffect } from "react";

const TILE = 78; // px
const BOARD = TILE * 3; // pieces sit flush so the mark stays continuous
const ACCENT = "#E6C565";

// The brand asterisk, drawn at full board scale. Each piece is a window onto its slice,
// so when all 9 pieces snap into place they assemble the complete Atyuttama mark.
const Mark = () => {
    const c = BOARD / 2;
    const m = 26;
    const d = 34;
    return (
        <svg
            width={BOARD}
            height={BOARD}
            viewBox={`0 0 ${BOARD} ${BOARD}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={16}
            strokeLinecap="round"
        >
            <line x1={c} y1={m} x2={c} y2={BOARD - m} />
            <line x1={m} y1={c} x2={BOARD - m} y2={c} />
            <line x1={d} y1={d} x2={BOARD - d} y2={BOARD - d} />
            <line x1={d} y1={BOARD - d} x2={BOARD - d} y2={d} />
        </svg>
    );
};

const Puzzle = () => {
    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
        let active = true;
        const t1 = setTimeout(() => active && setAssembled(true), 600);
        const iv = setInterval(() => active && setAssembled((a) => !a), 2800);
        return () => {
            active = false;
            clearTimeout(t1);
            clearInterval(iv);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="relative" style={{ width: BOARD, height: BOARD }}>
                {Array.from({ length: 9 }).map((_, id) => {
                    const col = id % 3;
                    const row = Math.floor(id / 3);
                    const gx = col * TILE;
                    const gy = row * TILE;

                    // scattered transform: explode outward from the centre + rotate
                    const dirX = col - 1;
                    const dirY = row - 1;
                    const spread = 78;
                    const sx = gx + dirX * spread;
                    const sy = gy + dirY * spread;
                    const rot = ((id * 47) % 80) - 40;

                    return (
                        <div
                            key={id}
                            className="absolute overflow-hidden rounded-md bg-[#1c1a1a] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{
                                width: TILE,
                                height: TILE,
                                transitionDelay: `${id * 45}ms`,
                                transform: assembled
                                    ? `translate(${gx}px, ${gy}px) rotate(0deg) scale(1)`
                                    : `translate(${sx}px, ${sy}px) rotate(${rot}deg) scale(0.92)`,
                                opacity: assembled ? 1 : 0.55,
                                boxShadow: assembled ? `0 0 24px ${ACCENT}33` : "none",
                                outline: assembled ? "1px solid rgba(230,197,101,0.18)" : "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* slice of the full mark for this piece */}
                            <div style={{ position: "absolute", left: -gx, top: -gy }}>
                                <Mark />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* meaning label, revealed when the mark completes */}
            <span
                className="text-xs font-base uppercase tracking-[0.25em] transition-all duration-700"
                style={{
                    color: ACCENT,
                    opacity: assembled ? 0.9 : 0,
                    transform: assembled ? "translateY(0)" : "translateY(6px)",
                }}
            >
                Every piece, in place
            </span>
        </div>
    );
};

export default Puzzle;
