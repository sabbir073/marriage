import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";

/* ---------- Options ---------- */

const ACTION_TYPE_OPTIONS = [
  { value: "", label: "সকল কার্যক্রম" },
  { value: "registration-complete", label: "নিবন্ধন সম্পন্ন" },
  { value: "certificate-issued", label: "সনদ জারি" },
  { value: "data-correction", label: "তথ্য সংশোধন" },
  { value: "document-upload", label: "নথি আপলোড" },
  { value: "status-change", label: "অবস্থা পরিবর্তন" },
  { value: "divorce-filed", label: "তালাক দায়ের" },
  { value: "divorce-complete", label: "তালাক সম্পন্ন" },
  { value: "kazi-login", label: "কাজী লগইন" },
  { value: "report-export", label: "প্রতিবেদন রপ্তানি" },
];

const ACTOR_OPTIONS = [
  { value: "", label: "সকল কাজী / ব্যবহারকারী" },
  { value: "abdur-rahman", label: "মাওলানা আব্দুর রহমান" },
  { value: "hafez-ibrahim", label: "মাওলানা হাফেজ ইব্রাহিম" },
  { value: "rajesh-sharma", label: "পণ্ডিত রাজেশ শর্মা" },
  { value: "salma-nasreen", label: "অ্যাডভোকেট সালমা নাসরীন" },
  { value: "peter-dcosta", label: "ফাদার পিটার ডি'কস্তা" },
  { value: "system", label: "সিস্টেম (স্বয়ংক্রিয়)" },
];

/* ---------- Badge mapping ---------- */

const ACTION_BADGE: Record<string, "success" | "warning" | "info" | "error" | "default" | "outline"> = {
  "নিবন্ধন সম্পন্ন": "success",
  "সনদ জারি": "success",
  "তথ্য সংশোধন": "warning",
  "নথি আপলোড": "info",
  "অবস্থা পরিবর্তন": "info",
  "তালাক দায়ের": "error",
  "তালাক সম্পন্ন": "error",
  "কাজী লগইন": "outline",
  "প্রতিবেদন রপ্তানি": "default",
  "নিবন্ধন আবেদন": "info",
  "সনদ পুনর্মুদ্রণ": "default",
};

/* ---------- Mock audit log entries ---------- */

const AUDIT_ENTRIES = [
  {
    id: "AUD-00451",
    timestamp: "২৩ ফেব্রুয়ারি ২০২৬, ১৪:৩২:১৫",
    actor: "মাওলানা আব্দুর রহমান",
    actorRole: "কাজী",
    action: "নিবন্ধন সম্পন্ন",
    entity: "MR-DHK-2026-003456",
    details: "মোঃ রাশেদ হোসেন ও ফাতেমা খাতুনের মুসলিম বিবাহ নিবন্ধন সম্পন্ন করা হয়েছে।",
  },
  {
    id: "AUD-00450",
    timestamp: "২৩ ফেব্রুয়ারি ২০২৬, ১৪:৩৫:০২",
    actor: "মাওলানা আব্দুর রহমান",
    actorRole: "কাজী",
    action: "সনদ জারি",
    entity: "MR-DHK-2026-003456",
    details: "বিবাহ সনদ (Marriage Certificate) জারি করা হয়েছে। সনদ নম্বর: CERT-DHK-2026-003456।",
  },
  {
    id: "AUD-00449",
    timestamp: "২২ ফেব্রুয়ারি ২০২৬, ১১:২০:৪৫",
    actor: "পণ্ডিত রাজেশ শর্মা",
    actorRole: "কাজী",
    action: "নিবন্ধন সম্পন্ন",
    entity: "MR-DHK-2026-003455",
    details: "সুব্রত দাস ও প্রিয়া রানী দাসের হিন্দু বিবাহ নিবন্ধন সম্পন্ন করা হয়েছে।",
  },
  {
    id: "AUD-00448",
    timestamp: "২২ ফেব্রুয়ারি ২০২৬, ১০:৪৫:৩০",
    actor: "মাওলানা হাফেজ ইব্রাহিম",
    actorRole: "কাজী",
    action: "তথ্য সংশোধন",
    entity: "MR-DHK-2026-003454",
    details: "কনের পিতার নাম সংশোধন করা হয়েছে: 'মোঃ আবুল কালাম' থেকে 'মোঃ আবুল কালাম আজাদ'।",
  },
  {
    id: "AUD-00447",
    timestamp: "২২ ফেব্রুয়ারি ২০২৬, ০৯:১৫:১২",
    actor: "মাওলানা হাফেজ ইব্রাহিম",
    actorRole: "কাজী",
    action: "নথি আপলোড",
    entity: "MR-DHK-2026-003454",
    details: "জাতীয় পরিচয়পত্রের স্ক্যান কপি আপলোড করা হয়েছে (বর ও কনে)।",
  },
  {
    id: "AUD-00446",
    timestamp: "২১ ফেব্রুয়ারি ২০২৬, ১৬:৫০:২৮",
    actor: "অ্যাডভোকেট সালমা নাসরীন",
    actorRole: "কাজী",
    action: "নিবন্ধন সম্পন্ন",
    entity: "MR-DHK-2026-003453",
    details: "ডেভিড চৌধুরী ও সারা ইসলামের বিশেষ বিবাহ আইনে নিবন্ধন সম্পন্ন।",
  },
  {
    id: "AUD-00445",
    timestamp: "২১ ফেব্রুয়ারি ২০২৬, ১৫:৩০:০০",
    actor: "মাওলানা আব্দুর রহমান",
    actorRole: "কাজী",
    action: "তালাক দায়ের",
    entity: "DR-DHK-2026-000089",
    details: "মোঃ জাহিদ হাসান কর্তৃক তালাক দায়ের করা হয়েছে। নোটিশ প্রেরিত।",
  },
  {
    id: "AUD-00444",
    timestamp: "২১ ফেব্রুয়ারি ২০২৬, ১২:১০:৪৫",
    actor: "সিস্টেম (স্বয়ংক্রিয়)",
    actorRole: "সিস্টেম",
    action: "অবস্থা পরিবর্তন",
    entity: "MR-DHK-2026-003451",
    details: "আবেদনের অবস্থা স্বয়ংক্রিয়ভাবে 'জমা দেওয়া হয়েছে' থেকে 'পর্যালোচনাধীন' এ পরিবর্তিত হয়েছে।",
  },
  {
    id: "AUD-00443",
    timestamp: "২০ ফেব্রুয়ারি ২০২৬, ১৭:২২:৩৩",
    actor: "ফাদার পিটার ডি'কস্তা",
    actorRole: "কাজী",
    action: "নিবন্ধন সম্পন্ন",
    entity: "MR-DHK-2026-003452",
    details: "জেমস গমেজ ও মারিয়া রোজারিওর খ্রিস্টান বিবাহ নিবন্ধন সম্পন্ন।",
  },
  {
    id: "AUD-00442",
    timestamp: "২০ ফেব্রুয়ারি ২০২৬, ১৪:০০:১১",
    actor: "পণ্ডিত রাজেশ শর্মা",
    actorRole: "কাজী",
    action: "সনদ জারি",
    entity: "MR-DHK-2026-003455",
    details: "হিন্দু বিবাহ সনদ জারি করা হয়েছে। সনদ নম্বর: CERT-DHK-2026-003455।",
  },
  {
    id: "AUD-00441",
    timestamp: "২০ ফেব্রুয়ারি ২০২৬, ০৮:৩০:০০",
    actor: "মাওলানা আব্দুর রহমান",
    actorRole: "কাজী",
    action: "কাজী লগইন",
    entity: "—",
    details: "কাজী পোর্টালে সফলভাবে লগইন করেছেন। IP: ১০৩.XXX.XX.XX।",
  },
  {
    id: "AUD-00440",
    timestamp: "১৯ ফেব্রুয়ারি ২০২৬, ১৬:৪৫:২০",
    actor: "সিস্টেম (স্বয়ংক্রিয়)",
    actorRole: "সিস্টেম",
    action: "প্রতিবেদন রপ্তানি",
    entity: "RPT-MONTHLY-JAN-2026",
    details: "জানুয়ারি ২০২৬ এর মাসিক সারসংক্ষেপ প্রতিবেদন স্বয়ংক্রিয়ভাবে তৈরি হয়েছে।",
  },
  {
    id: "AUD-00439",
    timestamp: "১৯ ফেব্রুয়ারি ২০২৬, ১১:২২:০৮",
    actor: "অ্যাডভোকেট সালমা নাসরীন",
    actorRole: "কাজী",
    action: "নিবন্ধন আবেদন",
    entity: "MR-DHK-2026-003449",
    details: "আরিফ হোসেন ও জেনিফার আক্তারের বিশেষ বিবাহ নিবন্ধনের আবেদন গ্রহণ করা হয়েছে।",
  },
  {
    id: "AUD-00438",
    timestamp: "১৮ ফেব্রুয়ারি ২০২৬, ১৩:১৫:৪৫",
    actor: "পণ্ডিত রাজেশ শর্মা",
    actorRole: "কাজী",
    action: "সনদ পুনর্মুদ্রণ",
    entity: "MR-DHK-2026-003420",
    details: "পূর্বে জারিকৃত সনদের পুনর্মুদ্রণ অনুরোধ। কারণ: মূল কপি ক্ষতিগ্রস্ত।",
  },
  {
    id: "AUD-00437",
    timestamp: "১৭ ফেব্রুয়ারি ২০২৬, ০৯:০০:০০",
    actor: "সিস্টেম (স্বয়ংক্রিয়)",
    actorRole: "সিস্টেম",
    action: "অবস্থা পরিবর্তন",
    entity: "MR-DHK-2026-003449",
    details: "আবেদন MR-DHK-2026-003449 এর অবস্থা 'পর্যালোচনাধীন' থেকে 'প্রত্যাখ্যাত' এ পরিবর্তিত। কারণ: অসম্পূর্ণ নথি।",
  },
];

/* ---------- Page ---------- */

export default function DistrictAuditLogPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">অডিট লগ (Audit Log)</h1>
        <p className="text-sm text-text-secondary mt-1">
          ঢাকা জেলার সকল নিবন্ধন কার্যক্রমের বিস্তারিত কার্যক্রম ইতিহাস (শুধুমাত্র পড়ার অনুমতি)
        </p>
      </div>

      {/* Read-only notice */}
      <div className="rounded-[var(--radius-md)] bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-blue-700">
          <strong>অডিট মোড:</strong> আপনি শুধুমাত্র কার্যক্রম ইতিহাস দেখতে পারবেন। লগ সম্পাদনা বা মুছে ফেলার অনুমতি নেই।
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="আজকের কার্যক্রম"
          value="২৩"
          subtitle="২৩ ফেব্রুয়ারি ২০২৬"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="এই সপ্তাহে"
          value="১৪৭"
          subtitle="১৭-২৩ ফেব্রুয়ারি"
          trend={{ value: "১২% বেশি", positive: true }}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="তথ্য সংশোধন"
          value="৯"
          subtitle="এই মাসে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>}
          color="bg-amber-50 text-amber-600"
        />
        <StatsCard
          title="সক্রিয় কাজী (আজ)"
          value="১৮"
          subtitle="লগইন করেছেন"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardTitle className="mb-4">ফিল্টার (Filter)</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Input
            label="শুরুর তারিখ (From)"
            type="date"
            defaultValue="2026-02-17"
          />
          <Input
            label="শেষ তারিখ (To)"
            type="date"
            defaultValue="2026-02-23"
          />
          <Select
            label="কার্যক্রমের ধরণ (Action Type)"
            options={ACTION_TYPE_OPTIONS}
            defaultValue=""
          />
          <Select
            label="কর্মকর্তা / কাজী (Actor)"
            options={ACTOR_OPTIONS}
            defaultValue=""
          />
          <Input
            label="সত্তা নম্বর (Entity ID)"
            placeholder="MR-DHK-2026-..."
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="primary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            ফিল্টার প্রয়োগ করুন
          </Button>
          <Button variant="outline" size="sm">
            ফিল্টার মুছুন
          </Button>
          <Button variant="outline" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            লগ রপ্তানি (Export)
          </Button>
        </div>
      </Card>

      {/* Audit log table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>কার্যক্রম ইতিহাস</CardTitle>
          <Badge variant="outline">১৫টি এন্ট্রি দেখানো হচ্ছে</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">সময় (Timestamp)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কর্মকর্তা (Actor)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">কার্যক্রম (Action)</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">সত্তা (Entity)</th>
                <th className="pb-2 font-medium text-text-secondary">বিবরণ (Details)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {AUDIT_ENTRIES.map((entry) => (
                <tr key={entry.id} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-3 pr-4 whitespace-nowrap align-top">
                    <p className="text-xs text-text-secondary">{entry.timestamp}</p>
                    <p className="text-xs text-text-muted font-mono mt-0.5">{entry.id}</p>
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <p className="font-medium text-text text-xs">{entry.actor}</p>
                    <p className="text-xs text-text-muted">{entry.actorRole}</p>
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <Badge variant={ACTION_BADGE[entry.action] || "default"}>
                      {entry.action}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <span className="font-mono text-xs text-text-muted">{entry.entity}</span>
                  </td>
                  <td className="py-3 align-top">
                    <p className="text-xs text-text-secondary leading-relaxed max-w-md">
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
          <p className="text-sm text-text-muted">
            মোট ৪৫১টি এন্ট্রির মধ্যে ১-১৫ দেখানো হচ্ছে (পৃষ্ঠা ১/৩১)
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              পূর্ববর্তী
            </Button>
            <div className="flex gap-1">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-white text-sm font-medium">
                ১
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-border text-sm text-text-secondary hover:bg-surface-tertiary cursor-pointer">
                ২
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-border text-sm text-text-secondary hover:bg-surface-tertiary cursor-pointer">
                ৩
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center text-sm text-text-muted">
                ...
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-border text-sm text-text-secondary hover:bg-surface-tertiary cursor-pointer">
                ৩১
              </span>
            </div>
            <Button variant="outline" size="sm">
              পরবর্তী
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
