import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import { Rocket, HeartHandshake, Gem, Sprout, Palette, Cpu, Sparkles, ChevronsDown, type LucideIcon } from "lucide-react";

const PRINCIPLES: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Rocket, title: "Build for impact", desc: "We measure success by the difference the work makes — for the people using it and the business behind it." },
    { icon: HeartHandshake, title: "Design with empathy", desc: "Every decision starts with the people who'll actually use what we make, not what looks good in a deck." },
    { icon: Gem, title: "Ship with excellence", desc: "A high bar for quality, performance, and polish. If our name's on it, it has to be worth showing off." },
    { icon: Sprout, title: "Grow together", desc: "We invest in long-term partnerships, not one-off transactions. Your wins are how we keep score." },
];

const PILLARS: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Palette, title: "Design that converts", desc: "Interfaces people understand instantly — beautiful, and built to move the numbers that matter." },
    { icon: Cpu, title: "Software that scales", desc: "Full-stack engineering built to hold up under real load, for real organizations." },
    { icon: Sparkles, title: "AI that ships", desc: "Copilots, agents, and calling — deployed in production, doing real work, not living on a slide." },
];

export default function OurMissionPage() {
    return (
        <>
            {/* ───────────────── Hero ───────────────── */}
            <section className="relative w-full overflow-hidden bg-[#F4F4F4]">
                {/* layered backdrop: dotted grid + gold glow + concentric rings */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(32,29,29,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_30%,transparent_72%)]" />
                <div className="pointer-events-none absolute -top-[16%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#E6C565]/12 blur-[130px]" />
                <svg
                    aria-hidden
                    viewBox="0 0 1000 1000"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[1150px] w-[1150px] -translate-x-1/2 -translate-y-[44%] text-[#201D1D]/[0.05]"
                >
                    <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="385" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="470" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 9" />
                </svg>

                <Wrapper className="relative z-10 pt-36 pb-28 lg:pt-44 lg:pb-36">
                    <Container className="flex flex-col items-center text-center">
                        {/* rule-flanked label */}
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#E6C565]/60" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#201D1D]/55">
                                Our Mission
                            </span>
                            <span className="h-px w-8 bg-[#E6C565]/60" />
                        </div>

                        <h1 className="mt-8 max-w-[18ch] font-heading text-[44px] font-normal leading-[1.0] tracking-tight text-balance text-[#201D1D] md:text-7xl lg:text-[88px]">
                            Give great ideas a{" "}
                            <span className="italic text-[#C9A646]">fighting chance.</span>
                        </h1>

                        <p className="mt-7 max-w-2xl font-base text-lg font-normal leading-relaxed text-balance text-[#201D1D]/60">
                            Too many good ideas die in bloated processes and forgettable execution. We exist to turn bold
                            ideas into products that move businesses forward — crafted with care, shipped with speed.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <Link href="/contact">
                                <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-[#201D1D] px-7 py-3.5 font-base font-normal text-white shadow-lg hover:bg-neutral-800">
                                    Partner with us
                                </Button>
                            </Link>
                            <Link href="/our-story">
                                <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-[#201D1D]/15 bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-sm hover:border-[#201D1D]/30 hover:bg-white">
                                    Our story
                                </Button>
                            </Link>
                        </div>

                        {/* scroll cue */}
                        <div className="mt-16 flex flex-col items-center gap-2 text-[#201D1D]/35">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                            <ChevronsDown className="size-4 animate-bounce" strokeWidth={1.6} />
                        </div>
                    </Container>
                </Wrapper>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
            </section>

            {/* ───────────────── Mission statement (dark panel) ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="pt-0 pb-12 -mt-8 lg:-mt-14 lg:pb-20">
                    <Container>
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
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Principles (chapter-style card row) ───────────────── */}
            <section className="relative w-full overflow-hidden bg-[#0e0d0d]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] opacity-40" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#E6C565]/10 blur-[120px]" />
                <Wrapper className="relative z-10 py-16 lg:py-24">
                    <Container className="flex flex-col items-center text-center">
                        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E6C565]">Our principles</span>
                        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-normal leading-[1.08] tracking-tight text-white md:text-4xl lg:text-5xl">
                            The beliefs that guide every build
                        </h2>
                        <p className="mt-5 max-w-xl font-base text-base leading-relaxed text-white/50">
                            Four beliefs we hold every project to — from the first idea to the final release.
                        </p>
                    </Container>
                    <Container delay={0.1}>
                        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {PRINCIPLES.map((p, i) => {
                                const Icon = p.icon;
                                return (
                                    <div
                                        key={p.title}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1817] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E6C565]/50 lg:p-7"
                                    >
                                        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6C565] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <span className="font-heading text-sm text-white/30">0{i + 1}</span>
                                        <span className="mt-5 flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-[#E6C565] transition-colors duration-300 group-hover:bg-[#E6C565] group-hover:text-[#201D1D]">
                                            <Icon className="size-5" strokeWidth={1.6} />
                                        </span>
                                        <h3 className="mt-5 font-heading text-xl font-normal text-white">{p.title}</h3>
                                        <p className="mt-2 font-base text-[14px] leading-relaxed text-white/50">{p.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── What we build toward (connected flow) ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="py-16 lg:py-24">
                    <Container>
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">What we build toward</span>
                            <h2 className="mt-4 font-heading text-3xl font-normal leading-[1.08] tracking-tight text-[#201D1D] md:text-4xl lg:text-5xl">
                                One studio, the whole stack
                            </h2>
                        </div>
                        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
                            {/* connector line behind the tiles (md+) */}
                            <div className="pointer-events-none absolute inset-x-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[#201D1D]/15 to-transparent md:block" />
                            {PILLARS.map((p, i) => {
                                const Icon = p.icon;
                                return (
                                    <div key={p.title} className="relative text-center">
                                        <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#201D1D] text-[#E6C565] shadow-[0_14px_30px_-14px_rgba(32,29,29,0.6)] ring-8 ring-white">
                                            <Icon className="size-7" strokeWidth={1.6} />
                                        </span>
                                        <span className="mt-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#C9A646]">
                                            0{i + 1}
                                        </span>
                                        <h3 className="mt-2 font-heading text-xl font-normal text-[#201D1D]">{p.title}</h3>
                                        <p className="mx-auto mt-2 max-w-xs font-base text-[15px] leading-relaxed text-[#201D1D]/55">{p.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Ready to build something meaningful?"
                subtitle="Tell us about your goals — we'll tell you straight how we'd make them happen, and how fast."
                ctaLabel="Start a project"
            />
        </>
    );
}
