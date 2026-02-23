import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const REGISTRATION_TYPES = [
  {
    type: "muslim",
    icon: "🕌",
    title: "মুসলিম বিবাহ (নিকাহ)",
    subtitle: "Muslim Marriage — Nikah Nama",
    description: "নিকাহনামা (ফর্ম নং ১৬০১) অনুযায়ী মুসলিম বিবাহ নিবন্ধন। ২৩ কলামের সম্পূর্ণ ফর্ম।",
    law: "মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন, ১৯৭৪",
    color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/50",
  },
  {
    type: "hindu",
    icon: "🙏",
    title: "হিন্দু বিবাহ",
    subtitle: "Hindu Marriage Registration",
    description: "ধর্মীয় অনুষ্ঠান সম্পন্নের পর হিন্দু বিবাহ নিবন্ধন। ঐচ্ছিক কিন্তু সুপারিশকৃত।",
    law: "হিন্দু বিবাহ নিবন্ধন আইন, ২০১২",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50/50",
  },
  {
    type: "special",
    icon: "⚖️",
    title: "বিশেষ বিবাহ",
    subtitle: "Special Marriage — Civil Marriage",
    description: "আন্তঃধর্মীয়, সিভিল বা বিদেশি নাগরিকদের বিবাহ। ১৪ দিনের নোটিশ প্রযোজ্য।",
    law: "বিশেষ বিবাহ আইন, ১৮৭২",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50/50",
  },
  {
    type: "christian",
    icon: "✝️",
    title: "খ্রিস্টান বিবাহ",
    subtitle: "Christian Marriage Registration",
    description: "চার্চের অনুমতিসহ খ্রিস্টান বিবাহ নিবন্ধন।",
    law: "খ্রিস্টান বিবাহ আইন, ১৮৭২",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50/50",
  },
  {
    type: "buddhist",
    icon: "☸️",
    title: "বৌদ্ধ বিবাহ",
    subtitle: "Buddhist Marriage Registration",
    description: "বিশেষ বিবাহ আইনের আওতায় বৌদ্ধ বিবাহ নিবন্ধন।",
    law: "বিশেষ বিবাহ আইন, ১৮৭২",
    color: "border-amber-200 hover:border-amber-400 bg-amber-50/50",
  },
  {
    type: "other",
    icon: "📋",
    title: "অন্যান্য ধর্মের বিবাহ",
    subtitle: "Other Religion Marriage",
    description: "শিখ, জৈন ও অন্যান্য ধর্মের বিবাহ নিবন্ধন।",
    law: "বিশেষ বিবাহ আইন, ১৮৭২",
    color: "border-slate-200 hover:border-slate-400 bg-slate-50/50",
  },
];

export default function KaziRegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">নতুন বিবাহ নিবন্ধন</h1>
        <p className="text-sm text-text-secondary mt-1">
          বিবাহের ধরণ নির্বাচন করুন — নাগরিকের পক্ষে সরাসরি নিবন্ধন
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REGISTRATION_TYPES.map((type) => (
          <Link key={type.type} href={`/kazi/register/${type.type}`}>
            <Card
              hover
              className={`h-full border-2 ${type.color} cursor-pointer group transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {type.icon}
                </span>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {type.title}
                  </CardTitle>
                  <p className="text-xs text-text-muted mt-0.5">
                    {type.subtitle}
                  </p>
                  <CardDescription className="mt-2">
                    {type.description}
                  </CardDescription>
                  <p className="mt-2 text-xs text-text-muted italic">
                    {type.law}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
