"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toBanglaDigits } from "@/lib/utils";

const DIVORCE_TYPES = [
  { value: "", label: "ধরন নির্বাচন করুন" },
  { value: "TALAQ", label: "তালাক (স্বামী কর্তৃক)" },
  { value: "TALAQ_TAFWEEZ", label: "তালাক-ই-তাফবীজ (স্ত্রী কর্তৃক অর্পিত ক্ষমতায়)" },
  { value: "KHULA", label: "খুলা (স্ত্রী কর্তৃক, স্বামীর সম্মতিতে)" },
  { value: "MUBARAT", label: "মুবারাত (পারস্পরিক সম্মতি)" },
  { value: "JUDICIAL", label: "বিচারিক বিবাহবিচ্ছেদ (আদালতের আদেশ)" },
  { value: "NON_MUSLIM", label: "অমুসলিম বিবাহবিচ্ছেদ" },
];

const STEPS = [
  { id: 1, title: "বিবাহবিচ্ছেদের ধরন", titleEn: "Divorce Type" },
  { id: 2, title: "বিবাহের তথ্য", titleEn: "Marriage Info" },
  { id: 3, title: "কারণ ও নথি", titleEn: "Grounds & Documents" },
  { id: 4, title: "পর্যালোচনা ও দাখিল", titleEn: "Review & Submit" },
];

export default function CitizenDivorceFilePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [divorceType, setDivorceType] = useState("");
  const [applicantRole, setApplicantRole] = useState("");

  const [applicantName, setApplicantName] = useState("");
  const [applicantNid, setApplicantNid] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spouseNid, setSpouseNid] = useState("");

  const [marriageRegNo, setMarriageRegNo] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriageKazi, setMarriageKazi] = useState("");

  const [grounds, setGrounds] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [chairmanName, setChairmanName] = useState("");
  const [unionCouncil, setUnionCouncil] = useState("");
  const [courtOrderNo, setCourtOrderNo] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const isTalaq = divorceType === "TALAQ" || divorceType === "TALAQ_TAFWEEZ";
  const isJudicial = divorceType === "JUDICIAL";

  if (submitted) {
    return (
      <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
        <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <CardTitle className="text-green-800 text-xl">বিবাহবিচ্ছেদ আবেদন দাখিল হয়েছে</CardTitle>
        <p className="text-green-700 mt-2">
          কেস নম্বর: <span className="font-mono font-bold">DIV-{toBanglaDigits(2026)}-{toBanglaDigits("0045")}</span>
        </p>
        {isTalaq && (
          <p className="text-sm text-green-600 mt-1">৯০ দিনের ইদ্দত সময়কাল শুরু হবে নোটিশ গ্রহণের পর।</p>
        )}
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
        <h1 className="text-2xl font-bold text-text">বিবাহবিচ্ছেদ আবেদন</h1>
        <p className="text-sm text-text-secondary mt-1">মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১ ও অন্যান্য প্রযোজ্য আইন অনুযায়ী</p>
      </div>

      <div className="rounded-[var(--radius-md)] border-2 border-red-200 bg-red-50 p-3 text-sm text-red-700">
        <strong>গুরুত্বপূর্ণ:</strong> তালাকের ক্ষেত্রে ইউনিয়ন পরিষদ/পৌরসভার চেয়ারম্যানকে লিখিত নোটিশ দেওয়া বাধ্যতামূলক। নোটিশের ৯০ দিন পর তালাক কার্যকর হয়।
      </div>

      <Card padding="sm">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => setStep(s.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer ${step === s.id ? "bg-red-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"}`}>
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
          <div className="space-y-4">
            <Select
              label="বিবাহবিচ্ছেদের ধরন"
              options={DIVORCE_TYPES}
              value={divorceType}
              onChange={(e) => setDivorceType(e.target.value)}
            />
            <Select
              label="আবেদনকারীর ভূমিকা"
              options={[
                { value: "", label: "নির্বাচন করুন" },
                { value: "HUSBAND", label: "স্বামী" },
                { value: "WIFE", label: "স্ত্রী" },
              ]}
              value={applicantRole}
              onChange={(e) => setApplicantRole(e.target.value)}
            />

            {divorceType && (
              <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                {divorceType === "TALAQ" && "তালাক: স্বামী কর্তৃক একতরফা বিবাহবিচ্ছেদ। চেয়ারম্যানকে নোটিশ দেওয়ার ৯০ দিন পর কার্যকর।"}
                {divorceType === "TALAQ_TAFWEEZ" && "তালাক-ই-তাফবীজ: কাবিননামার ১৬ নম্বর কলামে স্ত্রীকে ক্ষমতা অর্পিত থাকলে স্ত্রী তালাক দিতে পারেন।"}
                {divorceType === "KHULA" && "খুলা: স্ত্রী কর্তৃক বিবাহবিচ্ছেদ, সাধারণত মোহরানা ফেরত/পরিত্যাগের মাধ্যমে।"}
                {divorceType === "MUBARAT" && "মুবারাত: উভয় পক্ষের সম্মতিতে বিবাহবিচ্ছেদ।"}
                {divorceType === "JUDICIAL" && "বিচারিক বিবাহবিচ্ছেদ: পারিবারিক আদালতের আদেশ অনুযায়ী (Dissolution of Muslim Marriages Act, 1939)।"}
                {divorceType === "NON_MUSLIM" && "অমুসলিম বিবাহবিচ্ছেদ: প্রযোজ্য আইন অনুযায়ী (Divorce Act 1869, Special Marriage Act 1872 ইত্যাদি)।"}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold border-b border-border pb-2">আবেদনকারীর তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
              <Input label="NID" value={applicantNid} onChange={(e) => setApplicantNid(e.target.value)} />
            </div>
            <h3 className="text-sm font-semibold border-b border-border pb-2">প্রতিপক্ষের তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
              <Input label="NID" value={spouseNid} onChange={(e) => setSpouseNid(e.target.value)} />
            </div>
            <h3 className="text-sm font-semibold border-b border-border pb-2">মূল বিবাহের তথ্য</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বিবাহ নিবন্ধন নম্বর" value={marriageRegNo} onChange={(e) => setMarriageRegNo(e.target.value)} />
              <Input label="বিবাহের তারিখ" type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              <div className="sm:col-span-2"><Input label="নিবন্ধনকারী কাজীর নাম" value={marriageKazi} onChange={(e) => setMarriageKazi(e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">বিবাহবিচ্ছেদের কারণ</label>
              <textarea
                className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm min-h-[100px] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="বিবাহবিচ্ছেদের কারণ বিস্তারিত লিখুন..."
                value={grounds}
                onChange={(e) => setGrounds(e.target.value)}
              />
            </div>

            {isTalaq && (
              <div className="space-y-4 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4">
                <h3 className="text-sm font-semibold text-red-800">নোটিশের তথ্য (বাধ্যতামূলক)</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="নোটিশের তারিখ" type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} hint="চেয়ারম্যানকে নোটিশ দেওয়ার তারিখ" />
                  <Input label="চেয়ারম্যানের নাম" value={chairmanName} onChange={(e) => setChairmanName(e.target.value)} />
                  <div className="sm:col-span-2"><Input label="ইউনিয়ন পরিষদ / পৌরসভা" value={unionCouncil} onChange={(e) => setUnionCouncil(e.target.value)} /></div>
                </div>
              </div>
            )}

            {isJudicial && (
              <div className="space-y-4 rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-sm font-semibold text-blue-800">আদালতের আদেশ</h3>
                <Input label="আদালতের আদেশ নম্বর" value={courtOrderNo} onChange={(e) => setCourtOrderNo(e.target.value)} />
              </div>
            )}

            <p className="text-xs text-text-muted">প্রয়োজনীয় নথি (NID, বিবাহ সনদ, আদালতের আদেশ ইত্যাদি) অ্যাপয়েন্টমেন্টের সময় জমা দিতে হবে।</p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4">
              <h3 className="text-sm font-semibold text-red-800 mb-2">আবেদনের সারসংক্ষেপ</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-text-muted">ধরন:</p><p className="font-medium">{DIVORCE_TYPES.find(d => d.value === divorceType)?.label || "—"}</p>
                <p className="text-text-muted">আবেদনকারী:</p><p className="font-medium">{applicantName || "—"}</p>
                <p className="text-text-muted">প্রতিপক্ষ:</p><p className="font-medium">{spouseName || "—"}</p>
                <p className="text-text-muted">বিবাহ নম্বর:</p><p>{marriageRegNo || "—"}</p>
                <p className="text-text-muted">বিবাহের তারিখ:</p><p>{marriageDate || "—"}</p>
                {isTalaq && noticeDate && (
                  <><p className="text-text-muted">নোটিশের তারিখ:</p><p>{noticeDate}</p></>
                )}
                {isJudicial && courtOrderNo && (
                  <><p className="text-text-muted">আদালতের আদেশ:</p><p>{courtOrderNo}</p></>
                )}
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              <strong>সতর্কতা:</strong> আবেদন দাখিলের পর নিবন্ধক আপনার সাথে যোগাযোগ করবেন। সকল মূল নথি সংরক্ষণ করুন।
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 1}>পূর্ববর্তী</Button>
          {step < STEPS.length ? <Button onClick={next}>পরবর্তী</Button> : <Button onClick={() => setSubmitted(true)}>আবেদন দাখিল করুন</Button>}
        </div>
      </Card>
    </div>
  );
}
