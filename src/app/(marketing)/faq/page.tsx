import { PageHero, CTASection } from "@/components/shared/page-sections";
import Faq from "@/components/marketing/faq";

export default function FaqPage() {
    return (
        <>
            <PageHero
                eyebrow="FAQ"
                title="Questions, answered"
                subtitle="The things people ask us most — about timelines, scope, pricing, and how we work. Don't see yours? Just ask."
                ctaLabel="Ask us anything"
                ctaHref="/contact"
                secondaryLabel="Book a call"
                secondaryHref="/contact"
            />

            <Faq />

            <CTASection
                title="Still have a question?"
                subtitle="Send it over — a real person replies, usually within a business day."
                ctaLabel="Contact us"
            />
        </>
    );
}
