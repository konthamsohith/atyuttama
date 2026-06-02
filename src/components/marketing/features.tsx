import React from 'react'
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { FEATURES } from "@/constants";
import { 
    Sparkles, 
    Eye, 
    BookOpen, 
    RefreshCw, 
    Type, 
    MousePointerClick, 
    Image as ImageIcon, 
    Sliders, 
    Film, 
    ArrowUpRight 
} from 'lucide-react';

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'Eye': 
            return <Eye className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'Sparkles': 
            return <Sparkles className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'BookOpen': 
            return <BookOpen className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'RefreshCw': 
            return <RefreshCw className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'Type': 
            return <Type className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'MousePointerClick': 
            return <MousePointerClick className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'Image': 
            return <ImageIcon className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'Sliders': 
            return <Sliders className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        case 'Film': 
            return <Film className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
        default: 
            return <Sparkles className="w-6 h-6 text-[#201D1D] group-hover:text-[#E6C565] transition-colors duration-300" />;
    }
};

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 relative overflow-hidden">
            {/* Subtle light grey background texture */}
            <div className="absolute inset-0 bg-[#F4F4F4]/40 -z-20" />
            
            <Wrapper>
                <Container>
                    <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center">
                        <h2 className="text-4xl lg:text-5xl font-heading font-normal text-left lg:text-center tracking-tight text-[#201D1D] leading-[1.1]">
                            Ultra-Premium Live <br /> Framer UI Components
                        </h2>
                        <p className="text-base lg:text-lg font-base font-normal text-neutral-600/90 text-left lg:text-center max-w-2xl mt-4 mx-auto leading-relaxed">
                            Level up your website designs with our highly curated library of modular, interactive, and high-fidelity production-ready Framer components.
                        </p>
                    </div>
                </Container>

                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 px-4">
                        {FEATURES.map((feature, index) => (
                            <Feature
                                key={index}
                                title={feature.title}
                                desc={feature.desc}
                                url={feature.url}
                                moduleId={feature.moduleId}
                                iconName={feature.iconName}
                            />
                        ))}
                    </div>
                </Container>
            </Wrapper>
        </div>
    )
};

const Feature = ({
    title,
    desc,
    url,
    moduleId,
    iconName
}: {
    title: string;
    desc: string;
    url: string;
    moduleId: string;
    iconName: string;
}) => {
    return (
        <div className="flex flex-col p-6 border border-neutral-300/60 bg-white/60 hover:bg-white backdrop-blur-sm shadow-sm hover:shadow-md rounded-2xl transition-all duration-300 ease-out hover:border-[#E6C565] group justify-between h-full">
            <div>
                {/* Upper row: Icon & Module ID */}
                <div className="flex items-center justify-between w-full">
                    <div className="p-2.5 rounded-xl bg-neutral-100/80 border border-neutral-200/50 group-hover:bg-neutral-200/40 transition-colors duration-300">
                        {getIcon(iconName)}
                    </div>
                    <span className="font-mono text-[10px] md:text-[11px] font-medium tracking-wide bg-neutral-200/50 border border-neutral-300/30 px-2 py-0.5 rounded text-neutral-500 select-all">
                        {moduleId}
                    </span>
                </div>

                <h3 className="text-xl font-heading font-normal text-[#201D1D] mt-6 leading-none">
                    {title}
                </h3>
                <p className="text-sm font-base font-normal text-neutral-600/90 leading-relaxed mt-3">
                    {desc}
                </p>
            </div>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-4 rounded-lg bg-[#201D1D] text-white hover:bg-[#E6C565] hover:text-[#201D1D] hover:border-[#E6C565] transition-all duration-300 font-base text-sm font-normal flex items-center justify-center gap-1.5 mt-6 shadow-sm border border-neutral-800"
            >
                <span>Get Component</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
        </div>
    )
};

export default Features;
