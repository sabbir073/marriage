import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";

const DISTRICT_STATS = {
  totalRegistrations: "৩,৪৫৬",
  thisMonth: "২৮৭",
  activeKazis: "১২৪",
  pendingReview: "০",
};

const RECENT_REGISTRATIONS = [
  { id: "MR-DHK-2026-003456", type: "মুসলিম", groom: "মোঃ রাশেদ হোসেন", bride: "ফাতেমা খাতুন", kazi: "মাওলানা আব্দুর রহমান", date: "২৩ ফেব্রুয়ারি ২০২৬", upazila: "ধানমন্ডি" },
  { id: "MR-DHK-2026-003455", type: "হিন্দু", groom: "সুব্রত দাস", bride: "প্রিয়া রানী", kazi: "পণ্ডিত রাজেশ শর্মা", date: "২২ ফেব্রুয়ারি ২০২৬", upazila: "গুলশান" },
  { id: "MR-DHK-2026-003454", type: "মুসলিম", groom: "মোঃ তানভীর আহমেদ", bride: "নুসরাত জাহান", kazi: "মাওলানা হাফেজ ইব্রাহিম", date: "২২ ফেব্রুয়ারি ২০২৬", upazila: "মিরপুর" },
  { id: "MR-DHK-2026-003453", type: "বিশেষ", groom: "ডেভিড চৌধুরী", bride: "সারা ইসলাম", kazi: "অ্যাডভোকেট সালমা নাসরীন", date: "২১ ফেব্রুয়ারি ২০২৬", upazila: "মতিঝিল" },
  { id: "DR-DHK-2026-000089", type: "তালাক", groom: "মোঃ জাহিদ হাসান", bride: "রুমানা আক্তার", kazi: "মাওলানা আব্দুর রহমান", date: "২১ ফেব্রুয়ারি ২০২৬", upazila: "ধানমন্ডি" },
];

const TOP_KAZIS = [
  { name: "মাওলানা আব্দুর রহমান", type: "মুসলিম", area: "ধানমন্ডি", registrations: "৪৫", status: "সক্রিয়" },
  { name: "মাওলানা হাফেজ ইব্রাহিম", type: "মুসলিম", area: "মিরপুর", registrations: "৩৮", status: "সক্রিয়" },
  { name: "পণ্ডিত রাজেশ শর্মা", type: "হিন্দু", area: "গুলশান", registrations: "১২", status: "সক্রিয়" },
  { name: "অ্যাডভোকেট সালমা নাসরীন", type: "বিশেষ", area: "মতিঝিল", registrations: "৮", status: "সক্রিয়" },
];

const TYPE_BADGE: Record<string, "success" | "warning" | "info" | "error" | "default"> = {
  "মুসলিম": "success",
  "হিন্দু": "warning",
  "বিশেষ": "info",
  "খ্রিস্টান": "default",
  "তালাক": "error",
};

export default function DistrictDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">জেলা ড্যাশবোর্ড — ঢাকা</h1>
        <p className="text-sm text-text-secondary mt-1">
          জেলার সকল বিবাহ ও তালাক নিবন্ধন তথ্যের সারসংক্ষেপ (শুধুমাত্র পর্যবেক্ষণ — শুধু পড়ার অনুমতি)
        </p>
      </div>

      {/* Read-only notice */}
      <div className="rounded-[var(--radius-md)] bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-blue-700">
          <strong>অডিট মোড:</strong> আপনি শুধুমাত্র তথ্য দেখতে ও রিপোর্ট রপ্তানি করতে পারবেন। কোনো তথ্য সম্পাদনা বা অনুমোদনের অনুমতি নেই।
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট নিবন্ধন (২০২৬)"
          value={DISTRICT_STATS.totalRegistrations}
          subtitle="জানুয়ারি থেকে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="এই মাসে"
          value={DISTRICT_STATS.thisMonth}
          subtitle="ফেব্রুয়ারি ২০২৬"
          trend={{ value: "৮% বেশি", positive: true }}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="সক্রিয় কাজী"
          value={DISTRICT_STATS.activeKazis}
          subtitle="ঢাকা জেলায়"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="তালাক নিবন্ধন"
          value="৮৯"
          subtitle="২০২৬ সালে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.5a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
          color="bg-red-50 text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Registrations */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>সাম্প্রতিক নিবন্ধন</CardTitle>
              <Badge variant="outline">শেষ ৭ দিন</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-2 pr-4 font-medium text-text-secondary">নিবন্ধন নম্বর</th>
                    <th className="pb-2 pr-4 font-medium text-text-secondary">ধরণ</th>
                    <th className="pb-2 pr-4 font-medium text-text-secondary">বর / কনে</th>
                    <th className="pb-2 pr-4 font-medium text-text-secondary">কাজী</th>
                    <th className="pb-2 font-medium text-text-secondary">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RECENT_REGISTRATIONS.map((reg) => (
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
                        <p className="text-text-muted text-xs">{reg.bride}</p>
                      </td>
                      <td className="py-2.5 pr-4 text-text-secondary">{reg.kazi}</td>
                      <td className="py-2.5 text-text-secondary whitespace-nowrap">{reg.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Top Kazis */}
        <Card>
          <CardTitle className="mb-4">শীর্ষ কাজী (এই মাসে)</CardTitle>
          <div className="space-y-3">
            {TOP_KAZIS.map((kazi, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">
                    {kazi.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {kazi.type} • {kazi.area}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{kazi.registrations}</p>
                  <p className="text-xs text-text-muted">নিবন্ধন</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Type Breakdown */}
      <Card>
        <CardTitle className="mb-4">বিবাহের ধরণভিত্তিক পরিসংখ্যান (২০২৬)</CardTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { type: "মুসলিম", count: "২,৮৭৬", pct: "৮৩%", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { type: "হিন্দু", count: "৩২১", pct: "৯%", color: "bg-orange-50 text-orange-700 border-orange-200" },
            { type: "বিশেষ", count: "১৪৫", pct: "৪%", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { type: "খ্রিস্টান", count: "৬৭", pct: "২%", color: "bg-purple-50 text-purple-700 border-purple-200" },
            { type: "বৌদ্ধ", count: "৩২", pct: "১%", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { type: "অন্যান্য", count: "১৫", pct: "১%", color: "bg-slate-50 text-slate-700 border-slate-200" },
          ].map((item) => (
            <div
              key={item.type}
              className={`rounded-[var(--radius-md)] border p-3 text-center ${item.color}`}
            >
              <p className="text-lg font-bold">{item.count}</p>
              <p className="text-sm font-medium">{item.type}</p>
              <p className="text-xs opacity-70">{item.pct}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
