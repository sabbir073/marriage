"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

interface Appointment {
  id: string;
  time: string;
  citizenName: string;
  partnerName: string;
  marriageType: string;
  phone: string;
  status: AppointmentStatus;
  date: string;
  isToday: boolean;
}

const STATUS_MAP: Record<AppointmentStatus, { label: string; variant: "warning" | "info" | "success" | "default" | "error" }> = {
  PENDING: { label: "অপেক্ষমাণ", variant: "warning" },
  CONFIRMED: { label: "নিশ্চিত", variant: "info" },
  IN_PROGRESS: { label: "চলমান", variant: "info" },
  COMPLETED: { label: "সম্পন্ন", variant: "success" },
  CANCELLED: { label: "বাতিল", variant: "error" },
};

const APPOINTMENTS: Appointment[] = [
  {
    id: "APT-2026-041",
    time: "১০:০০",
    citizenName: "মোঃ রাশেদ হোসেন",
    partnerName: "ফাতেমা খাতুন",
    marriageType: "নিকাহ",
    phone: "০১৭XXXXXXXX",
    status: "CONFIRMED",
    date: "আজ, ২৩ ফেব্রুয়ারি ২০২৬",
    isToday: true,
  },
  {
    id: "APT-2026-042",
    time: "১১:৩০",
    citizenName: "মোঃ তানভীর আহমেদ",
    partnerName: "নুসরাত জাহান",
    marriageType: "নিকাহ",
    phone: "০১৮XXXXXXXX",
    status: "PENDING",
    date: "আজ, ২৩ ফেব্রুয়ারি ২০২৬",
    isToday: true,
  },
  {
    id: "APT-2026-043",
    time: "১০:০০",
    citizenName: "মোঃ ইমরান হক",
    partnerName: "সাবরিনা আক্তার",
    marriageType: "নিকাহ",
    phone: "০১৯XXXXXXXX",
    status: "PENDING",
    date: "২৫ ফেব্রুয়ারি ২০২৬, মঙ্গলবার",
    isToday: false,
  },
  {
    id: "APT-2026-044",
    time: "১৪:০০",
    citizenName: "মোঃ শাহীন আলম",
    partnerName: "তাহমিনা রহমান",
    marriageType: "নিকাহ",
    phone: "০১৫XXXXXXXX",
    status: "CONFIRMED",
    date: "২৮ ফেব্রুয়ারি ২০২৬, শনিবার",
    isToday: false,
  },
  {
    id: "APT-2026-040",
    time: "১৫:০০",
    citizenName: "মোঃ আরিফুল ইসলাম",
    partnerName: "জান্নাতুল ফেরদৌস",
    marriageType: "নিকাহ",
    phone: "০১৬XXXXXXXX",
    status: "COMPLETED",
    date: "২২ ফেব্রুয়ারি ২০২৬, শনিবার",
    isToday: false,
  },
];

const WEEK_DAYS = [
  { day: "রবি", date: "২৩", isToday: true, count: 2 },
  { day: "সোম", date: "২৪", isToday: false, count: 0 },
  { day: "মঙ্গল", date: "২৫", isToday: false, count: 1 },
  { day: "বুধ", date: "২৬", isToday: false, count: 0 },
  { day: "বৃহঃ", date: "২৭", isToday: false, count: 0 },
  { day: "শুক্র", date: "২৮", isToday: false, count: 1 },
  { day: "শনি", date: "০১", isToday: false, count: 0 },
];

export default function KaziAppointmentsPage() {
  const todayAppointments = APPOINTMENTS.filter((a) => a.isToday);
  const upcomingAppointments = APPOINTMENTS.filter((a) => !a.isToday && a.status !== "COMPLETED");
  const pastAppointments = APPOINTMENTS.filter((a) => a.status === "COMPLETED");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা</h1>
          <p className="text-sm text-text-secondary mt-1">
            আজকের তারিখ: ২৩ ফেব্রুয়ারি ২০২৬, রবিবার
          </p>
        </div>
        <Badge variant="info">
          আজ {toBanglaDigits(todayAppointments.length)}টি অ্যাপয়েন্টমেন্ট
        </Badge>
      </div>

      {/* Weekly Calendar View */}
      <Card>
        <CardTitle className="mb-4">সাপ্তাহিক ক্যালেন্ডার</CardTitle>
        <div className="grid grid-cols-7 gap-2">
          {WEEK_DAYS.map((wd) => (
            <div
              key={wd.day}
              className={`flex flex-col items-center rounded-[var(--radius-md)] p-3 text-center transition-colors ${
                wd.isToday
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border hover:bg-surface-tertiary"
              }`}
            >
              <span className={`text-xs font-medium ${wd.isToday ? "text-white/80" : "text-text-muted"}`}>
                {wd.day}
              </span>
              <span className={`text-lg font-bold mt-1 ${wd.isToday ? "text-white" : "text-text"}`}>
                {wd.date}
              </span>
              {wd.count > 0 && (
                <span className={`mt-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium ${
                  wd.isToday
                    ? "bg-white/20 text-white"
                    : "bg-primary-50 text-primary"
                }`}>
                  {toBanglaDigits(wd.count)}
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Today's Appointments */}
      {todayAppointments.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CardTitle>আজকের অ্যাপয়েন্টমেন্ট</CardTitle>
            <Badge variant="warning">{toBanglaDigits(todayAppointments.length)}টি</Badge>
          </div>
          {todayAppointments.map((apt) => {
            const statusInfo = STATUS_MAP[apt.status];
            return (
              <Card key={apt.id} className="border-amber-200 bg-amber-50/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Time */}
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary text-white text-lg font-bold shadow-sm">
                    {apt.time}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-text-muted">{apt.id}</span>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      <Badge variant="outline">{apt.marriageType}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-text">
                      {apt.citizenName} &#8596; {apt.partnerName}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      যোগাযোগ: {apt.phone}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2">
                    {apt.status === "PENDING" && (
                      <Button size="sm" variant="primary">
                        নিশ্চিত করুন
                      </Button>
                    )}
                    {apt.status === "CONFIRMED" && (
                      <Button size="sm" variant="primary">
                        শুরু করুন
                      </Button>
                    )}
                    {apt.status === "IN_PROGRESS" && (
                      <Button size="sm" variant="secondary">
                        সম্পন্ন করুন
                      </Button>
                    )}
                    <Button size="sm" variant="danger">
                      বাতিল
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="space-y-3">
          <CardTitle>আসন্ন অ্যাপয়েন্টমেন্ট</CardTitle>
          {upcomingAppointments.map((apt) => {
            const statusInfo = STATUS_MAP[apt.status];
            return (
              <Card key={apt.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Time */}
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-blue-50 text-blue-700 text-lg font-bold">
                    {apt.time}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-text-muted">{apt.id}</span>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      <Badge variant="outline">{apt.marriageType}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-text">
                      {apt.citizenName} &#8596; {apt.partnerName}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {apt.date} | যোগাযোগ: {apt.phone}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2">
                    {apt.status === "PENDING" && (
                      <Button size="sm" variant="primary">
                        নিশ্চিত করুন
                      </Button>
                    )}
                    {apt.status === "CONFIRMED" && (
                      <Button size="sm" variant="outline">
                        পুনঃনির্ধারণ
                      </Button>
                    )}
                    <Button size="sm" variant="danger">
                      বাতিল
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Past/Completed Appointments */}
      {pastAppointments.length > 0 && (
        <div className="space-y-3">
          <CardTitle>সম্পন্ন অ্যাপয়েন্টমেন্ট</CardTitle>
          {pastAppointments.map((apt) => {
            const statusInfo = STATUS_MAP[apt.status];
            return (
              <Card key={apt.id} className="opacity-80">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Time */}
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-green-50 text-green-700 text-lg font-bold">
                    {apt.time}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-text-muted">{apt.id}</span>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-text">
                      {apt.citizenName} &#8596; {apt.partnerName}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {apt.date}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
