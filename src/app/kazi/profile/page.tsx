"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/stats-card";

const KAZI_PROFILE = {
  nameBn: "মাওলানা আব্দুর রহমান",
  nameEn: "Maulana Abdur Rahman",
  licenseNo: "KR-DHK-2018-0456",
  type: "মুসলিম নিকাহ রেজিস্ট্রার",
  typeEn: "Muslim Nikah Registrar",
  appointmentDate: "১৫ মার্চ ২০১৮",
  licenseStatus: "সক্রিয়",
  licenseExpiry: "১৪ মার্চ ২০২৮",
  nid: "1985 1234 5678 9012",
  jurisdiction: {
    ward: "ওয়ার্ড ২৬",
    union: "ধানমন্ডি",
    upazila: "ঢাকা দক্ষিণ সিটি কর্পোরেশন",
    district: "ঢাকা",
    division: "ঢাকা বিভাগ",
  },
  contact: {
    mobile: "০১৭১১২২৩৩৪৪",
    email: "abdur.rahman.kazi@gov.bd",
    officeAddress: "কাজী অফিস, ধানমন্ডি ৯/এ, রোড ৫, ঢাকা-১২০৫",
  },
  stats: {
    totalRegistrations: "১,২৪৭",
    thisYear: "১৪৭",
    thisMonth: "২৮",
    pendingReview: "৫",
  },
};

export default function KaziProfilePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">কাজী প্রোফাইল</h1>
        <p className="text-sm text-text-secondary mt-1">
          আপনার নিবন্ধন ও কার্যালয়ের তথ্য
        </p>
      </div>

      {/* License Status Banner */}
      <Card className="border-green-200 bg-green-50/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-green-800">{KAZI_PROFILE.nameBn}</p>
              <p className="text-sm text-green-700">{KAZI_PROFILE.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">
              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              লাইসেন্স সক্রিয়
            </Badge>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="মোট নিবন্ধন"
          value={KAZI_PROFILE.stats.totalRegistrations}
          subtitle="সর্বমোট"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          }
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="এই বছর (২০২৬)"
          value={KAZI_PROFILE.stats.thisYear}
          subtitle="জানুয়ারি থেকে"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          }
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="এই মাস"
          value={KAZI_PROFILE.stats.thisMonth}
          subtitle="ফেব্রুয়ারি ২০২৬"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-50 text-green-600"
        />
        <StatsCard
          title="পেন্ডিং পর্যালোচনা"
          value={KAZI_PROFILE.stats.pendingReview}
          subtitle="পর্যালোচনার অপেক্ষায়"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Kazi Details */}
      <Card>
        <div className="mb-4">
          <CardTitle>কাজী তথ্য</CardTitle>
          <CardDescription>লাইসেন্স ও নিয়োগ সংক্রান্ত তথ্য</CardDescription>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">নাম (বাংলা)</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.nameBn}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">Name (English)</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.nameEn}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">লাইসেন্স নম্বর</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text font-mono">
              {KAZI_PROFILE.licenseNo}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ধরণ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.type}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">নিয়োগের তারিখ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.appointmentDate}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">লাইসেন্সের মেয়াদ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.licenseExpiry}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">NID নম্বর</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text font-mono">
              {KAZI_PROFILE.nid}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">লাইসেন্স স্ট্যাটাস</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm">
              <Badge variant="success">{KAZI_PROFILE.licenseStatus}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Jurisdiction */}
      <Card>
        <div className="mb-4">
          <CardTitle>এখতিয়ার / কার্যক্ষেত্র</CardTitle>
          <CardDescription>আপনার নিবন্ধন কার্যক্ষেত্রের এলাকাসমূহ</CardDescription>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ওয়ার্ড</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.jurisdiction.ward}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ইউনিয়ন / থানা</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.jurisdiction.union}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">উপজেলা / সিটি কর্পোরেশন</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.jurisdiction.upazila}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">জেলা</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.jurisdiction.district}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">বিভাগ</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.jurisdiction.division}
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card>
        <div className="mb-4">
          <CardTitle>যোগাযোগের তথ্য</CardTitle>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">মোবাইল নম্বর</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.contact.mobile}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ইমেইল</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.contact.email}
            </div>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-sm font-medium text-text">কার্যালয়ের ঠিকানা</label>
            <div className="block w-full rounded-[var(--radius-md)] border border-border bg-surface-tertiary px-3 py-2.5 text-sm text-text">
              {KAZI_PROFILE.contact.officeAddress}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
