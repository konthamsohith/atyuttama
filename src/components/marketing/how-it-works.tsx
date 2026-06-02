import React from 'react'
import Wrapper from "../global/wrapper";
import Container from "../global/container";

const steps = [
    {
        number: "01",
        title: "Scope",
        subtitle: "& strategy",
        description: "We pin down what you're actually trying to achieve, who it's for, and what “done” looks like. No vague briefs.",
    },
    {
        number: "02",
        title: "Design & build",
        subtitle: "in sprints",
        description: "We design and build in tight two-week sprints, with AI accelerating the grunt work. You get working demos every week, not status reports.",
    },
    {
        number: "03",
        title: "Ship & scale",
        subtitle: "& improve",
        description: "We launch, watch the analytics, and keep refining. The product gets better the longer it runs.",
    },
];

const stats = [
    { value: "10,000+", label: "People using our work" },
    { value: "10", label: "Countries" },
    { value: "15+", label: "Products shipped" },
];

const HowItWorks = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24">
            <Wrapper>
                {/* Heading */}
                <Container>
                    <div className="flex flex-col lg:flex-row items-start lg:items-end lg:justify-between gap-6 px-2 md:px-0">
                        <h2 className="font-heading font-normal text-left tracking-tight text-[#201D1D] text-[32px] md:text-[43px] leading-[1.05] md:leading-[45px] max-w-2xl">
                            From idea to live
                            <br /> in a few clear moves
                        </h2>
                        <p className="font-base font-normal text-left text-[#201D1D] text-[18px] md:text-[23px] leading-[28px] mt-2 lg:mt-0 max-w-md">
                            A process built to ship quickly without the chaos — you always know what's happening and what's next.
                        </p>
                    </div>
                </Container>

                {/* Process rows */}
                <Container delay={0.1}>
                    <div className="mt-12 lg:mt-20 w-full px-2 md:px-0">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 border-t border-border py-8 lg:py-10 group"
                            >
                                <span className="lg:col-span-1 font-heading font-normal text-[#201D1D]/60 text-base tabular-nums">
                                    {step.number}
                                </span>
                                <div className="lg:col-span-5">
                                    <h3 className="font-heading font-normal tracking-tight text-[#201D1D] text-2xl md:text-[28px] leading-tight">
                                        {step.title}
                                        <br />
                                        {step.subtitle}
                                    </h3>
                                </div>
                                <p className="lg:col-span-6 font-base font-normal text-[#201D1D]/80 text-base md:text-[20px] leading-[25px] max-w-xl">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>

                {/* Stats */}
                <Container delay={0.2}>
                    <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 border-t border-border pt-12 lg:pt-16 px-2 md:px-0">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center text-center gap-3">
                                <span className="font-heading font-normal tracking-tight text-[#201D1D] text-6xl md:text-[80px] lg:text-[96px] leading-none whitespace-nowrap">
                                    {stat.value}
                                </span>
                                <span className="font-base font-normal text-[#201D1D] text-base md:text-[20px] leading-[25px] whitespace-nowrap">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </Container>
            </Wrapper>
        </div>
    )
};

export default HowItWorks
