import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/notes/filter"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!accessToken) {
    if (refreshToken) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
          {
            method: "GET",
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
          }
        );

        const setCookie = res.headers.get("set-cookie");

        if (setCookie) {
          const response = NextResponse.next();
          const parsed = parse(setCookie);

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken);
          }

          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken);
          }

          if (isPublic) {
            return NextResponse.redirect(new URL("/", request.url));
          }
          return response;
        }

      } catch (e) {
        if (isPrivate) {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      }
    }

    if (isPrivate) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  if (isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up", "/notes/filter/:path*"],
}