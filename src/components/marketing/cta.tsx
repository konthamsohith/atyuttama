import Link from "next/link";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import Puzzle from "./puzzle";

const ACCENT = "#E6C565";
const AVATARS = ["SM", "DC", "ER", "MP"];

const CTA = () => {
    return (
        <div className="w-full px-2 md:px-4 lg:px-6 py-12 lg:py-20">
            <Wrapper>
                <Container animation="fadeUp">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {/* Left — dark oval with rotating brand mark */}
                        <div className="relative bg-[#121111] rounded-[12%] lg:rounded-[44%] overflow-hidden min-h-[420px] lg:min-h-[560px] flex items-center justify-center">
                            {/* Faint text behind */}
                            <span className="absolute inset-0 flex items-center justify-center text-center px-10 font-heading font-normal uppercase tracking-tight leading-[0.95] text-white/[0.06] text-5xl lg:text-7xl select-none">
                                Built to<br />outclass
                            </span>

                            {/* Real, playable sliding puzzle */}
                            <div className="relative z-10">
                                <Puzzle />
                            </div>

                            {/* Script annotation with premium animation */}
                            <div
                                className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center"
                                style={{ animation: "lbt-float 4s ease-in-out infinite" }}
                            >
                                <div className="relative">
                                    {/* soft glow behind */}
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 italic font-base text-xl whitespace-nowrap"
                                        style={{ color: ACCENT, animation: "lbt-glow 3s ease-in-out infinite" }}
                                    >
                                        let&apos;s build together
                                    </span>
                                    {/* shimmering gradient text */}
                                    <span
                                        className="relative italic font-base text-xl whitespace-nowrap bg-clip-text text-transparent"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(110deg, #C9A646 0%, #E6C565 25%, #FFF4D6 50%, #E6C565 75%, #C9A646 100%)",
                                            backgroundSize: "200% auto",
                                            animation: "lbt-shimmer 3.5s linear infinite",
                                        }}
                                    >
                                        let&apos;s build together
                                    </span>
                                </div>
                                {/* hand-drawn underline that draws itself */}
                                <svg viewBox="0 0 200 14" className="w-[180px] h-3.5 mt-1 overflow-visible" fill="none">
                                    <path
                                        d="M4 8 C 40 2, 70 12, 100 7 S 165 2, 196 9"
                                        stroke={ACCENT}
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        style={{ strokeDasharray: 240, animation: "lbt-draw 4s ease-in-out infinite" }}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Right — accent card */}
                        <div
                            className="relative rounded-3xl overflow-hidden p-8 lg:p-12 flex flex-col"
                            style={{ backgroundColor: ACCENT }}
                        >
                            {/* Social proof */}
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {AVATARS.map((initials) => (
                                        <span
                                            key={initials}
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#201D1D] text-white text-[10px] font-base font-medium ring-2 ring-[#E6C565]"
                                        >
                                            {initials}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-sm font-base font-normal text-[#201D1D]/80">
                                    Used by 10,000+ people worldwide
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="mt-10 lg:mt-12 font-heading font-normal tracking-tight text-[#201D1D] text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
                                Have something
                                <br /> to build?
                            </h2>

                            {/* Subtext */}
                            <p className="mt-6 font-base font-normal text-[#201D1D]/80 text-base lg:text-lg max-w-md leading-relaxed">
                                Tell us what you&apos;re working on. We&apos;ll tell you straight whether we&apos;re the right team — and how fast we can get it live.
                            </p>

                            {/* Buttons */}
                            <div className="mt-auto pt-10 flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="rounded-lg bg-[#201D1D] text-white font-base font-normal text-sm px-6 py-3 hover:opacity-90 transition-opacity duration-200"
                                >
                                    Start a project
                                </Link>
                                <Link
                                    href="/#faq"
                                    className="rounded-lg bg-white text-[#201D1D] font-base font-normal text-sm px-6 py-3 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                    FAQs
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </Wrapper>
        </div>
    )
};

export default CTA
