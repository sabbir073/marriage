"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "পক্ষ ১ ও ২", titleEn: "Both Parties" },
  { id: 2, title: "বিবাহের তথ্য", titleEn: "Marriage Details" },
  { id: 3, title: "পর্যালোচনা ও জমা", titleEn: "Review & Submit" },
];

export default function CitizenBuddhistApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [p1Name, setP1Name] = useState("");
  const [p1Nid, setP1Nid] = useState("");
  const [p1Dob, setP1Dob] = useState("");
  const [p1FatherName, setP1FatherName] = useState("");
  const [p1Address, setP1Address] = useState("");

  const [p2Name, setP2Name] = useState("");
  const [p2Nid, setP2Nid] = useState("");
  const [p2Dob, setP2Dob] = useState("");
  const [p2FatherName, setP2FatherName] = useState("");
  const [p2Address, setP2Address] = useState("");

  const [marriageDate, setMarriageDate] = useState("");
  const [viharaName, setViharaName] = useState("");
  const [monkName, setMonkName] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");
  const [preferredDistrict, setPreferredDistrict] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">বৌদ্ধ বিবাহ আবেদন জমা হয়েছে</CardTitle>
        <p className="text-green-700 mt-2">আবেদন নম্বর: <span className="font-mono font-bold">APP-B-{toBanglaDigits(2026)}-{toBanglaDigits("003")}</span></p>
        <p className="text-sm text-green-600 mt-1">১৪ দিনের নোটিশ প্রক্রিয়া শুরু হবে নিবন্ধকের অনুমোদনের পর।</p>
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
        <h1 className="text-2xl font-bold text-text">বৌদ্ধ বিবাহ আবেদন</h1>
        <p className="text-sm text-text-secondary mt-1">বিশেষ বিবাহ আইন, ১৮৭২ এর আওতায়</p>
      </div>

      <div className="rounded-[var(--radius-md)] border-2 border-amber-300 bg-amber-50 p-3 text-sm text-amber-700">
        বাংলাদেশে পৃথক বৌদ্ধ বিবাহ আইন না থাকায় বিশেষ বিবাহ আইন, ১৮৭২ অনুযায়ী আবেদন করতে হয়। ১৪ দিনের নোটিশ প্রযোজ্য।
      </div>

      <Card padding="sm">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-amber-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
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
              <Input label="জন্ম তারিখ" type="date" value={p1Dob} onChange={(e) => setP1Dob(e.target.value)} />
              <Input label="পিতার নাম" value={p1FatherName} onChange={(e) => setP1FatherName(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={p1Address} onChange={(e) => setP1Address(e.target.value)} /></div>
            </div>
            <h3 className="text-sm font-semibold border-b border-border pb-2 mt-4">পক্ষ ২</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={p2Name} onChange={(e) => setP2Name(e.target.value)} />
              <Input label="NID" value={p2Nid} onChange={(e) => setP2Nid(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={p2Dob} onChange={(e) => setP2Dob(e.target.value)} />
              <Input label="পিতার নাম" value={p2FatherName} onChange={(e) => setP2FatherName(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={p2Address} onChange={(e) => setP2Address(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <Input label="বিহার/মন্দিরের নাম" value={viharaName} onChange={(e) => setViharaName(e.target.value)} />
              <Input label="ভিক্ষুর নাম" value={monkName} onChange={(e) => setMonkName(e.target.value)} />
              <Input label="বিবাহের স্থান" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
            </div>
            <Input label="নোটিশ দাখিলের জেলা" placeholder="যে জেলায় নোটিশ দাখিল করতে চান" value={preferredDistrict} onChange={(e) => setPreferredDistrict(e.target.value)} />
            <p className="text-xs text-text-muted">নথি (NID, ছবি) অ্যাপয়েন্টমেন্টের সময় জমা দিতে হবে।</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2">সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">পক্ষ ১:</p><p className="font-medium">{p1Name || "—"}</p>
                <p className="text-text-muted">পক্ষ ২:</p><p className="font-medium">{p2Name || "—"}</p>
                <p className="text-text-muted">তারিখ:</p><p>{marriageDate || "—"}</p>
                <p className="text-text-muted">বিহার/মন্দির:</p><p>{viharaName || "—"}</p>
                <p className="text-text-muted">স্থান:</p><p>{marriagePlace || "—"}</p>
                <p className="text-text-muted">জেলা:</p><p>{preferredDistrict || "—"}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 1}>পূর্ববর্তী</Button>
          {step < STEPS.length ? <Button onClick={next}>পরবর্তী</Button> : <Button onClick={() => setSubmitted(true)}>আবেদন জমা দিন</Button>}
        </div>
      </Card>
    </div>
  );
}
