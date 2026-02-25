"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "উভয় পক্ষের তথ্য", titleEn: "Both Parties" },
  { id: 2, title: "পর্যালোচনা ও জমা", titleEn: "Review & Submit" },
];

const RELIGION_OPTS = [
  { value: "", label: "নির্বাচন" },
  { value: "ইসলাম", label: "ইসলাম" },
  { value: "হিন্দু", label: "হিন্দু" },
  { value: "খ্রিস্টান", label: "খ্রিস্টান" },
  { value: "বৌদ্ধ", label: "বৌদ্ধ" },
  { value: "শিখ", label: "শিখ" },
  { value: "জৈন", label: "জৈন" },
  { value: "বাহাই", label: "বাহাই" },
  { value: "অন্যান্য", label: "অন্যান্য" },
];

export default function CitizenOtherApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [p1Name, setP1Name] = useState("");
  const [p1Nid, setP1Nid] = useState("");
  const [p1Religion, setP1Religion] = useState("");

  const [p2Name, setP2Name] = useState("");
  const [p2Nid, setP2Nid] = useState("");
  const [p2Religion, setP2Religion] = useState("");

  const [preferredDistrict, setPreferredDistrict] = useState("");

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">বিবাহ আবেদন জমা হয়েছে</CardTitle>
        <p className="text-green-700 mt-2">বিশেষ বিবাহ নিবন্ধক আবেদনটি পর্যালোচনা করবেন।</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => window.location.href = "/citizen/applications"}>আমার আবেদন দেখুন</Button>
          <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন আবেদন</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">অন্যান্য ধর্মের বিবাহ আবেদন</h1>
        <p className="text-sm text-text-secondary mt-1">বিশেষ বিবাহ আইন, ১৮৭২ এর আওতায়</p>
      </div>

      <Card padding="sm">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-slate-700 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
                {step > s.id ? "✓" : toBanglaDigits(s.id)} <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && <div className={`mx-1 h-px w-6 ${step > s.id ? "bg-green-300" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">{STEPS[step - 1].title}</CardTitle>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold border-b border-border pb-2">পক্ষ ১</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={p1Name} onChange={(e) => setP1Name(e.target.value)} />
              <Input label="NID" value={p1Nid} onChange={(e) => setP1Nid(e.target.value)} />
              <Select label="ধর্ম" options={RELIGION_OPTS} value={p1Religion} onChange={(e) => setP1Religion(e.target.value)} />
            </div>
            <h3 className="text-sm font-semibold border-b border-border pb-2 mt-4">পক্ষ ২</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={p2Name} onChange={(e) => setP2Name(e.target.value)} />
              <Input label="NID" value={p2Nid} onChange={(e) => setP2Nid(e.target.value)} />
              <Select label="ধর্ম" options={RELIGION_OPTS} value={p2Religion} onChange={(e) => setP2Religion(e.target.value)} />
            </div>
            <Input label="পছন্দের জেলা (নোটিশ দাখিলের জন্য)" placeholder="যে জেলায় আবেদন করতে চান" value={preferredDistrict} onChange={(e) => setPreferredDistrict(e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2">সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">পক্ষ ১:</p><p className="font-medium">{p1Name || "—"} ({p1Religion || "—"})</p>
                <p className="text-text-muted">পক্ষ ২:</p><p className="font-medium">{p2Name || "—"} ({p2Religion || "—"})</p>
                <p className="text-text-muted">জেলা:</p><p>{preferredDistrict || "—"}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={() => setStep(1)} disabled={step === 1}>পূর্ববর্তী</Button>
          {step === 1 ? <Button onClick={() => setStep(2)}>পরবর্তী</Button> : <Button onClick={() => setSubmitted(true)}>আবেদন জমা দিন</Button>}
        </div>
      </Card>
    </div>
  );
}
