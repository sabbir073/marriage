"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const DIVORCE_TYPES = [
  { value: "", label: "ধরন নির্বাচন করুন" },
  { value: "TALAQ", label: "তালাক (স্বামী কর্তৃক)" },
  { value: "TALAQ_TAFWEEZ", label: "তালাক-ই-তাফবীজ (কাবিননামা কলাম ১৬ অনুযায়ী)" },
  { value: "KHULA", label: "খুলা (স্ত্রী কর্তৃক, স্বামীর সম্মতিতে)" },
  { value: "MUBARAT", label: "মুবারাত (পারস্পরিক সম্মতি)" },
  { value: "JUDICIAL", label: "বিচারিক বিবাহবিচ্ছেদ (আদালতের আদেশে)" },
  { value: "NON_MUSLIM", label: "অমুসলিম বিবাহবিচ্ছেদ" },
];

const STEPS = [
  { id: 1, title: "ধরন ও বিবাহ তথ্য", titleEn: "Type & Marriage" },
  { id: 2, title: "স্বামী ও স্ত্রীর তথ্য", titleEn: "Husband & Wife" },
  { id: 3, title: "নোটিশ ও সালিশ", titleEn: "Notice & Arbitration" },
  { id: 4, title: "পর্যালোচনা ও নিবন্ধন", titleEn: "Review & Register" },
];

export default function KaziDivorceRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [divorceType, setDivorceType] = useState("");

  // Marriage reference
  const [marriageRegNo, setMarriageRegNo] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");

  // Husband
  const [husbandName, setHusbandName] = useState("");
  const [husbandNid, setHusbandNid] = useState("");
  const [husbandFather, setHusbandFather] = useState("");
  const [husbandAddress, setHusbandAddress] = useState("");

  // Wife
  const [wifeName, setWifeName] = useState("");
  const [wifeNid, setWifeNid] = useState("");
  const [wifeFather, setWifeFather] = useState("");
  const [wifeAddress, setWifeAddress] = useState("");

  // Notice & Arbitration (for Talaq types)
  const [noticeDate, setNoticeDate] = useState("");
  const [chairmanName, setChairmanName] = useState("");
  const [unionCouncil, setUnionCouncil] = useState("");
  const [noticeDeliveryDate, setNoticeDeliveryDate] = useState("");
  const [arbitrationDate, setArbitrationDate] = useState("");
  const [arbitrationOutcome, setArbitrationOutcome] = useState("");
  const [iddatStartDate, setIddatStartDate] = useState("");
  const [isWifePregnant, setIsWifePregnant] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");

  // Judicial
  const [courtName, setCourtName] = useState("");
  const [courtOrderNo, setCourtOrderNo] = useState("");
  const [courtOrderDate, setCourtOrderDate] = useState("");

  // Khula
  const [dowerReturned, setDowerReturned] = useState("");

  // General
  const [grounds, setGrounds] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const isTalaq = divorceType === "TALAQ" || divorceType === "TALAQ_TAFWEEZ";
  const isJudicial = divorceType === "JUDICIAL";
  const isKhula = divorceType === "KHULA";

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">বিবাহবিচ্ছেদ নিবন্ধন সফল</CardTitle>
        <p className="text-green-700 mt-2">
          কেস নম্বর: <span className="font-mono font-bold">DR-DHK-{toBanglaDigits(2026)}-{toBanglaDigits("000045")}</span>
        </p>
        <p className="text-sm text-green-600 mt-1">
          {isTalaq ? "ইদ্দত সময়কাল সিস্টেমে ট্র্যাক হচ্ছে।" : "বিবাহবিচ্ছেদ রেজিস্ট্রি বইতে এন্ট্রি সম্পন্ন।"}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>সনদ ডাউনলোড</Button>
          <Button variant="outline" onClick={() => window.location.href = "/kazi/divorce/cases"}>কেস তালিকা</Button>
          <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন নিবন্ধন</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">বিবাহবিচ্ছেদ নিবন্ধন</h1>
        <p className="text-sm text-text-secondary mt-1">
          মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১ ও অন্যান্য প্রযোজ্য আইন অনুযায়ী
        </p>
      </div>

      {/* Step indicator */}
      <Card padding="sm">
        <div className="flex items-center overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-red-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}
              >
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
          <Badge variant="error">ধাপ {toBanglaDigits(step)}</Badge>
          <CardTitle>{STEPS[step - 1].title}</CardTitle>
        </div>
        <CardDescription className="mb-6">{STEPS[step - 1].titleEn}</CardDescription>

        {/* Step 1: Divorce type + marriage reference */}
        {step === 1 && (
          <div className="space-y-6">
            <Select
              label="বিবাহবিচ্ছেদের ধরন"
              options={DIVORCE_TYPES}
              value={divorceType}
              onChange={(e) => setDivorceType(e.target.value)}
            />

            {divorceType && (
              <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                {divorceType === "TALAQ" && "তালাক আহসান/হাসান: স্বামী তালাক উচ্চারণ করবেন। চেয়ারম্যানকে নোটিশ বাধ্যতামূলক। ৯০ দিনের ইদ্দত পালনীয়।"}
                {divorceType === "TALAQ_TAFWEEZ" && "কাবিননামা কলাম ১৬-এ স্ত্রীকে তালাকের ক্ষমতা অর্পিত থাকলে স্ত্রী তালাক দিতে পারেন। একই ৯০ দিনের নোটিশ প্রক্রিয়া প্রযোজ্য।"}
                {divorceType === "KHULA" && "স্ত্রী বিবাহবিচ্ছেদ চাইলে মোহরানা ফেরত/পরিত্যাগ করে স্বামীর সম্মতিতে বা পারিবারিক আদালতের মাধ্যমে।"}
                {divorceType === "MUBARAT" && "উভয় পক্ষের পারস্পরিক সম্মতিতে বিবাহবিচ্ছেদ। যৌথ আবেদনপত্র প্রয়োজন।"}
                {divorceType === "JUDICIAL" && "পারিবারিক আদালতের আদেশ অনুযায়ী (Dissolution of Muslim Marriages Act, 1939)। আদালতের আদেশের কপি আবশ্যক।"}
                {divorceType === "NON_MUSLIM" && "প্রযোজ্য আইন অনুযায়ী নিবন্ধন (Divorce Act 1869, Special Marriage Act 1872 ইত্যাদি)।"}
              </div>
            )}

            <h3 className="text-sm font-semibold text-text border-b border-border pb-2">মূল বিবাহের তথ্য</h3>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-primary/30 bg-primary/5 p-4">
              <div className="flex gap-3">
                <Input label="বিবাহ নিবন্ধন নম্বর" placeholder="MR-DHK-2020-XXXXXX" value={marriageRegNo} onChange={(e) => setMarriageRegNo(e.target.value)} />
                <div className="flex items-end"><Button size="sm">খুঁজুন</Button></div>
              </div>
              <p className="text-xs text-text-muted mt-2">বিবাহ নম্বর দিলে স্বামী-স্ত্রীর তথ্য স্বয়ংক্রিয়ভাবে পূরণ হবে।</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <Input label="বিবাহের স্থান" value={marriagePlace} onChange={(e) => setMarriagePlace(e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 2: Husband & Wife details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-text border-b border-border pb-2">স্বামীর তথ্য</h3>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-red-300 bg-red-50/30 p-4">
              <div className="flex gap-3">
                <Input label="NID নম্বর" value={husbandNid} onChange={(e) => setHusbandNid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={husbandName} onChange={(e) => setHusbandName(e.target.value)} />
              <Input label="পিতার নাম" value={husbandFather} onChange={(e) => setHusbandFather(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={husbandAddress} onChange={(e) => setHusbandAddress(e.target.value)} /></div>
            </div>

            <h3 className="text-sm font-semibold text-text border-b border-border pb-2 mt-6">স্ত্রীর তথ্য</h3>
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-red-300 bg-red-50/30 p-4">
              <div className="flex gap-3">
                <Input label="NID নম্বর" value={wifeNid} onChange={(e) => setWifeNid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={wifeName} onChange={(e) => setWifeName(e.target.value)} />
              <Input label="পিতার নাম" value={wifeFather} onChange={(e) => setWifeFather(e.target.value)} />
              <div className="sm:col-span-2"><Input label="ঠিকানা" value={wifeAddress} onChange={(e) => setWifeAddress(e.target.value)} /></div>
            </div>
          </div>
        )}

        {/* Step 3: Notice, Arbitration, Court details */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Grounds */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">বিবাহবিচ্ছেদের কারণ</label>
              <textarea
                className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm min-h-[80px] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="বিবাহবিচ্ছেদের কারণ ও পরিস্থিতি বিস্তারিত লিখুন..."
                value={grounds}
                onChange={(e) => setGrounds(e.target.value)}
              />
            </div>

            {/* Talaq: Notice & Arbitration */}
            {isTalaq && (
              <>
                <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4">
                  <h3 className="text-sm font-semibold text-red-800 mb-3">নোটিশের তথ্য (মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১, ধারা ৭)</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="নোটিশের তারিখ" type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} />
                    <Input label="নোটিশ গ্রহণের তারিখ" type="date" value={noticeDeliveryDate} onChange={(e) => setNoticeDeliveryDate(e.target.value)} hint="চেয়ারম্যান যেদিন নোটিশ পেয়েছেন" />
                    <Input label="চেয়ারম্যানের নাম" value={chairmanName} onChange={(e) => setChairmanName(e.target.value)} />
                    <Input label="ইউনিয়ন পরিষদ / পৌরসভা" value={unionCouncil} onChange={(e) => setUnionCouncil(e.target.value)} />
                  </div>
                </div>

                <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-4">
                  <h3 className="text-sm font-semibold text-amber-800 mb-3">সালিশ পরিষদ (Arbitration Council)</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="সালিশ পরিষদ গঠনের তারিখ" type="date" value={arbitrationDate} onChange={(e) => setArbitrationDate(e.target.value)} hint="নোটিশের ৩০ দিনের মধ্যে" />
                    <Select
                      label="সালিশের ফলাফল"
                      options={[
                        { value: "", label: "নির্বাচন করুন" },
                        { value: "FAILED", label: "সমঝোতা ব্যর্থ" },
                        { value: "RECONCILED", label: "সমঝোতা সফল (তালাক প্রত্যাহার)" },
                        { value: "PENDING", label: "চলমান" },
                      ]}
                      value={arbitrationOutcome}
                      onChange={(e) => setArbitrationOutcome(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-[var(--radius-md)] border border-purple-200 bg-purple-50 p-4">
                  <h3 className="text-sm font-semibold text-purple-800 mb-3">ইদ্দত সময়কাল (৯০ দিন)</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="ইদ্দত শুরুর তারিখ" type="date" value={iddatStartDate} onChange={(e) => setIddatStartDate(e.target.value)} hint="নোটিশ গ্রহণের তারিখ থেকে" />
                    <Select
                      label="স্ত্রী কি গর্ভবতী?"
                      options={[
                        { value: "", label: "নির্বাচন করুন" },
                        { value: "NO", label: "না" },
                        { value: "YES", label: "হ্যাঁ (প্রসব পর্যন্ত বা ৯০ দিন, যেটি পরে)" },
                      ]}
                      value={isWifePregnant}
                      onChange={(e) => setIsWifePregnant(e.target.value)}
                    />
                    <Input label="তালাক কার্যকর তারিখ" type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} hint="ইদ্দত শেষ হলে" />
                  </div>
                </div>
              </>
            )}

            {/* Khula: Dower info */}
            {isKhula && (
              <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3">খুলা সংক্রান্ত তথ্য</h3>
                <Input label="মোহরানা ফেরত/পরিত্যাগের বিবরণ" value={dowerReturned} onChange={(e) => setDowerReturned(e.target.value)} />
              </div>
            )}

            {/* Judicial: Court info */}
            {isJudicial && (
              <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3">আদালতের আদেশ</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="আদালতের নাম" value={courtName} onChange={(e) => setCourtName(e.target.value)} />
                  <Input label="আদেশ নম্বর" value={courtOrderNo} onChange={(e) => setCourtOrderNo(e.target.value)} />
                  <Input label="আদেশের তারিখ" type="date" value={courtOrderDate} onChange={(e) => setCourtOrderDate(e.target.value)} />
                </div>
              </div>
            )}

            {/* Non-Talaq types - simpler */}
            {!isTalaq && !isJudicial && !isKhula && divorceType && (
              <p className="text-sm text-text-muted">এই ধরনের বিবাহবিচ্ছেদে নোটিশ/সালিশের প্রয়োজন নেই। সরাসরি নিবন্ধন করা যাবে।</p>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4">
              <h3 className="text-sm font-semibold text-red-800 mb-3">বিবাহবিচ্ছেদ নিবন্ধন সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">ধরন:</p>
                <p className="font-medium">{DIVORCE_TYPES.find(d => d.value === divorceType)?.label || "—"}</p>
                <p className="text-text-muted">স্বামী:</p>
                <p className="font-medium">{husbandName || "—"}</p>
                <p className="text-text-muted">স্ত্রী:</p>
                <p className="font-medium">{wifeName || "—"}</p>
                <p className="text-text-muted">বিবাহ নম্বর:</p>
                <p className="font-mono text-xs">{marriageRegNo || "—"}</p>
                <p className="text-text-muted">বিবাহের তারিখ:</p>
                <p>{marriageDate || "—"}</p>
                {isTalaq && (
                  <>
                    <p className="text-text-muted">নোটিশ তারিখ:</p><p>{noticeDate || "—"}</p>
                    <p className="text-text-muted">চেয়ারম্যান:</p><p>{chairmanName || "—"}</p>
                    <p className="text-text-muted">সালিশ ফলাফল:</p><p>{arbitrationOutcome === "FAILED" ? "সমঝোতা ব্যর্থ" : arbitrationOutcome === "RECONCILED" ? "সমঝোতা সফল" : "চলমান"}</p>
                    <p className="text-text-muted">কার্যকর তারিখ:</p><p>{effectiveDate || "—"}</p>
                  </>
                )}
                {isJudicial && (
                  <>
                    <p className="text-text-muted">আদালত:</p><p>{courtName || "—"}</p>
                    <p className="text-text-muted">আদেশ নম্বর:</p><p>{courtOrderNo || "—"}</p>
                  </>
                )}
              </div>
            </div>

            {isTalaq && arbitrationOutcome === "RECONCILED" && (
              <div className="rounded-[var(--radius-md)] border-2 border-green-300 bg-green-50 p-3 text-sm text-green-700">
                <strong>সমঝোতা সফল:</strong> সালিশ পরিষদের সমঝোতা সফল হলে তালাক প্রত্যাহার হিসেবে নিবন্ধন হবে।
              </div>
            )}

            <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              নিবন্ধনের পর বিবাহবিচ্ছেদ রেজিস্ট্রি বইতে এন্ট্রি হবে এবং উভয় পক্ষকে সনদের কপি প্রদান করা হবে।
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 1}>পূর্ববর্তী</Button>
          <p className="text-xs text-text-muted">ধাপ {toBanglaDigits(step)} / {toBanglaDigits(STEPS.length)}</p>
          {step < STEPS.length
            ? <Button onClick={next}>পরবর্তী</Button>
            : <Button className="bg-red-600 hover:bg-red-700" onClick={() => setSubmitted(true)}>
                নিবন্ধন সম্পন্ন করুন
              </Button>
          }
        </div>
      </Card>

      <p className="text-center text-xs text-text-muted">মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১ (Ordinance VIII of 1961)</p>
    </div>
  );
}
