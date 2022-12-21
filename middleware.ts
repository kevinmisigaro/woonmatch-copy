import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieSerializeOptions, ssoLogin } from "./lib/auth";
import cookie from "cookie";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/react") ||
    request.nextUrl.pathname.startsWith("/points") ||
    request.nextUrl.pathname.startsWith("/letter")
  ) {
    if (!request.cookies.get("token")) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url)
      );
    }
  }
}
