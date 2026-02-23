import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const REPORT_CATEGORIES = [
  {
    title: "জাতীয় সারসংক্ষেপ",
    titleEn: "National Summary",
    description: "সমগ্র বাংলাদেশের বিবাহ ও তালাক নিবন্ধন সারসংক্ষেপ প্রতিবেদন",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    color: "bg-primary-50 text-primary border-primary/20",
    lastGenerated: "২০ ফেব্রুয়ারি ২০২৬",
  },
  {
    title: "বিভাগ/জেলাভিত্তিক",
    titleEn: "Division / District wise",
    description: "বিভাগ ও জেলাভিত্তিক বিস্তারিত নিবন্ধন পরিসংখ্যান",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600 border-blue-200",
    lastGenerated: "১৮ ফেব্রুয়ারি ২০২৬",
  },
  {
    title: "বিবাহের ধরণভিত্তিক",
    titleEn: "By Marriage Type",
    description: "মুসলিম, হিন্দু, বিশেষ, খ্রিস্টান ও অন্যান্য বিবাহের পরিসংখ্যান",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600 border-purple-200",
    lastGenerated: "১৫ ফেব্রুয়ারি ২০২৬",
  },
  {
    title: "কাজী কার্যক্রম",
    titleEn: "Registrar Activity",
    description: "কাজীদের কর্মক্ষমতা, নিয়োগ, সাসপেনশন ও কার্যক্রম প্রতিবেদন",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600 border-amber-200",
    lastGenerated: "১২ ফেব্রুয়ারি ২০২৬",
  },
  {
    title: "তালাক পরিসংখ্যান",
    titleEn: "Divorce Statistics",
    description: "তালাক নিবন্ধন, ইদ্দতকাল, ও পুনর্মিলন পরিসংখ্যান",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.5a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
      </svg>
    ),
    color: "bg-red-50 text-red-600 border-red-200",
    lastGenerated: "১০ ফেব্রুয়ারি ২০২৬",
  },
];

const FORMAT_OPTIONS = [
  { value: "pdf", label: "PDF" },
  { value: "csv", label: "CSV" },
  { value: "excel", label: "Excel (.xlsx)" },
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

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">জাতীয় প্রতিবেদন</h1>
        <p className="text-sm text-text-secondary mt-1">
          জাতীয় পর্যায়ের সকল প্রতিবেদন তৈরি ও ডাউনলোড — National Reports Generation
        </p>
      </div>

      {/* Summary Preview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট নিবন্ধন (২০২৬)"
          value="৪৫,৬৭৮"
          subtitle="গত মাসের তুলনায়"
          trend={{ value: "১২% বেশি", positive: true }}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          }
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="তালাক নিবন্ধন"
          value="২,৩৪৫"
          subtitle="গত মাসের তুলনায়"
          trend={{ value: "৩% কম", positive: false }}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.5a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          }
          color="bg-red-50 text-red-600"
        />
        <StatsCard
          title="সক্রিয় কাজী"
          value="১২,৪৫৬"
          subtitle="৬৪ জেলায়"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="অপেক্ষমাণ আবেদন"
          value="৮৭৬"
          subtitle="জাতীয়ভাবে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Report Generation Form */}
      <Card>
        <CardTitle className="mb-1">প্রতিবেদন তৈরি করুন</CardTitle>
        <CardDescription className="mb-4">তারিখ পরিসীমা ও ফরম্যাট নির্বাচন করুন</CardDescription>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="তারিখ (থেকে)"
            type="date"
            defaultValue="2026-01-01"
          />
          <Input
            label="তারিখ (পর্যন্ত)"
            type="date"
            defaultValue="2026-02-23"
          />
          <Select
            label="বিভাগ"
            options={DIVISION_OPTIONS}
            defaultValue=""
          />
          <Select
            label="ফরম্যাট"
            options={FORMAT_OPTIONS}
            defaultValue="pdf"
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            প্রতিবেদন তৈরি করুন
          </Button>
          <Button variant="outline">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            প্রিভিউ দেখুন
          </Button>
        </div>
      </Card>

      {/* Report Categories */}
      <div>
        <h2 className="text-lg font-semibold text-text mb-4">প্রতিবেদনের ধরণসমূহ</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REPORT_CATEGORIES.map((report) => (
            <Card key={report.title} hover className="group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border ${report.color}`}>
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">{report.titleEn}</p>
                  <p className="text-sm text-text-secondary mt-2">{report.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-text-muted">
                      সর্বশেষ: {report.lastGenerated}
                    </p>
                    <Badge variant="outline">PDF</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardTitle className="mb-4">সাম্প্রতিক প্রতিবেদনসমূহ</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">প্রতিবেদন</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ধরণ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">সময়কাল</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">তৈরির তারিখ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">ফরম্যাট</th>
                <th className="pb-2 font-medium text-text-secondary text-center">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "জাতীয় মাসিক সারসংক্ষেপ", type: "জাতীয়", period: "জানুয়ারি ২০২৬", date: "০১ ফেব্রুয়ারি ২০২৬", format: "PDF" },
                { name: "ঢাকা বিভাগ — ত্রৈমাসিক রিপোর্ট", type: "বিভাগীয়", period: "অক্টো-ডিসে ২০২৫", date: "১৫ জানুয়ারি ২০২৬", format: "Excel" },
                { name: "বিবাহের ধরণভিত্তিক বার্ষিক রিপোর্ট", type: "ধরণভিত্তিক", period: "২০২৫", date: "১০ জানুয়ারি ২০২৬", format: "PDF" },
                { name: "কাজী কার্যক্রম রিপোর্ট", type: "কাজী", period: "ডিসেম্বর ২০২৫", date: "০৫ জানুয়ারি ২০২৬", format: "CSV" },
                { name: "তালাক পরিসংখ্যান — বার্ষিক", type: "তালাক", period: "২০২৫", date: "০২ জানুয়ারি ২০২৬", format: "PDF" },
              ].map((report) => (
                <tr key={report.name} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-3 pr-4 font-medium text-text">{report.name}</td>
                  <td className="py-3 pr-4">
                    <Badge variant="info">{report.type}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{report.period}</td>
                  <td className="py-3 pr-4 text-text-secondary">{report.date}</td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline">{report.format}</Badge>
                  </td>
                  <td className="py-3 text-center">
                    <Button variant="ghost" size="sm">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
