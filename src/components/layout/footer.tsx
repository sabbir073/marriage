import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white font-bold text-sm">
                বি
              </div>
              <span className="font-semibold">বিবাহ নিবন্ধন ব্যবস্থা</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের বিবাহ ও তালাক নিবন্ধন পোর্টাল।
              আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়ের অধীনে পরিচালিত।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-white/50">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/search" className="text-sm text-white/70 hover:text-white transition-colors">
                  তথ্য অনুসন্ধান
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-sm text-white/70 hover:text-white transition-colors">
                  সনদ যাচাই
                </Link>
              </li>
              <li>
                <Link href="/registrars" className="text-sm text-white/70 hover:text-white transition-colors">
                  নিবন্ধক তালিকা
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-white/70 hover:text-white transition-colors">
                  নাগরিক নিবন্ধন
                </Link>
              </li>
            </ul>
          </div>

          {/* Marriage Types */}
          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-white/50">
              বিবাহের ধরণ
            </h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-white/70">মুসলিম বিবাহ (নিকাহ)</li>
              <li className="text-sm text-white/70">হিন্দু বিবাহ</li>
              <li className="text-sm text-white/70">বিশেষ বিবাহ</li>
              <li className="text-sm text-white/70">খ্রিস্টান বিবাহ</li>
              <li className="text-sm text-white/70">বৌদ্ধ ও অন্যান্য বিবাহ</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-white/50">
              যোগাযোগ
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়</li>
              <li>বাংলাদেশ সচিবালয়, ঢাকা-১০০০</li>
              <li>ফোন: ০২-৯৫৭৬০৫০</li>
              <li>
                <a href="https://marriage.gov.bd" className="hover:text-white transition-colors">
                  marriage.gov.bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © ২০২৬ গণপ্রজাতন্ত্রী বাংলাদেশ সরকার। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white/70">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:text-white/70">ব্যবহারের শর্তাবলী</Link>
            <Link href="/accessibility" className="hover:text-white/70">প্রবেশগম্যতা</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
