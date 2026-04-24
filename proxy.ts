import { NextRequest, NextResponse } from "next/server";
import { getServerMeFull } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ["/profile"];
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

        const response = await getServerMeFull();
        const setCookie = response.headers["set-cookie"];

        if (setCookie) {

          const res = NextResponse.next();
          const cookiesArr = Array.isArray(setCookie)

            ? setCookie
            : [setCookie];

          cookiesArr.forEach((cookieStr) => {

            const parsed = parse(cookieStr);

            if (parsed.accessToken) {

              res.cookies.set("accessToken", parsed.accessToken);

            }

            if (parsed.refreshToken) {

              res.cookies.set("refreshToken", parsed.refreshToken);

            }

          });


          if (isPublic) {

            return NextResponse.redirect(new URL("/profile", request.url));
          }
          return res;
        }

      } catch (e) {


      }
    }


    if (isPrivate) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }


  if (isPublic) {

    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};