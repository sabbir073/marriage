"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

type LoginMode = "citizen" | "official";

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("citizen");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Role → redirect path mapping
  const ROLE_REDIRECTS: Record<string, string> = {
    CITIZEN: "/citizen/dashboard",
    KAZI: "/kazi/dashboard",
    DISTRICT_REGISTRAR: "/district/dashboard",
    MINISTRY_ADMIN: "/admin/dashboard",
    SUPER_ADMIN: "/admin/dashboard",
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === "Invalid login credentials"
          ? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"
          : authError.message
        );
        setLoading(false);
        return;
      }

      // Get role to redirect to correct portal
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        const role = profile?.role || "CITIZEN";
        const redirectPath = ROLE_REDIRECTS[role] || "/citizen/dashboard";
        router.push(redirectPath);
        router.refresh();
      }
    } catch {
      setError("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-surface-secondary">
        <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
              বি
            </div>
            <h1 className="text-2xl font-bold text-text">লগইন করুন</h1>
            <p className="mt-1 text-sm text-text-secondary">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-[var(--radius-lg)] bg-surface-tertiary p-1 mb-6">
            <button
              onClick={() => { setMode("citizen"); setError(""); }}
              className={`flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-all ${
                mode === "citizen"
                  ? "bg-white text-text shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              নাগরিক
            </button>
            <button
              onClick={() => { setMode("official"); setError(""); }}
              className={`flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-all ${
                mode === "official"
                  ? "bg-white text-text shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              কাজী / কর্মকর্তা
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {mode === "citizen" ? (
            <Card padding="lg">
              <form onSubmit={handleLogin} className="space-y-4">
                <CardTitle>নাগরিক লগইন</CardTitle>
                <CardDescription>
                  আপনার ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন
                </CardDescription>
                <Input
                  label="ইমেইল"
                  name="email"
                  placeholder="আপনার ইমেইল"
                  type="email"
                  required
                />
                <Input
                  label="পাসওয়ার্ড"
                  name="password"
                  placeholder="পাসওয়ার্ড লিখুন"
                  type="password"
                  required
                />
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "প্রবেশ হচ্ছে..." : "প্রবেশ করুন"}
                </Button>
              </form>
            </Card>
          ) : (
            <Card padding="lg">
              <form onSubmit={handleLogin} className="space-y-4">
                <CardTitle>কর্মকর্তা লগইন</CardTitle>
                <CardDescription>
                  কাজী, জেলা নিবন্ধক বা মন্ত্রণালয় কর্মকর্তাদের জন্য
                </CardDescription>
                <Input
                  label="ইমেইল"
                  name="email"
                  placeholder="আপনার অফিসিয়াল ইমেইল"
                  type="email"
                  required
                />
                <Input
                  label="পাসওয়ার্ড"
                  name="password"
                  placeholder="পাসওয়ার্ড লিখুন"
                  type="password"
                  required
                />
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "প্রবেশ হচ্ছে..." : "প্রবেশ করুন"}
                </Button>
              </form>
            </Card>
          )}

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
