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
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs py-5 px-4 mt-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-2">
        
        {/* السطر الأول: اسم الشركة وحقوق النشر */}
        <div>
          <span className="text-white font-bold">{current.companyName}</span>
          <span className="mx-2 text-neutral-600">•</span>
          <span className="text-[11px] text-neutral-500">{current.rights}</span>
        </div>

        {/* السطر الثاني: روابط بوابة العملاء ودخول الإدارة */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium">
          <Link href="/client-login" className="hover:text-emerald-400 transition">{current.clientPortal}</Link>
          <span className="text-neutral-700">•</span>
          <Link href="/admin" className="hover:text-amber-400 transition flex items-center gap-1 font-bold text-amber-500/90">
            <ShieldCheck className="w-3.5 h-3.5" /> <span>{current.adminPortal}</span>
          </Link>
        </div>

        {/* السطر الثالث: البريد الإلكتروني */}
        <div>
          <a href={`mailto:${current.email}`} className="hover:text-emerald-400 transition inline-flex items-center gap-1.5 text-[11px]" dir="ltr">
            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{current.email}</span>
          </a>
        </div>

        {/* السطر الرابع: العنوان ورقم الهاتف */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-neutral-400">
          <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {current.address}</span>
          <span className="text-neutral-700">•</span>
          <span className="inline-flex items-center gap-1" dir="ltr"><Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {current.phone}</span>
        </div>

      </div>
    </footer>
  );
}