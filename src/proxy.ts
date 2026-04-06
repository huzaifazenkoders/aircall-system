import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Allow static assets to pass through
  const staticFilePattern =
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|json|xml|txt|map)$/i;
  if (staticFilePattern.test(pathname)) {
    return NextResponse.next();
  }

  if (token) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/list", request.url));
    }
    if (pathname.startsWith("/auth/")) {
      return NextResponse.redirect(new URL("/list", request.url));
    }
    return NextResponse.next();
  } else {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    if (pathname.startsWith("/auth/")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
}
