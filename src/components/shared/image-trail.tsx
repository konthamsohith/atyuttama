"use client";

import { useEffect, useRef } from "react";

type Props = {
    /** image srcs cycled through as the cursor moves */
    images: string[];
    /** extra classes for the trail layer (it's absolute inset-0 of its parent) */
    className?: string;
};

/**
 * Image-trail-following-cursor effect.
 *
 * Drop inside any `relative overflow-hidden` container. As the pointer moves
 * across the parent, images spawn along the cursor's path and fade out — a
 * classic Codrops/Osmo-style image trail. Pure DOM/style writes (no per-frame
 * React state) so it stays smooth. Touch pointers are ignored.
 */
export function ImageTrail({ images, className = "" }: Props) {
    const layerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timers = useRef<number[]>([]);
    const stateRef = useRef({ lastX: 0, lastY: 0, primed: false, idx: 0 });

    useEffect(() => {
        const layer = layerRef.current;
        const target = layer?.parentElement;
        if (!layer || !target) return;

        const THRESHOLD = 70; // px of travel between spawns
        const VISIBLE_MS = 600; // how long an image lingers before fading

        const onMove = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const st = stateRef.current;
            if (!st.primed) {
                st.lastX = x;
                st.lastY = y;
                st.primed = true;
                return;
            }
            if (Math.hypot(x - st.lastX, y - st.lastY) < THRESHOLD) return;
            st.lastX = x;
            st.lastY = y;

            const slot = st.idx % itemRefs.current.length;
            st.idx++;
            const el = itemRefs.current[slot];
            if (!el) return;

            const rot = (Math.random() * 24 - 12).toFixed(2);
            window.clearTimeout(timers.current[slot]);

            // snap in (no transition), then animate to resting state
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(0.5) rotate(${rot}deg)`;
            void el.offsetWidth; // force reflow so the next styles animate
            el.style.transition =
                "opacity 0.45s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
            el.style.opacity = "1";
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(1) rotate(${rot}deg)`;

            timers.current[slot] = window.setTimeout(() => {
                el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                el.style.opacity = "0";
                el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(0.85) rotate(${rot}deg)`;
            }, VISIBLE_MS);
        };

        target.addEventListener("pointermove", onMove);
        const snapshot = timers.current;
        return () => {
            target.removeEventListener("pointermove", onMove);
            snapshot.forEach((t) => window.clearTimeout(t));
        };
    }, []);

    return (
        <div
            ref={layerRef}
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-[5] overflow-hidden ${className}`}
        >
            {images.map((src, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        itemRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-0 h-[120px] w-[168px] overflow-hidden rounded-xl opacity-0 shadow-2xl ring-1 ring-black/5 will-change-transform md:h-[140px] md:w-[196px]"
                    style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" draggable={false} className="h-full w-full object-cover object-top" />
                </div>
            ))}
        </div>
    );
}

export default ImageTrail;
