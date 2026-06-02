"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { Smartphone, BrainCircuit, Globe, TrendingUp, PenTool, ArrowUpRight } from "lucide-react";

/**
 * Our Services — rebuilt as a "Fluid Card Stack" (framer.com/m/Fluid-Card-Stack-qBHE.js):
 * a horizontal row of cards where the hovered card fluidly expands to reveal its
 * full content while the rest collapse to slim vertical-label strips. Adapted to
 * the Atyuttama brand — gold accent, our fonts, dark panel.
 *
 * Smoothness: width is a Framer-Motion `flexGrow` tween (rAF, all cards in sync);
 * the collapsed vertical label and the expanded horizontal content are two
 * absolutely-positioned layers that cross-fade by opacity — so there's no
 * reflow and no discrete writing-mode "pop" during the transition.
 */

interface Service {
    icon: typeof Smartphone;
    title: string;
    desc: string;
    label: string;
    href: string;
    /** Optional cover artwork shown behind the card (under a dark overlay). */
    image?: string;
}

const SERVICES: Service[] = [
    {
        icon: Smartphone,
        title: "App Development",
        desc: "Web and mobile apps with multi-role access from day one — admin, staff, and end users — plus analytics to see how people actually use your product.",
        label: "iOS · Android · Cross-platform",
        href: "/services/app-development",
        image: "/images/app-development.jpg",
    },
    {
        icon: BrainCircuit,
        title: "AI Solutions",
        desc: "Copilots, RAG pipelines, and agentic apps wired into your real tools and data — built to do actual work, not just demo.",
        label: "Automation · Insight",
        href: "/services/ai-solutions",
        image: "/images/ai-solutions.png",
    },
    {
        icon: Globe,
        title: "Web Development",
        desc: "Fast, animated, production-grade front-ends — the craft you see on award sites, in your build.",
        label: "Modern stack · Production-ready",
        href: "/services/web-development",
        image: "/images/web-dev.png",
    },
    {
        icon: TrendingUp,
        title: "Digital Marketing",
        desc: "AI-driven content, campaigns, and automation built to move real numbers — not just post for the sake of it.",
        label: "Campaigns · Analytics",
        href: "/services/digital-marketing",
        image: "/images/digital-marketing.png",
    },
    {
        icon: PenTool,
        title: "UI/UX Design",
        desc: "Creative interfaces and design systems built to convert — with motion and detail most templates never reach.",
        label: "Research · Prototyping",
        href: "/services/ui-ux-design",
        image: "/images/ui-ux.png",
    },
];

const EXPAND_EASE = [0.22, 1, 0.36, 1] as const;

const OurServices = () => {
    // start with every card closed; a card opens only while hovered
    const [active, setActive] = useState<number | null>(null);

    return (
        <section className="w-full px-2 py-8 md:px-4 lg:px-6">
            <div className="relative w-full overflow-hidden rounded-3xl bg-[#0a0a0a] py-14 lg:py-20">
                <Wrapper className="lg:max-w-[1500px]">
                    {/* Heading */}
                    <Container className="mb-10 flex flex-col gap-4 lg:mb-14">
                        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E6C565]">
                            What we do
                        </span>
                        <h2 className="font-heading text-4xl font-normal leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                            From the first pixel to the last line of AI.
                        </h2>
                        <p className="max-w-xl font-base text-base leading-relaxed text-white/60 lg:text-lg">
                            Hover a card to dive in — design, code, and AI, one studio, building products
                            end&#8209;to&#8209;end.
                        </p>
                    </Container>

                    {/* Fluid expanding card row */}
                    <Container delay={0.1}>
                        <div
                            className="flex flex-col gap-3 lg:h-[460px] lg:flex-row lg:gap-4"
                            onMouseLeave={() => setActive(null)}
                        >
                            {SERVICES.map((s, i) => {
                                const isActive = i === active;
                                const Icon = s.icon;
                                return (
                                    <motion.div
                                        key={s.title}
                                        data-active={isActive}
                                        onMouseEnter={() => setActive(i)}
                                        onClick={() => setActive(i)}
                                        initial={false}
                                        animate={{ flexGrow: isActive ? 6 : 1 }}
                                        transition={{ duration: 0.6, ease: EXPAND_EASE }}
                                        className="group relative max-h-[92px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#141414] transition-[max-height,border-color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/20 data-[active=true]:max-h-[460px] lg:max-h-full lg:basis-0 will-change-[flex-grow]"
                                    >
                                        {/* optional cover artwork + readability overlay */}
                                        {s.image && (
                                            <>
                                                <div
                                                    className="absolute inset-0 z-0 bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${s.image})` }}
                                                />
                                                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.2)_75%,transparent_100%)]" />
                                            </>
                                        )}

                                        {/* icon chip — scales (GPU transform) instead of reflowing */}
                                        <div className="absolute left-5 top-5 z-10 flex h-11 w-11 origin-top-left items-center justify-center rounded-2xl bg-[#E6C565] text-[#201D1D] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]:scale-125 lg:left-6 lg:top-6">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        {/* collapsed label — cross-fades out when active */}
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-x-5 bottom-5 z-0 opacity-100 transition-opacity duration-300 group-data-[active=true]:opacity-0 lg:inset-x-6 lg:bottom-6"
                                        >
                                            <h3 className="font-heading text-lg font-normal leading-tight text-white">
                                                {s.title}
                                            </h3>
                                        </div>

                                        {/* expanded content — cross-fades in when active */}
                                        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-data-[active=true]:pointer-events-auto group-data-[active=true]:opacity-100 lg:p-6">
                                            <div className="flex max-w-md flex-col gap-5">
                                                <h3 className="font-heading text-3xl font-normal leading-tight text-white lg:text-4xl">
                                                    {s.title}
                                                </h3>
                                                <p className="font-base text-sm leading-relaxed text-white/55 lg:text-base">
                                                    {s.desc}
                                                </p>
                                                <div className="flex flex-col gap-4">
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#E6C565]/80">
                                                        {s.label}
                                                    </span>
                                                    <Link
                                                        href={s.href}
                                                        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-base text-sm font-medium text-[#201D1D] transition-colors hover:bg-neutral-200"
                                                    >
                                                        Learn More
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </Container>
                </Wrapper>
            </div>
        </section>
    );
};

export default OurServices;
