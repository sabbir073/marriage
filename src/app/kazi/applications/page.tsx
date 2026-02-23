"use client";

import { useState, useMemo } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPOINTMENT_SET"
  | "DOCUMENTS_REQUESTED"
  | "COMPLETED"
  | "REJECTED";

type FilterTab = "ALL" | "SUBMITTED" | "UNDER_REVIEW" | "COMPLETED" | "REJECTED";

interface Application {
  id: string;
  groomName: string;
  brideName: string;
  type: string;
  typeBn: string;
  submittedDate: string;
  status: ApplicationStatus;
  statusBn: string;
  groomNid: string;
  brideNid: string;
  contactPhone: string;
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "APP-2026-001",
    groomName: "মোঃ রাশেদ হোসেন",
    brideName: "ফাতেমা খাতুন",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "২০ ফেব্রুয়ারি ২০২৬",
    status: "UNDER_REVIEW",
    statusBn: "পর্যালোচনাধীন",
    groomNid: "1995726893X",
    brideNid: "1998812345X",
    contactPhone: "০১৭XXXXXXXX",
  },
  {
    id: "APP-2026-002",
    groomName: "মোঃ তানভীর আহমেদ",
    brideName: "নুসরাত জাহান",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১৯ ফেব্রুয়ারি ২০২৬",
    status: "DOCUMENTS_REQUESTED",
    statusBn: "নথি প্রয়োজন",
    groomNid: "1993654321X",
    brideNid: "1997543210X",
    contactPhone: "০১৮XXXXXXXX",
  },
  {
    id: "APP-2026-003",
    groomName: "মোঃ ইমরান হক",
    brideName: "সাবরিনা আক্তার",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১৮ ফেব্রুয়ারি ২০২৬",
    status: "APPOINTMENT_SET",
    statusBn: "অ্যাপয়েন্টমেন্ট নির্ধারিত",
    groomNid: "1994876543X",
    brideNid: "1999234567X",
    contactPhone: "০১৯XXXXXXXX",
  },
  {
    id: "APP-2026-004",
    groomName: "মোঃ শাহীন আলম",
    brideName: "তাহমিনা রহমান",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১৭ ফেব্রুয়ারি ২০২৬",
    status: "UNDER_REVIEW",
    statusBn: "পর্যালোচনাধীন",
    groomNid: "1992345678X",
    brideNid: "2000678901X",
    contactPhone: "০১৫XXXXXXXX",
  },
  {
    id: "APP-2026-005",
    groomName: "মোঃ আরিফুল ইসলাম",
    brideName: "জান্নাতুল ফেরদৌস",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১৫ ফেব্রুয়ারি ২০২৬",
    status: "SUBMITTED",
    statusBn: "জমা দেওয়া হয়েছে",
    groomNid: "1996012345X",
    brideNid: "1998901234X",
    contactPhone: "০১৬XXXXXXXX",
  },
  {
    id: "APP-2026-006",
    groomName: "মোঃ মাহফুজুর রহমান",
    brideName: "সুমাইয়া আক্তার",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১৪ ফেব্রুয়ারি ২০২৬",
    status: "COMPLETED",
    statusBn: "অনুমোদিত",
    groomNid: "1991567890X",
    brideNid: "1997890123X",
    contactPhone: "০১৩XXXXXXXX",
  },
  {
    id: "APP-2026-007",
    groomName: "মোঃ কামরুল হাসান",
    brideName: "শারমিন সুলতানা",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১২ ফেব্রুয়ারি ২০২৬",
    status: "REJECTED",
    statusBn: "প্রত্যাখ্যাত",
    groomNid: "1990123456X",
    brideNid: "1996345678X",
    contactPhone: "০১৪XXXXXXXX",
  },
  {
    id: "APP-2026-008",
    groomName: "মোঃ নাজমুল হোসেন",
    brideName: "তাসনিম আক্তার",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    submittedDate: "১০ ফেব্রুয়ারি ২০২৬",
    status: "SUBMITTED",
    statusBn: "জমা দেওয়া হয়েছে",
    groomNid: "1994567890X",
    brideNid: "1999012345X",
    contactPhone: "০১১XXXXXXXX",
  },
];

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "ALL", label: "সকল" },
  { key: "SUBMITTED", label: "অপেক্ষমাণ" },
  { key: "UNDER_REVIEW", label: "পর্যালোচনাধীন" },
  { key: "COMPLETED", label: "অনুমোদিত" },
  { key: "REJECTED", label: "প্রত্যাখ্যাত" },
];

function getStatusBadgeVariant(
  status: ApplicationStatus
): "warning" | "info" | "success" | "default" | "error" {
  switch (status) {
    case "UNDER_REVIEW":
      return "warning";
    case "DOCUMENTS_REQUESTED":
      return "info";
    case "APPOINTMENT_SET":
      return "success";
    case "SUBMITTED":
      return "default";
    case "COMPLETED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "default";
  }
}

function getStatusIcon(status: ApplicationStatus) {
  switch (status) {
    case "UNDER_REVIEW":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "DOCUMENTS_REQUESTED":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case "APPOINTMENT_SET":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    case "COMPLETED":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "REJECTED":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
        </svg>
      );
  }
}

export default function KaziApplicationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = useMemo(() => {
    return MOCK_APPLICATIONS.filter((app) => {
      // Tab filter: "SUBMITTED" tab shows both SUBMITTED and DOCUMENTS_REQUESTED
      if (activeTab === "SUBMITTED" && app.status !== "SUBMITTED" && app.status !== "DOCUMENTS_REQUESTED") {
        return false;
      }
      // Tab filter: "UNDER_REVIEW" tab shows UNDER_REVIEW and APPOINTMENT_SET
      if (activeTab === "UNDER_REVIEW" && app.status !== "UNDER_REVIEW" && app.status !== "APPOINTMENT_SET") {
        return false;
      }
      if (activeTab === "COMPLETED" && app.status !== "COMPLETED") {
        return false;
      }
      if (activeTab === "REJECTED" && app.status !== "REJECTED") {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          app.groomName.toLowerCase().includes(q) ||
          app.brideName.toLowerCase().includes(q) ||
          app.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  // Count per tab for badges
  const tabCounts = useMemo(() => {
    const counts: Record<FilterTab, number> = {
      ALL: MOCK_APPLICATIONS.length,
      SUBMITTED: 0,
      UNDER_REVIEW: 0,
      COMPLETED: 0,
      REJECTED: 0,
    };
    MOCK_APPLICATIONS.forEach((app) => {
      if (app.status === "SUBMITTED" || app.status === "DOCUMENTS_REQUESTED") counts.SUBMITTED++;
      if (app.status === "UNDER_REVIEW" || app.status === "APPOINTMENT_SET") counts.UNDER_REVIEW++;
      if (app.status === "COMPLETED") counts.COMPLETED++;
      if (app.status === "REJECTED") counts.REJECTED++;
    });
    return counts;
  }, []);

  const pendingCount = tabCounts.SUBMITTED;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">আবেদন পর্যালোচনা</h1>
          <p className="text-sm text-text-secondary mt-1">
            নাগরিকদের অনলাইন আবেদন পর্যালোচনা করুন
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning">
            {toBanglaDigits(pendingCount)}টি অপেক্ষমাণ
          </Badge>
          <Badge variant="info">
            {toBanglaDigits(tabCounts.UNDER_REVIEW)}টি পর্যালোচনাধীন
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-[var(--radius-md)] border border-border bg-surface-tertiary p-1 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-white text-text shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "bg-surface-tertiary text-text-muted"
                }`}
              >
                {toBanglaDigits(tabCounts[tab.key])}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="আবেদন নম্বর বা নাম দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApplications.length === 0 ? (
          <Card>
            <div className="py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-text-muted opacity-30 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <p className="text-sm text-text-muted">
                এই ফিল্টারে কোনো আবেদন পাওয়া যায়নি
              </p>
            </div>
          </Card>
        ) : (
          filteredApplications.map((app) => (
            <Card key={app.id} hover className="cursor-pointer transition-all duration-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Application details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-text-muted bg-surface-tertiary px-2 py-0.5 rounded">
                      {app.id}
                    </span>
                    <Badge variant={getStatusBadgeVariant(app.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(app.status)}
                        {app.statusBn}
                      </span>
                    </Badge>
                    <Badge variant="outline">{app.typeBn}</Badge>
                  </div>

                  {/* Groom & Bride */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">বর</p>
                        <p className="text-sm font-semibold text-text">{app.groomName}</p>
                      </div>
                    </div>

                    <span className="hidden sm:block text-text-muted text-lg">&#8596;</span>

                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">কনে</p>
                        <p className="text-sm font-semibold text-text">{app.brideName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      জমা: {app.submittedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {app.contactPhone}
                    </span>
                  </div>
                </div>

                {/* Right: Action button */}
                <div className="flex shrink-0 items-start gap-2">
                  <Button size="sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    পর্যালোচনা
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Footer summary */}
      {filteredApplications.length > 0 && (
        <div className="text-center text-xs text-text-muted">
          মোট {toBanglaDigits(filteredApplications.length)}টি আবেদন প্রদর্শিত হচ্ছে
          {activeTab !== "ALL" && (
            <>
              {" "}(ফিল্টার: {FILTER_TABS.find((t) => t.key === activeTab)?.label})
            </>
          )}
        </div>
      )}
    </div>
  );
}
