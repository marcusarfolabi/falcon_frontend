import { NextResponse } from "next/server";

export default async function proxy(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const cookieHeader = req.headers.get("cookie") || "";

  // ----- LOGGING FOR DEBUGGING -----
  const token = extractCookie(cookieHeader, "auth_token");
  const role = extractCookie(cookieHeader, "user_role");
   
  const isAuthenticated = !!token && token.length > 0;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  
  const isProtectedAccount = pathname.startsWith("/account");
  const isProtectedInbox = pathname.startsWith("/mail/inbox");
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedRoute = isProtectedAccount || isProtectedInbox || isProtectedAdmin;

  if (isAuthenticated && isAuthPage) {
    if (role === "superadmin") return NextResponse.redirect(new URL("/admin/dashboard", url.origin));
    if (role === "admin") return NextResponse.redirect(new URL("/account", url.origin));
    return NextResponse.redirect(new URL("/mail/inbox", url.origin));
  }

  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", url.origin);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function extractCookie(cookieString: string, name: string): string | null {
  const match = cookieString.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}