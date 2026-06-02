import { Metadata } from "next";

export const generateMetadata = ({
    title = "Atyuttama — Creative + AI Development Studio",
    description = `We design and build apps, websites, and enterprise software, plus real AI: copilots, calling, and marketing. Used by 10,000+ people across 10 countries.`,
    image = "/thumbnail.png",
    // Default icons come from the App Router file convention (src/app/icon.png).
    icons,
    noIndex = false
}: {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
} = {}): Metadata => ({
    title,
    description,
    icons,
    ...(noIndex && { robots: { index: false, follow: false } }),
});
