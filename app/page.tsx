'use client';

import React, { useState } from 'react';
import { Building2, Languages as LangIcon, Cpu, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, Globe, Users, X, Mail, Phone, MapPin, Send, FileText, Upload, CheckCircle } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'cyber' | 'light'>('faded');
  
  const [orderServiceName, setOrderServiceName] = useState('');
  const [orderClientName, setOrderClientName] = useState('');
  const [orderClientPhone, setOrderClientPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const [selectedService, setSelectedService] = useState<{ title: string; desc: string; details: string[]; actionText?: string } | null>(null);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderServiceName || !orderClientName || !orderClientPhone) return;
    setIsOrderSubmitted(true);
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
      proServices: "خدمات المعقبين",
      about: "من نحن",
      consultancy: "الاستشارات",
      clientPortal: "رفع طلب أونلاين",
      contact: "اتصل بنا",
      consultationBtn: "حجز استشارة - 5$",
      badge: "استثمارك في قطر هو القرار الصائب",
      title1: "بوابتك الآمنة لتأسيس وإدارة الأعمال في قطر",
      titleHighlight: "نجاحك يبدأ من هنا!",
      desc: "نقدم حلولاً مبتكرة وخدمات حكومية وقانونية متكاملة مصممة خصيصاً لمساعدة عملك على النمو في السوق القطري بكفاءة عالية.",
      explore: "استكشف الخدمات",
      contactUs: "تواصل معنا الآن",
      
      companyName: "ترانس ميشنز",
      companySub: "(ذ.م.م)",

      servicesTitle: "الخدمات الأساسية (Our Services)",
      servicesSubtitle: "خدمات متكاملة لتمكين أعمالك وتسهيل كافة الإجراءات الرسمية والتجارية.",
      
      s1Title: "تخليص المعاملات",
      s1Desc: "تخليص كافة المعاملات الحكومية وتأسيس وبدء الأعمال التجارية وإنهاء الأوراق الرسمية بكفاءة عالية.",
      s1Details: [
        "تأسيس الشركات وإنهاء كافة إجراءات وزارة التجارة والصناعة (MOCI).",
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

      proMainTitle: "خدمات المعقبين الحكومية (PRO Services)",
      proMainSubtitle: "إنجاز معاملات الوزارات، الجوازات، البلدية، والجهات الرسمية في دولة قطر باحترافية تامة.",
      
      pro1Title: "تأسيس وتعديل الشركات (MOCI)",
      pro1Desc: "تولي كافة مهام التأسيس، إضافة أو حذف مخولين بالتوقيع، تعديل نسب الشركاء، وتجديد السجلات[cite: 8, 10, 12, 13].",
      pro1Details: [
        "التأسيس الشامل للشركات وإصدار السجلات ورخص البلدية[cite: 8, 10, 12, 13].",
        "تعديل الأنشطة وإضافة أو حذف الشركاء والمخولين بالتوقيع[cite: 8, 10, 12, 13].",
        "تنفيذ عقود البيع والتوكيلات (عربي وإنجليزي)[cite: 8, 10].",
        "تجديد رخص القيد منشأة والسجلات التجارية[cite: 8, 10]."
      ],

      pro2Title: "وزارة العدل (MOJ)",
      pro2Desc: "توثيق العقود، التوكيلات الخاصة والعامة، وعقود البيع وتأسيس الشركات رسمياً[cite: 12, 13].",
      pro2Details: [
        "عمل التوكيلات الخاصة والعامة[cite: 12, 13].",
        "توثيق عقود البيع وعقود التأسيس[cite: 12, 13]."
      ],

      pro3Title: "خدمات الجوازات والعمل (MOL)",
      pro3Desc: "إنجاز كافة أعمال الإدارة العامة للجوازات، إقامات الموظفين، وقيد المنشأة وأذونات العمل[cite: 12, 13].",
      pro3Details: [
        "إصدار وتجديد إقامات الموظفين وقيد المنشأة[cite: 12, 13].",
        "تغيير المستقدم والإعارات وأذونات العمل[cite: 12, 13].",
        "خدمات التأشيرات ومتابعة معاملات وزارة العمل[cite: 12, 13]."
      ],

      pro4Title: "وزارة البلدية (MME) والجهات الأخرى",
      pro4Desc: "تسجيل عقود الإيجار، تصنيف المهندسين، ومكاتب الاستشارات الهندسية[cite: 12, 13].",
      pro4Details: [
        "تسجيل وتوثيق عقود الإيجار[cite: 12, 13].",
        "خدمات تصنيف المهندسين ومكاتب الاستشارات الهندسية[cite: 12, 13].",
        "المواعيد الطبية وقومسيون التأشيرات (QVC)[cite: 8, 10]."
      ],

      aboutTitle: "من نحن",
      aboutDesc: "شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) مسجلة بموجب القوانين القطرية (رقم السجل: 210470) لتكون شريكك الاستراتيجي والأمثل في نجاح وتطوير أعمالك في قطر.",
      consultancyTitle: "الاستشارات أونلاين",
      consultancyDesc: "احصل على استشارات قانونية وتجارية مباشرة أونلاين مع خبرائنا المتخصصين في السوق القطري.",
      
      orderTitle: "بوابة رفع الطلبات أونلاين",
      orderSubtitle: "اختر الخدمة المطلوبة، أدخل بياناتك وسيتولى فريقنا متابعة طلبك فوراً.",
      selectServicePlaceholder: "-- اختر الخدمة المطلوبة --",
      clientNameLabel: "اسم العميل أو الشركة",
      clientPhoneLabel: "رقم الهاتف المحمول في قطر",
      notesLabel: "تفاصيل إضافية أو ملاحظات الطلب",
      submitOrderBtn: "إرسال الطلب الآن",
      orderSuccessMsg: "تم إرسال طلبك بنجاح إلى النظام، سيقوم فريقنا بمراجعته والتواصل معك خلال ساعة!",

      contactSectionTitle: "تواصل معنا",
      contactSectionSubtitle: "نحن هنا دائماً للإجابة على استفساراتكم ومساعدة أعمالكم على النمو في قطر.",
      boxNameLabel: "الاسم الكامل",
      boxEmailLabel: "البريد الإلكتروني",
      boxMsgLabel: "نص الرسالة أو الاستفسار",
      boxSubmitBtn: "إرسال الرسالة",
      boxSuccessMsg: "تم ارسال رسالتك بنجاح، سيتم التواصل معك في أقرب وقت!",
      locationText: "قطر - الدوحة",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",

      footerTitle: "شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م)",
      footerInfo: "قطر | البريد الإلكتروني: info@transmissions.qa | الهاتف: +974 50080984",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      closeBtn: "إغلاق",
      requestService: "اطلب هذه الخدمة الآن"
    },
    en: {
      home: "Home",
      services: "Services",
      proServices: "PRO Services",
      about: "About Us",
      consultancy: "Consultancy",
      clientPortal: "Online Order",
      contact: "Contact Us",
      consultationBtn: "Book Consultation - $5",
      badge: "Your Investment in Qatar is a Just Decision",
      title1: "Gateway to Qatar's Business Horizon",
      titleHighlight: "Your Success Starts Here!",
      desc: "We provide innovative solutions and comprehensive government and legal services designed to empower your business in Qatar.",
      explore: "Explore Services",
      contactUs: "Contact Us Now",
      
      companyName: "Trans Missions",
      companySub: "Trading & Services W.L.L",

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
      pro1Desc: "Handling all startup procedures, signatories, activity additions, and license renewals[cite: 8, 10, 12, 13].",
      pro1Details: [
        "Complete company setup and licensing[cite: 8, 10, 12, 13].",
        "Shareholders and signatories amendments[cite: 8, 10, 12, 13].",
        "Sales agreements and POA (Arabic & English)[cite: 8, 10]."
      ],

      pro2Title: "Ministry of Justice (MOJ)",
      pro2Desc: "Document attestation, special/general POAs, and company establishment contracts[cite: 12, 13].",
      pro2Details: [
        "General and special POAs[cite: 12, 13].",
        "Sale and establishment contracts[cite: 12, 13]."
      ],

      pro3Title: "Immigration & Labour",
      pro3Desc: "Handling general Directorate of Passports, RP processing, computer cards, and work permits[cite: 12, 13].",
      pro3Details: [
        "RP processing and computer cards[cite: 12, 13].",
        "Employer changes and secondments[cite: 12, 13]."
      ],

      pro4Title: "Municipality (MME)",
      pro4Desc: "Lease agreements registration, engineers classification, and consultancy offices[cite: 12, 13].",
      pro4Details: [
        "Lease agreements registration[cite: 12, 13].",
        "Engineers and consultancy classification[cite: 12, 13].",
        "QVC appointments and medical commission[cite: 8, 10]."
      ],

      aboutTitle: "About Us",
      aboutDesc: "Trans Missions Trading and Services W.L.L (C.R. No: 210470) is established under Qatari law to be your ultimate strategic partner in business success and growth.",
      consultancyTitle: "Online Consultancy",
      consultancyDesc: "Get direct online legal and business consultations with our experts specialized in the Qatari market.",
      
      orderTitle: "Online Order Portal",
      orderSubtitle: "Select your required service, fill in your details, and our team will follow up instantly.",
      selectServicePlaceholder: "-- Select Required Service --",
      clientNameLabel: "Client / Company Name",
      clientPhoneLabel: "Phone Number in Qatar",
      notesLabel: "Additional Notes or Details",
      submitOrderBtn: "Submit Order Now",
      orderSuccessMsg: "Your order has been successfully submitted! Our team will contact you within an hour.",

      contactSectionTitle: "Contact Us",
      contactSectionSubtitle: "We are always here to answer your inquiries and help your business grow in Qatar.",
      boxNameLabel: "Full Name",
      boxEmailLabel: "Email Address",
      boxMsgLabel: "Your Message or Inquiry",
      boxSubmitBtn: "Send Message",
      boxSuccessMsg: "Your message has been sent successfully. We will contact you soon!",
      locationText: "Qatar - Doha",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      footerInfo: "Qatar | Email: info@transmissions.qa | Phone: +974 50080984",
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
      {/* هيدر منظم وأنيق */}
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logo.png" alt="Trans Missions Logo" className="h-10 sm:h-12 w-auto object-contain brightness-110" />
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider leading-tight">{current.companyName}</span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
            <a href="#home" className="hover:opacity-85 transition">{current.home}</a>
            <a href="#services" className="hover:opacity-85 transition">{current.services}</a>
            <a href="#pro-services" className="hover:opacity-85 transition">{current.proServices}</a>
            <a href="#order-portal" className="text-emerald-500 font-bold hover:opacity-85 transition flex items-center gap-1.5">
              <Upload className="w-4 h-4" />
              <span>{current.clientPortal}</span>
            </a>
            <a href="#about" className="hover:opacity-85 transition">{current.about}</a>
            <a href="#consultancy" className="hover:opacity-85 transition">{current.consultancy}</a>
            <a href="#contact" className="hover:opacity-85 transition">{current.contact}</a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center bg-black/10 dark:bg-black/40 border border-neutral-800/20 dark:border-neutral-800 rounded-xl p-1 gap-1">
              <button onClick={() => setTheme('faded')} className={`px-2 py-1 text-xs rounded-lg font-medium transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>1</button>
              <button onClick={() => setTheme('cyber')} className={`px-2 py-1 text-xs rounded-lg font-medium transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>2</button>
              <button onClick={() => setTheme('light')} className={`px-2 py-1 text-xs rounded-lg font-medium transition ${theme === 'light' ? 'bg-emerald-600 text-white font-bold' : 'opacity-70 hover:opacity-100'}`}>3</button>
            </div>

            <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-black/5 dark:bg-neutral-900/80 hover:opacity-80 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-800/20 dark:border-neutral-800">
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* قسم الرئيسية */}
      <section id="home" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-200 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm ${currentTheme.badgeBg}`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
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
            <a href="#order-portal" className={`px-8 py-4 rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 ${currentTheme.btnSecondary}`}>
              <Upload className="w-5 h-5" />
              <span>{current.clientPortal}</span>
            </a>
          </div>
        </div>
      </section>

      {/* الخدمات الأساسية */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{current.servicesTitle}</h2>
          <p className="opacity-75 text-lg">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => setSelectedService({ title: current.s1Title, desc: current.s1Desc, details: current.s1Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : theme === 'light' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s1Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s1Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s2Title, desc: current.s2Desc, details: current.s2Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : theme === 'light' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <LangIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s2Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s2Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s3Title, desc: current.s3Desc, details: current.s3Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : theme === 'light' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s3Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s3Desc}</p>
          </div>

          <div onClick={() => setSelectedService({ title: current.s4Title, desc: current.s4Desc, details: current.s4Details })} className={`${currentTheme.cardBg} backdrop-blur-sm p-6 rounded-3xl border transition duration-300 group cursor-pointer hover:scale-105 shadow-md`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition ${theme === 'cyber' ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : theme === 'light' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-100 group-hover:text-neutral-950'}`}>
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{current.s4Title}</h3>
            <p className="opacity-75 text-sm leading-relaxed">{current.s4Desc}</p>
          </div>
        </div>
      </section>

      {/* خدمات المعقبين الحكومية */}
      <section id="pro-services" className="py-24 bg-black/5 dark:bg-neutral-900/40 px-4 sm:px-6 lg:px-8 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{current.proMainTitle}</h2>
            <p className="opacity-75 text-lg">{current.proMainSubtitle}</p>
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

      {/* بوابة رفع الطلبات أونلاين */}
      <section id="order-portal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className={`${currentTheme.cardBg} p-8 sm:p-12 rounded-3xl border shadow-2xl`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 text-emerald-600 rounded-2xl mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">{current.orderTitle}</h2>
            <p className="opacity-75 text-sm">{current.orderSubtitle}</p>
          </div>

          {isOrderSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              {current.orderSuccessMsg}
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.selectServicePlaceholder}</label>
                <select 
                  required
                  value={orderServiceName}
                  onChange={(e) => setOrderServiceName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm"
                >
                  <option value="">{current.selectServicePlaceholder}</option>
                  <option value="تأسيس الشركات (MOCI)">تأسيس الشركات وتعديلها (MOCI)</option>
                  <option value="معاملات وزارة العدل (MOJ)">معاملات وزارة العدل (MOJ)</option>
                  <option value="خدمات الجوازات والعمل">خدمات الجوازات والعمل (MOL)</option>
                  <option value="خدمات البلدية والمهندسين">خدمات البلدية والمهندسين (MME)</option>
                  <option value="ترجمة معتمدة">الترجمة المعتمدة</option>
                  <option value="حلول تكنولوجيا المعلومات">حلول تكنولوجيا المعلومات والشبكات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.clientNameLabel}</label>
                <input 
                  type="text" 
                  required
                  value={orderClientName}
                  onChange={(e) => setOrderClientName(e.target.value)}
                  placeholder="Company or Person Name"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.clientPhoneLabel}</label>
                <input 
                  type="tel" 
                  required
                  value={orderClientPhone}
                  onChange={(e) => setOrderClientPhone(e.target.value)}
                  placeholder="+974 XXXXXXXX"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-90">{current.notesLabel}</label>
                <textarea 
                  rows={3}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Write your request details here..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                className={`w-full py-4 rounded-xl shadow-lg transition text-center ${currentTheme.btnPrimary}`}
              >
                {current.submitOrderBtn}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* من نحن */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className={`${currentTheme.cardBg} p-10 sm:p-14 rounded-3xl border shadow-xl`}>
          <h2 className="text-3xl font-extrabold mb-4">{current.aboutTitle}</h2>
          <p className="opacity-80 text-lg leading-relaxed max-w-3xl mx-auto">{current.aboutDesc}</p>
        </div>
      </section>

      {/* الاستشارات أونلاين */}
      <section id="consultancy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className={`${currentTheme.cardBg} p-10 rounded-3xl border shadow-xl`}>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 text-emerald-600 rounded-2xl mb-4">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{current.consultancyTitle}</h2>
          <p className="opacity-75 mb-6">{current.consultancyDesc}</p>
          <a href="#contact" className={`inline-block px-8 py-3.5 rounded-xl font-semibold shadow-lg transition ${currentTheme.btnPrimary}`}>
            {current.consultationBtn}
          </a>
        </div>
      </section>

      {/* مودال تفاصيل الخدمة */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`${currentTheme.cardBg} border p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative`}>
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 left-4 p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:opacity-80 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-extrabold mb-3">{selectedService.title}</h3>
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
              <a 
                href="#order-portal" 
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

      {/* الفوتر وتواصل معنا */}
      <footer id="contact" className="bg-neutral-900 text-neutral-300 py-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            
            <div>
              <h2 className="text-3xl font-extrabold mb-4 text-white">{current.contactSectionTitle}</h2>
              <p className="opacity-75 mb-8 leading-relaxed max-w-md">{current.contactSectionSubtitle}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="opacity-80">{current.locationText}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="opacity-80 font-mono" dir="ltr">{current.phoneText}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="opacity-80">{current.emailText}</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-3xl shadow-xl">
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
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none transition text-sm resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    <Send className="w-4 h-4" />
                    <span>{current.boxSubmitBtn}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-800 text-sm">
            <div>
              <p className="text-white font-bold text-base mb-1">{current.footerTitle}</p>
              <p><span dir="ltr">{current.phoneText}</span> :Phone | info@transmissions.qa :Email | Qatar</p>
            </div>
            <p>{current.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}