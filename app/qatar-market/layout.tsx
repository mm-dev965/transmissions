import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دخول السوق القطري وممارسة النشاط التجاري في قطر | Qatar Market",
  description:
    "دليلك الشامل لدخول السوق القطري، استخراج ترخيص تجاري، إجراءات السجل التجاري، وممارسة النشاط التجاري للشركات الناشئة والمستثمرين في قطر.",
  keywords: [
    "السوق القطري",
    "ممارسة نشاط التجارة في قطر",
    "ممارسة نشاط في قطر",
    "ترخيص تجاري بقطر",
    "اجراءات السجل التجاري في قطر",
    "انشاء شركة في قطر",
    "بيزنس جديد في قطر",
    "Market Awareness in Qatar",
    "Launch Business in Qatar",
    "Setup companies in Qatar",
    "Start Ups in Qatar",
    "Commercial license in Qatar",
  ],
  alternates: {
    canonical: "/qatar-market",
  },
};

export default function QatarMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}