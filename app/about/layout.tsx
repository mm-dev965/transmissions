import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | Trans Missions Trading And Services W.L.L - قطر",
  description:
    "تعرف على شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) في قطر، سجل تجاري رقم 210470، وحلولنا المتكاملة في تأسيس الشركات والخدمات الحكومية والتجارية.",
  keywords: [
    "من نحن ترانس ميشنز",
    "Trans Missions Trading And Services",
    "تأسيس شركات في قطر",
    "خدمات حكومية في قطر",
    "السجل التجاري قطر",
    "About Trans Missions Qatar",
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