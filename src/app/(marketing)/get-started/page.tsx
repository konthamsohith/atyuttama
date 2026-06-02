import { PageHero, SectionHeading, ProcessSteps, FeatureGrid, CTASection } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { MessageSquare, PencilRuler, Hammer, LineChart } from "lucide-react";

const steps = [
    { n: "01", title: "Tell us the idea", desc: "Send over what you're building and your deadline. We reply fast, usually within a business day." },
    { n: "02", title: "Scope call", desc: "A short call to pin down goals, scope, and whether we're the right team for it." },
    { n: "03", title: "Plan & proposal", desc: "You get a clear plan, timeline, and quote — no vague briefs, no surprises." },
    { n: "04", title: "Kick off", desc: "We start building, with weekly demos so you always see real progress." },
];

const youGet = [
    { icon: MessageSquare, title: "A straight answer", desc: "We tell you honestly whether we're the right fit and how fast we can ship." },
    { icon: PencilRuler, title: "Design + build + AI", desc: "One team for the whole stack — no handoffs between three vendors." },
    { icon: Hammer, title: "Weekly progress", desc: "Working demos every week, not status reports you have to decode." },
    { icon: LineChart, title: "Built to scale", desc: "Analytics and observability baked in, so it gets better the longer it runs." },
];

export default function GetStartedPage() {
    return (
        <>
            <PageHero
                eyebrow="Get Started"
                title="From idea to live, faster than you'd expect"
                subtitle="Starting a project with us is simple. Here's exactly how it goes — and what you get when you work with Atyuttama."
                ctaLabel="Start a project"
                ctaHref="/contact"
                secondaryLabel="Book a consultation"
                secondaryHref="/contact"
            />

            <div className="w-full bg-white py-16 lg:py-24">
                <Wrapper>
                    <Container>
                        <SectionHeading eyebrow="How it works" title="Four steps to kickoff" />
                        <div className="mt-12">
                            <ProcessSteps steps={steps} />
                        </div>
                    </Container>
                </Wrapper>
            </div>

            <div className="w-full bg-[#F4F4F4] py-16 lg:py-24">
                <Wrapper>
                    <Container>
                        <SectionHeading eyebrow="What you get" title="Why teams start here" />
                        <div className="mt-12">
                            <FeatureGrid items={youGet} columns={2} />
                        </div>
                    </Container>
                </Wrapper>
            </div>

            <CTASection
                title="Ready when you are."
                subtitle="Tell us what you're working on and we'll get back to you fast."
                ctaLabel="Start a project"
            />
        </>
    );
}
