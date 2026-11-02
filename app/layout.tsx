import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trans Missions Trading And Services W.L.L | تأسيس الشركات والخدمات التجارية في قطر",
  description: "Your premier gateway for business setup, corporate services, PRO services, and public relations in Qatar. شركة ترانس ميشنز للتجارة والخدمات تقدم حلول متكاملة لتأسيس الشركات، العلاقات العامة، وتخليص المعاملات الحكومية والتجارية في دولة قطر.",
  keywords: [
    "تأسيس شركات في قطر",
    "Business setup in Qatar",
    "خدمات تجارية قطر",
    "Corporate services Qatar",
    "علاقات عامة قطر",
    "Public relations Qatar",
    "تخليص معاملات حكومية قطر",
    "PRO services Qatar",
    "فتح شركة في قطر",
    "Company registration Qatar",
    "Trans Missions Trading And Services",
    "ترانس ميشنز قطر"
  ].join(", "),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="google-site-verification" content="y_KTQO_9SwKWRKh3iaTubROJeipbvnEORlnwI-Cahtg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-neutral-950 text-neutral-100 font-sans`}>
        {children}
      </body>
    </html>
  );
}