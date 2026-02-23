"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toBanglaDigits } from "@/lib/utils";

type VerificationType = "nid" | "birth";

interface VerifiedPerson {
  namebn: string;
  nameen: string;
  fatherName: string;
  motherName: string;
  dob: string;
  nid: string;
  birthCertNo?: string;
  address: string;
  gender: string;
  photoPlaceholder: string;
}

/** Mock NID verification result */
const MOCK_NID_RESULT: VerifiedPerson = {
  namebn: "মোঃ রাশেদ হোসেন",
  nameen: "Md. Rashed Hossain",
  fatherName: "মোঃ করিম হোসেন",
  motherName: "হালিমা খাতুন",
  dob: "১৫ জুন ১৯৯৫",
  nid: "১৯৯৫৭২৬৮৯৩৪",
  address: "বাড়ি ২৩, রোড ৭, ধানমন্ডি, ঢাকা-১২০৫",
  gender: "পুরুষ",
  photoPlaceholder: "রা.হো.",
};

/** Mock Birth Certificate verification result */
const MOCK_BIRTH_RESULT: VerifiedPerson = {
  namebn: "ফাতেমা খাতুন",
  nameen: "Fatema Khatun",
  fatherName: "মোঃ আলী আকবর",
  motherName: "রেহানা বেগম",
  dob: "২২ মার্চ ১৯৯৮",
  nid: "১৯৯৮৮১২৩৪৫৬",
  birthCertNo: "২০০৩১২৩৪৫৬৭৮৯",
  address: "গ্রাম: পূর্ব চর, উপজেলা: সদর, জেলা: ঢাকা",
  gender: "মহিলা",
  photoPlaceholder: "ফা.খা.",
};

export default function VerifyNidPage() {
  const [verificationType, setVerificationType] = useState<VerificationType>("nid");
  const [documentNumber, setDocumentNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifiedData, setVerifiedData] = useState<VerifiedPerson | null>(null);
  const [error, setError] = useState("");

  const handleVerify = () => {
    setError("");
    setVerified(false);
    setVerifiedData(null);

    if (!documentNumber.trim()) {
      setError(
        verificationType === "nid"
          ? "NID নম্বর লিখুন"
          : "জন্মনিবন্ধন নম্বর লিখুন"
      );
      return;
    }
    if (!dateOfBirth) {
      setError("জন্ম তারিখ নির্বাচন করুন");
      return;
    }

    setIsVerifying(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      setVerifiedData(
        verificationType === "nid" ? MOCK_NID_RESULT : MOCK_BIRTH_RESULT
      );
    }, 1500);
  };

  const handleReset = () => {
    setDocumentNumber("");
    setDateOfBirth("");
    setVerified(false);
    setVerifiedData(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">
          NID / জন্মসনদ যাচাই
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          বিবাহ নিবন্ধনের পূর্বে বর/কনের পরিচয় যাচাই করুন — Verify NID or
          Birth Certificate before registration
        </p>
      </div>

      {/* Verification Type Toggle */}
      <Card>
        <CardTitle>যাচাইয়ের ধরণ নির্বাচন করুন</CardTitle>
        <CardDescription>
          জাতীয় পরিচয়পত্র অথবা জন্ম নিবন্ধন সনদ দিয়ে যাচাই করা যায়
        </CardDescription>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => {
              setVerificationType("nid");
              handleReset();
            }}
            className={`flex-1 rounded-[var(--radius-md)] border-2 p-4 text-center transition-all cursor-pointer ${
              verificationType === "nid"
                ? "border-primary bg-primary-50 text-primary"
                : "border-border bg-white text-text-secondary hover:border-primary/30"
            }`}
          >
            <svg
              className="mx-auto h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
            <p className="text-sm font-semibold">জাতীয় পরিচয়পত্র (NID)</p>
            <p className="text-xs mt-0.5 opacity-70">National ID Card</p>
          </button>

          <button
            onClick={() => {
              setVerificationType("birth");
              handleReset();
            }}
            className={`flex-1 rounded-[var(--radius-md)] border-2 p-4 text-center transition-all cursor-pointer ${
              verificationType === "birth"
                ? "border-primary bg-primary-50 text-primary"
                : "border-border bg-white text-text-secondary hover:border-primary/30"
            }`}
          >
            <svg
              className="mx-auto h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="text-sm font-semibold">জন্ম নিবন্ধন সনদ</p>
            <p className="text-xs mt-0.5 opacity-70">Birth Certificate</p>
          </button>
        </div>
      </Card>

      {/* Input Form */}
      <Card>
        <CardTitle>
          {verificationType === "nid"
            ? "NID তথ্য প্রদান করুন"
            : "জন্ম নিবন্ধন তথ্য প্রদান করুন"}
        </CardTitle>
        <CardDescription>
          {verificationType === "nid"
            ? "১০ অথবা ১৭ সংখ্যার NID নম্বর ও জন্ম তারিখ দিন"
            : "১৭ সংখ্যার জন্ম নিবন্ধন নম্বর ও জন্ম তারিখ দিন"}
        </CardDescription>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label={
              verificationType === "nid"
                ? "NID নম্বর (NID Number)"
                : "জন্ম নিবন্ধন নম্বর (Birth Reg. No.)"
            }
            placeholder={
              verificationType === "nid"
                ? "১০ বা ১৭ সংখ্যার NID নম্বর"
                : "১৭ সংখ্যার জন্ম নিবন্ধন নম্বর"
            }
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            error={
              error &&
              (error.includes("NID") || error.includes("জন্মনিবন্ধন"))
                ? error
                : undefined
            }
          />
          <Input
            label="জন্ম তারিখ (Date of Birth)"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            error={error && error.includes("জন্ম তারিখ") ? error : undefined}
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={handleVerify} disabled={isVerifying}>
            {isVerifying ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                যাচাই হচ্ছে...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                যাচাই করুন
              </>
            )}
          </Button>
          {verified && (
            <Button variant="outline" onClick={handleReset}>
              নতুন যাচাই
            </Button>
          )}
        </div>
      </Card>

      {/* Verification Result */}
      {verified && verifiedData && (
        <Card className="border-2 border-green-300 bg-green-50/50">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <CardTitle className="text-green-800">
              যাচাই সফল হয়েছে
            </CardTitle>
            <Badge variant="success">Verified</Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Photo placeholder */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-28 w-24 items-center justify-center rounded-[var(--radius-md)] border-2 border-dashed border-green-300 bg-green-100 text-green-700">
                <div className="text-center">
                  <svg
                    className="mx-auto h-8 w-8 mb-1 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span className="text-xs font-bold">
                    {verifiedData.photoPlaceholder}
                  </span>
                </div>
              </div>
              <span className="text-xs text-green-700 font-medium">
                ছবি
              </span>
            </div>

            {/* Verified data grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <p className="text-xs text-text-muted font-medium">
                  নাম (বাংলা)
                </p>
                <p className="text-sm font-semibold text-text">
                  {verifiedData.namebn}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">
                  নাম (ইংরেজি)
                </p>
                <p className="text-sm font-semibold text-text">
                  {verifiedData.nameen}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">
                  জন্ম তারিখ
                </p>
                <p className="text-sm text-text">{verifiedData.dob}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">লিঙ্গ</p>
                <p className="text-sm text-text">{verifiedData.gender}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">
                  পিতার নাম
                </p>
                <p className="text-sm text-text">
                  {verifiedData.fatherName}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">
                  মাতার নাম
                </p>
                <p className="text-sm text-text">
                  {verifiedData.motherName}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">
                  NID নম্বর
                </p>
                <p className="text-sm text-text font-mono">
                  {verifiedData.nid}
                </p>
              </div>
              {verifiedData.birthCertNo && (
                <div>
                  <p className="text-xs text-text-muted font-medium">
                    জন্ম নিবন্ধন নম্বর
                  </p>
                  <p className="text-sm text-text font-mono">
                    {verifiedData.birthCertNo}
                  </p>
                </div>
              )}
              <div className="sm:col-span-2">
                <p className="text-xs text-text-muted font-medium">
                  স্থায়ী ঠিকানা
                </p>
                <p className="text-sm text-text">{verifiedData.address}</p>
              </div>
            </div>
          </div>

          {/* Actions after verification */}
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-green-200 pt-4">
            <Button size="sm">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12zm-3 0h.008v.008H15.75V12z"
                />
              </svg>
              প্রিন্ট করুন
            </Button>
            <Button variant="outline" size="sm">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              PDF ডাউনলোড
            </Button>
            <span className="text-xs text-text-muted ml-auto">
              যাচাই সময়: {toBanglaDigits("23")}/{toBanglaDigits("02")}/
              {toBanglaDigits("2026")} &mdash; {toBanglaDigits("10")}:
              {toBanglaDigits("35")} AM
            </span>
          </div>
        </Card>
      )}

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <div className="flex gap-3">
          <svg
            className="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-800">
              গুরুত্বপূর্ণ তথ্য
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>
                -- বিবাহ নিবন্ধনের পূর্বে বর ও কনে উভয়ের NID/জন্মসনদ যাচাই
                বাধ্যতামূলক।
              </li>
              <li>
                -- NID যাচাই বাংলাদেশ নির্বাচন কমিশনের সার্ভারের সাথে সরাসরি
                সংযুক্ত।
              </li>
              <li>
                -- জন্ম নিবন্ধন যাচাই BRDB (Birth &amp; Death Registration)
                সিস্টেমের মাধ্যমে সম্পন্ন হয়।
              </li>
              <li>
                -- যাচাই ব্যর্থ হলে নাগরিককে সংশ্লিষ্ট কার্যালয়ে যোগাযোগ করতে
                বলুন।
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
