import { PageHero } from "@/components/shared/page-sections";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";

const sections = [
    { h: "1. Introduction", p: "This Privacy Policy explains how Atyuttama (\"we\", \"us\") collects, uses, and protects your information when you visit our website or work with us. By using our site, you agree to the practices described here." },
    { h: "2. Information we collect", p: "We collect information you give us directly — your name, email, company, and project details when you contact us or book a consultation. We also collect basic analytics automatically, such as pages visited, device type, and approximate location, to understand how the site is used." },
    { h: "3. How we use your information", p: "We use your information to respond to enquiries, scope and deliver projects, improve our site, and — only if you opt in — send occasional updates. We do not sell your personal data to anyone." },
    { h: "4. Cookies & analytics", p: "We use cookies and similar tools to keep the site working and to measure usage. You can control non-essential cookies any time on our Cookie Settings page or through your browser." },
    { h: "5. Sharing & disclosure", p: "We share data only with trusted service providers who help us run the business (for example, analytics, email, and scheduling tools), and only as needed. We may also disclose information where required by law." },
    { h: "6. Data security", p: "We use reasonable technical and organisational measures to protect your information. No method of transmission over the internet is fully secure, but we work to keep your data safe." },
    { h: "7. Your rights", p: "You can ask us to access, correct, or delete the personal information we hold about you, and to stop sending you marketing. Email us and we'll action it promptly." },
    { h: "8. Changes to this policy", p: "We may update this policy from time to time. The latest version will always live on this page with a revised date above." },
    { h: "9. Contact", p: "Questions about this policy or your data? Email us at hello@atyuttama.com." },
];

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageHero
                eyebrow="Legal"
                title="Privacy Policy"
                subtitle="How we collect, use, and protect your information — in plain language."
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
