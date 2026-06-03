"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { Layers, ArrowUpRight } from "lucide-react";

const ACCENT = "#E6C565";

type Project = {
    name: string;
    url: string;
    domain: string;
    services: string[];
    image: string;
    accent: string;
};

const projects: Project[] = [
    { name: "Nyra AI", url: "https://www.nyraai.io/", domain: "nyraai.io", services: ["Full-stack", "AI calling", "Dashboard", "Healthcare"], image: "/images/nyraai.png", accent: "from-violet-500 to-purple-700" },
    { name: "SocialFly AI", url: "https://socialflyai.com/", domain: "socialflyai.com", services: ["AI", "SaaS", "Social automation"], image: "/images/socialflyai.png", accent: "from-sky-400 to-indigo-600" },
    { name: "Subham Astro", url: "https://www.subhamastro.com/", domain: "subhamastro.com", services: ["Mobile app", "Consumer", "Product design"], image: "/images/subham.png", accent: "from-amber-300 to-orange-500" },
    { name: "Social Scale", url: "https://www.socialscale.agency/", domain: "socialscale.agency", services: ["SaaS", "Social", "Growth"], image: "/images/socialscale.png", accent: "from-emerald-400 to-teal-600" },
    { name: "InvisiEdge", url: "https://invisiedge.com/", domain: "invisiedge.com", services: ["Website", "Brand site", "US client"], image: "/images/invisiedge.png", accent: "from-rose-400 to-fuchsia-600" },
    { name: "Ryvo Solutions", url: "https://ryvosolutions.com/", domain: "ryvosolutions.com", services: ["Web design", "Landing pages", "Templates"], image: "/images/ryvo.png", accent: "from-cyan-400 to-blue-600" },
    { name: "Capable Groups", url: "https://capablegroups.com/", domain: "capablegroups.com", services: ["Web design", "Landing pages"], image: "/images/capable.png", accent: "from-lime-400 to-green-600" },
];

const ROTATE_MS = 4500;

const initials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const ShowcaseHero = () => {
    const [active, setActive] = useState(0);
    const pausedRef = useRef(false);

    useEffect(() => {
        const id = setInterval(() => {
            if (pausedRef.current || (typeof document !== "undefined" && document.hidden)) return;
            setActive((a) => (a + 1) % projects.length);
        }, ROTATE_MS);
        return () => clearInterval(id);
    }, []);

    const project = projects[active];

    return (
        <div className="w-full px-2 md:px-4 lg:px-6 pt-12 lg:pt-16">
            <Wrapper>
                {/* Title */}
                <Container>
                    <div className="flex items-center justify-center gap-3 font-heading text-4xl font-normal tracking-tight text-[#201D1D] lg:text-5xl">
                        <span style={{ color: ACCENT }}>✱</span>
                        <span>Showcase</span>
                    </div>
                </Container>

                {/* Featured dark panel */}
                <Container delay={0.1}>
                    <div
                        className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[40px] bg-[#121111] px-4 py-12 lg:rounded-[72px] lg:py-16"
                        onMouseEnter={() => { pausedRef.current = true; }}
                        onMouseLeave={() => { pausedRef.current = false; }}
                    >
                        {/* ambient gold glow + dashed ring */}
                        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#E6C565]/[0.07] blur-[120px]" />
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

                        <div className="relative z-10 flex flex-col items-center">
                            {/* service pills (the "Work / The look / Tech stack" slot) */}
                            <div className="flex flex-wrap items-center justify-center gap-1.5">
                                {project.services.slice(0, 3).map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-full bg-[#E6C565]/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-[#E6C565]"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {/* featured name */}
                            <h2 className="mt-5 text-center font-heading text-2xl font-normal text-white lg:text-3xl">
                                {project.name}
                            </h2>

                            {/* credit chips */}
                            <div className="mt-3 flex items-center justify-center gap-2">
                                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-1 pl-1 pr-2.5">
                                    <span className="flex size-5 items-center justify-center rounded-full bg-[#E6C565] font-heading text-[8px] text-[#201D1D]">A</span>
                                    <span className="font-base text-[11px] text-white/70">Atyuttama</span>
                                </span>
                                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-1 pl-1 pr-2.5">
                                    <span className={`flex size-5 items-center justify-center rounded-full bg-gradient-to-br ${project.accent} font-heading text-[8px] text-white`}>
                                        {initials(project.name)}
                                    </span>
                                    <span className="font-base text-[11px] text-white/70">{project.domain}</span>
                                </span>
                            </div>

                            {/* screenshot */}
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.name}`}
                                className="group mt-7 block w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#f0efeb] shadow-2xl"
                            >
                                <div className="aspect-[1900/860] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        key={project.image}
                                        src={project.image}
                                        alt={`${project.name} — ${project.domain}`}
                                        draggable={false}
                                        className="block h-full w-full select-none object-cover object-top duration-700 animate-in fade-in group-hover:scale-[1.02]"
                                    />
                                </div>
                            </a>

                            {/* services-used meta */}
                            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                                <Layers className="size-3.5" strokeWidth={1.8} />
                                {project.services.length} Services used
                            </div>

                            {/* dots */}
                            <div className="mt-6 flex items-center gap-2">
                                {projects.map((p, i) => (
                                    <button
                                        key={p.name}
                                        type="button"
                                        aria-label={`Show ${p.name}`}
                                        onClick={() => setActive(i)}
                                        className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                                            i === active ? "w-8 bg-[#E6C565]" : "w-2 bg-white/25 hover:bg-white/45"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Visit site button — overlaps the bottom edge of the panel */}
                <div className="relative z-20 -mt-5 flex justify-center">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#201D1D]/10 bg-white px-5 py-2.5 font-base text-sm font-medium text-[#201D1D] shadow-[0_12px_30px_-12px_rgba(32,29,29,0.4)] transition-transform hover:-translate-y-0.5"
                    >
                        Visit site
                        <ArrowUpRight className="size-4" strokeWidth={2} />
                    </a>
                </div>

                {/* Subtitle + submit CTA */}
                <Container delay={0.15}>
                    <div className="mt-12 flex flex-col items-center text-center lg:mt-16">
                        <p className="max-w-2xl font-heading text-2xl font-normal leading-snug tracking-tight text-[#201D1D] lg:text-[28px]">
                            Check out the work our clients and team have built with Atyuttama
                        </p>
                        <p className="mt-5 font-base text-sm text-[#201D1D]/50">Have a project in mind?</p>
                        <Link
                            href="/contact"
                            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#201D1D] px-5 py-2.5 font-base text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                            Start a project
                            <ArrowUpRight className="size-4" strokeWidth={2} />
                        </Link>
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
};

export default ShowcaseHero;
