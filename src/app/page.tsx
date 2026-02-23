import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const MARRIAGE_TYPES = [
  {
    icon: "🕌",
    title: "মুসলিম বিবাহ",
    subtitle: "Muslim Marriage",
    description: "মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন, ১৯৭৪ অনুযায়ী নিকাহ নিবন্ধন",
    href: "/apply/muslim",
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "🙏",
    title: "হিন্দু বিবাহ",
    subtitle: "Hindu Marriage",
    description: "হিন্দু বিবাহ নিবন্ধন আইন, ২০১২ অনুযায়ী বিবাহ নিবন্ধন",
    href: "/apply/hindu",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    icon: "⚖️",
    title: "বিশেষ বিবাহ",
    subtitle: "Special Marriage",
    description: "বিশেষ বিবাহ আইন, ১৮৭২ — আন্তঃধর্মীয়, সিভিল ও বিদেশি নাগরিক",
    href: "/apply/special",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    icon: "✝️",
    title: "খ্রিস্টান বিবাহ",
    subtitle: "Christian Marriage",
    description: "খ্রিস্টান বিবাহ আইন, ১৮৭২ অনুযায়ী বিবাহ নিবন্ধন",
    href: "/apply/christian",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    icon: "☸️",
    title: "বৌদ্ধ বিবাহ",
    subtitle: "Buddhist Marriage",
    description: "বিশেষ বিবাহ আইন, ১৮৭২ এর আওতায় বৌদ্ধ বিবাহ নিবন্ধন",
    href: "/apply/buddhist",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
  },
  {
    icon: "📋",
    title: "অন্যান্য বিবাহ",
    subtitle: "Other Marriage",
    description: "বিশেষ বিবাহ আইন, ১৮৭২ এর আওতায় অন্যান্য ধর্মের বিবাহ নিবন্ধন",
    href: "/apply/other",
    color: "bg-slate-50 border-slate-200",
    iconBg: "bg-slate-100",
  },
];

const QUICK_SERVICES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "তথ্য অনুসন্ধান",
    subtitle: "NID দিয়ে বৈবাহিক অবস্থা যাচাই করুন",
    href: "/search",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "সনদ যাচাই",
    subtitle: "QR কোড বা সনদ নম্বর দিয়ে যাচাই",
    href: "/verify",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    title: "নিবন্ধক তালিকা",
    subtitle: "এলাকাভিত্তিক কাজী ও নিবন্ধক খুঁজুন",
    href: "/registrars",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "অনলাইন আবেদন",
    subtitle: "বিবাহ বা তালাক নিবন্ধনের আবেদন",
    href: "/login",
    color: "text-amber-600 bg-amber-50",
  },
];

const STATS = [
  { value: "৬৪", label: "জেলা", sublabel: "Districts" },
  { value: "৪৯৫", label: "উপজেলা", sublabel: "Upazilas" },
  { value: "৫০,০০০+", label: "নিবন্ধক", sublabel: "Registrars" },
  { value: "১ কোটি+", label: "নিবন্ধিত বিবাহ", sublabel: "Registered" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary to-primary-light">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                ডিজিটাল বাংলাদেশ — অনলাইন বিবাহ নিবন্ধন সেবা
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                বিবাহ ও তালাক
                <br />
                <span className="text-white/80">নিবন্ধন ব্যবস্থা</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
                বাংলাদেশ সরকারের অনলাইন বিবাহ নিবন্ধন, তথ্য অনুসন্ধান ও সনদ যাচাই পোর্টাল।
                মুসলিম, হিন্দু, খ্রিস্টান, বৌদ্ধ ও বিশেষ বিবাহ — সকল ধর্মের জন্য।
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/search">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-lg min-w-[200px]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    তথ্য অনুসন্ধান
                  </Button>
                </Link>
                <Link href="/verify">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    সনদ যাচাই
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text">
                    {stat.label}
                  </p>
                  <p className="text-xs text-text-muted">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Services */}
        <section className="bg-surface-secondary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">
                দ্রুত সেবা
              </h2>
              <p className="mt-2 text-text-secondary">
                Quick Services
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_SERVICES.map((service) => (
                <Link key={service.title} href={service.href}>
                  <Card hover className="h-full group">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] ${service.color} transition-transform group-hover:scale-110`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-sm text-text-secondary">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Marriage Types */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">
                বিবাহের ধরণ
              </h2>
              <p className="mt-2 text-text-secondary">
                সকল ধর্মের বিবাহ নিবন্ধন সেবা — Marriage Registration for All Religions
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MARRIAGE_TYPES.map((type) => (
                <Link key={type.title} href={type.href}>
                  <Card
                    hover
                    className={`h-full border ${type.color} group cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] ${type.iconBg} text-2xl transition-transform group-hover:scale-110`}
                      >
                        {type.icon}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {type.title}
                        </CardTitle>
                        <p className="text-xs text-text-muted mb-1">
                          {type.subtitle}
                        </p>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-surface-secondary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">
                কিভাবে কাজ করে
              </h2>
              <p className="mt-2 text-text-secondary">
                সহজ ৪টি ধাপে বিবাহ নিবন্ধন — 4 Simple Steps
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "১",
                  title: "আবেদন করুন",
                  titleEn: "Apply Online",
                  desc: "অনলাইনে ফর্ম পূরণ করুন অথবা সরাসরি কাজীর কার্যালয়ে যান",
                },
                {
                  step: "২",
                  title: "কাজী পর্যালোচনা",
                  titleEn: "Kazi Review",
                  desc: "কাজী NID ও জন্ম সনদ যাচাই করে প্রয়োজনীয় কাগজপত্র সংগ্রহ করবেন",
                },
                {
                  step: "৩",
                  title: "অনুমোদন ও নিবন্ধন",
                  titleEn: "Approve & Register",
                  desc: "সব কিছু ঠিক থাকলে কাজী বিবাহ নিবন্ধন অনুমোদন করবেন",
                },
                {
                  step: "৪",
                  title: "সনদ প্রাপ্তি",
                  titleEn: "Get Certificate",
                  desc: "QR কোডসহ ডিজিটাল বিবাহ সনদ ডাউনলোড করুন",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-text">{item.title}</h3>
                  <p className="text-xs text-text-muted mb-1">{item.titleEn}</p>
                  <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              আজই নিবন্ধন করুন
            </h2>
            <p className="mt-4 text-white/70">
              অনলাইনে বিবাহ নিবন্ধনের আবেদন করুন অথবা আপনার নিকটস্থ কাজীর কার্যালয়ে যোগাযোগ করুন।
              সনদ যাচাই এবং তথ্য অনুসন্ধানের জন্য লগইন প্রয়োজন নেই।
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 min-w-[200px]"
                >
                  নাগরিক নিবন্ধন
                </Button>
              </Link>
              <Link href="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
                >
                  তথ্য অনুসন্ধান
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
