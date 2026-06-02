"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function ContactPanel() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "30min" });
            cal("ui", { hideEventTypeDetails: false, layout: "month_view", theme: "light" });
        })();
    }, []);

    return (
        <div className="p-4 md:p-5 lg:p-6">
            <div className="rounded-xl overflow-hidden border border-[#201D1D]/10 h-full">
                <Cal
                    namespace="30min"
                    calLink="nithish5588/30min"
                    style={{ width: "100%", height: "640px", overflow: "scroll" }}
                    config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
                />
            </div>
        </div>
    );
}
