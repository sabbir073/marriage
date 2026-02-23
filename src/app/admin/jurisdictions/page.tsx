import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data — Administrative Area Hierarchy                          */
/* ------------------------------------------------------------------ */

const ADMIN_HIERARCHY = [
  {
    division: "ঢাকা",
    divisionEn: "Dhaka",
    code: "DHK",
    expanded: true,
    districts: [
      {
        name: "ঢাকা",
        nameEn: "Dhaka",
        code: "DHK-01",
        upazilas: 12,
        expanded: true,
        upazilaSamples: [
          { name: "ঢাকা সদর", nameEn: "Dhaka Sadar", code: "DHK-01-01", unions: 9, wards: 93 },
          { name: "ধানমন্ডি", nameEn: "Dhanmondi", code: "DHK-01-02", unions: 0, wards: 15 },
          { name: "মিরপুর", nameEn: "Mirpur", code: "DHK-01-03", unions: 0, wards: 15 },
        ],
      },
      {
        name: "গাজীপুর",
        nameEn: "Gazipur",
        code: "DHK-02",
        upazilas: 5,
        expanded: false,
        upazilaSamples: [
          { name: "গাজীপুর সদর", nameEn: "Gazipur Sadar", code: "DHK-02-01", unions: 13, wards: 0 },
          { name: "কালীগঞ্জ", nameEn: "Kaliganaj", code: "DHK-02-02", unions: 9, wards: 0 },
        ],
      },
      {
        name: "নারায়ণগঞ্জ",
        nameEn: "Narayanganj",
        code: "DHK-03",
        upazilas: 5,
        expanded: false,
        upazilaSamples: [],
      },
      {
        name: "মানিকগঞ্জ",
        nameEn: "Manikganj",
        code: "DHK-04",
        upazilas: 7,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "চট্টগ্রাম",
    divisionEn: "Chittagong",
    code: "CTG",
    expanded: true,
    districts: [
      {
        name: "চট্টগ্রাম",
        nameEn: "Chittagong",
        code: "CTG-01",
        upazilas: 15,
        expanded: true,
        upazilaSamples: [
          { name: "চট্টগ্রাম সদর", nameEn: "Chittagong Sadar", code: "CTG-01-01", unions: 8, wards: 41 },
          { name: "পাহাড়তলী", nameEn: "Pahartali", code: "CTG-01-02", unions: 5, wards: 9 },
        ],
      },
      {
        name: "কক্সবাজার",
        nameEn: "Cox's Bazar",
        code: "CTG-02",
        upazilas: 8,
        expanded: false,
        upazilaSamples: [],
      },
      {
        name: "কুমিল্লা",
        nameEn: "Cumilla",
        code: "CTG-03",
        upazilas: 17,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "রাজশাহী",
    divisionEn: "Rajshahi",
    code: "RAJ",
    expanded: false,
    districts: [
      {
        name: "রাজশাহী",
        nameEn: "Rajshahi",
        code: "RAJ-01",
        upazilas: 9,
        expanded: false,
        upazilaSamples: [],
      },
      {
        name: "বগুড়া",
        nameEn: "Bogura",
        code: "RAJ-02",
        upazilas: 12,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "খুলনা",
    divisionEn: "Khulna",
    code: "KHU",
    expanded: false,
    districts: [
      {
        name: "খুলনা",
        nameEn: "Khulna",
        code: "KHU-01",
        upazilas: 9,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "বরিশাল",
    divisionEn: "Barishal",
    code: "BAR",
    expanded: false,
    districts: [
      {
        name: "বরিশাল",
        nameEn: "Barishal",
        code: "BAR-01",
        upazilas: 10,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "সিলেট",
    divisionEn: "Sylhet",
    code: "SYL",
    expanded: false,
    districts: [
      {
        name: "সিলেট",
        nameEn: "Sylhet",
        code: "SYL-01",
        upazilas: 13,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "রংপুর",
    divisionEn: "Rangpur",
    code: "RNG",
    expanded: false,
    districts: [
      {
        name: "রংপুর",
        nameEn: "Rangpur",
        code: "RNG-01",
        upazilas: 8,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
  {
    division: "ময়মনসিংহ",
    divisionEn: "Mymensingh",
    code: "MYM",
    expanded: false,
    districts: [
      {
        name: "ময়মনসিংহ",
        nameEn: "Mymensingh",
        code: "MYM-01",
        upazilas: 13,
        expanded: false,
        upazilaSamples: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable Tree Icons                                                */
/* ------------------------------------------------------------------ */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default function JurisdictionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">প্রশাসনিক এলাকা</h1>
          <p className="text-sm text-text-secondary mt-1">
            বিভাগ, জেলা, উপজেলা, ইউনিয়ন ও ওয়ার্ড পরিচালনা — Administrative Area Management
          </p>
        </div>
        <Button variant="primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          নতুন এলাকা যুক্ত করুন
        </Button>
      </div>

      {/* Breadcrumb */}
      <Card padding="sm">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-primary">বাংলাদেশ</span>
          <ChevronRight className="h-3 w-3 text-text-muted" />
          <span className="text-text-secondary">বিভাগ (৮)</span>
          <ChevronRight className="h-3 w-3 text-text-muted" />
          <span className="text-text-secondary">জেলা (৬৪)</span>
          <ChevronRight className="h-3 w-3 text-text-muted" />
          <span className="text-text-secondary">উপজেলা (৪৯৫)</span>
          <ChevronRight className="h-3 w-3 text-text-muted" />
          <span className="text-text-secondary">ইউনিয়ন (৪,৫৭১)</span>
          <ChevronRight className="h-3 w-3 text-text-muted" />
          <span className="text-text-muted">ওয়ার্ড</span>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="বিভাগ"
          value="৮"
          subtitle="Division"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          }
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="জেলা"
          value="৬৪"
          subtitle="District"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          }
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="উপজেলা"
          value="৪৯৫"
          subtitle="Upazila"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          }
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="ইউনিয়ন"
          value="৪,৫৭১"
          subtitle="Union"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
          }
          color="bg-amber-50 text-amber-600"
        />
        <StatsCard
          title="ওয়ার্ড"
          value="১৩,৮৫৬"
          subtitle="Ward"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
          color="bg-teal-50 text-teal-600"
        />
      </div>

      {/* Tree View */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>প্রশাসনিক এলাকার শ্রেণিবিন্যাস</CardTitle>
          <Badge variant="outline">শুধুমাত্র দেখার জন্য</Badge>
        </div>

        <div className="space-y-2">
          {ADMIN_HIERARCHY.map((div) => (
            <div key={div.code} className="border border-border rounded-[var(--radius-md)] overflow-hidden">
              {/* Division Level */}
              <div className="flex items-center gap-3 bg-surface-tertiary px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                {div.expanded ? (
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-text-secondary" />
                )}
                <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-white text-xs font-bold">
                  {div.code}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-text">{div.division} বিভাগ</span>
                  <span className="text-xs text-text-muted ml-2">({div.divisionEn})</span>
                </div>
                <Badge variant="outline">{div.districts.length} জেলা</Badge>
              </div>

              {/* District Level */}
              {div.expanded && (
                <div className="border-t border-border">
                  {div.districts.map((dist) => (
                    <div key={dist.code} className="border-b border-border last:border-b-0">
                      <div className="flex items-center gap-3 pl-10 pr-4 py-2.5 cursor-pointer hover:bg-surface-tertiary transition-colors">
                        {dist.expanded ? (
                          <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-text-secondary" />
                        )}
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                          J
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-text">{dist.name} জেলা</span>
                          <span className="text-xs text-text-muted ml-2">({dist.nameEn})</span>
                        </div>
                        <code className="text-[10px] font-mono text-text-muted bg-surface-tertiary px-1.5 py-0.5 rounded mr-2">
                          {dist.code}
                        </code>
                        <Badge variant="outline">{dist.upazilas} উপজেলা</Badge>
                      </div>

                      {/* Upazila Level */}
                      {dist.expanded && dist.upazilaSamples.length > 0 && (
                        <div className="bg-blue-50/30">
                          {dist.upazilaSamples.map((upz) => (
                            <div
                              key={upz.code}
                              className="flex items-center gap-3 pl-20 pr-4 py-2 border-t border-border/50 hover:bg-blue-50/50 transition-colors"
                            >
                              <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-100 text-purple-700 text-[9px] font-bold">
                                U
                              </div>
                              <div className="flex-1">
                                <span className="text-sm text-text">{upz.name}</span>
                                <span className="text-xs text-text-muted ml-2">({upz.nameEn})</span>
                              </div>
                              <code className="text-[10px] font-mono text-text-muted bg-white px-1.5 py-0.5 rounded border border-border mr-2">
                                {upz.code}
                              </code>
                              <div className="flex items-center gap-3 text-xs text-text-muted">
                                {upz.unions > 0 && (
                                  <span>{upz.unions} ইউনিয়ন</span>
                                )}
                                {upz.wards > 0 && (
                                  <span>{upz.wards} ওয়ার্ড</span>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="pl-20 pr-4 py-2 border-t border-border/50">
                            <a href="#" className="text-xs text-primary hover:underline">
                              সকল {dist.upazilas}টি উপজেলা দেখুন →
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="font-medium text-text-secondary">চিহ্নসমূহ:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[9px] font-bold">D</span>
            <span className="text-text-secondary">বিভাগ (Division)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-blue-700 text-[9px] font-bold">J</span>
            <span className="text-text-secondary">জেলা (District)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-100 text-purple-700 text-[9px] font-bold">U</span>
            <span className="text-text-secondary">উপজেলা (Upazila)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-100 text-amber-700 text-[9px] font-bold">Y</span>
            <span className="text-text-secondary">ইউনিয়ন (Union)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-100 text-teal-700 text-[9px] font-bold">W</span>
            <span className="text-text-secondary">ওয়ার্ড (Ward)</span>
          </span>
        </div>
      </Card>
    </div>
  );
}
