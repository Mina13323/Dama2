import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "dama_admin_session";
const PUBLIC_PATHS = ["/login", "/accept-invite"];

/**
 * First gate only: no session cookie → login page. The real check (session in the
 * database, active user, role) runs on the server in every page and action.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return NextResponse.next();
  if (req.cookies.has(SESSION_COOKIE)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = pathname === "/" ? "" : `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|.*\\.(?:woff2|png|jpg|svg|ico)$).*)"],
};
