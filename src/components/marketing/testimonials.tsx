import React from "react";
import { TESTIMONIALS } from "@/constants";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Marquee } from "../ui/marquee";

type Testimonial = {
    name: string;
    role: string;
    company: string;
    companyUrl: string;
    image: string;
    content: string;
    time: string;
    date: string;
    highlighted?: boolean;
};

const getInitials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const Testimonials = () => {
    const firstRow = TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2));
    const secondRow = TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2));

    return (
        <div id="testimonials" className="flex flex-col items-center justify-center relative w-full py-16 lg:py-24 scroll-mt-24">
            <Wrapper>
                {/* Heading */}
                <Container>
                    <div className="flex flex-col items-center text-center px-2 md:px-0">
                        <h2 className="font-heading font-normal tracking-tight text-[#201D1D] text-[32px] md:text-[43px] leading-[1.05] md:leading-[45px] max-w-2xl">
                            Don&apos;t take our word for it
                        </h2>
                        <p className="font-base font-normal text-[#201D1D]/70 text-[18px] md:text-[20px] leading-[28px] mt-4 max-w-xl">
                            Real words from the founders and teams we&apos;ve shipped with.
                        </p>
                    </div>
                </Container>

                {/* Marquee rows */}
                <Container delay={0.1}>
                    <div className="relative mt-12 lg:mt-16 flex flex-col gap-5 overflow-hidden">
                        <Marquee pauseOnHover className="[--duration:60s] [--gap:1.25rem]">
                            {firstRow.map((item) => (
                                <Item key={item.name} item={item} />
                            ))}
                        </Marquee>
                        <Marquee reverse pauseOnHover className="[--duration:60s] [--gap:1.25rem]">
                            {secondRow.map((item) => (
                                <Item key={item.name} item={item} />
                            ))}
                        </Marquee>

                        {/* Edge fades */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#F4F4F4] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#F4F4F4] to-transparent" />
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
};

const Item = ({ item }: { item: Testimonial }) => (
    <div className="flex flex-col justify-between w-[340px] lg:w-[380px] shrink-0 bg-white border border-[#201D1D]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#E6C565]/60 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-[#201D1D] text-white font-heading font-normal text-sm ring-2 ring-[#E6C565]/40">
                {getInitials(item.name)}
            </div>
            <div className="flex flex-col min-w-0">
                <h4 className="font-heading font-normal text-[#201D1D] text-base leading-tight truncate">
                    {item.name}
                </h4>
                <div className="font-base font-normal text-sm text-[#201D1D]/60 truncate">
                    {item.role}
                    <span className="text-[#C9A646] ml-1">@{item.company}</span>
                </div>
            </div>
        </div>

        {/* Quote */}
        <p className="font-base font-normal text-[#201D1D] text-[15px] leading-relaxed mt-5">
            &ldquo;{item.content}&rdquo;
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 text-xs font-base text-[#201D1D]/50 mt-6 pt-4 border-t border-[#201D1D]/10">
            <span>{item.time}</span>
            <span>·</span>
            <span>{item.date}</span>
        </div>
    </div>
);

export default Testimonials;
