import { ExternalLinkIcon, LogOutIcon, BarChart3Icon } from "lucide-react";
import { logout } from "./actions";

export default function AdminDashboardPage() {
    const embedUrl = process.env.POSTHOG_DASHBOARD_EMBED_URL;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    // The app UI for US cloud lives on us.posthog.com (ingestion is us.i.posthog.com)
    const posthogAppUrl = posthogHost.replace("us.i.posthog.com", "us.posthog.com").replace("eu.i.posthog.com", "eu.posthog.com");

    return (
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-6">
            {/* Top bar */}
            <header className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center size-9 rounded-lg bg-[#E6C565] text-[#201D1D]">
                        <BarChart3Icon className="size-5" />
                    </span>
                    <div>
                        <h1 className="font-heading font-normal text-xl leading-none">Analytics</h1>
                        <p className="text-xs text-white/45 mt-1">Admin dashboard</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={posthogAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-2 transition"
                    >
                        Open PostHog <ExternalLinkIcon className="size-3.5" />
                    </a>
                    <form action={logout}>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 text-sm text-white/80 bg-white/[0.06] hover:bg-white/[0.12] rounded-lg px-3 py-2 transition cursor-pointer"
                        >
                            <LogOutIcon className="size-3.5" /> Log out
                        </button>
                    </form>
                </div>
            </header>

            {/* Body */}
            <main className="mt-6">
                {embedUrl ? (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                        <iframe
                            src={embedUrl}
                            title="PostHog dashboard"
                            className="w-full h-[78vh]"
                            frameBorder={0}
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
                        <h2 className="font-heading font-normal text-2xl text-white">Connect your PostHog dashboard</h2>
                        <p className="mx-auto mt-3 max-w-md text-sm text-white/55 leading-relaxed">
                            To show charts here, embed a PostHog dashboard:
                        </p>
                        <ol className="mx-auto mt-5 max-w-md text-left text-sm text-white/65 space-y-2 list-decimal list-inside">
                            <li>In PostHog, open a <strong>Dashboard</strong>.</li>
                            <li>Click the <strong>•••</strong> menu → <strong>Share</strong> → enable <strong>“Share publicly”</strong>.</li>
                            <li>Copy the <strong>embed URL</strong> (looks like <code className="text-[#E6C565]">{posthogAppUrl}/embedded/…</code>).</li>
                            <li>Add it to <code className="text-[#E6C565]">.env.local</code> as <code className="text-[#E6C565]">POSTHOG_DASHBOARD_EMBED_URL</code> and restart the dev server.</li>
                        </ol>
                        <a
                            href={posthogAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-7 rounded-lg bg-[#E6C565] text-[#201D1D] font-medium px-5 py-2.5 hover:opacity-90 transition"
                        >
                            Open PostHog dashboard <ExternalLinkIcon className="size-4" />
                        </a>
                    </div>
                )}
            </main>
        </div>
    );
}
