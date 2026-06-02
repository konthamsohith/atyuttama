"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AnimatedStats — clean stats (no background): each number counts up from 0
 * when it scrolls into view, with a small gold accent rule. Preserves
 * prefixes/suffixes and commas (e.g. "10,000+", "3 yrs", "98%").
 */

const CountUp = ({ value }: { value: string }) => {
    const match = value.match(/^(\D*?)([\d,]+(?:\.\d+)?)(\D*)$/);
    const prefix = match?.[1] ?? "";
    const raw = match?.[2] ?? "";
    const suffix = match?.[3] ?? "";
    const target = match ? parseFloat(raw.replace(/,/g, "")) : 0;
    const decimals = raw.includes(".") ? (raw.split(".")[1]?.length ?? 0) : 0;

    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState(0);

    const format = (n: number) =>
        decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");

    useEffect(() => {
        const el = ref.current;
        if (!el || !match) return;
        let raf = 0;
        let started = false;
        const DURATION = 1500;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const io = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting || started) return;
                started = true;
                io.disconnect();
                let start = 0;
                const step = (ts: number) => {
                    if (!start) start = ts;
                    const p = Math.min(1, (ts - start) / DURATION);
                    setDisplay(target * ease(p));
                    if (p < 1) raf = requestAnimationFrame(step);
                };
                raf = requestAnimationFrame(step);
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    if (!match) return <span ref={ref}>{value}</span>;
    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {format(display)}
            {suffix}
        </span>
    );
};

export function AnimatedStats({ items }: { items: { value: string; label: string }[] }) {
    return (
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 lg:grid-cols-4">
            {items.map((s) => (
                <div key={s.label} className="group flex flex-col items-center text-center">
                    <div className="font-heading text-3xl font-normal tracking-tight text-[#201D1D] md:text-4xl lg:text-[2.75rem]">
                        <CountUp value={s.value} />
                    </div>
                    <span className="mt-3 block h-[2px] w-7 rounded-full bg-[#E6C565] transition-all duration-300 group-hover:w-12" />
                    <p className="mx-auto mt-4 max-w-[16ch] font-base text-sm leading-snug text-[#201D1D]/55">
                        {s.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default AnimatedStats;
