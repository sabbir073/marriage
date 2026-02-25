"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { toBanglaDigits } from "@/lib/utils";

const STATUS_MAP: Record<string, { label: string; variant: "default" | "success" | "warning" | "error" | "info" }> = {
  NOTICE_FILED: { label: "নোটিশ দাখিল", variant: "info" },
  ARBITRATION_PENDING: { label: "সালিশ মুলতুবি", variant: "warning" },
  ARBITRATION_IN_PROGRESS: { label: "সালিশ চলমান", variant: "warning" },
  IDDAT_PERIOD: { label: "ইদ্দত চলমান", variant: "error" },
  DIVORCE_EFFECTIVE: { label: "তালাক কার্যকর", variant: "default" },
  REGISTERED: { label: "নিবন্ধিত", variant: "success" },
  WITHDRAWN: { label: "প্রত্যাহারকৃত", variant: "default" },
};

const MOCK_CASES = [
  {
    id: "DIV-2026-0041",
    type: "তালাক",
    husband: "মোঃ রফিকুল ইসলাম",
    wife: "ফাতেমা খাতুন",
    marriageRegNo: "MR-DHK-2020-001234",
    noticeDate: "2026-01-10",
    status: "IDDAT_PERIOD",
    iddatEnd: "2026-04-10",
    daysRemaining: 44,
  },
  {
    id: "DIV-2026-0038",
    type: "খুলা",
    husband: "আব্দুর রহমান",
    wife: "নাজমা বেগম",
    marriageRegNo: "MR-DHK-2022-000876",
    noticeDate: "2026-01-25",
    status: "ARBITRATION_IN_PROGRESS",
    iddatEnd: null,
    daysRemaining: null,
  },
  {
    id: "DIV-2026-0035",
    type: "তালাক-ই-তাফবীজ",
    husband: "মোঃ কামাল হোসেন",
    wife: "রোকেয়া সুলতানা",
    marriageRegNo: "MR-DHK-2019-002100",
    noticeDate: "2025-12-05",
    status: "DIVORCE_EFFECTIVE",
    iddatEnd: "2026-03-05",
    daysRemaining: 0,
  },
  {
    id: "DIV-2026-0032",
    type: "বিচারিক",
    husband: "সাইফুল ইসলাম",
    wife: "তাহমিনা আক্তার",
    marriageRegNo: "MR-DHK-2018-001500",
    noticeDate: "2025-11-20",
    status: "REGISTERED",
    iddatEnd: null,
    daysRemaining: null,
  },
  {
    id: "DIV-2026-0029",
    type: "মুবারাত",
    husband: "মোঃ জাহাঙ্গীর আলম",
    wife: "সাবিনা ইয়াসমিন",
    marriageRegNo: "MR-DHK-2021-001800",
    noticeDate: "2026-02-01",
    status: "NOTICE_FILED",
    iddatEnd: null,
    daysRemaining: null,
  },
  {
    id: "DIV-2025-0120",
    type: "তালাক",
    husband: "মোঃ হাসান আলী",
    wife: "শামীমা আক্তার",
    marriageRegNo: "MR-DHK-2017-000950",
    noticeDate: "2025-10-01",
    status: "WITHDRAWN",
    iddatEnd: null,
    daysRemaining: null,
  },
];

export default function KaziDivorceCasesPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = MOCK_CASES.filter((c) => {
    if (statusFilter && c.status !== statusFilter) return false;
    if (typeFilter && c.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">বিবাহবিচ্ছেদ কেস সমূহ</h1>
          <p className="text-sm text-text-secondary mt-1">চলমান ও সম্পন্ন বিবাহবিচ্ছেদ কেসের তালিকা</p>
        </div>
        <Button onClick={() => window.location.href = "/kazi/divorce/register"}>নতুন বিবাহবিচ্ছেদ</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "মোট কেস", value: "৬", color: "bg-slate-100 text-slate-800" },
          { label: "ইদ্দত চলমান", value: "১", color: "bg-red-100 text-red-800" },
          { label: "সালিশ চলমান", value: "১", color: "bg-amber-100 text-amber-800" },
          { label: "নিবন্ধিত", value: "১", color: "bg-green-100 text-green-800" },
        ].map((s) => (
          <div key={s.label} className={`rounded-[var(--radius-md)] p-3 text-center ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-3">
          <div className="w-48">
            <Select
              label="অবস্থা"
              options={[
                { value: "", label: "সকল অবস্থা" },
                { value: "NOTICE_FILED", label: "নোটিশ দাখিল" },
                { value: "ARBITRATION_PENDING", label: "সালিশ মুলতুবি" },
                { value: "ARBITRATION_IN_PROGRESS", label: "সালিশ চলমান" },
                { value: "IDDAT_PERIOD", label: "ইদ্দত চলমান" },
                { value: "DIVORCE_EFFECTIVE", label: "তালাক কার্যকর" },
                { value: "REGISTERED", label: "নিবন্ধিত" },
                { value: "WITHDRAWN", label: "প্রত্যাহারকৃত" },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select
              label="ধরন"
              options={[
                { value: "", label: "সকল ধরন" },
                { value: "তালাক", label: "তালাক" },
                { value: "তালাক-ই-তাফবীজ", label: "তালাক-ই-তাফবীজ" },
                { value: "খুলা", label: "খুলা" },
                { value: "মুবারাত", label: "মুবারাত" },
                { value: "বিচারিক", label: "বিচারিক" },
              ]}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Cases List */}
      <div className="space-y-3">
        {filtered.map((c) => {
          const st = STATUS_MAP[c.status] || { label: c.status, variant: "default" as const };
          return (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-primary">{c.id}</span>
                    <Badge variant={st.variant}>{st.label}</Badge>
                    <span className="text-xs text-text-muted">{c.type}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm mt-2">
                    <p><span className="text-text-muted">স্বামী:</span> {c.husband}</p>
                    <p><span className="text-text-muted">স্ত্রী:</span> {c.wife}</p>
                    <p><span className="text-text-muted">বিবাহ নং:</span> <span className="font-mono text-xs">{c.marriageRegNo}</span></p>
                    <p><span className="text-text-muted">নোটিশ:</span> {c.noticeDate}</p>
                  </div>

                  {/* Iddat countdown */}
                  {c.status === "IDDAT_PERIOD" && c.daysRemaining !== null && (
                    <div className="mt-3 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-red-700 font-medium">ইদ্দত সময়কাল</span>
                        <span className="text-red-800 font-bold">{toBanglaDigits(c.daysRemaining)} দিন বাকি</span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-red-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-red-500 transition-all"
                          style={{ width: `${((90 - c.daysRemaining) / 90) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-red-600 mt-1">
                        <span>নোটিশ: {c.noticeDate}</span>
                        <span>কার্যকর: {c.iddatEnd}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 sm:flex-col">
                  <Button size="sm" variant="outline">বিস্তারিত</Button>
                  {c.status === "DIVORCE_EFFECTIVE" && <Button size="sm">নিবন্ধন করুন</Button>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="text-center py-8 text-text-muted">
          <p>কোনো কেস পাওয়া যায়নি।</p>
        </Card>
      )}
    </div>
  );
}
