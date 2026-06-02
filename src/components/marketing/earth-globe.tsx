"use client";

import { useEffect, useRef, useState } from "react";
import {
    geoOrthographic,
    geoPath,
    geoGraticule10,
    geoDistance,
    type GeoProjection,
} from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry, MultiLineString } from "geojson";

/**
 * EarthGlobe — faithful recreation of the Framer "Tactical Globe 3D"
 * (framer.com/m/TacticalGlobe3D-uVMtXj.js).
 *
 * Like the original, this is an orthographic-projected globe (no WebGL): real
 * Natural Earth 110m country geometry is fetched at runtime and drawn to a
 * <canvas> with d3-geo, auto-rotating via requestAnimationFrame. Land,
 * borders, graticule, atmosphere halo, a seeded star field and pulsing
 * lon/lat markers all match the source's palette and behaviour.
 */

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Palette lifted from the Framer source.
const COLORS = {
    ocean: "#111417",
    land: "#23282d",
    border: "#4d555d",
    graticule: "#5b636a",
    glow: "#7ec8ff",
    marker: "#E53E3E",
    label: "#e7ece9",
};

interface Marker {
    lon: number;
    lat: number;
    label?: string;
}

interface EarthGlobeProps {
    /** Diameter in px. */
    size?: number;
    /** Degrees per second of auto-rotation. */
    autoRotateSpeed?: number;
    /** Initial [lambda, phi] rotation — the longitude/latitude facing the viewer is [-lambda, -phi]. */
    initialRotation?: [number, number];
    glowColor?: string;
    showStars?: boolean;
    showLabels?: boolean;
    markers?: Marker[];
    /** Only animate when this tile is the front/active card; otherwise idle. */
    active?: boolean;
    className?: string;
}

// Defaults match the Framer source.
const DEFAULT_MARKERS: Marker[] = [
    { lon: 13.405, lat: 52.52, label: "Berlin" },
    { lon: 139.65, lat: 35.676, label: "Tokyo" },
    { lon: 18.413, lat: 43.856, label: "Sarajevo" },
];

interface GeoData {
    land: Feature<Geometry, GeoJsonProperties>;
    borders: MultiLineString;
    graticule: ReturnType<typeof geoGraticule10>;
}

// Deterministic star field so positions are stable between renders.
function makeStars(count: number) {
    const stars: { x: number; y: number; o: number }[] = [];
    let seed = 1337;
    const rng = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    };
    for (let i = 0; i < count; i++) {
        stars.push({ x: rng(), y: rng(), o: 0.18 + rng() * 0.6 });
    }
    return stars;
}

const EarthGlobe = ({
    size = 150,
    autoRotateSpeed = 6,
    initialRotation = [-95, -18],
    glowColor = COLORS.glow,
    showStars = true,
    showLabels = true,
    markers = DEFAULT_MARKERS,
    active = true,
    className,
}: EarthGlobeProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [geo, setGeo] = useState<GeoData | null>(null);
    const starsRef = useRef(makeStars(70));

    // Load Natural Earth geometry once.
    useEffect(() => {
        let cancelled = false;
        fetch(WORLD_URL)
            .then((r) => r.json())
            .then((topo) => {
                if (cancelled) return;
                // world-atlas Topology — typed loosely as it's external JSON.
                const t = topo as Parameters<typeof feature>[0];
                const land = feature(t, (topo as any).objects.land) as Feature<Geometry, GeoJsonProperties>;
                const borders = mesh(t, (topo as any).objects.countries, (a: unknown, b: unknown) => a !== b) as MultiLineString;
                setGeo({ land, borders, graticule: geoGraticule10() });
            })
            .catch(() => {
                /* offline / blocked — globe stays as bare sphere */
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Draw + auto-rotate.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const cx = size / 2;
        const cy = size / 2;
        // leave room for the 1.18×R atmosphere halo so nothing clips at the edges
        const R = Math.floor((size / 2 - 2) / 1.18);

        const projection: GeoProjection = geoOrthographic()
            .scale(R)
            .translate([cx, cy])
            .clipAngle(90);
        const path = geoPath(projection, ctx);

        const rotation: [number, number, number] = [initialRotation[0], initialRotation[1], 0];
        let raf = 0;
        let last = 0;
        let drawnOnce = false;

        const draw = (now: number) => {
            // Only the active (front) tile animates; the rest draw one static
            // frame then idle, to keep the carousel's main thread free.
            if (active) {
                const dt = last ? (now - last) / 1000 : 0;
                last = now;
                rotation[0] += autoRotateSpeed * dt;
            } else {
                last = 0;
                if (drawnOnce) {
                    raf = requestAnimationFrame(draw);
                    return;
                }
                drawnOnce = true;
            }
            projection.rotate(rotation);

            ctx.clearRect(0, 0, size, size);

            // Star field (background, outside the globe)
            if (showStars) {
                for (const s of starsRef.current) {
                    const sx = s.x * size;
                    const sy = s.y * size;
                    if (Math.hypot(sx - cx, sy - cy) < R + 4) continue;
                    ctx.globalAlpha = s.o;
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(sx, sy, 1, 1);
                }
                ctx.globalAlpha = 1;
            }

            // Atmosphere halo
            const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.18);
            halo.addColorStop(0, `${glowColor}00`);
            halo.addColorStop(0.6, `${glowColor}40`);
            halo.addColorStop(1, `${glowColor}00`);
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
            ctx.fill();

            // Ocean sphere
            ctx.beginPath();
            path({ type: "Sphere" });
            ctx.fillStyle = COLORS.ocean;
            ctx.fill();

            if (geo) {
                // Graticule
                ctx.beginPath();
                path(geo.graticule);
                ctx.strokeStyle = COLORS.graticule;
                ctx.globalAlpha = 0.18;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Land
                ctx.beginPath();
                path(geo.land);
                ctx.fillStyle = COLORS.land;
                ctx.fill();

                // Country borders
                ctx.beginPath();
                path(geo.borders);
                ctx.strokeStyle = COLORS.border;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            // Spherical shading: top-left specular highlight + dark limb
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip();
            const shade = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
            shade.addColorStop(0, "rgba(255,255,255,0.16)");
            shade.addColorStop(0.45, "rgba(255,255,255,0.02)");
            shade.addColorStop(0.8, "rgba(0,0,0,0.35)");
            shade.addColorStop(1, "rgba(0,0,0,0.7)");
            ctx.fillStyle = shade;
            ctx.fillRect(0, 0, size, size);
            ctx.restore();

            // Pulsing markers (front hemisphere only)
            const center: [number, number] = [-rotation[0], -rotation[1]];
            for (const m of markers) {
                if (geoDistance([m.lon, m.lat], center) >= Math.PI / 2) continue;
                const p = projection([m.lon, m.lat]);
                if (!p) continue;
                const [mx, my] = p;
                const phase = ((now / 1000 + m.lon) % 2.4) / 2.4;

                ctx.beginPath();
                ctx.arc(mx, my, 2 + phase * 7, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(229,62,62,${1 - phase})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(mx, my, 2.4, 0, Math.PI * 2);
                ctx.fillStyle = COLORS.marker;
                ctx.fill();

                if (showLabels && m.label) {
                    ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, monospace";
                    ctx.textBaseline = "middle";
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "rgba(0,0,0,0.85)";
                    ctx.strokeText(m.label, mx + 6, my);
                    ctx.fillStyle = COLORS.label;
                    ctx.fillText(m.label, mx + 6, my);
                }
            }

            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
    }, [geo, size, autoRotateSpeed, glowColor, showStars, showLabels, markers, initialRotation, active]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: size, height: size }}
            aria-label="Rotating earth globe"
            role="img"
        />
    );
};

export default EarthGlobe;
