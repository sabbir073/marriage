import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const REGISTRATIONS = [
  {
    certNo: "MR-DHK-2026-004567",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "মো. রাশেদুল ইসলাম",
    bride: "ফাতেমা আক্তার",
    kazi: "মাওলানা আব্দুর রহমান",
    district: "ঢাকা",
    upazila: "ঢাকা সদর",
    date: "১৫ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
    statusVariant: "success" as const,
  },
  {
    certNo: "MR-CTG-2026-001234",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "আহমেদ ফয়সাল",
    bride: "নুসরাত জাহান",
    kazi: "মাওলানা সাইফুল ইসলাম",
    district: "চট্টগ্রাম",
    upazila: "চট্টগ্রাম সদর",
    date: "১৪ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
    statusVariant: "success" as const,
  },
  {
    certNo: "HR-DHK-2026-000345",
    type: "হিন্দু",
    typeVariant: "warning" as const,
    groom: "অর্জুন দাস",
    bride: "প্রিয়া রানী দাস",
    kazi: "পণ্ডিত রামচন্দ্র শর্মা",
    district: "ঢাকা",
    upazila: "ধানমন্ডি",
    date: "১৩ ফেব্রুয়ারি ২০২৬",
    status: "পর্যালোচনাধীন",
    statusVariant: "warning" as const,
  },
  {
    certNo: "SP-DHK-2026-000078",
    type: "বিশেষ",
    typeVariant: "info" as const,
    groom: "তানভীর আহমেদ",
    bride: "মিতা চৌধুরী",
    kazi: "বিচারপতি মো. নজরুল ইসলাম",
    district: "ঢাকা",
    upazila: "গুলশান",
    date: "১২ ফেব্রুয়ারি ২০২৬",
    status: "নথি প্রয়োজন",
    statusVariant: "warning" as const,
  },
  {
    certNo: "MR-RAJ-2026-002345",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "মো. আরিফুল ইসলাম",
    bride: "রুমানা পারভীন",
    kazi: "মাওলানা সিরাজুল ইসলাম",
    district: "রাজশাহী",
    upazila: "রাজশাহী সদর",
    date: "১১ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
    statusVariant: "success" as const,
  },
  {
    certNo: "CR-BAR-2026-000023",
    type: "খ্রিস্টান",
    typeVariant: "info" as const,
    groom: "ডেভিড গোমেজ",
    bride: "মারিয়া রোজারিও",
    kazi: "ফাদার পল গোমেজ",
    district: "বরিশাল",
    upazila: "বরিশাল সদর",
    date: "১০ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
    statusVariant: "success" as const,
  },
  {
    certNo: "MR-KHU-2026-001890",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "শাহিন আলম",
    bride: "তাসমিয়া ইসলাম",
    kazi: "মাওলানা হাফেজ করিম",
    district: "খুলনা",
    upazila: "খুলনা সদর",
    date: "০৯ ফেব্রুয়ারি ২০২৬",
    status: "অ্যাপয়েন্টমেন্ট নির্ধারিত",
    statusVariant: "info" as const,
  },
  {
    certNo: "MR-SYL-2026-000567",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "মো. কামরুজ্জামান",
    bride: "সাবিহা সুলতানা",
    kazi: "মাওলানা জাকির হোসেন",
    district: "সিলেট",
    upazila: "সিলেট সদর",
    date: "০৮ ফেব্রুয়ারি ২০২৬",
    status: "সম্পন্ন",
    statusVariant: "success" as const,
  },
  {
    certNo: "MR-RNG-2026-000890",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "নাঈমুল হক",
    bride: "শারমিন আক্তার",
    kazi: "মাওলানা মোস্তাফিজুর রহমান",
    district: "রংপুর",
    upazila: "রংপুর সদর",
    date: "০৭ ফেব্রুয়ারি ২০২৬",
    status: "প্রত্যাখ্যাত",
    statusVariant: "error" as const,
  },
  {
    certNo: "MR-MYM-2026-000234",
    type: "মুসলিম",
    typeVariant: "success" as const,
    groom: "মো. ইমরান হোসেন",
    bride: "জান্নাতুল ফেরদৌস",
    kazi: "মাওলানা আব্দুল কাদের",
    district: "ময়মনসিংহ",
    upazila: "ময়মনসিংহ সদর",
    date: "০৬ ফেব্রুয়ারি ২০২৬",
    status: "জমা দেওয়া হয়েছে",
    statusVariant: "info" as const,
  },
];

const DIVISION_OPTIONS = [
  { value: "", label: "সকল বিভাগ" },
  { value: "dhaka", label: "ঢাকা" },
  { value: "chittagong", label: "চট্টগ্রাম" },
  { value: "rajshahi", label: "রাজশাহী" },
  { value: "khulna", label: "খুলনা" },
  { value: "barishal", label: "বরিশাল" },
  { value: "sylhet", label: "সিলেট" },
  { value: "rangpur", label: "রংপুর" },
  { value: "mymensingh", label: "ময়মনসিংহ" },
];

const DISTRICT_OPTIONS = [
  { value: "", label: "সকল জেলা" },
  { value: "dhaka", label: "ঢাকা" },
  { value: "chittagong", label: "চট্টগ্রাম" },
  { value: "rajshahi", label: "রাজশাহী" },
  { value: "khulna", label: "খুলনা" },
  { value: "barishal", label: "বরিশাল" },
  { value: "sylhet", label: "সিলেট" },
  { value: "rangpur", label: "রংপুর" },
  { value: "mymensingh", label: "ময়মনসিংহ" },
];

const TYPE_OPTIONS = [
  { value: "", label: "সকল ধরণ" },
  { value: "muslim", label: "মুসলিম" },
  { value: "hindu", label: "হিন্দু" },
  { value: "special", label: "বিশেষ" },
  { value: "christian", label: "খ্রিস্টান" },
  { value: "buddhist", label: "বৌদ্ধ" },
];

const STATUS_OPTIONS = [
  { value: "", label: "সকল অবস্থা" },
  { value: "completed", label: "সম্পন্ন" },
  { value: "submitted", label: "জমা দেওয়া হয়েছে" },
  { value: "under_review", label: "পর্যালোচনাধীন" },
  { value: "documents_requested", label: "নথি প্রয়োজন" },
  { value: "appointment_set", label: "অ্যাপয়েন্টমেন্ট নির্ধারিত" },
  { value: "rejected", label: "প্রত্যাখ্যাত" },
];

export default function RegistrationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">সকল নিবন্ধন</h1>
          <p className="text-sm text-text-secondary mt-1">
            জাতীয় পর্যায়ে সকল বিবাহ নিবন্ধন অনুসন্ধান — National Registration Search
          </p>
        </div>
        <Button variant="outline">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          এক্সপোর্ট করুন
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট নিবন্ধন"
          value="৪৫,৬৭৮"
          subtitle="২০২৬ সালে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          }
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="সম্পন্ন"
          value="৪০,১২৩"
          subtitle="সফলভাবে নিবন্ধিত"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-50 text-green-600"
        />
        <StatsCard
          title="প্রক্রিয়াধীন"
          value="৪,৬৭৯"
          subtitle="বিভিন্ন পর্যায়ে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-amber-50 text-amber-600"
        />
        <StatsCard
          title="প্রত্যাখ্যাত"
          value="৮৭৬"
          subtitle="২০২৬ সালে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Search & Filters */}
      <Card>
        <CardTitle className="mb-4">জাতীয় অনুসন্ধান</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="নাম / NID / সনদ নম্বর"
            placeholder="অনুসন্ধান করুন..."
          />
          <Select
            label="বিভাগ"
            options={DIVISION_OPTIONS}
            defaultValue=""
          />
          <Select
            label="জেলা"
            options={DISTRICT_OPTIONS}
            defaultValue=""
          />
          <Select
            label="বিবাহের ধরণ"
            options={TYPE_OPTIONS}
            defaultValue=""
          />
          <Input
            label="তারিখ (থেকে)"
            type="date"
          />
          <Input
            label="তারিখ (পর্যন্ত)"
            type="date"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Select
            label="অবস্থা"
            options={STATUS_OPTIONS}
            defaultValue=""
          />
          <div className="flex gap-3 sm:mt-6">
            <Button variant="primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              অনুসন্ধান করুন
            </Button>
            <Button variant="outline">ফিল্টার রিসেট</Button>
          </div>
        </div>
      </Card>

      {/* Registrations Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>নিবন্ধন তালিকা</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">১০টি ফলাফল</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">সনদ নম্বর</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ধরণ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বর</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কনে</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কাজী</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">জেলা</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">উপজেলা</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">তারিখ</th>
                <th className="pb-2 font-medium text-text-secondary">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {REGISTRATIONS.map((reg) => (
                <tr key={reg.certNo} className="hover:bg-surface-tertiary transition-colors cursor-pointer">
                  <td className="py-3 pr-4">
                    <code className="rounded bg-surface-tertiary px-1.5 py-0.5 text-xs font-mono text-primary font-semibold">
                      {reg.certNo}
                    </code>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={reg.typeVariant}>{reg.type}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-text font-medium">{reg.groom}</td>
                  <td className="py-3 pr-4 text-text font-medium">{reg.bride}</td>
                  <td className="py-3 pr-4 text-text-secondary">{reg.kazi}</td>
                  <td className="py-3 pr-4 text-text-secondary">{reg.district}</td>
                  <td className="py-3 pr-4 text-text-secondary">{reg.upazila}</td>
                  <td className="py-3 pr-4 text-text-secondary whitespace-nowrap">{reg.date}</td>
                  <td className="py-3">
                    <Badge variant={reg.statusVariant}>{reg.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-text-muted">মোট ৪৫,৬৭৮ নিবন্ধনের মধ্যে ১-১০ দেখাচ্ছে</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>পূর্ববর্তী</Button>
            <Button variant="primary" size="sm">১</Button>
            <Button variant="outline" size="sm">২</Button>
            <Button variant="outline" size="sm">৩</Button>
            <Button variant="outline" size="sm">...</Button>
            <Button variant="outline" size="sm">৪,৫৬৮</Button>
            <Button variant="outline" size="sm">পরবর্তী</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
