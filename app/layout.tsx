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
  metadataBase: new URL("https://www.transmissions.qa"),
  title: {
    default: "تأسيس الشركات والخدمات التجارية في قطر | Trans Missions",
    template: "%s | Trans Missions Qatar",
  },
  description:
    "شركة ترانس ميشنز للتجارة والخدمات: شريكك المتكامل لتأسيس الشركات، استخراج ترخيص تجاري، إجراءات السجل التجاري، الترجمة المعتمدة، وتخليص المعاملات الحكومية في قطر.",
  keywords: [
    "تأسيس شركات في قطر",
    "تأسيس شركة في قطر",
    "انشاء شركة في قطر",
    "ترخيص تجاري بقطر",
    "ترخيص تجاري في قطر",
    "استخراج رخصة تجارية في قطر",
    "اجراءات السجل التجاري في قطر",
    "تأسيس الأعمال في قطر",
    "بدء مشروع في قطر",
    "كيف ابدأ مشروع في قطر",
    "بيزنس جديد في قطر",
    "ريادة الأعمال في قطر",
    "ممارسة نشاط في قطر",
    "ممارسة نشاط التجارة في قطر",
    "ترجمة معتمدة",
    "تخليص معاملات حكومية قطر",
    "خدمات تجارية قطر",
    "علاقات عامة قطر",
    "فتح شركة في قطر",
    "ترانس ميشنز قطر",
    "Business setup in Qatar",
    "Setup companies in Qatar",
    "Launch Business in Qatar",
    "Start Ups in Qatar",
    "Commercial license in Qatar",
    "Government Services in Qatar",
    "GOV Services in Qatar",
    "PRO services Qatar",
    "Corporate services Qatar",
    "Management Services in Qatar",
    "Business Solutions",
    "Public Relations Services in Qatar",
    "Business Activities advisor in Qatar",
    "Admin Services in Qatar",
    "Market Awareness in Qatar",
    "Business Agent",
    "Business Support",
    "Company registration Qatar",
    "Trans Missions Trading And Services",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "تأسيس الشركات والخدمات التجارية في قطر | Trans Missions",
    description:
      "حلول متكاملة لتأسيس الشركات، استخراج الترخيص التجاري، إجراءات السجل التجاري، الترجمة المعتمدة، والخدمات الحكومية في دولة قطر.",
    url: "https://www.transmissions.qa",
    siteName: "Trans Missions Trading And Services W.L.L",
    locale: "ar_QA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta
          name="google-site-verification"
          content="y_KTQO_9SwKWRKh3iaTubROJeipbvnEORlnwI-Cahtg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-neutral-950 text-neutral-100 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}