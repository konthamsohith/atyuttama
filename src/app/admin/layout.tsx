import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin · Atyuttama",
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-[#0c0c0e] text-white">{children}</div>;
}
