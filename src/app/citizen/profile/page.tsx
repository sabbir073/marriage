"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const PROFILE_DATA = {
  nameBn: "মোঃ আব্দুল করিম",
  nameEn: "Md. Abdul Karim",
  nid: "1990 7268 9312 3456",
  dob: "১৫ জানুয়ারি ১৯৯০",
  dobEn: "15 January 1990",
  fatherName: "মোঃ আবুল হোসেন",
  motherName: "রহিমা বেগম",
  permanentAddress: "বাড়ি ১২, রোড ৫, ব্লক-ডি, মোহাম্মদপুর, ঢাকা-১২০৭",
  presentAddress: "ফ্ল্যাট ৪বি, বাড়ি ৩৮, রোড ১২, ধানমন্ডি, ঢাকা-১২০৫",
  mobile: "০১৭১২৩৪৫৬৭৮",
  email: "abdul.karim@email.com",
  gender: "পুরুষ",
  bloodGroup: "বি+ (B+)",
  nidVerified: true,
};

export default function CitizenProfilePage() {
  const [mobile, setMobile] = useState(PROFILE_DATA.mobile);
  const [email, setEmail] = useState(PROFILE_DATA.email);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">আমার প্রোফাইল</h1>
        <p className="text-sm text-text-secondary mt-1">
          আপনার ব্যক্তিগত তথ্য (NID থেকে যাচাইকৃত)
        </p>
      </div>

      {/* NID Verification Banner */}
      <Card className="border-green-200 bg-green-50/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-green-800">NID যাচাইকৃত</p>
              <Badge variant="success">Verified</Badge>
            </div>
            <p className="text-xs text-green-700 mt-0.5">
              আপনার পরিচয় জাতীয় পরিচয়পত্র (NID) দ্বারা যাচাই করা হয়েছে
            </p>
          </div>
        </div>
      </Card>

      {/* Personal Information (Read-only from NID) */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
            <CardDescription>NID থেকে প্রাপ্ত তথ্য - পরিবর্তনযোগ্য নয়</CardDescription>
          </div>
          <Badge variant="outline">
            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            শুধু পাঠযোগ্য
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name (Bangla) */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">নাম (বাংলা)</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.nameBn}
            </div>
          </div>

          {/* Name (English) */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">Name (English)</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.nameEn}
            </div>
          </div>

          {/* NID */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">জাতীয় পরিচয়পত্র নম্বর (NID)</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text font-mono">
              {PROFILE_DATA.nid}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">জন্ম তারিখ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.dob}
              <span className="text-text-muted ml-1">({PROFILE_DATA.dobEn})</span>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">লিঙ্গ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.gender}
            </div>
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">রক্তের গ্রুপ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.bloodGroup}
            </div>
          </div>

          {/* Father's Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">পিতার নাম</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.fatherName}
            </div>
          </div>

          {/* Mother's Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">মাতার নাম</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.motherName}
            </div>
          </div>

          {/* Permanent Address */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-sm font-medium text-text">স্থায়ী ঠিকানা</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.permanentAddress}
            </div>
          </div>

          {/* Present Address */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-sm font-medium text-text">বর্তমান ঠিকানা</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {PROFILE_DATA.presentAddress}
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Information (Editable) */}
      <Card>
        <div className="mb-4">
          <CardTitle>যোগাযোগের তথ্য</CardTitle>
          <CardDescription>এই তথ্যগুলো আপনি পরিবর্তন করতে পারবেন</CardDescription>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="মোবাইল নম্বর"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="০১XXXXXXXXX"
            hint="অ্যাপয়েন্টমেন্ট ও নোটিফিকেশনের জন্য ব্যবহৃত হবে"
          />
          <Input
            label="ইমেইল ঠিকানা"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            hint="সনদ ও গুরুত্বপূর্ণ বিজ্ঞপ্তি পাঠানো হবে"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            আপডেট করুন
          </Button>
        </div>
      </Card>
    </div>
  );
}
