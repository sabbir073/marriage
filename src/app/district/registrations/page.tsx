import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";

/* ---------- Mock data ---------- */

const TYPE_BADGE: Record<string, "success" | "warning" | "info" | "error" | "default"> = {
  "মুসলিম": "success",
  "হিন্দু": "warning",
  "বিশেষ": "info",
  "খ্রিস্টান": "default",
  "তালাক": "error",
};

const STATUS_BADGE: Record<string, "success" | "warning" | "info" | "error" | "default" | "outline"> = {
  "সম্পন্ন": "success",
  "পর্যালোচনাধীন": "warning",
  "নিবন্ধিত": "info",
  "প্রত্যাখ্যাত": "error",
  "খসড়া": "outline",
};

const REGISTRATIONS = [
  {
    id: "MR-DHK-2026-003456",
    type: "মুসলিম",
    groom: "মোঃ রাশেদ হোসেন",
    bride: "ফাতেমা খাতুন",
    groomNid: "১৯৮৫২৩৪৫৬৭৮",
    brideNid: "১৯৯০৩৪৫৬৭৮৯",
    kazi: "মাওলানা আব্দুর রহমান",
    upazila: "ধানমন্ডি",
    date: "২৩ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
  },
  {
    id: "MR-DHK-2026-003455",
    type: "হিন্দু",
    groom: "সুব্রত দাস",
    bride: "প্রিয়া রানী দাস",
    groomNid: "১৯৮৮৪৫৬৭৮৯০",
    brideNid: "১৯৯২৫৬৭৮৯০১",
    kazi: "পণ্ডিত রাজেশ শর্মা",
    upazila: "গুলশান",
    date: "২২ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
  },
  {
    id: "MR-DHK-2026-003454",
    type: "মুসলিম",
    groom: "মোঃ তানভীর আহমেদ",
    bride: "নুসরাত জাহান",
    groomNid: "১৯৯১৬৭৮৯০১২",
    brideNid: "১৯৯৫৭৮৯০১২৩",
    kazi: "মাওলানা হাফেজ ইব্রাহিম",
    upazila: "মিরপুর",
    date: "২২ ফেব্রুয়ারি ২০২৬",
    status: "নিবন্ধিত",
  },
  {
    id: "MR-DHK-2026-003453",
    type: "বিশেষ",
    groom: "ডেভিড চৌধুরী",
    bride: "সারা ইসলাম",
    groomNid: "১৯৮৭৭৮৯০১২৩",
    brideNid: "১৯৯৩৮৯০১২৩৪",
    kazi: "অ্যাডভোকেট সালমা নাসরীন",
    upazila: "মতিঝিল",
    date: "২১ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
  },
  {
    id: "MR-DHK-2026-003452",
    type: "খ্রিস্টান",
    groom: "জেমস গমেজ",
    bride: "মারিয়া রোজারিও",
    groomNid: "১৯৮৬৮৯০১২৩৪",
    brideNid: "১৯৯১৯০১২৩৪৫",
    kazi: "ফাদার পিটার ডি'কস্তা",
    upazila: "তেজগাঁও",
    date: "২০ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
  },
  {
    id: "MR-DHK-2026-003451",
    type: "মুসলিম",
    groom: "মোঃ শাহীন আলম",
    bride: "তাসনিম আক্তার",
    groomNid: "১৯৮৯০১২৩৪৫৬",
    brideNid: "১৯৯৪১২৩৪৫৬৭",
    kazi: "মাওলানা আব্দুর রহমান",
    upazila: "ধানমন্ডি",
    date: "১৯ ফেব্রুয়ারি ২০২৬",
    status: "পর্যালোচনাধীন",
  },
  {
    id: "DR-DHK-2026-000089",
    type: "তালাক",
    groom: "মোঃ জাহিদ হাসান",
    bride: "রুমানা আক্তার",
    groomNid: "১৯৮৩১২৩৪৫৬৭",
    brideNid: "১৯৮৮২৩৪৫৬৭৮",
    kazi: "মাওলানা আব্দুর রহমান",
    upazila: "ধানমন্ডি",
    date: "২১ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
  },
  {
    id: "MR-DHK-2026-003450",
    type: "হিন্দু",
    groom: "অমিত কুমার সাহা",
    bride: "মিতা রানী সাহা",
    groomNid: "১৯৯০২৩৪৫৬৭৮",
    brideNid: "১৯৯৩৩৪৫৬৭৮৯",
    kazi: "পণ্ডিত রাজেশ শর্মা",
    upazila: "উত্তরা",
    date: "১৮ ফেব্রুয়ারি ২০২৬",
    status: "নিবন্ধিত",
  },
  {
    id: "MR-DHK-2026-003449",
    type: "বিশেষ",
    groom: "আরিফ হোসেন",
    bride: "জেনিফার আক্তার",
    groomNid: "১৯৮৮৩৪৫৬৭৮৯",
    brideNid: "১৯৯২৪৫৬৭৮৯০",
    kazi: "অ্যাডভোকেট সালমা নাসরীন",
    upazila: "বনানী",
    date: "১৭ ফেব্রুয়ারি ২০২৬",
    status: "প্রত্যাখ্যাত",
  },
  {
    id: "MR-DHK-2026-003448",
    type: "মুসলিম",
    groom: "মোঃ ফারুক আহমেদ",
    bride: "শারমিন সুলতানা",
    groomNid: "১৯৮৪৪৫৬৭৮৯০",
    brideNid: "১৯৮৯৫৬৭৮৯০১",
    kazi: "মাওলানা হাফেজ ইব্রাহিম",
    upazila: "মোহাম্মদপুর",
    date: "১৬ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
  },
];

const UPAZILA_OPTIONS = [
  { value: "", label: "সকল উপজেলা" },
  { value: "dhanmondi", label: "ধানমন্ডি" },
  { value: "gulshan", label: "গুলশান" },
  { value: "mirpur", label: "মিরপুর" },
  { value: "motijheel", label: "মতিঝিল" },
  { value: "tejgaon", label: "তেজগাঁও" },
  { value: "uttara", label: "উত্তরা" },
  { value: "banani", label: "বনানী" },
  { value: "mohammadpur", label: "মোহাম্মদপুর" },
];

const TYPE_OPTIONS = [
  { value: "", label: "সকল ধরণ" },
  { value: "muslim", label: "মুসলিম" },
  { value: "hindu", label: "হিন্দু" },
  { value: "special", label: "বিশেষ" },
  { value: "christian", label: "খ্রিস্টান" },
  { value: "divorce", label: "তালাক" },
];

const STATUS_OPTIONS = [
  { value: "", label: "সকল অবস্থা" },
  { value: "completed", label: "সম্পন্ন" },
  { value: "registered", label: "নিবন্ধিত" },
  { value: "review", label: "পর্যালোচনাধীন" },
  { value: "rejected", label: "প্রত্যাখ্যাত" },
  { value: "draft", label: "খসড়া" },
];

/* ---------- Page ---------- */

export default function DistrictRegistrationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">নিবন্ধন তথ্য (Registration Records)</h1>
        <p className="text-sm text-text-secondary mt-1">
          ঢাকা জেলার সকল বিবাহ ও তালাক নিবন্ধনের তালিকা ও অনুসন্ধান (শুধুমাত্র পড়ার অনুমতি)
        </p>
      </div>

      {/* Read-only notice */}
      <div className="rounded-[var(--radius-md)] bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-blue-700">
          <strong>অডিট মোড:</strong> আপনি শুধুমাত্র তথ্য দেখতে পারবেন। কোনো তথ্য সম্পাদনা বা অনুমোদনের অনুমতি নেই।
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট নিবন্ধন"
          value="৩,৪৫৬"
          subtitle="২০২৬ সালে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="এই মাসে নিবন্ধিত"
          value="২৮৭"
          subtitle="ফেব্রুয়ারি ২০২৬"
          trend={{ value: "৮% বেশি", positive: true }}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="পর্যালোচনাধীন"
          value="১৫"
          subtitle="কাজীদের কাছে বিচারাধীন"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-amber-50 text-amber-600"
        />
        <StatsCard
          title="তালাক নিবন্ধন"
          value="৮৯"
          subtitle="২০২৬ সালে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.5a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Search & Filters */}
      <Card>
        <CardTitle className="mb-4">অনুসন্ধান ও ফিল্টার (Search & Filter)</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="নাম (Name)"
            placeholder="বর বা কনের নাম লিখুন..."
          />
          <Input
            label="জাতীয় পরিচয়পত্র নম্বর (NID)"
            placeholder="NID নম্বর..."
          />
          <Input
            label="নিবন্ধন নম্বর (Reg. No.)"
            placeholder="MR-DHK-2026-..."
          />
          <Select
            label="উপজেলা (Upazila)"
            options={UPAZILA_OPTIONS}
            defaultValue=""
          />
          <Select
            label="বিবাহের ধরণ (Type)"
            options={TYPE_OPTIONS}
            defaultValue=""
          />
          <Select
            label="অবস্থা (Status)"
            options={STATUS_OPTIONS}
            defaultValue=""
          />
          <Input
            label="তারিখ (শুরু)"
            type="date"
          />
          <Input
            label="তারিখ (শেষ)"
            type="date"
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="primary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            অনুসন্ধান করুন
          </Button>
          <Button variant="outline" size="sm">
            ফিল্টার মুছুন
          </Button>
        </div>
      </Card>

      {/* Results */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>নিবন্ধন তালিকা</CardTitle>
          <Badge variant="outline">মোট ১০টি ফলাফল</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">নিবন্ধন নম্বর</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ধরণ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বর</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কনে</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কাজী</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">উপজেলা</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">তারিখ</th>
                <th className="pb-2 font-medium text-text-secondary">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {REGISTRATIONS.map((reg) => (
                <tr key={reg.id} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-2.5 pr-4">
                    <span className="font-mono text-xs text-text-muted">{reg.id}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <Badge variant={TYPE_BADGE[reg.type] || "default"}>
                      {reg.type}
                    </Badge>
                  </td>
                  <td className="py-2.5 pr-4">
                    <p className="font-medium text-text">{reg.groom}</p>
                    <p className="text-text-muted text-xs">{reg.groomNid}</p>
                  </td>
                  <td className="py-2.5 pr-4">
                    <p className="font-medium text-text">{reg.bride}</p>
                    <p className="text-text-muted text-xs">{reg.brideNid}</p>
                  </td>
                  <td className="py-2.5 pr-4 text-text-secondary">{reg.kazi}</td>
                  <td className="py-2.5 pr-4 text-text-secondary">{reg.upazila}</td>
                  <td className="py-2.5 pr-4 text-text-secondary whitespace-nowrap">{reg.date}</td>
                  <td className="py-2.5">
                    <Badge variant={STATUS_BADGE[reg.status] || "default"}>
                      {reg.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination indicator */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-text-muted">
            মোট ৩,৪৫৬টি নিবন্ধনের মধ্যে ১-১০ দেখানো হচ্ছে
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              পূর্ববর্তী
            </Button>
            <Button variant="outline" size="sm">
              পরবর্তী
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
