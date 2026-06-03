import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import Reveal from "@/components/marketing/reveal";
import { ImageTrail } from "@/components/shared/image-trail";
import { Sparkles } from "lucide-react";

const TRAIL_IMAGES = [
    "/images/nyraai.png",
    "/images/socialflyai.png",
    "/images/subham.png",
    "/images/invisiedge.png",
    "/images/socialscale.png",
    "/images/ryvo.png",
    "/images/capable.png",
    "/images/ai-solutions.png",
];

const PRINCIPLES: { title: string; tag: string; desc: string; points: string[] }[] = [
    {
        title: "Build for impact",
        tag: "Impact",
        desc: "We measure success by the difference the work makes — for the people using it and the business behind it.",
        points: ["Outcomes over output", "Measure what matters"],
    },
    {
        title: "Design with empathy",
        tag: "Empathy",
        desc: "Every decision starts with the people who'll actually use what we make, not what looks good in a deck.",
        points: ["Start with real users", "Validate before we build", "Accessibility by default"],
    },
    {
        title: "Ship with excellence",
        tag: "Excellence",
        desc: "A high bar for quality, performance, and polish. If our name's on it, it has to be worth showing off.",
        points: ["A bar we'd proudly show off", "Performance and polish", "Tested, every release", "No corners cut"],
    },
    {
        title: "Grow together",
        tag: "Partnership",
        desc: "We invest in long-term partnerships, not one-off transactions. Your wins are how we keep score.",
        points: ["Long-term partnerships", "Your wins are our scoreboard"],
    },
];

export default function OurMissionPage() {
    return (
        <div className="bg-[#0e0d0d]">
            {/* ───────────────── Hero ───────────────── */}
            <section className="relative w-full overflow-hidden bg-[#0e0d0d]">
                {/* layered backdrop: dotted grid + concentric rings */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_30%,transparent_72%)]" />

                {/* image trail that follows the cursor across the hero */}
                <ImageTrail images={TRAIL_IMAGES} />
                <svg
                    aria-hidden
                    viewBox="0 0 1000 1000"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[1150px] w-[1150px] -translate-x-1/2 -translate-y-[44%] text-white/[0.06]"
                >
                    <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="385" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="470" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 9" />
                </svg>

                <Wrapper className="relative z-10 pt-36 pb-28 lg:pt-44 lg:pb-36">
                    <div className="flex flex-col items-center text-center">
                        {/* rule-flanked label */}
                        <Reveal delay={0}>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55">
                                    Our Mission
                                </span>
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="mt-8 max-w-[18ch] font-heading text-[44px] font-normal leading-[1.0] tracking-tight text-balance text-white md:text-7xl lg:text-[88px]">
                                Give great ideas a{" "}
                                <span className="italic text-[#E6C565]">fighting chance.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="mt-7 max-w-2xl font-base text-lg font-normal leading-relaxed text-balance text-white/60">
                                Too many good ideas die in bloated processes and forgettable execution. We exist to turn bold
                                ideas into products that move businesses forward — crafted with care, shipped with speed.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-[#E6C565] px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-lg hover:opacity-90">
                                        Partner with us
                                    </Button>
                                </Link>
                                <Link href="/our-story">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-white/25 bg-white/10 px-7 py-3.5 font-base font-normal text-white shadow-sm backdrop-blur-sm hover:border-white/40 hover:bg-white/20">
                                        Our story
                                    </Button>
                                </Link>
                            </div>
                        </Reveal>

                    </div>
                </Wrapper>
            </section>

            {/* ───────────────── Mission statement (dark panel) ───────────────── */}
            <section className="w-full bg-[#0e0d0d]">
                <Wrapper className="pt-2 pb-12 lg:pt-4 lg:pb-20">
                    <Reveal y={32}>
                        <div className="relative overflow-hidden rounded-[28px] bg-[#201D1D] px-7 py-16 text-white shadow-[0_40px_90px_-45px_rgba(32,29,29,0.7)] md:px-12 lg:px-20 lg:py-24">
                            <div className="pointer-events-none absolute -top-28 right-[-10%] h-[440px] w-[440px] rounded-full bg-[#E6C565]/10 blur-[110px]" />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent_80%)]" />
                            <div className="relative mx-auto max-w-3xl text-center">
                                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E6C565]/70">
                                    Why we exist
                                </span>
                                <div className="relative mt-7">
                                    <span aria-hidden className="absolute -left-2 -top-8 select-none font-heading text-7xl leading-none text-[#E6C565]/20">&ldquo;</span>
                                    <ScrollReveal
                                        text="We pair world-class design, engineering, and AI with a team that actually cares about your outcome — so the best ideas get built the very best way."
                                        className="relative font-heading text-2xl font-normal leading-[1.3] tracking-tight md:text-3xl lg:text-[2.5rem]"
                                    />
                                    <span aria-hidden className="absolute -right-2 -bottom-10 select-none font-heading text-7xl leading-none text-[#E6C565]/20">&rdquo;</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Wrapper>
            </section>

            {/* ───────────────── Principles (chapter-style card row) ───────────────── */}
            <section className="relative w-full overflow-hidden bg-[#0e0d0d]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] opacity-40" />
                <Wrapper className="relative z-10 pt-16 lg:pt-24">
                    <div className="flex flex-col items-center text-center">
                        <Reveal delay={0}>
                            <span className="block font-mono text-[11px] uppercase tracking-[0.3em] text-[#E6C565]">Our principles</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="mt-4 max-w-2xl font-heading text-3xl font-normal leading-[1.08] tracking-tight text-white md:text-4xl lg:text-5xl">
                                The beliefs that guide every build
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-5 max-w-xl font-base text-base leading-relaxed text-white/50">
                                Four beliefs we hold every project to — from the first idea to the final release.
                            </p>
                        </Reveal>
                    </div>
                </Wrapper>
                {/* slow, continuous auto-scrolling marquee (pauses on hover) */}
                <div className="relative z-10 mt-12 overflow-hidden pb-16 lg:pb-24">
                    <style>{`
                        @keyframes mission-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                        .mission-marquee-track { animation: mission-marquee 55s linear infinite; will-change: transform; }
                        @media (prefers-reduced-motion: reduce) { .mission-marquee-track { animation: none; } }
                    `}</style>
                    <div className="mission-marquee-track flex w-max">
                        {[...PRINCIPLES, ...PRINCIPLES].map((p, idx) => {
                            const i = idx % PRINCIPLES.length;
                            return (
                                <div
                                    key={idx}
                                    aria-hidden={idx >= PRINCIPLES.length}
                                    className="group relative mr-6 flex shrink-0 w-[320px] flex-col rounded-[20px] bg-[#1b1a19] p-7 sm:w-[360px] lg:w-[400px] lg:p-8"
                                >
                                    {/* number */}
                                    <span className="font-heading text-lg text-white/35">0{i + 1}</span>
                                    {/* title */}
                                    <h3 className="mt-6 font-heading text-3xl font-normal leading-[1.1] text-white lg:text-4xl">{p.title}</h3>
                                    {/* description */}
                                    <p className="mt-4 font-base text-[15px] leading-relaxed text-white/55">{p.desc}</p>
                                    {/* divider */}
                                    <div className="mt-6 h-px w-full bg-white/10" />
                                    {/* meta row: gold count badge + keyword */}
                                    <div className="mt-5 flex items-center gap-3">
                                        <span
                                            style={{ backgroundColor: "#E6C565" }}
                                            className="rounded px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#201D1D]"
                                        >
                                            {p.points.length} Points
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/55">
                                            <Sparkles className="size-3.5 text-white/45" strokeWidth={1.8} />
                                            {p.tag}
                                        </span>
                                    </div>
                                    {/* inner list box */}
                                    <div className="mt-6 rounded-2xl bg-[#121110] p-2">
                                        {p.points.map((pt, j) => (
                                            <div
                                                key={pt}
                                                className={`flex items-center gap-4 px-4 py-4 ${j < p.points.length - 1 ? "border-b border-white/[0.07]" : ""}`}
                                            >
                                                <span className="font-heading text-sm text-white/30">0{j + 1}</span>
                                                <span className="font-base text-[15px] text-white/85">{pt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <CTASection
                title="Ready to build something meaningful?"
                subtitle="Tell us about your goals — we'll tell you straight how we'd make them happen, and how fast."
                ctaLabel="Start a project"
                bg="#000000"
            />
        </div>
    );
}
