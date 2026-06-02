import React from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";

type Project = {
    name: string;
    url: string;
    domain: string;
    tag: string;
    image: string;
};

const projects: Project[] = [
    {
        name: "Subham Astro",
        url: "https://www.subhamastro.com/",
        domain: "subhamastro.com",
        tag: "Astrology",
        image: "/images/subham.png",
    },
    {
        name: "SocialFly AI",
        url: "https://socialflyai.com/",
        domain: "socialflyai.com",
        tag: "AI · Social",
        image: "/images/socialflyai.png",
    },
    {
        name: "Nyra AI",
        url: "https://www.nyraai.io/",
        domain: "nyraai.io",
        tag: "AI Platform",
        image: "/images/nyraai.png",
    },
    {
        name: "InvisiEdge",
        url: "https://invisiedge.com/",
        domain: "invisiedge.com",
        tag: "Agency",
        image: "/images/invisiedge.png",
    },
    {
        name: "Capable Groups",
        url: "https://capablegroups.com/",
        domain: "capablegroups.com",
        tag: "Business",
        image: "/images/capable.png",
    },
    {
        name: "Ryvo Solutions",
        url: "https://ryvosolutions.com/",
        domain: "ryvosolutions.com",
        tag: "Solutions",
        image: "/images/ryvo.png",
    },
    {
        name: "Social Scale",
        url: "https://www.socialscale.agency/",
        domain: "socialscale.agency",
        tag: "Marketing",
        image: "/images/socialscale.png",
    },
];

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
            className="group block rounded-xl overflow-hidden border border-neutral-200 bg-white hover:shadow-lg transition-shadow duration-300"
        >
            {/* Browser-framed preview — frame matches the screenshot ratio (≈1900×860) */}
            <div className="bg-[#f0efeb] overflow-hidden">
                <div className="h-8 bg-[#f0efeb] flex items-center gap-2 px-3 border-b border-black/5">
                    <span className="w-2 h-2 rounded-full bg-neutral-400" />
                    <span className="w-2 h-2 rounded-full bg-neutral-400" />
                    <span className="w-2 h-2 rounded-full bg-neutral-400" />
                    <span className="ml-2 text-[9px] font-base text-neutral-500 truncate">{project.domain}</span>
                </div>
                <div className="aspect-[1900/860] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image}
                        alt={`${project.name} — ${project.domain}`}
                        draggable={false}
                        className="block w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-base font-medium text-[#201D1D] truncate">
                        {project.name}
                    </span>
                </div>
                <span className="shrink-0 text-[10px] font-base uppercase tracking-widest text-neutral-500">
                    {project.tag}
                </span>
            </div>
        </a>
    );
};

const ShowcaseGrid = () => {
    return (
        <div className="w-full px-2 md:px-0 py-12 lg:py-16">
            <Wrapper>
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        {projects.map((project) => (
                            <ProjectCard key={project.name} project={project} />
                        ))}
                    </div>
                </Container>
            </Wrapper>
        </div>
    );
};

export default ShowcaseGrid;
