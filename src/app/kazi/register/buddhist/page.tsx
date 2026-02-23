"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "পক্ষ ১", titleEn: "Party 1" },
  { id: 2, title: "পক্ষ ২", titleEn: "Party 2" },
  { id: 3, title: "নোটিশ ও বিবাহ", titleEn: "Notice & Marriage" },
  { id: 4, title: "সাক্ষী ও পর্যালোচনা", titleEn: "Witnesses & Review" },
];

export default function BuddhistMarriageFormPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [p1Name, setP1Name] = useState("");
  const [p1NameEn, setP1NameEn] = useState("");
  const [p1FatherName, setP1FatherName] = useState("");
  const [p1Nid, setP1Nid] = useState("");
  const [p1Dob, setP1Dob] = useState("");
  const [p1Address, setP1Address] = useState("");

  const [p2Name, setP2Name] = useState("");
  const [p2NameEn, setP2NameEn] = useState("");
  const [p2FatherName, setP2FatherName] = useState("");
  const [p2Nid, setP2Nid] = useState("");
  const [p2Dob, setP2Dob] = useState("");
  const [p2Address, setP2Address] = useState("");

  const [noticeDate, setNoticeDate] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");
  const [viharaName, setViharaName] = useState("");
  const [monkName, setMonkName] = useState("");

  const [w1Name, setW1Name] = useState("");
  const [w2Name, setW2Name] = useState("");
  const [w3Name, setW3Name] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">বৌদ্ধ বিবাহ নিবন্ধন সফল</CardTitle>
        <p className="text-green-700 mt-2">নিবন্ধন নম্বর: <span className="font-mono font-bold">BMR-DHK-{toBanglaDigits(2026)}-{toBanglaDigits("000012")}</span></p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>সনদ ডাউনলোড</Button>
          <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন নিবন্ধন</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">বৌদ্ধ বিবাহ নিবন্ধন</h1>
        <p className="text-sm text-text-secondary mt-1">বিশেষ বিবাহ আইন, ১৮৭২ এর আওতায়</p>
      </div>

      <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
        বাংলাদেশে পৃথক বৌদ্ধ বিবাহ আইন না থাকায় বিশেষ বিবাহ আইন, ১৮৭২ অনুযায়ী নিবন্ধন করা হয়। ১৪ দিনের নোটিশ প্রযোজ্য।
      </div>

      <Card padding="sm">
        <div className="flex items-center overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-amber-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${step === s.id ? "bg-white/20" : step > s.id ? "bg-green-200" : "bg-border"}`}>
                  {step > s.id ? "✓" : toBanglaDigits(s.id)}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && <div className={`mx-1 h-px w-4 sm:w-8 ${step > s.id ? "bg-green-300" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="warning">ধাপ {toBanglaDigits(step)}/{toBanglaDigits(STEPS.length)}</Badge>
          <CardTitle>{STEPS[step - 1].title}</CardTitle>
        </div>
        <CardDescription className="mb-6">{STEPS[step - 1].titleEn}</CardDescription>

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-amber-300 bg-amber-50/30 p-4">
              <div className="flex gap-3">
                <Input label="NID নম্বর" value={p1Nid} onChange={(e) => setP1Nid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={p1Name} onChange={(e) => setP1Name(e.target.value)} />
              <Input label="Name (English)" value={p1NameEn} onChange={(e) => setP1NameEn(e.target.value)} />
              <Input label="পিতার নাম" value={p1FatherName} onChange={(e) => setP1FatherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={p1Dob} onChange={(e) => setP1Dob(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={p1Address} onChange={(e) => setP1Address(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-amber-300 bg-amber-50/30 p-4">
              <div className="flex gap-3">
                <Input label="NID নম্বর" value={p2Nid} onChange={(e) => setP2Nid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={p2Name} onChange={(e) => setP2Name(e.target.value)} />
              <Input label="Name (English)" value={p2NameEn} onChange={(e) => setP2NameEn(e.target.value)} />
              <Input label="পিতার নাম" value={p2FatherName} onChange={(e) => setP2FatherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={p2Dob} onChange={(e) => setP2Dob(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={p2Address} onChange={(e) => setP2Address(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নোটিশের তারিখ" type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} hint="১৪ দিনের নোটিশ বাধ্যতামূলক" />
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <Input label="বিহার/মন্দিরের নাম" placeholder="বিহার বা বৌদ্ধ মন্দিরের নাম" value={viharaName} onChange={(e) => setViharaName(e.target.value)} />
              <Input label="বিবাহ সম্পাদনকারী ভিক্ষু" placeholder="ভিক্ষুর নাম" value={monkName} onChange={(e) => setMonkName(e.target.value)} />
              <div className="sm:col-span-2">
                <Input label="বিবাহের স্থান" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              ৩ জন সাক্ষী প্রয়োজন (বিশেষ বিবাহ আইন অনুযায়ী)
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input label="সাক্ষী ১ নাম" value={w1Name} onChange={(e) => setW1Name(e.target.value)} />
              <Input label="সাক্ষী ২ নাম" value={w2Name} onChange={(e) => setW2Name(e.target.value)} />
              <Input label="সাক্ষী ৩ নাম" value={w3Name} onChange={(e) => setW3Name(e.target.value)} />
            </div>

            {/* Quick Review */}
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-3">সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">পক্ষ ১:</p><p className="font-medium">{p1Name || "—"}</p>
                <p className="text-text-muted">পক্ষ ২:</p><p className="font-medium">{p2Name || "—"}</p>
                <p className="text-text-muted">তারিখ:</p><p>{marriageDate || "—"}</p>
                <p className="text-text-muted">বিহার:</p><p>{viharaName || "—"}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 1}>পূর্ববর্তী</Button>
          <p className="text-xs text-text-muted">ধাপ {toBanglaDigits(step)} / {toBanglaDigits(STEPS.length)}</p>
          {step < STEPS.length ? <Button onClick={next}>পরবর্তী</Button> : <Button onClick={() => setSubmitted(true)}>নিবন্ধন সম্পন্ন করুন</Button>}
        </div>
      </Card>

      <p className="text-center text-xs text-text-muted">বিশেষ বিবাহ আইন, ১৮৭২ (Act III of 1872)</p>
    </div>
  );
}
