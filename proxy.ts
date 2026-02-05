import { NextResponse } from "next/server";

export default async function proxy(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const cookieHeader = req.headers.get("cookie") || "";

  // ----- LOGGING FOR DEBUGGING -----
  const token = extractCookie(cookieHeader, "auth_token");
  const role = extractCookie(cookieHeader, "user_role");
  
  console.log(`--- Proxy Check: ${pathname} ---`);
  console.log(`Token Found: ${!!token}`);
  console.log(`Role Found: ${role}`);

  const isAuthenticated = !!token && token.length > 0;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  
  const isProtectedAccount = pathname.startsWith("/account");
  const isProtectedInbox = pathname.startsWith("/mailer/inbox");
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedRoute = isProtectedAccount || isProtectedInbox || isProtectedAdmin;

  if (isAuthenticated && isAuthPage) {
    console.log("Redirecting authenticated user away from login");
    if (role === "superadmin") return NextResponse.redirect(new URL("/admin/dashboard", url.origin));
    if (role === "admin") return NextResponse.redirect(new URL("/account", url.origin));
    return NextResponse.redirect(new URL("/mailer/inbox", url.origin));
  }

  if (!isAuthenticated && isProtectedRoute) {
    console.log("Unauthorized access to protected route. Redirecting to login.");
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