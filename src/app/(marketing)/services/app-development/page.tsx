import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { StepFlow } from "@/components/shared/step-flow";
import { AnimatedStats } from "@/components/shared/animated-stats";
import { TechShowcase } from "@/components/shared/tech-showcase";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

const CAPABILITIES = [
    { title: "Native iOS & Android", image: "/images/Native%20iOS%20%26%20Android.png" },
    { title: "Cross-platform", image: "/images/Cross-platform.png" },
    { title: "Backend & APIs", image: "/images/Backend%20%26%20APIs.png" },
    { title: "Launch & support", image: "/images/Launch%20%26%20support.png" },
];

const STACK = [
    { name: "Swift", logo: "/images/tech/swift.svg" },
    { name: "Kotlin", logo: "/images/tech/kotlin.svg" },
    { name: "React Native", logo: "/images/tech/react.svg" },
    { name: "Flutter", logo: "/images/tech/flutter.svg" },
    { name: "Node.js", logo: "/images/tech/nodejs.svg" },
    { name: "Firebase", logo: "/images/tech/firebase.svg" },
    { name: "GraphQL", logo: "/images/tech/graphql.svg" },
    { name: "AWS", logo: "/images/tech/aws.svg" },
];

export default function AppDevelopmentPage() {
    return (
        <>
            {/* ───────────────── Hero (split: text left, image right) ───────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* image pinned to the right half */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/app-development.jpg"
                    alt="App development preview"
                    className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover object-center lg:block"
                />
                {/* soft blend where the image meets the left text column */}
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-r from-black via-transparent to-transparent lg:block" />
                <div className="pointer-events-none absolute -top-[14%] right-[-8%] h-[520px] w-[620px] rounded-full bg-[#E6C565]/14 blur-[130px]" />

                <Wrapper className="relative z-10 flex min-h-screen items-center pt-36 pb-20 lg:pt-44 lg:pb-28">
                    <Container>
                        <div className="max-w-2xl lg:max-w-[46%]" style={{ transform: "translateY(-1rem)" }}>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/70">
                                    Service / App Development
                                </span>
                            </div>
                            <h1 className="mt-7 font-heading text-[40px] font-normal leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[64px]">
                                Mobile apps built for performance and{" "}
                                <span className="italic text-[#E6C565]">scale.</span>
                            </h1>
                            <p className="mt-6 max-w-xl font-base text-lg leading-relaxed text-white/70">
                                Native and cross-platform apps engineered for speed, reliability, and a delightful
                                experience — from first idea to App Store.
                            </p>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-lg hover:bg-neutral-200">
                                        Start your app
                                    </Button>
                                </Link>
                                <Link href="/showcase">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-white/25 bg-white/10 px-7 py-3.5 font-base font-normal text-white shadow-sm backdrop-blur-sm hover:border-white/40 hover:bg-white/20">
                                        See our work
                                    </Button>
                                </Link>
                            </div>
                            {/* platform chips */}
                            <div className="mt-9 flex flex-wrap gap-2">
                                {["iOS", "Android", "Cross-platform"].map((t) => (
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
                                Everything your app needs
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
                                { value: "50+", label: "Apps shipped" },
                                { value: "4.8", label: "Avg. store rating" },
                                { value: "99.9%", label: "Crash-free sessions" },
                                { value: "10+", label: "Countries served" },
                            ]}
                        />
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Have an app idea?"
                subtitle="Let's turn it into a product your users love — and tell you exactly how fast we can ship it."
                ctaLabel="Book a free consultation"
                bg="#000000"
            />
        </>
    );
}
