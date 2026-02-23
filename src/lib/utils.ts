import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert English digits to Bangla digits */
export function toBanglaDigits(num: string | number): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]);
}

/** Format date in Bangla */
export function formatDateBn(date: Date): string {
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  return `${toBanglaDigits(d)} ${months[m]} ${toBanglaDigits(y)}`;
}

/** Marriage type labels in Bangla and English */
export const MARRIAGE_TYPES = {
  MUSLIM: { bn: "মুসলিম বিবাহ", en: "Muslim Marriage" },
  HINDU: { bn: "হিন্দু বিবাহ", en: "Hindu Marriage" },
  SPECIAL: { bn: "বিশেষ বিবাহ", en: "Special Marriage" },
  CHRISTIAN: { bn: "খ্রিস্টান বিবাহ", en: "Christian Marriage" },
  BUDDHIST: { bn: "বৌদ্ধ বিবাহ", en: "Buddhist Marriage" },
  OTHER: { bn: "অন্যান্য বিবাহ", en: "Other Marriage" },
} as const;

/** User roles */
export const ROLES = {
  CITIZEN: "CITIZEN",
  KAZI: "KAZI",
  DISTRICT_REGISTRAR: "DISTRICT_REGISTRAR",
  MINISTRY_ADMIN: "MINISTRY_ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

/** Application status labels */
export const STATUS_LABELS = {
  DRAFT: { bn: "খসড়া", en: "Draft", color: "text-text-muted" },
  SUBMITTED: { bn: "জমা দেওয়া হয়েছে", en: "Submitted", color: "text-info" },
  UNDER_REVIEW: { bn: "পর্যালোচনাধীন", en: "Under Review", color: "text-warning" },
  DOCUMENTS_REQUESTED: { bn: "নথি প্রয়োজন", en: "Documents Requested", color: "text-warning" },
  APPOINTMENT_SET: { bn: "অ্যাপয়েন্টমেন্ট নির্ধারিত", en: "Appointment Set", color: "text-info" },
  REGISTERED: { bn: "নিবন্ধিত", en: "Registered", color: "text-success" },
  COMPLETED: { bn: "সম্পন্ন", en: "Completed", color: "text-success" },
  REJECTED: { bn: "প্রত্যাখ্যাত", en: "Rejected", color: "text-error" },
} as const;
