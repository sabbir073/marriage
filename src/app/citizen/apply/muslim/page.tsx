"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "বরের তথ্য", titleEn: "Groom Info" },
  { id: 2, title: "কনের তথ্য", titleEn: "Bride Info" },
  { id: 3, title: "বিবাহের তথ্য", titleEn: "Marriage Info" },
  { id: 4, title: "দেনমোহর ও শর্তাবলী", titleEn: "Dower & Conditions" },
  { id: 5, title: "নথি আপলোড", titleEn: "Documents" },
  { id: 6, title: "পর্যালোচনা ও জমা", titleEn: "Review & Submit" },
];

const MARITAL_STATUS = [
  { value: "", label: "নির্বাচন করুন" },
  { value: "unmarried", label: "অবিবাহিত" },
  { value: "divorced", label: "তালাকপ্রাপ্ত" },
  { value: "widowed", label: "বিধবা/বিপত্নীক" },
];

export default function CitizenMuslimApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [groomName, setGroomName] = useState("");
  const [groomNid, setGroomNid] = useState("");
  const [groomDob, setGroomDob] = useState("");
  const [groomFather, setGroomFather] = useState("");
  const [groomMother, setGroomMother] = useState("");
  const [groomAddress, setGroomAddress] = useState("");
  const [groomOccupation, setGroomOccupation] = useState("");
  const [groomMaritalStatus, setGroomMaritalStatus] = useState("");

  const [brideName, setBrideName] = useState("");
  const [brideNid, setBrideNid] = useState("");
  const [brideDob, setBrideDob] = useState("");
  const [brideFather, setBrideFather] = useState("");
  const [brideMother, setBrideMother] = useState("");
  const [brideAddress, setBrideAddress] = useState("");
  const [brideMaritalStatus, setBrideMaritalStatus] = useState("");

  const [marriageDate, setMarriageDate] = useState("");
  const [preferredKaziArea, setPreferredKaziArea] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");

  const [dowerTotal, setDowerTotal] = useState("");
  const [dowerMujjal, setDowerMujjal] = useState("");
  const [dowerMuwajjal, setDowerMuwajjal] = useState("");
  const [talaqTafweez, setTalaqTafweez] = useState("");
  const [specialConditions, setSpecialConditions] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSaveDraft = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
          <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <CardTitle className="text-green-800 text-xl">আবেদন সফলভাবে জমা হয়েছে!</CardTitle>
          <p className="text-green-700 mt-2">
            আবেদন নম্বর: <span className="font-mono font-bold">APP-{toBanglaDigits(2026)}-{toBanglaDigits("046")}</span>
          </p>
          <p className="text-sm text-green-600 mt-2">
            আপনার এলাকার কাজী আবেদনটি পর্যালোচনা করবেন। অনুমোদনের পর অ্যাপয়েন্টমেন্টের তারিখ জানানো হবে।
          </p>
          <div className="mt-4 rounded-[var(--radius-md)] border border-green-200 bg-white p-3 max-w-md mx-auto">
            <p className="text-xs text-text-muted">পরবর্তী পদক্ষেপ:</p>
            <ol className="mt-1 text-sm text-text space-y-1 text-left">
              <li>১. কাজী আবেদন পর্যালোচনা করবেন</li>
              <li>২. প্রয়োজনে অতিরিক্ত নথি চাইতে পারেন</li>
              <li>৩. অনুমোদিত হলে অ্যাপয়েন্টমেন্টের তারিখ নির্ধারণ</li>
              <li>৪. নির্ধারিত তারিখে কাজীর কাছে স্বাক্ষর প্রদান</li>
            </ol>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => window.location.href = "/citizen/applications"}>আমার আবেদন দেখুন</Button>
            <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন আবেদন</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">মুসলিম বিবাহ আবেদন</h1>
          <p className="text-sm text-text-secondary mt-1">অনলাইনে নিকাহনামার আবেদন জমা দিন — কাজী অনুমোদনের পর নিবন্ধন সম্পন্ন হবে</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleSaveDraft} disabled={saving}>
          {saving ? "সংরক্ষণ হচ্ছে..." : "খসড়া সংরক্ষণ"}
        </Button>
      </div>

      <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 flex items-start gap-2 text-sm text-blue-700">
        <svg className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p>অনলাইন আবেদন ঐচ্ছিক। আপনি সরাসরি কাজীর কাছেও যেতে পারেন। অনলাইনে আবেদন করলে কাজী পর্যালোচনা করে অ্যাপয়েন্টমেন্ট দিবেন।</p>
      </div>

      <Card padding="sm">
        <div className="flex items-center overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${step === s.id ? "bg-primary text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${step === s.id ? "bg-white/20" : step > s.id ? "bg-green-200" : "bg-border"}`}>
                  {step > s.id ? "✓" : toBanglaDigits(s.id)}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && <div className={`mx-1 h-px w-4 sm:w-6 ${step > s.id ? "bg-green-300" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="info">ধাপ {toBanglaDigits(step)}/{toBanglaDigits(STEPS.length)}</Badge>
          <CardTitle>{STEPS[step - 1].title}</CardTitle>
        </div>
        <CardDescription className="mb-6">{STEPS[step - 1].titleEn}</CardDescription>

        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="বরের নাম (বাংলা)" value={groomName} onChange={(e) => setGroomName(e.target.value)} />
            <Input label="NID নম্বর" value={groomNid} onChange={(e) => setGroomNid(e.target.value)} />
            <Input label="জন্ম তারিখ" type="date" value={groomDob} onChange={(e) => setGroomDob(e.target.value)} hint="বয়স ন্যূনতম ২১ বছর" />
            <Input label="পেশা" value={groomOccupation} onChange={(e) => setGroomOccupation(e.target.value)} />
            <Input label="পিতার নাম" value={groomFather} onChange={(e) => setGroomFather(e.target.value)} />
            <Input label="মাতার নাম" value={groomMother} onChange={(e) => setGroomMother(e.target.value)} />
            <Select label="বৈবাহিক অবস্থা" options={MARITAL_STATUS} value={groomMaritalStatus} onChange={(e) => setGroomMaritalStatus(e.target.value)} />
            <div />
            <div className="sm:col-span-2"><Input label="স্থায়ী ঠিকানা" value={groomAddress} onChange={(e) => setGroomAddress(e.target.value)} /></div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="কনের নাম (বাংলা)" value={brideName} onChange={(e) => setBrideName(e.target.value)} />
            <Input label="NID নম্বর" value={brideNid} onChange={(e) => setBrideNid(e.target.value)} />
            <Input label="জন্ম তারিখ" type="date" value={brideDob} onChange={(e) => setBrideDob(e.target.value)} hint="বয়স ন্যূনতম ১৮ বছর" />
            <Select label="বৈবাহিক অবস্থা" options={[...MARITAL_STATUS.slice(0, 1), { value: "kumari", label: "কুমারী" }, ...MARITAL_STATUS.slice(2)]} value={brideMaritalStatus} onChange={(e) => setBrideMaritalStatus(e.target.value)} />
            <Input label="পিতার নাম" value={brideFather} onChange={(e) => setBrideFather(e.target.value)} />
            <Input label="মাতার নাম" value={brideMother} onChange={(e) => setBrideMother(e.target.value)} />
            <div className="sm:col-span-2"><Input label="স্থায়ী ঠিকানা" value={brideAddress} onChange={(e) => setBrideAddress(e.target.value)} /></div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="প্রস্তাবিত বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} hint="কাজী তারিখ পরিবর্তন করতে পারেন" />
            <Input label="বিবাহের স্থান" placeholder="বাড়ি/হল/মসজিদ — এলাকা" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
            <div className="sm:col-span-2">
              <Input label="পছন্দের কাজী এলাকা" placeholder="কোন এলাকার কাজীর কাছে নিবন্ধন করতে চান" value={preferredKaziArea} onChange={(e) => setPreferredKaziArea(e.target.value)} hint="আপনার এলাকার কাজী স্বয়ংক্রিয়ভাবে নির্ধারিত হবে" />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="মোট দেনমোহর (টাকা)" value={dowerTotal} onChange={(e) => setDowerTotal(e.target.value)} />
              <div />
              <Input label="নগদ (মুয়াজ্জল)" value={dowerMujjal} onChange={(e) => setDowerMujjal(e.target.value)} />
              <Input label="বাকি (মুওয়াজ্জল)" value={dowerMuwajjal} onChange={(e) => setDowerMuwajjal(e.target.value)} />
            </div>
            <Select label="তালাক-ই-তাওফিজ (স্ত্রীকে তালাকের ক্ষমতা)" options={[{ value: "", label: "নির্বাচন করুন" }, { value: "yes", label: "হ্যাঁ" }, { value: "no", label: "না" }]} value={talaqTafweez} onChange={(e) => setTalaqTafweez(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">বিশেষ শর্তাবলী (ঐচ্ছিক)</label>
              <textarea className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm min-h-[60px] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="উভয় পক্ষের সম্মত শর্তাবলী (যদি থাকে)" value={specialConditions} onChange={(e) => setSpecialConditions(e.target.value)} />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              প্রয়োজনীয় নথি আপলোড করুন। কাজী পর্যালোচনার সময় অতিরিক্ত নথি চাইতে পারেন।
            </div>
            {[
              { label: "বরের NID স্ক্যান কপি (সামনে)", required: true },
              { label: "বরের NID স্ক্যান কপি (পিছনে)", required: true },
              { label: "কনের NID স্ক্যান কপি (সামনে)", required: true },
              { label: "কনের NID স্ক্যান কপি (পিছনে)", required: true },
              { label: "বরের পাসপোর্ট সাইজ ছবি", required: true },
              { label: "কনের পাসপোর্ট সাইজ ছবি", required: true },
              { label: "পূর্ববর্তী তালাকনামা (প্রযোজ্য হলে)", required: false },
              { label: "সালিশ কাউন্সিলের অনুমতি (বিদ্যমান স্ত্রী থাকলে)", required: false },
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-surface-tertiary text-text-muted">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">
                    {doc.label}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </p>
                  <p className="text-xs text-text-muted">JPG, PNG বা PDF — সর্বোচ্চ ২MB</p>
                </div>
                <Button variant="outline" size="sm">আপলোড</Button>
              </div>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              সকল তথ্য যাচাই করুন। আবেদন জমা দেওয়ার পর কাজী পর্যালোচনা করবেন এবং অ্যাপয়েন্টমেন্ট নির্ধারণ করবেন।
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">বরের তথ্য</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="font-medium">{groomName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">NID:</dt><dd className="font-mono">{groomNid || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পিতা:</dt><dd>{groomFather || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">কনের তথ্য</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="font-medium">{brideName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">NID:</dt><dd className="font-mono">{brideNid || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পিতা:</dt><dd>{brideFather || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">বিবাহের তথ্য</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">তারিখ:</dt><dd>{marriageDate || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">স্থান:</dt><dd>{marriagePlace || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">এলাকা:</dt><dd>{preferredKaziArea || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">দেনমোহর</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">মোট:</dt><dd className="font-semibold">৳ {dowerTotal || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">নগদ:</dt><dd>৳ {dowerMujjal || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">বাকি:</dt><dd>৳ {dowerMuwajjal || "—"}</dd></div>
                </dl>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 1}>পূর্ববর্তী</Button>
          <p className="text-xs text-text-muted">ধাপ {toBanglaDigits(step)} / {toBanglaDigits(STEPS.length)}</p>
          {step < STEPS.length ? (
            <Button onClick={next}>পরবর্তী</Button>
          ) : (
            <Button onClick={() => setSubmitted(true)}>আবেদন জমা দিন</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
