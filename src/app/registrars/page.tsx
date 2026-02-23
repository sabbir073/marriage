"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const MOCK_REGISTRARS = [
  {
    id: 1,
    name_bn: "মাওলানা আব্দুর রহমান",
    name_en: "Mawlana Abdur Rahman",
    type: "MUSLIM",
    type_bn: "মুসলিম নিকাহ রেজিস্ট্রার",
    reg_no: "NR-DHK-001234",
    jurisdiction_bn: "ধানমন্ডি, ঢাকা সিটি কর্পোরেশন",
    phone: "০১৭১১-XXXXXX",
    status: "ACTIVE",
  },
  {
    id: 2,
    name_bn: "পণ্ডিত রাজেশ শর্মা",
    name_en: "Pandit Rajesh Sharma",
    type: "HINDU",
    type_bn: "হিন্দু বিবাহ রেজিস্ট্রার",
    reg_no: "HR-DHK-000456",
    jurisdiction_bn: "গুলশান, ঢাকা সিটি কর্পোরেশন",
    phone: "০১৮১২-XXXXXX",
    status: "ACTIVE",
  },
  {
    id: 3,
    name_bn: "অ্যাডভোকেট সালমা নাসরীন",
    name_en: "Advocate Salma Nasreen",
    type: "SPECIAL",
    type_bn: "বিশেষ বিবাহ রেজিস্ট্রার",
    reg_no: "SR-DHK-000789",
    jurisdiction_bn: "মতিঝিল, ঢাকা সিটি কর্পোরেশন",
    phone: "০১৯১৩-XXXXXX",
    status: "ACTIVE",
  },
  {
    id: 4,
    name_bn: "ফাদার পল গমেজ",
    name_en: "Father Paul Gomez",
    type: "CHRISTIAN",
    type_bn: "খ্রিস্টান বিবাহ রেজিস্ট্রার",
    reg_no: "CR-DHK-000321",
    jurisdiction_bn: "তেজগাঁও, ঢাকা সিটি কর্পোরেশন",
    phone: "০১৫১৪-XXXXXX",
    status: "ACTIVE",
  },
  {
    id: 5,
    name_bn: "মাওলানা হাফেজ ইব্রাহিম",
    name_en: "Mawlana Hafez Ibrahim",
    type: "MUSLIM",
    type_bn: "মুসলিম নিকাহ রেজিস্ট্রার",
    reg_no: "NR-CTG-002345",
    jurisdiction_bn: "পাহাড়তলী, চট্টগ্রাম সিটি কর্পোরেশন",
    phone: "০১৬১৫-XXXXXX",
    status: "ACTIVE",
  },
];

const TYPE_COLORS: Record<string, string> = {
  MUSLIM: "success",
  HINDU: "warning",
  SPECIAL: "info",
  CHRISTIAN: "default",
};

export default function RegistrarsPage() {
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const filtered = MOCK_REGISTRARS.filter((r) => {
    if (type && r.type !== type) return false;
    if (search && !r.name_bn.includes(search) && !r.name_en.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              নিবন্ধক তালিকা
            </h1>
            <p className="mt-2 text-white/70">
              এলাকাভিত্তিক বিবাহ নিবন্ধক (কাজী) খুঁজুন
            </p>
            <p className="mt-1 text-sm text-white/50">
              Find Marriage Registrars by Location
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Filters */}
            <Card className="mb-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Select
                  label="জেলা / District"
                  placeholder="জেলা নির্বাচন করুন"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  options={[
                    { value: "dhaka", label: "ঢাকা (Dhaka)" },
                    { value: "chittagong", label: "চট্টগ্রাম (Chittagong)" },
                    { value: "rajshahi", label: "রাজশাহী (Rajshahi)" },
                    { value: "khulna", label: "খুলনা (Khulna)" },
                    { value: "sylhet", label: "সিলেট (Sylhet)" },
                    { value: "rangpur", label: "রংপুর (Rangpur)" },
                    { value: "barisal", label: "বরিশাল (Barisal)" },
                    { value: "mymensingh", label: "ময়মনসিংহ (Mymensingh)" },
                  ]}
                />
                <Select
                  label="নিবন্ধকের ধরণ / Type"
                  placeholder="সব ধরণ"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  options={[
                    { value: "", label: "সব ধরণ (All Types)" },
                    { value: "MUSLIM", label: "মুসলিম নিকাহ রেজিস্ট্রার" },
                    { value: "HINDU", label: "হিন্দু বিবাহ রেজিস্ট্রার" },
                    { value: "SPECIAL", label: "বিশেষ বিবাহ রেজিস্ট্রার" },
                    { value: "CHRISTIAN", label: "খ্রিস্টান বিবাহ রেজিস্ট্রার" },
                  ]}
                />
                <Input
                  label="নাম দিয়ে খুঁজুন / Search"
                  placeholder="নিবন্ধকের নাম লিখুন"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">
                {filtered.length}টি নিবন্ধক পাওয়া গেছে
              </p>
              {filtered.map((registrar) => (
                <Card key={registrar.id} hover className="group">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary font-bold">
                        {registrar.name_bn.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                          {registrar.name_bn}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {registrar.name_en}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant={TYPE_COLORS[registrar.type] as "success" | "warning" | "info" | "default"}>
                            {registrar.type_bn}
                          </Badge>
                          <Badge variant="outline">{registrar.reg_no}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm sm:min-w-[200px]">
                      <p className="text-text-secondary">
                        {registrar.jurisdiction_bn}
                      </p>
                      <p className="text-text-muted mt-1">
                        {registrar.phone}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
