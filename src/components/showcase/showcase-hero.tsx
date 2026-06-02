"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";

const ACCENT = "#E6C565";

type Project = {
    name: string;
    url: string;
    domain: string;
    tag: string;
    image: string;
};

const projects: Project[] = [
    { name: "Subham Astro", url: "https://www.subhamastro.com/", domain: "subhamastro.com", tag: "Astrology", image: "/images/subham.png" },
    { name: "SocialFly AI", url: "https://socialflyai.com/", domain: "socialflyai.com", tag: "AI · Social", image: "/images/socialflyai.png" },
    { name: "Nyra AI", url: "https://www.nyraai.io/", domain: "nyraai.io", tag: "AI Platform", image: "/images/nyraai.png" },
    { name: "InvisiEdge", url: "https://invisiedge.com/", domain: "invisiedge.com", tag: "Agency", image: "/images/invisiedge.png" },
    { name: "Capable Groups", url: "https://capablegroups.com/", domain: "capablegroups.com", tag: "Business", image: "/images/capable.png" },
    { name: "Ryvo Solutions", url: "https://ryvosolutions.com/", domain: "ryvosolutions.com", tag: "Solutions", image: "/images/ryvo.png" },
    { name: "Social Scale", url: "https://www.socialscale.agency/", domain: "socialscale.agency", tag: "Marketing", image: "/images/socialscale.png" },
];

const ROTATE_MS = 4000;

const ShowcaseHero = () => {
    const [active, setActive] = useState(0);

    // Auto-advance through the websites one by one
    useEffect(() => {
        const id = setInterval(() => {
            setActive((a) => (a + 1) % projects.length);
        }, ROTATE_MS);
        return () => clearInterval(id);
    }, []);

    const project = projects[active];

    return (
        <div className="w-full px-2 md:px-4 lg:px-6 pt-10 lg:pt-14">
            <Wrapper>
                {/* Title */}
                <Container>
                    <div className="flex items-center justify-center gap-2 text-2xl lg:text-3xl font-heading font-normal text-[#201D1D]">
                        <span style={{ color: ACCENT }}>✱</span>
                        <span>Showcase</span>
                    </div>
                </Container>

                {/* Featured card on a dark panel — rotates through real sites */}
                <Container delay={0.1}>
                    <div className="relative mt-8 w-full bg-[#121111] rounded-3xl overflow-hidden py-14 lg:py-20 flex items-center justify-center">
                        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-white/10" />

                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.name}`}
                            className="group relative z-10 block w-full max-w-[680px] mx-4 rounded-2xl p-2 shadow-2xl"
                            style={{ backgroundColor: ACCENT }}
                        >
                            <div className="relative w-full rounded-xl overflow-hidden bg-[#f0efeb]">
                                <div className="h-9 bg-[#f0efeb] flex items-center gap-2 px-4 border-b border-black/5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                                    <span className="ml-3 text-[10px] font-base text-neutral-500 truncate">
                                        {project.domain}
                                    </span>
                                </div>
                                {/* Screenshot — frame matches the PNG ratio (≈1900×860), no crop */}
                                <div className="aspect-[1900/860] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        key={project.image}
                                        src={project.image}
                                        alt={`${project.name} — ${project.domain}`}
                                        draggable={false}
                                        className="block w-full h-full object-cover object-top select-none animate-in fade-in duration-700"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-4 py-3 text-[#201D1D]">
                                <span className="text-lg md:text-xl font-base font-medium">
                                    {project.name}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] font-base uppercase tracking-widest border-b border-[#201D1D]/40 pb-0.5">
                                        {project.tag}
                                    </span>
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#201D1D] text-white text-sm transition-transform group-hover:scale-110">
                                        ↗
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Dots — current site indicator */}
                        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                            {projects.map((p, i) => (
                                <button
                                    key={p.name}
                                    type="button"
                                    aria-label={`Show ${p.name}`}
                                    onClick={() => setActive(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                        i === active ? "w-8 bg-[#E6C565]" : "w-2 bg-white/30 hover:bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </Container>

                {/* Subtext */}
                <Container delay={0.15}>
                    <p className="mt-8 text-center text-base lg:text-xl font-base font-normal text-[#201D1D] max-w-2xl mx-auto leading-relaxed">
                        Check out the incredible work our clients and team have built with Atyuttama
                    </p>
                </Container>
            </Wrapper>
        </div>
    );
};

export default ShowcaseHero;
