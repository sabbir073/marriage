"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type UserData = {
  id: string;
  email: string;
  fullNameBn: string;
  fullNameEn: string | null;
  role: string;
  nidNumber: string | null;
  mobile: string | null;
  kaziProfile: {
    id: string;
    registration_number: string;
    kazi_type: string;
    jurisdiction_id: string | null;
    status: string;
  } | null;
};

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (!profile) {
        setLoading(false);
        return;
      }

      let kaziProfile = null;
      if (profile.role === "KAZI") {
        const { data } = await supabase
          .from("kazi_profiles")
          .select("*")
          .eq("user_id", authUser.id)
          .single();
        kaziProfile = data;
      }

      setUser({
        id: authUser.id,
        email: authUser.email || "",
        fullNameBn: profile.full_name_bn,
        fullNameEn: profile.full_name_en,
        role: profile.role,
        nidNumber: profile.nid_number,
        mobile: profile.mobile,
        kaziProfile,
      });
      setLoading(false);
    }

    fetchUser();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return { user, loading, signOut };
}
