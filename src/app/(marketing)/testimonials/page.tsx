import { PageHero, CTASection } from "@/components/shared/page-sections";
import Testimonials from "@/components/marketing/testimonials";

export default function TestimonialsPage() {
    return (
        <>
            <PageHero
                eyebrow="Testimonials"
                title="Don't take our word for it"
                subtitle="The teams we build for say it better than we can. Here's what working with Atyuttama actually looks like."
                ctaLabel="Start a project"
                ctaHref="/contact"
                secondaryLabel="See our work"
                secondaryHref="/showcase"
            />

            <Testimonials />

            <CTASection
                title="Want to be our next success story?"
                subtitle="Tell us what you're building — we'll tell you straight how fast we can ship it."
                ctaLabel="Book a free consultation"
            />
        </>
    );
}
