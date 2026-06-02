import Providers from "@/components/global/providers";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-[#F4F4F4] text-foreground font-base antialiased",
                    base.variable,
                    heading.variable,
                )}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
};
