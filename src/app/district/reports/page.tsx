import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";

/* ---------- Options ---------- */

const REPORT_TYPE_OPTIONS = [
  { value: "monthly", label: "মাসিক সারসংক্ষেপ (Monthly Summary)" },
  { value: "type-breakdown", label: "ধরণভিত্তিক বিশ্লেষণ (Type Breakdown)" },
  { value: "kazi-performance", label: "কাজী কর্মদক্ষতা (Kazi Performance)" },
  { value: "divorce", label: "তালাক পরিসংখ্যান (Divorce Statistics)" },
];

const FORMAT_OPTIONS = [
  { value: "pdf", label: "PDF" },
  { value: "csv", label: "CSV" },
  { value: "xlsx", label: "Excel (XLSX)" },
];

/* ---------- Mock preview data: Monthly summary ---------- */

const MONTHLY_PREVIEW = [
  { month: "জানুয়ারি ২০২৬", muslim: "২৩৮", hindu: "২৭", special: "১১", christian: "৫", divorce: "১২", total: "২৯৩" },
  { month: "ফেব্রুয়ারি ২০২৬", muslim: "২৫১", hindu: "৩১", special: "১৪", christian: "৭", divorce: "৯", total: "৩১২" },
];

/* ---------- Mock preview data: Type breakdown ---------- */

const TYPE_BREAKDOWN_PREVIEW = [
  { type: "মুসলিম বিবাহ (Muslim)", count: "২,৮৭৬", pct: "৮৩.২%", avgAge: "২৫.৪" },
  { type: "হিন্দু বিবাহ (Hindu)", count: "৩২১", pct: "৯.৩%", avgAge: "২৪.৮" },
  { type: "বিশেষ বিবাহ (Special)", count: "১৪৫", pct: "৪.২%", avgAge: "২৮.১" },
  { type: "খ্রিস্টান বিবাহ (Christian)", count: "৬৭", pct: "১.৯%", avgAge: "২৬.৩" },
  { type: "বৌদ্ধ বিবাহ (Buddhist)", count: "৩২", pct: "০.৯%", avgAge: "২৫.৯" },
  { type: "অন্যান্য (Other)", count: "১৫", pct: "০.৫%", avgAge: "২৭.২" },
];

/* ---------- Mock preview data: Kazi performance ---------- */

const KAZI_PERFORMANCE_PREVIEW = [
  { name: "মাওলানা আব্দুর রহমান", type: "মুসলিম", area: "ধানমন্ডি", total: "৪৫", completed: "৪৩", pending: "২", avgDays: "৩.২" },
  { name: "মাওলানা হাফেজ ইব্রাহিম", type: "মুসলিম", area: "মিরপুর", total: "৩৮", completed: "৩৬", pending: "২", avgDays: "৪.১" },
  { name: "পণ্ডিত রাজেশ শর্মা", type: "হিন্দু", area: "গুলশান", total: "১২", completed: "১২", pending: "০", avgDays: "২.৮" },
  { name: "অ্যাডভোকেট সালমা নাসরীন", type: "বিশেষ", area: "মতিঝিল", total: "৮", completed: "৭", pending: "১", avgDays: "৫.৬" },
];

/* ---------- Mock preview data: Divorce statistics ---------- */

const DIVORCE_PREVIEW = [
  { month: "জানুয়ারি ২০২৬", filed: "১৫", completed: "১২", pending: "৩", avgDuration: "৪৫ দিন" },
  { month: "ফেব্রুয়ারি ২০২৬", filed: "১১", completed: "৯", pending: "৫", avgDuration: "৩৮ দিন" },
];

/* ---------- Page ---------- */

export default function DistrictReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">প্রতিবেদন ও রপ্তানি (Reports & Export)</h1>
        <p className="text-sm text-text-secondary mt-1">
          ঢাকা জেলার বিবাহ ও তালাক নিবন্ধন সংক্রান্ত প্রতিবেদন তৈরি ও রপ্তানি করুন
        </p>
      </div>

      {/* Read-only notice */}
      <div className="rounded-[var(--radius-md)] bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-blue-700">
          <strong>অডিট মোড:</strong> আপনি প্রতিবেদন দেখতে ও রপ্তানি করতে পারবেন। তথ্য সম্পাদনার অনুমতি নেই।
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="শেষ প্রতিবেদন"
          value="আজ"
          subtitle="২৩ ফেব্রুয়ারি ২০২৬"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="এই মাসে রপ্তানি"
          value="১২"
          subtitle="PDF: ৭, CSV: ৩, Excel: ২"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="উপলব্ধ প্রতিবেদন"
          value="৪"
          subtitle="মাসিক, ধরণ, কাজী, তালাক"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>}
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="তথ্য পরিসীমা"
          value="২০২৬"
          subtitle="জানুয়ারি — ফেব্রুয়ারি"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Report configuration */}
      <Card>
        <CardTitle>প্রতিবেদন তৈরি করুন (Generate Report)</CardTitle>
        <CardDescription>প্রতিবেদনের ধরণ, তারিখ সীমা ও ফরম্যাট নির্বাচন করুন</CardDescription>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="প্রতিবেদনের ধরণ (Report Type)"
            options={REPORT_TYPE_OPTIONS}
            defaultValue="monthly"
          />
          <Input
            label="শুরুর তারিখ (From Date)"
            type="date"
            defaultValue="2026-01-01"
          />
          <Input
            label="শেষ তারিখ (To Date)"
            type="date"
            defaultValue="2026-02-23"
          />
          <Select
            label="ফরম্যাট (Format)"
            options={FORMAT_OPTIONS}
            defaultValue="pdf"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <Button variant="primary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            পূর্বরূপ দেখুন (Preview)
          </Button>
          <Button variant="secondary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            রপ্তানি করুন (Export)
          </Button>
        </div>
      </Card>

      {/* Preview: Monthly Summary */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>পূর্বরূপ: মাসিক সারসংক্ষেপ (Monthly Summary Preview)</CardTitle>
            <CardDescription>জানুয়ারি — ফেব্রুয়ারি ২০২৬</CardDescription>
          </div>
          <Badge variant="info">PDF প্রস্তুত</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">মাস</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">মুসলিম</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">হিন্দু</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বিশেষ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">খ্রিস্টান</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">তালাক</th>
                <th className="pb-2 font-medium text-text-secondary">মোট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MONTHLY_PREVIEW.map((row) => (
                <tr key={row.month} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-text">{row.month}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.muslim}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.hindu}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.special}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.christian}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.divorce}</td>
                  <td className="py-2.5 font-bold text-text">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Preview: Type Breakdown */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>ধরণভিত্তিক বিশ্লেষণ (Type Breakdown)</CardTitle>
            <CardDescription>২০২৬ সালের সকল নিবন্ধনের ধরণভিত্তিক বিশ্লেষণ</CardDescription>
          </div>
          <Badge variant="outline">২০২৬</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">বিবাহের ধরণ (Type)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">সংখ্যা (Count)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">শতাংশ (%)</th>
                <th className="pb-2 font-medium text-text-secondary">গড় বয়স (Avg. Age)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {TYPE_BREAKDOWN_PREVIEW.map((row) => (
                <tr key={row.type} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-text">{row.type}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.count}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.pct}</td>
                  <td className="py-2.5 text-text-secondary">{row.avgAge} বছর</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Preview: Kazi Performance */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>কাজী কর্মদক্ষতা (Kazi Performance)</CardTitle>
            <CardDescription>শীর্ষ কাজীদের নিবন্ধন কর্মদক্ষতার প্রতিবেদন</CardDescription>
          </div>
          <Badge variant="outline">শীর্ষ ৪</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">কাজীর নাম</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ধরণ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">এলাকা</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">মোট</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">সম্পন্ন</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বিচারাধীন</th>
                <th className="pb-2 font-medium text-text-secondary">গড় সময় (দিন)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {KAZI_PERFORMANCE_PREVIEW.map((row) => (
                <tr key={row.name} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-text">{row.name}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.type}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.area}</td>
                  <td className="py-2.5 pr-4 font-bold text-text">{row.total}</td>
                  <td className="py-2.5 pr-4 text-success">{row.completed}</td>
                  <td className="py-2.5 pr-4 text-warning">{row.pending}</td>
                  <td className="py-2.5 text-text-secondary">{row.avgDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Preview: Divorce Statistics */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>তালাক পরিসংখ্যান (Divorce Statistics)</CardTitle>
            <CardDescription>তালাক নিবন্ধনের মাসভিত্তিক পরিসংখ্যান</CardDescription>
          </div>
          <Badge variant="error">তালাক</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">মাস</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">দায়ের (Filed)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">সম্পন্ন (Completed)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বিচারাধীন (Pending)</th>
                <th className="pb-2 font-medium text-text-secondary">গড় সময়কাল (Avg. Duration)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DIVORCE_PREVIEW.map((row) => (
                <tr key={row.month} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-text">{row.month}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{row.filed}</td>
                  <td className="py-2.5 pr-4 text-success">{row.completed}</td>
                  <td className="py-2.5 pr-4 text-warning">{row.pending}</td>
                  <td className="py-2.5 text-text-secondary">{row.avgDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Export footer */}
      <Card className="bg-surface-tertiary">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text">প্রতিবেদন রপ্তানি (Export Report)</p>
            <p className="text-xs text-text-muted mt-0.5">
              উপরে নির্বাচিত প্রতিবেদনটি আপনার পছন্দের ফরম্যাটে ডাউনলোড করুন
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12zm-8.25 0h.008v.008H10.5V12z" />
              </svg>
              PDF ডাউনলোড
            </Button>
            <Button variant="outline" size="sm">
              CSV ডাউনলোড
            </Button>
            <Button variant="outline" size="sm">
              Excel ডাউনলোড
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
