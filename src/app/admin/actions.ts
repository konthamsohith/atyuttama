"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "admin_session";

type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
    const password = String(formData.get("password") ?? "");
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
        return { error: "Admin password is not configured on the server (set ADMIN_PASSWORD)." };
    }
    if (password !== expected) {
        return { error: "Incorrect password." };
    }

    const token = process.env.ADMIN_SESSION_TOKEN || "";
    const cookieStore = await cookies();
    cookieStore.set(COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
    });

    redirect("/admin");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE);
    redirect("/admin/login");
}
