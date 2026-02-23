"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

const STATUS_MAP: Record<string, { label: string; variant: "warning" | "info" | "success" | "default" | "error" }> = {
  DRAFT: { label: "খসড়া", variant: "default" },
  SUBMITTED: { label: "জমা দেওয়া হয়েছে", variant: "info" },
  UNDER_REVIEW: { label: "পর্যালোচনাধীন", variant: "warning" },
  APPOINTMENT_SET: { label: "অ্যাপয়েন্টমেন্ট নির্ধারিত", variant: "info" },
  COMPLETED: { label: "সম্পন্ন", variant: "success" },
  REJECTED: { label: "প্রত্যাখ্যাত", variant: "error" },
};

const MY_APPLICATIONS = [
  {
    id: "APP-2026-045",
    type: "মুসলিম বিবাহ",
    typeKey: "MUSLIM",
    typeEn: "Muslim Marriage",
    partnerName: "ফাতেমা খাতুন",
    groom: "মোঃ আব্দুল করিম",
    bride: "ফাতেমা খাতুন",
    submitted: "২০ ফেব্রুয়ারি ২০২৬",
    status: "UNDER_REVIEW",
  },
  {
    id: "APP-2026-032",
    type: "মুসলিম বিবাহ",
    typeKey: "MUSLIM",
    typeEn: "Muslim Marriage",
    partnerName: "নুসরাত জাহান",
    groom: "মোঃ আব্দুল করিম",
    bride: "নুসরাত জাহান",
    submitted: "১০ ফেব্রুয়ারি ২০২৬",
    status: "APPOINTMENT_SET",
  },
  {
    id: "APP-2026-028",
    type: "হিন্দু বিবাহ",
    typeKey: "HINDU",
    typeEn: "Hindu Marriage",
    partnerName: "প্রিয়া দাস",
    groom: "মোঃ আব্দুল করিম",
    bride: "প্রিয়া দাস",
    submitted: "০৫ ফেব্রুয়ারি ২০২৬",
    status: "DRAFT",
  },
  {
    id: "APP-2025-198",
    type: "মুসলিম বিবাহ",
    typeKey: "MUSLIM",
    typeEn: "Muslim Marriage",
    partnerName: "সাবিহা আক্তার",
    groom: "মোঃ আব্দুল করিম",
    bride: "সাবিহা আক্তার",
    submitted: "২৫ ডিসেম্বর ২০২৫",
    status: "COMPLETED",
  },
  {
    id: "APP-2025-176",
    type: "মুসলিম বিবাহ",
    typeKey: "MUSLIM",
    typeEn: "Muslim Marriage",
    partnerName: "রুমানা ইসলাম",
    groom: "মোঃ আব্দুল করিম",
    bride: "রুমানা ইসলাম",
    submitted: "১৫ নভেম্বর ২০২৫",
    status: "SUBMITTED",
  },
  {
    id: "APP-2025-140",
    type: "বিশেষ বিবাহ",
    typeKey: "SPECIAL",
    typeEn: "Special Marriage",
    partnerName: "মারিয়া চৌধুরী",
    groom: "মোঃ আব্দুল করিম",
    bride: "মারিয়া চৌধুরী",
    submitted: "০১ অক্টোবর ২০২৫",
    status: "REJECTED",
  },
];

const STATUS_OPTIONS = [
  { value: "ALL", label: "সকল স্ট্যাটাস" },
  { value: "DRAFT", label: "খসড়া" },
  { value: "SUBMITTED", label: "জমা দেওয়া হয়েছে" },
  { value: "UNDER_REVIEW", label: "পর্যালোচনাধীন" },
  { value: "APPOINTMENT_SET", label: "অ্যাপয়েন্টমেন্ট নির্ধারিত" },
  { value: "COMPLETED", label: "সম্পন্ন" },
  { value: "REJECTED", label: "প্রত্যাখ্যাত" },
];

const TYPE_OPTIONS = [
  { value: "ALL", label: "সকল ধরণ" },
  { value: "MUSLIM", label: "মুসলিম বিবাহ" },
  { value: "HINDU", label: "হিন্দু বিবাহ" },
  { value: "SPECIAL", label: "বিশেষ বিবাহ" },
  { value: "CHRISTIAN", label: "খ্রিস্টান বিবাহ" },
];

export default function CitizenApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return MY_APPLICATIONS.filter((app) => {
      if (statusFilter !== "ALL" && app.status !== statusFilter) return false;
      if (typeFilter !== "ALL" && app.typeKey !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">আমার আবেদনসমূহ</h1>
          <p className="text-sm text-text-secondary mt-1">
            আপনার সকল বিবাহ নিবন্ধন আবেদনের তালিকা
          </p>
        </div>
        <Link href="/citizen/apply">
          <Button>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            নতুন আবেদন
          </Button>
        </Link>
      </div>

      {/* Summary Badges */}
      <div className="flex flex-wrap gap-3">
        <div className="rounded-full border border-border bg-white px-4 py-1.5 text-sm text-text-secondary">
          মোট: <span className="font-semibold text-text">৬</span>
        </div>
        <div className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm text-amber-700">
          পর্যালোচনাধীন: <span className="font-semibold">১</span>
        </div>
        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm text-blue-700">
          জমাকৃত: <span className="font-semibold">১</span>
        </div>
        <div className="rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm text-green-700">
          সম্পন্ন: <span className="font-semibold">১</span>
        </div>
        <div className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm text-red-700">
          প্রত্যাখ্যাত: <span className="font-semibold">১</span>
        </div>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Select
              label="স্ট্যাটাস অনুযায়ী ফিল্টার"
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Select
              label="বিবাহের ধরণ অনুযায়ী ফিল্টার"
              options={TYPE_OPTIONS}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("ALL");
              setTypeFilter("ALL");
            }}
          >
            ফিল্টার রিসেট
          </Button>
        </div>
      </Card>

      {/* Results Count */}
      <p className="text-sm text-text-secondary">
        মোট <span className="font-semibold text-text">{filtered.length}</span>টি আবেদন প্রদর্শিত হচ্ছে
      </p>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0V15m0 3.75V15" />
            </svg>
            <p className="mt-4 text-lg font-medium text-text">কোনো আবেদন পাওয়া যায়নি</p>
            <p className="mt-1 text-sm text-text-muted">
              নির্বাচিত ফিল্টারে কোনো আবেদন নেই
            </p>
          </Card>
        ) : (
          filtered.map((app) => {
            const statusInfo = STATUS_MAP[app.status] || { label: app.status, variant: "default" as const };
            return (
              <Card key={app.id} hover className="transition-shadow">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-text-muted bg-surface-tertiary px-2 py-0.5 rounded">
                        {app.id}
                      </span>
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {/* Marriage Type */}
                    <p className="text-base font-semibold text-text">{app.type}</p>
                    <p className="text-xs text-text-muted mb-2">{app.typeEn}</p>

                    {/* Partner */}
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span>{app.groom} &#8596; {app.bride}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span>আবেদনের তারিখ: {app.submitted}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    <Link href={`/citizen/applications/${app.id}`}>
                      <Button variant="outline" size="sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        বিস্তারিত দেখুন
                      </Button>
                    </Link>
                    {app.status === "DRAFT" && (
                      <Link href="/citizen/apply/muslim">
                        <Button variant="primary" size="sm">
                          সম্পন্ন করুন
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
