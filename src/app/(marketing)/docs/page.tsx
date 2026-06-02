import { PageHero, SectionHeading, FeatureGrid, CTASection } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { BookOpen, Workflow, Plug, Code2, Bot, FileText } from "lucide-react";

const sections = [
    { icon: BookOpen, title: "Overview", desc: "What Atyuttama builds, how engagements work, and where to start." },
    { icon: Workflow, title: "Our process", desc: "Scope, design, build, ship — the four phases and what each delivers." },
    { icon: Plug, title: "Integrations", desc: "The platforms and tools we plug into, from payments to analytics." },
    { icon: Code2, title: "Engineering", desc: "Our stack, code standards, handover, and how ownership transfers to you." },
    { icon: Bot, title: "AI capabilities", desc: "Copilots, RAG, AI calling, and agents — what's possible and how we deploy it." },
    { icon: FileText, title: "Guides", desc: "Step-by-step references for working with us and getting the most from your build." },
];

export default function DocumentationPage() {
    return (
        <>
            <PageHero
                eyebrow="Documentation"
                title="Everything, written down"
                subtitle="How we work, what we build, and how it all fits together — references for clients and teams partnering with us."
                ctaLabel="Get started"
                ctaHref="/get-started"
                secondaryLabel="Talk to us"
                secondaryHref="/contact"
            />

            <div className="w-full bg-white py-16 lg:py-24">
                <Wrapper>
                    <Container>
                        <SectionHeading eyebrow="Contents" title="Browse the docs" />
                        <div className="mt-12">
                            <FeatureGrid items={sections} columns={3} />
                        </div>
                    </Container>
                </Wrapper>
            </div>

            <CTASection
                title="Prefer to just talk it through?"
                subtitle="Book a call and we'll walk you through anything you need."
                ctaLabel="Book a call"
            />
        </>
    );
}
