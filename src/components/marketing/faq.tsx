"use client";

import { useState } from "react";
import { FAQS } from "@/constants";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
    const [open, setOpen] = useState<string>("");
    const happy = open !== "";

    return (
        <div id="faq" className="flex flex-col items-center justify-center relative w-full py-16 lg:py-24 overflow-hidden scroll-mt-24">
            {/* Subtle centered grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(32,29,29,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(32,29,29,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_55%_55%_at_50%_0%,#000_10%,transparent_75%)] -z-10" />

            <Wrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-stretch">
                    {/* Left — heading + accordion */}
                    <div className="flex flex-col px-2 md:px-0">
                        <Container>
                            <div className="flex flex-col items-start text-left">
                                <h2 className="font-heading font-normal tracking-tight text-[#201D1D] text-[32px] md:text-[43px] leading-[1.05] md:leading-[45px]">
                                    Frequently asked questions
                                </h2>
                                <p className="font-base font-normal text-[#201D1D]/70 text-[18px] md:text-[20px] leading-[28px] mt-4 max-w-md">
                                    Can&apos;t find your answer? Reach out and a real person will get back to you.
                                </p>
                            </div>
                        </Container>

                        <Container delay={0.1}>
                            <div className="mt-8 lg:mt-10 w-full">
                                <Accordion
                                    type="single"
                                    collapsible
                                    value={open}
                                    onValueChange={setOpen}
                                    className="w-full flex flex-col gap-3"
                                >
                                    {FAQS.map((faq, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                            className="bg-white border border-[#201D1D]/10 rounded-xl px-5 lg:px-6 transition-colors duration-300 data-[state=open]:border-[#E6C565]/70 hover:border-[#201D1D]/25"
                                        >
                                            <AccordionTrigger className="font-heading font-normal text-[#201D1D] text-base lg:text-lg hover:no-underline py-5 [&>svg]:text-[#C9A646] [&>svg]:size-5">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="font-base font-normal text-[#201D1D]/70 text-[15px] lg:text-base leading-relaxed pb-5 pr-6">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </Container>
                    </div>

                    {/* Right — mascot that turns happy when a question opens */}
                    <Container delay={0.2} className="hidden lg:flex h-full">
                        <div className="flex items-center justify-center w-full h-full">
                            <svg
                                viewBox="0 0 120 120"
                                className="w-[400px] h-[400px] xl:w-[480px] xl:h-[480px] drop-shadow-md transition-transform duration-300 ease-out"
                                style={{ transform: happy ? "translateY(-6px) scale(1.04)" : "none" }}
                            >
                                <g transform="rotate(-6 60 66)">
                                    {/* feet */}
                                    <ellipse cx="46" cy="106" rx="9" ry="5" fill="#C9A646" />
                                    <ellipse cx="76" cy="106" rx="9" ry="5" fill="#C9A646" />
                                    {/* head */}
                                    <rect x="24" y="34" width="74" height="74" rx="26" fill="#E6C565" />

                                    {/* happy cheeks */}
                                    <circle cx="38" cy="78" r="5" fill="#E2843D" opacity={happy ? 0.4 : 0} style={{ transition: "opacity 0.3s ease" }} />
                                    <circle cx="84" cy="78" r="5" fill="#E2843D" opacity={happy ? 0.4 : 0} style={{ transition: "opacity 0.3s ease" }} />

                                    {/* eyes */}
                                    {happy ? (
                                        // happy squinting eyes (^ ^)
                                        <g stroke="#201D1D" strokeWidth="3.5" strokeLinecap="round" fill="none">
                                            <path d="M43 66 q6 -6 12 0" />
                                            <path d="M68 66 q6 -6 12 0" />
                                        </g>
                                    ) : (
                                        // curious blinking eyes
                                        <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "mascot-blink 4.5s ease-in-out infinite" }}>
                                            <circle cx="49" cy="66" r="6" fill="#201D1D" />
                                            <circle cx="74" cy="66" r="6" fill="#201D1D" />
                                            <circle cx="47" cy="64" r="1.6" fill="#fff" />
                                            <circle cx="72" cy="64" r="1.6" fill="#fff" />
                                        </g>
                                    )}

                                    {/* mouth: curious 'o' -> big smile */}
                                    {happy ? (
                                        <path d="M48 82 Q61 96 74 82" fill="none" stroke="#201D1D" strokeWidth="3.5" strokeLinecap="round" />
                                    ) : (
                                        <circle cx="61" cy="84" r="4" fill="none" stroke="#201D1D" strokeWidth="3" />
                                    )}
                                </g>

                                {/* bubble: '?' -> '!' */}
                                <g className="animate-pulse">
                                    <circle cx="94" cy="28" r="16" fill="#201D1D" />
                                    <text
                                        x="94"
                                        y="35"
                                        textAnchor="middle"
                                        fontSize="20"
                                        fontWeight="700"
                                        fill="#E6C565"
                                        fontFamily='"Haffer XH", Arial, sans-serif'
                                    >
                                        {happy ? "!" : "?"}
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </Container>
                </div>
            </Wrapper>
        </div>
    )
};

export default Faq
