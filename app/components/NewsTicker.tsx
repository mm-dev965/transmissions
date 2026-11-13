'use client';

import React from "react";
import Link from "next/link";

interface NewsTickerProps {
  lang?: "ar" | "en";
}

const COMPANY_ADS = {
  en: [
    {
      id: "ad-en-1",
      text: "★ Government Transaction Clearance, Company Establishment, Business Solutions & Certified Translation in Qatar",
      link: "/pro-services",
    },
    {
      id: "ad-en-2",
      text: "★ Digital Solutions and Supply & Sale of Computers and Accessories in Doha",
      link: "/services",
    },
  ],
  ar: [
    {
      id: "ad-ar-1",
      text: "★ خدمات تخليص المعاملات الحكومية وتأسيس الشركات وحلول الأعمال والترجمة المعتمدة في قطر",
      link: "/pro-services",
    },
    {
      id: "ad-ar-2",
      text: "★ الحلول الرقمية وتوريد وبيع أجهزة الكمبيوتر واكسسواراتها بالدوحة",
      link: "/services",
    },
  ],
};

export default function NewsTicker({ lang = "en" }: NewsTickerProps) {
  const isArabic = lang === "ar";
  const items = COMPANY_ADS[lang] || COMPANY_ADS.en;

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