"use client";

import { motion } from "framer-motion";

/**
 * ImageSpinner — recreation of the Framer "Image Spinner" component
 * (framer.com/m/ImageSpinner-Niv1.js).
 *
 * Cards are tiled radially into a tight flower/pinwheel: each card is rotated
 * to its angular position (petals, not kept upright) and packed close around a
 * small centre gap. The whole cluster auto-spins continuously as one body.
 *
 * Centring: each card's own centre is pinned to the tile centre (left/top 50%
 * + negative half-margins), so its transform-origin IS the tile centre and the
 * petals fan out perfectly symmetric; the parent rotates around the same point.
 */

interface ImageSpinnerProps {
    images?: string[];
    width?: number;
    height?: number;
    /** Distance from centre to each card's centre, in px. */
    radius?: number;
    /** Card width in px (height = width × 1.15). */
    imageSize?: number;
    /** Seconds for one full revolution. */
    duration?: number;
    /** Spin direction. */
    reverse?: boolean;
    className?: string;
}

const DEFAULT_IMAGES = [
    "/images/testimonials/person1.jpg",
    "/images/testimonials/person2.jpg",
    "/images/testimonials/person3.jpg",
    "/images/testimonials/person4.jpg",
    "/images/service_design.png",
    "/images/service_brand.png",
    "/images/service_ai.png",
];

const ImageSpinner = ({
    images = DEFAULT_IMAGES,
    width = 240,
    height = 150,
    radius = 40,
    imageSize = 54,
    duration = 22,
    reverse = false,
    className,
}: ImageSpinnerProps) => {
    const n = images.length;
    const dir = reverse ? -1 : 1;
    const cardH = imageSize * 1.15;

    return (
        <div className={`relative overflow-hidden ${className ?? ""}`} style={{ width, height }}>
            {/* rotating cluster — fills the tile, spins around its centre */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 * dir }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
                {images.map((src, i) => {
                    const angle = Number(((i / n) * 360).toFixed(2));
                    return (
                        <div
                            key={src + i}
                            className="absolute left-1/2 top-1/2 rounded-2xl bg-cover bg-center shadow-xl ring-1 ring-black/5"
                            style={{
                                width: imageSize,
                                height: cardH,
                                marginLeft: -imageSize / 2,
                                marginTop: -cardH / 2,
                                transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                                transformOrigin: "center",
                                backgroundImage: `url(${src})`,
                            }}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
};

export default ImageSpinner;
