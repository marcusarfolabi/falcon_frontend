import { NextResponse } from "next/server";

export default async function proxy(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // ----- READ COOKIES -----
  // inside your proxy function
  const cookieHeader = req.headers.get("cookie") || "";

  // FIX: Match the name used in AuthContext
  const token = extractCookie(cookieHeader, "auth_token");
  const onboarding_completed_raw = extractCookie(
    cookieHeader,
    "onboarding_completed"
  );

  // Fix: Convert string "true" to a real boolean
  const isOnboarded = onboarding_completed_raw === "true";

  const isAuthenticated = !!token && token.length > 0;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isOnboardingRoute = pathname === "/account/onboarding";
  const isProtectedRoute = pathname.startsWith("/account");

  // 1. If logged in, don't allow access to Login/Register
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/account", url.origin));
  }

  // 2. If not logged in, force Login for protected routes
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", url.origin);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. If logged in but not onboarded, force Onboarding
  if (
    isAuthenticated &&
    !isOnboarded &&
    isProtectedRoute &&
    !isOnboardingRoute
  ) {
    return NextResponse.redirect(new URL("/account/onboarding", url.origin));
  }

  return NextResponse.next();
}

// Precise Matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};

function extractCookie(cookieString: string, name: string): string | null {
  const match = cookieString.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}
