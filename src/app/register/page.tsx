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

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "complete">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullNameBn = formData.get("fullNameBn") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const nidNumber = formData.get("nidNumber") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড মিলছে না।");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name_bn: fullNameBn,
            nid_number: nidNumber || null,
            mobile: mobile || null,
            role: "CITIZEN",
          },
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("এই ইমেইল দিয়ে ইতোমধ্যে অ্যাকাউন্ট আছে।");
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      setStep("complete");
    } catch {
      setError("নিবন্ধন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
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
            <h1 className="text-2xl font-bold text-text">নাগরিক নিবন্ধন</h1>
            <p className="mt-1 text-sm text-text-secondary">
              আপনার অ্যাকাউন্ট তৈরি করুন
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {step === "form" && (
            <Card padding="lg">
              <form onSubmit={handleRegister} className="space-y-4">
                <CardTitle>নতুন অ্যাকাউন্ট তৈরি করুন</CardTitle>
                <CardDescription>
                  আপনার তথ্য দিয়ে অ্যাকাউন্ট নিবন্ধন করুন
                </CardDescription>
                <Input
                  label="পূর্ণ নাম (বাংলা)"
                  name="fullNameBn"
                  placeholder="আপনার পূর্ণ নাম বাংলায় লিখুন"
                  required
                />
                <Input
                  label="ইমেইল"
                  name="email"
                  type="email"
                  placeholder="আপনার ইমেইল"
                  required
                />
                <Input
                  label="মোবাইল নম্বর"
                  name="mobile"
                  type="tel"
                  placeholder="০১XXXXXXXXX"
                />
                <Input
                  label="জাতীয় পরিচয়পত্র নম্বর (NID)"
                  name="nidNumber"
                  placeholder="১০ বা ১৭ সংখ্যার NID নম্বর"
                  hint="ঐচ্ছিক — পরেও দেওয়া যাবে"
                />
                <Input
                  label="পাসওয়ার্ড"
                  name="password"
                  type="password"
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  required
                />
                <Input
                  label="পাসওয়ার্ড নিশ্চিত করুন"
                  name="confirmPassword"
                  type="password"
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  required
                />
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন"}
                </Button>
              </form>
            </Card>
          )}

          {step === "complete" && (
            <Card padding="lg" className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <CardTitle>নিবন্ধন সফল!</CardTitle>
              <p className="mt-2 text-sm text-text-secondary">
                আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।
              </p>
              <div className="mt-6 space-y-3">
                <Button className="w-full" size="lg" onClick={() => { router.push("/citizen/dashboard"); router.refresh(); }}>
                  ড্যাশবোর্ডে যান
                </Button>
                <Link href="/citizen/apply">
                  <Button variant="outline" className="w-full" size="lg">
                    বিবাহ নিবন্ধনের আবেদন করুন
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {step !== "complete" && (
            <p className="mt-6 text-center text-sm text-text-secondary">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                লগইন করুন
              </Link>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
