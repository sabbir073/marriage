import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: call getUser() to refresh the session cookie
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Public routes — no auth needed
  const publicPaths = ["/", "/search", "/verify", "/registrars", "/login", "/register"];
  const isPublic =
    publicPaths.some((p) => path === p) ||
    path.startsWith("/api/") ||
    path.startsWith("/_next/");

  if (isPublic) {
    return response;
  }

  // Not logged in → redirect to login
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Fetch role from profiles table for role-based protection
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role || "CITIZEN";

  // Role-based route guards
  const roleRouteMap: Record<string, string[]> = {
    "/kazi": ["KAZI"],
    "/citizen": ["CITIZEN"],
    "/district": ["DISTRICT_REGISTRAR"],
    "/admin": ["MINISTRY_ADMIN", "SUPER_ADMIN"],
  };

  for (const [prefix, allowedRoles] of Object.entries(roleRouteMap)) {
    if (path.startsWith(prefix) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
