import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type UserProfile = {
  id: string;
  email: string | undefined;
  profile: {
    full_name_bn: string;
    full_name_en: string | null;
    nid_number: string | null;
    mobile: string | null;
    role: string;
    is_active: boolean;
  };
  kaziProfile: {
    id: string;
    registration_number: string;
    kazi_type: string;
    jurisdiction_id: string | null;
    status: string;
  } | null;
};

/**
 * Get the current authenticated user with their profile and kazi data.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  // If user is a Kazi, also fetch their kazi profile
  let kaziProfile = null;
  if (profile.role === "KAZI") {
    const { data } = await supabase
      .from("kazi_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    kaziProfile = data;
  }

  return {
    id: user.id,
    email: user.email,
    profile,
    kaziProfile,
  };
}

/**
 * Require authentication. Redirects to /login if not authenticated.
 * Optionally restrict to specific roles.
 */
export async function requireAuth(allowedRoles?: string[]): Promise<UserProfile> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (allowedRoles && !allowedRoles.includes(user.profile.role)) {
    redirect("/login");
  }

  return user;
}
