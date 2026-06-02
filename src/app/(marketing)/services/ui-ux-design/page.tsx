import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { StepFlow } from "@/components/shared/step-flow";
import { FoundationsReveal } from "@/components/shared/foundations-reveal";
import { AnimatedStats } from "@/components/shared/animated-stats";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ data */

const CAPABILITIES = [
    { title: "UX research", desc: "Interviews, usability testing, and data to ground every decision in what users actually need.", image: "/images/UX%20research.png" },
    { title: "UI design", desc: "Beautiful, on-brand interfaces — pixel-perfect, accessible, and ready to build.", image: "/images/UI%20design.png" },
    { title: "Design systems", desc: "Scalable component libraries and tokens that keep your product consistent as it grows.", image: "/images/Design%20systems.png" },
    { title: "Prototyping", desc: "Clickable, high-fidelity prototypes that validate flows before a line of code is written.", image: "/images/Prototyping.png" },
];

const TOOLS = [
    { name: "Figma", logo: "/images/tech/figma.svg" },
    { name: "Adobe XD", logo: "/images/tech/xd.svg" },
    { name: "Sketch", logo: "/images/tech/sketch.svg" },
    { name: "Photoshop", logo: "/images/tech/photoshop.svg" },
    { name: "Illustrator", logo: "/images/tech/illustrator.svg" },
    { name: "After Effects", logo: "/images/tech/aftereffects.svg" },
];

/* ------------------------------------------------------------------ page */

export default function UiUxDesignPage() {
    return (
        <>
            {/* ───────────────── Hero (split: text left, image right) ───────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* full-bleed image, faded into the dark on the left (no hard half/half seam) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/ui-ux.png"
                    alt="UI/UX design preview"
                    className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
                />
                {/* black fade: solid behind the copy on the left, clearing toward the image on the right */}
                <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black from-[22%] via-black/75 to-transparent lg:block" />
                {/* gentle overall darken for depth + contrast */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_55%_at_25%_10%,#000_30%,transparent_75%)]" />

                <Wrapper className="relative z-10 flex min-h-screen items-center pt-36 pb-20 lg:pt-44 lg:pb-28">
                    <Container>
                        <div className="max-w-2xl lg:max-w-[46%]" style={{ transform: "translateY(-2.5rem)" }}>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/60">
                                    Service / UI&nbsp;·&nbsp;UX Design
                                </span>
                            </div>
                            <h1 className="mt-7 font-heading text-[40px] font-normal leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[64px]">
                                Interfaces people{" "}
                                <span className="italic text-[#E6C565]">love to use.</span>
                            </h1>
                            <p className="mt-6 max-w-xl font-base text-lg leading-relaxed text-white/70">
                                Beautiful, intuitive product design — from user research to polished prototypes — crafted
                                around your users and built to convert.
                            </p>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-lg hover:bg-neutral-200">
                                        Start a design project
                                    </Button>
                                </Link>
                                <Link href="/showcase">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-white/25 bg-white/10 px-7 py-3.5 font-base font-normal text-white shadow-sm backdrop-blur-sm hover:border-white/40 hover:bg-white/20">
                                        See our work
                                    </Button>
                                </Link>
                            </div>
                            {/* discipline chips */}
                            <div className="mt-9 flex flex-wrap gap-2">
                                {["Research", "UI", "Prototyping"].map((t) => (
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
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">What we do</span>
                            <h2 className="mt-4 font-heading text-3xl font-normal leading-[1.08] tracking-tight text-[#201D1D] md:text-4xl lg:text-5xl">
                                Design that works as well as it looks
                            </h2>
                        </div>
                        <div className="mt-14">
                            <StepFlow steps={CAPABILITIES} />
                        </div>
                    </Container>
                </Wrapper>
            </section>


            {/* ───────────────── Tools (auto-unlock) ───────────────── */}
            <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0c0b0b] via-[#141312] to-[#0c0b0b]">
                {/* faint sparkle dots + gold glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] opacity-50" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#E6C565]/10 blur-[120px]" />
                <Wrapper className="relative z-10 py-16 lg:py-24">
                    <Container className="flex flex-col items-center text-center">
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E6C565]">Our toolkit</span>
                        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-normal leading-[1.05] tracking-tight text-white md:text-5xl">
                            The best tools, <span className="text-[#E6C565]">for the job</span>
                        </h2>
                        <div className="mt-12">
                            <FoundationsReveal items={TOOLS} fullColor />
                        </div>
                        <p className="mt-10 max-w-md font-base text-sm leading-relaxed text-white/55">
                            We pick the right tool for the work — research, UI, systems, and motion, all in one flow.
                        </p>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Stats ───────────────── */}
            <section className="w-full bg-[#F4F4F4]">
                <Wrapper className="py-10 lg:py-14">
                    <Container>
                        <AnimatedStats
                            items={[
                                { value: "2.4x", label: "Avg. conversion lift" },
                                { value: "−38%", label: "Support tickets" },
                                { value: "50+", label: "Products designed" },
                                { value: "100%", label: "User-tested" },
                            ]}
                        />
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Ready to design something people love?"
                subtitle="Let's turn your idea into an interface that's a joy to use — and tell you exactly how we'll get there."
                ctaLabel="Book a free consultation"
                bg="#000000"
            />
        </>
    );
}
