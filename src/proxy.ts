import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/destination/:path*", "/mybooking", "/add-destination"],
};