import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const AUDIT_ENTRIES = [
  {
    id: 1,
    timestamp: "২৩ ফেব্রুয়ারি ২০২৬, ১০:৪৫",
    actor: "মোঃ আবুল কালাম আজাদ",
    role: "সিস্টেম প্রশাসক",
    roleVariant: "error" as const,
    action: "কাজী সাসপেন্ড",
    actionVariant: "error" as const,
    entity: "মাওলানা ফজলুল হক (KZ-BOG-2016-0089)",
    district: "বগুড়া",
    details: "অভিযোগ তদন্তাধীন — অনিয়মিত নিবন্ধন",
  },
  {
    id: 2,
    timestamp: "২৩ ফেব্রুয়ারি ২০২৬, ০৯:৩০",
    actor: "মোঃ আবুল কালাম আজাদ",
    role: "সিস্টেম প্রশাসক",
    roleVariant: "error" as const,
    action: "নতুন কাজী যুক্ত",
    actionVariant: "success" as const,
    entity: "মাওলানা আমিনুল ইসলাম (KZ-GAZ-2026-0301)",
    district: "গাজীপুর",
    details: "গাজীপুর সদর উপজেলায় নতুন কাজী নিয়োগ",
  },
  {
    id: 3,
    timestamp: "২২ ফেব্রুয়ারি ২০২৬, ১৬:২০",
    actor: "জামিলুর রহমান",
    role: "জেলা নিবন্ধক",
    roleVariant: "info" as const,
    action: "নিবন্ধন অনুমোদন",
    actionVariant: "success" as const,
    entity: "MR-DHK-2026-004567",
    district: "ঢাকা",
    details: "মো. রাশেদুল ইসলাম ও ফাতেমা আক্তার — বিবাহ নিবন্ধন সম্পন্ন",
  },
  {
    id: 4,
    timestamp: "২২ ফেব্রুয়ারি ২০২৬, ১৪:১৫",
    actor: "আমিনুর রহমান",
    role: "জেলা নিবন্ধক",
    roleVariant: "info" as const,
    action: "নিবন্ধন প্রত্যাখ্যান",
    actionVariant: "error" as const,
    entity: "MR-RNG-2026-000890",
    district: "রংপুর",
    details: "অসম্পূর্ণ নথি — বয়স প্রমাণপত্র অনুপস্থিত",
  },
  {
    id: 5,
    timestamp: "২২ ফেব্রুয়ারি ২০২৬, ১১:০০",
    actor: "সিস্টেম",
    role: "স্বয়ংক্রিয়",
    roleVariant: "default" as const,
    action: "ব্যাকআপ সম্পন্ন",
    actionVariant: "info" as const,
    entity: "দৈনিক ডাটাবেস ব্যাকআপ",
    district: "জাতীয়",
    details: "সফলভাবে ব্যাকআপ সম্পন্ন — আকার: ২.৪ GB",
  },
  {
    id: 6,
    timestamp: "২১ ফেব্রুয়ারি ২০২৬, ১৭:৪৫",
    actor: "মোঃ আবুল কালাম আজাদ",
    role: "সিস্টেম প্রশাসক",
    roleVariant: "error" as const,
    action: "সেটিংস পরিবর্তন",
    actionVariant: "warning" as const,
    entity: "SMS নোটিফিকেশন সেটিংস",
    district: "জাতীয়",
    details: "SMS গেটওয়ে কনফিগারেশন আপডেট করা হয়েছে",
  },
  {
    id: 7,
    timestamp: "২১ ফেব্রুয়ারি ২০২৬, ১৫:৩০",
    actor: "রফিকুল ইসলাম",
    role: "জেলা নিবন্ধক",
    roleVariant: "info" as const,
    action: "রিপোর্ট জমা",
    actionVariant: "info" as const,
    entity: "চট্টগ্রাম জেলা — মাসিক রিপোর্ট",
    district: "চট্টগ্রাম",
    details: "ফেব্রুয়ারি ২০২৬ মাসিক রিপোর্ট জমা দেওয়া হয়েছে",
  },
  {
    id: 8,
    timestamp: "২১ ফেব্রুয়ারি ২০২৬, ১২:০০",
    actor: "সিস্টেম",
    role: "স্বয়ংক্রিয়",
    roleVariant: "default" as const,
    action: "সিস্টেম আপডেট",
    actionVariant: "info" as const,
    entity: "v2.1.3 আপডেট",
    district: "জাতীয়",
    details: "নতুন ফিচার: তালাক ট্র্যাকিং উন্নত, বাগ ফিক্স",
  },
  {
    id: 9,
    timestamp: "২০ ফেব্রুয়ারি ২০২৬, ১৬:৪৫",
    actor: "ফারুক আহমেদ",
    role: "জেলা নিবন্ধক",
    roleVariant: "info" as const,
    action: "তালাক নিবন্ধন",
    actionVariant: "warning" as const,
    entity: "DR-KHU-2026-000156",
    district: "খুলনা",
    details: "তালাক নিবন্ধন — ইদ্দতকাল শুরু",
  },
  {
    id: 10,
    timestamp: "২০ ফেব্রুয়ারি ২০২৬, ১১:৩০",
    actor: "মোঃ আবুল কালাম আজাদ",
    role: "সিস্টেম প্রশাসক",
    roleVariant: "error" as const,
    action: "ব্যবহারকারী যুক্ত",
    actionVariant: "success" as const,
    entity: "নতুন জেলা নিবন্ধক — ময়মনসিংহ",
    district: "ময়মনসিংহ",
    details: "মো. আব্দুল মান্নানকে ময়মনসিংহ জেলা নিবন্ধক হিসেবে যুক্ত করা হয়েছে",
  },
  {
    id: 11,
    timestamp: "১৯ ফেব্রুয়ারি ২০২৬, ১৪:২০",
    actor: "হাসিনা বেগম",
    role: "জেলা নিবন্ধক",
    roleVariant: "info" as const,
    action: "আপত্তি দাখিল",
    actionVariant: "warning" as const,
    entity: "SP-CTG-2026-000078",
    district: "চট্টগ্রাম",
    details: "বিশেষ বিবাহ নিবন্ধনে আপত্তি — তদন্ত চলমান",
  },
  {
    id: 12,
    timestamp: "১৯ ফেব্রুয়ারি ২০২৬, ০৯:০০",
    actor: "সিস্টেম",
    role: "স্বয়ংক্রিয়",
    roleVariant: "default" as const,
    action: "লাইসেন্স মেয়াদ সতর্কতা",
    actionVariant: "warning" as const,
    entity: "৪৫ জন কাজী",
    district: "জাতীয়",
    details: "৪৫ জন কাজীর লাইসেন্স আগামী ৩০ দিনে মেয়াদোত্তীর্ণ হবে",
  },
  {
    id: 13,
    timestamp: "১৮ ফেব্রুয়ারি ২০২৬, ১৭:০০",
    actor: "তানভীর হাসান",
    role: "জেলা নিবন্ধক",
    roleVariant: "info" as const,
    action: "কাজী পুনর্বহাল",
    actionVariant: "success" as const,
    entity: "মাওলানা সালাহউদ্দিন (KZ-SYL-2020-0178)",
    district: "সিলেট",
    details: "তদন্ত শেষে নির্দোষ প্রমাণিত — কাজী পুনর্বহাল",
  },
  {
    id: 14,
    timestamp: "১৮ ফেব্রুয়ারি ২০২৬, ১০:৩০",
    actor: "মোঃ আবুল কালাম আজাদ",
    role: "সিস্টেম প্রশাসক",
    roleVariant: "error" as const,
    action: "ফি আপডেট",
    actionVariant: "warning" as const,
    entity: "জাতীয় ফি তালিকা",
    district: "জাতীয়",
    details: "বিশেষ বিবাহ নিবন্ধন ফি ৫০০ থেকে ৬০০ টাকায় বৃদ্ধি",
  },
];

const ACTION_TYPE_OPTIONS = [
  { value: "", label: "সকল কার্যক্রম" },
  { value: "kazi_suspend", label: "কাজী সাসপেন্ড" },
  { value: "kazi_add", label: "নতুন কাজী যুক্ত" },
  { value: "registration_approve", label: "নিবন্ধন অনুমোদন" },
  { value: "registration_reject", label: "নিবন্ধন প্রত্যাখ্যান" },
  { value: "settings_change", label: "সেটিংস পরিবর্তন" },
  { value: "system_update", label: "সিস্টেম আপডেট" },
  { value: "report_submit", label: "রিপোর্ট জমা" },
  { value: "divorce_register", label: "তালাক নিবন্ধন" },
];

const ROLE_OPTIONS = [
  { value: "", label: "সকল ভূমিকা" },
  { value: "admin", label: "সিস্টেম প্রশাসক" },
  { value: "district_registrar", label: "জেলা নিবন্ধক" },
  { value: "system", label: "স্বয়ংক্রিয়" },
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

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">অডিট লগ</h1>
        <p className="text-sm text-text-secondary mt-1">
          জাতীয় পর্যায়ে সকল সিস্টেম কার্যক্রমের লগ — National Audit Trail
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardTitle className="mb-4">ফিল্টার</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="তারিখ (থেকে)"
            type="date"
          />
          <Input
            label="তারিখ (পর্যন্ত)"
            type="date"
          />
          <Select
            label="বিভাগ"
            options={DIVISION_OPTIONS}
            defaultValue=""
          />
          <Select
            label="কার্যক্রমের ধরণ"
            options={ACTION_TYPE_OPTIONS}
            defaultValue=""
          />
          <Select
            label="ভূমিকা"
            options={ROLE_OPTIONS}
            defaultValue=""
          />
          <Input
            label="ব্যবহারকারীর নাম"
            placeholder="নাম দিয়ে অনুসন্ধান..."
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            ফিল্টার প্রয়োগ করুন
          </Button>
          <Button variant="outline">রিসেট</Button>
          <Button variant="outline">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            এক্সপোর্ট
          </Button>
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>কার্যক্রম লগ</CardTitle>
          <Badge variant="outline">মোট ১৪টি এন্ট্রি দেখাচ্ছে</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">সময়</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ব্যবহারকারী</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ভূমিকা</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কার্যক্রম</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বিষয়</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">জেলা</th>
                <th className="pb-2 font-medium text-text-secondary">বিবরণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {AUDIT_ENTRIES.map((entry) => (
                <tr key={entry.id} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-3 pr-4 whitespace-nowrap text-xs text-text-muted">
                    {entry.timestamp}
                  </td>
                  <td className="py-3 pr-4">
                    <p className="font-medium text-text text-xs">{entry.actor}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={entry.roleVariant}>{entry.role}</Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={entry.actionVariant}>{entry.action}</Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-xs text-text-secondary max-w-[200px] truncate" title={entry.entity}>
                      {entry.entity}
                    </p>
                  </td>
                  <td className="py-3 pr-4 text-xs text-text-secondary whitespace-nowrap">
                    {entry.district}
                  </td>
                  <td className="py-3">
                    <p className="text-xs text-text-muted max-w-[250px] truncate" title={entry.details}>
                      {entry.details}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-text-muted">মোট ১,২৩৪টি এন্ট্রির মধ্যে ১-১৪ দেখাচ্ছে</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>পূর্ববর্তী</Button>
            <Button variant="primary" size="sm">১</Button>
            <Button variant="outline" size="sm">২</Button>
            <Button variant="outline" size="sm">৩</Button>
            <Button variant="outline" size="sm">...</Button>
            <Button variant="outline" size="sm">৮৯</Button>
            <Button variant="outline" size="sm">পরবর্তী</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
