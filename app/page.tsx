'use client';

import React, { useState } from 'react';
import { Building2, Languages as LangIcon, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Globe, Calculator } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'red' | 'cyber'>('red'); // الافتراضي هو الثيم الثاني الذي يحتوي على الشريط المتحرك
  
  const [companyType, setCompanyType] = useState<number>(2500);
  const [includeTranslation, setIncludeTranslation] = useState<boolean>(false);
  const [includeIt, setIncludeIt] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const totalCost = companyType + (includeTranslation ? 500 : 0) + (includeIt ? 800 : 0);

  const t = {
    ar: {
      brandSub: "للتجارة والخدمات - قطر",
      home: "الرئيسية",
      services: "خدماتنا",
      calculator: "حاسبة التكاليف",
      contact: "اتصل بنا",
      consultation: "حجز استشارة - 5$",
      badge: "استثمارك في قطر هو القرار الصائب",
      title1: "بوابتك الآمنة لتأسيس وإدارة الأعمال في قطر",
      titleHighlight: "نجاحك يبدأ من هنا!",
      desc: "نقدم حلولاً مبتكرة وخدمات عالية الجودة مصممة خصيصاً لتلبية احتياجاتك ومساعدة عملك على النمو، من الفكرة إلى الواقع بدعم حكومي وقانوني متكامل.",
      explore: "استكشف الخدمات",
      contactUs: "تواصل معنا الآن",
      servicesTitle: "خدماتنا الرئيسية في قطر",
      servicesSubtitle: "نسهل عليك تأسيس وإدارة عملك من خلال خدمات التخليص والخدمات المهنية المتخصصة.",
      s1Title: "تخليص المعاملات وتأسيس الشركات",
      s1Desc: "تأسيس وبدء الأعمال التجارية في قطر، ودعم الشركات في إنهاء المعاملات في كافة الجهات وإنجاز التصديقات القانونية.",
      s1Item1: "تأسيس الشركات",
      s1Item2: "التصديقات الحكومية",
      s2Title: "خدمات الترجمة",
      s2Desc: "تقديم الترجمة القانونية المعتمدة في قطر مع إمكانية توثيقها واعتمادها من الجهات الرسمية.",
      s2Item1: "ترجمة قانونية معتمدة",
      s2Item2: "دعم التصديقات الرسمية",
      s3Title: "حلول تكنولوجيا المعلومات",
      s3Desc: "توفير خدمات الدعم التقني والحلول التكنولوجية للمكاتب التجارية بما يتناسب مع متطلبات العمل الحديثة.",
      s3Item1: "تجهيز شبكات وتقنيات المكاتب",
      s3Item2: "دعم فني مستمر",
      calcTitle: "حاسبة تكاليف تأسيس الشركات التفاعلية",
      calcSubtitle: "احسب التكلفة التقديرية لتأسيس شركتك في قطر بكل سهولة وشفافية.",
      typeLabel: "اختر نوع الشركة / الترخيص:",
      t1: "شركة ذات مسؤولية محدودة (LLC)",
      t2: "شركة شخص واحد",
      t3: "فرع شركة أجنبية",
      addonsLabel: "الخدمات الإضافية:",
      a1: "إضافة خدمات الترجمة المعتمدة (+500 $)",
      a2: "إضافة تجهيزات وحلول تكنولوجيا المعلومات (+800 $)",
      totalLabel: "التكلفة التقديرية الإجمالية:",
      startNowBtn: "ابدأ التأسيس بهذا العرض",
      footerTitle: "شركة ترانسميشن للتجارة والخدمات",
      footerInfo: "قطر | البريد الإلكتروني: info@transmissions.qa | الهاتف: 97450080984+",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      tickerText: "🌟 ترانسميشن للتجارة والخدمات في قطر 🌟 تأسيس الشركات وتخليص المعاملات 🌟 خدمات الترجمة القانونية المعتمدة 🌟 حلول وتقنيات تكنولوجيا المعلومات المتقدمة 🌟"
    },
    en: {
      brandSub: "TRADING & SERVICES QATAR",
      home: "Home",
      services: "Services",
      calculator: "Cost Calculator",
      contact: "Contact",
      consultation: "Book Consultation - $5",
      badge: "Your Investment in Qatar is a Just Decision",
      title1: "Gateway to Qatar's Business Horizon",
      titleHighlight: "Your Success Starts Here!",
      desc: "We provide innovative solutions and high-quality services designed to meet your needs and help your business grow. From idea to reality with complete government and legal support.",
      explore: "Explore Services",
      contactUs: "Contact Us Now",
      servicesTitle: "Our Core Services in Qatar",
      servicesSubtitle: "Streamline your business setup and operations with our expert clearance and professional services.",
      s1Title: "Transactions Clearing",
      s1Desc: "Establishing and startup the business in Qatar, supporting companies in finalizing transactions across all departments and handling legalizations.",
      s1Item1: "Company Formation",
      s1Item2: "Government Clearances",
      s2Title: "Translation Services",
      s2Desc: "Providing professional legal translation services in Qatar with the option of formal attestation and certification from official authorities.",
      s2Item1: "Certified Legal Translation",
      s2Item2: "Official Attestation Support",
      s3Title: "IT Solutions",
      s3Desc: "Delivering dedicated IT support and smart technical solutions tailored to commercial offices, matching modern business specifications.",
      s3Item1: "Commercial Office IT Setup",
      s3Item2: "Ongoing Tech Support",
      calcTitle: "Interactive Cost Calculator",
      calcSubtitle: "Calculate the estimated cost to establish your company in Qatar easily and transparently.",
      typeLabel: "Select Company / License Type:",
      t1: "Limited Liability Company (LLC) - $2,500",
      t2: "Single Person Company - $2,000",
      t3: "Foreign Company Branch - $4,000",
      addonsLabel: "Additional Services:",
      a1: "Add Certified Translation Services (+$500)",
      a2: "Add IT & Office Technical Solutions (+$800)",
      totalLabel: "Estimated Total Cost:",
      startNowBtn: "Start Setup With This Package",
      footerTitle: "Trans Missions Trading And Services",
      footerInfo: "Qatar | Email: info@transmissions.qa | Phone: +97450080984",
      rights: "© 2026 Trans Missions. All rights reserved.",
      tickerText: "🌟 Trans Missions Trading & Services Qatar 🌟 Company Formation & Clearance 🌟 Certified Legal Translation 🌟 Advanced IT Solutions 🌟"
    }
  };

  const current = t[lang];

  // Dynamic Theme Styles
  const getThemeStyles = () => {
    switch(theme) {
      case 'red': // التصميم الثاني (المستوحى من الصورة مع شريط متحرك وأحمر ملكي)
        return {
          bg: "bg-black text-white",
          header: "bg-black/95 border-neutral-800",
          btnPrimary: "bg-red-600 hover:bg-red-700 text-white font-bold",
          btnSecondary: "bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white",
          cardBg: "bg-neutral-900/80 border-neutral-800",
          badgeBg: "bg-red-950/50 text-red-400 border-red-900/50",
          accentGradient: "from-red-500 via-rose-500 to-orange-500",
        };
      case 'cyber': // التصميم الثالث (إبداعي - أزرق سيان تكنولوجي)
        return {
          bg: "bg-slate-950 text-cyan-50",
          header: "bg-slate-950/95 border-slate-800",
          btnPrimary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold",
          btnSecondary: "bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300",
          cardBg: "bg-slate-900/70 border-slate-800",
          badgeBg: "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
          accentGradient: "from-cyan-400 to-blue-500",
        };
      default: // التصميم الأول (الهوية الأساسية - أسود فيديد مدرج)
        return {
          bg: "bg-neutral-950 text-neutral-100",
          header: "bg-neutral-950/95 border-neutral-800",
          btnPrimary: "bg-neutral-100 hover:bg-white text-neutral-950 font-bold",
          btnSecondary: "bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200",
          cardBg: "bg-neutral-900/60 border-neutral-800",
          badgeBg: "bg-neutral-900/80 text-neutral-300 border-neutral-800",
          accentGradient: "from-neutral-100 via-neutral-400 to-neutral-600",
        };
    }
  };

  const currentTheme = getThemeStyles();

  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans selection:bg-neutral-800 selection:text-white transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* شريط الإعلانات المتحرك (يظهر فقط في الثيم الثاني المستوحى من صورتك) */}
      {theme === 'red' && (
        <div className="bg-red-600 text-white overflow-hidden whitespace-nowrap py-2 border-b border-red-700 shadow-md">
          <div className="inline-block animate-[marquee_20s_linear_infinite] font-bold text-sm tracking-wide">
            {current.tickerText} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {current.tickerText}
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Trans Missions Logo" 
              className="h-10 sm:h-12 w-auto object-contain brightness-110"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:opacity-80 transition">{current.home}</a>
            <a href="#services" className="hover:opacity-80 transition">{current.services}</a>
            <a href="#calculator" className="hover:opacity-80 transition">{current.calculator}</a>
            <a href="#contact" className="hover:opacity-80 transition">{current.contact}</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* أزرار التبديل بين الـ 3 ثيمات */}
            <div className="flex items-center bg-black/40 border border-neutral-800 rounded-xl p-1 gap-1">
              <button 
                onClick={() => setTheme('faded')} 
                title="الثيم 1: الهوية الفيددة"
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                1
              </button>
              <button 
                onClick={() => setTheme('red')} 
                title="الثيم 2: الشريط المتحرك والأحمر"
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'red' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                2
              </button>
              <button 
                onClick={() => setTheme('cyber')} 
                title="الثيم 3: إبداعي تكنولوجي"
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                3
              </button>
            </div>

            {/* زر تغيير اللغة */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-neutral-900/80 hover:bg-neutral-800 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-800"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <a href="#contact" className={`hidden sm:inline-block px-4 py-2.5 rounded-xl shadow-md transition duration-200 text-sm ${currentTheme.btnPrimary}`}>
              {current.consultation}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${currentTheme.badgeBg}`}>
            <ShieldCheck className="w-4 h-4" />
            <span>{current.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {current.title1} <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.accentGradient}`}>
              {current.titleHighlight}
            </span>
          </h1>
          <p className="text-base sm:text-lg opacity-80 max-w-3xl mx-auto mb-10 leading-relaxed">
            {current.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className={`px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 ${currentTheme.btnPrimary}`}>
              <span>{current.explore}</span>
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <a href="#calculator" className={`px-8 py-4 rounded-xl backdrop-blur-md transition ${currentTheme.btnSecondary}`}>
              {current.calculator}
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{current.servicesTitle}</h2>
          <p className="opacity-75 text-lg">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`${currentTheme.cardBg} backdrop-blur-sm p-8 rounded-2xl border transition duration-300 group`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition ${theme === 'red' ? 'bg-red-950 text-red-500 group-hover:bg-red-600 group-hover:text-white' : theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">{current.s1Title}</h3>
            <p className="opacity-75 leading-relaxed mb-6">{current.s1Desc}</p>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {current.s1Item1}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {current.s1Item2}</li>
            </ul>
          </div>

          <div className={`${currentTheme.cardBg} backdrop-blur-sm p-8 rounded-2xl border transition duration-300 group`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition ${theme === 'red' ? 'bg-red-950 text-red-500 group-hover:bg-red-600 group-hover:text-white' : theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <LangIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">{current.s2Title}</h3>
            <p className="opacity-75 leading-relaxed mb-6">{current.s2Desc}</p>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {current.s2Item1}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {current.s2Item2}</li>
            </ul>
          </div>

          <div className={`${currentTheme.cardBg} backdrop-blur-sm p-8 rounded-2xl border transition duration-300 group`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition ${theme === 'red' ? 'bg-red-950 text-red-500 group-hover:bg-red-600 group-hover:text-white' : theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">{current.s3Title}</h3>
            <p className="opacity-75 leading-relaxed mb-6">{current.s3Desc}</p>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {current.s3Item1}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {current.s3Item2}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Cost Calculator Section */}
      <section id="calculator" className="py-20 bg-black/30 px-4 sm:px-6 lg:px-8 border-y border-neutral-800/80">
        <div className={`max-w-4xl mx-auto ${theme === 'red' ? 'bg-neutral-950 border-red-900/40' : theme === 'cyber' ? 'bg-slate-900 border-slate-700' : 'bg-neutral-900 border-neutral-800'} rounded-3xl shadow-2xl p-8 sm:p-12 border`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-neutral-800 rounded-2xl mb-4 shadow-md border border-neutral-700">
              <Calculator className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">{current.calcTitle}</h2>
            <p className="opacity-75">{current.calcSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold mb-3">{current.typeLabel}</label>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${companyType === 2500 ? 'border-current bg-neutral-800/60 ring-1' : 'border-neutral-800 bg-black/40 hover:bg-neutral-800/40'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="companyType" checked={companyType === 2500} onChange={() => setCompanyType(2500)} className="w-4 h-4" />
                    <span className="font-medium text-sm">{current.t1}</span>
                  </div>
                  <span className="font-bold">$2,500</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${companyType === 2000 ? 'border-current bg-neutral-800/60 ring-1' : 'border-neutral-800 bg-black/40 hover:bg-neutral-800/40'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="companyType" checked={companyType === 2000} onChange={() => setCompanyType(2000)} className="w-4 h-4" />
                    <span className="font-medium text-sm">{current.t2}</span>
                  </div>
                  <span className="font-bold">$2,000</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${companyType === 4000 ? 'border-current bg-neutral-800/60 ring-1' : 'border-neutral-800 bg-black/40 hover:bg-neutral-800/40'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="companyType" checked={companyType === 4000} onChange={() => setCompanyType(4000)} className="w-4 h-4" />
                    <span className="font-medium text-sm">{current.t3}</span>
                  </div>
                  <span className="font-bold">$4,000</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-3">{current.addonsLabel}</label>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${includeTranslation ? 'border-current bg-neutral-800/60 ring-1' : 'border-neutral-800 bg-black/40 hover:bg-neutral-800/40'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={includeTranslation} onChange={(e) => setIncludeTranslation(e.target.checked)} className="w-4 h-4 rounded" />
                    <span className="font-medium text-sm">{current.a1}</span>
                  </div>
                  <span className="font-bold opacity-80">+$500</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${includeIt ? 'border-current bg-neutral-800/60 ring-1' : 'border-neutral-800 bg-black/40 hover:bg-neutral-800/40'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={includeIt} onChange={(e) => setIncludeIt(e.target.checked)} className="w-4 h-4 rounded" />
                    <span className="font-medium text-sm">{current.a2}</span>
                  </div>
                  <span className="font-bold opacity-80">+$800</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-neutral-800">
            <div>
              <p className="text-neutral-400 text-sm font-medium mb-1">{current.totalLabel}</p>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                ${totalCost} USD
              </div>
            </div>
            <a href="#contact" className={`w-full sm:w-auto px-8 py-4 rounded-xl shadow-lg transition text-center ${currentTheme.btnPrimary}`}>
              {current.startNowBtn}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-neutral-400 py-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start">
            <p className="text-white font-bold text-lg mb-1">{current.footerTitle}</p>
            <p className="text-sm">{current.footerInfo}</p>
          </div>
          <p className="text-sm">{current.rights}</p>
        </div>
      </footer>
    </div>
  );
}