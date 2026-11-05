'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, FileText, CheckCircle2, Clock, LogOut, Globe, Phone } from 'lucide-react';

export default function ClientPortal() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [clientData, setClientData] = useState<{ companyName: string; email: string; phone: string; password?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as 'ar' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }

    try {
      const currentClient = localStorage.getItem('current_client');
      if (!currentClient) {
        router.push('/client-login');
      } else {
        setClientData(JSON.parse(currentClient));
      }
    } catch (e) {
      console.error(e);
      router.push('/client-login');
    }
  }, [router]);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('current_client');
    router.push('/client-login');
  };

  const t = {
    ar: {
      homeBtn: "الرئيسية",
      portalTitle: "بوابة متابعة العملاء",
      welcome: "مرحباً بك،",
      emailLabel: "البريد الإلكتروني:",
      phoneLabel: "رقم الهاتف / الواتساب:",
      statusTitle: "حالة المعاملات والتأسيس",
      statusSub: "متابعة حية لمستندات شركتك ومعاملاتك الحكومية في دولة قطر",
      step1: "تأسيس الشركة والسجل التجاري",
      step1Desc: "إصدار السجل التجاري ورخصة البلدية وقيد المنشأة.",
      completed: "مكتمل",
      step2: "توثيق العقود والتصديقات",
      step2Desc: "توثيق عقود التأسيس والوكالات الرسمية بوزارة العدل.",
      inProgress: "قيد الإجراء",
      step3: "إقامات الموظفين وأذونات العمل",
      step3Desc: "إصدار التأشيرات ومعاملات إدارة الجوازات ووزارة العمل.",
      pending: "قيد الانتظار",
      supportTitle: "تحتاج إلى مساعدة عاجلة؟",
      supportDesc: "فريقنا القانوني وفريق العلاقات العامة جاهز دائماً لخدمتك في قطر.",
      whatsappBtn: "تواصل عبر الواتساب",
      logoutBtn: "تسجيل الخروج",
      footer: "ترانس ميشنز للتجارة والخدمات ذ.م.م © 2026",
      countryLabel: "قطر",
      companyNameMain: "ترانس ميشنز للتجارة والخدمات",
      companySub: "ذ.م.م"
    },
    en: {
      homeBtn: "Home",
      portalTitle: "Client Tracking Portal",
      welcome: "Welcome,",
      emailLabel: "Email Address:",
      phoneLabel: "Phone / WhatsApp:",
      statusTitle: "Transactions & Incorporation Status",
      statusSub: "Live tracking of your company documents and government transactions in Qatar",
      step1: "Company Setup & Commercial Registration",
      step1Desc: "Issuing CR, municipal license, and computer card.",
      completed: "Completed",
      step2: "Contracts Attestation & Notary",
      step2Desc: "Documenting establishment contracts at the Ministry of Justice.",
      inProgress: "In Progress",
      step3: "Staff Residencies & Work Permits",
      step3Desc: "Issuing visas and processing with Passports and Labour departments.",
      pending: "Pending",
      supportTitle: "Need Urgent Assistance?",
      supportDesc: "Our legal and PRO team is always ready to serve you in Qatar.",
      whatsappBtn: "Contact via WhatsApp",
      logoutBtn: "Sign Out",
      footer: "Trans Missions Trading And Services W.L.L © 2026",
      countryLabel: "Qatar",
      companyNameMain: "Trans Missions Trading And Services",
      companySub: "W.L.L"
    }
  };

  const current = t[lang];
  const currentLogo = '/logo1.png';

  if (!clientData) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-sm text-emerald-400">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* هيدر البورتال */}
      <header className="bg-neutral-800/95 border-neutral-700 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="transition hover:scale-105 flex items-center justify-center p-1">
              <img 
                src={currentLogo} 
                alt="Trans Missions Logo" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider leading-none mb-0.5">{current.countryLabel}</span>
              <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight">{current.companyNameMain}</span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 bg-neutral-700/80 hover:bg-neutral-600 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-600 text-white">
              <span>{current.homeBtn}</span>
            </a>

            <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-neutral-700/80 hover:bg-neutral-600 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-600 text-white">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-red-800">
              <LogOut className="w-4 h-4" />
              <span>{current.logoutBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* محتوى البورتال الرئيسي */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* بطاقة الترحيب ومعلومات الشركة */}
        <div className="bg-neutral-900/80 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{current.portalTitle}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {current.welcome} <span className="text-emerald-400">{clientData.companyName}</span>
              </h1>
            </div>
            <div className="bg-neutral-800/80 border border-neutral-700 p-4 rounded-2xl space-y-1.5 text-xs sm:text-sm w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-semibold">{current.emailLabel}</span>
                <span className="text-white font-mono">{clientData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-semibold">{current.phoneLabel}</span>
                <span className="text-white font-mono" dir="ltr">{clientData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* تتبع المعاملات والمستندات */}
        <div className="bg-neutral-900/80 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-md space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-white mb-1">{current.statusTitle}</h2>
            <p className="text-xs text-neutral-400">{current.statusSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800/50 border border-neutral-700 p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                    {current.completed}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{current.step1}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{current.step1Desc}</p>
              </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-800">
                    {current.inProgress}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{current.step2}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{current.step2Desc}</p>
              </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-700 text-neutral-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold border border-neutral-700">
                    {current.pending}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{current.step3}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{current.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* بطاقة الدعم والواتساب */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-neutral-900 border border-emerald-800/50 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{current.supportTitle}</h3>
            <p className="text-xs text-neutral-300">{current.supportDesc}</p>
          </div>
          <a 
            href="https://wa.me/97450080984" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg flex items-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>{current.whatsappBtn}</span>
          </a>
        </div>

      </main>

      {/* الفوتر */}
      <footer className="bg-neutral-900 text-neutral-400 py-6 border-t border-neutral-800 text-center text-xs">
        {current.footer}
      </footer>

    </div>
  );
}