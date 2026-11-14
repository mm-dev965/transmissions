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
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs py-6 px-6 mt-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
        
        {/* اسم الشركة وحقوق النشر */}
        <div className="space-y-1">
          <h3 className="text-white font-bold text-xs">{current.companyName}</h3>
          <p className="text-[11px] text-neutral-500">{current.rights}</p>
        </div>

        {/* المنتصف: روابط بوابة العملاء ودخول الإدارة وتحت它们的 البريد الإلكتروني */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 text-xs font-medium">
            <Link href="/client-login" className="hover:text-emerald-400 transition">{current.clientPortal}</Link>
            <Link href="/admin" className="hover:text-amber-400 transition flex items-center gap-1 font-bold text-amber-500/90">
              <ShieldCheck className="w-3.5 h-3.5" /> <span>{current.adminPortal}</span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400" dir="ltr">
            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{current.email}</span>
          </div>
        </div>

        {/* معلومات التواصل المصغرة (العنوان ورقم الهاتف) */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {current.address}</span>
          <span className="flex items-center gap-1.5" dir="ltr"><Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {current.phone}</span>
        </div>

      </div>
    </footer>
  );
}