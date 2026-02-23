"use client";

import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const APPLICATION_TYPES = [
  {
    type: "muslim",
    icon: "\u{1F54C}",
    title: "মুসলিম বিবাহ (নিকাহ)",
    subtitle: "Muslim Marriage -- Nikah Nama",
    description:
      "নিকাহনামা (ফর্ম নং ১৬০১) অনুযায়ী মুসলিম বিবাহ নিবন্ধনের জন্য আবেদন করুন। ২৩ কলামের সম্পূর্ণ ফর্ম।",
    law: "মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন, ১৯৭৪",
    color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/50",
  },
  {
    type: "hindu",
    icon: "\u{1F64F}",
    title: "হিন্দু বিবাহ",
    subtitle: "Hindu Marriage Registration",
    description:
      "ধর্মীয় অনুষ্ঠান সম্পন্নের পর হিন্দু বিবাহ নিবন্ধনের জন্য আবেদন করুন। ঐচ্ছিক কিন্তু সুপারিশকৃত।",
    law: "হিন্দু বিবাহ নিবন্ধন আইন, ২০১২",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50/50",
  },
  {
    type: "special",
    icon: "\u{2696}\u{FE0F}",
    title: "বিশেষ বিবাহ",
    subtitle: "Special Marriage -- Civil Marriage",
    description:
      "আন্তঃধর্মীয়, সিভিল বা বিদেশি নাগরিকদের বিবাহ নিবন্ধনের আবেদন। ১৪ দিনের নোটিশ প্রযোজ্য।",
    law: "বিশেষ বিবাহ আইন, ১৮৭২",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50/50",
  },
  {
    type: "christian",
    icon: "\u{271D}\u{FE0F}",
    title: "খ্রিস্টান বিবাহ",
    subtitle: "Christian Marriage Registration",
    description:
      "চার্চের অনুমতিসহ খ্রিস্টান বিবাহ নিবন্ধনের আবেদন করুন।",
    law: "খ্রিস্টান বিবাহ আইন, ১৮৭২",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50/50",
  },
  {
    type: "buddhist",
    icon: "\u{2638}\u{FE0F}",
    title: "বৌদ্ধ বিবাহ",
    subtitle: "Buddhist Marriage Registration",
    description:
      "বিশেষ বিবাহ আইনের আওতায় বৌদ্ধ বিবাহ নিবন্ধনের আবেদন করুন।",
    law: "বিশেষ বিবাহ আইন, ১৮৭২",
    color: "border-amber-200 hover:border-amber-400 bg-amber-50/50",
  },
  {
    type: "other",
    icon: "\u{1F4CB}",
    title: "অন্যান্য ধর্মের বিবাহ",
    subtitle: "Other Religion Marriage",
    description:
      "শিখ, জৈন ও অন্যান্য ধর্মের বিবাহ নিবন্ধনের আবেদন করুন।",
    law: "বিশেষ বিবাহ আইন, ১৮৭২",
    color: "border-slate-200 hover:border-slate-400 bg-slate-50/50",
  },
];

export default function CitizenApplyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">আবেদন করুন</h1>
        <p className="text-sm text-text-secondary mt-1">
          বিবাহের ধরণ নির্বাচন করুন এবং অনলাইনে আবেদন জমা দিন
        </p>
      </div>

      {/* Informational Note */}
      <div className="rounded-[var(--radius-lg)] border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-800">
              অনলাইন আবেদন সম্পর্কে
            </p>
            <p className="text-sm text-blue-700 mt-1">
              আপনি অনলাইনে আবেদন করতে পারেন অথবা সরাসরি কাজীর কার্যালয়ে যেতে পারেন।
              অনলাইনে আবেদন করলে প্রক্রিয়া দ্রুত সম্পন্ন হবে এবং আপনি আবেদনের অবস্থা ট্র্যাক করতে পারবেন।
            </p>
          </div>
        </div>
      </div>

      {/* Marriage Type Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {APPLICATION_TYPES.map((type) => (
          <Link key={type.type} href={`/citizen/apply/${type.type}`}>
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
