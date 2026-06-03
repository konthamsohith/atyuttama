"use client";

import React, { useState } from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { Layers, ArrowUpRight } from "lucide-react";

type Category = "Apps" | "Websites" | "AI" | "Marketing";

type Project = {
    name: string;
    url: string;
    domain: string;
    category: Category;
    /** disciplines / services involved — mirrors the reference's "resources used" count */
    services: string[];
    image: string;
    /** gradient classes for the round avatar mark */
    accent: string;
    isNew?: boolean;
};

const projects: Project[] = [
    {
        name: "Nyra AI",
        url: "https://www.nyraai.io/",
        domain: "nyraai.io",
        category: "AI",
        services: ["Full-stack", "AI calling", "Dashboard", "Healthcare"],
        image: "/images/nyraai.png",
        accent: "from-violet-500 to-purple-700",
        isNew: true,
    },
    {
        name: "SocialFly AI",
        url: "https://socialflyai.com/",
        domain: "socialflyai.com",
        category: "AI",
        services: ["AI", "SaaS", "Social automation"],
        image: "/images/socialflyai.png",
        accent: "from-sky-400 to-indigo-600",
        isNew: true,
    },
    {
        name: "Subham Astro",
        url: "https://www.subhamastro.com/",
        domain: "subhamastro.com",
        category: "Apps",
        services: ["Mobile app", "Consumer", "Product design"],
        image: "/images/subham.png",
        accent: "from-amber-300 to-orange-500",
    },
    {
        name: "Social Scale",
        url: "https://www.socialscale.agency/",
        domain: "socialscale.agency",
        category: "Marketing",
        services: ["SaaS", "Social", "Growth"],
        image: "/images/socialscale.png",
        accent: "from-emerald-400 to-teal-600",
    },
    {
        name: "InvisiEdge",
        url: "https://invisiedge.com/",
        domain: "invisiedge.com",
        category: "Websites",
        services: ["Website", "Brand site", "US client"],
        image: "/images/invisiedge.png",
        accent: "from-rose-400 to-fuchsia-600",
    },
    {
        name: "Ryvo Solutions",
        url: "https://ryvosolutions.com/",
        domain: "ryvosolutions.com",
        category: "Websites",
        services: ["Web design", "Landing pages", "Templates"],
        image: "/images/ryvo.png",
        accent: "from-cyan-400 to-blue-600",
    },
    {
        name: "Capable Groups",
        url: "https://capablegroups.com/",
        domain: "capablegroups.com",
        category: "Websites",
        services: ["Web design", "Landing pages"],
        image: "/images/capable.png",
        accent: "from-lime-400 to-green-600",
    },
];

const FILTERS = ["All", "Apps", "Websites", "AI", "Marketing"] as const;

const initials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const ProjectCard = ({ p }: { p: Project }) => (
    <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.name}`}
        className="group block"
    >
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-2xl border border-[#201D1D]/10 bg-[#f0efeb] shadow-sm transition-shadow duration-300 group-hover:shadow-[0_24px_50px_-24px_rgba(32,29,29,0.28)]">
            <div className="aspect-[3/2] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={p.image}
                    alt={`${p.name} — ${p.domain}`}
                    draggable={false}
                    className="block h-full w-full select-none object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
            </div>
            {/* hover open chip */}
            <span className="pointer-events-none absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-[#201D1D]/85 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="size-4" strokeWidth={2} />
            </span>
        </div>

        {/* Identity row */}
        <div className="mt-3.5 flex items-start justify-between gap-3 px-0.5">
            <div className="flex min-w-0 items-center gap-2.5">
                <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${p.accent} font-heading text-[11px] text-white shadow-sm ring-1 ring-black/5`}
                >
                    {initials(p.name)}
                </span>
                <div className="min-w-0">
                    <p className="truncate font-base text-sm font-semibold text-[#201D1D]">{p.name}</p>
                    <p className="truncate font-base text-xs text-[#201D1D]/45">{p.domain}</p>
                </div>
            </div>
            {p.isNew && (
                <span className="mt-0.5 shrink-0 rounded-md bg-[#E5484D] px-2 py-0.5 font-base text-[10px] font-semibold uppercase tracking-wide text-white">
                    New
                </span>
            )}
        </div>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between border-t border-[#201D1D]/10 px-0.5 pt-2.5">
            <span className="flex items-center gap-1.5 font-base text-[10px] uppercase tracking-[0.15em] text-[#201D1D]/45">
                <Layers className="size-3" strokeWidth={1.8} />
                Services used
            </span>
            <span className="font-base text-[11px] font-medium tabular-nums text-[#201D1D]/70">
                {p.services.length}
            </span>
        </div>
    </a>
);

const ShowcaseGrid = () => {
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
    const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <div className="w-full px-2 md:px-4 lg:px-6 py-10 lg:py-14">
            <Wrapper>
                {/* Filter chips */}
                <Container>
                    <div className="mb-10 flex flex-wrap items-center justify-center gap-2 lg:mb-12">
                        {FILTERS.map((f) => {
                            const active = f === filter;
                            return (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => setFilter(f)}
                                    className={`cursor-pointer rounded-full border px-4 py-1.5 font-base text-sm transition-colors duration-200 ${
                                        active
                                            ? "border-[#201D1D] bg-[#201D1D] text-white"
                                            : "border-[#201D1D]/12 bg-white text-[#201D1D]/70 hover:border-[#201D1D]/30 hover:text-[#201D1D]"
                                    }`}
                                >
                                    {f}
                                </button>
                            );
                        })}
                    </div>
                </Container>

                {/* Card gallery */}
                <Container delay={0.1}>
                    <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map((p) => (
                            <ProjectCard key={p.name} p={p} />
                        ))}
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
};

export default ShowcaseGrid;
