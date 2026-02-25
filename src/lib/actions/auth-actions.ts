"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Role → default redirect path
const ROLE_REDIRECTS: Record<string, string> = {
  CITIZEN: "/citizen/dashboard",
  KAZI: "/kazi/dashboard",
  DISTRICT_REGISTRAR: "/district/dashboard",
  MINISTRY_ADMIN: "/admin/dashboard",
  SUPER_ADMIN: "/admin/dashboard",
};

export async function signUpAction(data: {
  email: string;
  password: string;
  fullNameBn: string;
  fullNameEn?: string;
  nidNumber?: string;
  mobile?: string;
  role?: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name_bn: data.fullNameBn,
        full_name_en: data.fullNameEn || null,
        nid_number: data.nidNumber || null,
        mobile: data.mobile || null,
        role: data.role || "CITIZEN",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Supabase auto-confirms in local dev; in production you may want email confirmation
  const redirectPath = ROLE_REDIRECTS[data.role || "CITIZEN"] || "/citizen/dashboard";
  redirect(redirectPath);
}

export async function signInAction(data: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  // Get the user's role to redirect to the correct portal
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "লগইন ব্যর্থ হয়েছে" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role || "CITIZEN";
  const redirectPath = ROLE_REDIRECTS[role] || "/citizen/dashboard";
  redirect(redirectPath);
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
