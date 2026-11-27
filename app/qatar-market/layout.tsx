import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تأسيس شركات بقطر وتأسيس الشركات في قطر | دليل السوق القطري",
  description:
    "دليلك الشامل حول تأسيس شركات بقطر وتأسيس الشركات في قطر، الملكية الأجنبية 100%، استخراج السجل والرخصة التجارية، ودخول السوق القطري.",
  keywords: [
    "تأسيس شركات بقطر",
    "تأسيس الشركات في قطر",
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