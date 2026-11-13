"use client";

import React from "react";
import Link from "next/link";

interface NewsTickerProps {
  lang?: "ar" | "en";
}

const COMPANY_ADS = {
  en: [
    {
      id: "ad-en-1",
      text: "★ Trans Missions: Official PRO Services, Certified Translation & Business Clearance in Qatar",
      link: "/pro-services",
    },
    {
      id: "ad-en-2",
      text: "★ Digital Solutions: Professional Website Design, Software Development & Computer Printing",
      link: "/services",
    },
    {
      id: "ad-en-3",
      text: "★ Wholesale & Retail of Computers, Printers, Inks, Laboratory & Educational Equipment in Doha",
      link: "/services",
    },
  ],
  ar: [
    {
      id: "ad-ar-1",
      text: "★ ترانس ميشنز: خدمات تعقيب المعاملات الحكومية والترجمة المعتمدة في قطر",
      link: "/pro-services",
    },
    {
      id: "ad-ar-2",
      text: "★ الحلول الرقمية: تصميم المواقع الإلكترونية، تطوير البرمجيات، والطباعة بالحاسب الآلي",
      link: "/services",
    },
    {
      id: "ad-ar-3",
      text: "★ توريد وبيع أجهزة الكمبيوتر والطابعات والأحبار والأدوات المعملية والتعليمية بالدوحة",
      link: "/services",
    },
  ],
};

export default function NewsTicker({ lang = "en" }: NewsTickerProps) {
  const isArabic = lang === "ar";
  const items = COMPANY_ADS[lang];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full bg-[#111312] border-y border-emerald-900/40 overflow-hidden py-2.5 select-none shadow-inner"
    >
      <style jsx>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(50%);
          }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ${isArabic ? "marquee-rtl" : "marquee-ltr"} 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-track items-center">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center mx-8">
            <Link
              href={item.link}
              className="text-xs md:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2.5 bg-emerald-950/40 px-4 py-1 rounded-full border border-emerald-500/30"
            >
              <span>{item.text}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}