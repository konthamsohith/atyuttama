"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Linkedin, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu when clicking anywhere outside it (or pressing Escape)
    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKey);
        };
    }, [isOpen]);

    return (
        <header className="fixed top-4 inset-x-0 z-50 w-full flex justify-center pointer-events-none">
            <motion.div
                ref={menuRef}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    maxWidth: isOpen ? "1100px" : "480px",
                }}
                transition={{
                    maxWidth: {
                        type: "spring",
                        stiffness: 220,
                        damping: 28,
                        delay: isOpen ? 0 : 0.18 // Delay width shrink on close so height collapses first
                    },
                    y: { type: "spring", stiffness: 220, damping: 28 },
                    opacity: { duration: 0.2 }
                }}
                className="w-[95%] pointer-events-auto"
            >
                <motion.div
                    animate={{
                        borderRadius: isOpen ? "8px" : "12px",
                        padding: isOpen ? "24px" : "8px 16px"
                    }}
                    transition={{
                        borderRadius: {
                            type: "spring",
                            stiffness: 220,
                            damping: 28,
                            delay: isOpen ? 0 : 0.18
                        },
                        padding: {
                            type: "spring",
                            stiffness: 220,
                            damping: 28,
                            delay: isOpen ? 0 : 0.18
                        }
                    }}
                    className="w-full bg-[#201D1D] border border-neutral-800 text-white shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Top Row - Always Visible */}
                    <div className="flex items-center justify-between w-full h-12 px-2">
                        {/* Left Trigger Button */}
                        <div className="flex-1 flex justify-start">
                            {isOpen ? (
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 hover:bg-neutral-800/80 rounded-lg cursor-pointer transition-all duration-300 outline-none font-base font-normal px-5 py-2"
                                    style={{
                                        fontFamily: '"Haffer VF", Arial, sans-serif',
                                        fontWeight: 400,
                                        fontSize: "19px",
                                        lineHeight: "19px",
                                        color: "rgb(244, 244, 244)"
                                    }}
                                >
                                    <X className="w-[19px] h-[19px] text-[#F4F4F4]" />
                                    <span>Menu</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="flex items-center gap-2 hover:bg-neutral-800/80 rounded-lg cursor-pointer transition-all duration-300 outline-none font-base font-normal px-5 py-2"
                                    style={{
                                        fontFamily: '"Haffer VF", Arial, sans-serif',
                                        fontWeight: 400,
                                        fontSize: "19px",
                                        lineHeight: "19px",
                                        color: "rgb(244, 244, 244)"
                                    }}
                                >
                                    <Menu className="w-[19px] h-[19px] text-[#F4F4F4]" />
                                    <span>Menu</span>
                                </button>
                            )}
                        </div>

                        {/* Center Logo */}
                        <div className="flex-1 flex justify-center">
                            {isOpen ? (
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 font-semibold tracking-tight text-lg uppercase select-none cursor-pointer text-white"
                                >
                                    <span>Atyuttama</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/"
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    <Image
                                        src="/images/logo%20favicon%20color.png"
                                        alt="Logo"
                                        width={24}
                                        height={24}
                                        className="size-6 object-contain"
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Right Login / Join Actions */}
                        <div className="flex-1 flex justify-end items-center">
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer"
                            >
                                <Button
                                    className="bg-[#E6C565] hover:opacity-90 !rounded-lg border-0 h-auto cursor-pointer font-base font-normal px-5 py-2"
                                    style={{
                                        fontFamily: '"Haffer VF", Arial, sans-serif',
                                        fontWeight: 400,
                                        fontSize: "19px",
                                        lineHeight: "19px",
                                        color: "#000000"
                                    }}
                                >
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mega Menu Body (Expandable Content) */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    height: { duration: 0.25, ease: "easeInOut" },
                                    opacity: { duration: 0.15 }
                                }}
                                className="w-full overflow-hidden"
                            >
                                {/* Divider Line */}
                                <div className="w-full h-px bg-neutral-800/60 my-6" />

                                {/* Columns Content */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full min-w-[320px] md:min-w-[800px] px-2 pb-2">
                                    {/* Column 1 - About */}
                                    <div className="flex flex-col">
                                        <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold select-none mb-4">
                                            Studio
                                        </span>
                                        <div className="flex flex-col gap-3">
                                            <Link
                                                href="/our-story"
                                                onClick={() => setIsOpen(false)}
                                                className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                            >
                                                Our Story
                                            </Link>
                                            <Link
                                                href="/our-mission"
                                                onClick={() => setIsOpen(false)}
                                                className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                            >
                                                Our Mission
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Column 2 - Services */}
                                    <div className="flex flex-col justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold select-none mb-4">
                                                Explore
                                            </span>
                                            <div className="flex flex-col gap-3">
                                                <Link
                                                    href="/services/app-development"
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                                >
                                                    App Development
                                                </Link>
                                                <Link
                                                    href="/services/ai-solutions"
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                                >
                                                    AI Solutions
                                                </Link>
                                                <Link
                                                    href="/services/digital-marketing"
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                                >
                                                    Digital Marketing
                                                </Link>
                                                <Link
                                                    href="/services/web-development"
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                                >
                                                    Web Development
                                                </Link>
                                                <Link
                                                    href="/services/ui-ux-design"
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-2xl font-medium tracking-tight text-white/90 hover:text-[#E6C565] transition-all duration-300 cursor-pointer"
                                                >
                                                    UI/UX Design
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Social Icons Row */}
                                        <div className="flex items-center gap-3 mt-8">
                                            <Link
                                                href="#"
                                                className="size-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Linkedin className="size-4" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="size-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Instagram className="size-4" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="size-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Twitter className="size-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Column 3 - Contact teaser card */}
                                    <div className="flex w-full">
                                        <div className="w-full rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 flex flex-col items-start justify-between min-h-[220px] relative overflow-hidden">
                                            <div>
                                                <span className="text-[9px] uppercase tracking-wider bg-[#E6C565]/20 text-[#E6C565] px-2 py-0.5 rounded-sm font-semibold select-none">
                                                    Get Started
                                                </span>
                                                <h4 className="text-xl lg:text-2xl font-semibold tracking-tight leading-snug text-white/90 mt-3 max-w-[220px]">
                                                    Ready to start your project?
                                                </h4>
                                                <p className="text-xs text-white/50 mt-2 max-w-[220px] leading-relaxed">
                                                    Tell us your idea and our team will bring it to life.
                                                </p>
                                            </div>
                                            <Link
                                                href="/contact"
                                                onClick={() => setIsOpen(false)}
                                                className="w-full mt-4"
                                            >
                                                <Button
                                                    className="bg-[#E6C565] text-[#201D1D] hover:opacity-90 w-full rounded-lg font-medium text-sm py-2 h-auto cursor-pointer transition-opacity border-0"
                                                >
                                                    Start a project
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </header>
    );
};

export default Navbar;
