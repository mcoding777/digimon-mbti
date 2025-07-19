import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "나의 파트너 디지몬 (스타터 디지몬 MBTI)",
  description: "20개의 질문으로 알아보는 나의 디지몬 파트너",
  keywords: ['디지몬', '디지몬MBTI', 'MBTI테스트', '디지몬심리테스트', '심리테스트'],
  openGraph: {
    title: '내가 선택받은 아이들이었다면, 나의 디지몬은?',
    description: '20개의 질문으로 알아보는 나의 디지몬 파트너',
  },
  verification: {
    google: 'xfxXnEPWCjGGhfBcz1I6wQ_l-xqqvmBempUts0b_yXc',
    other: {
      'naver-site-verification': 'c33f6ccb6fc3de70592e52d6856f6bb9d216edfd',
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
          <main className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            {children}
          </main>

          <footer className="text-center mt-5 text-xs text-gray-400">
            copyright 2025. all rights reserved.
          </footer>
        </div >
      </body>
    </html>
  );
}
