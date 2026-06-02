import React from "react";
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Youtube, Facebook } from "lucide-react";
import Wrapper from "../global/wrapper";

const FOOTER_COLUMNS = [
    {
        title: "Services",
        links: [
            { label: "App Development", href: "/services/app-development" },
            { label: "AI Solutions", href: "/services/ai-solutions" },
            { label: "Digital Marketing", href: "/services/digital-marketing" },
            { label: "Web Development", href: "/services/web-development" },
            { label: "UI/UX Design", href: "/services/ui-ux-design" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Our Work", href: "/showcase" },
            { label: "Contact Us", href: "/contact" },
            { label: "Testimonials", href: "/#testimonials" },
            { label: "FAQ", href: "/#faq" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Blog", href: "/blog" },
            { label: "Get Started", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-and-conditions" },
            { label: "Cookie Settings", href: "#" },
        ],
    },
    {
        title: "Connect",
        links: [
            { label: "hello@atyuttama.com", href: "mailto:hello@atyuttama.com" },
            { label: "Start a project", href: "/contact" },
        ],
    },
];

const SOCIALS = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter / X" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
];

const LEGAL = [
    { label: "Sitemap", href: "#" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
    { label: "Cookie Settings", href: "#" },
];

const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden bg-[#F4F4F4]">
            {/* Giant brand watermark sitting behind the lower part of the footer */}
            <div
                className="pointer-events-none select-none absolute inset-x-0 bottom-[70px] flex justify-center leading-none"
                aria-hidden
            >
                <span
                    className="font-heading font-normal tracking-tight whitespace-nowrap text-[#201D1D]/[0.05]"
                    style={{ fontSize: "clamp(96px, 19vw, 320px)", lineHeight: 0.8 }}
                >
                    Atyuttama
                </span>
            </div>

            <Wrapper className="relative z-10">
                {/* Link columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 pt-16 lg:pt-20">
                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="font-base font-semibold text-xs uppercase tracking-[0.15em] text-[#201D1D]">
                                {col.title}
                            </h3>
                            <ul className="mt-5 space-y-3 text-sm font-base text-[#201D1D]/55">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#201D1D] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Spacer reserving room for the watermark */}
                <div style={{ height: "clamp(120px, 15vw, 240px)" }} />

                {/* Bottom bar */}
                <div className="relative border-t border-[#201D1D]/10 py-6 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-1.5 gap-y-2 text-xs font-base text-[#201D1D]/50">
                        <span className="mr-3">© {new Date().getFullYear()} Atyuttama. All rights reserved.</span>
                        {LEGAL.map((item, i) => (
                            <React.Fragment key={item.label}>
                                {i > 0 && <span className="text-[#201D1D]/25">·</span>}
                                <Link
                                    href={item.href}
                                    className="px-1.5 hover:text-[#201D1D] transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex items-center justify-center w-9 h-9 rounded-full text-[#201D1D]/50 hover:text-[#201D1D] hover:bg-[#E6C565]/25 transition-colors duration-200"
                            >
                                <Icon className="size-4" />
                            </Link>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </footer>
    );
};

export default Footer;
