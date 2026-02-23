"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Government top bar */}
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6">
          <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | Government of Bangladesh</span>
          <div className="flex items-center gap-3">
            <button className="hover:underline">বাংলা</button>
            <span className="text-white/40">|</span>
            <button className="hover:underline">English</button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
              বি
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-text leading-tight">
                বিবাহ নিবন্ধন ব্যবস্থা
              </h1>
              <p className="text-xs text-text-secondary">
                Marriage Registration System
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary hover:text-text transition-colors"
            >
              হোম
            </Link>
            <Link
              href="/search"
              className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary hover:text-text transition-colors"
            >
              তথ্য অনুসন্ধান
            </Link>
            <Link
              href="/verify"
              className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary hover:text-text transition-colors"
            >
              সনদ যাচাই
            </Link>
            <Link
              href="/registrars"
              className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary hover:text-text transition-colors"
            >
              নিবন্ধক তালিকা
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                লগইন
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">
                নিবন্ধন করুন
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-[var(--radius-md)] hover:bg-surface-tertiary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              <Link href="/" className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary">হোম</Link>
              <Link href="/search" className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary">তথ্য অনুসন্ধান</Link>
              <Link href="/verify" className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary">সনদ যাচাই</Link>
              <Link href="/registrars" className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-tertiary">নিবন্ধক তালিকা</Link>
              <div className="flex gap-2 pt-2 mt-2 border-t border-border">
                <Link href="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">লগইন</Button></Link>
                <Link href="/register" className="flex-1"><Button variant="primary" size="sm" className="w-full">নিবন্ধন করুন</Button></Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
