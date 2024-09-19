import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./libs/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", request.nextUrl));

  const userData = await verifyToken(token);
  const pathName = request.nextUrl.pathname;

  if (pathName.includes("/user")) {
    if (userData.role !== "user")
      return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
  }

  if (pathName.includes("/booking")) {
    if (userData.role !== "user")
      return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
  }

  if (pathName.includes("/manager")) {
    if (userData.role !== "manager")
      return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
  }

  if (pathName.includes("/admin")) {
    if (userData.role !== "admin") {
      if (userData.role !== "super-admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
      }
    }
  }

  if (pathName.includes("/super-admin")) {
    if (userData.role !== "super-admin")
      return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/movies/:id/booking",
    "/manager/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
  ],
};
