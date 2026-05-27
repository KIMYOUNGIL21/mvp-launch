import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 업무 효율 상담소",
  description: "AI로 줄일 수 있는 업무를 같이 찾는 무료 문제 진단 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
