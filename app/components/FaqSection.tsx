"use client";

import React, { useState } from "react";

interface FaqSectionProps {
  lang?: "ar" | "en";
}

const faqs = [
  {
    qAr: "ما هي خطوات تأسيس شركات بقطر واستخراج السجل والرخصة التجارية؟",
    aAr: "تبدأ إجراءات تأسيس شركات بقطر باختيار النشاط التجاري المناسب وحجز الاسم التجاري عبر النافذة الواحدة، ثم توثيق عقد التأسيس وإصدار السجل التجاري (CR)، واستخراج الرخصة التجارية من البلدية، وإتمام قيد المنشأة وتصاريح العمل. نوفر في ترانس ميشنز إشرافاً كاملاً على كافة الإجراءات القانونية والحكومية من البداية حتى بدء النشاط.",
    qEn: "What are the steps to setup a company and get a commercial license in Qatar?",
    aEn: "Company formation in Qatar starts with selecting the right business activity and reserving a trade name via the Single Window portal, followed by attesting the Articles of Association, issuing the Commercial Registration (CR), obtaining the municipal trade license, and completing the computer card and labor approvals. Trans Missions manages the entire legal and government process end-to-end.",
  },
  {
    qAr: "هل يمكن للمستثمرين الأجانب تأسيس شركات بقطر بملكية أجنبية 100%؟",
    aAr: "نعم، يتيح قانون الاستثمار في قطر تأسيس شركات بقطر بملكية أجنبية تصل إلى 100% في معظم الأنشطة التجارية والخدمية والصناعية والتقنية دون الحاجة لشريك محلي، كما يمكن التأسيس بالشراكة مع شريك قطري بنسبة 51% / 49% حسب طبيعة النشاط. فريقنا يساعدك في اختيار الشكل القانوني الأنسب لمشروعك.",
    qEn: "Can foreign investors establish a 100% foreign-owned company in Qatar?",
    aEn: "Yes, Qatar's investment law allows 100% foreign ownership across most commercial, service, industrial, and technology activities without a local partner, or a 51%/49% partnership with a Qatari partner depending on the activity. Our team helps you select the optimal legal structure.",
  },
  {
    qAr: "كم يستغرق تأسيس الشركات في قطر وما المستندات المطلوبة؟",
    aAr: "تستغرق إجراءات تأسيس الشركات في قطر عادةً من 3 إلى 7 أيام عمل بعد استيفاء الموافقات، وتشمل المستندات الأساسية جوازات سفر الشركاء أو مستندات الشركة الأم، تحديد الأنشطة التجارية، وعقد إيجار مقر تجاري معتمد. نتولى في ترانس ميشنز تجهيز وتدقيق جميع المستندات والترجمة المعتمدة لتسريع الإصدار.",
    qEn: "How long does company formation in Qatar take and what documents are required?",
    aEn: "Company formation in Qatar typically takes 3 to 7 business days once approvals are ready. Basic documents include partners' passports or parent company documents, selected business activities, and an attested commercial lease agreement. Trans Missions handles document preparation and certified translation to speed up issuance.",
  },
  {
    qAr: "ما هي خدمات تخليص المعاملات الحكومية والعلاقات العامة (PRO Services) التي تقدمونها؟",
    aAr: "نقدم خدمات PRO متكاملة للشركات ورواد الأعمال في قطر تشمل: تأسيس شركات بقطر، تجديد السجلات والرخص التجارية، معاملات وزارة التجارة والصناعة، وزارة العمل، الجوازات والإقامات، تصديق العقود والمستندات الرسمية، وإدارة كافة المعاملات الحكومية بسرعة ودقة.",
    qEn: "What PRO and government services do you provide in Qatar?",
    aEn: "We offer comprehensive PRO services in Qatar including company setup, CR and trade license renewals, Ministry of Commerce and Industry (MOCI) procedures, Ministry of Labor approvals, visa and residency processing, document attestation, and full government liaison support.",
  },
  {
    qAr: "هل تقدمون استشارات لدخول السوق القطري ودعم الشركات الناشئة (Startups)؟",
    aAr: "نعم، نساعد المستثمرين ورواد الأعمال على فهم السوق القطري، اختيار الشكل القانوني والأنشطة التجارية الأنسب لمشاريعهم، وإعداد خطط إطلاق المشاريع والشركات الناشئة في قطر وفق أحدث اللوائح الاستثمارية.",
    qEn: "Do you offer market entry consultancy and startup support in Qatar?",
    aEn: "Yes, we guide investors and entrepreneurs on Qatar market awareness, selecting optimal business activities and legal structures, and launching startups and new businesses in compliance with Qatar's latest investment regulations.",
  },
  {
    qAr: "هل تتوفر لديكم خدمات الترجمة المعتمدة للمستندات الرسمية والتجارية؟",
    aAr: "نعم، نوفر خدمات ترجمة معتمدة ودقيقة لكافة العقود التجارية، عقود التأسيس، السجلات، المستندات القانونية، والمراسلات الرسمية باللغتين العربية والإنجليزية وغيرها، ومعتمدة لدى الجهات الحكومية والسفارات في قطر.",
    qEn: "Do you provide certified translation services for official and business documents?",
    aEn: "Yes, we provide accurate certified translation for commercial contracts, Articles of Association, CR documents, legal papers, and official correspondence in Arabic, English, and other languages, accepted by government ministries and embassies in Qatar.",
  },
];

export default function FaqSection({ lang = "ar" }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isAr = lang === "ar";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: isAr ? item.qAr : item.qEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: isAr ? item.aAr : item.aEn,
      },
    })),
  };

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-neutral-800"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {isAr
            ? "الأسئلة الشائعة حول تأسيس شركات بقطر وتخليص المعاملات"
            : "Frequently Asked Questions – Company Formation & Business Setup in Qatar"}
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl mx-auto">
          {isAr
            ? "إجابات واضحة حول خطوات تأسيس الشركات في قطر، الملكية الأجنبية 100%، استخراج السجل التجاري، وخدمات العلاقات العامة."
            : "Clear answers regarding company formation steps in Qatar, 100% foreign ownership, Commercial Registration, and PRO services."}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-neutral-800 rounded-3xl bg-neutral-900 shadow-lg overflow-hidden hover:border-emerald-500/40 transition"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start font-bold text-white hover:bg-neutral-800/60 transition-colors"
              >
                <span className="text-sm sm:text-base">
                  {isAr ? item.qAr : item.qEn}
                </span>
                <span className="text-emerald-400 text-xl font-bold shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-2 text-neutral-300 text-xs sm:text-sm leading-relaxed border-t border-neutral-800">
                  {isAr ? item.aAr : item.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}