'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
}

export default function Footer({ lang }: FooterProps) {
  const t = {
    ar: {
      companyName: "ترانس ميشنز للتجارة والخدمات ذ.م.م",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      adminPortal: "دخول الإدارة (Admin)",
      clientPortal: "بوابة العملاء",
      address: "مول المرقاب، الدوحة، قطر",
      phone: "+974 50080984",
      email: "info@transmissions.qa"
    },
    en: {
      companyName: "Trans Missions Trading And Services W.L.L",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Login",
      clientPortal: "Client Portal",
      address: "Al Mirqab Mall, Doha, Qatar",
      phone: "+974 50080984",
      email: "info@transmissions.qa"
    }
  };

  const current = t[lang];

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs py-6 px-4 sm:px-8 mt-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* معلومات الشركة المختصرة */}
        <div className="space-y-1 text-center md:text-right">
          <h3 className="text-white font-bold text-xs">{current.companyName}</h3>
          <p className="text-neutral-500 text-[11px]">
            {lang === 'ar' 
              ? 'شريكك الأمثل لتخليص كافة أعمالك ومعاملاتك الرسمية في قطر.'
              : 'Your optimal partner for official transactions in Qatar.'}
          </p>
        </div>

        {/* روابط سريعة (بوابة العملاء ودخول الإدارة) */}
        <div className="flex justify-center items-center gap-6 font-medium text-xs">
          <Link href="/client-login" className="hover:text-emerald-400 transition">{current.clientPortal}</Link>
          <Link href="/admin" className="hover:text-amber-400 transition flex items-center gap-1 font-bold text-amber-500/90">
            <ShieldCheck className="w-3.5 h-3.5" /> {current.adminPortal}
          </Link>
        </div>

        {/* معلومات التواصل */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4 text-neutral-400 text-[11px]">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {current.address}</span>
          <span className="flex items-center gap-1" dir="ltr"><Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {current.phone}</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-800/60 mt-4 pt-3 text-center text-neutral-500 text-[10px]">
        <p>{current.rights}</p>
      </div>
    </footer>
  );
}