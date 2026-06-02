import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { StepFlow } from "@/components/shared/step-flow";
import { TechShowcase } from "@/components/shared/tech-showcase";
import { AnimatedStats } from "@/components/shared/animated-stats";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

const CAPABILITIES = [
    { title: "SEO & content", desc: "Technical SEO, content, and on-page work that grows qualified organic traffic month after month.", image: "/images/SEO%20%26%20content.png" },
    { title: "Paid acquisition", desc: "Google, Meta, and beyond — campaigns built to acquire customers profitably, not just chase clicks.", image: "/images/Paid%20acquisition.png" },
    { title: "Social & creative", desc: "Content and creative that earns attention and turns followers into actual customers.", image: "/images/Social%20%26%20creative.png" },
    { title: "Analytics & CRO", desc: "Tracking, dashboards, and conversion optimization that tie every dollar to real revenue.", image: "/images/Analytics%20%26%20CRO.png" },
];

const TOOLS = [
    { name: "Google Ads", logo: "/images/tools/googleads.svg" },
    { name: "Meta Ads", logo: "/images/tools/meta.svg" },
    { name: "GA4", logo: "/images/tools/ga4.svg" },
    { name: "Search Console", logo: "/images/tools/searchconsole.svg" },
    { name: "SEMrush", logo: "/images/tools/semrush.svg" },
    { name: "HubSpot", logo: "/images/tools/hubspot.svg" },
    { name: "Mailchimp", logo: "/images/tools/mailchimp.svg" },
    { name: "Looker Studio", logo: "/images/tools/looker.svg" },
];

export default function DigitalMarketingPage() {
    return (
        <>
            {/* ───────────────── Hero (split: text left, image right) ───────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/digital-marketing.png"
                    alt="Digital marketing preview"
                    className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover object-center lg:block"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-r from-black via-transparent to-transparent lg:block" />

                <Wrapper className="relative z-10 flex min-h-screen items-center pt-36 pb-20 lg:pt-44 lg:pb-28">
                    <Container>
                        <div className="max-w-2xl lg:max-w-[46%]">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#E6C565]/60" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/70">
                                    Service / Digital Marketing
                                </span>
                            </div>
                            <h1 className="mt-7 font-heading text-[40px] font-normal leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[64px]">
                                Marketing that grows real{" "}
                                <span className="italic text-[#E6C565]">revenue.</span>
                            </h1>
                            <p className="mt-6 max-w-xl font-base text-lg leading-relaxed text-white/70">
                                Data-driven campaigns and SEO that grow qualified traffic, leads, and measurable revenue —
                                not posts for the sake of posting.
                            </p>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <Link href="/contact">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-lg hover:bg-neutral-200">
                                        Scale your marketing
                                    </Button>
                                </Link>
                                <Link href="/showcase">
                                    <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-white/25 bg-white/10 px-7 py-3.5 font-base font-normal text-white shadow-sm backdrop-blur-sm hover:border-white/40 hover:bg-white/20">
                                        See our work
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-9 flex flex-wrap gap-2">
                                {["SEO", "Paid", "Social", "Analytics"].map((t) => (
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
                                Growth across every channel
                            </h2>
                        </div>
                        <div className="mt-14">
                            <StepFlow steps={CAPABILITIES} />
                        </div>
                    </Container>
                </Wrapper>
            </section>


            {/* ───────────────── Tools ───────────────── */}
            <section className="w-full bg-black">
                <Wrapper className="py-20 lg:py-28">
                    <Container>
                        <TechShowcase
                            items={TOOLS}
                            centerImage="/images/tech.png"
                            eyebrow="Tools we run on"
                            title={
                                <>
                                    The marketing
                                    <br />
                                    <span className="text-[#E6C565]">stack</span>
                                </>
                            }
                            desc="We run on the platforms that move real numbers — paid, SEO, CRM, and analytics, wired together."
                            hint="Our marketing stack"
                        />
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Stats ───────────────── */}
            <section className="w-full bg-[#F4F4F4]">
                <Wrapper className="py-10 lg:py-14">
                    <Container>
                        <AnimatedStats
                            items={[
                                { value: "3x", label: "Avg. return on spend" },
                                { value: "200%", label: "Avg. traffic growth" },
                                { value: "40+", label: "Campaigns run" },
                                { value: "10", label: "Countries served" },
                            ]}
                        />
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Ready to grow?"
                subtitle="Tell us your goals — we'll build the plan to hit them, and show you exactly how we'll measure it."
                ctaLabel="Book a free consultation"
                bg="#000000"
            />
        </>
    );
}
