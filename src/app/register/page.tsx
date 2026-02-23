"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function RegisterPage() {
  const [step, setStep] = useState<"nid" | "verify" | "complete">("nid");

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
              NID দিয়ে আপনার অ্যাকাউন্ট তৈরি করুন
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[
              { key: "nid", label: "NID যাচাই" },
              { key: "verify", label: "OTP যাচাই" },
              { key: "complete", label: "সম্পন্ন" },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step === s.key
                      ? "bg-primary text-white"
                      : i < ["nid", "verify", "complete"].indexOf(step)
                      ? "bg-success text-white"
                      : "bg-surface-tertiary text-text-muted"
                  }`}
                >
                  {i < ["nid", "verify", "complete"].indexOf(step) ? "✓" : i + 1}
                </div>
                <span className="text-xs text-text-secondary hidden sm:inline">
                  {s.label}
                </span>
                {i < 2 && (
                  <div className="w-8 h-px bg-border mx-1" />
                )}
              </div>
            ))}
          </div>

          {step === "nid" && (
            <Card padding="lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("verify");
                }}
                className="space-y-4"
              >
                <CardTitle>NID তথ্য দিন</CardTitle>
                <CardDescription>
                  আপনার জাতীয় পরিচয়পত্রের তথ্য দিয়ে পরিচয় যাচাই করুন
                </CardDescription>
                <Input
                  label="জাতীয় পরিচয়পত্র নম্বর (NID)"
                  placeholder="১০ বা ১৭ সংখ্যার NID নম্বর"
                  required
                />
                <Input
                  label="জন্ম তারিখ"
                  type="date"
                  required
                />
                <div className="rounded-[var(--radius-md)] bg-blue-50 p-3 text-sm text-blue-700">
                  <strong>NID যাচাই:</strong> আপনার NID নম্বর ও জন্ম তারিখ দিয়ে
                  পরিচয় যাচাই করা হবে। NID-তে নিবন্ধিত মোবাইল নম্বরে OTP পাঠানো হবে।
                </div>
                <Button type="submit" className="w-full" size="lg">
                  NID যাচাই করুন
                </Button>
              </form>
            </Card>
          )}

          {step === "verify" && (
            <Card padding="lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("complete");
                }}
                className="space-y-4"
              >
                <CardTitle>OTP যাচাই</CardTitle>
                <CardDescription>
                  আপনার NID-তে নিবন্ধিত মোবাইল নম্বরে ৬ সংখ্যার কোড পাঠানো হয়েছে
                </CardDescription>

                {/* Auto-filled from NID */}
                <div className="rounded-[var(--radius-md)] bg-green-50 border border-green-200 p-3 space-y-1">
                  <p className="text-xs text-green-600 font-medium">NID থেকে প্রাপ্ত তথ্য ✓</p>
                  <p className="text-sm text-green-800 font-medium">মোঃ আব্দুল করিম</p>
                  <p className="text-xs text-green-700">মোবাইল: ০১৭XX-XXXXXX</p>
                </div>

                <Input
                  label="OTP কোড"
                  placeholder="৬ সংখ্যার কোড"
                  maxLength={6}
                  required
                />
                <Button type="submit" className="w-full" size="lg">
                  যাচাই করুন ও নিবন্ধন সম্পন্ন করুন
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("nid")}
                  className="w-full text-sm text-text-secondary hover:text-primary"
                >
                  ← NID তথ্য পরিবর্তন করুন
                </button>
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
                আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখন আপনি লগইন করতে পারবেন।
              </p>
              <div className="mt-6 space-y-3">
                <Link href="/citizen/dashboard">
                  <Button className="w-full" size="lg">
                    ড্যাশবোর্ডে যান
                  </Button>
                </Link>
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
