import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | ترانس ميشنز للتجارة والخدمات - تأسيس شركات بقطر",
  description:
    "تعرف على شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) في قطر، سجل تجاري رقم 210470، وخدماتنا المتكاملة في تأسيس شركات بقطر وتأسيس الشركات في قطر وتخليص المعاملات.",
  keywords: [
    "تأسيس شركات بقطر",
    "تأسيس الشركات في قطر",
    "من نحن ترانس ميشنز",
    "Trans Missions Trading And Services",
    "تأسيس شركات في قطر",
    "خدمات حكومية في قطر",
    "السجل التجاري قطر",
    "About Trans Missions Qatar",
    "Company Formation in Qatar",
    "Business Setup in Qatar",
    "PRO Services Qatar",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}