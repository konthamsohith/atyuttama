"use client";

import { useEffect, useRef } from "react";

/**
 * TextPressure — recreation of the Framer "Text Pressure" component
 * (framer.com/m/TextPressure-y92d.js).
 *
 * Renders a word in a variable font; each letter's weight + width axes react
 * to the cursor's proximity — letters near the pointer grow heavy/wide, the
 * rest stay thin. The cursor position is eased toward each frame (no spring
 * lib), and per-letter variation settings are written imperatively via refs
 * so there's no per-frame React re-render.
 */

interface TextPressureProps {
    text?: string;
    width?: number;
    height?: number;
    textColor?: string;
    /** Only run the cursor-pressure loop when this tile is the front/active card. */
    active?: boolean;
    className?: string;
}

const FONT_FACE = `@font-face{font-family:'Compressa VF';src:url('https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2');font-style:normal;font-display:swap;}`;

const TextPressure = ({
    text = "Force",
    width = 240,
    height = 150,
    textColor = "#ffffff",
    active = true,
    className,
}: TextPressureProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef({ x: 0, y: 0 });
    const activeRef = useRef(active);
    activeRef.current = active;

    const chars = text.split("");

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            cursor.current.x = e.clientX;
            cursor.current.y = e.clientY;
        };
        const onTouch = (e: TouchEvent) => {
            const t = e.touches[0];
            if (t) {
                cursor.current.x = t.clientX;
                cursor.current.y = t.clientY;
            }
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("touchmove", onTouch, { passive: true });

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouse.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            cursor.current = { ...mouse.current };
        }

        const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
            Math.hypot(b.x - a.x, b.y - a.y);

        let raf = 0;
        const tick = () => {
            if (!activeRef.current) {
                raf = requestAnimationFrame(tick);
                return;
            }
            mouse.current.x += (cursor.current.x - mouse.current.x) / 15;
            mouse.current.y += (cursor.current.y - mouse.current.y) / 15;

            const titleRect = titleRef.current?.getBoundingClientRect();
            if (titleRect) {
                const maxDist = titleRect.width / 2;
                spansRef.current.forEach((span) => {
                    if (!span) return;
                    const r = span.getBoundingClientRect();
                    const center = { x: r.x + r.width / 2, y: r.y + r.height / 2 };
                    const d = dist(mouse.current, center);

                    const attr = (minVal: number, maxVal: number) => {
                        const v = maxVal - Math.abs((maxVal * d) / maxDist);
                        return Math.max(minVal, v + minVal);
                    };

                    const wght = Math.floor(attr(100, 900));
                    const wdth = Math.floor(attr(20, 150));
                    span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`;
                });
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onTouch);
        };
    }, [text]);

    const fontSize = Math.min(height * 0.62, ((width * 0.92) / Math.max(1, chars.length)) * 1.5);

    return (
        <div
            ref={containerRef}
            className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
            style={{ width, height }}
        >
            <style dangerouslySetInnerHTML={{ __html: FONT_FACE }} />
            <span
                ref={titleRef}
                className="flex select-none"
                style={{
                    fontFamily: "'Compressa VF', sans-serif",
                    fontSize,
                    lineHeight: 1,
                    color: textColor,
                    textTransform: "uppercase",
                    fontWeight: 100,
                }}
            >
                {chars.map((ch, i) => (
                    <span
                        key={i}
                        ref={(el) => {
                            spansRef.current[i] = el;
                        }}
                        style={{ display: "inline-block", fontVariationSettings: "'wght' 100, 'wdth' 100" }}
                    >
                        {ch}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default TextPressure;
