import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { Button } from "../ui/button";

/* ----------------------------------------------------------------- Page hero */
export function PageHero({
    eyebrow,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    secondaryLabel,
    secondaryHref,
}: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel?: string;
    ctaHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
}) {
    return (
        <div className="relative w-full overflow-hidden bg-[#F4F4F4]">
            {/* dotted grid, faded toward the top */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(32,29,29,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_35%,transparent_75%)]" />
            {/* ambient glows */}
            <div className="pointer-events-none absolute -top-[18%] left-1/2 -translate-x-1/2 w-[760px] h-[480px] rounded-full bg-[#E6C565]/12 blur-[120px]" />
            <div className="pointer-events-none absolute top-[20%] right-[-12%] w-[420px] h-[420px] rounded-full bg-neutral-300/25 blur-[100px]" />

            <Wrapper className="relative z-10 pt-36 pb-20 lg:pt-44 lg:pb-28">
                <Container className="flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#201D1D]/10 bg-white/80 backdrop-blur px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-[#201D1D]/70 shadow-sm">
                        <span className="size-1.5 rounded-full bg-[#E6C565] animate-pulse" />
                        {eyebrow}
                    </span>
                    <h1 className="mt-7 max-w-4xl font-heading font-normal tracking-tight text-[#201D1D] text-[42px] md:text-6xl lg:text-7xl leading-[1.02] text-balance">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-2xl font-base font-normal text-[#201D1D]/60 text-lg leading-relaxed text-balance">
                        {subtitle}
                    </p>
                    {(ctaLabel || secondaryLabel) && (
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            {ctaLabel && ctaHref && (
                                <Link href={ctaHref}>
                                    <Button
                                        style={{ borderRadius: "0.75rem" }}
                                        className="bg-[#201D1D] text-white hover:bg-neutral-800 font-base font-normal h-auto px-7 py-3.5 cursor-pointer shadow-lg"
                                    >
                                        {ctaLabel}
                                    </Button>
                                </Link>
                            )}
                            {secondaryLabel && secondaryHref && (
                                <Link href={secondaryHref}>
                                    <Button
                                        style={{ borderRadius: "0.75rem" }}
                                        className="bg-white text-[#201D1D] border border-[#201D1D]/15 hover:border-[#201D1D]/30 hover:bg-white font-base font-normal h-auto px-7 py-3.5 cursor-pointer shadow-sm"
                                    >
                                        {secondaryLabel}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </Container>
            </Wrapper>

            {/* fade into the white section below */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-white" />
        </div>
    );
}

/* ----------------------------------------------------------------- Section heading */
export function SectionHeading({
    eyebrow,
    title,
    subtitle,
}: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="max-w-2xl mx-auto text-center">
            {eyebrow && (
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">
                    <span className="w-6 h-px bg-[#E6C565]/60" />
                    {eyebrow}
                    <span className="w-6 h-px bg-[#E6C565]/60" />
                </span>
            )}
            <h2 className="mt-4 font-heading font-normal tracking-tight text-[#201D1D] text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 font-base font-normal text-[#201D1D]/55 text-base md:text-lg leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

/* ----------------------------------------------------------------- Feature grid */
export type Feature = { icon: LucideIcon; title: string; desc: string };

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 }) {
    const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
    return (
        <div className={`grid grid-cols-1 ${cols} gap-5`}>
            {items.map((f, i) => {
                const Icon = f.icon;
                return (
                    <div
                        key={f.title}
                        className="group relative overflow-hidden rounded-2xl border border-[#201D1D]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#E6C565]/60 hover:shadow-[0_24px_50px_-24px_rgba(32,29,29,0.25)]"
                    >
                        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6C565] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center justify-between">
                            <span className="flex items-center justify-center size-12 rounded-xl bg-[#F4F4F4] text-[#201D1D] group-hover:bg-[#E6C565] transition-colors duration-300">
                                <Icon className="size-6" strokeWidth={1.6} />
                            </span>
                            <span className="font-heading text-2xl text-[#201D1D]/10 group-hover:text-[#E6C565]/40 transition-colors">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </div>
                        <h3 className="mt-5 font-heading font-normal text-xl text-[#201D1D] tracking-tight">{f.title}</h3>
                        <p className="mt-2.5 font-base font-normal text-[#201D1D]/55 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                );
            })}
        </div>
    );
}

/* ----------------------------------------------------------------- Stats band (dark) */
export function StatsBand({ items }: { items: { value: string; label: string }[] }) {
    return (
        <div className="w-full px-2 md:px-4 py-6 lg:py-10">
            <Wrapper>
                <Container>
                    <div className="relative overflow-hidden rounded-3xl bg-[#201D1D] px-8 py-12 md:py-14">
                        <div className="pointer-events-none absolute -top-20 -right-12 w-64 h-64 rounded-full bg-[#E6C565]/12 blur-[80px]" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px] opacity-40" />
                        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {items.map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className="font-heading font-normal text-4xl md:text-5xl text-white">{s.value}</div>
                                    <div className="mt-2 text-[11px] md:text-xs font-mono uppercase tracking-widest text-[#E6C565]/80">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
}

/* ----------------------------------------------------------------- Showcase split (text + image) */
export function ShowcaseSplit({
    eyebrow,
    title,
    body,
    bullets,
    image,
    alt,
    reverse,
}: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    image: string;
    alt: string;
    reverse?: boolean;
}) {
    return (
        <div className="w-full py-16 lg:py-24">
            <Wrapper>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className={reverse ? "lg:order-2" : ""}>
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">{eyebrow}</span>
                            <h2 className="mt-3 font-heading font-normal tracking-tight text-[#201D1D] text-3xl md:text-4xl leading-[1.12]">
                                {title}
                            </h2>
                            <p className="mt-4 font-base font-normal text-[#201D1D]/60 text-base md:text-lg leading-relaxed">
                                {body}
                            </p>
                            <ul className="mt-6 flex flex-col gap-3">
                                {bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex items-center justify-center size-5 rounded-full bg-[#E6C565] text-[#201D1D] shrink-0">
                                            <Check className="size-3.5" strokeWidth={2.5} />
                                        </span>
                                        <span className="font-base text-[#201D1D]/75 text-sm md:text-base">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={reverse ? "lg:order-1" : ""}>
                            <div className="relative rounded-2xl overflow-hidden border border-[#201D1D]/10 shadow-[0_30px_70px_-30px_rgba(32,29,29,0.4)] bg-[#201D1D]">
                                <div className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#E6C565]/15 blur-[70px] z-10" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={image} alt={alt} className="relative z-0 w-full h-full object-cover aspect-[4/3]" />
                            </div>
                        </div>
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
}

/* ----------------------------------------------------------------- Process steps */
export function ProcessSteps({ steps }: { steps: { n: string; title: string; desc: string }[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
                <div key={s.n} className="relative rounded-2xl border border-[#201D1D]/10 bg-white p-6">
                    <span className="font-heading text-3xl text-[#E6C565]">{s.n}</span>
                    <h3 className="mt-3 font-heading font-normal text-lg text-[#201D1D]">{s.title}</h3>
                    <p className="mt-2 text-sm font-base text-[#201D1D]/55 leading-relaxed">{s.desc}</p>
                </div>
            ))}
        </div>
    );
}

/* ----------------------------------------------------------------- CTA band */
export function CTASection({
    title,
    subtitle,
    ctaLabel = "Get in touch",
    ctaHref = "/contact",
    bg = "#201D1D",
}: {
    title: string;
    subtitle: string;
    ctaLabel?: string;
    ctaHref?: string;
    bg?: string;
}) {
    return (
        <div className="w-full px-2 md:px-4 py-12 lg:py-20">
            <Wrapper>
                <div className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-20 text-center" style={{ backgroundColor: bg }}>
                    <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#E6C565]/15 blur-[90px]" />
                    <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#E6C565]/[0.06] blur-[90px]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="max-w-2xl font-heading font-normal tracking-tight text-white text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                            {title}
                        </h2>
                        <p className="mt-5 max-w-xl font-base font-normal text-white/60 text-base md:text-lg leading-relaxed">
                            {subtitle}
                        </p>
                        <Link href={ctaHref} className="mt-8">
                            <Button
                                style={{ borderRadius: "0.75rem" }}
                                className="bg-[#E6C565] text-[#201D1D] hover:opacity-90 font-base font-medium h-auto px-8 py-3.5 cursor-pointer shadow-lg"
                            >
                                {ctaLabel}
                            </Button>
                        </Link>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
