import Link from "next/link";
import { CTASection } from "@/components/shared/page-sections";
import { AnimatedStats } from "@/components/shared/animated-stats";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Award, BrainCircuit, Gem, type LucideIcon } from "lucide-react";

const TEAM = [
    { name: "Nithish Baddula", role: "Founder & CEO", initials: "NB", accent: "from-amber-300 to-orange-500", bio: "Sets the standard the studio is named after — and refuses to lower it." },
    { name: "Aarav Mehta", role: "Lead Engineer", initials: "AM", accent: "from-sky-400 to-indigo-600", bio: "Turns ambitious specs into reliable systems built to scale." },
    { name: "Diya Sharma", role: "Head of Design", initials: "DS", accent: "from-rose-400 to-fuchsia-600", bio: "Makes the complex feel effortless, one interface at a time." },
    { name: "Kabir Rao", role: "AI Engineer", initials: "KR", accent: "from-violet-500 to-purple-700", bio: "Ships AI that does real work in production, not slideware." },
    { name: "Ananya Iyer", role: "Growth Lead", initials: "AI", accent: "from-emerald-400 to-teal-600", bio: "Connects great products with the people who need them." },
    { name: "Vivaan Nair", role: "Full-Stack Engineer", initials: "VN", accent: "from-lime-400 to-green-600", bio: "Builds the whole pyramid — admin to end user, front to back." },
];

const CULTURE: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Award, title: "Senior by default", desc: "No juniors learning on your project. Experienced hands on every build." },
    { icon: BrainCircuit, title: "AI-native", desc: "We run AI through our own workflow — that's how we move faster than bigger studios." },
    { icon: Gem, title: "Lean & excellent", desc: "We'd rather stay small and exceptional than big and average." },
];

export default function OurTeamPage() {
    return (
        <>
            {/* ───────────────── Hero ───────────────── */}
            <section className="relative w-full overflow-hidden bg-[#F4F4F4]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(32,29,29,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_30%,transparent_72%)]" />
                <div className="pointer-events-none absolute -top-[16%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#E6C565]/12 blur-[130px]" />
                <svg
                    aria-hidden
                    viewBox="0 0 1000 1000"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[1150px] w-[1150px] -translate-x-1/2 -translate-y-[44%] text-[#201D1D]/[0.05]"
                >
                    <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="385" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="470" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 9" />
                </svg>

                <Wrapper className="relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-32">
                    <Container className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#E6C565]/60" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#201D1D]/55">Our Team</span>
                            <span className="h-px w-8 bg-[#E6C565]/60" />
                        </div>
                        <h1 className="mt-8 max-w-[18ch] font-heading text-[44px] font-normal leading-[1.0] tracking-tight text-balance text-[#201D1D] md:text-7xl lg:text-[84px]">
                            The people behind the{" "}
                            <span className="italic text-[#C9A646]">work.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl font-base text-lg font-normal leading-relaxed text-balance text-[#201D1D]/60">
                            A small, senior, AI-native team of engineers, designers, and strategists — hungry enough to
                            outwork bigger studios, and skilled enough to outbuild them.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <Link href="/contact">
                                <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer bg-[#201D1D] px-7 py-3.5 font-base font-normal text-white shadow-lg hover:bg-neutral-800">
                                    Work with us
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button style={{ borderRadius: "0.75rem" }} className="h-auto cursor-pointer border border-[#201D1D]/15 bg-white px-7 py-3.5 font-base font-normal text-[#201D1D] shadow-sm hover:border-[#201D1D]/30 hover:bg-white">
                                    Join the team
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Wrapper>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
            </section>

            {/* ───────────────── Team grid ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="pt-6 pb-16 lg:pt-10 lg:pb-24">
                    <Container>
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">The crew</span>
                            <h2 className="mt-4 font-heading text-3xl font-normal leading-[1.08] tracking-tight text-[#201D1D] md:text-4xl lg:text-5xl">
                                Senior people, one shared standard
                            </h2>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {TEAM.map((m) => (
                                <div
                                    key={m.name}
                                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#201D1D]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E6C565]/60 hover:shadow-[0_28px_56px_-28px_rgba(32,29,29,0.28)]"
                                >
                                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6C565] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className="flex items-center gap-4">
                                        <div className={`flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${m.accent} font-heading text-xl text-white shadow-md ring-1 ring-black/5`}>
                                            {m.initials}
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-lg font-normal text-[#201D1D]">{m.name}</h3>
                                            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C9A646]">{m.role}</p>
                                        </div>
                                    </div>
                                    <p className="mt-5 font-base text-sm leading-relaxed text-[#201D1D]/55">{m.bio}</p>
                                    <div className="mt-6 flex items-center gap-2">
                                        <a href="#" aria-label={`${m.name} on LinkedIn`} className="flex size-8 items-center justify-center rounded-full bg-[#F4F4F4] text-[#201D1D]/50 transition-colors hover:bg-[#E6C565] hover:text-[#201D1D]">
                                            <Linkedin className="size-4" />
                                        </a>
                                        <a href="#" aria-label={`${m.name} on X`} className="flex size-8 items-center justify-center rounded-full bg-[#F4F4F4] text-[#201D1D]/50 transition-colors hover:bg-[#E6C565] hover:text-[#201D1D]">
                                            <Twitter className="size-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── What unites us ───────────────── */}
            <section className="w-full bg-[#F4F4F4]">
                <Wrapper className="py-16 lg:py-24">
                    <Container>
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">What unites us</span>
                            <h2 className="mt-4 font-heading text-3xl font-normal leading-[1.08] tracking-tight text-[#201D1D] md:text-4xl lg:text-5xl">
                                Young, fast, and scaling hard
                            </h2>
                        </div>
                        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                            {CULTURE.map((c) => {
                                const Icon = c.icon;
                                return (
                                    <div
                                        key={c.title}
                                        className="group rounded-3xl border border-[#201D1D]/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#E6C565]/60 hover:shadow-[0_24px_50px_-24px_rgba(32,29,29,0.22)]"
                                    >
                                        <span className="flex size-12 items-center justify-center rounded-xl bg-[#201D1D] text-[#E6C565]">
                                            <Icon className="size-6" strokeWidth={1.6} />
                                        </span>
                                        <h3 className="mt-6 font-heading text-xl font-normal text-[#201D1D]">{c.title}</h3>
                                        <p className="mt-2 font-base text-[15px] leading-relaxed text-[#201D1D]/55">{c.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </Wrapper>
            </section>

            {/* ───────────────── Stats ───────────────── */}
            <section className="w-full bg-white">
                <Wrapper className="py-10 lg:py-14">
                    <Container className="flex flex-col items-center">
                        <span className="mb-7 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A646]">By the numbers</span>
                        <div className="w-full">
                            <AnimatedStats
                                items={[
                                    { value: "15+", label: "Team & collaborators" },
                                    { value: "3 yrs", label: "Building together" },
                                    { value: "10", label: "Countries served" },
                                    { value: "6", label: "Disciplines" },
                                ]}
                            />
                        </div>
                    </Container>
                </Wrapper>
            </section>

            <CTASection
                title="Want to work with this team?"
                subtitle="Whether you're hiring us or hoping to join us, we'd love to talk."
                ctaLabel="Get in touch"
            />
        </>
    );
}
