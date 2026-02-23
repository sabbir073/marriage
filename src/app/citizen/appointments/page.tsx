"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const APPOINTMENT_STATUS: Record<string, { label: string; variant: "success" | "info" | "error" | "default" }> = {
  UPCOMING: { label: "আসন্ন", variant: "info" },
  COMPLETED: { label: "সম্পন্ন", variant: "success" },
  CANCELLED: { label: "বাতিল", variant: "error" },
};

const APPOINTMENTS = [
  {
    id: "APT-2026-018",
    date: "২৮",
    month: "ফেব্রুয়ারি",
    year: "২০২৬",
    day: "শনিবার",
    time: "১০:০০ - ১১:০০",
    kaziName: "মাওলানা আব্দুর রহমান",
    location: "ধানমন্ডি কাজী অফিস, ঢাকা",
    purpose: "নিকাহ নিবন্ধন",
    applicationId: "APP-2026-032",
    partnerName: "নুসরাত জাহান",
    status: "UPCOMING",
  },
  {
    id: "APT-2026-012",
    date: "০৫",
    month: "ফেব্রুয়ারি",
    year: "২০২৬",
    day: "বৃহস্পতিবার",
    time: "১১:৩০ - ১২:৩০",
    kaziName: "মাওলানা আব্দুর রহমান",
    location: "ধানমন্ডি কাজী অফিস, ঢাকা",
    purpose: "নিকাহ নিবন্ধন",
    applicationId: "APP-2026-018",
    partnerName: "সাবিহা আক্তার",
    status: "COMPLETED",
  },
  {
    id: "APT-2025-089",
    date: "১০",
    month: "ডিসেম্বর",
    year: "২০২৫",
    day: "বুধবার",
    time: "১৪:০০ - ১৫:০০",
    kaziName: "মাওলানা জাকির হোসেন",
    location: "মিরপুর কাজী অফিস, ঢাকা",
    purpose: "নিকাহ নিবন্ধন",
    applicationId: "APP-2025-176",
    partnerName: "রুমানা ইসলাম",
    status: "CANCELLED",
  },
];

export default function CitizenAppointmentsPage() {
  const upcoming = APPOINTMENTS.filter((a) => a.status === "UPCOMING");
  const past = APPOINTMENTS.filter((a) => a.status !== "UPCOMING");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">অ্যাপয়েন্টমেন্ট</h1>
        <p className="text-sm text-text-secondary mt-1">
          আপনার বিবাহ নিবন্ধন সংক্রান্ত অ্যাপয়েন্টমেন্টসমূহ
        </p>
      </div>

      {/* Upcoming Appointments */}
      {upcoming.length > 0 && (
        <div className="space-y-4">
          <CardTitle>আসন্ন অ্যাপয়েন্টমেন্ট</CardTitle>
          {upcoming.map((apt) => {
            const statusInfo = APPOINTMENT_STATUS[apt.status];
            return (
              <Card key={apt.id} className="border-blue-200 bg-blue-50/30">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Calendar Date Display */}
                  <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[var(--radius-lg)] bg-primary text-white shadow-sm">
                    <span className="text-2xl font-bold leading-none">{apt.date}</span>
                    <span className="text-xs mt-1">{apt.month}</span>
                    <span className="text-[10px] opacity-80">{apt.day}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      <span className="text-xs font-mono text-text-muted">{apt.id}</span>
                    </div>

                    <p className="text-base font-semibold text-text">{apt.purpose}</p>
                    <p className="text-sm text-text-secondary mt-0.5">
                      অংশীদার: {apt.partnerName}
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>সময়: {apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span>কাজী: {apt.kaziName}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-text-secondary sm:col-span-2">
                        <svg className="h-4 w-4 shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>স্থান: {apt.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                      <span>আবেদন নং: {apt.applicationId}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Past Appointments */}
      {past.length > 0 && (
        <div className="space-y-4">
          <CardTitle>পূর্ববর্তী অ্যাপয়েন্টমেন্ট</CardTitle>
          {past.map((apt) => {
            const statusInfo = APPOINTMENT_STATUS[apt.status];
            return (
              <Card key={apt.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Calendar Date Display */}
                  <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[var(--radius-lg)] shadow-sm ${
                    apt.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    <span className="text-2xl font-bold leading-none">{apt.date}</span>
                    <span className="text-xs mt-1">{apt.month}</span>
                    <span className="text-[10px] opacity-70">{apt.day}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      <span className="text-xs font-mono text-text-muted">{apt.id}</span>
                    </div>

                    <p className="text-base font-semibold text-text">{apt.purpose}</p>
                    <p className="text-sm text-text-secondary mt-0.5">
                      অংশীদার: {apt.partnerName}
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>সময়: {apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span>কাজী: {apt.kaziName}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-text-secondary sm:col-span-2">
                        <svg className="h-4 w-4 shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>স্থান: {apt.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                      <span>আবেদন নং: {apt.applicationId}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info Note */}
      <Card className="border-amber-200 bg-amber-50/50">
        <div className="flex gap-3">
          <svg className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">গুরুত্বপূর্ণ তথ্য</p>
            <p className="text-sm text-amber-700 mt-1">
              অনুগ্রহ করে নির্ধারিত সময়ের ১৫ মিনিট আগে কাজী অফিসে উপস্থিত হন।
              প্রয়োজনীয় সকল মূল কাগজপত্র (NID, জন্মসনদ, ছবি) সাথে আনুন।
              অ্যাপয়েন্টমেন্ট পরিবর্তন বা বাতিল করতে কমপক্ষে ২৪ ঘণ্টা আগে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
