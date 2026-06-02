import { PageHero } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";

const sections = [
    { h: "1. Acceptance of terms", p: "By accessing this website or engaging Atyuttama for services, you agree to these Terms & Conditions. If you don't agree, please don't use the site." },
    { h: "2. Our services", p: "Atyuttama provides design, software development, and AI services. The specific scope, deliverables, timeline, and price for any project are defined in a separate proposal or agreement between us and the client." },
    { h: "3. Use of the site", p: "You agree to use this site lawfully and not to disrupt it, attempt to access it improperly, or misuse any content. We may update or remove content at any time." },
    { h: "4. Intellectual property", p: "All content on this site — text, design, code, and brand assets — belongs to Atyuttama unless stated otherwise. Client work and ownership transfer are governed by the individual project agreement." },
    { h: "5. Client work & deliverables", p: "Project-specific terms (ownership, licensing, revisions, and support) are set out in your project agreement. Where there is any conflict, that agreement takes precedence over these general terms." },
    { h: "6. Payments", p: "Fees, milestones, and payment schedules are defined per project. Work may pause if agreed payments are overdue." },
    { h: "7. Disclaimers", p: "The site is provided \"as is\". We do our best to keep information accurate and the site available, but we don't guarantee it will be error-free or uninterrupted." },
    { h: "8. Limitation of liability", p: "To the extent permitted by law, Atyuttama is not liable for indirect or consequential losses arising from use of this site. Liability for project work is governed by the relevant project agreement." },
    { h: "9. Changes to these terms", p: "We may revise these terms from time to time. The current version always lives on this page with a revised date above." },
    { h: "10. Contact", p: "Questions about these terms? Email us at hello@atyuttama.com." },
];

export default function TermsPage() {
    return (
        <>
            <PageHero
                eyebrow="Legal"
                title="Terms & Conditions"
                subtitle="The terms that apply when you use our site or work with us."
            />
            <div className="w-full bg-white py-16 lg:py-24">
                <Wrapper>
                    <Container>
                        <div className="mx-auto max-w-3xl">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#201D1D]/40">
                                Last updated: June 2, 2026
                            </p>
                            <div className="mt-10 flex flex-col gap-10">
                                {sections.map((s) => (
                                    <section key={s.h}>
                                        <h2 className="font-heading text-2xl font-normal text-[#201D1D]">{s.h}</h2>
                                        <p className="mt-3 font-base text-[#201D1D]/65 leading-relaxed">{s.p}</p>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </Container>
                </Wrapper>
            </div>
        </>
    );
}
