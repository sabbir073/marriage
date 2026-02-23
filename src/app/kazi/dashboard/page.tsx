import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";

const PENDING_APPLICATIONS = [
  {
    id: "APP-2026-001",
    bride: "ফাতেমা খাতুন",
    groom: "মোঃ রাশেদ হোসেন",
    type: "মুসলিম বিবাহ",
    submitted: "২০ ফেব্রুয়ারি ২০২৬",
    status: "UNDER_REVIEW",
  },
  {
    id: "APP-2026-002",
    bride: "নুসরাত জাহান",
    groom: "মোঃ তানভীর আহমেদ",
    type: "মুসলিম বিবাহ",
    submitted: "১৯ ফেব্রুয়ারি ২০২৬",
    status: "DOCUMENTS_REQUESTED",
  },
  {
    id: "APP-2026-003",
    bride: "সাবরিনা আক্তার",
    groom: "মোঃ ইমরান হক",
    type: "মুসলিম বিবাহ",
    submitted: "১৮ ফেব্রুয়ারি ২০২৬",
    status: "APPOINTMENT_SET",
  },
];

const TODAY_APPOINTMENTS = [
  { time: "১০:০০", bride: "রুমানা ইসলাম", groom: "মোঃ ফারুক আহমেদ", type: "নিকাহ" },
  { time: "১১:৩০", bride: "তাসলিমা বেগম", groom: "মোঃ সোহেল রানা", type: "নিকাহ" },
  { time: "১৪:০০", bride: "শিরিন আক্তার", groom: "মোঃ জাহিদ হাসান", type: "নিকাহ" },
];

export default function KaziDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">ড্যাশবোর্ড</h1>
          <p className="text-sm text-text-secondary">
            আজকের তারিখ: ২৩ ফেব্রুয়ারি ২০২৬, রবিবার
          </p>
        </div>
        <Link href="/kazi/register">
          <Button>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            নতুন নিবন্ধন
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="পেন্ডিং আবেদন"
          value="৫"
          subtitle="পর্যালোচনার অপেক্ষায়"
          trend={{ value: "২ নতুন আজ", positive: true }}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-amber-50 text-amber-600"
        />
        <StatsCard
          title="আজকের অ্যাপয়েন্টমেন্ট"
          value="৩"
          subtitle="নিকাহ নিবন্ধন"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="এই মাসে নিবন্ধিত"
          value="২৮"
          subtitle="ফেব্রুয়ারি ২০২৬"
          trend={{ value: "১২% বেশি", positive: true }}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-green-50 text-green-600"
        />
        <StatsCard
          title="মোট নিবন্ধন (২০২৬)"
          value="১৪৭"
          subtitle="জানুয়ারি থেকে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Applications */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>পেন্ডিং আবেদন</CardTitle>
            <Link href="/kazi/applications">
              <Button variant="ghost" size="sm">
                সব দেখুন →
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {PENDING_APPLICATIONS.map((app) => (
              <div
                key={app.id}
                className="flex items-start justify-between rounded-[var(--radius-md)] border border-border p-3 hover:bg-surface-tertiary transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-muted">{app.id}</span>
                    <Badge
                      variant={
                        app.status === "UNDER_REVIEW"
                          ? "warning"
                          : app.status === "DOCUMENTS_REQUESTED"
                          ? "info"
                          : "success"
                      }
                    >
                      {app.status === "UNDER_REVIEW"
                        ? "পর্যালোচনাধীন"
                        : app.status === "DOCUMENTS_REQUESTED"
                        ? "নথি প্রয়োজন"
                        : "অ্যাপয়েন্টমেন্ট"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium text-text">
                    {app.groom} ↔ {app.bride}
                  </p>
                  <p className="text-xs text-text-muted">
                    {app.type} • জমা: {app.submitted}
                  </p>
                </div>
                <Link href={`/kazi/applications/${app.id}`}>
                  <Button variant="outline" size="sm">
                    দেখুন
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>আজকের অ্যাপয়েন্টমেন্ট</CardTitle>
            <Badge variant="info">৩টি</Badge>
          </div>
          <div className="space-y-3">
            {TODAY_APPOINTMENTS.map((apt, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-[var(--radius-md)] border border-border p-3"
              >
                <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary-50 text-primary text-sm font-bold">
                  {apt.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">
                    {apt.groom} ↔ {apt.bride}
                  </p>
                  <p className="text-xs text-text-muted">{apt.type}</p>
                </div>
                <Button variant="primary" size="sm">
                  শুরু করুন
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardTitle className="mb-4">দ্রুত কার্যক্রম</CardTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/kazi/register">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">নতুন বিবাহ নিবন্ধন</p>
                <p className="text-xs text-text-muted">সরাসরি নিবন্ধন করুন</p>
              </div>
            </div>
          </Link>
          <Link href="/kazi/verify-nid">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">NID / জন্মসনদ যাচাই</p>
                <p className="text-xs text-text-muted">পরিচয় যাচাই করুন</p>
              </div>
            </div>
          </Link>
          <Link href="/kazi/registry-book">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">নিবন্ধন বই</p>
                <p className="text-xs text-text-muted">ডিজিটাল রেজিস্টার</p>
              </div>
            </div>
          </Link>
          <Link href="/kazi/applications">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text">আবেদন পর্যালোচনা</p>
                <p className="text-xs text-text-muted">৫টি পেন্ডিং</p>
              </div>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
}
