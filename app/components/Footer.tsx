'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  lang: 'ar' | 'en';
}

export default function Footer({ lang }: FooterProps) {
  const currentLogo = '/logo1.png';

  const t = {
    ar: {
      companyName: "ترانس ميشنز للتجارة والخدمات ذ.م.م",
      aboutDesc: "شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) مسجلة بموجب القوانين القطرية (رقم السجل: 210470) لتكون شريكك الاستراتيجي والأمثل في نجاح وتطوير أعمالك في قطر.",
      servicesTitle: "الخدمات الأساسية",
      proServices: "خدمات العلاقات العامة",
      consultancy: "الاستشارات",
      startUpFormMenu: "نموذج التأسيس",
      contactUsMenu: "تواصل معنا",
      locationText: "مول المرقاب، الدوحة، قطر (Al Mirqab Mall, Doha, Qatar)",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      adminPortal: "دخول الإدارة (Admin)"
    },
    en: {
      companyName: "Trans Missions Trading And Services W.L.L",
      aboutDesc: "Trans Missions Trading and Services W.L.L (C.R. No: 210470) is established under Qatari law to be your ultimate strategic partner in business success and growth.",
      servicesTitle: "Our Services",
      proServices: "PRO Services",
      consultancy: "Consultancy",
      startUpFormMenu: "Start Up Form",
      contactUsMenu: "Contact Us",
      locationText: "Al Mirqab Mall, Doha, Qatar",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Portal"
    }
  };

  const current = t[lang];

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-12 px-4 sm:px-6 lg:px-8 text-neutral-400" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={currentLogo} alt="Logo" className="h-10 w-auto object-contain" />
            <span className="font-bold text-white text-sm">{current.companyName}</span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-400">
            {current.aboutDesc}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm mb-3">{current.servicesTitle}</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/pro-services" className="hover:text-emerald-400 transition">{current.proServices}</Link></li>
            <li><Link href="/consultancy" className="hover:text-emerald-400 transition">{current.consultancy}</Link></li>
            <li><Link href="/start-up-form" className="hover:text-emerald-400 transition">{current.startUpFormMenu}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm mb-3">{current.contactUsMenu}</h4>
          <p className="text-xs mb-1">📍 {current.locationText}</p>
          <p className="text-xs mb-1">📞 {current.phoneText}</p>
          <p className="text-xs">✉️ {current.emailText}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>{current.rights}</p>
        <div>
          <Link href="/client-login" className="bg-neutral-800 hover:bg-neutral-700 text-emerald-400 px-4 py-2.5 rounded-xl border border-neutral-700 transition font-bold shadow inline-block">
            {current.adminPortal}
          </Link>
        </div>
      </div>
    </footer>
  );
}