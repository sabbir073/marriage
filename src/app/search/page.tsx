"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  name_bn: string;
  name_en: string;
  marital_status: string;
  marital_status_bn: string;
}

// Mock data for demonstration
const MOCK_RESULTS: Record<string, SearchResult> = {
  "1234567890": {
    name_bn: "মোঃ আব্দুল করিম",
    name_en: "Md. Abdul Karim",
    marital_status: "Married",
    marital_status_bn: "বিবাহিত",
  },
  "9876543210": {
    name_bn: "ফাতেমা বেগম",
    name_en: "Fatema Begum",
    marital_status: "Married",
    marital_status_bn: "বিবাহিত",
  },
  "5555555555": {
    name_bn: "রহিম উদ্দিন",
    name_en: "Rahim Uddin",
    marital_status: "Divorced",
    marital_status_bn: "তালাকপ্রাপ্ত",
  },
};

export default function SearchPage() {
  const [nid, setNid] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nid.trim()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setResult(MOCK_RESULTS[nid] || null);
    setSearched(true);
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
              তথ্য অনুসন্ধান
            </h1>
            <p className="mt-2 text-white/70">
              জাতীয় পরিচয়পত্র (NID) নম্বর দিয়ে বৈবাহিক অবস্থা যাচাই করুন
            </p>
            <p className="mt-1 text-sm text-white/50">
              Search by National ID (NID) to check marital status
            </p>
          </div>
        </section>

        {/* Search Form */}
        <section className="py-12">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <Card padding="lg">
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  label="জাতীয় পরিচয়পত্র নম্বর (NID)"
                  placeholder="১০ বা ১৭ সংখ্যার NID নম্বর লিখুন"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  hint="Enter 10 or 17 digit NID number"
                />
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading || !nid.trim()}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      অনুসন্ধান করা হচ্ছে...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      অনুসন্ধান করুন
                    </span>
                  )}
                </Button>
              </form>
            </Card>

            {/* Results */}
            {searched && (
              <div className="mt-6">
                {result ? (
                  <Card className="border-primary/20 bg-primary-50">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-success">তথ্য পাওয়া গেছে</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-text-muted">নাম / Name</p>
                        <p className="text-lg font-semibold text-text">
                          {result.name_bn}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {result.name_en}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">
                          বৈবাহিক অবস্থা / Marital Status
                        </p>
                        <div className="mt-1">
                          <Badge
                            variant={
                              result.marital_status === "Married"
                                ? "success"
                                : result.marital_status === "Divorced"
                                ? "warning"
                                : "default"
                            }
                          >
                            {result.marital_status_bn} ({result.marital_status})
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-text-muted">
                      বিস্তারিত তথ্য দেখতে লগইন করুন বা সংশ্লিষ্ট কাজীর সাথে যোগাযোগ করুন।
                    </p>
                  </Card>
                ) : (
                  <Card className="border-amber-200 bg-amber-50">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <span className="text-sm font-medium text-warning">
                        কোনো তথ্য পাওয়া যায়নি
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">
                      এই NID নম্বরের জন্য কোনো বিবাহ বা তালাক নিবন্ধন তথ্য পাওয়া যায়নি।
                      সঠিক NID নম্বর দিয়ে আবার চেষ্টা করুন।
                    </p>
                  </Card>
                )}
              </div>
            )}

            {/* Info Notice */}
            <div className="mt-8 rounded-[var(--radius-lg)] bg-surface-tertiary p-4">
              <h3 className="text-sm font-medium text-text mb-2">
                গোপনীয়তা নোটিশ
              </h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• সর্বসাধারণের জন্য শুধুমাত্র নাম ও বৈবাহিক অবস্থা দেখানো হয়</li>
                <li>• বিস্তারিত তথ্য দেখতে কাজী বা নিবন্ধকের প্রয়োজন</li>
                <li>• অনুসন্ধানের তথ্য সংরক্ষণ করা হয় না</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
