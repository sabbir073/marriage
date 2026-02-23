"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

type LoginMode = "citizen" | "official";

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("citizen");
  const [otpSent, setOtpSent] = useState(false);

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
              onClick={() => { setMode("citizen"); setOtpSent(false); }}
              className={`flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-all ${
                mode === "citizen"
                  ? "bg-white text-text shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              নাগরিক
            </button>
            <button
              onClick={() => { setMode("official"); setOtpSent(false); }}
              className={`flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-all ${
                mode === "official"
                  ? "bg-white text-text shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              কাজী / কর্মকর্তা
            </button>
          </div>

          {mode === "citizen" ? (
            <Card padding="lg">
              {!otpSent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOtpSent(true);
                  }}
                  className="space-y-4"
                >
                  <CardTitle>NID দিয়ে লগইন</CardTitle>
                  <CardDescription>
                    আপনার NID নম্বর দিন, NID-তে নিবন্ধিত মোবাইলে OTP পাঠানো হবে
                  </CardDescription>
                  <Input
                    label="জাতীয় পরিচয়পত্র নম্বর (NID)"
                    placeholder="১০ বা ১৭ সংখ্যার NID নম্বর"
                    type="text"
                    required
                  />
                  <Button type="submit" className="w-full" size="lg">
                    OTP পাঠান
                  </Button>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Navigate to citizen dashboard
                    window.location.href = "/citizen/dashboard";
                  }}
                  className="space-y-4"
                >
                  <CardTitle>OTP যাচাই</CardTitle>
                  <CardDescription>
                    আপনার মোবাইলে পাঠানো ৬ সংখ্যার কোডটি লিখুন
                  </CardDescription>
                  <Input
                    label="OTP কোড"
                    placeholder="৬ সংখ্যার কোড"
                    type="text"
                    maxLength={6}
                    required
                  />
                  <Button type="submit" className="w-full" size="lg">
                    যাচাই করুন ও প্রবেশ করুন
                  </Button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-sm text-text-secondary hover:text-primary"
                  >
                    ← NID নম্বর পরিবর্তন করুন
                  </button>
                </form>
              )}
            </Card>
          ) : (
            <Card padding="lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Navigate based on role (mock: go to kazi dashboard)
                  window.location.href = "/kazi/dashboard";
                }}
                className="space-y-4"
              >
                <CardTitle>কর্মকর্তা লগইন</CardTitle>
                <CardDescription>
                  কাজী, জেলা নিবন্ধক বা মন্ত্রণালয় কর্মকর্তাদের জন্য
                </CardDescription>
                <Input
                  label="ব্যবহারকারী নাম / User ID"
                  placeholder="আপনার User ID লিখুন"
                  type="text"
                  required
                />
                <Input
                  label="পাসওয়ার্ড"
                  placeholder="পাসওয়ার্ড লিখুন"
                  type="password"
                  required
                />
                <Input
                  label="2FA কোড"
                  placeholder="Authenticator অ্যাপ থেকে ৬ সংখ্যার কোড"
                  type="text"
                  maxLength={6}
                  required
                />
                <Button type="submit" className="w-full" size="lg">
                  প্রবেশ করুন
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
