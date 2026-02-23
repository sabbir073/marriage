"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VerifyPage() {
  const [certNumber, setCertNumber] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"manual" | "qr">("manual");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    // Mock: any cert number starting with "MR-" is valid
    setVerified(certNumber.startsWith("MR-") || certNumber.startsWith("DR-"));
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              সনদ যাচাই
            </h1>
            <p className="mt-2 text-white/70">
              বিবাহ বা তালাক সনদের সত্যতা যাচাই করুন
            </p>
            <p className="mt-1 text-sm text-white/50">
              Verify Marriage or Divorce Certificate Authenticity
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            {/* Tab Switcher */}
            <div className="flex rounded-[var(--radius-lg)] bg-surface-tertiary p-1 mb-6">
              <button
                onClick={() => setActiveTab("manual")}
                className={`flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === "manual"
                    ? "bg-white text-text shadow-sm"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                সনদ নম্বর দিয়ে
              </button>
              <button
                onClick={() => setActiveTab("qr")}
                className={`flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === "qr"
                    ? "bg-white text-text shadow-sm"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                QR কোড স্ক্যান
              </button>
            </div>

            {activeTab === "manual" ? (
              <Card padding="lg">
                <form onSubmit={handleVerify} className="space-y-4">
                  <Input
                    label="সনদ নম্বর / Certificate Number"
                    placeholder="যেমন: MR-DHK-2026-000142"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    hint="বিবাহ সনদে মুদ্রিত নম্বরটি লিখুন"
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading || !certNumber.trim()}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        যাচাই করা হচ্ছে...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        যাচাই করুন
                      </span>
                    )}
                  </Button>
                </form>
              </Card>
            ) : (
              <Card padding="lg">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex h-32 w-32 items-center justify-center rounded-[var(--radius-xl)] border-2 border-dashed border-border bg-surface-tertiary mb-4">
                    <svg className="h-16 w-16 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    সনদের QR কোড ক্যামেরার সামনে ধরুন
                  </p>
                  <Button variant="outline">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    ক্যামেরা খুলুন
                  </Button>
                </div>
              </Card>
            )}

            {/* Verification Result */}
            {verified !== null && (
              <div className="mt-6">
                {verified ? (
                  <Card className="border-green-200 bg-green-50">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800">
                          সনদটি বৈধ ✓
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          Certificate is Valid
                        </p>
                        <div className="mt-3 space-y-1.5 text-sm">
                          <div className="flex gap-2">
                            <span className="text-green-600 font-medium min-w-[100px]">সনদ নম্বর:</span>
                            <span className="text-green-800">{certNumber}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-green-600 font-medium min-w-[100px]">বিবাহের ধরণ:</span>
                            <span className="text-green-800">মুসলিম বিবাহ</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-green-600 font-medium min-w-[100px]">তারিখ:</span>
                            <span className="text-green-800">১৫ জানুয়ারি ২০২৬</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-green-600 font-medium min-w-[100px]">জেলা:</span>
                            <span className="text-green-800">ঢাকা</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="border-red-200 bg-red-50">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <svg className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-800">
                          সনদটি যাচাই করা যায়নি ✗
                        </h3>
                        <p className="text-sm text-red-700 mt-1">
                          Certificate could not be verified. Please check the certificate number and try again.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
