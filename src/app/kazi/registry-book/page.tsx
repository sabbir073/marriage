"use client";

import { useState, useMemo } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { toBanglaDigits } from "@/lib/utils";

interface RegistryEntry {
  serial: number;
  regNo: string;
  groomName: string;
  brideName: string;
  marriageDate: string;
  marriageDateSort: string;
  type: string;
  typeBn: string;
  status: "REGISTERED" | "COMPLETED" | "PENDING";
  statusBn: string;
  year: number;
}

const MOCK_REGISTRY_DATA: RegistryEntry[] = [
  {
    serial: 1,
    regNo: "DMR-2026-0001",
    groomName: "মোঃ রাশেদ হোসেন",
    brideName: "ফাতেমা খাতুন",
    marriageDate: "০৫ জানুয়ারি ২০২৬",
    marriageDateSort: "2026-01-05",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "COMPLETED",
    statusBn: "সম্পন্ন",
    year: 2026,
  },
  {
    serial: 2,
    regNo: "DMR-2026-0002",
    groomName: "মোঃ তানভীর আহমেদ",
    brideName: "নুসরাত জাহান",
    marriageDate: "১২ জানুয়ারি ২০২৬",
    marriageDateSort: "2026-01-12",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "COMPLETED",
    statusBn: "সম্পন্ন",
    year: 2026,
  },
  {
    serial: 3,
    regNo: "DMR-2026-0003",
    groomName: "মোঃ ইমরান হক",
    brideName: "সাবরিনা আক্তার",
    marriageDate: "২০ জানুয়ারি ২০২৬",
    marriageDateSort: "2026-01-20",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "COMPLETED",
    statusBn: "সম্পন্ন",
    year: 2026,
  },
  {
    serial: 4,
    regNo: "DMR-2026-0004",
    groomName: "মোঃ ফারুক আহমেদ",
    brideName: "রুমানা ইসলাম",
    marriageDate: "০৩ ফেব্রুয়ারি ২০২৬",
    marriageDateSort: "2026-02-03",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "COMPLETED",
    statusBn: "সম্পন্ন",
    year: 2026,
  },
  {
    serial: 5,
    regNo: "DMR-2026-0005",
    groomName: "মোঃ সোহেল রানা",
    brideName: "তাসলিমা বেগম",
    marriageDate: "১০ ফেব্রুয়ারি ২০২৬",
    marriageDateSort: "2026-02-10",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "COMPLETED",
    statusBn: "সম্পন্ন",
    year: 2026,
  },
  {
    serial: 6,
    regNo: "DMR-2026-0006",
    groomName: "মোঃ জাহিদ হাসান",
    brideName: "শিরিন আক্তার",
    marriageDate: "১৫ ফেব্রুয়ারি ২০২৬",
    marriageDateSort: "2026-02-15",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "REGISTERED",
    statusBn: "নিবন্ধিত",
    year: 2026,
  },
  {
    serial: 7,
    regNo: "DMR-2026-0007",
    groomName: "মোঃ কামরুল ইসলাম",
    brideName: "আয়েশা সিদ্দিকা",
    marriageDate: "২০ ফেব্রুয়ারি ২০২৬",
    marriageDateSort: "2026-02-20",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "REGISTERED",
    statusBn: "নিবন্ধিত",
    year: 2026,
  },
  {
    serial: 8,
    regNo: "DMR-2025-0142",
    groomName: "মোঃ নাঈম উদ্দিন",
    brideName: "মারিয়া আক্তার",
    marriageDate: "২৫ ডিসেম্বর ২০২৫",
    marriageDateSort: "2025-12-25",
    type: "MUSLIM",
    typeBn: "মুসলিম বিবাহ",
    status: "COMPLETED",
    statusBn: "সম্পন্ন",
    year: 2025,
  },
];

const YEAR_OPTIONS = [
  { value: "all", label: "সব বছর" },
  { value: "2026", label: `${toBanglaDigits(2026)}` },
  { value: "2025", label: `${toBanglaDigits(2025)}` },
  { value: "2024", label: `${toBanglaDigits(2024)}` },
];

const TYPE_OPTIONS = [
  { value: "all", label: "সব ধরণ" },
  { value: "MUSLIM", label: "মুসলিম বিবাহ" },
  { value: "HINDU", label: "হিন্দু বিবাহ" },
  { value: "SPECIAL", label: "বিশেষ বিবাহ" },
  { value: "CHRISTIAN", label: "খ্রিস্টান বিবাহ" },
];

function getStatusBadgeVariant(
  status: RegistryEntry["status"]
): "success" | "info" | "warning" {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "REGISTERED":
      return "info";
    case "PENDING":
      return "warning";
    default:
      return "info";
  }
}

export default function RegistryBookPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredData = useMemo(() => {
    return MOCK_REGISTRY_DATA.filter((entry) => {
      // Year filter
      if (yearFilter !== "all" && entry.year !== parseInt(yearFilter)) {
        return false;
      }
      // Type filter
      if (typeFilter !== "all" && entry.type !== typeFilter) {
        return false;
      }
      // Search by name or reg no
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          entry.groomName.toLowerCase().includes(q) ||
          entry.brideName.toLowerCase().includes(q) ||
          entry.regNo.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, yearFilter, typeFilter]);

  const totalCount = filteredData.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            নিবন্ধন বই
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            ডিজিটাল রেজিস্ট্রি বুক — আপনার সকল নিবন্ধনের রেকর্ড
          </p>
        </div>
        <Button variant="outline">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12zm-3 0h.008v.008H15.75V12z"
            />
          </svg>
          প্রিন্ট / এক্সপোর্ট
        </Button>
      </div>

      {/* Note */}
      <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 px-4 py-3">
        <svg
          className="h-5 w-5 shrink-0 text-amber-600 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">দ্রষ্টব্য:</span> ক্রমিক নম্বর
          প্রতি বছর নতুন করে শুরু হয়। বর্তমান বছর ({toBanglaDigits(2026)})
          এর ক্রমিক নম্বর ১ থেকে শুরু।
        </p>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              label="অনুসন্ধান (Search)"
              placeholder="নাম বা নিবন্ধন নম্বর দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              label="বছর (Year)"
              options={YEAR_OPTIONS}
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              label="ধরণ (Type)"
              options={TYPE_OPTIONS}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          মোট {toBanglaDigits(totalCount)}টি নিবন্ধন পাওয়া গেছে
        </p>
        <Badge variant="outline">
          {yearFilter === "all"
            ? "সব বছর"
            : `${toBanglaDigits(yearFilter)}`}
        </Badge>
      </div>

      {/* Table */}
      <Card padding="sm" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-tertiary">
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  ক্রমিক নং
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  নিবন্ধন নম্বর
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  বর
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  কনে
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  বিবাহের তারিখ
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  ধরণ
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  অবস্থা
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text-secondary">
                  কার্যক্রম
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-text-muted"
                  >
                    <svg
                      className="mx-auto h-10 w-10 mb-2 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                    কোনো নিবন্ধন পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।
                  </td>
                </tr>
              ) : (
                filteredData.map((entry) => (
                  <tr
                    key={entry.regNo}
                    className="hover:bg-surface-tertiary transition-colors cursor-pointer group"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-text-secondary">
                      {toBanglaDigits(entry.serial)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <span className="font-mono text-xs text-primary font-medium">
                        {entry.regNo}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-text">
                      {entry.groomName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-text">
                      {entry.brideName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-text-secondary">
                      {entry.marriageDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-text-secondary">
                      {entry.typeBn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Badge variant={getStatusBadgeVariant(entry.status)}>
                        {entry.statusBn}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        বিস্তারিত →
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-muted">
        <p>
          কাজী: মাওলানা আব্দুর রহমান | এলাকা: ধানমন্ডি, ঢাকা | লাইসেন্স নং:
          KZ-{toBanglaDigits(2024)}-{toBanglaDigits("04521")}
        </p>
        <p>
          সর্বশেষ আপডেট: {toBanglaDigits(23)} ফেব্রুয়ারি{" "}
          {toBanglaDigits(2026)}
        </p>
      </div>
    </div>
  );
}
