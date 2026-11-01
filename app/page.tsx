'use client';

import React, { useState } from 'react';
import { Building2, Languages as LangIcon, Cpu, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, Globe, Calculator, Users, UserPlus, X } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'cyber'>('faded');
  
  const [companyType, setCompanyType] = useState<number>(2500);
  const [includeTranslation, setIncludeTranslation] = useState<boolean>(false);
  const [includeIt, setIncludeIt] = useState<boolean>(false);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // حالة للتحكم في عرض تفاصيل الخدمة (Modal)
  const [selectedService, setSelectedService] = useState<{ title: string; desc: string; details: string } | null>(null);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const totalCost = companyType + (includeTranslation ? 500 : 0) + (includeIt ? 800 : 0);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setIsRegistered(true);
  };

  const t = {
    ar: {
      home: "الرئيسية",
      services: "خدماتنا",
      proServices: "خدمات المعقبين",
      about: "من نحن",
      consultancy: "الاستشارات أونلاين",
      register: "تسجيل العملاء",
      contact: "اتصل بنا",
      calculator: "حاسبة التكاليف",
      consultationBtn: "حجز استشارة - 5$",
      badge: "استثمارك في قطر هو القرار الصائب",
      title1: "بوابتك الآمنة لتأسيس وإدارة الأعمال في قطر",
      titleHighlight: "نجاحك يبدأ من هنا!",
      desc: "نقدم حلولاً مبتكرة وخدمات عالية الجودة مصممة خصيصاً لتلبية احتياجاتك ومساعدة عملك على النمو، من الفكرة إلى الواقع بدعم حكومي وقانوني متكامل.",
      explore: "استكشف الخدمات",
      contactUs: "تواصل معنا الآن",
      servicesTitle: "Our Services",
      servicesSubtitle: "خدمات متكاملة مصممة خصيصاً لتمكين أعمالك وتسهيل عملياتك في قطر.",
      s1Title: "Transaction Clearance",
      s1Desc: "تخليص كافة المعاملات الحكومية وتأسيس وبدء الأعمال التجارية وإنهاء الأوراق الرسمية بكفاءة عالية.",
      s1Details: "نحن نوفر خدمة تخليص المعاملات الحكومية بالكامل، إصدار السجل التجاري، رخص البلدية، وتخليص كافة الموافقات الرسمية من الجهات الحكومية في دولة قطر بسرعة ودقة عالية.",
      
      s2Title: "Translation Services",
      s2Desc: "تقديم الترجمة القانونية المعتمدة وتوثيق المستندات الرسمية من الجهات المختصة.",
      s2Details: "خدمات ترجمة قانونية معتمدة لجميع اللغات، ومقبولة لدى كافة السفارات والجهات الحكومية والقضائية في قطر مع ختم الاعتماد الرسمي.",
      
      s3Title: "IT Support",
      s3Desc: "توفير حلول ودعم تكنولوجيا المعلومات وتجهيز البنية التحتية التقنية للمكاتب والشركات.",
      s3Details: "تجهيز البنية التحتية للشبكات، أنظمة الحماية والكاميرات، صيانة الأجهزة، وتقديم الدعم الفني المتكامل للشركات والمكاتب الجديدة.",
      
      s4Title: "Trading Services",
      s4Desc: "خدمات تجارية متكاملة ودعم عمليات الاستيراد والتصدير والتوزيع في السوق القطري.",
      s4Details: "مساعدة المستثمرين في استكشاف السوق المحلي، تسهيل عقود التوريد، ودعم سلاسل الإمداد والتوزيع بكفاءة واحترافية عالية.",

      proTitle: "PRO Services",
      proDesc: "إنجاز معاملات الجهات الحكومية، رخص التجارة، وتخليص إقامات الموظفين بسرعة واحترافية.",
      aboutTitle: "About Us",
      aboutDesc: "شركة ترانسميشن للتجارة والخدمات مسجلة بموجب القوانين القطرية لتكون شريكك الاستراتيجي والأمثل في نجاح وتطوير أعمالك من الفكرة إلى التميز.",
      consultancyTitle: "Online Consultancy",
      consultancyDesc: "احصل على استشارات قانونية وتجارية مباشرة أونلاين مع خبرائنا المتخصصين في السوق القطري.",
      regTitle: "بوابة تسجيل العملاء",
      regSubtitle: "سجل بياناتك الآن لإنشاء حساب بقاعدة البيانات ومتابعة خدماتك بسهولة.",
      nameLabel: "اسم العميل / الشركة",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف",
      submitRegBtn: "إرسال وحفظ في قاعدة البيانات",
      successMsg: "تم تسجيل بياناتك بنجاح في قاعدة البيانات وسيتم التواصل معك قريباً!",
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
      closeBtn: "إغلاق",
      requestService: "اطلب هذه الخدمة الآن"
    },
    en: {
      home: "Home",
      services: "Our Services",
      proServices: "PRO Services",
      about: "About Us",
      consultancy: "Online Consultancy",
      register: "Client Portal",
      contact: "Contact Us",
      calculator: "Cost Calculator",
      consultationBtn: "Book Consultation - $5",
      badge: "Your Investment in Qatar is a Just Decision",
      title1: "Gateway to Qatar's Business Horizon",
      titleHighlight: "Your Success Starts Here!",
      desc: "We provide innovative solutions and high-quality services designed to meet your needs and help your business grow. From idea to reality with complete government and legal support.",
      explore: "Explore Services",
      contactUs: "Contact Us Now",
      servicesTitle: "Our Services",
      servicesSubtitle: "Comprehensive services designed specifically to empower your business and streamline operations in Qatar.",
      s1Title: "Transaction Clearance",
      s1Desc: "Clearing all government transactions, company incorporation, and finalizing official paperwork with high efficiency.",
      s1Details: "We provide complete government transaction clearance, commercial registration, municipal licenses, and official approvals in Qatar with high speed and accuracy.",
      
      s2Title: "Translation Services",
      s2Desc: "Providing certified legal translation and official document attestation from competent authorities.",
      s2Details: "Certified legal translation services for all languages, accepted by all embassies, government, and judicial authorities in Qatar.",
      
      s3Title: "IT Support",
      s3Desc: "Delivering IT support solutions and setting up technical infrastructure for modern offices and enterprises.",
      s3Details: "Setting up network infrastructure, security systems, hardware maintenance, and comprehensive technical support for offices.",
      
      s4Title: "Trading Services",
      s4Desc: "Integrated commercial services supporting import, export, and distribution operations in the Qatari market.",
      s4Details: "Assisting investors in exploring the local market, facilitating supply contracts, and supporting supply chains efficiently.",

      proTitle: "PRO Services",
      proDesc: "Handling government department transactions, commercial licenses, and employee residency processing efficiently.",
      aboutTitle: "About Us",
      aboutDesc: "Trans Missions Trading and Services is established under Qatari law to be your ultimate strategic partner in business success and growth.",
      consultancyTitle: "Online Consultancy",
      consultancyDesc: "Get direct online legal and business consultations with our experts specialized in the Qatari market.",
      regTitle: "Client Registration Portal",
      regSubtitle: "Register your details to create an account in our database and easily track your services.",
      nameLabel: "Client / Company Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      submitRegBtn: "Submit & Save to Database",
      successMsg: "Your data has been successfully registered in our database. We will contact you soon!",
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
      closeBtn: "Close",
      requestService: "Request This Service"
    }
  };

  const current = t[lang];

  const currentTheme = theme === 'cyber' ? {
    bg: "bg-slate-950 text-cyan-50",
    header: "bg-slate-950/95 border-slate-800",
    btnPrimary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold",
    btnSecondary: "bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300",
    cardBg: "bg-slate-900/70 border-slate-800",
    badgeBg: "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
    accentGradient: "from-cyan-400 to-blue-500",
  } : {
    bg: "bg-neutral-950 text-neutral-100",
    header: "bg-neutral-950/95 border-neutral-800",
    btnPrimary: "bg-neutral-100 hover:bg-white text-neutral-950 font-bold",
    btnSecondary: "bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200",
    cardBg: "bg-neutral-900/60 border-neutral-800",
    badgeBg: "bg-neutral-900/80 text-neutral-300 border-neutral-800",
    accentGradient: "from-neutral-100 via-neutral-400 to-neutral-600",
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans selection:bg-neutral-800 selection:text-white transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trans Missions Logo" className="h-10 sm:h-12 w-auto object-contain brightness-110" />
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#home" className="hover:opacity-80 transition">{current.home}</a>
            <a href="#services" className="hover:opacity-80 transition">{current.services}</a>
            <a href="#pro-services" className="hover:opacity-80 transition">{current.proServices}</a>
            <a href="#about" className="hover:opacity-80 transition">{current.about}</a>
            <a href="#consultancy" className="hover:opacity-80 transition">{current.consultancy}</a>
            <a href="#contact" className="hover:opacity-80 transition">{current.contact}</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-black/40 border border-neutral-800 rounded-xl p-1 gap-1">
              <button onClick={() => setTheme('faded')} className={`px-3 py-1 text-xs rounded-lg font-medium transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'}`}>1</button>
              <button onClick={() => setTheme('cyber')} className={`px-3 py-1 text-xs rounded-lg font-medium transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-neutral-400 hover:text-white'}`}>2</button>
            </div>

            <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-neutral-900/80 hover:bg-neutral-800 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-800">
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <a href="#contact" className={`hidden sm:inline-block px-4 py-2.5 rounded-xl shadow-md transition duration-200 text-sm ${currentTheme.btnPrimary}`}>
              {current.consultationBtn}
            </a>
          </div>
        </div>
      </header>

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

      {/* قسم الخدمات مع تفاعل النقر لعرض التفاصيل (Modal) */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{current.servicesTitle}</h2>
          <p className="opacity-75 text-lg">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => setSelectedService({ title: current.s1Title, desc: current.s1Desc, details: current.s1Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-2xl border transition duration-300 group cursor-pointer hover:scale-105`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s1Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s1Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s2Title, desc: current.s2Desc, details: current.s2Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-2xl border transition duration-300 group cursor-pointer hover:scale-105`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <LangIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s2Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s2Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s3Title, desc: current.s3Desc, details: current.s3Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-2xl border transition duration-300 group cursor-pointer hover:scale-105`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s3Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s3Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s4Title, desc: current.s4Desc, details: current.s4Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-2xl border transition duration-300 group cursor-pointer hover:scale-105`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s4Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s4Desc}</p>
          </div>
        </div>
      </section>

      {/* نافذة منبثقة لعرض تفاصيل الخدمة عند الضغط عليها */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`${currentTheme.cardBg} border p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200`}>
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 left-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">{selectedService.title}</h3>
            <p className="text-sm font-semibold opacity-90 mb-4">{selectedService.desc}</p>
            <p className="opacity-75 text-sm leading-relaxed mb-6 border-t border-neutral-800 pt-4">{selectedService.details}</p>
            <div className="flex gap-3">
              <a 
                href="#register-section" 
                onClick={() => setSelectedService(null)}
                className={`flex-1 py-3 rounded-xl text-center shadow-lg transition ${currentTheme.btnPrimary}`}
              >
                {current.requestService}
              </a>
              <button 
                onClick={() => setSelectedService(null)}
                className={`px-5 py-3 rounded-xl transition ${currentTheme.btnSecondary}`}
              >
                {current.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="pro-services" className="py-16 bg-neutral-900/40 px-4 sm:px-6 lg:px-8 border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">{current.proTitle}</h2>
            <p className="opacity-75 max-w-2xl">{current.proDesc}</p>
          </div>
          <a href="#contact" className={`px-6 py-3 rounded-xl shadow-md transition ${currentTheme.btnPrimary}`}>
            {current.contactUs}
          </a>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className={`${currentTheme.cardBg} p-10 sm:p-14 rounded-3xl border shadow-xl`}>
          <h2 className="text-3xl font-extrabold mb-4">{current.aboutTitle}</h2>
          <p className="opacity-80 text-lg leading-relaxed max-w-3xl mx-auto">{current.aboutDesc}</p>
        </div>
      </section>

      <section id="consultancy" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className={`${currentTheme.cardBg} p-10 rounded-3xl border shadow-xl`}>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-neutral-800 text-white rounded-2xl mb-4">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{current.consultancyTitle}</h2>
          <p className="opacity-75 mb-6">{current.consultancyDesc}</p>
          <a href="#contact" className={`inline-block px-8 py-3.5 rounded-xl font-semibold shadow-lg transition ${currentTheme.btnPrimary}`}>
            {current.consultationBtn}
          </a>
        </div>
      </section>

      <section id="register-section" className="py-20 bg-black/40 px-4 sm:px-6 lg:px-8 border-y border-neutral-800">
        <div className={`max-w-2xl mx-auto ${currentTheme.cardBg} p-8 sm:p-12 rounded-3xl border shadow-2xl`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-600/20 text-cyan-400 rounded-2xl mb-4 border border-cyan-500/30">
              <UserPlus className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">{current.regTitle}</h2>
            <p className="opacity-75 text-sm">{current.regSubtitle}</p>
          </div>

          {isRegistered ? (
            <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              {current.successMsg}
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.nameLabel}</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Example: Mohamed Ali"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.emailLabel}</label>
                <input 
                  type="email" 
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.phoneLabel}</label>
                <input 
                  type="tel" 
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+974 XXXXXXXX"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition"
                />
              </div>

              <button 
                type="submit"
                className={`w-full py-4 rounded-xl shadow-lg transition text-center ${currentTheme.btnPrimary}`}
              >
                {current.submitRegBtn}
              </button>
            </form>
          )}
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 border-y border-neutral-800/80">
        <div className={`max-w-4xl mx-auto ${theme === 'cyber' ? 'bg-slate-900 border-slate-700' : 'bg-neutral-900 border-neutral-800'} rounded-3xl shadow-2xl p-8 sm:p-12 border`}>
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
            <a href="#register-section" className={`w-full sm:w-auto px-8 py-4 rounded-xl shadow-lg transition text-center ${currentTheme.btnPrimary}`}>
              {current.startNowBtn}
            </a>
          </div>
        </div>
      </section>

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