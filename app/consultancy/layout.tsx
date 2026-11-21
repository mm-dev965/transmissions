import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "استشارات الأعمال وتأسيس الشركات في قطر | Business Consultancy",
  description:
    "استشارات تأسيس الأعمال والشركات في قطر، اختيار الأنشطة التجارية المناسبة، دراسة الجدوى، وخطط بدء المشاريع لرواد الأعمال والمستثمرين.",
  keywords: [
    "استشارات الأعمال في قطر",
    "تأسيس الأعمال في قطر",
    "تأسيس شركة في قطر",
    "بدء مشروع في قطر",
    "كيف ابدأ مشروع في قطر",
    "ريادة الأعمال في قطر",
    "ممارسة نشاط في قطر",
    "Business Activities advisor in Qatar",
    "Business Solutions",
    "Management Services in Qatar",
    "Business Support",
    "Business Agent",
  ],
  alternates: {
    canonical: "/consultancy",
  },
};

export default function ConsultancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}