"use client";

import { motion, type Variants } from "framer-motion";

/**
 * 3D Book — faithful React/Framer-Motion recreation of the Framer community
 * "Book" component (framer.com/m/Book-AFRs.js).
 *
 * Behaviour, mirrored from the source:
 *  - preserve-3d wrapper with `transformPerspective: 1200`
 *  - cover swings open on hover: `rotateY: -70deg`, pivoting from the left
 *    edge (`transformOrigin: left center`) and lifting toward the viewer (z:10)
 *  - the page block lifts further forward (z: 50) so it reads as real paper
 *  - spring transition: duration 0.6, bounce 0
 *  - the exact 6-layer drop shadow on hover
 *  - a real cover image (book jacket), like the live Framer preview
 * Aspect ratio is locked to 0.656 : 1, same as the original.
 */

const ASPECT = 0.656;
const ACCENT = "#E6C565";

// Spring lifted verbatim from the Framer source.
const transition = { type: "spring" as const, duration: 0.6, bounce: 0 };

const HOVER_SHADOW =
    "0px 0.71px 0.71px -0.625px rgba(0,0,0,0.44)," +
    "0px 1.81px 1.81px -1.25px rgba(0,0,0,0.43)," +
    "0px 3.62px 3.62px -1.875px rgba(0,0,0,0.41)," +
    "0px 6.87px 6.87px -2.5px rgba(0,0,0,0.38)," +
    "0px 13.65px 13.65px -3.125px rgba(0,0,0,0.31)," +
    "0px 30px 30px -3.75px rgba(0,0,0,0.15)";

const REST_SHADOW = "0px 8px 16px -6px rgba(0,0,0,0.25)";

// boxShadow lives in the variants so the parent's hover drives rotate + shadow
// together — a local whileHover on the cover would otherwise override the open.
const coverVariants: Variants = {
    rest: { rotateY: 0, z: 0, boxShadow: REST_SHADOW },
    open: { rotateY: -72, z: 10, boxShadow: HOVER_SHADOW },
};

const pagesVariants: Variants = {
    rest: { z: 0 },
    open: { z: 50 },
};

export interface Book3DProps {
    title: string;
    /** Small label above the title — maps to the Framer "author" slot. */
    tag?: string;
    /** Revealed on the inner page when the cover opens. */
    meta?: string;
    /** Tailwind gradient classes for the cover face (fallback / tint when no image). */
    coverClassName?: string;
    /** Real cover artwork (a portrait book jacket) — fills the cover face. */
    coverImage?: string;
    /**
     * Render our own title/tag text + scrim on top of the cover. Turn OFF when
     * `coverImage` is a real jacket that already has its title baked into the art.
     */
    showCoverText?: boolean;
    /** Base width in px; height is derived from the 0.656 aspect ratio. */
    width?: number;
    /** Disable the hover-open interaction (used for non-front deck cards). */
    interactive?: boolean;
    className?: string;
}

const Book3D = ({
    title,
    tag,
    meta,
    coverClassName = "from-neutral-700 via-neutral-800 to-black",
    coverImage,
    showCoverText = true,
    width = 220,
    interactive = true,
    className,
}: Book3DProps) => {
    const height = Math.round(width / ASPECT);
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    return (
        <motion.div
            className={className}
            initial="rest"
            animate="rest"
            whileHover={interactive ? "open" : undefined}
            style={{ width, height, transformStyle: "preserve-3d", perspective: 1200 }}
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
            >
                {/* ---- Page block (sits behind the cover) ---- */}
                <motion.div
                    variants={pagesVariants}
                    transition={transition}
                    className="absolute inset-y-0 left-[6px] right-0 overflow-hidden rounded-r-[3px] rounded-l-sm"
                    style={{ transformStyle: "preserve-3d", background: "linear-gradient(90deg,#ffffff 0%,#e9e7e1 70%,#d8d5cc 100%)" }}
                >
                    {/* page striations for paper thickness */}
                    <div
                        className="absolute inset-y-1 right-0 w-[10px]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(180deg,#cbc8bf 0px,#cbc8bf 1px,#f3f1ec 1px,#f3f1ec 3px)",
                        }}
                    />
                    {/* inner page content, revealed once the cover swings away */}
                    <div className="flex h-full flex-col justify-between p-3 pl-4 text-[#201D1D]">
                        <span className="text-[8px] font-base uppercase tracking-[0.2em] text-[#201D1D]/50">
                            {tag}
                        </span>
                        <div>
                            <p className="font-heading text-sm leading-tight">{title}</p>
                            {meta && (
                                <p className="mt-0.5 text-[9px] font-base text-[#201D1D]/60">{meta}</p>
                            )}
                        </div>
                        <span className="text-[8px] font-base tracking-wide text-[#201D1D]/40">
                            atyuttama.com/{slug}
                        </span>
                    </div>
                </motion.div>

                {/* ---- Cover (swings open from the left spine) ---- */}
                <motion.div
                    variants={coverVariants}
                    transition={transition}
                    className={`absolute inset-0 z-[1] overflow-hidden rounded-l-sm rounded-r-[4px] bg-gradient-to-br ${coverClassName}`}
                    style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                >
                    {/* real cover artwork */}
                    {coverImage && (
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${encodeURI(coverImage)}")` }}
                        />
                    )}

                    {/* spine seam */}
                    <span className="absolute inset-y-0 left-0 z-10 w-[6px] bg-black/25" />
                    <span className="absolute inset-y-0 left-[6px] z-10 w-px bg-white/20" />

                    {/* lighting overlays (opacity 0.2 + 0.4, as in source) */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/20 opacity-20" />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-40" />

                    {/* our own title/tag — only when the cover art has no baked-in text */}
                    {showCoverText && (
                        <>
                            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                            <div className="relative z-10 flex h-full flex-col justify-between p-3 pl-4 text-white">
                                <span className="text-[8px] font-base uppercase tracking-[0.22em] text-white/80 drop-shadow">
                                    {tag}
                                </span>
                                <div>
                                    <h3 className="font-heading text-base font-normal leading-[1.05] drop-shadow-md">
                                        {title}
                                    </h3>
                                    <span
                                        className="mt-1.5 block h-[2px] w-6 rounded-full"
                                        style={{ backgroundColor: ACCENT }}
                                    />
                                </div>
                                <span className="text-[7px] font-base uppercase tracking-widest text-white/70 drop-shadow">
                                    Atyuttama
                                </span>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Book3D;
