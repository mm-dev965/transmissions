'use client';

import NewsTicker from './components/NewsTicker';
import React, { useState, useEffect } from 'react';
import { Building2, Languages as LangIcon, Cpu, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, Globe, Users, X, Mail, Phone, MapPin, Send, FileText, Upload, Menu, Lock, ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import AiChatWidget from './components/AiChatWidget';
import Footer from './components/Footer';

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
      portalMenu: "بورتال",
      communicate: "تواصل معنا",
      contactUsMenu: "اتصل بنا",
      startUpFormMenu: "نموذج التأسيس (Start Up Form)",
      followUs: "تابعنا:",
      workingHours: "نعمل على مدار الساعة لخدمتكم في قطر",
      
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
      portalMenu: "Portal",
      communicate: "Communicate",
      contactUsMenu: "Contact us",
      startUpFormMenu: "Start Up Form",
      followUs: "Follow Us:",
      workingHours: "Working around the clock for your business in Qatar",

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
      {/* الهيدر الأساسي */}
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
              <Link href="/pro-services" className="hover:opacity-85 transition">{current.proServices}</Link>
              <Link href="/about" className="hover:opacity-85 transition">{current.about}</Link>
              <Link href="/consultancy" className="hover:opacity-85 transition">{current.consultancy}</Link>
              <Link href="/client-login" className="text-emerald-400 font-bold hover:opacity-85 transition">{current.portalMenu}</Link>

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
            <Link href="/pro-services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.proServices}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.about}</Link>
            <Link href="/consultancy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.consultancy}</Link>
            <Link href="/client-login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-emerald-400 hover:text-emerald-300">{current.portalMenu}</Link>
            
            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <p className="text-xs font-bold text-emerald-400">{current.communicate}</p>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg">{current.contactUsMenu}</Link>
              <Link href="/start-up-form" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm font-bold text-emerald-400 hover:bg-neutral-800 rounded-lg">{current.startUpFormMenu}</Link>
            </div>
          </div>
        )}
      </header>

      {/* شريط السوشيال ميديا وواتساب تحت الهيدر مباشرة */}
      <div className="bg-neutral-900/90 border-b border-neutral-800 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-neutral-300">
          <div className="flex items-center gap-3.5">
            <span className="font-bold text-emerald-400 text-sm">{current.followUs}</span>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/97450080984" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition" title="WhatsApp">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573540018745" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/transmissions1?cplk=MXVjaGdEaW12aGVDVjFjdyUzRCUzRA%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com/company/trans-missions-trading-and-services/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@transmissions2?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="TikTok">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href="https://www.snapchat.com/@trans-missions?sender_web_id=5f03d2cc-bae4-408a-bf07-ac120d46b691&device_type=desktop&is_copy_url=true" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="Snapchat">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-3.174 0-5.464 2.124-5.464 5.253 0 1.953.944 3.193 1.927 4.102.585.541.879.882.879 1.487 0 .394-.176.841-.527 1.341-.334.477-.798 1.141-1.229 1.839-.427.691-.825 1.336-1.148 1.905-.333.593-.565 1.109-.687 1.527-.123.421-.131.78-.024 1.071.148.403.541.657 1.14.739 1.127.155 2.503-.049 3.864-.226 1.092-.143 2.179-.286 3.32-.286 1.14 0 2.228.143 3.32.286 1.361.177 2.737.381 3.864.226.599-.082.992-.336 1.14-.739.107-.291.099-.65-.024-1.071-.122-.418-.354-.934-.687-1.527-.323-.569-.721-1.214-1.148-1.905-.431-.698-.895-1.362-1.229-1.839-.351-.5-.527-.947-.527-1.341 0-.605.294-.946.879-1.487.983-.909 1.927-2.149 1.927-4.102 0-3.129-2.29-5.253-5.464-5.253z"/></svg>
              </a>
              <a href="https://www.youtube.com/@transmission-d9i" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div className="hidden sm:block text-xs text-neutral-400 font-medium">
            {current.workingHours}
          </div>
        </div>
      </div>
      <NewsTicker lang={lang} />
        
      {/* Hero Section */}
      <section id="home" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-700">
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-full text-xs font-medium mb-4 shadow-sm bg-neutral-700/60 text-neutral-200 border-neutral-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{current.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 leading-tight">
            {current.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400">
              {current.titleHighlight}
            </span>
          </h1>

          <p className="text-xs sm:text-sm opacity-85 max-w-2xl mx-auto mb-6 leading-relaxed">
            {current.desc}
          </p>

          <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-emerald-600/60 mb-6 bg-neutral-900 aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/kBjZFhVGhIc?autoplay=1&mute=1&controls=1&loop=1&playlist=kBjZFhVGhIc&rel=0&modestbranding=1"
              title="Trans Missions Trading And Services | Corporate Identity & Professional Solutions"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
            <a href="#services" className="px-5 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs sm:text-sm">
              <span>{current.explore}</span>
              <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <Link href="/start-up-form" className="px-5 py-2.5 rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-neutral-100 text-xs sm:text-sm font-bold">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>{current.startUpFormMenu}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* قسم الخبرة وسوق العمل */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4 text-white">{current.experienceHeading}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{current.experienceText}</p>
            </div>
          </div>
          <div className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4 text-white">{current.qatarMarketHeading}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{current.qatarMarketText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الخدمات الأساسية */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{current.servicesTitle}</h2>
          <p className="text-xs sm:text-sm text-neutral-400">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: current.s1Title, desc: current.s1Desc, details: current.s1Details, icon: Building2 },
            { title: current.s2Title, desc: current.s2Desc, details: current.s2Details, icon: LangIcon },
            { title: current.s3Title, desc: current.s3Desc, details: current.s3Details, icon: Cpu },
            { title: current.s4Title, desc: current.s4Desc, details: current.s4Details, icon: ShoppingCart },
          ].map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex flex-col justify-between hover:border-emerald-500/50 transition group">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{service.desc}</p>
                </div>
                <button 
                  onClick={() => setSelectedService({ title: service.title, desc: service.desc, details: service.details })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>{current.explore}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* قسم خدمات العلاقات العامة (PRO Services) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{current.proMainTitle}</h2>
          <p className="text-xs sm:text-sm text-neutral-400">{current.proMainSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: current.pro1Title, desc: current.pro1Desc, details: current.pro1Details, icon: ShieldCheck },
            { title: current.pro2Title, desc: current.pro2Desc, details: current.pro2Details, icon: FileText },
            { title: current.pro3Title, desc: current.pro3Desc, details: current.pro3Details, icon: Users },
            { title: current.pro4Title, desc: current.pro4Desc, details: current.pro4Details, icon: Building2 },
          ].map((pro, idx) => {
            const Icon = pro.icon;
            return (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500/50 transition group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pro.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">{pro.desc}</p>
                </div>
                <button 
                  onClick={() => setSelectedService({ title: pro.title, desc: pro.desc, details: pro.details })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>{current.explore}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* قسم الاستشارات أونلاين */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{current.consultancyTitle}</h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6">{current.consultancyDesc}</p>
            <Link href="/consultancy" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg inline-flex items-center gap-2">
              <span>{current.consultationBtn}</span>
              <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الخريطة ونموذج التواصل */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* الخريطة */}
          <div className="bg-neutral-900 p-4 rounded-3xl border border-neutral-800 shadow-2xl h-[420px] overflow-hidden flex flex-col">
            <h3 className="text-lg font-bold text-white mb-3">{current.mapTitle}</h3>
            <div className="w-full flex-1 rounded-2xl overflow-hidden border border-neutral-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.339178358249!2d51.4925!3d25.2854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534f379659f%3A0x7d1f5d601b02d84!2sAl%20Mirqab%20Mall!5e0!3m2!1sen!2sqa!4v1650000000000!5m2!1sen!2sqa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Map Location"
              ></iframe>
            </div>
          </div>

          {/* نموذج التواصل */}
          <div className="bg-neutral-900 p-8 sm:p-10 rounded-3xl border border-neutral-800 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{current.sendMessageTitle}</h2>
              <p className="text-xs text-neutral-400">{current.contactSectionSubtitle}</p>
            </div>

            {isMessageSent ? (
              <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-4 rounded-2xl text-center text-sm font-bold">
                {current.successMsg}
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-neutral-300">{current.nameLabel}</label>
                    <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-neutral-300">{current.emailLabel}</label>
                    <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-neutral-300">{current.phoneLabel}</label>
                  <input type="text" required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-neutral-300">{current.messageLabel}</label>
                  <textarea required rows={3} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-lg">
                  {isSubmitting ? '...' : current.sendBtn}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Modal تفاصيل الخدمة */}
      {selectedService && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-white transition rounded-xl bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold text-white mb-2">{selectedService.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">{selectedService.desc}</p>
            
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              {lang === 'ar' ? 'التفاصيل والمميزات:' : 'Details & Features:'}
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedService.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Link 
                href="/start-up-form" 
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center transition shadow-lg"
              >
                {current.requestService}
              </Link>
              <button 
                onClick={() => setSelectedService(null)}
                className="py-3 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs transition border border-neutral-700"
              >
                {current.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الفوتر المنفصل */}
      <Footer lang={lang} />

      <AiChatWidget />
    </div>
  );
}