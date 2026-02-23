import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/dashboard/stats-card";

/* ---------- Mock data ---------- */

const KAZI_TYPE_BADGE: Record<string, "success" | "warning" | "info" | "default"> = {
  "মুসলিম": "success",
  "হিন্দু": "warning",
  "বিশেষ": "info",
  "খ্রিস্টান": "default",
};

const STATUS_BADGE: Record<string, "success" | "error"> = {
  "সক্রিয়": "success",
  "স্থগিত": "error",
};

const KAZIS = [
  {
    name: "মাওলানা আব্দুর রহমান",
    licenseNo: "KZ-DHK-2019-001",
    type: "মুসলিম",
    upazila: "ধানমন্ডি",
    area: "ধানমন্ডি, নিউমার্কেট, এলিফ্যান্ট রোড",
    phone: "০১৭১১-XXXXXX",
    registrationsThisYear: "৪৫",
    status: "সক্রিয়",
    since: "২০১৯",
  },
  {
    name: "মাওলানা হাফেজ ইব্রাহিম",
    licenseNo: "KZ-DHK-2018-015",
    type: "মুসলিম",
    upazila: "মিরপুর",
    area: "মিরপুর-১০, মিরপুর-১১, মিরপুর-১২",
    phone: "০১৮১২-XXXXXX",
    registrationsThisYear: "৩৮",
    status: "সক্রিয়",
    since: "২০১৮",
  },
  {
    name: "পণ্ডিত রাজেশ শর্মা",
    licenseNo: "KZ-DHK-2020-042",
    type: "হিন্দু",
    upazila: "গুলশান",
    area: "গুলশান, বারিধারা, বনানী",
    phone: "০১৯১৩-XXXXXX",
    registrationsThisYear: "১২",
    status: "সক্রিয়",
    since: "২০২০",
  },
  {
    name: "অ্যাডভোকেট সালমা নাসরীন",
    licenseNo: "KZ-DHK-2021-078",
    type: "বিশেষ",
    upazila: "মতিঝিল",
    area: "মতিঝিল, পল্টন, কমলাপুর",
    phone: "০১৫১৪-XXXXXX",
    registrationsThisYear: "৮",
    status: "সক্রিয়",
    since: "২০২১",
  },
  {
    name: "ফাদার পিটার ডি'কস্তা",
    licenseNo: "KZ-DHK-2019-033",
    type: "খ্রিস্টান",
    upazila: "তেজগাঁও",
    area: "তেজগাঁও, ফার্মগেট, কারওয়ান বাজার",
    phone: "০১৬১৫-XXXXXX",
    registrationsThisYear: "৫",
    status: "সক্রিয়",
    since: "২০১৯",
  },
  {
    name: "মাওলানা আবু সাঈদ",
    licenseNo: "KZ-DHK-2017-009",
    type: "মুসলিম",
    upazila: "মোহাম্মদপুর",
    area: "মোহাম্মদপুর, আদাবর, শ্যামলী",
    phone: "০১৩১৬-XXXXXX",
    registrationsThisYear: "০",
    status: "স্থগিত",
    since: "২০১৭",
  },
  {
    name: "পণ্ডিত সুনীল চক্রবর্তী",
    licenseNo: "KZ-DHK-2022-055",
    type: "হিন্দু",
    upazila: "উত্তরা",
    area: "উত্তরা, আশকোনা, দক্ষিণখান",
    phone: "০১৪১৭-XXXXXX",
    registrationsThisYear: "৭",
    status: "সক্রিয়",
    since: "২০২২",
  },
  {
    name: "অ্যাডভোকেট নাজমুল হক",
    licenseNo: "KZ-DHK-2023-091",
    type: "বিশেষ",
    upazila: "বনানী",
    area: "বনানী, মহাখালী, গুলশান",
    phone: "০১৫১৮-XXXXXX",
    registrationsThisYear: "৪",
    status: "সক্রিয়",
    since: "২০২৩",
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

const KAZI_TYPE_OPTIONS = [
  { value: "", label: "সকল ধরণ" },
  { value: "muslim", label: "মুসলিম" },
  { value: "hindu", label: "হিন্দু" },
  { value: "special", label: "বিশেষ" },
  { value: "christian", label: "খ্রিস্টান" },
];

const KAZI_STATUS_OPTIONS = [
  { value: "", label: "সকল অবস্থা" },
  { value: "active", label: "সক্রিয়" },
  { value: "suspended", label: "স্থগিত" },
];

/* ---------- Page ---------- */

export default function DistrictKazisPage() {
  const activeCount = KAZIS.filter((k) => k.status === "সক্রিয়").length;
  const suspendedCount = KAZIS.filter((k) => k.status === "স্থগিত").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">কাজী তালিকা (Kazi Directory)</h1>
        <p className="text-sm text-text-secondary mt-1">
          ঢাকা জেলার সকল লাইসেন্সপ্রাপ্ত কাজীদের তথ্য (শুধুমাত্র পড়ার অনুমতি)
        </p>
      </div>

      {/* Read-only notice */}
      <div className="rounded-[var(--radius-md)] bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-blue-700">
          <strong>অডিট মোড:</strong> আপনি শুধুমাত্র কাজীদের তথ্য দেখতে পারবেন। কোনো তথ্য সম্পাদনা বা অবস্থা পরিবর্তনের অনুমতি নেই।
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট সক্রিয় কাজী"
          value="১২৪"
          subtitle="ঢাকা জেলায়"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>}
          color="bg-green-50 text-green-600"
        />
        <StatsCard
          title="স্থগিত কাজী"
          value="৩"
          subtitle="লাইসেন্স স্থগিত"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
          color="bg-red-50 text-red-600"
        />
        <StatsCard
          title="মোট নিবন্ধন (এই বছর)"
          value="৩,৪৫৬"
          subtitle="সকল কাজীর মোট"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="গড় নিবন্ধন / কাজী"
          value="২৮"
          subtitle="এই বছর প্রতি কাজী"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Type breakdown summary bar */}
      <Card>
        <CardTitle className="mb-4">ধরণভিত্তিক কাজী সংখ্যা (Kazi Count by Type)</CardTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { type: "মুসলিম", count: "৯৮", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { type: "হিন্দু", count: "১৫", color: "bg-orange-50 text-orange-700 border-orange-200" },
            { type: "বিশেষ", count: "৮", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { type: "খ্রিস্টান", count: "৩", color: "bg-purple-50 text-purple-700 border-purple-200" },
          ].map((item) => (
            <div
              key={item.type}
              className={`rounded-[var(--radius-md)] border p-3 text-center ${item.color}`}
            >
              <p className="text-lg font-bold">{item.count}</p>
              <p className="text-sm font-medium">{item.type} কাজী</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <CardTitle className="mb-4">ফিল্টার (Filter)</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="নাম অনুসন্ধান (Search Name)"
            placeholder="কাজীর নাম লিখুন..."
          />
          <Select
            label="উপজেলা (Upazila)"
            options={UPAZILA_OPTIONS}
            defaultValue=""
          />
          <Select
            label="কাজীর ধরণ (Kazi Type)"
            options={KAZI_TYPE_OPTIONS}
            defaultValue=""
          />
          <Select
            label="অবস্থা (Status)"
            options={KAZI_STATUS_OPTIONS}
            defaultValue=""
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

      {/* Kazi cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text">কাজী তালিকা</h2>
          <Badge variant="outline">
            সক্রিয় {String(activeCount)}টি / স্থগিত {String(suspendedCount)}টি — মোট {String(KAZIS.length)}টি দেখানো হচ্ছে
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {KAZIS.map((kazi) => (
            <Card key={kazi.licenseNo} hover>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text">{kazi.name}</h3>
                  <p className="text-xs text-text-muted font-mono mt-0.5">{kazi.licenseNo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={KAZI_TYPE_BADGE[kazi.type] || "default"}>
                    {kazi.type}
                  </Badge>
                  <Badge variant={STATUS_BADGE[kazi.status] || "default"}>
                    {kazi.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-text-secondary">
                    <strong className="text-text">{kazi.upazila}</strong> — {kazi.area}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-text-secondary">{kazi.phone}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <p className="text-sm text-text-muted">
                  লাইসেন্স প্রাপ্তি: {kazi.since} সাল থেকে
                </p>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{kazi.registrationsThisYear}</p>
                  <p className="text-xs text-text-muted">নিবন্ধন (২০২৬)</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
