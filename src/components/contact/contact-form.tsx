import Wrapper from "../global/wrapper"
import Container from "../global/container"
import { Linkedin, Instagram, Twitter } from "lucide-react"
import { CONTACT_CARDS } from "@/constants"
import ContactPanel from "./contact-panel"

const ContactForm = () => {
    return (
        <div className="w-full pb-16 lg:pb-24 bg-white" style={{ paddingTop: "3rem" }}>
            <Wrapper>
                <Container delay={0.1}>
                    {/* Section heading above the card */}
                    <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: "4.5rem" }}>
                        <h2 className="font-heading font-normal tracking-tight text-[#201D1D] text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                            Tell us what you&apos;re building
                        </h2>
                        <p className="font-base font-normal text-[#201D1D]/60 text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
                            A landing page, a full product, or AI for your business — send it over. We&apos;ll reply fast and tell you straight whether we&apos;re the right team and how quickly we can ship.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#201D1D]/10 bg-white shadow-[0_30px_80px_-32px_rgba(32,29,29,0.32)]">
                        {/* LEFT — info panel (dark, on-brand) */}
                        <div className="relative flex flex-col justify-between gap-10 bg-[#201D1D] text-white p-8 md:p-10 lg:p-11 overflow-hidden">
                            {/* decorative glow + dotted texture */}
                            <div className="absolute -top-24 -right-20 w-72 h-72 bg-[#E6C565]/12 rounded-full blur-[90px] pointer-events-none" />
                            <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-[#E6C565]/[0.05] rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

                            {/* Intro */}
                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#E6C565]">
                                    <span className="w-5 h-px bg-[#E6C565]/60" />
                                    Get in touch
                                </span>
                                <h3 className="font-heading font-normal text-3xl md:text-4xl leading-[1.1] tracking-tight mt-5">
                                    Let&apos;s build something great together
                                </h3>
                                <p className="font-base font-normal text-white/55 text-sm md:text-[15px] leading-relaxed mt-4 max-w-sm">
                                    We read every message and reply within one business day. No bots, no sales sequence — a real person.
                                </p>
                            </div>

                            {/* Contact details */}
                            <div className="relative z-10 flex flex-col gap-5">
                                {CONTACT_CARDS.map((card) => {
                                    const Icon = card.icon
                                    return (
                                        <div key={card.title} className="group flex items-center gap-4">
                                            <span className="flex items-center justify-center size-11 rounded-xl bg-white/[0.06] border border-white/10 text-[#E6C565] shrink-0 group-hover:bg-[#E6C565] group-hover:text-[#201D1D] transition-colors duration-300">
                                                <Icon className="size-5" strokeWidth={1.6} />
                                            </span>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                                                    {card.title}
                                                </span>
                                                <span className="font-base font-normal text-white/90 text-sm md:text-base break-words">
                                                    {card.value}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Socials */}
                            <div className="relative z-10">
                                <div className="h-px w-full bg-white/10 mb-5" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40" style={{ transform: "translateY(10px)" }}>
                                        Follow us
                                    </span>
                                    <div className="flex items-center gap-2.5" style={{ transform: "translateY(10px)" }}>
                                        {[Linkedin, Instagram, Twitter].map((Social, i) => (
                                            <a
                                                key={i}
                                                href="#"
                                                className="flex items-center justify-center size-9 rounded-full bg-white/[0.06] border border-white/10 text-white/70 hover:bg-[#E6C565] hover:text-[#201D1D] hover:border-[#E6C565] transition-colors duration-300"
                                            >
                                                <Social className="size-4" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — message form / book a call */}
                        <ContactPanel />
                    </div>
                </Container>
            </Wrapper>
        </div>
    )
}

export default ContactForm
