import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "বিবাহ নিবন্ধন ব্যবস্থা | Marriage Registration System",
  description:
    "বাংলাদেশ সরকারের বিবাহ ও তালাক নিবন্ধন পোর্টাল — Bangladesh Government Marriage & Divorce Registration Portal",
  keywords: [
    "বিবাহ নিবন্ধন",
    "marriage registration",
    "bangladesh",
    "nikah",
    "কাবিননামা",
    "তালাক",
    "divorce",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface antialiased">{children}</body>
    </html>
  );
}
