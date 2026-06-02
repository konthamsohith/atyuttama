import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { AnimatedStats } from "@/components/shared/animated-stats";
import { StepFlow } from "@/components/shared/step-flow";
import { FoundationsReveal } from "@/components/shared/foundations-reveal";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ data */

const CAPABILITIES = [
    { title: "Custom AI models", desc: "Models trained on your own data and domain — prediction, classification, extraction, and generation tuned to your business.", image: "/images/Custom%20AI%20models.png" },
    { title: "Agents & copilots", desc: "Conversational assistants that don't just answer — they take action across your tools, for your team and your customers.", image: "/images/Agents%20%26%20copilots.png" },
    { title: "Workflow automation", desc: "We remove the repetitive, manual steps so your people spend their time on judgment, not busywork.", image: "/images/Workflow%20automation.png" },
    { title: "Data & insight", desc: "Turn scattered data into dashboards, forecasts, and decisions you can actually act on.", image: "/images/Data%20%26%20insight.png" },
];


const FOUNDATIONS: { name: string; logo: string }[] = [
    { name: "OpenAI", logo: "/images/ai/openai.svg" },
    { name: "Anthropic", logo: "/images/ai/anthropic.svg" },
    { name: "Llama", logo: "/images/ai/meta.svg" },
    { name: "Hugging Face", logo: "/images/ai/huggingface.svg" },
    { name: "LangChain", logo: "/images/ai/langchain.svg" },
    { name: "Pinecone", logo: "/images/ai/pinecone.svg" },
    { name: "AWS", logo: "/images/ai/amazonwebservices.svg" },
    { name: "Vertex AI", logo: "/images/ai/googlecloud.svg" },
];

/* ------------------------------------------------------------------ page */

export default function AiSolutionsPage() {
    return (
        <>
            {/* ───────────────── Hero (full-screen image) ───────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* image pinned to the right half */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/ai-solutions.png"
                    alt="AI Solutions"
                    className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover object-center lg:block"
                />
                {/* soft blend where the image meets the left text column */}
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-r from-black via-transparent to-transparent lg:block" />

                <Wrapper className="relative z-10 flex min-h-screen items-center pt-36 pb-20 lg:pt-44 lg:pb-28">
                    <Container>
                        <div className="max-w-2xl lg:max-w-[46%]" style={{ transform: "translateY(-2.5rem)" }}>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55">
                                    Service / AI Solutions
                                </span>
                            </div>
                            <h1 className="mt-7 font-heading text-[40px] font-normal leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[64px]">
                                AI that does the work,{" "}
                                <span className="italic text-[#E6C565]">not just the talking.</span>
                            </h1>
                            <p className="mt-6 max-w-xl font-base text-lg leading-relaxed text-white/65">
                                Custom AI and machine learning that turns your data into automation, insight, and a
                                genuine competitive edge — built into how you already work.
                            </p>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-lg hover:bg-neutral-200">
                                        Explore AI for your business
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-white/25 bg-white/10 px-7 py-3.5 font-base font-normal text-white shadow-sm backdrop-blur-sm hover:border-white/40 hover:bg-white/20">
                                        Talk to an expert
                                    </Button>
                                </Link>
                            </div>
                            {/* trust chips */}
                            <div className="mt-9 flex flex-wrap gap-2">
                                {["Private by default", "Production-grade", "Yours to own"].map((t) => (
                                    <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/65 backdrop-blur-sm">
                                        <ShieldCheck className="size-3 text-[#E6C565]" strokeWidth={2} />
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
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A646]">Capabilities</span>
                            <h2 className="mt-4 font-heading text-3xl font-normal leading-[1.08] tracking-tight text-[#201D1D] md:text-4xl lg:text-5xl">
                                AI that delivers real outcomes
                            </h2>
                            <p className="mt-4 font-base text-lg leading-relaxed text-[#201D1D]/55">
                                Not demos and slideware — systems that run in production and earn their keep.
                            </p>
                        </div>

                        <div className="mt-14">
                            <StepFlow steps={CAPABILITIES} />
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Foundations (auto-unlock) ───────────────── */}
            <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0c0b0b] via-[#141312] to-[#0c0b0b]">
                {/* faint sparkle dots + gold glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] opacity-50" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#E6C565]/10 blur-[120px]" />
                <Wrapper className="relative z-10 py-16 lg:py-24">
                    <Container className="flex flex-col items-center text-center">
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E6C565]">Built on proven foundations</span>
                        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-normal leading-[1.05] tracking-tight text-white md:text-5xl">
                            The best tools, <span className="text-[#E6C565]">for the job</span>
                        </h2>
                        <div className="mt-12">
                            <FoundationsReveal items={FOUNDATIONS} />
                        </div>
                        <p className="mt-10 max-w-md font-base text-sm leading-relaxed text-white/55">
                            We pick the right model and tools for the job — open or closed, hosted or private.
                        </p>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Stats ───────────────── */}
            <section className="w-full bg-[#F4F4F4]">
                <Wrapper className="py-12 lg:py-16">
                    <Container>
                        <AnimatedStats
                            items={[
                                { value: "60%", label: "Average time saved" },
                                { value: "24/7", label: "AI availability" },
                                { value: "10x", label: "Faster insights" },
                                { value: "100%", label: "Tailored to you" },
                            ]}
                        />
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Curious what AI could do for you?"
                subtitle="Let's find the highest-impact opportunity in your business — and show you exactly what it's worth."
                ctaLabel="Book a free consultation"
                bg="#000000"
            />
        </>
    );
}
