import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات العلاقات العامة وتخليص المعاملات الحكومية في قطر | PRO Services",
  description:
    "خدمات العلاقات العامة وتخليص المعاملات الحكومية في قطر (PRO Services)، استخراج الرخص التجارية، إجراءات السجل التجاري، وخدمات الشركات من ترانس ميشنز.",
  keywords: [
    "خدمات العلاقات العامة في قطر",
    "تخليص معاملات حكومية قطر",
    "تخليص معاملات قطر",
    "خدمات حكومية قطر",
    "PRO services Qatar",
    "Government Services in Qatar",
    "GOV Services in Qatar",
    "Public Relations Services in Qatar",
    "Admin Services in Qatar",
  ],
  alternates: {
    canonical: "/pro-services",
  },
};

export default function ProServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}