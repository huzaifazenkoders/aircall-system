import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { AuthUser } from "@/features/auth/types/authTypes";

type UserRole = AuthUser["role"];

const ADMIN_HOME_PATH = "/list";
const ADMIN_AUTH_PREFIX = "/auth";
const DIALER_HOME_PATH = "/dialer/callback-schedules";
const DIALER_AUTH_PREFIX = "/dialer-auth";
const DIALER_APP_PREFIX = "/dialer";

function getRoleFromToken(token?: string): UserRole | null {
  if (!token) return null;

  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "="
    );
    const decodedPayload = atob(paddedPayload);
    const parsedPayload = JSON.parse(decodedPayload) as { role?: UserRole };

    return parsedPayload.role ?? null;
  } catch {
    return null;
  }
}

function redirect(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = getRoleFromToken(token);
  const pathname = request.nextUrl.pathname;
  const isAdminAuthRoute = pathname.startsWith(ADMIN_AUTH_PREFIX);
  const isDialerAuthRoute = pathname.startsWith(DIALER_AUTH_PREFIX);
  const isDialerAppRoute = pathname.startsWith(DIALER_APP_PREFIX);

  // Allow static assets to pass through
  const staticFilePattern =
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|json|xml|txt|map)$/i;
  if (staticFilePattern.test(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname === "/") {
      return redirect(request, `${ADMIN_AUTH_PREFIX}/sign-in`);
    }

    if (isAdminAuthRoute || isDialerAuthRoute) {
      return NextResponse.next();
    }

    if (isDialerAppRoute) {
      return redirect(request, `${DIALER_AUTH_PREFIX}/sign-in`);
    }

    return redirect(request, `${ADMIN_AUTH_PREFIX}/sign-in`);
  }

  if (pathname === "/") {
    return redirect(
      request,
      role === "dialer" ? DIALER_HOME_PATH : ADMIN_HOME_PATH
    );
  }

  if (isAdminAuthRoute || isDialerAuthRoute) {
    return redirect(
      request,
      role === "dialer" ? DIALER_HOME_PATH : ADMIN_HOME_PATH
    );
  }

  if (role === "dialer" && !isDialerAppRoute) {
    return redirect(request, DIALER_HOME_PATH);
  }

  if (role === "admin" && isDialerAppRoute) {
    return redirect(request, ADMIN_HOME_PATH);
  }

  return NextResponse.next();
}
