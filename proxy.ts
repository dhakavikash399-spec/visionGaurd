import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";

const authMiddleware = withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

// Next.js 16: must export a named `proxy` function (middleware is deprecated)
export function proxy(request: NextRequest, event: Parameters<typeof authMiddleware>[1]) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  return authMiddleware(request as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/admin/:path*"],
};
