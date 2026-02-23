"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "বরের তথ্য", titleEn: "Groom Details" },
  { id: 2, title: "কনের তথ্য", titleEn: "Bride Details" },
  { id: 3, title: "চার্চ ও বিবাহ তথ্য", titleEn: "Church & Marriage" },
  { id: 4, title: "সাক্ষী", titleEn: "Witnesses" },
  { id: 5, title: "পর্যালোচনা", titleEn: "Review & Submit" },
];

export default function ChristianMarriageFormPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [groomNameBn, setGroomNameBn] = useState("");
  const [groomNameEn, setGroomNameEn] = useState("");
  const [groomFatherName, setGroomFatherName] = useState("");
  const [groomNid, setGroomNid] = useState("");
  const [groomDob, setGroomDob] = useState("");
  const [groomAddress, setGroomAddress] = useState("");
  const [groomChurch, setGroomChurch] = useState("");

  const [brideNameBn, setBrideNameBn] = useState("");
  const [brideNameEn, setBrideNameEn] = useState("");
  const [brideFatherName, setBrideFatherName] = useState("");
  const [brideNid, setBrideNid] = useState("");
  const [brideDob, setBrideDob] = useState("");
  const [brideAddress, setBrideAddress] = useState("");

  const [churchName, setChurchName] = useState("");
  const [churchAddress, setChurchAddress] = useState("");
  const [churchPermission, setChurchPermission] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [pastorName, setPastorName] = useState("");

  const [w1Name, setW1Name] = useState("");
  const [w1Nid, setW1Nid] = useState("");
  const [w2Name, setW2Name] = useState("");
  const [w2Nid, setW2Nid] = useState("");
  const [w3Name, setW3Name] = useState("");
  const [w3Nid, setW3Nid] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">খ্রিস্টান বিবাহ নিবন্ধন সফল</CardTitle>
        <p className="text-green-700 mt-2">নিবন্ধন নম্বর: <span className="font-mono font-bold">CMR-DHK-{toBanglaDigits(2026)}-{toBanglaDigits("000045")}</span></p>
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
        <h1 className="text-2xl font-bold text-text">খ্রিস্টান বিবাহ নিবন্ধন</h1>
        <p className="text-sm text-text-secondary mt-1">খ্রিস্টান বিবাহ আইন, ১৮৭২ অনুযায়ী</p>
      </div>

      <Card padding="sm">
        <div className="flex items-center overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-purple-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
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
          <Badge variant="default">ধাপ {toBanglaDigits(step)}/{toBanglaDigits(STEPS.length)}</Badge>
          <CardTitle>{STEPS[step - 1].title}</CardTitle>
        </div>
        <CardDescription className="mb-6">{STEPS[step - 1].titleEn}</CardDescription>

        {step === 1 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-purple-200 bg-purple-50 p-3 text-sm text-purple-700">
              বর অবশ্যই ২১ বছর বয়সী এবং খ্রিস্টান ধর্মাবলম্বী হতে হবে
            </div>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-purple-300 bg-purple-50/30 p-4">
              <div className="flex gap-3">
                <Input label="বরের NID" placeholder="NID নম্বর" value={groomNid} onChange={(e) => setGroomNid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={groomNameBn} onChange={(e) => setGroomNameBn(e.target.value)} />
              <Input label="Name (English)" value={groomNameEn} onChange={(e) => setGroomNameEn(e.target.value)} />
              <Input label="পিতার নাম" value={groomFatherName} onChange={(e) => setGroomFatherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={groomDob} onChange={(e) => setGroomDob(e.target.value)} />
              <Input label="চার্চের নাম (যুক্ত)" placeholder="সংশ্লিষ্ট চার্চ" value={groomChurch} onChange={(e) => setGroomChurch(e.target.value)} />
              <div />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={groomAddress} onChange={(e) => setGroomAddress(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-purple-200 bg-purple-50 p-3 text-sm text-purple-700">
              কনে অবশ্যই ১৮ বছর বয়সী হতে হবে
            </div>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-purple-300 bg-purple-50/30 p-4">
              <div className="flex gap-3">
                <Input label="কনের NID" value={brideNid} onChange={(e) => setBrideNid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={brideNameBn} onChange={(e) => setBrideNameBn(e.target.value)} />
              <Input label="Name (English)" value={brideNameEn} onChange={(e) => setBrideNameEn(e.target.value)} />
              <Input label="পিতার নাম" value={brideFatherName} onChange={(e) => setBrideFatherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={brideDob} onChange={(e) => setBrideDob(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={brideAddress} onChange={(e) => setBrideAddress(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-purple-200 bg-purple-50 p-3 text-sm text-purple-700">
              চার্চের অনুমতিপত্র বাধ্যতামূলক
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="চার্চের নাম" placeholder="যে চার্চে বিবাহ সম্পন্ন হয়েছে" value={churchName} onChange={(e) => setChurchName(e.target.value)} />
              <Input label="চার্চের ঠিকানা" value={churchAddress} onChange={(e) => setChurchAddress(e.target.value)} />
              <Input label="চার্চের অনুমতিপত্র নম্বর" placeholder="Permission Letter No." value={churchPermission} onChange={(e) => setChurchPermission(e.target.value)} />
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <div className="sm:col-span-2">
                <Input label="পাদ্রী / যাজকের নাম (Pastor)" placeholder="বিবাহ সম্পাদনকারী পাদ্রীর নাম" value={pastorName} onChange={(e) => setPastorName(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-purple-200 bg-purple-50 p-3 text-sm text-purple-700">
              ৩ জন প্রাপ্তবয়স্ক খ্রিস্টান সাক্ষী প্রয়োজন
            </div>
            {[["সাক্ষী ১", w1Name, setW1Name, w1Nid, setW1Nid], ["সাক্ষী ২", w2Name, setW2Name, w2Nid, setW2Nid], ["সাক্ষী ৩", w3Name, setW3Name, w3Nid, setW3Nid]].map(([label, name, setName, nid, setNid], i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-sm font-semibold text-text border-b border-border pb-2">{label as string}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="নাম" value={name as string} onChange={(e) => (setName as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} />
                  <Input label="NID" value={nid as string} onChange={(e) => (setNid as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              সকল তথ্য যাচাই করুন এবং নিবন্ধন সম্পন্ন করুন।
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-purple-600 mb-3">বর</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="font-medium">{groomNameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">চার্চ:</dt><dd>{groomChurch || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-purple-600 mb-3">কনে</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="font-medium">{brideNameBn || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-purple-600 mb-3">চার্চ ও বিবাহ</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">চার্চ:</dt><dd>{churchName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">তারিখ:</dt><dd>{marriageDate || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পাদ্রী:</dt><dd>{pastorName || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-purple-600 mb-3">সাক্ষীগণ</h3>
                <div className="space-y-1 text-sm">
                  {w1Name && <p>১. {w1Name}</p>}
                  {w2Name && <p>২. {w2Name}</p>}
                  {w3Name && <p>৩. {w3Name}</p>}
                </div>
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

      <p className="text-center text-xs text-text-muted">খ্রিস্টান বিবাহ আইন, ১৮৭২</p>
    </div>
  );
}
