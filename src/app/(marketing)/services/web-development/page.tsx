import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { StepFlow } from "@/components/shared/step-flow";
import { AnimatedStats } from "@/components/shared/animated-stats";
import { TechShowcase } from "@/components/shared/tech-showcase";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ data */

const CAPABILITIES: { title: string; desc: string; image: string }[] = [
    { title: "Marketing websites", desc: "High-converting sites that load instantly and look incredible — built to turn visitors into customers.", image: "/images/Marketing%20websites.png" },
    { title: "Web apps & dashboards", desc: "Complex, data-heavy products made simple. Real-time, responsive, and a joy to use.", image: "/images/Web%20apps%20%26%20dashboards.png" },
    { title: "E-commerce", desc: "Fast storefronts and checkouts engineered to sell — optimized for conversion at every step.", image: "/images/E-commerce.png" },
    { title: "Performance & SEO", desc: "90+ Lighthouse scores, technical SEO, and Core Web Vitals tuned so you rank and convert.", image: "/images/Performance%20%26%20SEO.png" },
];

const STACK = [
    { name: "Next.js", logo: "/images/tech/nextjs.svg" },
    { name: "React", logo: "/images/tech/react.svg" },
    { name: "TypeScript", logo: "/images/tech/typescript.svg" },
    { name: "Tailwind CSS", logo: "/images/tech/tailwind.svg" },
    { name: "Node.js", logo: "/images/tech/nodejs.svg" },
    { name: "PostgreSQL", logo: "/images/tech/postgresql.svg" },
    { name: "MongoDB", logo: "/images/tech/mongodb.svg" },
    { name: "GraphQL", logo: "/images/tech/graphql.svg" },
];

/* ------------------------------------------------------------------ page */

export default function WebDevelopmentPage() {
    return (
        <>
            {/* ───────────────── Hero (split: text left, image right) ───────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* image pinned to the right half */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/web-dev.png"
                    alt="Web development preview"
                    className="absolute inset-y-0 right-0 hidden h-full w-[58%] object-contain object-left lg:block"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_55%_at_25%_10%,#000_30%,transparent_75%)]" />

                <Wrapper className="relative z-10 flex min-h-screen items-center pt-36 pb-20 lg:pt-44 lg:pb-28">
                    <Container>
                        <div className="max-w-2xl lg:max-w-[46%]" style={{ transform: "translateY(-2.5rem)" }}>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/60">
                                    Service / Web Development
                                </span>
                            </div>
                            <h1 className="mt-7 font-heading text-[40px] font-normal leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[64px]">
                                Websites that perform and{" "}
                                <span className="italic text-[#E6C565]">convert.</span>
                            </h1>
                            <p className="mt-6 max-w-xl font-base text-lg leading-relaxed text-white/70">
                                Fast, accessible, production-ready websites and web apps — engineered with a modern stack
                                and built to grow your business, not just look good.
                            </p>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-lg hover:bg-neutral-200">
                                        Start your project
                                    </Button>
                                </Link>
                                <Link href="/showcase">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-white/25 bg-white/10 px-7 py-3.5 font-base font-normal text-white shadow-sm backdrop-blur-sm hover:border-white/40 hover:bg-white/20">
                                        See our work
                                    </Button>
                                </Link>
                            </div>
                            {/* type chips */}
                            <div className="mt-9 flex flex-wrap gap-2">
                                {["Websites", "Web apps", "E-commerce"].map((t) => (
                                    <span key={t} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Capabilities (bento) ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="py-16 lg:py-24">
                    <Container>
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">What we build</span>
                            <h2 className="mt-4 font-heading text-3xl font-normal leading-[1.08] tracking-tight text-[#201D1D] md:text-4xl lg:text-5xl">
                                The web, done properly
                            </h2>
                        </div>
                        <div className="mt-14">
                            <StepFlow steps={CAPABILITIES} />
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Tech stack ───────────────── */}
            <section className="w-full bg-black">
                <Wrapper className="py-16 lg:py-24">
                    <Container>
                        <TechShowcase items={STACK} centerImage="/images/close.png" openImage="/images/open.png" />
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Stats ───────────────── */}
            <section className="w-full bg-[#F4F4F4]">
                <Wrapper className="py-10 lg:py-14">
                    <Container>
                        <AnimatedStats
                            items={[
                                { value: "100", label: "Lighthouse score" },
                                { value: "<1s", label: "Avg. load time" },
                                { value: "50+", label: "Sites shipped" },
                                { value: "99.9%", label: "Uptime" },
                            ]}
                        />
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Need a site that works as hard as you do?"
                subtitle="Let's build something fast, beautiful, and built to convert — and tell you exactly when it'll ship."
                ctaLabel="Book a free consultation"
                bg="#000000"
            />
        </>
    );
}
