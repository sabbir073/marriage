import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";

const NATIONAL_STATS = {
  totalRegistrations: "৪৫,৬৭৮",
  thisMonth: "৩,৮৯২",
  activeKazis: "১২,৪৫৬",
  totalDistricts: "৬৪",
  divorces: "২,৩৪৫",
  pendingApplications: "৮৭৬",
};

const DIVISION_DATA = [
  { name: "ঢাকা", nameEn: "Dhaka", districts: "১৩", registrations: "১৫,২৩৪", kazis: "৩,৪৫৬", pct: "৩৩%" },
  { name: "চট্টগ্রাম", nameEn: "Chittagong", districts: "১১", registrations: "৮,৯৬৫", kazis: "২,১৩৪", pct: "২০%" },
  { name: "রাজশাহী", nameEn: "Rajshahi", districts: "৮", registrations: "৫,৬৭৮", kazis: "১,৫৬৭", pct: "১২%" },
  { name: "খুলনা", nameEn: "Khulna", districts: "১০", registrations: "৪,৫৬৭", kazis: "১,৩৪৫", pct: "১০%" },
  { name: "বরিশাল", nameEn: "Barishal", districts: "৬", registrations: "৩,২৩৪", kazis: "৮৯০", pct: "৭%" },
  { name: "সিলেট", nameEn: "Sylhet", districts: "৪", registrations: "৩,০০০", kazis: "৭৬৫", pct: "৭%" },
  { name: "রংপুর", nameEn: "Rangpur", districts: "৮", registrations: "৩,১০০", kazis: "১,১২৩", pct: "৭%" },
  { name: "ময়মনসিংহ", nameEn: "Mymensingh", districts: "৪", registrations: "১,৯০০", kazis: "১,১৭৬", pct: "৪%" },
];

const RECENT_SYSTEM_EVENTS = [
  { action: "নতুন কাজী যুক্ত", details: "মাওলানা আমিনুল ইসলাম — গাজীপুর সদর", time: "৫ মিনিট আগে", type: "info" as const },
  { action: "কাজী সাসপেন্ড", details: "মাওলানা ফজলুল হক — বগুড়া — অভিযোগ তদন্তাধীন", time: "১ ঘণ্টা আগে", type: "error" as const },
  { action: "জেলা রিপোর্ট", details: "চট্টগ্রাম জেলা — মাসিক রিপোর্ট জমা দিয়েছে", time: "২ ঘণ্টা আগে", type: "success" as const },
  { action: "বিশেষ বিবাহ আপত্তি", details: "MR-CTG-2026-001234 — আপত্তি দাখিল হয়েছে", time: "৩ ঘণ্টা আগে", type: "warning" as const },
  { action: "সিস্টেম আপডেট", details: "v2.1.3 — নতুন ফিচার: তালাক ট্র্যাকিং উন্নত", time: "৫ ঘণ্টা আগে", type: "info" as const },
];

const EVENT_BADGE: Record<string, "success" | "warning" | "info" | "error"> = {
  success: "success",
  warning: "warning",
  info: "info",
  error: "error",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">জাতীয় ড্যাশবোর্ড</h1>
        <p className="text-sm text-text-secondary mt-1">
          সমগ্র বাংলাদেশের বিবাহ ও তালাক নিবন্ধন পরিসংখ্যান — National Marriage & Divorce Registration Overview
        </p>
      </div>

      {/* National Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="মোট নিবন্ধন"
          value={NATIONAL_STATS.totalRegistrations}
          subtitle="২০২৬ সালে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="এই মাসে"
          value={NATIONAL_STATS.thisMonth}
          subtitle="ফেব্রুয়ারি ২০২৬"
          trend={{ value: "১২% বেশি", positive: true }}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="সক্রিয় কাজী"
          value={NATIONAL_STATS.activeKazis}
          subtitle="সমগ্র বাংলাদেশে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="জেলা"
          value={NATIONAL_STATS.totalDistricts}
          subtitle="৮ বিভাগে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>}
          color="bg-amber-50 text-amber-600"
        />
        <StatsCard
          title="তালাক নিবন্ধন"
          value={NATIONAL_STATS.divorces}
          subtitle="২০২৬ সালে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.5a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
          color="bg-red-50 text-red-600"
        />
        <StatsCard
          title="অপেক্ষমাণ আবেদন"
          value={NATIONAL_STATS.pendingApplications}
          subtitle="জাতীয়ভাবে"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Division-wise Stats Table */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>বিভাগভিত্তিক পরিসংখ্যান (২০২৬)</CardTitle>
              <Badge variant="outline">৮ বিভাগ</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-2 pr-4 font-medium text-text-secondary">বিভাগ</th>
                    <th className="pb-2 pr-4 font-medium text-text-secondary text-center">জেলা</th>
                    <th className="pb-2 pr-4 font-medium text-text-secondary text-right">নিবন্ধন</th>
                    <th className="pb-2 pr-4 font-medium text-text-secondary text-right">কাজী</th>
                    <th className="pb-2 font-medium text-text-secondary text-right">শতাংশ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {DIVISION_DATA.map((div) => (
                    <tr key={div.name} className="hover:bg-surface-tertiary transition-colors">
                      <td className="py-2.5 pr-4">
                        <p className="font-medium text-text">{div.name}</p>
                        <p className="text-xs text-text-muted">{div.nameEn}</p>
                      </td>
                      <td className="py-2.5 pr-4 text-center text-text-secondary">{div.districts}</td>
                      <td className="py-2.5 pr-4 text-right font-semibold text-text">{div.registrations}</td>
                      <td className="py-2.5 pr-4 text-right text-text-secondary">{div.kazis}</td>
                      <td className="py-2.5 text-right">
                        <span className="inline-block min-w-[3rem] rounded-full bg-primary-50 px-2 py-0.5 text-center text-xs font-semibold text-primary">
                          {div.pct}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border font-bold">
                    <td className="pt-3 pr-4 text-text">মোট</td>
                    <td className="pt-3 pr-4 text-center text-text">৬৪</td>
                    <td className="pt-3 pr-4 text-right text-primary">৪৫,৬৭৮</td>
                    <td className="pt-3 pr-4 text-right text-text">১২,৪৫৬</td>
                    <td className="pt-3 text-right text-text">১০০%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>

        {/* Recent System Events */}
        <Card>
          <CardTitle className="mb-4">সাম্প্রতিক কার্যক্রম</CardTitle>
          <div className="space-y-3">
            {RECENT_SYSTEM_EVENTS.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border p-3"
              >
                <div className="mt-0.5">
                  <Badge variant={EVENT_BADGE[event.type]}>
                    {event.action}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text truncate">{event.details}</p>
                  <p className="text-xs text-text-muted mt-0.5">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Marriage Type Breakdown - National */}
      <Card>
        <CardTitle className="mb-4">জাতীয় বিবাহের ধরণভিত্তিক পরিসংখ্যান (২০২৬)</CardTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { type: "মুসলিম", count: "৩৮,২৩৪", pct: "৮৪%", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { type: "হিন্দু", count: "৪,১২৩", pct: "৯%", color: "bg-orange-50 text-orange-700 border-orange-200" },
            { type: "বিশেষ", count: "১,৫৬৭", pct: "৩%", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { type: "খ্রিস্টান", count: "৮৯০", pct: "২%", color: "bg-purple-50 text-purple-700 border-purple-200" },
            { type: "বৌদ্ধ", count: "৫৬৭", pct: "১%", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { type: "অন্যান্য", count: "২৯৭", pct: "১%", color: "bg-slate-50 text-slate-700 border-slate-200" },
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

      {/* Quick Admin Actions */}
      <Card>
        <CardTitle className="mb-4">দ্রুত কার্যক্রম</CardTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "নতুন কাজী যুক্ত করুন", subtitle: "নিবন্ধক নিয়োগ", icon: "👤", href: "/admin/registrars/new" },
            { title: "জাতীয় অনুসন্ধান", subtitle: "সকল নিবন্ধন খুঁজুন", icon: "🔍", href: "/admin/registrations" },
            { title: "রিপোর্ট এক্সপোর্ট", subtitle: "PDF / CSV রিপোর্ট", icon: "📊", href: "/admin/reports" },
            { title: "সিস্টেম সেটিংস", subtitle: "কনফিগারেশন", icon: "⚙️", href: "/admin/settings" },
          ].map((action) => (
            <div
              key={action.title}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors cursor-pointer group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</span>
              <div>
                <p className="text-sm font-medium text-text">{action.title}</p>
                <p className="text-xs text-text-muted">{action.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
