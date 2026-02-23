"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "পক্ষ ১ (Party 1)", titleEn: "Party 1 Details" },
  { id: 2, title: "পক্ষ ২ (Party 2)", titleEn: "Party 2 Details" },
  { id: 3, title: "নোটিশ তথ্য", titleEn: "14-Day Notice" },
  { id: 4, title: "সাক্ষী ও ঘোষণা", titleEn: "Witnesses & Declaration" },
  { id: 5, title: "পর্যালোচনা", titleEn: "Review & Submit" },
];

const RELIGION_OPTIONS = [
  { value: "", label: "ধর্ম নির্বাচন" },
  { value: "ইসলাম", label: "ইসলাম" },
  { value: "হিন্দু", label: "হিন্দু" },
  { value: "খ্রিস্টান", label: "খ্রিস্টান" },
  { value: "বৌদ্ধ", label: "বৌদ্ধ" },
  { value: "অন্যান্য", label: "অন্যান্য" },
  { value: "নাস্তিক/ধর্মনিরপেক্ষ", label: "নাস্তিক/ধর্মনিরপেক্ষ" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "", label: "নির্বাচন করুন" },
  { value: "unmarried", label: "অবিবাহিত" },
  { value: "divorced", label: "তালাকপ্রাপ্ত" },
  { value: "widowed", label: "বিধবা/বিপত্নীক" },
];

const NATIONALITY_OPTIONS = [
  { value: "", label: "নির্বাচন করুন" },
  { value: "bangladeshi", label: "বাংলাদেশী" },
  { value: "foreign", label: "বিদেশী" },
];

export default function SpecialMarriageFormPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  /* Party 1 */
  const [p1NameBn, setP1NameBn] = useState("");
  const [p1NameEn, setP1NameEn] = useState("");
  const [p1FatherName, setP1FatherName] = useState("");
  const [p1MotherName, setP1MotherName] = useState("");
  const [p1Nid, setP1Nid] = useState("");
  const [p1Dob, setP1Dob] = useState("");
  const [p1Religion, setP1Religion] = useState("");
  const [p1Nationality, setP1Nationality] = useState("");
  const [p1Address, setP1Address] = useState("");
  const [p1MaritalStatus, setP1MaritalStatus] = useState("");
  const [p1Passport, setP1Passport] = useState("");

  /* Party 2 */
  const [p2NameBn, setP2NameBn] = useState("");
  const [p2NameEn, setP2NameEn] = useState("");
  const [p2FatherName, setP2FatherName] = useState("");
  const [p2MotherName, setP2MotherName] = useState("");
  const [p2Nid, setP2Nid] = useState("");
  const [p2Dob, setP2Dob] = useState("");
  const [p2Religion, setP2Religion] = useState("");
  const [p2Nationality, setP2Nationality] = useState("");
  const [p2Address, setP2Address] = useState("");
  const [p2MaritalStatus, setP2MaritalStatus] = useState("");
  const [p2Passport, setP2Passport] = useState("");

  /* Notice */
  const [noticeDate, setNoticeDate] = useState("");
  const [noticeDistrict, setNoticeDistrict] = useState("");
  const [residenceDuration, setResidenceDuration] = useState("");

  /* Witnesses */
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
      <div className="space-y-6">
        <Card className="border-2 border-green-300 bg-green-50/50 text-center py-8">
          <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <CardTitle className="text-green-800 text-xl">নোটিশ দাখিল সফল</CardTitle>
          <p className="text-green-700 mt-2">১৪ দিনের নোটিশ পিরিয়ড শুরু হয়েছে</p>
          <p className="text-sm text-green-600 mt-1">আপত্তি না আসলে {noticeDate ? "নোটিশের তারিখ থেকে ১৪ দিন পর" : "নির্ধারিত তারিখে"} বিবাহ সম্পন্ন করা যাবে</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button>নোটিশ স্ট্যাটাস দেখুন</Button>
            <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>নতুন নিবন্ধন</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">বিশেষ বিবাহ নিবন্ধন</h1>
        <p className="text-sm text-text-secondary mt-1">
          বিশেষ বিবাহ আইন, ১৮৭২ — আন্তঃধর্মীয়, সিভিল, বা বিদেশি নাগরিকদের বিবাহ
        </p>
      </div>

      {/* 14-Day Notice Alert */}
      <div className="rounded-[var(--radius-md)] border-2 border-blue-300 bg-blue-50 p-4 flex items-start gap-3">
        <svg className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-blue-800">১৪ দিনের নোটিশ বাধ্যতামূলক (ধারা ৬)</p>
          <p className="text-xs text-blue-700 mt-1">
            বিশেষ বিবাহ আইন অনুযায়ী বিবাহের ১৪ দিন পূর্বে নোটিশ প্রকাশ করতে হবে।
            এই সময়ের মধ্যে যেকোনো ব্যক্তি আপত্তি দাখিল করতে পারবেন। আপত্তি না আসলে বিবাহ সম্পন্ন করা যাবে।
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <Card padding="sm">
        <div className="flex items-center overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  step === s.id ? "bg-blue-600 text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"
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
          <Badge variant="info">ধাপ {toBanglaDigits(step)}/{toBanglaDigits(STEPS.length)}</Badge>
          <CardTitle>{STEPS[step - 1].title}</CardTitle>
        </div>
        <CardDescription className="mb-6">{STEPS[step - 1].titleEn}</CardDescription>

        {/* Step 1: Party 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-blue-300 bg-blue-50/30 p-4">
              <p className="text-sm font-medium text-blue-700 mb-3">NID / পাসপোর্ট যাচাই করুন</p>
              <div className="flex gap-3">
                <Input label="NID নম্বর" placeholder="NID নম্বর" value={p1Nid} onChange={(e) => setP1Nid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={p1NameBn} onChange={(e) => setP1NameBn(e.target.value)} />
              <Input label="Name (English)" value={p1NameEn} onChange={(e) => setP1NameEn(e.target.value)} />
              <Input label="পিতার নাম" value={p1FatherName} onChange={(e) => setP1FatherName(e.target.value)} />
              <Input label="মাতার নাম" value={p1MotherName} onChange={(e) => setP1MotherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={p1Dob} onChange={(e) => setP1Dob(e.target.value)} hint="বয়স কমপক্ষে ১৮ বছর" />
              <Select label="ধর্ম" options={RELIGION_OPTIONS} value={p1Religion} onChange={(e) => setP1Religion(e.target.value)} />
              <Select label="জাতীয়তা" options={NATIONALITY_OPTIONS} value={p1Nationality} onChange={(e) => setP1Nationality(e.target.value)} />
              <Select label="বৈবাহিক অবস্থা" options={MARITAL_STATUS_OPTIONS} value={p1MaritalStatus} onChange={(e) => setP1MaritalStatus(e.target.value)} />
              {p1Nationality === "foreign" && (
                <Input label="পাসপোর্ট নম্বর" placeholder="Passport Number" value={p1Passport} onChange={(e) => setP1Passport(e.target.value)} />
              )}
              <div className="sm:col-span-2">
                <Input label="ঠিকানা" placeholder="সম্পূর্ণ ঠিকানা" value={p1Address} onChange={(e) => setP1Address(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Party 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border-2 border-dashed border-blue-300 bg-blue-50/30 p-4">
              <p className="text-sm font-medium text-blue-700 mb-3">NID / পাসপোর্ট যাচাই করুন</p>
              <div className="flex gap-3">
                <Input label="NID নম্বর" value={p2Nid} onChange={(e) => setP2Nid(e.target.value)} />
                <div className="flex items-end"><Button size="sm">যাচাই</Button></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নাম (বাংলা)" value={p2NameBn} onChange={(e) => setP2NameBn(e.target.value)} />
              <Input label="Name (English)" value={p2NameEn} onChange={(e) => setP2NameEn(e.target.value)} />
              <Input label="পিতার নাম" value={p2FatherName} onChange={(e) => setP2FatherName(e.target.value)} />
              <Input label="মাতার নাম" value={p2MotherName} onChange={(e) => setP2MotherName(e.target.value)} />
              <Input label="জন্ম তারিখ" type="date" value={p2Dob} onChange={(e) => setP2Dob(e.target.value)} />
              <Select label="ধর্ম" options={RELIGION_OPTIONS} value={p2Religion} onChange={(e) => setP2Religion(e.target.value)} />
              <Select label="জাতীয়তা" options={NATIONALITY_OPTIONS} value={p2Nationality} onChange={(e) => setP2Nationality(e.target.value)} />
              <Select label="বৈবাহিক অবস্থা" options={MARITAL_STATUS_OPTIONS} value={p2MaritalStatus} onChange={(e) => setP2MaritalStatus(e.target.value)} />
              {p2Nationality === "foreign" && (
                <Input label="পাসপোর্ট নম্বর" value={p2Passport} onChange={(e) => setP2Passport(e.target.value)} />
              )}
              <div className="sm:col-span-2">
                <Input label="ঠিকানা" value={p2Address} onChange={(e) => setP2Address(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 14-Day Notice */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>ধারা ৫-৬:</strong> উভয় পক্ষের যেকোনো একজনকে ন্যূনতম ১৪ দিন পূর্বে যে জেলায় বসবাস করছেন সেই জেলার
              নিবন্ধকের নিকট লিখিত নোটিশ দিতে হবে। নোটিশ &ldquo;Marriage Notice Book under Act III of 1872&rdquo;-এ লিপিবদ্ধ হবে।
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="নোটিশের তারিখ (Notice Date)" type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} hint="নোটিশ দাখিলের তারিখ" />
              <Input label="নোটিশ জেলা (Notice District)" placeholder="যে জেলায় নোটিশ দাখিল করা হচ্ছে" value={noticeDistrict} onChange={(e) => setNoticeDistrict(e.target.value)} />
              <Input label="বসবাসের সময়কাল" placeholder="ন্যূনতম ১৪ দিন" value={residenceDuration} onChange={(e) => setResidenceDuration(e.target.value)} hint="আবেদনকারী কতদিন ধরে উক্ত জেলায় বসবাস করছেন" />
            </div>

            {/* Notice Timeline */}
            <div className="rounded-[var(--radius-md)] border border-border p-4">
              <h3 className="text-sm font-semibold text-text mb-3">নোটিশ প্রক্রিয়া টাইমলাইন</h3>
              <div className="space-y-4">
                {[
                  { label: "নোটিশ দাখিল", desc: "নিবন্ধকের কাছে লিখিত নোটিশ জমা", done: true },
                  { label: "নোটিশ বুকে এন্ট্রি", desc: "Marriage Notice Book-এ লিপিবদ্ধ", done: true },
                  { label: "১৪ দিন অপেক্ষা", desc: "আপত্তি দাখিলের সময়সীমা", done: false },
                  { label: "বিবাহ সম্পাদন", desc: "নিবন্ধকের সামনে ঘোষণা ও স্বাক্ষর", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      item.done ? "bg-green-100 text-green-700" : "bg-surface-tertiary text-text-muted"
                    }`}>
                      {item.done ? "✓" : toBanglaDigits(i + 1)}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${item.done ? "text-green-700" : "text-text"}`}>{item.label}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Witnesses & Declaration */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              <strong>ধারা ১০-১১:</strong> ৩ জন সাক্ষীর সামনে নিবন্ধকের সম্মুখে ঘোষণা —
              &ldquo;I [A], take thee [B], to be my lawful wife/husband&rdquo;
            </div>

            {["১", "২", "৩"].map((num, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-sm font-semibold text-text border-b border-border pb-2">সাক্ষী {num}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="নাম"
                    value={i === 0 ? w1Name : i === 1 ? w2Name : w3Name}
                    onChange={(e) => i === 0 ? setW1Name(e.target.value) : i === 1 ? setW2Name(e.target.value) : setW3Name(e.target.value)}
                  />
                  <Input
                    label="NID নম্বর"
                    value={i === 0 ? w1Nid : i === 1 ? w2Nid : w3Nid}
                    onChange={(e) => i === 0 ? setW1Nid(e.target.value) : i === 1 ? setW2Nid(e.target.value) : setW3Nid(e.target.value)}
                  />
                </div>
              </div>
            ))}

            {/* Declaration Text */}
            <div className="rounded-[var(--radius-md)] border-2 border-primary/20 bg-primary-50 p-4">
              <p className="text-sm font-semibold text-primary mb-2">ঘোষণা (Declaration — Third Schedule)</p>
              <div className="text-sm text-text space-y-2 italic">
                <p>&ldquo;আমি, <strong>{p1NameBn || "[পক্ষ ১]"}</strong>, এই ঘোষণা করিতেছি যে, আমি <strong>{p2NameBn || "[পক্ষ ২]"}</strong>-কে আমার বৈধ স্ত্রী/স্বামী হিসাবে গ্রহণ করিতেছি।&rdquo;</p>
                <p className="text-xs text-text-muted">&ldquo;I, {p1NameEn || "[Party 1]"}, take thee, {p2NameEn || "[Party 2]"}, to be my lawful wife/husband.&rdquo;</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="rounded-[var(--radius-md)] border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              সকল তথ্য যাচাই করুন। নোটিশ দাখিলের পর ১৪ দিন আপত্তি না আসলে বিবাহ সম্পন্ন করা যাবে।
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-blue-600 mb-3">পক্ষ ১</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="font-medium">{p1NameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">ধর্ম:</dt><dd>{p1Religion || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">জাতীয়তা:</dt><dd>{p1Nationality === "bangladeshi" ? "বাংলাদেশী" : p1Nationality === "foreign" ? "বিদেশী" : "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-blue-600 mb-3">পক্ষ ২</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">নাম:</dt><dd className="font-medium">{p2NameBn || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">ধর্ম:</dt><dd>{p2Religion || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">জাতীয়তা:</dt><dd>{p2Nationality === "bangladeshi" ? "বাংলাদেশী" : p2Nationality === "foreign" ? "বিদেশী" : "—"}</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-blue-600 mb-3">নোটিশ তথ্য</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-muted">তারিখ:</dt><dd>{noticeDate || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">জেলা:</dt><dd>{noticeDistrict || "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-muted">আপত্তি সীমা:</dt><dd className="font-medium text-blue-600">নোটিশ + ১৪ দিন</dd></div>
                </dl>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border p-4">
                <h3 className="text-sm font-semibold text-blue-600 mb-3">সাক্ষীগণ</h3>
                <div className="space-y-1 text-sm">
                  {w1Name && <p>১. {w1Name}</p>}
                  {w2Name && <p>২. {w2Name}</p>}
                  {w3Name && <p>৩. {w3Name}</p>}
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
            <Button onClick={() => setSubmitted(true)}>নোটিশ দাখিল করুন</Button>
          )}
        </div>
      </Card>

      <p className="text-center text-xs text-text-muted">বিশেষ বিবাহ আইন, ১৮৭২ (Act III of 1872)</p>
    </div>
  );
}
