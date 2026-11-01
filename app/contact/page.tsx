'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
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
      pageTitle: "اتصل بينا",
      pageSubtitle: "يسعدنا تواصلكم معنا وزيارتكم لمقر شركتنا في دولة قطر للإجابة على كافة استفساراتكم.",
      hqTitle: "معلومات المقر الرئيسي",
      addressTitle: "العنوان الرسمي",
      addressText: "مول المرقاب، الدوحة، قطر (Al Mirqab Mall, Doha, Qatar)",
      phoneTitle: "رقم الهاتف",
      emailTitle: "البريد الإلكتروني",
      qrTitle: "امسح الكود للاتصال السريع",
      qrDesc: "وجه كاميرا هاتفك نحو الكود للتواصل المباشر معنا بسهولة.",
      backHome: "العودة إلى الصفحة الرئيسية"
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
      pageTitle: "Contact Us",
      pageSubtitle: "We are always here to answer your inquiries and help your business grow in Qatar.",
      hqTitle: "Headquarters Info",
      addressTitle: "Official Address",
      addressText: "Al Mirqab Mall, Doha, Qatar",
      phoneTitle: "Phone Number",
      emailTitle: "Email Address",
      qrTitle: "Scan QR Code for Quick Contact",
      qrDesc: "Point your phone camera at the code to connect with us directly.",
      backHome: "Back to Home"
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
      {/* الهيدر الموحد والكامل */}
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
              <Link href="/about" className="hover:opacity-85 transition">{current.about}</Link>
              <Link href="/#consultancy" className="hover:opacity-85 transition">{current.consultancy}</Link>
              <Link href="/contact" className="text-emerald-400 font-bold hover:opacity-85 transition">{current.contact}</Link>
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

      {/* محتوى صفحة اتصل بينا */}
      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">{current.pageTitle}</h1>
          <p className="opacity-75 text-sm sm:text-base text-neutral-300">
            {current.pageSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">{current.hqTitle}</h2>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{current.addressTitle}</h3>
                <p className="text-sm opacity-80 text-neutral-300">{current.addressText}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{current.phoneTitle}</h3>
                <p className="text-sm opacity-80 text-neutral-300" dir="ltr">+974 50080984</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{current.emailTitle}</h3>
                <p className="text-sm opacity-80 text-neutral-300">info@transmissions.qa</p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center gap-4">
              <div className="bg-white p-2 rounded-2xl shadow-md w-24 h-24 shrink-0 flex items-center justify-center">
                <Image src="/qr-code.png" alt="QR Code" width={80} height={80} className="object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{current.qrTitle}</h4>
                <p className="text-xs opacity-75 text-neutral-400">{current.qrDesc}</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-3xl shadow-xl h-[420px] overflow-hidden">
            <iframe 
              src="https://maps.google.com/maps?q=Al%20Mirqab%20Mall,%20Doha,%20Qatar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1.2rem' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}