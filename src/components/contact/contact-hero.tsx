"use client";

import React from "react";
import { motion } from "framer-motion";
import Wrapper from "../global/wrapper";
import Container from "../global/container";

const ContactHero = () => {
    return (
        <div className="relative z-0 w-full bg-transparent overflow-hidden" style={{ paddingTop: "5rem" }}>
            {/* Ambient Background Decorative Glow */}
            <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#E6C565]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-neutral-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <Wrapper className="pt-44 pb-4 lg:pt-52 lg:pb-6 relative z-10">
                <div className="flex flex-col items-center justify-center w-full">
                    {/* Headline */}
                    <Container delay={0.1}>
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-balance leading-[1.08] text-center font-heading font-normal tracking-tight text-[#201D1D] text-4xl md:text-6xl lg:text-[72px] mt-6 w-full max-w-4xl"
                        >
                            Tell us what you&apos;re building
                        </motion.h1>
                    </Container>

                    {/* Subtext */}
                    <Container delay={0.2}>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="font-base font-normal text-center text-balance text-[#201D1D]/70 text-base md:text-xl max-w-2xl mx-auto mt-6 leading-[1.62]"
                        >
                            A landing page, a full product, or AI for your business — send it over. We&apos;ll reply fast and tell you straight whether we&apos;re the right team and how quickly we can ship
                        </motion.p>
                    </Container>
                </div>
            </Wrapper>
        </div>
    );
};

export default ContactHero;
