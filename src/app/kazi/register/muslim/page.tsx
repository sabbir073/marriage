"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  STEPS                                                              */
/* ------------------------------------------------------------------ */
const STEPS = [
  { id: 1, title: "বিবাহের স্থান", titleEn: "Marriage Location" },
  { id: 2, title: "বরের তথ্য", titleEn: "Groom Details" },
  { id: 3, title: "কনের তথ্য", titleEn: "Bride Details" },
  { id: 4, title: "ওকালতনামা", titleEn: "Wakils" },
  { id: 5, title: "সাক্ষীগণ", titleEn: "Witnesses" },
  { id: 6, title: "দেনমোহর", titleEn: "Dower / Mohr" },
  { id: 7, title: "শর্তাবলী", titleEn: "Conditions" },
  { id: 8, title: "পর্যালোচনা", titleEn: "Review & Submit" },
];

/* ------------------------------------------------------------------ */
/*  OPTIONS                                                            */
/* ------------------------------------------------------------------ */
const DIVISION_OPTIONS = [
  { value: "", label: "বিভাগ নির্বাচন করুন" },
  { value: "dhaka", label: "ঢাকা" },
  { value: "chittagong", label: "চট্টগ্রাম" },
  { value: "rajshahi", label: "রাজশাহী" },
  { value: "khulna", label: "খুলনা" },
  { value: "barishal", label: "বরিশাল" },
  { value: "sylhet", label: "সিলেট" },
  { value: "rangpur", label: "রংপুর" },
  { value: "mymensingh", label: "ময়মনসিংহ" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "", label: "বৈবাহিক অবস্থা নির্বাচন" },
  { value: "unmarried", label: "অবিবাহিত (কুমারী)" },
  { value: "divorced", label: "তালাকপ্রাপ্তা" },
  { value: "widowed", label: "বিধবা" },
];

const GROOM_MARITAL_STATUS_OPTIONS = [
  { value: "", label: "বৈবাহিক অবস্থা নির্বাচন" },
  { value: "unmarried", label: "অবিবাহিত" },
  { value: "married", label: "বিবাহিত (বিদ্যমান স্ত্রী আছে)" },
  { value: "divorced", label: "তালাকপ্রাপ্ত" },
  { value: "widowed", label: "বিপত্নীক" },
];

const YES_NO_OPTIONS = [
  { value: "", label: "নির্বাচন করুন" },
  { value: "yes", label: "হ্যাঁ" },
  { value: "no", label: "না" },
];

/* ------------------------------------------------------------------ */
/*  FORM STATE TYPE                                                    */
/* ------------------------------------------------------------------ */
interface FormState {
  /* Step 1 — Marriage Location (Col 1) */
  marriageWard: string;
  marriageUnion: string;
  marriageUpazila: string;
  marriageDistrict: string;
  marriageDivision: string;
  marriageDate: string;

  /* Step 2 — Groom (Col 2,3,18) */
  groomNameBn: string;
  groomNameEn: string;
  groomFatherName: string;
  groomMotherName: string;
  groomNid: string;
  groomDob: string;
  groomReligion: string;
  groomNationality: string;
  groomOccupation: string;
  groomAddress: string;
  groomMaritalStatus: string;
  groomHasExistingWife: string;
  groomExistingWifeDetails: string;
  groomArbitrationPermission: string;

  /* Step 3 — Bride (Col 4,5,6,19) */
  brideNameBn: string;
  brideNameEn: string;
  brideFatherName: string;
  brideMotherName: string;
  brideNid: string;
  brideDob: string;
  brideReligion: string;
  brideNationality: string;
  brideOccupation: string;
  brideAddress: string;
  brideMaritalStatus: string;
  bridePriorMarriageDetails: string;

  /* Step 4 — Wakils (Col 7,8,9,10) */
  brideWakilName: string;
  brideWakilFatherName: string;
  brideWakilAddress: string;
  brideWakilWitness1Name: string;
  brideWakilWitness1Father: string;
  brideWakilWitness1Relation: string;
  brideWakilWitness2Name: string;
  brideWakilWitness2Father: string;
  brideWakilWitness2Relation: string;
  groomWakilName: string;
  groomWakilFatherName: string;
  groomWakilAddress: string;

  /* Step 5 — Witnesses (Col 11,20) */
  witness1Name: string;
  witness1FatherName: string;
  witness1Address: string;
  witness1Nid: string;
  witness2Name: string;
  witness2FatherName: string;
  witness2Address: string;
  witness2Nid: string;
  solemnizerName: string;
  solemnizerFatherName: string;
  solemnizerAddress: string;

  /* Step 6 — Dower (Col 13,14,15) */
  dowerTotal: string;
  dowerMujjal: string;
  dowerMuwajjal: string;
  dowerPaidAtMarriage: string;

  /* Step 7 — Conditions (Col 16,17,21) */
  talaqTafweez: string;
  talaqTafweezConditions: string;
  specialConditions: string;
  registrationFee: string;
}

const INITIAL_STATE: FormState = {
  marriageWard: "", marriageUnion: "", marriageUpazila: "", marriageDistrict: "", marriageDivision: "", marriageDate: "",
  groomNameBn: "", groomNameEn: "", groomFatherName: "", groomMotherName: "", groomNid: "", groomDob: "", groomReligion: "ইসলাম", groomNationality: "বাংলাদেশী", groomOccupation: "", groomAddress: "", groomMaritalStatus: "", groomHasExistingWife: "", groomExistingWifeDetails: "", groomArbitrationPermission: "",
  brideNameBn: "", brideNameEn: "", brideFatherName: "", brideMotherName: "", brideNid: "", brideDob: "", brideReligion: "ইসলাম", brideNationality: "বাংলাদেশী", brideOccupation: "", brideAddress: "", brideMaritalStatus: "", bridePriorMarriageDetails: "",
  brideWakilName: "", brideWakilFatherName: "", brideWakilAddress: "", brideWakilWitness1Name: "", brideWakilWitness1Father: "", brideWakilWitness1Relation: "", brideWakilWitness2Name: "", brideWakilWitness2Father: "", brideWakilWitness2Relation: "", groomWakilName: "", groomWakilFatherName: "", groomWakilAddress: "",
  witness1Name: "", witness1FatherName: "", witness1Address: "", witness1Nid: "", witness2Name: "", witness2FatherName: "", witness2Address: "", witness2Nid: "", solemnizerName: "", solemnizerFatherName: "", solemnizerAddress: "",
  dowerTotal: "", dowerMujjal: "", dowerMuwajjal: "", dowerPaidAtMarriage: "",
  talaqTafweez: "", talaqTafweezConditions: "", specialConditions: "", registrationFee: "",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
export default function MuslimMarriageFormPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
          <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <CardTitle className="text-green-800 text-xl">বিবাহ নিবন্ধন সফলভাবে সম্পন্ন হয়েছে</CardTitle>
          <p className="text-green-700 mt-2">নিবন্ধন নম্বর: <span className="font-mono font-bold">MR-DHK-{toBanglaDigits(2026)}-{toBanglaDigits("003458")}</span></p>
          <p className="text-sm text-green-600 mt-1">সনদ স্বয়ংক্রিয়ভাবে তৈরি হচ্ছে...</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button>সনদ ডাউনলোড করুন</Button>
            <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); setForm(INITIAL_STATE); }}>
              নতুন নিবন্ধন
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">মুসলিম বিবাহ নিবন্ধন (নিকাহনামা)</h1>
        <p className="text-sm text-text-secondary mt-1">
          কাবিননামা ফর্ম নং ১৬০১ অনুযায়ী — মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন, ১৯৭৪
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
                  step === s.id
                    ? "bg-primary text-white"
                    : step > s.id
                    ? "bg-green-100 text-green-700"
                    : "bg-surface-tertiary text-text-muted"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  step === s.id ? "bg-white/20" : step > s.id ? "bg-green-200" : "bg-border"
                }`}>
                  {step > s.id ? "✓" : toBanglaDigits(s.id)}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`mx-1 h-px w-4 sm:w-6 ${step > s.id ? "bg-green-300" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step Content */}
      <Card>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="info">ধাপ {toBanglaDigits(step)}/{toBanglaDigits(STEPS.length)}</Badge>
          <CardTitle>{STEPS[step - 1].title}</CardTitle>
        </div>
        <CardDescription className="mb-6">{STEPS[step - 1].titleEn}</CardDescription>

        {/* ========== STEP 1: Marriage Location ========== */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ১:</strong> বিবাহ সম্পাদনের স্থান — ওয়ার্ড, ইউনিয়ন/পৌরসভা, উপজেলা, জেলা, বিভাগ
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select label="বিভাগ (Division)" options={DIVISION_OPTIONS} value={form.marriageDivision} onChange={(e) => update("marriageDivision", e.target.value)} />
              <Input label="জেলা (District)" placeholder="জেলার নাম লিখুন" value={form.marriageDistrict} onChange={(e) => update("marriageDistrict", e.target.value)} />
              <Input label="উপজেলা / থানা (Upazila)" placeholder="উপজেলা / থানার নাম" value={form.marriageUpazila} onChange={(e) => update("marriageUpazila", e.target.value)} />
              <Input label="ইউনিয়ন / পৌরসভা (Union/Municipality)" placeholder="ইউনিয়ন বা পৌরসভার নাম" value={form.marriageUnion} onChange={(e) => update("marriageUnion", e.target.value)} />
              <Input label="ওয়ার্ড নম্বর (Ward No.)" placeholder="ওয়ার্ড নম্বর" value={form.marriageWard} onChange={(e) => update("marriageWard", e.target.value)} />
              <Input label="বিবাহের তারিখ (Marriage Date)" type="date" value={form.marriageDate} onChange={(e) => update("marriageDate", e.target.value)} hint="কলাম ১২: যে তারিখে বিবাহ সম্পাদিত হয়েছে" />
            </div>
          </div>
        )}

        {/* ========== STEP 2: Groom Details ========== */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ২-৩, ১৮:</strong> বরের সম্পূর্ণ তথ্য, বয়স/জন্মতারিখ, এবং বিদ্যমান স্ত্রী সংক্রান্ত তথ্য
            </div>

            {/* NID Verify Section */}
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-primary/30 bg-primary-50/30 p-4">
              <p className="text-sm font-medium text-primary mb-3">NID যাচাই করে তথ্য স্বয়ংক্রিয়ভাবে পূরণ করুন</p>
              <div className="flex gap-3">
                <Input label="বরের NID নম্বর" placeholder="১০ বা ১৭ সংখ্যার NID" value={form.groomNid} onChange={(e) => update("groomNid", e.target.value)} />
                <div className="flex items-end">
                  <Button size="sm">যাচাই</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="বরের নাম (বাংলা)" placeholder="সম্পূর্ণ নাম বাংলায়" value={form.groomNameBn} onChange={(e) => update("groomNameBn", e.target.value)} />
              <Input label="বরের নাম (ইংরেজি)" placeholder="Full name in English" value={form.groomNameEn} onChange={(e) => update("groomNameEn", e.target.value)} />
              <Input label="পিতার নাম" placeholder="পিতার সম্পূর্ণ নাম" value={form.groomFatherName} onChange={(e) => update("groomFatherName", e.target.value)} />
              <Input label="মাতার নাম" placeholder="মাতার সম্পূর্ণ নাম" value={form.groomMotherName} onChange={(e) => update("groomMotherName", e.target.value)} />
              <Input label="জন্ম তারিখ (Date of Birth)" type="date" value={form.groomDob} onChange={(e) => update("groomDob", e.target.value)} hint="বর অবশ্যই ২১ বছর বা তার বেশি বয়সী হতে হবে" />
              <Input label="পেশা (Occupation)" placeholder="পেশার বিবরণ" value={form.groomOccupation} onChange={(e) => update("groomOccupation", e.target.value)} />
              <div className="sm:col-span-2">
                <Input label="স্থায়ী ঠিকানা (Permanent Address)" placeholder="সম্পূর্ণ ঠিকানা" value={form.groomAddress} onChange={(e) => update("groomAddress", e.target.value)} />
              </div>
              <Select label="বৈবাহিক অবস্থা (Marital Status)" options={GROOM_MARITAL_STATUS_OPTIONS} value={form.groomMaritalStatus} onChange={(e) => update("groomMaritalStatus", e.target.value)} />
              <Input label="জাতীয়তা (Nationality)" value={form.groomNationality} onChange={(e) => update("groomNationality", e.target.value)} />
            </div>

            {/* Column 18 — Existing Wives */}
            {form.groomMaritalStatus === "married" && (
              <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-4 space-y-3">
                <p className="text-sm font-semibold text-amber-800">কলাম ১৮: বিদ্যমান স্ত্রী সংক্রান্ত তথ্য</p>
                <p className="text-xs text-amber-700">
                  মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১ অনুযায়ী সালিশ কাউন্সিলের অনুমতি প্রয়োজন
                </p>
                <Input label="বিদ্যমান স্ত্রী(দের) বিবরণ" placeholder="নাম, বিবাহের তারিখ, ঠিকানা" value={form.groomExistingWifeDetails} onChange={(e) => update("groomExistingWifeDetails", e.target.value)} />
                <Input label="সালিশ কাউন্সিলের অনুমতি নম্বর ও তারিখ" placeholder="অনুমতি নম্বর — তারিখ" value={form.groomArbitrationPermission} onChange={(e) => update("groomArbitrationPermission", e.target.value)} />
              </div>
            )}
          </div>
        )}

        {/* ========== STEP 3: Bride Details ========== */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ৪-৬, ১৯:</strong> কনের সম্পূর্ণ তথ্য, বৈবাহিক অবস্থা, বয়স/জন্মতারিখ, পূর্ববর্তী বিবাহ
            </div>

            {/* NID Verify Section */}
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-primary/30 bg-primary-50/30 p-4">
              <p className="text-sm font-medium text-primary mb-3">NID যাচাই করে তথ্য স্বয়ংক্রিয়ভাবে পূরণ করুন</p>
              <div className="flex gap-3">
                <Input label="কনের NID নম্বর" placeholder="১০ বা ১৭ সংখ্যার NID" value={form.brideNid} onChange={(e) => update("brideNid", e.target.value)} />
                <div className="flex items-end">
                  <Button size="sm">যাচাই</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="কনের নাম (বাংলা)" placeholder="সম্পূর্ণ নাম বাংলায়" value={form.brideNameBn} onChange={(e) => update("brideNameBn", e.target.value)} />
              <Input label="কনের নাম (ইংরেজি)" placeholder="Full name in English" value={form.brideNameEn} onChange={(e) => update("brideNameEn", e.target.value)} />
              <Input label="পিতার নাম" placeholder="পিতার সম্পূর্ণ নাম" value={form.brideFatherName} onChange={(e) => update("brideFatherName", e.target.value)} />
              <Input label="মাতার নাম" placeholder="মাতার সম্পূর্ণ নাম" value={form.brideMotherName} onChange={(e) => update("brideMotherName", e.target.value)} />
              <Input label="জন্ম তারিখ (Date of Birth)" type="date" value={form.brideDob} onChange={(e) => update("brideDob", e.target.value)} hint="কনে অবশ্যই ১৮ বছর বা তার বেশি বয়সী হতে হবে" />
              <Input label="পেশা (Occupation)" placeholder="পেশার বিবরণ" value={form.brideOccupation} onChange={(e) => update("brideOccupation", e.target.value)} />
              <div className="sm:col-span-2">
                <Input label="স্থায়ী ঠিকানা (Permanent Address)" placeholder="সম্পূর্ণ ঠিকানা" value={form.brideAddress} onChange={(e) => update("brideAddress", e.target.value)} />
              </div>
              <Select label="বৈবাহিক অবস্থা (কলাম ৫)" options={MARITAL_STATUS_OPTIONS} value={form.brideMaritalStatus} onChange={(e) => update("brideMaritalStatus", e.target.value)} />
              <Input label="জাতীয়তা (Nationality)" value={form.brideNationality} onChange={(e) => update("brideNationality", e.target.value)} />
            </div>

            {/* Column 19 — Prior Marriages */}
            {(form.brideMaritalStatus === "divorced" || form.brideMaritalStatus === "widowed") && (
              <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-4 space-y-3">
                <p className="text-sm font-semibold text-amber-800">কলাম ১৯: পূর্ববর্তী বিবাহের বিবরণ</p>
                <Input label="পূর্ববর্তী বিবাহ ও সমাপ্তির বিবরণ" placeholder="পূর্ববর্তী স্বামীর নাম, বিবাহের তারিখ, তালাক/মৃত্যুর তারিখ" value={form.bridePriorMarriageDetails} onChange={(e) => update("bridePriorMarriageDetails", e.target.value)} />
              </div>
            )}
          </div>
        )}

        {/* ========== STEP 4: Wakils ========== */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ৭-১০:</strong> কনের ওকিল ও তার সাক্ষী, বরের ওকিল ও তার সাক্ষী (প্রযোজ্য হলে)
            </div>
            <p className="text-xs text-text-muted">
              ওকালতনামা ঐচ্ছিক। বর বা কনে নিজে উপস্থিত থাকলে ওকিল প্রয়োজন নেই।
            </p>

            {/* Bride Wakil — Col 7,8 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">
                কনের ওকিল (কলাম ৭-৮)
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="ওকিলের নাম" placeholder="কনের ওকিলের নাম" value={form.brideWakilName} onChange={(e) => update("brideWakilName", e.target.value)} />
                <Input label="ওকিলের পিতার নাম" placeholder="পিতার নাম" value={form.brideWakilFatherName} onChange={(e) => update("brideWakilFatherName", e.target.value)} />
                <div className="sm:col-span-2">
                  <Input label="ওকিলের ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={form.brideWakilAddress} onChange={(e) => update("brideWakilAddress", e.target.value)} />
                </div>
              </div>
              <p className="text-xs text-text-muted mt-2">ওকিলের সাক্ষীগণ:</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input label="সাক্ষী ১ নাম" placeholder="নাম" value={form.brideWakilWitness1Name} onChange={(e) => update("brideWakilWitness1Name", e.target.value)} />
                <Input label="সাক্ষী ১ পিতার নাম" placeholder="পিতার নাম" value={form.brideWakilWitness1Father} onChange={(e) => update("brideWakilWitness1Father", e.target.value)} />
                <Input label="কনের সাথে সম্পর্ক" placeholder="সম্পর্ক" value={form.brideWakilWitness1Relation} onChange={(e) => update("brideWakilWitness1Relation", e.target.value)} />
                <Input label="সাক্ষী ২ নাম" placeholder="নাম" value={form.brideWakilWitness2Name} onChange={(e) => update("brideWakilWitness2Name", e.target.value)} />
                <Input label="সাক্ষী ২ পিতার নাম" placeholder="পিতার নাম" value={form.brideWakilWitness2Father} onChange={(e) => update("brideWakilWitness2Father", e.target.value)} />
                <Input label="কনের সাথে সম্পর্ক" placeholder="সম্পর্ক" value={form.brideWakilWitness2Relation} onChange={(e) => update("brideWakilWitness2Relation", e.target.value)} />
              </div>
            </div>

            {/* Groom Wakil — Col 9,10 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">
                বরের ওকিল (কলাম ৯-১০)
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="ওকিলের নাম" placeholder="বরের ওকিলের নাম" value={form.groomWakilName} onChange={(e) => update("groomWakilName", e.target.value)} />
                <Input label="ওকিলের পিতার নাম" placeholder="পিতার নাম" value={form.groomWakilFatherName} onChange={(e) => update("groomWakilFatherName", e.target.value)} />
                <div className="sm:col-span-2">
                  <Input label="ওকিলের ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={form.groomWakilAddress} onChange={(e) => update("groomWakilAddress", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 5: Witnesses ========== */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ১১, ২০:</strong> বিবাহের সাক্ষী (ন্যূনতম ২ জন প্রাপ্তবয়স্ক মুসলিম) এবং বিবাহ সম্পাদনকারী
            </div>

            {/* Witness 1 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">সাক্ষী ১</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="নাম" placeholder="সাক্ষীর সম্পূর্ণ নাম" value={form.witness1Name} onChange={(e) => update("witness1Name", e.target.value)} />
                <Input label="পিতার নাম" placeholder="পিতার নাম" value={form.witness1FatherName} onChange={(e) => update("witness1FatherName", e.target.value)} />
                <Input label="ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={form.witness1Address} onChange={(e) => update("witness1Address", e.target.value)} />
                <Input label="NID নম্বর" placeholder="NID নম্বর" value={form.witness1Nid} onChange={(e) => update("witness1Nid", e.target.value)} />
              </div>
            </div>

            {/* Witness 2 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">সাক্ষী ২</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="নাম" placeholder="সাক্ষীর সম্পূর্ণ নাম" value={form.witness2Name} onChange={(e) => update("witness2Name", e.target.value)} />
                <Input label="পিতার নাম" placeholder="পিতার নাম" value={form.witness2FatherName} onChange={(e) => update("witness2FatherName", e.target.value)} />
                <Input label="ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={form.witness2Address} onChange={(e) => update("witness2Address", e.target.value)} />
                <Input label="NID নম্বর" placeholder="NID নম্বর" value={form.witness2Nid} onChange={(e) => update("witness2Nid", e.target.value)} />
              </div>
            </div>

            {/* Solemnizer — Col 20 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text border-b border-border pb-2">
                বিবাহ সম্পাদনকারী (কলাম ২০)
              </h3>
              <p className="text-xs text-text-muted">যিনি বিবাহ পড়িয়েছেন (কাজী ব্যতীত অন্য কেউ হলে)</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="সম্পাদনকারীর নাম" placeholder="সম্পূর্ণ নাম" value={form.solemnizerName} onChange={(e) => update("solemnizerName", e.target.value)} />
                <Input label="পিতার নাম" placeholder="পিতার নাম" value={form.solemnizerFatherName} onChange={(e) => update("solemnizerFatherName", e.target.value)} />
                <div className="sm:col-span-2">
                  <Input label="ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={form.solemnizerAddress} onChange={(e) => update("solemnizerAddress", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 6: Dower / Mohr ========== */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ১৩-১৫:</strong> দেনমোহর (মোহরানা) — মোট পরিমাণ, নগদ (মুয়াজ্জল), বাকি (মুওয়াজ্জল), বিবাহকালে প্রদত্ত
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="মোট দেনমোহর (কলাম ১৩)" placeholder="মোট টাকার পরিমাণ" value={form.dowerTotal} onChange={(e) => update("dowerTotal", e.target.value)} hint="টাকায় সম্পূর্ণ পরিমাণ লিখুন" />
              <div />
              <Input label="নগদ / মুয়াজ্জল (কলাম ১৪ক)" placeholder="নগদ প্রদেয় অংশ" value={form.dowerMujjal} onChange={(e) => update("dowerMujjal", e.target.value)} hint="বিবাহের সময় বা চাহিদামাত্র প্রদেয়" />
              <Input label="বাকি / মুওয়াজ্জল (কলাম ১৪খ)" placeholder="বিলম্বিত অংশ" value={form.dowerMuwajjal} onChange={(e) => update("dowerMuwajjal", e.target.value)} hint="তালাক বা মৃত্যুতে প্রদেয়" />
              <Input label="বিবাহকালে প্রদত্ত (কলাম ১৫)" placeholder="বিবাহের সময় যা প্রদান করা হয়েছে" value={form.dowerPaidAtMarriage} onChange={(e) => update("dowerPaidAtMarriage", e.target.value)} hint="বিবাহ অনুষ্ঠানে প্রকৃত প্রদত্ত পরিমাণ" />
            </div>

            {/* Dower Summary */}
            {form.dowerTotal && (
              <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-800 mb-2">দেনমোহরের সারসংক্ষেপ</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-green-700">মোট মোহরানা:</p>
                  <p className="text-green-800 font-semibold text-right">৳ {form.dowerTotal || "—"}</p>
                  <p className="text-green-700">নগদ (মুয়াজ্জল):</p>
                  <p className="text-green-800 text-right">৳ {form.dowerMujjal || "—"}</p>
                  <p className="text-green-700">বাকি (মুওয়াজ্জল):</p>
                  <p className="text-green-800 text-right">৳ {form.dowerMuwajjal || "—"}</p>
                  <p className="text-green-700">বিবাহকালে প্রদত্ত:</p>
                  <p className="text-green-800 text-right">৳ {form.dowerPaidAtMarriage || "—"}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== STEP 7: Conditions ========== */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>কলাম ১৬-১৭, ২১:</strong> তালাক-ই-তাওফিজ (স্ত্রীকে তালাকের ক্ষমতা অর্পণ), বিশেষ শর্তাবলী, নিবন্ধন ফি
            </div>

            {/* Talaq-i-Tafweez — Col 16 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text">কলাম ১৬: তালাক-ই-তাওফিজ</h3>
              <p className="text-xs text-text-muted">
                স্বামী কর্তৃক স্ত্রীকে তালাক প্রদানের ক্ষমতা অর্পণ করা হয়েছে কি?
              </p>
              <Select label="তালাক-ই-তাওফিজ" options={YES_NO_OPTIONS} value={form.talaqTafweez} onChange={(e) => update("talaqTafweez", e.target.value)} />
              {form.talaqTafweez === "yes" && (
                <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 p-3">
                  <Input label="শর্তাবলী বিবরণ" placeholder="কোন শর্তে স্ত্রী তালাক দিতে পারবেন তার বিবরণ" value={form.talaqTafweezConditions} onChange={(e) => update("talaqTafweezConditions", e.target.value)} />
                </div>
              )}
            </div>

            {/* Special Conditions — Col 17 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text">কলাম ১৭: বিশেষ শর্তাবলী</h3>
              <p className="text-xs text-text-muted">
                উভয় পক্ষের মধ্যে সম্মত অতিরিক্ত শর্তাবলী (যদি থাকে)
              </p>
              <textarea
                className="w-full rounded-[var(--radius-md)] border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
                placeholder="বিশেষ শর্তাবলী লিখুন (ঐচ্ছিক)"
                value={form.specialConditions}
                onChange={(e) => update("specialConditions", e.target.value)}
              />
            </div>

            {/* Registration Fee — Col 21 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text">কলাম ২১: নিবন্ধন ফি</h3>
              <Input label="নিবন্ধন ফি (Registration Fee)" placeholder="ফি-র পরিমাণ" value={form.registrationFee} onChange={(e) => update("registrationFee", e.target.value)} hint="সরকার নির্ধারিত ফি" />
            </div>
          </div>
        )}

        {/* ========== STEP 8: Review & Submit ========== */}
        {step === 8 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              সকল তথ্য পুনরায় যাচাই করুন। নিবন্ধনের পর তথ্য পরিবর্তন করতে বর ও কনে উভয়ের স্বাক্ষর প্রয়োজন হবে।
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Marriage Info */}
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-3">বিবাহের তথ্য</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">তারিখ:</dt><dd className="text-text font-medium">{form.marriageDate || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">স্থান:</dt><dd className="text-text font-medium text-right">{form.marriageWard && `ওয়ার্ড ${form.marriageWard}, `}{form.marriageUnion || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">উপজেলা/জেলা:</dt><dd className="text-text font-medium">{form.marriageUpazila || "—"}, {form.marriageDistrict || "—"}</dd></div>
                </dl>
              </div>

              {/* Groom */}
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-3">বরের তথ্য</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="text-text font-medium">{form.groomNameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পিতা:</dt><dd className="text-text">{form.groomFatherName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">NID:</dt><dd className="text-text font-mono">{form.groomNid || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">জন্ম তারিখ:</dt><dd className="text-text">{form.groomDob || "—"}</dd></div>
                </dl>
              </div>

              {/* Bride */}
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-3">কনের তথ্য</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="text-text font-medium">{form.brideNameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">পিতা:</dt><dd className="text-text">{form.brideFatherName || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">NID:</dt><dd className="text-text font-mono">{form.brideNid || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">অবস্থা:</dt><dd className="text-text">{form.brideMaritalStatus === "unmarried" ? "কুমারী" : form.brideMaritalStatus === "divorced" ? "তালাকপ্রাপ্তা" : form.brideMaritalStatus === "widowed" ? "বিধবা" : "—"}</dd></div>
                </dl>
              </div>

              {/* Dower */}
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-primary mb-3">দেনমোহর</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">মোট:</dt><dd className="text-text font-semibold">৳ {form.dowerTotal || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">নগদ:</dt><dd className="text-text">৳ {form.dowerMujjal || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">বাকি:</dt><dd className="text-text">৳ {form.dowerMuwajjal || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">তালাক-ই-তাওফিজ:</dt><dd className="text-text">{form.talaqTafweez === "yes" ? "হ্যাঁ" : form.talaqTafweez === "no" ? "না" : "—"}</dd></div>
                </dl>
              </div>
            </div>

            {/* Witnesses Summary */}
            <div className="rounded-[var(--radius-md)] border border-border p-4">
              <h3 className="text-sm font-semibold text-primary mb-3">সাক্ষীগণ</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {form.witness1Name && (
                  <div className="p-2 bg-surface-tertiary rounded-[var(--radius-sm)]">
                    <p className="font-medium text-text">{form.witness1Name}</p>
                    <p className="text-xs text-text-muted">পিতা: {form.witness1FatherName}</p>
                  </div>
                )}
                {form.witness2Name && (
                  <div className="p-2 bg-surface-tertiary rounded-[var(--radius-sm)]">
                    <p className="font-medium text-text">{form.witness2Name}</p>
                    <p className="text-xs text-text-muted">পিতা: {form.witness2FatherName}</p>
                  </div>
                )}
                {form.solemnizerName && (
                  <div className="p-2 bg-surface-tertiary rounded-[var(--radius-sm)]">
                    <p className="font-medium text-text">{form.solemnizerName}</p>
                    <p className="text-xs text-text-muted">সম্পাদনকারী</p>
                  </div>
                )}
              </div>
            </div>

            {/* Consent Notice */}
            <div className="rounded-[var(--radius-md)] border-2 border-amber-300 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800">গুরুত্বপূর্ণ সতর্কতা</p>
                  <ul className="mt-1 text-sm text-amber-700 space-y-1">
                    <li>• নিবন্ধনের পর যেকোনো তথ্য সংশোধনে বর ও কনে উভয়ের স্বাক্ষর বাধ্যতামূলক</li>
                    <li>• মিথ্যা তথ্য প্রদান শাস্তিযোগ্য অপরাধ (ধারা ৫, মুসলিম বিবাহ আইন ১৯৭৪)</li>
                    <li>• কলাম ২৩: বর, কনে, ওকিলগণ, সাক্ষীগণ এবং কাজীর স্বাক্ষর ও সীলমোহর প্রয়োজন</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={prev}
            disabled={step === 1}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            পূর্ববর্তী
          </Button>

          <p className="text-xs text-text-muted">
            ধাপ {toBanglaDigits(step)} / {toBanglaDigits(STEPS.length)}
          </p>

          {step < STEPS.length ? (
            <Button onClick={next}>
              পরবর্তী
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          ) : (
            <Button onClick={() => setSubmitted(true)}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              নিবন্ধন সম্পন্ন করুন
            </Button>
          )}
        </div>
      </Card>

      {/* Law Reference */}
      <div className="text-center text-xs text-text-muted space-y-1">
        <p>মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন, ১৯৭৪ | মুসলিম বিবাহ ও তালাক (নিবন্ধন) বিধিমালা, ১৯৭৫</p>
        <p>কাবিননামা ফর্ম নং ১৬০১ — ২৩ কলাম</p>
      </div>
    </div>
  );
}
