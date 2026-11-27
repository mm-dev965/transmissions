'use client';

import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, CheckCircle2, Globe, ArrowRight, FileText, Lock, MessageSquare, ChevronDown, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function QatarMarketPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as 'ar' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const currentLogo = '/logo1.png';

  const content = {
    ar: {
      home: "الرئيسية",
      services: "خدماتنا",
      proServices: "خدمات العلاقات العامة",
      about: "من نحن",
      consultancy: "الاستشارات",
      communicate: "تواصل معنا",
      contactUsMenu: "اتصل بنا",
      startUpFormMenu: "نموذج التأسيس (Start Up Form)",
      clientPortalMenu: "بوابة العملاء (Client Portal)",
      countryLabel: "قطر",
      companyName: "ترانس ميشنز للتجارة والخدمات",
      companySub: "ذ.م.م",

      mainTitle: "تأسيس شركات بقطر: دليلك الكامل لتأسيس الشركات في قطر وبدء الاستثمار",
      introText: "إذا كنت تبحث عن تأسيس شركات بقطر أو بدء نشاطك التجاري في الدوحة، فإن دولة قطر تُعد واحدة من أكثر الاقتصاديات حيوية واستقراراً في المنطقة، بفضل بنيتها التحتية المتطورة، القوانين المرنة الداعمة للاستثمار، وإمكانية الملكية الأجنبية الكاملة في العديد من الأنشطة. نساعدك في تأسيس الشركات في قطر بخطوات واضحة وموثوقة من الفكرة وحتى إصدار السجل والرخصة التجارية.",

      featuresTitle: "أبرز مزايا تأسيس الشركات في قطر:",
      f1Title: "بيئة اقتصادية آمنة ومستقرة:",
      f1Desc: "اقتصاد وطني قوي ومستقر يشجع على تأسيس شركات بقطر ويضمن نمواً مستداماً لمشاريعك على المدى الطويل.",
      f2Title: "إجراءات تأسيس شركات مرنة وسريعة:",
      f2Desc: "تسهيلات حكومية منظمة لتأسيس الشركات في قطر، استخراج السجلات التجارية (CR)، وتراخيص البلدية والعمل بكفاءة عالية.",
      f3Title: "ملكية أجنبية ومواقع استراتيجية:",
      f3Desc: "خيارات استثمار مرنة تشمل الملكية الأجنبية 100% في أنشطة متعددة ووصول مباشر للأسواق الإقليمية والعالمية عبر الدوحة.",
      f4Title: "دعم متكامل للقطاعات والابتكار:",
      f4Desc: "بيئة داعمة للشركات التجارية، الخدمية، التقنية، والمقاولات مع فرص نمو واسعة وفق رؤية قطر الوطنية 2030.",

      helpTitle: "كيف تساعدك \"ترانس ميشنز\" في تأسيس شركات بقطر؟",
      helpIntro: "نحن في ترانس ميشنز للتجارة والخدمات ذ.م.م نرافقك خطوة بخطوة في تأسيس الشركات في قطر وإدارة شؤونها الرسمية:",
      h1: "اختيار النشاط التجاري المناسب، حجز الاسم التجاري، واستخراج السجل التجاري وقيد المنشأة.",
      h2: "توثيق العقود والتوكيلات، الترجمة المعتمدة، وتخليص تراخيص البلدية والجهات المختصة.",
      h3: "تقديم خدمات العلاقات العامة (PRO) المستمرة، فتح الحسابات البنكية، ومتابعة معاملاتك عبر بوابة العملاء.",

      ctaTitle: "جاهز لبدء تأسيس شركتك في قطر؟",
      ctaDesc: "تواصل معنا اليوم أو ابدأ طلب تأسيس شركات بقطر مباشرة مع فريقنا القانوني وخبراء العلاقات العامة.",
      ctaBtn: "قدم طلب التأسيس الآن",
      backHome: "← العودة إلى الرئيسية",
      badgeText: "تأسيس شركات بقطر وسوق العمل القطري",

      footerTitle: "ترانس ميشنز للتجارة والخدمات ذ.م.م",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      adminPortal: "دخول الإدارة (Admin)"
    },
    en: {
      home: "Home",
      services: "Services",
      proServices: "PRO Services",
      about: "About Us",
      consultancy: "Consultancy",
      communicate: "Communicate",
      contactUsMenu: "Contact us",
      startUpFormMenu: "Start Up Form",
      clientPortalMenu: "Client Portal",
      countryLabel: "Qatar",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",

      mainTitle: "Company Formation in Qatar: Your Complete Guide to Business Setup in Qatar",
      introText: "If you are looking for company formation in Qatar or starting a new business in Doha, Qatar offers one of the region's most dynamic and stable economies, supported by modern infrastructure, investor-friendly laws, and 100% foreign ownership options across many activities. We guide you through business setup in Qatar from planning to Commercial Registration and licensing.",

      featuresTitle: "Key Advantages of Company Formation in Qatar:",
      f1Title: "Safe & Stable Economy:",
      f1Desc: "A strong, stable national economy that supports company formation in Qatar and sustainable long-term business growth.",
      f2Title: "Streamlined Setup Procedures:",
      f2Desc: "Structured government processes for business setup in Qatar, Commercial Registration (CR), municipal licenses, and labor approvals.",
      f3Title: "Ownership Options & Strategic Access:",
      f3Desc: "Flexible investment structures including 100% foreign ownership in eligible sectors and direct regional/global connectivity via Doha.",
      f4Title: "Support for Growth & Innovation:",
      f4Desc: "An ideal environment for trading, services, tech, and contracting enterprises aligned with Qatar National Vision 2030.",

      helpTitle: "How Does \"Trans Missions\" Support Company Formation in Qatar?",
      helpIntro: "At Trans Missions Trading and Services W.L.L, we guide you step-by-step through company formation in Qatar and ongoing PRO operations:",
      h1: "Selecting business activities, reserving trade names, and issuing Commercial Registration and computer cards.",
      h2: "Attesting contracts and POAs, certified translation, and clearing municipal and regulatory licenses.",
      h3: "Providing ongoing PRO services, corporate bank account readiness, and real-time tracking via your client portal.",

      ctaTitle: "Ready to start company formation in Qatar?",
      ctaDesc: "Contact us today or submit your business setup request with our legal and PRO specialists in Qatar.",
      ctaBtn: "Submit Start Up Order Now",
      backHome: "← Back to Home",
      badgeText: "Company Formation & Qatar Business Market",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Portal"
    }
  };

  const current = content[lang];
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 font-sans ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* الهيدر */}
      <header className="bg-neutral-800/95 border-neutral-700 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="transition hover:scale-105 flex items-center justify-center p-1">
              <img src={currentLogo} alt="Trans Missions Logo" className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300" />
            </Link>
            <div className={`flex flex-col ${isAr ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider leading-none mb-0.5">{current.countryLabel}</span>
              <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight">{current.companyName}</span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:opacity-85 transition">{current.home}</Link>
              <Link href="/about" className="hover:opacity-85 transition">{current.about}</Link>
              <div className="relative">
                <button onClick={() => setCommunicateDropdownOpen(!communicateDropdownOpen)} className="flex items-center gap-1.5 text-emerald-400 font-bold hover:opacity-85 transition py-1 focus:outline-none">
                  <MessageSquare className="w-4 h-4" />
                  <span>{current.communicate}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${communicateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {communicateDropdownOpen && (
                  <div className={`absolute top-full mt-2 w-64 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-2xl py-2 z-50 ${isAr ? 'right-0 text-right' : 'left-0 text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
                    <Link href="/contact" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 hover:text-emerald-400 transition font-medium">{current.contactUsMenu}</Link>
                    <Link href="/start-up-form" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 transition font-bold border-t border-neutral-700 mt-1 pt-2">{current.startUpFormMenu}</Link>
                    <Link href="/client-login" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-emerald-400 hover:bg-emerald-950/40 transition font-bold border-t border-neutral-700 mt-1 pt-2">{current.clientPortalMenu}</Link>
                  </div>
                )}
              </div>
            </nav>
            <div className={`flex items-center gap-2 shrink-0 ${isAr ? 'border-s' : 'border-e'} border-neutral-700 ${isAr ? 'ps-4' : 'pe-4'}`}>
              <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-neutral-700/80 hover:opacity-80 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-600">
                <Globe className="w-4 h-4" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleLanguage} className="flex items-center gap-1 bg-neutral-700/80 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-neutral-600 text-white">
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-neutral-700/50 border border-neutral-600 text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-5 space-y-3 shadow-2xl ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.home}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.about}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.contactUsMenu}</Link>
            <Link href="/start-up-form" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-emerald-400">{current.startUpFormMenu}</Link>
          </div>
        )}
      </header>

      {/* محتوى الصفحة */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-8 space-y-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline">
              {current.backHome}
            </Link>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <Building2 className="w-4 h-4" /> {current.badgeText}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mt-4">
            {current.mainTitle}
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed bg-neutral-800/40 p-6 rounded-3xl border border-neutral-700 shadow-xl mt-6">
            {current.introText}
          </p>
        </div>

        {/* مميزات الاستثمار */}
        <div className="mb-12">
          <h2 className={`text-xl sm:text-2xl font-bold text-white mb-6 ${isAr ? 'border-s-4 ps-3' : 'border-e-4 pe-3'} border-emerald-500`}>
            {current.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-neutral-800/40 border border-neutral-700 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-base font-bold text-white">{current.f1Title}</h3>
              </div>
              <p className={`text-sm text-neutral-300 leading-relaxed ${isAr ? 'pr-7' : 'pl-7'}`}>{current.f1Desc}</p>
            </div>

            <div className="bg-neutral-800/40 border border-neutral-700 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-base font-bold text-white">{current.f2Title}</h3>
              </div>
              <p className={`text-sm text-neutral-300 leading-relaxed ${isAr ? 'pr-7' : 'pl-7'}`}>{current.f2Desc}</p>
            </div>

            <div className="bg-neutral-800/40 border border-neutral-700 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-base font-bold text-white">{current.f3Title}</h3>
              </div>
              <p className={`text-sm text-neutral-300 leading-relaxed ${isAr ? 'pr-7' : 'pl-7'}`}>{current.f3Desc}</p>
            </div>

            <div className="bg-neutral-800/40 border border-neutral-700 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-base font-bold text-white">{current.f4Title}</h3>
              </div>
              <p className={`text-sm text-neutral-300 leading-relaxed ${isAr ? 'pr-7' : 'pl-7'}`}>{current.f4Desc}</p>
            </div>
          </div>
        </div>

        {/* كيف تساعدك ترانس ميشنز */}
        <div className={`bg-neutral-900/60 border border-neutral-700 p-8 sm:p-10 rounded-3xl shadow-xl mb-12 space-y-6 ${isAr ? 'border-s-4' : 'border-e-4'} border-emerald-500`}>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {current.helpTitle}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {current.helpIntro}
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm sm:text-base text-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{current.h1}</span>
            </li>
            <li className="flex items-start gap-3 text-sm sm:text-base text-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{current.h2}</span>
            </li>
            <li className="flex items-start gap-3 text-sm sm:text-base text-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{current.h3}</span>
            </li>
          </ul>
        </div>

        {/* دعوة لاتخاذ إجراء */}
        <div className="bg-gradient-to-r from-emerald-900/40 to-neutral-900 border border-emerald-500/30 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            💡 {current.ctaTitle}
          </h3>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto">
            {current.ctaDesc}
          </p>
          <Link href="/start-up-form" className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg transition text-sm">
            {current.ctaBtn} &rarr;
          </Link>
        </div>
      </main>

      {/* الفوتر */}
      <footer className="bg-neutral-800 text-neutral-300 py-12 border-t border-neutral-700 mt-20 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4" dir={isAr ? 'rtl' : 'ltr'}>
          <p className="text-white font-bold">{current.footerTitle}</p>
          <p className="text-xs opacity-70">{current.rights}</p>
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-700 text-emerald-400 text-xs font-medium border border-neutral-600">
              <Lock className="w-3.5 h-3.5" /> <span>{current.adminPortal}</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}