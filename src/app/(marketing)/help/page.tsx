import { PageHero, SectionHeading, FeatureGrid, CTASection } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Rocket, CreditCard, LifeBuoy, Settings, ShieldCheck, MessageCircle } from "lucide-react";

const topics = [
    { icon: Rocket, title: "Getting started", desc: "How a project kicks off, what we need from you, and what to expect in week one." },
    { icon: CreditCard, title: "Billing & pricing", desc: "How we scope and quote, payment milestones, and what's included in a project." },
    { icon: Settings, title: "Your project", desc: "Tracking progress, weekly demos, giving feedback, and requesting changes." },
    { icon: LifeBuoy, title: "After launch", desc: "Support, maintenance, analytics, and how we keep improving what we ship." },
    { icon: ShieldCheck, title: "Accounts & access", desc: "Handover, credentials, code ownership, and keeping everything secure." },
    { icon: MessageCircle, title: "Talk to a human", desc: "Can't find it here? Reach the team directly and we'll sort it fast." },
];

export default function HelpCenterPage() {
    return (
        <>
            <PageHero
                eyebrow="Help Center"
                title="How can we help?"
                subtitle="Answers on getting started, billing, your project, and life after launch. If it's not here, a real person is one message away."
                ctaLabel="Contact support"
                ctaHref="/contact"
                secondaryLabel="Read the FAQ"
                secondaryHref="/faq"
            />

            <div className="w-full bg-white py-16 lg:py-24">
                <Wrapper>
                    <Container>
                        <SectionHeading eyebrow="Browse topics" title="Find what you need" />
                        <div className="mt-12">
                            <FeatureGrid items={topics} columns={3} />
                        </div>
                    </Container>
                </Wrapper>
            </div>

            <CTASection
                title="Didn't find your answer?"
                subtitle="Send us a message — no bots, no sales sequence, just a straight answer."
                ctaLabel="Contact us"
            />
        </>
    );
}
