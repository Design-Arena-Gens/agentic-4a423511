import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media Strategist | Agentic Assistant",
  description:
    "یک دستیار متخصص اینستاگرام که استراتژی محتوا، تقویم انتشار و سناریوهای رشد را برای برند شما آماده می‌کند."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
