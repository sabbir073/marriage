"use client";

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";

const RECENT_APPLICATIONS = [
  {
    id: "APP-2026-045",
    bride: "ফাতেমা খাতুন",
    groom: "মোঃ আব্দুল করিম",
    type: "মুসলিম বিবাহ",
    submitted: "২০ ফেব্রুয়ারি ২০২৬",
    status: "UNDER_REVIEW" as const,
  },
  {
    id: "APP-2026-032",
    bride: "নুসরাত জাহান",
    groom: "মোঃ আব্দুল করিম",
    type: "মুসলিম বিবাহ",
    submitted: "১০ ফেব্রুয়ারি ২০২৬",
    status: "APPOINTMENT_SET" as const,
  },
  {
    id: "APP-2025-198",
    bride: "সাবিহা আক্তার",
    groom: "মোঃ আব্দুল করিম",
    type: "মুসলিম বিবাহ",
    submitted: "২৫ ডিসেম্বর ২০২৫",
    status: "COMPLETED" as const,
  },
];

const STATUS_MAP: Record<string, { label: string; variant: "warning" | "info" | "success" | "default" | "error" }> = {
  DRAFT: { label: "খসড়া", variant: "default" },
  SUBMITTED: { label: "জমা দেওয়া হয়েছে", variant: "info" },
  UNDER_REVIEW: { label: "পর্যালোচনাধীন", variant: "warning" },
  DOCUMENTS_REQUESTED: { label: "নথি প্রয়োজন", variant: "warning" },
  APPOINTMENT_SET: { label: "অ্যাপয়েন্টমেন্ট নির্ধারিত", variant: "info" },
  REGISTERED: { label: "নিবন্ধিত", variant: "success" },
  COMPLETED: { label: "সম্পন্ন", variant: "success" },
  REJECTED: { label: "প্রত্যাখ্যাত", variant: "error" },
};

export default function CitizenDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            স্বাগতম, মোঃ আব্দুল করিম
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            আপনার বিবাহ নিবন্ধন সংক্রান্ত সকল তথ্য এখানে দেখুন
          </p>
        </div>
        <Link href="/citizen/apply">
          <Button>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            নতুন আবেদন করুন
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="আমার আবেদন"
          value="৩"
          subtitle="১টি পর্যালোচনাধীন"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          }
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="সনদ"
          value="১"
          subtitle="ডাউনলোডের জন্য প্রস্তুত"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
          color="bg-green-50 text-green-600"
        />
        <StatsCard
          title="আসন্ন অ্যাপয়েন্টমেন্ট"
          value="১"
          subtitle="২৮ ফেব্রুয়ারি ২০২৬"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008z" />
            </svg>
          }
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardTitle className="mb-4">দ্রুত কার্যক্রম</CardTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/citizen/apply">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">বিবাহ নিবন্ধনের আবেদন করুন</p>
                <p className="text-xs text-text-muted">অনলাইনে আবেদন জমা দিন</p>
              </div>
            </div>
          </Link>
          <Link href="/citizen/apply">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0V15m0 3.75V15m-3 3.75V15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">তালাক নোটিশ দাখিল</p>
                <p className="text-xs text-text-muted">তালাক নোটিশ জমা দিন</p>
              </div>
            </div>
          </Link>
          <Link href="/citizen/certificates">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">সনদ ডাউনলোড</p>
                <p className="text-xs text-text-muted">বিবাহ সনদ ডাউনলোড করুন</p>
              </div>
            </div>
          </Link>
        </div>
      </Card>

      {/* Recent Applications */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>সাম্প্রতিক আবেদন</CardTitle>
          <Link href="/citizen/applications">
            <Button variant="ghost" size="sm">
              সব দেখুন →
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {RECENT_APPLICATIONS.map((app) => {
            const statusInfo = STATUS_MAP[app.status] || { label: app.status, variant: "default" as const };
            return (
              <div
                key={app.id}
                className="flex items-start justify-between rounded-[var(--radius-md)] border border-border p-3 hover:bg-surface-tertiary transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-muted">{app.id}</span>
                    <Badge variant={statusInfo.variant}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium text-text">
                    {app.groom} ↔ {app.bride}
                  </p>
                  <p className="text-xs text-text-muted">
                    {app.type} • জমা: {app.submitted}
                  </p>
                </div>
                <Link href={`/citizen/applications/${app.id}`}>
                  <Button variant="outline" size="sm">
                    বিস্তারিত
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
