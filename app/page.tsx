'use client';

import React, { useState } from 'react';
import { Building2, Languages as LangIcon, Cpu, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, Globe, Users, X, Mail, Phone, MapPin, Send, FileText, Upload, CheckCircle, Menu, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'cyber' | 'light'>('faded');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const [selectedService, setSelectedService] = useState<{ title: string; desc: string; details: string[]; actionText?: string } | null>(null);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsMessageSent(true);
  };

  const t = {
    ar: {
      home: "الرئيسية",
      services: "خدماتنا",
      proServices: "خدمات العلاقات العامة",
      about: "من نحن",
      consultancy: "الاستشارات",
      clientPortal: "قدم طلبك الآن",
      contact: "اتصل بينا",
      consultationBtn: "حجز استشارة - 5$",
      badge: "استثمارك في قطر هو القرار الصائب",
      title1: "بوابتك الآمنة لتأسيس وإدارة الأعمال في قطر",
      titleHighlight: "نجاحك يبدأ من هنا!",
      desc: "نقدم حلولاً مبتكرة وخدمات حكومية وقانونية متكاملة مصممة خصيصاً لمساعدة عملك على النمو في السوق القطري بكفاءة عالية.",
      explore: "استكشف الخدمات",
      contactUs: "تواصل معنا الآن",
      
      // القطعة الجديدة بالترجمة العربية الاحترافية
      experienceHeading: "خبرة واسعة وثقة موثوقة",
      experienceText: "مع خبرة واسعة في التعامل مع كافة الإجراءات الحكومية، يضمن فريقنا القانوني المتخصص إنجاز معاملاتك بسلاسة، وأمان، وامتثال تام للقوانين. لقد نجحنا في مساعدة عملاء من حول العالم في تأسيس العديد من الشركات الوطنية في دولة قطر.",

      countryLabel: "قطر",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",

      servicesTitle: "الخدمات الأساسية",
      servicesSubtitle: "خدمات متكاملة لتمكين أعمالك وتسهيل كافة الإجراءات الرسمية والتجارية.",
      
      s1Title: "تخليص المعاملات",
      s1Desc: "تخليص كافة المعاملات الحكومية وتأسيس وبدء الأعمال التجارية وإنهاء الأوراق الرسمية بكفاءة عالية.",
      s1Details: [
        "تأسيس الشركات وإنهاء كافة إجراءات وزارة التجارة والصناعة.",
        "إصدار السجل التجاري ورخص البلدية والموافقات الرسمية.",
        "التقديم الإلكتروني على كافة المعاملات الحكومية."
      ],
      
      s2Title: "الترجمة المعتمدة",
      s2Desc: "تقديم الترجمة القانونية المعتمدة وتوثيق المستندات الرسمية من الجهات المختصة.",
      s2Details: [
        "خدمات ترجمة قانونية معتمدة لجميع اللغات.",
        "مقبولة لدى كافة السفارات والوزارات والجهات القضائية في قطر.",
        "توثيق وختم المستندات الرسمية بدقة وسرعة."
      ],
      
      s3Title: "دعم تكنولوجيا المعلومات",
      s3Desc: "توفير حلول ودعم تكنولوجيا المعلومات وتجهيز البنية التحتية التقنية للمكاتب والشركات.",
      s3Details: [
        "تجهيز البنية التحتية للشبكات وأجهزة الكمبيوتر واللابتوب.",
        "توريد إكسسوارات وأنظمة حماية الشركات.",
        "دعم فني متكامل وصيانة دورية."
      ],
      
      s4Title: "الخدمات التجارية",
      s4Desc: "خدمات تجارية متكاملة ودعم عمليات الاستيراد والتصدير والتوزيع في السوق القطري.",
      s4Details: [
        "تسهيل عقود التوريد ودعم سلاسل الإمداد.",
        "مساعدة المستثمرين في دراسة واستكشاف السوق المحلي.",
        "إدارة وتنظيم العمليات التجارية بكفاءة."
      ],

      proMainTitle: "خدمات العلاقات العامة",
      proMainSubtitle: "إنجاز معاملات الوزارات، الجوازات، البلدية، والجهات الرسمية في دولة قطر باحترافية تامة.",
      
      pro1Title: "تأسيس وتعديل الشركات",
      pro1Desc: "تولي كافة مهام التأسيس، إضافة أو حذف مخولين بالتوقيع، تعديل نسب الشركاء، وتجديد السجلات.",
      pro1Details: [
        "التأسيس الشامل للشركات وإصدار السجلات ورخص البلدية.",
        "تعديل الأنشطة وإضافة أو حذف الشركاء والمخولين بالتوقيع.",
        "تنفيذ عقود البيع والتوكيلات.",
        "تجديد رخص القيد منشأة والسجلات التجارية."
      ],

      pro2Title: "وزارة العدل",
      pro2Desc: "توثيق العقود، التوكيلات الخاصة والعامة، وعقود البيع وتأسيس الشركات رسمياً.",
      pro2Details: [
        "عمل التوكيلات الخاصة والعامة.",
        "توثيق عقود البيع وعقود التأسيس."
      ],

      pro3Title: "خدمات الجوازات والعمل",
      pro3Desc: "إنجاز كافة أعمال الإدارة العامة للجوازات، إقامات الموظفين، وقيد المنشأة وأذونات العمل.",
      pro3Details: [
        "إصدار وتجديد إقامات الموظفين وقيد المنشأة.",
        "تغيير المستقدم والإعارات وأذونات العمل.",
        "خدمات التأشيرات ومتابعة معاملات وزارة العمل."
      ],

      pro4Title: "وزارة البلدية والجهات الأخرى",
      pro4Desc: "تسجيل عقود الإيجار، تصنيف المهندسين، ومكاتب الاستشارات الهندسية.",
      pro4Details: [
        "تسجيل وتوثيق عقود الإيجار.",
        "خدمات تصنيف المهندسين ومكاتب الاستشارات الهندسية.",
        "المواعيد الطبية وقومسيون التأشيرات."
      ],

      aboutTitle: "من نحن",
      aboutDesc: "شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) مسجلة بموجب القوانين القطرية (رقم السجل: 210470) لتكون شريكك الاستراتيجي والأمثل في نجاح وتطوير أعمالك في قطر.",
      consultancyTitle: "الاستشارات أونلاين",
      consultancyDesc: "احصل على استشارات قانونية وتجارية مباشرة أونلاين مع خبرائنا المتخصصين في السوق القطري.",
      
      contactSectionTitle: "تواصل معنا",
      contactSectionSubtitle: "نحن هنا دائماً للإجابة على استفساراتكم ومساعدة أعمالكم على النمو في قطر.",
      boxNameLabel: "الاسم الكامل",
      boxEmailLabel: "البريد الإلكتروني",
      boxMsgLabel: "نص الرسالة أو الاستفسار",
      boxSubmitBtn: "إرسال الرسالة",
      boxSuccessMsg: "تم ارسال رسالتك بنجاح، سيتم التواصل معك في أقرب وقت!",
      locationText: "مول المرقاب، الدوحة، قطر (Al Mirqab Mall, Doha, Qatar)",
      phoneText: "+974 50080984",
      emailText: "info@transmissionsqa.com",
      qrTitle: "امسح الكود للاتصال السريع",
      qrDesc: "وجه كاميرا هاتفك نحو الكود للتواصل المباشر معنا.",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      adminPortal: "دخول الإدارة (Admin)",
      closeBtn: "إغلاق",
      requestService: "قدم طلبك الآن"
    },
    en: {
      home: "Home",
      services: "Services",
      proServices: "PRO Services",
      about: "About Us",
      consultancy: "Consultancy",
      clientPortal: "Submit Order Now",
      contact: "Contact Us",
      consultationBtn: "Book Consultation - $5",
      badge: "Your Investment in Qatar is a Just Decision",
      title1: "Your Gateway to Qatar's Business Horizon",
      titleHighlight: "Your Success Starts Here!",
      desc: "We provide innovative solutions and comprehensive government and legal services designed to empower your business in Qatar.",
      explore: "Explore Services",
      contactUs: "Contact Us Now",
      
      // القطعة الجديدة باللغة الإنجليزية كما طلبتِها تماماً
      experienceHeading: "Extensive Experience & Trusted Expertise",
      experienceText: "With extensive experience in handling all government procedures, our knowledgeable legal team ensures a smooth, secure, and compliant process. We have successfully assisted clients from around the world in establishing numerous national companies in Qatar.",

      countryLabel: "Qatar",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",

      servicesTitle: "Our Services",
      servicesSubtitle: "Comprehensive services designed specifically to empower your business and streamline operations in Qatar.",
      
      s1Title: "Transaction Clearance",
      s1Desc: "Clearing all government transactions, company incorporation, and finalizing official paperwork with high efficiency.",
      s1Details: [
        "Company incorporation and MOCI procedures.",
        "Commercial registration and municipal licenses.",
        "Online government applications."
      ],
      
      s2Title: "Translation Services",
      s2Desc: "Providing certified legal translation and official document attestation from competent authorities.",
      s2Details: [
        "Certified legal translation for all languages.",
        "Accepted by embassies and Qatari authorities.",
        "Fast document attestation."
      ],
      
      s3Title: "IT Support & Networks",
      s3Desc: "Delivering IT support solutions and setting up technical infrastructure for modern offices and enterprises.",
      s3Details: [
        "Network infrastructure and hardware setup.",
        "Corporate accessories and IT supplies.",
        "Comprehensive technical support."
      ],
      
      s4Title: "Trading Services",
      s4Desc: "Integrated commercial services supporting import, export, and distribution operations in the Qatari market.",
      s4Details: [
        "Supply contracts facilitation.",
        "Local market research assistance.",
        "Efficient supply chain management."
      ],

      proMainTitle: "PRO Services",
      proMainSubtitle: "Handling government department transactions, MOCI, MOJ, immigration, and municipal services efficiently.",
      
      pro1Title: "Companies Setup (MOCI)",
      pro1Desc: "Handling all startup procedures, signatories, activity additions, and license renewals.",
      pro1Details: [
        "Complete company setup and licensing.",
        "Shareholders and signatories amendments.",
        "Sales agreements and POA (Arabic & English)."
      ],

      pro2Title: "Ministry of Justice (MOJ)",
      pro2Desc: "Document attestation, special/general POAs, and company establishment contracts.",
      pro2Details: [
        "General and special POAs.",
        "Sale and establishment contracts."
      ],

      pro3Title: "Immigration & Labour (MOL)",
      pro3Desc: "Handling general Directorate of Passports, RP processing, computer cards, and work permits.",
      pro3Details: [
        "RP processing and computer cards.",
        "Employer changes and secondments."
      ],

      pro4Title: "Municipality (MME)",
      pro4Desc: "Lease agreements registration, engineers classification, and consultancy offices.",
      pro4Details: [
        "Lease agreements registration.",
        "Engineers and consultancy classification.",
        "QVC appointments and medical commission."
      ],

      aboutTitle: "About Us",
      aboutDesc: "Trans Missions Trading and Services W.L.L (C.R. No: 210470) is established under Qatari law to be your ultimate strategic partner in business success and growth.",
      consultancyTitle: "Online Consultancy",
      consultancyDesc: "Get direct online legal and business consultations with our experts specialized in the Qatari market.",
      
      contactSectionTitle: "Contact Us",
      contactSectionSubtitle: "We are always here to answer your inquiries and help your business grow in Qatar.",
      boxNameLabel: "Full Name",
      boxEmailLabel: "Email Address",
      boxMsgLabel: "Your Message or Inquiry",
      boxSubmitBtn: "Send Message",
      boxSuccessMsg: "Your message has been sent successfully. We will contact you soon!",
      locationText: "Al Mirqab Mall, Doha, Qatar",
      phoneText: "+974 50080984",
      emailText: "info@transmissionsqa.com",
      qrTitle: "Scan QR for Quick Contact",
      qrDesc: "Point your phone camera to connect directly.",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Portal",
      closeBtn: "Close",
      requestService: "Submit Order Now"
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
  } : theme === 'light' ? {
    bg: "bg-slate-50 text-slate-900",
    header: "bg-white/95 border-slate-200 shadow-sm",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
    btnSecondary: "bg-white hover:bg-slate-100 border border-slate-300 text-slate-700",
    cardBg: "bg-white border-slate-200 shadow-md",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accentGradient: "from-emerald-600 to-teal-700",
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
    <div className={`min-h-screen ${currentTheme.bg} font-sans transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1.5 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md">
                <img 
                  src="/logo.png" 
                  alt="Trans Missions Logo" 
                  className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] filter brightness-125 contrast-125 transition hover:scale-105" 
                />
              </div>
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
              <a href="#home" className="hover:opacity-85 transition">{current.home}</a>
              <a href="#services" className="hover:opacity-85 transition">{current.services}</a>
              <a href="#pro-services" className="hover:opacity-85 transition">{current.proServices}</a>
              <Link href="/contact" className="text-emerald-500 font-bold hover:opacity-85 transition flex items-center gap-1">
                <Upload className="w-4 h-4" />
                <span>{current.clientPortal}</span>
              </Link>
              <Link href="/about" className="hover:opacity-85 transition">{current.about}</Link>
              <a href="#consultancy" className="hover:opacity-85 transition">{current.consultancy}</a>
              <Link href="/contact" className="hover:opacity-85 transition text-emerald-400 font-bold">{current.contact}</Link>
            </nav>

            <div className="flex items-center gap-2 shrink-0 border-s border-neutral-800 ps-4">
              <div className="flex items-center bg-black/10 dark:bg-black/40 border border-neutral-800/20 dark:border-neutral-800 rounded-xl p-1 gap-1">
                <button onClick={() => setTheme('faded')} className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>1</button>
                <button onClick={() => setTheme('cyber')} className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>2</button>
                <button onClick={() => setTheme('light')} className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${theme === 'light' ? 'bg-emerald-600 text-white font-bold' : 'opacity-70 hover:opacity-100'}`}>3</button>
              </div>

              <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-black/5 dark:bg-neutral-900/80 hover:opacity-80 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-800/20 dark:border-neutral-800">
                <Globe className="w-4 h-4" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950 border-t border-neutral-800 p-6 space-y-4 shadow-2xl">
            <nav className="flex flex-col space-y-3 text-base font-medium">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition">{current.home}</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition">{current.services}</a>
              <a href="#pro-services" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition">{current.proServices}</a>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-emerald-400 font-bold flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>{current.clientPortal}</span>
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition">{current.about}</Link>
              <a href="#consultancy" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition">{current.consultancy}</a>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition text-emerald-400 font-bold">{current.contact}</Link>
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-200 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 shadow-sm ${currentTheme.badgeBg}`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{current.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {current.title1} <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.accentGradient}`}>
              {current.titleHighlight}
            </span>
          </h1>
          <p className="text-sm sm:text-lg opacity-80 max-w-3xl mx-auto mb-10 leading-relaxed">
            {current.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className={`px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 ${currentTheme.btnPrimary}`}>
              <span>{current.explore}</span>
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <Link href="/contact" className={`px-8 py-4 rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 ${currentTheme.btnSecondary}`}>
              <Phone className="w-5 h-5" />
              <span>{current.contact}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الخبرة والاحترافية الجديد */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className={`${currentTheme.cardBg} p-8 sm:p-12 rounded-3xl border shadow-xl relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-500 mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">{current.experienceHeading}</h2>
            <p className="text-sm sm:text-base opacity-85 leading-relaxed">{current.experienceText}</p>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">{current.servicesTitle}</h2>
          <p className="opacity-75 text-base sm:text-lg">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => setSelectedService({ title: current.s1Title, desc: current.s1Desc, details: current.s1Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950 transition">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s1Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s1Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s2Title, desc: current.s2Desc, details: current.s2Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950 transition">
              <LangIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s2Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s2Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s3Title, desc: current.s3Desc, details: current.s3Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950 transition">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s3Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s3Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s4Title, desc: current.s4Desc, details: current.s4Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950 transition">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s4Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s4Desc}</p>
          </div>
        </div>
      </section>

      <section id="pro-services" className="py-20 sm:py-24 bg-black/5 dark:bg-neutral-900/40 px-4 sm:px-6 lg:px-8 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">{current.proMainTitle}</h2>
            <p className="opacity-75 text-base sm:text-lg">{current.proMainSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div onClick={() => setSelectedService({ title: current.pro1Title, desc: current.pro1Desc, details: current.pro1Details })} className={`${currentTheme.cardBg} p-8 rounded-3xl border shadow-xl cursor-pointer hover:scale-[1.02] transition`}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span>{current.pro1Title}</span>
              </h3>
              <p className="opacity-75 text-sm leading-relaxed mb-4">{current.pro1Desc}</p>
              <span className="text-xs font-semibold text-emerald-500 hover:underline">{current.explore} &larr;</span>
            </div>

            <div onClick={() => setSelectedService({ title: current.pro2Title, desc: current.pro2Desc, details: current.pro2Details })} className={`${currentTheme.cardBg} p-8 rounded-3xl border shadow-xl cursor-pointer hover:scale-[1.02] transition`}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-500" />
                <span>{current.pro2Title}</span>
              </h3>
              <p className="opacity-75 text-sm leading-relaxed mb-4">{current.pro2Desc}</p>
              <span className="text-xs font-semibold text-emerald-500 hover:underline">{current.explore} &larr;</span>
            </div>

            <div onClick={() => setSelectedService({ title: current.pro3Title, desc: current.pro3Desc, details: current.pro3Details })} className={`${currentTheme.cardBg} p-8 rounded-3xl border shadow-xl cursor-pointer hover:scale-[1.02] transition`}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-500" />
                <span>{current.pro3Title}</span>
              </h3>
              <p className="opacity-75 text-sm leading-relaxed mb-4">{current.pro3Desc}</p>
              <span className="text-xs font-semibold text-emerald-500 hover:underline">{current.explore} &larr;</span>
            </div>

            <div onClick={() => setSelectedService({ title: current.pro4Title, desc: current.pro4Desc, details: current.pro4Details })} className={`${currentTheme.cardBg} p-8 rounded-3xl border shadow-xl cursor-pointer hover:scale-[1.02] transition`}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-emerald-500" />
                <span>{current.pro4Title}</span>
              </h3>
              <p className="opacity-75 text-sm leading-relaxed mb-4">{current.pro4Desc}</p>
              <span className="text-xs font-semibold text-emerald-500 hover:underline">{current.explore} &larr;</span>
            </div>
          </div>
        </div>
      </section>

      <section id="consultancy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className={`${currentTheme.cardBg} p-8 sm:p-10 rounded-3xl border shadow-xl`}>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 text-emerald-600 rounded-2xl mb-4">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{current.consultancyTitle}</h2>
          <p className="opacity-75 mb-6 text-sm sm:text-base">{current.consultancyDesc}</p>
          <Link href="/contact" className={`inline-block px-8 py-3.5 rounded-xl font-semibold shadow-lg transition ${currentTheme.btnPrimary}`}>
            {current.consultationBtn}
          </Link>
        </div>
      </section>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`${currentTheme.cardBg} border p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative`}>
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 left-4 p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:opacity-80 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl sm:text-2xl font-extrabold mb-3">{selectedService.title}</h3>
            <p className="text-sm font-semibold opacity-90 mb-4">{selectedService.desc}</p>
            <ul className="space-y-2 mb-6 border-t border-neutral-200 dark:border-neutral-800 pt-4">
              {selectedService.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm opacity-85">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link 
                href="/contact" 
                onClick={() => setSelectedService(null)}
                className={`flex-1 py-3 rounded-xl text-center shadow-lg transition text-sm ${currentTheme.btnPrimary}`}
              >
                {current.requestService}
              </Link>
              <button 
                onClick={() => setSelectedService(null)}
                className={`px-5 py-3 rounded-xl transition text-sm ${currentTheme.btnSecondary}`}
              >
                {current.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الفوتر: نموذج التواصل + الخريطة + الـ QR Code */}
      <footer className="bg-neutral-900 text-neutral-300 py-16 sm:py-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
            
            {/* نموذج الرسائل */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-extrabold mb-4 text-white">أرسل لنا رسالة</h3>
              {isMessageSent ? (
                <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                  {current.boxSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-white">{current.boxNameLabel}</label>
                    <input 
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Mohamed Ali"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white">{current.boxEmailLabel}</label>
                    <input 
                      type="email" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white">{current.boxMsgLabel}</label>
                    <textarea 
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{current.boxSubmitBtn}</span>
                  </button>
                </form>
              )}
            </div>

            {/* معلومات المقر والـ QR Code */}
            <div className="space-y-6 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-extrabold mb-4 text-white">{current.contactSectionTitle}</h3>
              <p className="opacity-75 text-sm leading-relaxed">{current.contactSectionSubtitle}</p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="opacity-85 text-sm">{current.locationText}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="opacity-85 text-sm font-mono" dir="ltr">{current.phoneText}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="opacity-85 text-sm">{current.emailText}</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="pt-4 border-t border-neutral-800 flex items-center gap-4">
                <div className="bg-white p-2 rounded-2xl shadow-md w-20 h-20 shrink-0 flex items-center justify-center">
                  <Image src="/qr-code.png" alt="QR Code" width={64} height={64} className="object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">{current.qrTitle}</h4>
                  <p className="text-[11px] opacity-75 text-neutral-400">{current.qrDesc}</p>
                </div>
              </div>
            </div>

            {/* الخريطة التفاعلية */}
            <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-3xl shadow-xl h-[380px] overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold mb-3 text-white px-2">موقعنا على الخريطة</h3>
              <div className="flex-1 w-full rounded-2xl overflow-hidden">
                <iframe 
                  src="https://maps.google.com/maps?q=Al%20Mirqab%20Mall,%20Doha,%20Qatar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-800 text-xs sm:text-sm text-center md:text-right">
            <div>
              <p className="text-white font-bold text-sm sm:text-base mb-1">{current.footerTitle}</p>
              <p className="opacity-80"><span dir="ltr">{current.phoneText}</span> :Phone | info@transmissionsqa.com :Email | Qatar</p>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="opacity-70">{current.rights}</p>
              <a 
                href="/admin" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-400 font-medium transition text-xs border border-neutral-700"
                title="لوحة تحكم الإدارة"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{current.adminPortal}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}