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
      quickLinks: "روابط سريعة",
      contactInfo: "معلومات التواصل",
      address: "مول المرقاب، الدوحة، قطر",
      phone: "+974 50080984",
      email: "info@transmissions.qa"
    },
    en: {
      companyName: "Trans Missions Trading And Services W.L.L",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Login",
      clientPortal: "Client Portal",
      quickLinks: "Quick Links",
      contactInfo: "Contact Info",
      address: "Al Mirqab Mall, Doha, Qatar",
      phone: "+974 50080984",
      email: "info@transmissions.qa"
    }
  };

  const current = t[lang];

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs py-12 px-4 sm:px-8 mt-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* معلومات الشركة */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm">{current.companyName}</h3>
          <p className="text-neutral-500 leading-relaxed">
            {lang === 'ar' 
              ? 'شريكك الاستراتيجي والأمثل في نجاح وتطوير وتخليص كافة أعمالك ومعاملاتك الرسمية في دولة قطر.'
              : 'Your strategic and ultimate partner in business success, development, and government clearances in Qatar.'}
          </p>
        </div>

        {/* روابط سريعة */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">{current.quickLinks}</h4>
          <ul className="space-y-2">
            <li><Link href="/client-login" className="hover:text-emerald-400 transition">{current.clientPortal}</Link></li>
            {/* الرابط الموجه للوحة الإدارة العامة الجديدة بكلمة المرور TM-123A */}
            <li><Link href="/admin" className="hover:text-amber-400 transition flex items-center gap-1.5 font-bold text-amber-500/90"><ShieldCheck className="w-3.5 h-3.5" /> {current.adminPortal}</Link></li>
          </ul>
        </div>

        {/* معلومات التواصل */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">{current.contactInfo}</h4>
          <div className="space-y-2 text-neutral-400">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400 shrink-0" /> {current.address}</p>
            <p className="flex items-center gap-2" dir="ltr"><Phone className="w-4 h-4 text-emerald-400 shrink-0" /> {current.phone}</p>
            <p className="flex items-center gap-2" dir="ltr"><Mail className="w-4 h-4 text-emerald-400 shrink-0" /> {current.email}</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-[11px]">
        <p>{current.rights}</p>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="hover:text-amber-400 transition flex items-center gap-1 text-amber-500/80 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> {current.adminPortal}
          </Link>
        </div>
      </div>
    </footer>
  );
}