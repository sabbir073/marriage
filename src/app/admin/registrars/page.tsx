import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const REGISTRARS = [
  {
    name: "মাওলানা আব্দুর রহমান",
    nameEn: "Mawlana Abdur Rahman",
    license: "KZ-DHK-2018-0456",
    type: "মুসলিম",
    typeVariant: "success" as const,
    jurisdiction: "ঢাকা সদর, ঢাকা",
    registrations: "১,২৩৪",
    appointedDate: "১৫ জানুয়ারি ২০১৮",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "পণ্ডিত রামকৃষ্ণ শর্মা",
    nameEn: "Pandit Ramkrishna Sharma",
    license: "HR-CTG-2019-0123",
    type: "হিন্দু",
    typeVariant: "warning" as const,
    jurisdiction: "চট্টগ্রাম সদর, চট্টগ্রাম",
    registrations: "৪৫৬",
    appointedDate: "২০ মার্চ ২০১৯",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "মাওলানা ফজলুল হক",
    nameEn: "Mawlana Fazlul Haque",
    license: "KZ-BOG-2016-0089",
    type: "মুসলিম",
    typeVariant: "success" as const,
    jurisdiction: "বগুড়া সদর, বগুড়া",
    registrations: "৮৯০",
    appointedDate: "০৫ জুন ২০১৬",
    status: "সাসপেন্ড",
    statusVariant: "error" as const,
  },
  {
    name: "বিচারপতি মো. নজরুল ইসলাম",
    nameEn: "Justice Md. Nazrul Islam",
    license: "SP-DHK-2020-0034",
    type: "বিশেষ",
    typeVariant: "info" as const,
    jurisdiction: "গুলশান, ঢাকা",
    registrations: "২৩৪",
    appointedDate: "১০ অক্টোবর ২০২০",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "ফাদার পল গোমেজ",
    nameEn: "Father Paul Gomez",
    license: "CR-BAR-2017-0067",
    type: "খ্রিস্টান",
    typeVariant: "info" as const,
    jurisdiction: "বরিশাল সদর, বরিশাল",
    registrations: "১৮৯",
    appointedDate: "২৫ আগস্ট ২০১৭",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "মাওলানা আমিনুল ইসলাম",
    nameEn: "Mawlana Aminul Islam",
    license: "KZ-GAZ-2021-0198",
    type: "মুসলিম",
    typeVariant: "success" as const,
    jurisdiction: "গাজীপুর সদর, গাজীপুর",
    registrations: "৫৬৭",
    appointedDate: "১২ ফেব্রুয়ারি ২০২১",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "মাওলানা সিরাজুল ইসলাম",
    nameEn: "Mawlana Sirajul Islam",
    license: "KZ-RAJ-2015-0045",
    type: "মুসলিম",
    typeVariant: "success" as const,
    jurisdiction: "রাজশাহী সদর, রাজশাহী",
    registrations: "১,৫৬৭",
    appointedDate: "০১ মার্চ ২০১৫",
    status: "অবসরপ্রাপ্ত",
    statusVariant: "default" as const,
  },
  {
    name: "পণ্ডিত সুব্রত চক্রবর্তী",
    nameEn: "Pandit Subrata Chakraborty",
    license: "HR-SYL-2022-0210",
    type: "হিন্দু",
    typeVariant: "warning" as const,
    jurisdiction: "সিলেট সদর, সিলেট",
    registrations: "২১০",
    appointedDate: "০৮ জুলাই ২০২২",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "মাওলানা হাফেজ করিম",
    nameEn: "Mawlana Hafez Karim",
    license: "KZ-KHU-2019-0156",
    type: "মুসলিম",
    typeVariant: "success" as const,
    jurisdiction: "খুলনা সদর, খুলনা",
    registrations: "৭৮৯",
    appointedDate: "১৫ নভেম্বর ২০১৯",
    status: "সক্রিয়",
    statusVariant: "success" as const,
  },
  {
    name: "বিচারপতি সালমা বেগম",
    nameEn: "Justice Salma Begum",
    license: "SP-CTG-2023-0278",
    type: "বিশেষ",
    typeVariant: "info" as const,
    jurisdiction: "নাসিরাবাদ, চট্টগ্রাম",
    registrations: "৯৮",
    appointedDate: "২০ জানুয়ারি ২০২৩",
    status: "সক্রিয়",
    statusVariant: "success" as const,
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

const TYPE_OPTIONS = [
  { value: "", label: "সকল ধরণ" },
  { value: "muslim", label: "মুসলিম" },
  { value: "hindu", label: "হিন্দু" },
  { value: "special", label: "বিশেষ" },
  { value: "christian", label: "খ্রিস্টান" },
];

const STATUS_OPTIONS = [
  { value: "", label: "সকল অবস্থা" },
  { value: "active", label: "সক্রিয়" },
  { value: "suspended", label: "সাসপেন্ড" },
  { value: "retired", label: "অবসরপ্রাপ্ত" },
];

export default function RegistrarsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">নিবন্ধক ব্যবস্থাপনা</h1>
          <p className="text-sm text-text-secondary mt-1">
            জাতীয় পর্যায়ে সকল কাজী ও নিবন্ধকের তালিকা — National Registrar Management
          </p>
        </div>
        <Button variant="primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          নতুন কাজী যুক্ত করুন
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট নিবন্ধক"
          value="১২,৪৫৬"
          subtitle="সমগ্র বাংলাদেশে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="সক্রিয়"
          value="১১,২৩০"
          subtitle="বর্তমানে কর্মরত"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-50 text-green-600"
        />
        <StatsCard
          title="সাসপেন্ড"
          value="৫৬"
          subtitle="তদন্তাধীন"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          }
          color="bg-red-50 text-red-600"
        />
        <StatsCard
          title="অবসরপ্রাপ্ত"
          value="১,১৭০"
          subtitle="সেবা শেষ"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-slate-50 text-slate-600"
        />
      </div>

      {/* Search & Filters */}
      <Card>
        <CardTitle className="mb-4">অনুসন্ধান ও ফিল্টার</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="নাম / লাইসেন্স নং / NID"
            placeholder="অনুসন্ধান করুন..."
          />
          <Select
            label="বিভাগ"
            options={DIVISION_OPTIONS}
            defaultValue=""
          />
          <Select
            label="ধরণ"
            options={TYPE_OPTIONS}
            defaultValue=""
          />
          <Select
            label="অবস্থা"
            options={STATUS_OPTIONS}
            defaultValue=""
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            অনুসন্ধান করুন
          </Button>
          <Button variant="outline">ফিল্টার রিসেট</Button>
        </div>
      </Card>

      {/* Registrars Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>নিবন্ধক তালিকা</CardTitle>
          <Badge variant="outline">মোট ১০ জন দেখাচ্ছে</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">নাম</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">লাইসেন্স নং</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ধরণ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">এলাকা</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary text-right">নিবন্ধন</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">নিয়োগ তারিখ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">অবস্থা</th>
                <th className="pb-2 font-medium text-text-secondary text-center">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {REGISTRARS.map((reg) => (
                <tr key={reg.license} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-text">{reg.name}</p>
                    <p className="text-xs text-text-muted">{reg.nameEn}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <code className="rounded bg-surface-tertiary px-1.5 py-0.5 text-xs font-mono text-text-secondary">
                      {reg.license}
                    </code>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={reg.typeVariant}>{reg.type}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{reg.jurisdiction}</td>
                  <td className="py-3 pr-4 text-right font-semibold text-text">{reg.registrations}</td>
                  <td className="py-3 pr-4 text-text-secondary">{reg.appointedDate}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={reg.statusVariant}>{reg.status}</Badge>
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Button>
                      {reg.status === "সক্রিয়" && (
                        <Button variant="ghost" size="sm" className="text-error hover:text-error">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-text-muted">মোট ১২,৪৫৬ জন নিবন্ধকের মধ্যে ১-১০ দেখাচ্ছে</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>পূর্ববর্তী</Button>
            <Button variant="primary" size="sm">১</Button>
            <Button variant="outline" size="sm">২</Button>
            <Button variant="outline" size="sm">৩</Button>
            <Button variant="outline" size="sm">পরবর্তী</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
