'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Languages as LangIcon, Cpu, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, Globe, Users, X, Mail, Phone, MapPin, Send, FileText, Upload, Menu, Lock, ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import AiChatWidget from './components/AiChatWidget';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedService, setSelectedService] = useState<{ title: string; desc: string; details: string[]; actionText?: string } | null>(null);

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactPhone || !contactMessage) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contact_messages"), {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        message: contactMessage,
        createdAt: new Date().toISOString(),
      });

      await emailjs.send(
        "service_qtbr79k",
        "template_whk6cxn",
        {
          from_name: contactName,
          from_email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
        },
        "mvQrmbMTkV4nm9Lzz"
      );

      setIsMessageSent(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch (error) {
      console.error("Error:", error);
      alert(lang === 'ar' ? "حدث خطأ، يرجى المحاولة مرة أخرى." : "An error occurred, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentLogo = '/logo1.png';

  const t = {
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
      
      consultationBtn: "حجز استشارة - مجاناً",
      badge: "استثمارك في قطر هو القرار الصائب",
      title1: "بوابتك الآمنة لتأسيس وإدارة الأعمال في قطر",
      titleHighlight: "نجاحك يبدأ من هنا!",
      desc: "نقدم حلولاً مبتكرة وخدمات حكومية وقانونية متكاملة مصممة خصيصاً لمساعدة عملك على النمو في السوق القطري بكفاءة عالية.",
      explore: "استكشف التفاصيل",
      contact: "اتصل بينا",
      
      experienceHeading: "خبرة واسعة موثوق بها",
      experienceText: "مع خبرة واسعة في إدارة كافة الإجراءات الحكومية، يحرص فريقنا القانوني المتخصص على ضمان عملية سلسة، آمنة ومطابقة للقوانين. لقد ساعدنا بنجاح عملاء من حول العالم في تأسيس العديد من الشركات الوطنية في دولة قطر.",

      qatarMarketHeading: "سوق العمل القطري: فرص واعدة",
      qatarMarketText: "تُعد دولة قطر واحدة من أكثر الاقتصاديات حيوية ونمواً في المنطقة. نحن نرافقك خطوة بخطوة من استخراج السجل التجاري وترخيص البلدية وحتى فتح الحسابات البنكية لتبدأ رحلتك الاستثمارية بثقة تامة.",

      countryLabel: "قطر",
      companyName: "ترانس ميشنز للتجارة والخدمات",
      companySub: "ذ.م.م",

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
      
      s4Title: "خدمات التجارة",
      s4Desc: "خدمات تجارية متكاملة وتوريد بعض السلع المختارة بعناية في السوق القطري.",
      s4Details: [
        "أزياء تفاعلية تناسب فعاليات الأطفال وتنمية مهاراتهم.",
        "إكسسوارات الكمبيوتر.",
        "توريد وتسهيل عقود السلع المختارة بدقة عالية."
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
      consultancyDesc: "احصل على استشارات مباشرة أونلاين مع خبرائنا المتخصصين في السوق القطري (مجاناً).",
      
      contactSectionTitle: "تواصل معنا",
      contactSectionSubtitle: "نحن هنا دائماً للإجابة على استفساراتكم ومساعدة أعمالكم على النمو في قطر.",
      locationText: "مول المرقاب، الدوحة، قطر (Al Mirqab Mall, Doha, Qatar)",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",
      qrTitle: "امسح الكود للاتصال السريع",
      qrDesc: "وجه كاميرا هاتفك نحو الكود للتواصل المباشر معنا.",

      mapTitle: "موقعنا على الخريطة",
      sendMessageTitle: "أرسل لنا رسالة",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف",
      messageLabel: "الرسالة",
      sendBtn: "إرسال الرسالة",
      successMsg: "تم ارسال رسالتك بنجاح!",

      footerTitle: "ترانس ميشنز للتجارة والخدمات ذ.م.م",
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
      communicate: "Communicate",
      contactUsMenu: "Contact us",
      startUpFormMenu: "Start Up Form",
      clientPortalMenu: "Client Portal",

      consultationBtn: "Book Consultation - Free",
      badge: "Your Investment in Qatar is a Just Decision",
      title1: "Your Gateway to Qatar's Business Horizon",
      titleHighlight: "Your Success Starts Here!",
      desc: "We provide innovative solutions and comprehensive government and legal services designed to empower your business in Qatar.",
      explore: "Explore Details",
      contact: "Contact Us",
      
      experienceHeading: "Extensive Experience & Trusted Expertise",
      experienceText: "With extensive experience in handling all government procedures, our knowledgeable legal team ensures a smooth, secure, and compliant process. We have successfully assisted clients from around the world in establishing numerous national companies in Qatar.",

      qatarMarketHeading: "Qatar Business Market: Promising Opportunities",
      qatarMarketText: "Qatar is one of the most dynamic and growing economies in the region. We accompany you step-by-step from obtaining the commercial register and municipal license to opening bank accounts to start your investment journey with full confidence.",

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
      s4Desc: "Integrated commercial services and supplying carefully selected goods in the Qatari market.",
      s4Details: [
        "Interactive fashion tailored for children's events and skill development.",
        "Computer accessories.",
        "Supply and facilitation of selected goods contracts."
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
      consultancyDesc: "Get direct online business consultations with our experts specialized in the Qatari market (Free).",
      
      contactSectionTitle: "Contact Us",
      contactSectionSubtitle: "We are always here to answer your inquiries and help your business grow in Qatar.",
      locationText: "Al Mirqab Mall, Doha, Qatar",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",
      qrTitle: "Scan QR for Quick Contact",
      qrDesc: "Point your phone camera to connect directly.",

      mapTitle: "Our Location on Map",
      sendMessageTitle: "Send Us a Message",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      messageLabel: "Message",
      sendBtn: "Send Message",
      successMsg: "Your message has been sent successfully!",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Portal",
      closeBtn: "Close",
      requestService: "Submit Order Now"
    }
  };

  const current = t[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* الهيدر */}
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
              <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight">{current.companyName}</span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <a href="#home" onClick={() => setActiveSection('home')} className={`transition ${activeSection === 'home' ? 'text-emerald-400 font-bold' : 'hover:opacity-85'}`}>{current.home}</a>
              <a href="#services" onClick={() => setActiveSection('services')} className={`transition ${activeSection === 'services' ? 'text-emerald-400 font-bold' : 'hover:opacity-85'}`}>{current.services}</a>
              <a href="#pro-services" onClick={() => setActiveSection('pro-services')} className={`transition ${activeSection === 'pro-services' ? 'text-emerald-400 font-bold' : 'hover:opacity-85'}`}>{current.proServices}</a>
              <Link href="/about" className="hover:opacity-85 transition">{current.about}</Link>
              <a href="#consultancy" onClick={() => setActiveSection('consultancy')} className={`transition ${activeSection === 'consultancy' ? 'text-emerald-400 font-bold' : 'hover:opacity-85'}`}>{current.consultancy}</a>

              <div className="relative">
                <button 
                  onClick={() => setCommunicateDropdownOpen(!communicateDropdownOpen)}
                  className="flex items-center gap-1.5 text-emerald-400 font-bold hover:opacity-85 transition py-1 focus:outline-none"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{current.communicate}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${communicateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {communicateDropdownOpen && (
                  <div className={`absolute top-full mt-2 w-64 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-2xl py-2 z-50 ${lang === 'ar' ? 'right-0 text-right' : 'left-0 text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Link href="/contact" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 hover:text-emerald-400 transition font-medium">{current.contactUsMenu}</Link>
                    <Link href="/start-up-form" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 transition font-bold border-t border-neutral-700 mt-1 pt-2">{current.startUpFormMenu}</Link>
                    <Link href="/client-login" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-emerald-400 hover:bg-emerald-950/40 transition font-bold border-t border-neutral-700 mt-1 pt-2">{current.clientPortalMenu}</Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 shrink-0 border-s border-neutral-700 ps-4">
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
          <div className="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-5 space-y-3 shadow-2xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.home}</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.services}</a>
            <a href="#pro-services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.proServices}</a>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.about}</Link>
            <a href="#consultancy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.consultancy}</a>
            
            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <p className="text-xs font-bold text-emerald-400">{current.communicate}</p>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg">{current.contactUsMenu}</Link>
              <Link href="/start-up-form" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm font-bold text-emerald-400 hover:bg-neutral-800 rounded-lg">{current.startUpFormMenu}</Link>
              <Link href="/client-login" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 rounded-lg">{current.clientPortalMenu}</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-700">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 border px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 shadow-sm bg-neutral-700/60 text-neutral-200 border-neutral-600">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{current.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {current.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400">
              {current.titleHighlight}
            </span>
          </h1>
          <p className="text-sm sm:text-lg opacity-85 max-w-3xl mx-auto mb-10 leading-relaxed">
            {current.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-950 font-bold">
              <span>{current.explore}</span>
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <Link href="/start-up-form" className="px-8 py-4 rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-neutral-100">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>{current.startUpFormMenu}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الكروت الثنائية: خبرة موثوق بها + سوق العمل القطري */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* كرت خبرة واسعة موثوق بها */}
          <div className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4 text-white">{current.experienceHeading}</h3>
              <p className="text-sm sm:text-base opacity-85 leading-relaxed">{current.experienceText}</p>
            </div>
          </div>

          {/* كرت سوق العمل القطري: فرص واعدة */}
          <Link 
            href="/qatar-market"
            className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition block"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4 text-white flex items-center justify-between">
                  <span>{current.qatarMarketHeading}</span>
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">اقرأ الدليل الكامل &larr;</span>
                </h3>
                <p className="text-sm sm:text-base opacity-85 leading-relaxed">{current.qatarMarketText}</p>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* الخدمات الأساسية */}
      <section id="services" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">{current.servicesTitle}</h2>
          <p className="opacity-80 text-base sm:text-lg">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => setSelectedService({ title: current.s1Title, desc: current.s1Desc, details: current.s1Details })} className="bg-neutral-800/40 backdrop-blur-sm p-6 rounded-3xl border border-neutral-700 transition duration-300 group cursor-pointer hover:scale-105 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-emerald-600/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{current.s1Title}</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.s1Desc}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>{current.explore}</span> &rarr;
            </span>
          </div>

          <div onClick={() => setSelectedService({ title: current.s2Title, desc: current.s2Desc, details: current.s2Details })} className="bg-neutral-800/40 backdrop-blur-sm p-6 rounded-3xl border border-neutral-700 transition duration-300 group cursor-pointer hover:scale-105 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-emerald-600/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                <LangIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{current.s2Title}</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.s2Desc}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>{current.explore}</span> &rarr;
            </span>
          </div>

          <div onClick={() => setSelectedService({ title: current.s3Title, desc: current.s3Desc, details: current.s3Details })} className="bg-neutral-800/40 backdrop-blur-sm p-6 rounded-3xl border border-neutral-700 transition duration-300 group cursor-pointer hover:scale-105 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-emerald-600/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{current.s3Title}</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.s3Desc}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>{current.explore}</span> &rarr;
            </span>
          </div>

          <div onClick={() => setSelectedService({ title: current.s4Title, desc: current.s4Desc, details: current.s4Details })} className="bg-neutral-800/40 backdrop-blur-sm p-6 rounded-3xl border border-neutral-700 transition duration-300 group cursor-pointer hover:scale-105 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-emerald-600/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{current.s4Title}</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.s4Desc}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>{current.explore}</span> &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* خدمات العلاقات العامة PRO */}
      <section id="pro-services" className="py-20 sm:py-24 bg-neutral-800/20 px-4 sm:px-6 lg:px-8 border-y border-neutral-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">{current.proMainTitle}</h2>
            <p className="opacity-80 text-base sm:text-lg">{current.proMainSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div onClick={() => setSelectedService({ title: current.pro1Title, desc: current.pro1Desc, details: current.pro1Details })} className="bg-neutral-800/40 p-8 rounded-3xl border border-neutral-700 shadow-xl cursor-pointer hover:scale-[1.02] transition">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span>{current.pro1Title}</span>
              </h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.pro1Desc}</p>
              <span className="text-xs font-semibold text-emerald-400 hover:underline">{current.explore} &larr;</span>
            </div>

            <div onClick={() => setSelectedService({ title: current.pro2Title, desc: current.pro2Desc, details: current.pro2Details })} className="bg-neutral-800/40 p-8 rounded-3xl border border-neutral-700 shadow-xl cursor-pointer hover:scale-[1.02] transition">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-400" />
                <span>{current.pro2Title}</span>
              </h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.pro2Desc}</p>
              <span className="text-xs font-semibold text-emerald-400 hover:underline">{current.explore} &larr;</span>
            </div>

            <div onClick={() => setSelectedService({ title: current.pro3Title, desc: current.pro3Desc, details: current.pro3Details })} className="bg-neutral-800/40 p-8 rounded-3xl border border-neutral-700 shadow-xl cursor-pointer hover:scale-[1.02] transition">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-400" />
                <span>{current.pro3Title}</span>
              </h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.pro3Desc}</p>
              <span className="text-xs font-semibold text-emerald-400 hover:underline">{current.explore} &larr;</span>
            </div>

            <div onClick={() => setSelectedService({ title: current.pro4Title, desc: current.pro4Desc, details: current.pro4Details })} className="bg-neutral-800/40 p-8 rounded-3xl border border-neutral-700 shadow-xl cursor-pointer hover:scale-[1.02] transition">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-emerald-400" />
                <span>{current.pro4Title}</span>
              </h3>
              <p className="opacity-80 text-sm leading-relaxed mb-4">{current.pro4Desc}</p>
              <span className="text-xs font-semibold text-emerald-400 hover:underline">{current.explore} &larr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* الاستشارات */}
      <section id="consultancy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 text-emerald-400 rounded-2xl mb-4">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{current.consultancyTitle}</h2>
          <p className="opacity-80 mb-6 text-sm sm:text-base">{current.consultancyDesc}</p>
          <Link href="/start-up-form" className="inline-block px-8 py-3.5 rounded-xl font-semibold shadow-lg transition bg-neutral-100 hover:bg-white text-neutral-950">
            {current.consultationBtn}
          </Link>
        </div>
      </section>

      {/* Modal تفاصيل الخدمة */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-800 border border-neutral-700 p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative text-neutral-100">
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 left-4 p-2 rounded-full bg-neutral-700 hover:opacity-80 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl sm:text-2xl font-extrabold mb-3">{selectedService.title}</h3>
            <p className="text-sm font-semibold opacity-90 mb-4">{selectedService.desc}</p>
            <ul className="space-y-2 mb-6 border-t border-neutral-700 pt-4">
              {selectedService.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm opacity-85">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link 
                href="/start-up-form" 
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 rounded-xl text-center shadow-lg transition text-sm bg-neutral-100 hover:bg-white text-neutral-950 font-bold"
              >
                {current.requestService}
              </Link>
              <button 
                onClick={() => setSelectedService(null)}
                className="px-5 py-3 rounded-xl transition text-sm bg-neutral-700 border border-neutral-600 text-neutral-200"
              >
                {current.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الفوتر المتناسق */}
      <footer className="bg-neutral-800 text-neutral-300 py-16 sm:py-20 border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            
            <div className="bg-neutral-900/60 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <h3 className="text-xl font-extrabold mb-4 text-white">{current.mapTitle}</h3>
              <div className="flex-1 w-full rounded-2xl overflow-hidden min-h-[260px]">
                <iframe 
                  src="https://maps.google.com/maps?q=Al%20Mirqab%20Mall,%20Doha,%20Qatar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                ></iframe>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold mb-4 text-white">{current.contactSectionTitle}</h3>
                <p className="opacity-80 text-sm leading-relaxed mb-6">{current.contactSectionSubtitle}</p>
                
                <div className="space-y-4">
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
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center gap-4 mt-6">
                <div className="bg-white p-2 rounded-2xl shadow-md w-20 h-20 shrink-0 flex items-center justify-center">
                  <Image src="/qr-code.png" alt="QR Code" width={64} height={64} className="object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">{current.qrTitle}</h4>
                  <p className="text-[11px] opacity-75 text-neutral-400">{current.qrDesc}</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold mb-4 text-white">{current.sendMessageTitle}</h3>
                {isMessageSent ? (
                  <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                    {current.successMsg}
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">{current.nameLabel}</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Mohamed Ali"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">{current.emailLabel}</label>
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">{current.phoneLabel}</label>
                      <input 
                        type="text" 
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+974 ..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none text-sm font-mono"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">{current.messageLabel}</label>
                      <textarea 
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Write message..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none text-sm resize-none"
                      />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition">
                      {isSubmitting ? (lang === 'ar' ? "جاري الإرسال..." : "Sending...") : current.sendBtn}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-700 text-xs sm:text-sm text-center md:text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div>
              <p className="text-white font-bold text-sm sm:text-base mb-1">{current.footerTitle}</p>
              <p className="opacity-80">
                {lang === 'ar' ? (
                  <span>الهاتف: <span dir="ltr" className="inline-block">+974 50080984</span> | البريد: info@transmissions.qa | قطر</span>
                ) : (
                  <span>Phone: <span dir="ltr" className="inline-block">+974 50080984</span> | Email: info@transmissions.qa | Qatar</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="opacity-70">{current.rights}</p>
              <a href="/admin" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-emerald-400 font-medium transition text-xs border border-neutral-600">
                <Lock className="w-3.5 h-3.5" />
                <span>{current.adminPortal}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* المساعد الذكي */}
      <AiChatWidget />
    </div>
  );
}