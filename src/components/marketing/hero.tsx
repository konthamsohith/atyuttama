"use client";

import { useState, useEffect, useRef } from 'react'
import Wrapper from "../global/wrapper";
import Icons from "../global/icons";
import Image from "next/image";
import Container from "../global/container";
import { Button } from "../ui/button";
// Framer-derived showcase components — kept (commented out), replaced by mp4 loops in /public/videos.
// import Book3D from "./book-3d";
// import EarthGlobe from "./earth-globe";
// import AnimatedFlowPaths from "./flow-paths";
// import MagneticHoverCards from "./magnetic-hover-cards";
// import MaskHoverReveal from "./mask-hover-reveal";
// import ImageSpinner from "./image-spinner";
// import TextPressure from "./text-pressure";
// import Ripple from "./ripple";
// import AnimatedTextReveal from "./animated-text-reveal";
import ScrollReveal from "./scroll-reveal";
import type { ReactNode } from "react";

interface ShowcaseCard {
    title: string;
    url: string;
    label: string;
    dark: boolean;
    bg: string;
    show: string;
    center?: boolean;
    /** mp4 loop (in /public/videos) shown in the card preview. */
    video?: string;
    icon?: ReactNode;
    /** Heavy/animated tiles render via this so they can animate only when front (active). */
    render?: (active: boolean) => ReactNode;
}

const showcaseCards: ShowcaseCard[] = [
    {
        title: "Dropping Card Stack",
        url: "https://framer.com/m/social-grid-gP9vhs.js@ioa56WApmzG6zcNI7zOd",
        label: "Cards",
        dark: true,
        bg: "bg-[#0a0a0a]",
        video: "/videos/osmo-dropping-cards-stack-1440x900.mp4",
        // icon: <MagneticHoverCards width={244} height={150} />,
        show: "hidden 2xl:block",
    },
    {
        title: "Pixel Transition",
        url: "https://framer.com/m/TextPressure-y92d.js@LAQguO8Civb6UXOmpMCm",
        label: "Pixel",
        dark: true,
        bg: "bg-[#05070d]",
        video: "/videos/osmo-pixelated-scroll-transition-1440x900.mp4",
        // render: (active) => <TextPressure text="Force" width={244} height={150} active={active} />,
        show: "hidden xl:block",
    },
    {
        title: "Date Picker",
        url: "https://framer.com/m/Book-AFRs.js@mxOP9zughWqzCr7yH17p",
        label: "Calendar",
        dark: true,
        bg: "bg-[#0d0d0d]",
        video: "/videos/osmo-events-calendar-date-picker-1440x900.mp4",
        /* icon: (
            <Book3D
                title="Steve Jobs"
                tag="Walter Isaacson"
                meta="Hover to open"
                coverImage="/images/book-cover-steve-jobs.jpg"
                showCoverText={false}
                coverClassName="from-neutral-700 via-neutral-800 to-black"
                width={96}
            />
        ), */
        show: "hidden lg:block",
    },
    {
        title: "Expanding Pills",
        url: "https://framer.com/m/Animated-Flow-Paths-0GK1.js@ul9qXjtHnW5FP14TAXJd",
        label: "Pills",
        dark: true,
        bg: "bg-[#0d0d0d]",
        video: "/videos/osmo-expanding-feature-pills-1440x900.mp4",
        // icon: <AnimatedFlowPaths width={236} height={148} />,
        show: "hidden md:block",
    },
    {
        title: "Shutter Transition",
        url: "https://framer.com/m/LorenzoInteractivePortrait-oP29.js@tqnpAXVxZTj4euFM4cqv",
        label: "Shutter",
        dark: true,
        center: true,
        bg: "bg-[#0a0a0a]",
        video: "/videos/osmo-shutter-page-transition-1440x900.mp4",
        // icon: <MaskHoverReveal width={244} height={150} />,
        show: "block",
    },
    {
        title: "Sticky Steps",
        url: "https://framer.com/m/Scroll-reveal-1-1-a79i.js@WIuZdq66zHREPFyhtccI",
        label: "Steps",
        dark: true,
        bg: "bg-[#0d0d0d]",
        video: "/videos/osmo-sticky-steps-basic-1440x900.mp4",
        // icon: <AnimatedTextReveal width={244} height={150} />,
        show: "hidden md:block",
    },
    {
        title: "Interactive Globe",
        url: "https://framer.com/m/TacticalGlobe3D-uVMtXj.js@UhPxNuaENi2YMvlzEzft",
        label: "Globe",
        dark: true,
        bg: "bg-[#0e1116]",
        video: "/videos/osmo-interactive-globe-mapbox-1440x900.mp4",
        // render: (active) => <EarthGlobe size={150} active={active} />,
        show: "hidden lg:block",
    },
    {
        title: "Image Sequence",
        url: "https://framer.com/m/Ripple-Qymb.js@YGTvnr2Zbs54i2DJOYbY",
        label: "Scroll",
        dark: true,
        bg: "bg-[#0d0d0d]",
        video: "/videos/osmo-image-sequence-on-scroll-1440x900.mp4",
        // render: (active) => <Ripple image="/images/ripple-portrait.jpg" width={244} height={150} active={active} />,
        show: "hidden xl:block",
    },
    {
        title: "Image Trail",
        url: "https://framer.com/m/ImageSpinner-Niv1.js@gAGEAwSCZhbZg7v0eBsq",
        label: "Trail",
        dark: true,
        bg: "bg-[#0d0d0d]",
        video: "/videos/osmo-rotating-image-trail-1440x900.mp4",
        // icon: <ImageSpinner width={244} height={150} />,
        show: "hidden 2xl:block",
    },
];

const Hero = () => {
    const [active, setActive] = useState(0);
    const [mounted, setMounted] = useState(false);
    const pausedRef = useRef(false);

    // Trigger the "rise up from the bottom" entrance once on first load
    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // Self-healing autoplay: the interval lives for the whole component lifetime
    // and just skips a tick while hovered or the tab is hidden — so it can never
    // get permanently stuck (the cause of rotation stopping until a reload).
    useEffect(() => {
        const id = setInterval(() => {
            if (pausedRef.current || (typeof document !== "undefined" && document.hidden)) return;
            setActive((a) => (a + 1) % showcaseCards.length);
        }, 1300);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative z-0 w-full h-full overflow-x-clip">
            {/* Background Grid Lines */}
            <div className="absolute inset-y-0 left-1/4 w-[1px] bg-neutral-200/20 -z-10" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-200/60 -z-10" />
            <div className="absolute inset-y-0 right-1/4 w-[1px] bg-neutral-200/20 -z-10" />

            <Wrapper className="pt-14 pb-20 lg:pt-20 lg:pb-28 overflow-visible">
                <div className="flex flex-col items-center justify-center w-full z-10 overflow-visible">


                    {/* Custom Astersik-Decorated Premium Heading - Styled exactly like the image UI */}
                    <Container delay={0.1}>
                        <h1 className="text-balance leading-[1.05] text-center text-5xl md:text-7xl lg:text-[96px] font-heading font-normal tracking-tight text-[#201D1D] mt-2 w-full">
                            Built to
                            <span className="inline-block mx-4 md:mx-6 align-middle text-[#E6C565]">
                                <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-16 md:h-16 stroke-current fill-none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="2.2" strokeLinecap="round" />
                                </svg>
                            </span>
                            outclass.
                        </h1>
                    </Container>

                    {/* Inline Pill-Highlighted Subheader / Description */}
                    <Container delay={0.2}>
                        <p className="text-base md:text-xl font-normal text-center text-neutral-600/90 max-w-4xl mx-auto mt-8 leading-[1.6] font-base px-4">
                            A creative and AI studio building{" "}
                            <span className="inline-block bg-neutral-200/50 border border-neutral-300/40 px-2 py-[1px] rounded text-neutral-800 font-medium font-base text-[15px] md:text-[18px] align-middle shadow-sm leading-none">
                                apps
                            </span>
                            ,{" "}
                            <span className="inline-block bg-neutral-200/50 border border-neutral-300/40 px-2 py-[1px] rounded text-neutral-800 font-medium font-base text-[15px] md:text-[18px] align-middle shadow-sm leading-none">
                                websites
                            </span>
                            , and{" "}
                            <span className="inline-block bg-neutral-200/50 border border-neutral-300/40 px-2 py-[1px] rounded text-neutral-800 font-medium font-base text-[15px] md:text-[18px] align-middle shadow-sm leading-none">
                                enterprise software
                            </span>{" "}
                            — plus{" "}
                            <span className="inline-block bg-neutral-200/50 border border-neutral-300/40 px-2 py-[1px] rounded text-neutral-800 font-medium font-base text-[15px] md:text-[18px] align-middle shadow-sm leading-none">
                                AI
                            </span>{" "}
                            that&apos;s actually{" "}
                            <span className="inline-block bg-neutral-200/50 border border-neutral-300/40 px-2 py-[1px] rounded text-neutral-800 font-medium font-base text-[15px] md:text-[18px] align-middle shadow-sm leading-none">
                                shipped
                            </span>
                            , not just demoed.
                        </p>
                    </Container>

                    {/* Sleek CTA Buttons & Legal Links */}
                    <Container delay={0.3}>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Button 
                                size="lg" 
                                className="bg-[#201D1D] text-white hover:bg-neutral-800 rounded-lg font-base font-normal text-sm px-6 py-2.5 h-auto cursor-pointer"
                                style={{ fontFamily: '"Haffer VF", Arial, sans-serif' }}
                            >
                                Start a project
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="border-neutral-300 text-[#201D1D] hover:bg-neutral-100 rounded-lg font-base font-normal text-sm px-6 py-2.5 h-auto cursor-pointer"
                                style={{ fontFamily: '"Haffer VF", Arial, sans-serif' }}
                            >
                                See our work
                            </Button>
                        </div>
                        <div className="mt-6 flex gap-6 text-xs text-neutral-400 font-base font-normal justify-center">
                            <a href="/terms-and-conditions" className="hover:text-neutral-600 transition-colors">Terms and Conditions</a>
                            <a href="/privacy-policy" className="hover:text-neutral-600 transition-colors">Privacy Policy</a>
                        </div>
                    </Container>

                    {/* Premium 3D Card Fan Showcase - Styled exactly like the screenshot UI */}
                    <Container delay={0.4} className="w-full overflow-visible">
                        <div
                            className="relative w-full max-w-7xl mx-auto h-[480px] md:h-[580px] lg:h-[640px] -mt-8 flex items-end justify-center px-4 overflow-visible group"
                        >
                            {/* Subtle background blur backing the card stack */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-neutral-200/10 rounded-full blur-3xl -z-10 pointer-events-none" />

                            {/* Premium Dashed Arc with Normal Ticks */}
                            <div className="absolute inset-x-0 bottom-0 h-[240px] w-full -z-10 pointer-events-none overflow-visible">
                                <svg viewBox="0 0 1000 200" className="absolute bottom-[80px] left-0 w-full h-[200px] text-neutral-300/40" preserveAspectRatio="none">
                                    {/* Dashed Arc */}
                                    <path d="M 0,200 Q 500,-100 1000,200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />

                                    {/* Normal Ticks */}
                                    {Array.from({ length: 31 }).map((_, i) => {
                                        const t = i / 30;
                                        const x = 1000 * t;
                                        const y = 600 * t * t - 600 * t + 200; // Quadratic Bezier curve equation (deeper bend)

                                        const dx = 1000;
                                        const dy = 1200 * t - 600;
                                        const angle = Math.atan2(dy, dx);
                                        
                                        const tickLength = 10;
                                        const x1 = x - (tickLength / 2) * Math.sin(angle);
                                        const y1 = y + (tickLength / 2) * Math.cos(angle);
                                        const x2 = x + (tickLength / 2) * Math.sin(angle);
                                        const y2 = y - (tickLength / 2) * Math.cos(angle);
                                        
                                        return (
                                            <line 
                                                key={i} 
                                                x1={x1} 
                                                y1={y1} 
                                                x2={x2} 
                                                y2={y2} 
                                                stroke="currentColor" 
                                                strokeWidth="1.5" 
                                            />
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Centered Atyuttama copy sitting among the cards */}
                            <div className="absolute top-[74%] md:top-[78%] left-1/2 -translate-x-1/2 z-[5] w-full max-w-3xl px-6 text-center pointer-events-none">
                                <ScrollReveal
                                    className="text-2xl md:text-4xl lg:text-[44px] leading-[1.15] font-heading font-normal tracking-tight text-[#201D1D]"
                                    text="Most studios pick a lane — design or development, apps or AI. We refused to. Atyuttama builds all of it under one roof, at a level that makes people ask who made it."
                                />
                            </div>

                            {/* Continuous rotating arc - all cards stay on the arc, edges bleed off-screen */}
                            {showcaseCards.map((card, i) => {
                                // signed distance from the active card, wrapped into [-4 .. 4]
                                let rel = i - active;
                                if (rel > 4) rel -= showcaseCards.length;
                                if (rel < -4) rel += showcaseCards.length;

                                const dist = Math.abs(rel);
                                // Every card rotates around one shared pivot far below center,
                                // so they all sit on a single perfect circle (no misalignment).
                                const angle = rel * 14;            // degrees of fan per step (larger = more bend)
                                const PIVOT = 1750;                // px below the card = arc radius (smaller = more curved toward the pivot)
                                const z = 30 - dist;
                                const opacity = dist >= 4 ? 0 : 1; // only the far-back card is hidden
                                const interactive = dist <= 2;     // edge cards are decorative
                                return (
                                    <div
                                        key={card.url}
                                        aria-hidden={!interactive}
                                        className={`absolute bottom-72 left-1/2 transition-transform duration-500 ease-out ${dist === 0 ? "" : "hidden md:block"} ${interactive ? "" : "pointer-events-none"}`}
                                        style={{
                                            transform: `translateX(-50%) rotate(${angle}deg)`,
                                            transformOrigin: `50% ${PIVOT}px`,
                                            zIndex: z,
                                            opacity,
                                        }}
                                    >
                                        <div
                                            className="relative w-[290px] h-[230px] rounded-sm shadow-xl px-2 pt-2 pb-1.5 flex flex-col"
                                            style={{
                                                backgroundColor: "#E6C565",
                                                transform: mounted ? "translateY(0)" : "translateY(160px)",
                                                opacity: mounted ? 1 : 0,
                                                transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease-out",
                                                transitionDelay: `${i * 70}ms`,
                                            }}
                                        >
                                            {/* Inset preview area */}
                                            <div className={`relative flex-1 w-full rounded-sm overflow-hidden ${card.bg}`}>
                                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                                                <span className={`absolute top-2.5 left-2.5 z-10 text-[8px] font-mono tracking-widest uppercase ${card.dark ? "text-white/50" : "text-neutral-500"}`}>
                                                    {card.label}
                                                </span>
                                                {card.video ? (
                                                    <video
                                                        src={card.video}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="auto"
                                                        className="absolute inset-0 h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center select-none">
                                                        {card.render ? card.render(dist === 0) : card.icon}
                                                    </div>
                                                )}
                                            </div>
                                            {/* Title row */}
                                            <h5 className="shrink-0 mt-1.5 px-0.5 text-[14px] md:text-[15px] font-medium font-base leading-tight text-white">
                                                {card.title}
                                            </h5>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </div>
            </Wrapper>
        </div>
    )
};

export default Hero
