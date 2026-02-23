"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "বরের তথ্য", titleEn: "Groom Details" },
  { id: 2, title: "কনের তথ্য", titleEn: "Bride Details" },
  { id: 3, title: "বিবাহের তথ্য", titleEn: "Marriage Details" },
  { id: 4, title: "সাক্ষী ও পুরোহিত", titleEn: "Witnesses & Priest" },
  { id: 5, title: "পর্যালোচনা", titleEn: "Review & Submit" },
];

export default function HinduMarriageFormPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  /* Groom */
  const [groomNameBn, setGroomNameBn] = useState("");
  const [groomNameEn, setGroomNameEn] = useState("");
  const [groomFatherName, setGroomFatherName] = useState("");
  const [groomMotherName, setGroomMotherName] = useState("");
  const [groomNid, setGroomNid] = useState("");
  const [groomDob, setGroomDob] = useState("");
  const [groomAddress, setGroomAddress] = useState("");
  const [groomPhoto, setGroomPhoto] = useState("");

  /* Bride */
  const [brideNameBn, setBrideNameBn] = useState("");
  const [brideNameEn, setBrideNameEn] = useState("");
  const [brideFatherName, setBrideFatherName] = useState("");
  const [brideMotherName, setBrideMotherName] = useState("");
  const [brideNid, setBrideNid] = useState("");
  const [brideDob, setBrideDob] = useState("");
  const [brideAddress, setBrideAddress] = useState("");

  /* Marriage */
  const [marriageDate, setMarriageDate] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");
  const [ritualsPerformed, setRitualsPerformed] = useState("");

  /* Priest & Witnesses */
  const [priestName, setPriestName] = useState("");
  const [priestAddress, setPriestAddress] = useState("");
  const [witness1Name, setWitness1Name] = useState("");
  const [witness1Nid, setWitness1Nid] = useState("");
  const [witness1Address, setWitness1Address] = useState("");
  const [witness2Name, setWitness2Name] = useState("");
  const [witness2Nid, setWitness2Nid] = useState("");
  const [witness2Address, setWitness2Address] = useState("");
  const [witness3Name, setWitness3Name] = useState("");
  const [witness3Nid, setWitness3Nid] = useState("");
  const [witness3Address, setWitness3Address] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
          <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <CardTitle className="text-green-800 text-xl">হিন্দু বিবাহ নিবন্ধন সফল</CardTitle>
          <p className="text-green-700 mt-2">নিবন্ধন নম্বর: <span className="font-mono font-bold">HMR-DHK-{toBanglaDigits(2026)}-{toBanglaDigits("000234")}</span></p>
          <div className="mt-6 flex justify-center gap-3">
            <Button>সনদ ডাউনলোড</Button>
            <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন নিবন্ধন</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">হিন্দু বিবাহ নিবন্ধন</h1>
        <p className="text-sm text-text-secondary mt-1">
          হিন্দু বিবাহ নিবন্ধন আইন, ২০১২ ও হিন্দু বিবাহ নিবন্ধন বিধিমালা, ২০১৩ অনুযায়ী
        </p>
      </div>

      {/* Step Indicator */}
      <Card padding="sm">
        <div className="flex items-center overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  step === s.id ? "bg-orange-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  step === s.id ? "bg-white/20" : step > s.id ? "bg-green-200" : "bg-border"
                }`}>
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

        {/* Step 1: Groom */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700">
              বরের সম্পূর্ণ তথ্য — বয়স অবশ্যই ২১ বছর বা তার বেশি হতে হবে
            </div>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-orange-300 bg-orange-50/30 p-4">
              <p className="text-sm font-medium text-orange-700 mb-3">NID যাচাই করুন</p>
              <div className="flex gap-3">
                <Input label="বরের NID নম্বর" placeholder="NID নম্বর" value={groomNid} onChange={(e) => setGroomNid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বরের নাম (বাংলা)" placeholder="সম্পূর্ণ নাম" value={groomNameBn} onChange={(e) => setGroomNameBn(e.target.value)} />
              <Input label="বরের নাম (ইংরেজি)" placeholder="Full name in English" value={groomNameEn} onChange={(e) => setGroomNameEn(e.target.value)} />
              <Input label="পিতার নাম" placeholder="পিতার নাম" value={groomFatherName} onChange={(e) => setGroomFatherName(e.target.value)} />
              <Input label="মাতার নাম" placeholder="মাতার নাম" value={groomMotherName} onChange={(e) => setGroomMotherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={groomDob} onChange={(e) => setGroomDob(e.target.value)} />
              <div />
              <div className="sm:col-span-2">
                <Input label="ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={groomAddress} onChange={(e) => setGroomAddress(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Bride */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700">
              কনের সম্পূর্ণ তথ্য — বয়স অবশ্যই ১৮ বছর বা তার বেশি হতে হবে
            </div>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-orange-300 bg-orange-50/30 p-4">
              <p className="text-sm font-medium text-orange-700 mb-3">NID যাচাই করুন</p>
              <div className="flex gap-3">
                <Input label="কনের NID নম্বর" placeholder="NID নম্বর" value={brideNid} onChange={(e) => setBrideNid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="কনের নাম (বাংলা)" placeholder="সম্পূর্ণ নাম" value={brideNameBn} onChange={(e) => setBrideNameBn(e.target.value)} />
              <Input label="কনের নাম (ইংরেজি)" placeholder="Full name in English" value={brideNameEn} onChange={(e) => setBrideNameEn(e.target.value)} />
              <Input label="পিতার নাম" placeholder="পিতার নাম" value={brideFatherName} onChange={(e) => setBrideFatherName(e.target.value)} />
              <Input label="মাতার নাম" placeholder="মাতার নাম" value={brideMotherName} onChange={(e) => setBrideMotherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={brideDob} onChange={(e) => setBrideDob(e.target.value)} />
              <div />
              <div className="sm:col-span-2">
                <Input label="ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={brideAddress} onChange={(e) => setBrideAddress(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Marriage Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700">
              ধর্মীয় অনুষ্ঠান সম্পন্নের পর নিবন্ধন করা হয় — অনুষ্ঠানের বিবরণ দিন
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বিবাহের তারিখ (Marriage Ceremony Date)" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <div />
              <div className="sm:col-span-2">
                <Input label="বিবাহের স্থান" placeholder="মন্দির/বাড়ির নাম, এলাকা, জেলা" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">সম্পাদিত ধর্মীয় অনুষ্ঠান (Hindu Rituals Performed)</label>
              <textarea
                className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                placeholder="সপ্তপদী, অগ্নিসাক্ষী, সিন্দূরদান, মালাবদল ইত্যাদি অনুষ্ঠানের বিবরণ লিখুন"
                value={ritualsPerformed}
                onChange={(e) => setRitualsPerformed(e.target.value)}
              />
              <p className="text-xs text-text-muted mt-1">কোন কোন হিন্দু ধর্মীয় রীতিনীতি অনুসরণ করা হয়েছে তা উল্লেখ করুন</p>
            </div>
          </div>
        )}

        {/* Step 4: Witnesses & Priest */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700">
              <strong>ন্যূনতম ৩ জন সাক্ষী</strong> ও পুরোহিতের তথ্য প্রয়োজন (হিন্দু বিবাহ নিবন্ধন বিধিমালা, ২০১৩)
            </div>

            {/* Priest */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">পুরোহিত (Priest)</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="পুরোহিতের নাম" placeholder="নাম" value={priestName} onChange={(e) => setPriestName(e.target.value)} />
                <Input label="ঠিকানা" placeholder="ঠিকানা" value={priestAddress} onChange={(e) => setPriestAddress(e.target.value)} />
              </div>
            </div>

            {/* Witness 1 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">সাক্ষী ১</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input label="নাম" placeholder="সাক্ষীর নাম" value={witness1Name} onChange={(e) => setWitness1Name(e.target.value)} />
                <Input label="NID" placeholder="NID নম্বর" value={witness1Nid} onChange={(e) => setWitness1Nid(e.target.value)} />
                <Input label="ঠিকানা" placeholder="ঠিকানা" value={witness1Address} onChange={(e) => setWitness1Address(e.target.value)} />
              </div>
            </div>

            {/* Witness 2 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">সাক্ষী ২</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input label="নাম" value={witness2Name} onChange={(e) => setWitness2Name(e.target.value)} />
                <Input label="NID" value={witness2Nid} onChange={(e) => setWitness2Nid(e.target.value)} />
                <Input label="ঠিকানা" value={witness2Address} onChange={(e) => setWitness2Address(e.target.value)} />
              </div>
            </div>

            {/* Witness 3 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">সাক্ষী ৩</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input label="নাম" value={witness3Name} onChange={(e) => setWitness3Name(e.target.value)} />
                <Input label="NID" value={witness3Nid} onChange={(e) => setWitness3Nid(e.target.value)} />
                <Input label="ঠিকানা" value={witness3Address} onChange={(e) => setWitness3Address(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              সকল তথ্য যাচাই করুন। নিবন্ধন ফি: ১,০০০ টাকা (বর প্রদান করবেন)। সনদের কপি: ১০০ টাকা।
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-orange-600 mb-3">বরের তথ্য</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="text-text font-medium">{groomNameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পিতা:</dt><dd className="text-text">{groomFatherName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">NID:</dt><dd className="font-mono">{groomNid || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-orange-600 mb-3">কনের তথ্য</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="text-text font-medium">{brideNameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পিতা:</dt><dd className="text-text">{brideFatherName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">NID:</dt><dd className="font-mono">{brideNid || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-orange-600 mb-3">বিবাহের বিবরণ</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">তারিখ:</dt><dd>{marriageDate || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">স্থান:</dt><dd>{marriagePlace || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পুরোহিত:</dt><dd>{priestName || "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-orange-600 mb-3">সাক্ষীগণ</h3>
                <div className="space-y-1 text-sm">
                  {witness1Name && <p className="text-text">১. {witness1Name}</p>}
                  {witness2Name && <p className="text-text">২. {witness2Name}</p>}
                  {witness3Name && <p className="text-text">৩. {witness3Name}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 1}>পূর্ববর্তী</Button>
          <p className="text-xs text-text-muted">ধাপ {toBanglaDigits(step)} / {toBanglaDigits(STEPS.length)}</p>
          {step < STEPS.length ? (
            <Button onClick={next}>পরবর্তী</Button>
          ) : (
            <Button onClick={() => setSubmitted(true)}>নিবন্ধন সম্পন্ন করুন</Button>
          )}
        </div>
      </Card>

      <p className="text-center text-xs text-text-muted">হিন্দু বিবাহ নিবন্ধন আইন, ২০১২ | হিন্দু বিবাহ নিবন্ধন বিধিমালা, ২০১৩</p>
    </div>
  );
}
