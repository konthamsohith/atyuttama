"use client";

import React from 'react'
import { Toaster } from "sonner";
import { PostHogProvider } from "./posthog-provider";

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <PostHogProvider>
            <Toaster
                richColors
                theme="dark"
                position="bottom-center"
            />
            {children}
        </PostHogProvider>
    )
};

export default Providers
