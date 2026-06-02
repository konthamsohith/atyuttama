import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protects every /admin route (except the login page) behind the admin session cookie.
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = req.cookies.get("admin_session")?.value;
    const expected = process.env.ADMIN_SESSION_TOKEN;

    if (!token || !expected || token !== expected) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
