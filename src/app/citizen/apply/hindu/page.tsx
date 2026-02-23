"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "বর ও কনের তথ্য", titleEn: "Groom & Bride" },
  { id: 2, title: "বিবাহের তথ্য ও নথি", titleEn: "Marriage & Documents" },
  { id: 3, title: "পর্যালোচনা ও জমা", titleEn: "Review & Submit" },
];

export default function CitizenHinduApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [groomName, setGroomName] = useState("");
  const [groomNid, setGroomNid] = useState("");
  const [groomDob, setGroomDob] = useState("");
  const [groomFather, setGroomFather] = useState("");
  const [groomAddress, setGroomAddress] = useState("");

  const [brideName, setBrideName] = useState("");
  const [brideNid, setBrideNid] = useState("");
  const [brideDob, setBrideDob] = useState("");
  const [brideFather, setBrideFather] = useState("");
  const [brideAddress, setBrideAddress] = useState("");

  const [marriageDate, setMarriageDate] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");
  const [rituals, setRituals] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">হিন্দু বিবাহ আবেদন জমা হয়েছে</CardTitle>
        <p className="text-green-700 mt-2">আবেদন নম্বর: <span className="font-mono font-bold">APP-H-{toBanglaDigits(2026)}-{toBanglaDigits("012")}</span></p>
        <p className="text-sm text-green-600 mt-1">হিন্দু বিবাহ নিবন্ধক আবেদনটি পর্যালোচনা করবেন।</p>
        <div className="mt-6 flex.justify-center gap-3">
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => window.location.href = "/citizen/applications"}>আমার আবেদন দেখুন</Button>
            <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন আবেদন</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">হিন্দু বিবাহ আবেদন</h1>
        <p className="text-sm text-text-secondary mt-1">হিন্দু বিবাহ নিবন্ধন আইন, ২০১২ অনুযায়ী — ঐচ্ছিক কিন্তু সুপারিশকৃত</p>
      </div>

      <Card padding="sm">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-orange-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
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
            <h3 className="text-sm font-semibold border-b border-border pb-2">বরের তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={groomName} onChange={(e) => setGroomName(e.target.value)} />
              <Input label="NID" value={groomNid} onChange={(e) => setGroomNid(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={groomDob} onChange={(e) => setGroomDob(e.target.value)} hint="ন্যূনতম ২১ বছর" />
              <Input label="পিতার নাম" value={groomFather} onChange={(e) => setGroomFather(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={groomAddress} onChange={(e) => setGroomAddress(e.target.value)} /></div>
            </div>
            <h3 className="text-sm font-semibold border-b border-border pb-2 mt-4">কনের তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={brideName} onChange={(e) => setBrideName(e.target.value)} />
              <Input label="NID" value={brideNid} onChange={(e) => setBrideNid(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={brideDob} onChange={(e) => setBrideDob(e.target.value)} hint="ন্যূনতম ১৮ বছর" />
              <Input label="পিতার নাম" value={brideFather} onChange={(e) => setBrideFather(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={brideAddress} onChange={(e) => setBrideAddress(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <Input label="বিবাহের স্থান" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">সম্পাদিত ধর্মীয় অনুষ্ঠান</label>
              <textarea className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm min-h-[80px] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="সপ্তপদী, অগ্নিসাক্ষী, সিন্দূরদান ইত্যাদি" value={rituals} onChange={(e) => setRituals(e.target.value)} />
            </div>
            <p className="text-xs text-text-muted">নথি (NID, ছবি) অ্যাপয়েন্টমেন্টের সময় জমা দিতে হবে।</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2">সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">বর:</p><p className="font-medium">{groomName || "—"}</p>
                <p className="text-text-muted">কনে:</p><p className="font-medium">{brideName || "—"}</p>
                <p className="text-text-muted">তারিখ:</p><p>{marriageDate || "—"}</p>
                <p className="text-text-muted">স্থান:</p><p>{marriagePlace || "—"}</p>
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
"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "বর ও কনের তথ্য", titleEn: "Groom & Bride" },
  { id: 2, title: "বিবাহের তথ্য ও নথি", titleEn: "Marriage & Documents" },
  { id: 3, title: "পর্যালোচনা ও জমা", titleEn: "Review & Submit" },
];

export default function CitizenHinduApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [groomName, setGroomName] = useState("");
  const [groomNid, setGroomNid] = useState("");
  const [groomDob, setGroomDob] = useState("");
  const [groomFather, setGroomFather] = useState("");
  const [groomAddress, setGroomAddress] = useState("");

  const [brideName, setBrideName] = useState("");
  const [brideNid, setBrideNid] = useState("");
  const [brideDob, setBrideDob] = useState("");
  const [brideFather, setBrideFather] = useState("");
  const [brideAddress, setBrideAddress] = useState("");

  const [marriageDate, setMarriageDate] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");
  const [rituals, setRituals] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">হিন্দু বিবাহ আবেদন জমা হয়েছে</CardTitle>
        <p className="text-green-700 mt-2">আবেদন নম্বর: <span className="font-mono font-bold">APP-H-{toBanglaDigits(2026)}-{toBanglaDigits("012")}</span></p>
        <p className="text-sm text-green-600 mt-1">হিন্দু বিবাহ নিবন্ধক আবেদনটি পর্যালোচনা করবেন।</p>
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
        <h1 className="text-2xl font-bold text-text">হিন্দু বিবাহ আবেদন</h1>
        <p className="text-sm text-text-secondary mt-1">হিন্দু বিবাহ নিবন্ধন আইন, ২০১২ অনুযায়ী — ঐচ্ছিক কিন্তু সুপারিশকৃত</p>
      </div>

      <Card padding="sm">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-orange-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
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
            <h3 className="text-sm font-semibold border-b border-border pb-2">বরের তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={groomName} onChange={(e) => setGroomName(e.target.value)} />
              <Input label="NID" value={groomNid} onChange={(e) => setGroomNid(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={groomDob} onChange={(e) => setGroomDob(e.target.value)} hint="ন্যূনতম ২১ বছর" />
              <Input label="পিতার নাম" value={groomFather} onChange={(e) => setGroomFather(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={groomAddress} onChange={(e) => setGroomAddress(e.target.value)} /></div>
            </div>
            <h3 className="text-sm font-semibold border-b border-border pb-2 mt-4">কনের তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={brideName} onChange={(e) => setBrideName(e.target.value)} />
              <Input label="NID" value={brideNid} onChange={(e) => setBrideNid(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={brideDob} onChange={(e) => setBrideDob(e.target.value)} hint="ন্যূনতম ১৮ বছর" />
              <Input label="পিতার নাম" value={brideFather} onChange={(e) => setBrideFather(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={brideAddress} onChange={(e) => setBrideAddress(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <Input label="বিবাহের স্থান" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">সম্পাদিত ধর্মীয় অনুষ্ঠান</label>
              <textarea className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm min-h-[80px] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="সপ্তপদী, অগ্নিসাক্ষী, সিন্দূরদান ইত্যাদি" value={rituals} onChange={(e) => setRituals(e.target.value)} />
            </div>
            <p className="text-xs text-text-muted">নথি (NID, ছবি) অ্যাপয়েন্টমেন্টের সময় জমা দিতে হবে।</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2">সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">বর:</p><p className="font-medium">{groomName || "—"}</p>
                <p className="text-text-muted">কনে:</p><p className="font-medium">{brideName || "—"}</p>
                <p className="text-text-muted">তারিখ:</p><p>{marriageDate || "—"}</p>
                <p className="text-text-muted">স্থান:</p><p>{marriagePlace || "—"}</p>
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
