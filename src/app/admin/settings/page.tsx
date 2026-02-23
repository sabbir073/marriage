"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const FEE_SCHEDULE = [
  { type: "মুসলিম বিবাহ নিবন্ধন", fee: "৫০০", category: "বিবাহ" },
  { type: "হিন্দু বিবাহ নিবন্ধন", fee: "৫০০", category: "বিবাহ" },
  { type: "বিশেষ বিবাহ নিবন্ধন", fee: "৬০০", category: "বিবাহ" },
  { type: "খ্রিস্টান বিবাহ নিবন্ধন", fee: "৫০০", category: "বিবাহ" },
  { type: "বৌদ্ধ বিবাহ নিবন্ধন", fee: "৫০০", category: "বিবাহ" },
  { type: "তালাক নিবন্ধন", fee: "৩০০", category: "তালাক" },
  { type: "সনদ পুনর্মুদ্রণ", fee: "২০০", category: "সনদ" },
  { type: "সনদ যাচাই", fee: "১০০", category: "সনদ" },
  { type: "নকলনবিশ ফি", fee: "১৫০", category: "অন্যান্য" },
];

/* ------------------------------------------------------------------ */
/*  Toggle Switch Component (local)                                    */
/* ------------------------------------------------------------------ */

function ToggleSwitch({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-border p-4">
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          checked ? "bg-primary" : "bg-gray-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">সেটিংস</h1>
        <p className="text-sm text-text-secondary mt-1">
          সিস্টেম কনফিগারেশন ও সেটিংস পরিচালনা — System Configuration & Settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardTitle className="mb-1">সাধারণ সেটিংস</CardTitle>
          <CardDescription className="mb-4">সিস্টেমের মৌলিক তথ্য পরিবর্তন করুন</CardDescription>
          <div className="space-y-4">
            <Input
              label="সিস্টেমের নাম"
              defaultValue="বাংলাদেশ বিবাহ নিবন্ধন ব্যবস্থাপনা সিস্টেম"
            />
            <Input
              label="সিস্টেমের ইংরেজি নাম"
              defaultValue="Bangladesh Marriage Registration Management System"
            />
            <Input
              label="সাপোর্ট ইমেইল"
              type="email"
              defaultValue="support@marriage.gov.bd"
            />
            <Input
              label="সাপোর্ট ফোন"
              type="tel"
              defaultValue="+৮৮০-২-৯৫৫৫৫৫৫"
            />
            <Input
              label="সিস্টেম ভার্সন"
              defaultValue="v2.1.3"
              disabled
            />
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardTitle className="mb-1">নোটিফিকেশন সেটিংস</CardTitle>
          <CardDescription className="mb-4">বিভিন্ন নোটিফিকেশন চালু/বন্ধ করুন</CardDescription>
          <div className="space-y-3">
            <ToggleSwitch
              label="SMS নোটিফিকেশন"
              description="নিবন্ধন আপডেটের জন্য SMS পাঠান"
              defaultChecked={true}
            />
            <ToggleSwitch
              label="ইমেইল নোটিফিকেশন"
              description="নিবন্ধন আপডেটের জন্য ইমেইল পাঠান"
              defaultChecked={true}
            />
            <ToggleSwitch
              label="স্বয়ংক্রিয় ব্যাকআপ"
              description="প্রতিদিন রাত ২:০০ টায় স্বয়ংক্রিয় ব্যাকআপ"
              defaultChecked={true}
            />
            <ToggleSwitch
              label="লাইসেন্স মেয়াদোত্তীর্ণ সতর্কতা"
              description="কাজী লাইসেন্স মেয়াদোত্তীর্ণ হওয়ার ৩০ দিন আগে সতর্কতা"
              defaultChecked={true}
            />
            <ToggleSwitch
              label="নিবন্ধন আপত্তি সতর্কতা"
              description="নতুন আপত্তি দাখিল হলে জেলা নিবন্ধককে সতর্কতা"
              defaultChecked={false}
            />
            <ToggleSwitch
              label="দৈনিক সারসংক্ষেপ ইমেইল"
              description="প্রতিদিন সকাল ৯:০০ টায় দৈনিক সারসংক্ষেপ ইমেইল"
              defaultChecked={false}
            />
          </div>
        </Card>
      </div>

      {/* Form Templates */}
      <Card>
        <CardTitle className="mb-1">ফর্ম টেমপ্লেট</CardTitle>
        <CardDescription className="mb-4">বিভিন্ন নিবন্ধন ফর্মের টেমপ্লেট পরিচালনা</CardDescription>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "মুসলিম বিবাহ নিবন্ধন ফর্ম (কাবিননামা)", version: "v3.2", lastUpdated: "১০ জানুয়ারি ২০২৬", status: "সক্রিয়" },
            { name: "হিন্দু বিবাহ নিবন্ধন ফর্ম", version: "v2.1", lastUpdated: "১৫ ডিসেম্বর ২০২৫", status: "সক্রিয়" },
            { name: "বিশেষ বিবাহ নিবন্ধন ফর্ম", version: "v2.0", lastUpdated: "০১ নভেম্বর ২০২৫", status: "সক্রিয়" },
            { name: "খ্রিস্টান বিবাহ নিবন্ধন ফর্ম", version: "v1.5", lastUpdated: "২০ অক্টোবর ২০২৫", status: "সক্রিয়" },
            { name: "তালাক নিবন্ধন ফর্ম", version: "v2.3", lastUpdated: "০৫ ফেব্রুয়ারি ২০২৬", status: "সক্রিয়" },
            { name: "সনদ টেমপ্লেট", version: "v4.0", lastUpdated: "২০ জানুয়ারি ২০২৬", status: "সক্রিয়" },
          ].map((template) => (
            <div
              key={template.name}
              className="rounded-[var(--radius-md)] border border-border p-4 hover:bg-surface-tertiary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{template.name}</p>
                  <p className="text-xs text-text-muted mt-1">ভার্সন: {template.version}</p>
                  <p className="text-xs text-text-muted">আপডেট: {template.lastUpdated}</p>
                </div>
                <Badge variant="success">{template.status}</Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm">দেখুন</Button>
                <Button variant="ghost" size="sm">সম্পাদনা</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Fee Schedule */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>ফি তালিকা (রেফারেন্স)</CardTitle>
            <CardDescription>সরকার নির্ধারিত ফি — শুধুমাত্র তথ্যের জন্য</CardDescription>
          </div>
          <Badge variant="info">শুধুমাত্র দেখার জন্য</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text-secondary">সেবার ধরণ</th>
                <th className="pb-2 pr-4 font-medium text-text-secondary">বিভাগ</th>
                <th className="pb-2 font-medium text-text-secondary text-right">ফি (টাকা)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {FEE_SCHEDULE.map((fee) => (
                <tr key={fee.type} className="hover:bg-surface-tertiary transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-text">{fee.type}</td>
                  <td className="py-2.5 pr-4">
                    <Badge variant="outline">{fee.category}</Badge>
                  </td>
                  <td className="py-2.5 text-right font-semibold text-text">
                    {fee.fee} ৳
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* System Notifications */}
      <Card>
        <CardTitle className="mb-4">সিস্টেম নোটিফিকেশন বার্তা</CardTitle>
        <div className="space-y-4">
          <div>
            <Input
              label="নিবন্ধন সফল SMS টেমপ্লেট"
              defaultValue="আপনার বিবাহ নিবন্ধন সফলভাবে সম্পন্ন হয়েছে। সনদ নম্বর: {CERT_NO}। বাংলাদেশ সরকার।"
            />
          </div>
          <div>
            <Input
              label="আবেদন অনুমোদন SMS টেমপ্লেট"
              defaultValue="আপনার আবেদন অনুমোদিত হয়েছে। অ্যাপয়েন্টমেন্ট তারিখ: {DATE}। স্থান: {LOCATION}।"
            />
          </div>
          <div>
            <Input
              label="তালাক ইদ্দতকাল SMS টেমপ্লেট"
              defaultValue="ইদ্দতকাল শুরু হয়েছে। সমাপ্তি তারিখ: {END_DATE}। রেফারেন্স: {REF_NO}।"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 rounded-[var(--radius-lg)] border border-border bg-white p-4 shadow-sm">
        <p className="text-sm text-text-muted flex-1">সকল পরিবর্তন সংরক্ষণ করতে বোতামে ক্লিক করুন</p>
        <Button variant="outline">বাতিল করুন</Button>
        <Button variant="primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          পরিবর্তন সংরক্ষণ করুন
        </Button>
      </div>
    </div>
  );
}
