"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { Button } from "../ui/button";

const projects = [
    {
        name: "Subham Astro",
        url: "https://www.subhamastro.com/",
        domain: "subhamastro.com",
        tag: "Astrology",
        image: "/images/subham.png",
        embeddable: true,
    },
    {
        name: "SocialFly AI",
        url: "https://socialflyai.com/",
        domain: "socialflyai.com",
        tag: "AI · Social",
        image: "/images/socialflyai.png",
        embeddable: true,
    },
    {
        name: "Nyra AI",
        url: "https://www.nyraai.io/",
        domain: "nyraai.io",
        tag: "AI Platform",
        image: "/images/nyraai.png",
        embeddable: false, // blocks framing (X-Frame-Options)
    },
    {
        name: "InvisiEdge",
        url: "https://invisiedge.com/",
        domain: "invisiedge.com",
        tag: "Agency",
        image: "/images/invisiedge.png",
        embeddable: false, // blocks framing (X-Frame-Options)
    },
    {
        name: "Capable Groups",
        url: "https://capablegroups.com/",
        domain: "capablegroups.com",
        tag: "Business",
        image: "/images/capable.png",
        embeddable: true,
    },
    {
        name: "Ryvo Solutions",
        url: "https://ryvosolutions.com/",
        domain: "ryvosolutions.com",
        tag: "Solutions",
        image: "/images/ryvo.png",
        embeddable: true,
    },
    {
        name: "Social Scale",
        url: "https://www.socialscale.agency/",
        domain: "socialscale.agency",
        tag: "Marketing",
        image: "/images/socialscale.png",
        embeddable: true,
    },
];

const ACCENT = "#E6C565";

type Project = (typeof projects)[number];

/* Website preview: shows the hero / top of each site's full-page screenshot in a
   browser frame (the rest is clipped). Use the bottom-right arrow on the card to
   open the live site in a new tab. */
const SitePreview = ({ project }: { project: Project }) => {
    return (
        <div className="relative w-full rounded-xl overflow-hidden bg-[#f0efeb]">
            <div className="h-9 bg-[#f0efeb] flex items-center gap-2 px-4 border-b border-black/5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <span className="ml-3 text-[10px] font-base text-neutral-500 truncate">{project.domain}</span>
            </div>
            {/* viewport — frame matches the screenshot ratio (≈1900×860), no crop */}
            <div className="aspect-[1900/860] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.image}
                    alt={`${project.name} — ${project.domain}`}
                    draggable={false}
                    className="block w-full h-full object-cover object-top select-none"
                />
            </div>
        </div>
    );
};

const ProjectCard = ({ project }: { project: Project }) => (
    <div className="w-full max-w-[760px] rounded-2xl p-2 shadow-2xl" style={{ backgroundColor: ACCENT }}>
        {/* Preview — click to open the live site in a new tab.
            stopPropagation on pointerdown so the carousel drag doesn't hijack the click. */}
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
            onPointerDown={(e) => e.stopPropagation()}
            className="block cursor-pointer"
        >
            <SitePreview project={project} />
        </a>
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 text-[#201D1D]">
            <span className="text-lg md:text-xl font-base font-medium">{project.name}</span>
            <div className="flex items-center gap-3">
                <span className="text-[11px] font-base uppercase tracking-widest border-b border-[#201D1D]/40 pb-0.5">
                    {project.tag}
                </span>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name}`}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-[#201D1D] text-white text-sm transition-transform hover:scale-110"
                >
                    ↗
                </a>
            </div>
        </div>
    </div>
);

const Showcase = () => {
    const [active, setActive] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const startX = useRef<number | null>(null);

    const next = () => setActive((a) => (a + 1) % projects.length);
    const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);

    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX;
        setDragging(true);
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (startX.current !== null) setDragX(e.clientX - startX.current);
    };
    const endDrag = () => {
        if (startX.current === null) return;
        if (dragX <= -70) next();
        else if (dragX >= 70) prev();
        startX.current = null;
        setDragging(false);
        setDragX(0);
    };

    const dragProgress = Math.min(Math.abs(dragX) / 240, 1);

    return (
        <div className="w-full px-2 md:px-4 lg:px-6 py-8">
            <div className="relative w-full bg-[#121111] text-white rounded-3xl overflow-hidden py-16 lg:py-24">
                {/* Radial tick-mark ring backdrop */}
                <svg
                    aria-hidden
                    viewBox="0 0 1000 1000"
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] lg:w-[980px] lg:h-[980px] text-white/10"
                >
                    {Array.from({ length: 90 }).map((_, i) => {
                        const a = (i / 90) * Math.PI * 2;
                        const cx = 500;
                        const cy = 500;
                        const inner = 472;
                        const outer = 486;
                        return (
                            <line
                                key={i}
                                x1={Math.round(cx + Math.cos(a) * inner)}
                                y1={Math.round(cy + Math.sin(a) * inner)}
                                x2={Math.round(cx + Math.cos(a) * outer)}
                                y2={Math.round(cy + Math.sin(a) * outer)}
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        );
                    })}
                </svg>
                <svg
                    aria-hidden
                    viewBox="0 0 1000 1000"
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] text-white/[0.08]"
                >
                    {/* perfect circle outline */}
                    <circle cx="500" cy="500" r="470" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    {/* radial ticks around it */}
                    {Array.from({ length: 60 }).map((_, i) => {
                        const a = (i / 60) * Math.PI * 2;
                        const cx = 500;
                        const cy = 500;
                        const inner = 470;
                        const outer = 484;
                        return (
                            <line
                                key={i}
                                x1={Math.round(cx + Math.cos(a) * inner)}
                                y1={Math.round(cy + Math.sin(a) * inner)}
                                x2={Math.round(cx + Math.cos(a) * outer)}
                                y2={Math.round(cy + Math.sin(a) * outer)}
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        );
                    })}
                </svg>

                <Wrapper className="relative z-10">
                    {/* Heading */}
                    <Container>
                        <div className="relative flex items-center justify-between gap-4 font-heading font-normal tracking-tight text-white">
                            <span className="text-5xl md:text-7xl lg:text-8xl">Made</span>
                            <span className="text-5xl md:text-7xl lg:text-8xl">with</span>
                            <span className="text-5xl md:text-7xl lg:text-8xl">Atyuttama</span>

                            {/* Hand-written annotation */}
                            <span
                                className="hidden lg:block absolute right-[16%] top-full mt-2 -rotate-6 text-lg italic font-base"
                                style={{ color: ACCENT }}
                            >
                                crafted with care
                            </span>
                        </div>
                    </Container>

                    {/* Stage */}
                    <Container delay={0.1}>
                        <div
                            className="relative mt-16 lg:mt-24 h-[440px] md:h-[520px] flex items-center justify-center touch-none select-none"
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={endDrag}
                            onPointerCancel={endDrag}
                        >
                            {/* Fanned deck — active card in front, the rest fanned behind */}
                            {projects.map((p, i) => {
                                let rel = i - active;
                                if (rel > projects.length / 2) rel -= projects.length;
                                if (rel < -projects.length / 2) rel += projects.length;

                                const isFront = rel === 0;
                                const tx = rel * 165 + (isFront ? dragX * 0.6 : 0);
                                const ty = Math.abs(rel) * 14; // gentle downward fan toward the edges
                                const rot = isFront ? dragX * 0.012 : rel * 6;
                                const scale = isFront ? 1.06 : 1 - Math.abs(rel) * 0.1; // middle bigger, back ones smaller
                                const z = 20 - Math.abs(rel) * 2;
                                const opacity = isFront ? 1 - dragProgress * 0.1 : 0.7 - (Math.abs(rel) - 1) * 0.25;

                                return (
                                    <div
                                        key={p.name}
                                        className={`absolute left-1/2 top-1/2 w-full max-w-[760px] px-4 ${isFront ? "" : "pointer-events-none"}`}
                                        style={{
                                            transform: `translate(-50%, -50%) translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${scale})`,
                                            zIndex: z,
                                            opacity,
                                            transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease",
                                        }}
                                    >
                                        <ProjectCard project={p} />
                                    </div>
                                );
                            })}

                            {/* Prev / Next — reliable navigation (the centred card itself is a
                                live, scrollable site, so dragging over it scrolls the page). */}
                            <button
                                type="button"
                                aria-label="Previous project"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={prev}
                                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                aria-label="Next project"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={next}
                                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                            >
                                ›
                            </button>

                            {/* Dots */}
                            <div className="absolute -bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                                {projects.map((p, i) => (
                                    <button
                                        key={p.name}
                                        type="button"
                                        aria-label={`Go to ${p.name}`}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        onClick={() => setActive(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                            i === active ? "w-8 bg-[#E6C565]" : "w-2 bg-white/30 hover:bg-white/50"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </Container>

                    {/* CTA */}
                    <Container delay={0.2}>
                        <div className="flex justify-center mt-12">
                            <Button asChild className="bg-white text-[#201D1D] hover:bg-neutral-200 rounded-lg font-base font-normal text-sm px-6 py-2.5 h-auto cursor-pointer">
                                <Link href="/showcase">Explore showcase</Link>
                            </Button>
                        </div>
                    </Container>
                </Wrapper>
            </div>
        </div>
    );
};

export default Showcase;
