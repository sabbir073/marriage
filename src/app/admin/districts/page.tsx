import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data — All 8 divisions with sample districts                 */
/* ------------------------------------------------------------------ */

const DIVISION_DISTRICTS = [
  {
    division: "ঢাকা",
    divisionEn: "Dhaka",
    totalDistricts: "১৩",
    totalRegistrations: "১৫,২৩৪",
    totalKazis: "৩,৪৫৬",
    color: "bg-emerald-50 border-emerald-200",
    headerColor: "bg-emerald-600",
    districts: [
      { name: "ঢাকা", nameEn: "Dhaka", registrations: "৫,৬৭৮", kazis: "৮৯০" },
      { name: "গাজীপুর", nameEn: "Gazipur", registrations: "২,৩৪৫", kazis: "৪৫৬" },
      { name: "নারায়ণগঞ্জ", nameEn: "Narayanganj", registrations: "১,৮৯০", kazis: "৩৭৮" },
    ],
  },
  {
    division: "চট্টগ্রাম",
    divisionEn: "Chittagong",
    totalDistricts: "১১",
    totalRegistrations: "৮,৯৬৫",
    totalKazis: "২,১৩৪",
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-600",
    districts: [
      { name: "চট্টগ্রাম", nameEn: "Chittagong", registrations: "৩,২১০", kazis: "৬৫০" },
      { name: "কক্সবাজার", nameEn: "Cox's Bazar", registrations: "১,৪৫৬", kazis: "৩২১" },
      { name: "কুমিল্লা", nameEn: "Cumilla", registrations: "১,১২৩", kazis: "২৮৯" },
    ],
  },
  {
    division: "রাজশাহী",
    divisionEn: "Rajshahi",
    totalDistricts: "৮",
    totalRegistrations: "৫,৬৭৮",
    totalKazis: "১,৫৬৭",
    color: "bg-purple-50 border-purple-200",
    headerColor: "bg-purple-600",
    districts: [
      { name: "রাজশাহী", nameEn: "Rajshahi", registrations: "১,৮৯০", kazis: "৪৫৬" },
      { name: "বগুড়া", nameEn: "Bogura", registrations: "১,২৩৪", kazis: "৩৪৫" },
      { name: "নওগাঁ", nameEn: "Naogaon", registrations: "৭৮৯", kazis: "২১০" },
    ],
  },
  {
    division: "খুলনা",
    divisionEn: "Khulna",
    totalDistricts: "১০",
    totalRegistrations: "৪,৫৬৭",
    totalKazis: "১,৩৪৫",
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-amber-600",
    districts: [
      { name: "খুলনা", nameEn: "Khulna", registrations: "১,৫৬৭", kazis: "৩৮৯" },
      { name: "যশোর", nameEn: "Jessore", registrations: "১,০২৩", kazis: "২৮৯" },
      { name: "সাতক্ষীরা", nameEn: "Satkhira", registrations: "৬৭৮", kazis: "১৯৮" },
    ],
  },
  {
    division: "বরিশাল",
    divisionEn: "Barishal",
    totalDistricts: "৬",
    totalRegistrations: "৩,২৩৪",
    totalKazis: "৮৯০",
    color: "bg-cyan-50 border-cyan-200",
    headerColor: "bg-cyan-600",
    districts: [
      { name: "বরিশাল", nameEn: "Barishal", registrations: "১,২৩৪", kazis: "৩১০" },
      { name: "পটুয়াখালী", nameEn: "Patuakhali", registrations: "৬৭৮", kazis: "১৮৯" },
      { name: "ভোলা", nameEn: "Bhola", registrations: "৫৬৭", kazis: "১৫৬" },
    ],
  },
  {
    division: "সিলেট",
    divisionEn: "Sylhet",
    totalDistricts: "৪",
    totalRegistrations: "৩,০০০",
    totalKazis: "৭৬৫",
    color: "bg-rose-50 border-rose-200",
    headerColor: "bg-rose-600",
    districts: [
      { name: "সিলেট", nameEn: "Sylhet", registrations: "১,৪৫৬", kazis: "৩৫৬" },
      { name: "মৌলভীবাজার", nameEn: "Moulvibazar", registrations: "৬৭৮", kazis: "১৮৯" },
      { name: "হবিগঞ্জ", nameEn: "Habiganj", registrations: "৫৩৪", kazis: "১২০" },
    ],
  },
  {
    division: "রংপুর",
    divisionEn: "Rangpur",
    totalDistricts: "৮",
    totalRegistrations: "৩,১০০",
    totalKazis: "১,১২৩",
    color: "bg-teal-50 border-teal-200",
    headerColor: "bg-teal-600",
    districts: [
      { name: "রংপুর", nameEn: "Rangpur", registrations: "১,০৫০", kazis: "২৭৮" },
      { name: "দিনাজপুর", nameEn: "Dinajpur", registrations: "৭৮৯", kazis: "২২০" },
      { name: "ঠাকুরগাঁও", nameEn: "Thakurgaon", registrations: "৪৫৬", kazis: "১৫৬" },
    ],
  },
  {
    division: "ময়মনসিংহ",
    divisionEn: "Mymensingh",
    totalDistricts: "৪",
    totalRegistrations: "১,৯০০",
    totalKazis: "১,১৭৬",
    color: "bg-orange-50 border-orange-200",
    headerColor: "bg-orange-600",
    districts: [
      { name: "ময়মনসিংহ", nameEn: "Mymensingh", registrations: "৮৯০", kazis: "৫১০" },
      { name: "জামালপুর", nameEn: "Jamalpur", registrations: "৪৫৬", kazis: "২৮৯" },
      { name: "নেত্রকোনা", nameEn: "Netrokona", registrations: "৩২৪", kazis: "১৯৮" },
    ],
  },
];

export default function DistrictsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">জেলা তালিকা</h1>
        <p className="text-sm text-text-secondary mt-1">
          সমগ্র বাংলাদেশের ৮ বিভাগ ও ৬৪ জেলার সারসংক্ষেপ — All 8 Divisions & 64 Districts Overview
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট বিভাগ"
          value="৮"
          subtitle="সমগ্র বাংলাদেশে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          }
          color="bg-primary-50 text-primary"
        />
        <StatsCard
          title="মোট জেলা"
          value="৬৪"
          subtitle="৮টি বিভাগে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          }
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="মোট উপজেলা"
          value="৪৯৫"
          subtitle="৬৪ জেলায়"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          }
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="মোট নিবন্ধন"
          value="৪৫,৬৭৮"
          subtitle="২০২৬ সালে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          }
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Search */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              placeholder="জেলা বা বিভাগের নাম দিয়ে অনুসন্ধান করুন..."
              label="অনুসন্ধান"
            />
          </div>
          <Button variant="primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            খুঁজুন
          </Button>
        </div>
      </Card>

      {/* Division Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {DIVISION_DISTRICTS.map((div) => (
          <Card key={div.division} className="overflow-hidden !p-0">
            {/* Division Header */}
            <div className={`${div.headerColor} px-6 py-4 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{div.division} বিভাগ</h3>
                  <p className="text-sm opacity-90">{div.divisionEn} Division</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">{div.totalDistricts} জেলা</p>
                  <p className="opacity-90">{div.totalKazis} কাজী</p>
                </div>
              </div>
            </div>

            {/* Division Summary */}
            <div className="border-b border-border px-6 py-3 bg-surface-tertiary">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">মোট নিবন্ধন (২০২৬)</span>
                <span className="font-bold text-text">{div.totalRegistrations}</span>
              </div>
            </div>

            {/* District List */}
            <div className="px-6 py-4">
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">নমুনা জেলাসমূহ</p>
              <div className="space-y-2">
                {div.districts.map((district) => (
                  <a
                    key={district.name}
                    href="#"
                    className="flex items-center justify-between rounded-[var(--radius-md)] border border-border p-3 hover:bg-surface-tertiary transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                        {district.name}
                      </p>
                      <p className="text-xs text-text-muted">{district.nameEn}</p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-sm font-semibold text-text">{district.registrations}</p>
                        <p className="text-xs text-text-muted">নিবন্ধন</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">{district.kazis}</p>
                        <p className="text-xs text-text-muted">কাজী</p>
                      </div>
                      <svg className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-3 text-center">
                <a href="#" className="text-xs text-primary hover:underline">
                  সকল {div.totalDistricts}টি জেলা দেখুন →
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
