"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { STATS } from "@/constants";
import Image from "next/image";

/**
 * CountUp — counts a numeric stat from 0 to its target the first time it
 * scrolls into view, keeping any non-numeric prefix/suffix (e.g. "500+", "98%").
 * Uses a plain IntersectionObserver + requestAnimationFrame so it fires reliably.
 */
const CountUp = ({ value, className }: { value: string; className?: string }) => {
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    const prefix = match?.[1] ?? "";
    const target = match ? parseFloat(match[2]) : 0;
    const suffix = match?.[3] ?? "";
    const decimals = match?.[2]?.includes(".") ? (match[2].split(".")[1]?.length ?? 0) : 0;

    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el || !match) return;

        let raf = 0;
        let started = false;
        const DURATION = 1600;
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const io = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting || started) return;
                started = true;
                io.disconnect();
                let startTs = 0;
                const step = (ts: number) => {
                    if (!startTs) startTs = ts;
                    const p = Math.min(1, (ts - startTs) / DURATION);
                    setDisplay(target * easeOutCubic(p));
                    if (p < 1) raf = requestAnimationFrame(step);
                };
                raf = requestAnimationFrame(step);
            },
            { threshold: 0.35 }
        );
        io.observe(el);

        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
        // value is stable per stat; target/decimals derive from it
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    if (!match) return <span className={className}>{value}</span>;

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display.toFixed(decimals)}
            {suffix}
        </span>
    );
};

const Stats = () => {
    return (
        <div className="flex flex-col items-center justify-center relative w-full py-16 lg:py-24 overflow-hidden">
            <Wrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center w-full">
                    {STATS.map((stat, index) => (
                        <Container key={index} delay={0.1 + index * 0.1}>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center px-4 lg:px-6 py-2 rounded-full relative before:absolute before:inset-0 before:-z-10 before:p-[1.5px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-200 before:to-neutral-300 before:content-[''] after:absolute after:inset-[1.5px] after:-z-10 after:rounded-[22px] after:bg-white">
                                    <Image
                                        src={stat.icon}
                                        alt="Stats"
                                        width={1024}
                                        height={1024}
                                        className="w-full size-8"
                                    />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-lg lg:text-2xl text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text font-semibold mt-5 tabular-nums">
                                        <CountUp value={stat.value} />
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {stat.title}
                                    </p>
                                </div>
                            </div>
                        </Container>
                    ))}
                </div>
            </Wrapper>
        </div>
    )
};

export default Stats
