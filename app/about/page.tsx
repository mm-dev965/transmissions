'use client';

import React, { useState } from 'react';
import { Building2, ShieldCheck, ArrowRight, Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'cyber' | 'light'>('faded');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = {
    ar: {
      home: "الرئيسية",
      services: "خدماتنا",
      proServices: "خدمات المعقبين",
      clientPortal: "رفع طلب أونلاين",
      about: "من نحن",
      consultancy: "الاستشارات",
      contact: "اتصل بينا",
      countryLabel: "قطر",
      companyName: "ترانس ميشنز للتجارة والخدمات",
      companySub: "ذ.م.م",
      aboutTitle: "من نحن",
      aboutDesc: "شريكك الاستراتيجي والأمثل في تأسيس وتطوير أعمالك في دولة قطر.",
      aboutMainTitle: "نبذة عن شركة ترانس ميشنز",
      aboutMainDesc: "شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) مسجلة بموجب القوانين القطرية (رقم السجل التجاري: 210470) لتكون بوابتك الآمنة في تقديم الحلول المبتكرة والخدمات الحكومية والقانونية والتجارية المتكاملة لمساعدة عملك على النمو بكفاءة عالية في السوق القطري.",
      clientWordTitle: "كلمة لعملائنا الكرام",
      clientWordDesc: "نؤمن في ترانس ميشنز أن ثقتكم هي رأس مالنا الحقيقي. لذلك نحرص دوماً على تقديم أعلى معايير الجودة والسرعة في إنجاز كافة معاملاتكم وتلبية تطلعاتكم الاستثمارية في السوق القطري بكل أمان واحترافية."
    },
    en: {
      home: "Home",
      services: "Services",
      proServices: "PRO Services",
      clientPortal: "Online Order",
      about: "About Us",
      consultancy: "Consultancy",
      contact: "Contact Us",
      countryLabel: "Qatar",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",
      aboutTitle: "About Us",
      aboutDesc: "Your strategic and ultimate partner in establishing and developing your business in Qatar.",
      aboutMainTitle: "About Trans Missions",
      aboutMainDesc: "Trans Missions Trading and Services W.L.L (C.R. No: 210470) is established under Qatari law to be your ultimate strategic partner in business success and growth.",
      clientWordTitle: "A Word to Our Valued Clients",
      clientWordDesc: "At Trans Missions, we believe your trust is our true capital. We are always committed to delivering the highest standards of quality and speed in executing all your transactions."
    }
  };

  const current = t[lang];

  const currentTheme = theme === 'cyber' ? {
    bg: "bg-slate-950 text-cyan-50",
    header: "bg-slate-950/95 border-slate-800",
  } : theme === 'light' ? {
    bg: "bg-slate-50 text-slate-900",
    header: "bg-white/95 border-slate-200 shadow-sm",
  } : {
    bg: "bg-neutral-950 text-neutral-100",
    header: "bg-neutral-950/95 border-neutral-800",
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* النافبار الكامل والمطابق للرئيسية */}
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Trans Missions Logo" className="h-10 sm:h-12 w-auto object-contain brightness-110" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider leading-none mb-0.5">{current.countryLabel}</span>
                <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight">{current.companyName}</span>
                <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-neutral-800/40 border border-neutral-700 text-white">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between w-full md:w-auto gap-6">
            <nav className="flex items-center gap-4 lg:gap-6 text-sm font-medium">
              <Link href="/" className="hover:opacity-85 transition">{current.home}</Link>
              <Link href="/#services" className="hover:opacity-85 transition">{current.services}</Link>
              <Link href="/#pro-services" className="hover:opacity-85 transition">{current.proServices}</Link>
              <Link href="/#order-portal" className="text-emerald-500 font-bold hover:opacity-85 transition">{current.clientPortal}</Link>
              <Link href="/about" className="text-emerald-400 font-bold hover:opacity-85 transition">{current.about}</Link>
              <Link href="/#consultancy" className="hover:opacity-85 transition">{current.consultancy}</Link>
              <Link href="/contact" className="hover:opacity-85 transition text-emerald-400 font-bold">{current.contact}</Link>
            </nav>

            <div className="flex items-center gap-2 shrink-0 border-s border-neutral-800 ps-4">
              <div className="flex items-center bg-black/10 dark:bg-black/40 border border-neutral-800 rounded-xl p-1 gap-1">
                <button onClick={() => setTheme('faded')} className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'opacity-70'}`}>1</button>
                <button onClick={() => setTheme('cyber')} className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'opacity-70'}`}>2</button>
                <button onClick={() => setTheme('light')} className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'light' ? 'bg-emerald-600 text-white font-bold' : 'opacity-70'}`}>3</button>
              </div>

              <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-neutral-900/80 hover:opacity-80 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-800">
                <Globe className="w-4 h-4" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* محتوى الصفحة */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 text-emerald-500 rounded-2xl mb-4 border border-emerald-500/20">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">{current.aboutTitle}</h1>
          <p className="opacity-75 text-sm sm:text-base text-neutral-300">
            {current.aboutDesc}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-neutral-900/60 border border-neutral-800 p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>{current.aboutMainTitle}</span>
            </h2>
            <p className="text-sm sm:text-base opacity-85 text-neutral-300 leading-relaxed">
              {current.aboutMainDesc}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/20 to-neutral-900/60 border border-emerald-500/20 p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-400">{current.clientWordTitle}</h3>
            <p className="text-sm sm:text-base opacity-90 text-neutral-200 leading-relaxed max-w-2xl mx-auto">
              {current.clientWordDesc}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}