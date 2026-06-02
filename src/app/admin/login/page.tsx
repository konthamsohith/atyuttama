"use client";

import { useActionState } from "react";
import { LockIcon } from "lucide-react";
import { login } from "../actions";

const initialState = { error: undefined as string | undefined };

export default function AdminLoginPage() {
    const [state, formAction, pending] = useActionState(login, initialState);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0c0c0e] px-4">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#15131280] backdrop-blur-xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <span className="flex items-center justify-center size-12 rounded-xl bg-[#E6C565] text-[#201D1D]">
                        <LockIcon className="size-5" />
                    </span>
                    <h1 className="mt-5 font-heading font-normal text-2xl text-white">Admin Access</h1>
                    <p className="mt-1.5 text-sm text-white/50">Enter the admin password to continue.</p>
                </div>

                <form action={formAction} className="mt-7 flex flex-col gap-3">
                    <input
                        name="password"
                        type="password"
                        required
                        autoFocus
                        placeholder="Password"
                        className="h-11 w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-[#E6C565] focus:ring-2 focus:ring-[#E6C565]/30 transition"
                    />

                    {state?.error && (
                        <p className="text-sm text-rose-400">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="h-11 w-full rounded-lg bg-[#E6C565] text-[#201D1D] font-medium hover:opacity-90 disabled:opacity-60 transition cursor-pointer"
                    >
                        {pending ? "Checking…" : "Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
}
