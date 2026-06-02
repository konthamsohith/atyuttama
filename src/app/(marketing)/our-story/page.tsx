import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { AnimatedStats } from "@/components/shared/animated-stats";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { Zap, Gem, BrainCircuit, Users, Eye, type LucideIcon } from "lucide-react";

const STATS = [
    { value: "10,000+", label: "People using what we've built" },
    { value: "10", label: "Countries" },
    { value: "3 yrs", label: "And scaling fast" },
    { value: "15+", label: "Products shipped" },
];

const TIMELINE = [
    {
        n: "01",
        title: "The gap",
        body: "Companies were forced to choose: a studio that designs beautifully but can't build, or a dev shop that builds but makes everything look a decade old. We started to close that gap.",
    },
    {
        n: "02",
        title: "First builds",
        body: "We shipped real products people use every day — from an AI healthcare platform to social automation tools and a consumer astrology app.",
    },
    {
        n: "03",
        title: "At scale",
        body: "Our work now runs across 10 countries, with AI deployed in production — calling, copilots, and agents doing real work, not slideware.",
    },
    {
        n: "Now",
        title: "The very best, every time",
        body: "A young, senior, AI-native team moving fast and scaling hard — holding every release to the standard we named ourselves after.",
    },
];

const VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Zap, title: "Speed is a feature", desc: "A great product six months late is a worse product. We deliver on timelines most studios won't even quote." },
    { icon: Gem, title: "Craft is non-negotiable", desc: "If it ships with our name on it, it has to be something we'd show off — design and code both." },
    { icon: BrainCircuit, title: "AI where it earns its place", desc: "Not a buzzword on a slide — AI running in your product, doing real work." },
    { icon: Users, title: "One team, no handoffs", desc: "Designers, engineers, and AI builders in the same room. Fewer gaps, faster calls." },
    { icon: Eye, title: "Show the work", desc: "Weekly progress, real demos, no big-reveal theatre. You always know where things stand." },
];

export default function OurStoryPage() {
    return (
        <>
            {/* ───────────────── Hero ───────────────── */}
            <section className="relative w-full overflow-hidden bg-[#F4F4F4]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(32,29,29,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_35%,transparent_75%)]" />
                <div className="pointer-events-none absolute -top-[18%] left-1/2 -translate-x-1/2 w-[760px] h-[480px] rounded-full bg-[#E6C565]/12 blur-[120px]" />
                {/* devanagari watermark */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 select-none font-heading text-[22vw] leading-none text-[#201D1D]/[0.035] whitespace-nowrap"
                >
                    अत्युत्तम
                </span>

                <Wrapper className="relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-32">
                    <Container className="flex flex-col items-center text-center">
                        <h1 className="max-w-4xl font-heading font-normal tracking-tight text-[#201D1D] text-[40px] md:text-6xl lg:text-7xl leading-[1.03] text-balance">
                            We named ourselves after a standard.
                            <span className="text-[#C9A646]"> Now we live up to it.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl font-base font-normal text-[#201D1D]/60 text-lg leading-relaxed text-balance">
                            Atyuttama is Sanskrit for &ldquo;the very best.&rdquo; It&apos;s a heavy name to carry — and
                            that&apos;s the point. It keeps us honest about the quality of everything we ship.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <Link href="/contact">
                                <Button style={{ borderRadius: "0.75rem" }} className="bg-[#201D1D] text-white hover:bg-neutral-800 font-base font-normal h-auto px-7 py-3.5 cursor-pointer shadow-lg">
                                    Work with us
                                </Button>
                            </Link>
                            <Link href="/showcase">
                                <Button style={{ borderRadius: "0.75rem" }} className="bg-white text-[#201D1D] border border-[#201D1D]/15 hover:border-[#201D1D]/30 hover:bg-white font-base font-normal h-auto px-7 py-3.5 cursor-pointer shadow-sm">
                                    See our work
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Wrapper>
                <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-white" />
            </section>

            {/* ───────────────── Name statement (contained dark panel) ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="py-12 lg:py-20">
                    <Container>
                        <div className="relative overflow-hidden rounded-[28px] bg-[#201D1D] px-7 py-14 text-white md:px-12 lg:px-16 lg:py-20">
                            {/* ambient gold glow + faint dotted texture */}
                            <div className="pointer-events-none absolute -top-28 -left-20 h-[440px] w-[440px] rounded-full bg-[#E6C565]/10 blur-[110px]" />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent_80%)]" />

                            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-0">
                                {/* left — the word */}
                                <div className="lg:col-span-5 lg:pr-12">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E6C565]/70">
                                        The name
                                    </span>
                                    <p className="mt-6 font-heading text-7xl leading-none text-[#E6C565] lg:text-8xl">
                                        अत्युत्तम
                                    </p>
                                    <div className="mt-6 flex items-center gap-3">
                                        <span className="h-px w-8 bg-[#E6C565]/50" />
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                                            at·yut·ta·ma · adj.
                                        </span>
                                    </div>
                                </div>

                                {/* divider */}
                                <div className="mx-auto hidden h-44 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:col-span-1 lg:block" />

                                {/* right — the meaning */}
                                <div className="relative lg:col-span-6 lg:pl-4">
                                    <span aria-hidden className="absolute -left-1 -top-10 select-none font-heading text-7xl leading-none text-[#E6C565]/20">
                                        &ldquo;
                                    </span>
                                    <h2 className="relative font-heading text-3xl font-normal leading-[1.15] tracking-tight md:text-4xl">
                                        The very best. The supreme.
                                    </h2>
                                    <p className="mt-5 max-w-xl font-base text-lg leading-relaxed text-white/55">
                                        We didn&apos;t pick a name and hope to grow into it. We picked a bar — and built a
                                        studio obsessed with clearing it. Every design, every line of code, every model we
                                        deploy gets measured against it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Story + timeline ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="py-20 lg:py-28">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            <div className="lg:col-span-5">
                                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">
                                    How we got here
                                </span>
                                <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-[#201D1D]">
                                    Three years, a lot of shipping.
                                </h2>
                                <p className="mt-6 font-base text-lg leading-relaxed text-[#201D1D]/60">
                                    Then AI showed up, and most agencies started selling it before they understood it. We
                                    decided to be the team that does all of it — design, full-stack engineering, and real AI —
                                    at a level that earns the name.
                                </p>
                            </div>

                            {/* timeline */}
                            <div className="lg:col-span-7">
                                <ol className="relative flex flex-col gap-10 border-l border-[#201D1D]/10 pl-8">
                                    {TIMELINE.map((t) => (
                                        <li key={t.n} className="relative">
                                            <span className="absolute -left-[37px] top-1 flex size-6 items-center justify-center rounded-full bg-[#E6C565] ring-4 ring-white">
                                                <span className="size-2 rounded-full bg-[#201D1D]" />
                                            </span>
                                            <div className="flex items-baseline gap-3">
                                                <span className="font-heading text-2xl text-[#C9A646]">{t.n}</span>
                                                <h3 className="font-heading text-xl font-normal text-[#201D1D]">{t.title}</h3>
                                            </div>
                                            <p className="mt-2 font-base text-[#201D1D]/60 leading-relaxed">{t.body}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Stats ───────────────── */}
            <section className="w-full bg-[#F4F4F4]">
                <Wrapper className="py-14 lg:py-20">
                    <Container className="flex flex-col items-center">
                        <span className="mb-8 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">
                            By the numbers
                        </span>
                        <div className="w-full max-w-4xl rounded-3xl border border-[#201D1D]/10 bg-white px-6 py-10 shadow-[0_30px_70px_-40px_rgba(32,29,29,0.25)] lg:px-10 lg:py-12">
                            <AnimatedStats items={STATS} />
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Values (editorial numbered list) ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="py-20 lg:py-28">
                    <Container>
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">
                                How we operate
                            </span>
                            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-tight text-[#201D1D]">
                                The standards behind everything we build
                            </h2>
                        </div>

                        <div className="mt-14 divide-y divide-[#201D1D]/10 border-t border-[#201D1D]/10">
                            {VALUES.map((v, i) => {
                                const Icon = v.icon;
                                return (
                                    <div
                                        key={v.title}
                                        className="group grid grid-cols-1 md:grid-cols-12 items-start gap-4 md:gap-8 py-8 transition-colors duration-300"
                                    >
                                        <div className="md:col-span-1 font-mono text-sm text-[#201D1D]/35 group-hover:text-[#C9A646] transition-colors">
                                            0{i + 1}
                                        </div>
                                        <div className="md:col-span-4 flex items-center gap-4">
                                            <span className="flex items-center justify-center size-11 shrink-0 rounded-xl bg-[#F4F4F4] text-[#201D1D] group-hover:bg-[#E6C565] transition-colors duration-300">
                                                <Icon className="size-5" strokeWidth={1.6} />
                                            </span>
                                            <h3 className="font-heading text-xl md:text-2xl font-normal text-[#201D1D]">{v.title}</h3>
                                        </div>
                                        <p className="md:col-span-7 font-base text-[#201D1D]/60 leading-relaxed">{v.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Want to build the very best?"
                subtitle="Tell us what you're working on — we'll tell you straight whether we're the right team, and how fast we can ship it."
                ctaLabel="Start a project"
            />
        </>
    );
}
