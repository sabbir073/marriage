"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface PortalLayoutProps {
  children: React.ReactNode;
  portalName: string;
  portalNameEn: string;
  userName: string;
  userRole: string;
  navItems: NavItem[];
  accentColor?: string;
  onSignOut?: () => void;
}

export function PortalLayout({
  children,
  portalName,
  portalNameEn,
  userName,
  userRole,
  navItems,
  accentColor = "bg-primary",
  onSignOut,
}: PortalLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-1 flex-col border-r border-border bg-white">
          {/* Portal Header */}
          <div className={`${accentColor} px-4 py-5`}>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm">
                বি
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{portalName}</p>
                <p className="text-xs text-white/70">{portalNameEn}</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-text truncate">{userName}</p>
            <p className="text-xs text-text-muted">{userRole}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary"
                          : "text-text-secondary hover:bg-surface-tertiary hover:text-text"
                      )}
                    >
                      <span className={cn("shrink-0", isActive ? "text-primary" : "text-text-muted")}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-border px-4 py-3">
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors w-full"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              লগআউট
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className={`${accentColor} px-4 py-5 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm">
                  বি
                </div>
                <p className="text-sm font-semibold text-white">{portalName}</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-medium text-text">{userName}</p>
              <p className="text-xs text-text-muted">{userRole}</p>
            </div>
            <nav className="overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary-50 text-primary"
                            : "text-text-secondary hover:bg-surface-tertiary"
                        )}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar (mobile) */}
        <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-white px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-text-secondary">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <p className="text-sm font-semibold text-text">{portalName}</p>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-surface-secondary">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
