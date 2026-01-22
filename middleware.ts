import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabaseResponse, session } = await updateSession(request)

  const { pathname } = request.nextUrl

  // Protected routes - require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Auth pages - redirect to dashboard if already authenticated
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/reset-password"
  ) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth/callback (OAuth callback - must be excluded)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/callback).*)",
  ],
}
