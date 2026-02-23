"use client";

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MY_CERTIFICATES = [
  {
    id: "CERT-2026-00312",
    applicationId: "APP-2026-018",
    bride: "সাবিহা আক্তার",
    groom: "মোঃ আব্দুল করিম",
    type: "মুসলিম বিবাহ",
    typeEn: "Muslim Marriage",
    marriageDate: "৫ ফেব্রুয়ারি ২০২৬",
    issueDate: "৮ ফেব্রুয়ারি ২০২৬",
    registrar: "মাওলানা আব্দুর রহমান",
    registrarOffice: "ধানমন্ডি, ঢাকা",
  },
  {
    id: "CERT-2025-01847",
    applicationId: "APP-2025-142",
    bride: "আয়েশা সিদ্দিকা",
    groom: "মোঃ আব্দুল করিম",
    type: "মুসলিম বিবাহ",
    typeEn: "Muslim Marriage",
    marriageDate: "১২ নভেম্বর ২০২৫",
    issueDate: "১৫ নভেম্বর ২০২৫",
    registrar: "মাওলানা জাকির হোসেন",
    registrarOffice: "মিরপুর, ঢাকা",
  },
  {
    id: "CERT-2025-00983",
    applicationId: "APP-2025-098",
    bride: "রুবিনা পারভীন",
    groom: "মোঃ আব্দুল করিম",
    type: "বিশেষ বিবাহ",
    typeEn: "Special Marriage",
    marriageDate: "২০ জুন ২০২৫",
    issueDate: "২৫ জুন ২০২৫",
    registrar: "জনাব আবুল কালাম আজাদ",
    registrarOffice: "গুলশান, ঢাকা",
  },
];

export default function CitizenCertificatesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">আমার সনদ</h1>
        <p className="text-sm text-text-secondary mt-1">
          আপনার প্রাপ্ত বিবাহ নিবন্ধন সনদসমূহ
        </p>
      </div>

      {/* Certificates Count */}
      <div className="flex items-center gap-2">
        <Badge variant="success">৩টি সনদ</Badge>
        <span className="text-xs text-text-muted">
          ডাউনলোডের জন্য প্রস্তুত
        </span>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {MY_CERTIFICATES.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 min-w-0">
                {/* Certificate Number */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    <span className="text-sm font-semibold text-green-700">
                      যাচাইকৃত সনদ
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-muted bg-surface-tertiary px-2 py-0.5 rounded">
                    {cert.id}
                  </span>
                </div>

                {/* Marriage Type */}
                <p className="text-base font-semibold text-text">{cert.type}</p>
                <p className="text-xs text-text-muted mb-3">{cert.typeEn}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <svg className="h-4 w-4 shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <div>
                      <p className="text-xs text-text-muted">বর ও কনে</p>
                      <p className="text-sm text-text">
                        {cert.groom} &#8596; {cert.bride}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="h-4 w-4 shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <div>
                      <p className="text-xs text-text-muted">বিবাহের তারিখ</p>
                      <p className="text-sm text-text">{cert.marriageDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="h-4 w-4 shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <div>
                      <p className="text-xs text-text-muted">সনদ ইস্যুর তারিখ</p>
                      <p className="text-sm text-text">{cert.issueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="h-4 w-4 shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                    <div>
                      <p className="text-xs text-text-muted">নিবন্ধক</p>
                      <p className="text-sm text-text">{cert.registrar}</p>
                      <p className="text-xs text-text-muted">{cert.registrarOffice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder + Actions */}
              <div className="flex flex-row lg:flex-col items-center gap-4 lg:items-end">
                {/* QR Code Placeholder */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[var(--radius-md)] border-2 border-dashed border-border bg-surface-tertiary">
                  <div className="text-center">
                    <svg className="mx-auto h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                    </svg>
                    <p className="text-[10px] text-text-muted mt-1">QR Code</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Button variant="primary" size="sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    PDF ডাউনলোড
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                    শেয়ার
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Verification Info */}
      <Card className="border-green-200 bg-green-50/50">
        <div className="flex gap-3">
          <svg className="h-5 w-5 shrink-0 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-800">
              সনদ যাচাই করুন
            </p>
            <p className="text-sm text-green-700 mt-1">
              আপনার সনদ যেকোনো সময় অনলাইনে যাচাই করা যাবে। সনদ নম্বর অথবা QR কোড ব্যবহার করে{" "}
              <Link href="/verify" className="font-medium underline underline-offset-2 hover:text-green-900">
                যাচাই পেজে
              </Link>{" "}
              গিয়ে সনদের সত্যতা নিশ্চিত করুন।
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
