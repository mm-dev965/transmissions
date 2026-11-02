'use client';

import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, CheckCircle2, Globe, Users, X, Mail, Phone, MapPin, FileText, Menu, Lock, ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutUs() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);
  
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsMessageSent(true);
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
      
      countryLabel: "قطر",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",

      pageTitle: "من نحن",
      pageSubtitle: "شريكك الاستراتيجي والأمثل في تأسيس وتطوير أعمالك في دولة قطر.",

      card1Title: "نبذة عن شركة ترانس ميشنز",
      card1Text: "شركة ترانس ميشنز للتجارة والخدمات (ذ.م.م) مسجلة بموجب القوانين القطرية (رقم السجل التجاري: 210470) لتكون بوابتك الآمنة في تقديم الحلول المبتكرة والخدمات الحكومية والقانونية والتجارية المتكاملة لمساعدة عملك على النمو بكفاءة عالية في السوق القطري.",

      card2Title: "كلمة لعملائنا الكرام",
      card2Text: "نؤمن في ترانس ميشنز أن ثقتكم هي رأس مالنا الحقيقي، لذلك نحرص دوماً على تقديم أعلى معايير الجودة والسرعة في إنجاز كافة معاملاتكم وتلبية تطلعاتكم الاستثمارية في السوق القطري بكل أمان واحترافية.",

      contactSectionTitle: "تواصل معنا",
      contactSectionSubtitle: "نحن هنا دائماً للإجابة على استفساراتكم ومساعدة أعمالكم على النمو في قطر.",
      locationText: "مول المرقاب، الدوحة، قطر (Al Mirqab Mall, Doha, Qatar)",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",
      qrTitle: "امسح الكود للاتصال السريع",
      qrDesc: "وجه كاميرا هاتفك نحو الكود للتواصل المباشر معنا.",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions.",
      adminPortal: "دخول الإدارة (Admin)",
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

      countryLabel: "Qatar",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",

      pageTitle: "About Us",
      pageSubtitle: "Your ultimate strategic partner in establishing and growing your business in Qatar.",

      card1Title: "About Trans Missions",
      card1Text: "Trans Missions Trading and Services W.L.L (C.R. No: 210470) is established under Qatari law to be your secure gateway in providing innovative solutions, government, legal, and commercial services designed to help your business thrive efficiently in the Qatari market.",

      card2Title: "A Word to Our Valued Clients",
      card2Text: "We believe at Trans Missions that your trust is our true capital. Therefore, we are always committed to delivering the highest standards of quality and speed in executing all your transactions with complete security and professionalism.",

      contactSectionTitle: "Contact Us",
      contactSectionSubtitle: "We are always here to answer your inquiries and help your business grow in Qatar.",
      locationText: "Al Mirqab Mall, Doha, Qatar",
      phoneText: "+974 50080984",
      emailText: "info@transmissions.qa",
      qrTitle: "Scan QR for Quick Contact",
      qrDesc: "Point your phone camera to connect directly.",

      footerTitle: "Trans Missions Trading And Services W.L.L",
      rights: "© 2026 Trans Missions. All rights reserved.",
      adminPortal: "Admin Portal",
    }
  };

  const current = t[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* الهيدر الموحد */}
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
              <Link href="/" className="hover:opacity-85 transition">{current.home}</Link>
              <Link href="/#services" className="hover:opacity-85 transition">{current.services}</Link>
              <Link href="/#pro-services" className="hover:opacity-85 transition">{current.proServices}</Link>
              <Link href="/about" className="text-emerald-400 font-bold transition">{current.about}</Link>
              <Link href="/#consultancy" className="hover:opacity-85 transition">{current.consultancy}</Link>

              {/* قائمة Communicate */}
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
                  <div className={`absolute top-full mt-2 w-56 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-2xl py-2 z-50 ${lang === 'ar' ? 'right-0 text-right' : 'left-0 text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Link href="/contact" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 hover:text-emerald-400 transition font-medium">{current.contactUsMenu}</Link>
                    <Link href="/start-up-form" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-emerald-400 hover:bg-neutral-700 transition font-bold border-t border-neutral-700 mt-1 pt-2">{current.startUpFormMenu}</Link>
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
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.home}</Link>
            <Link href="/#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.services}</Link>
            <Link href="/#pro-services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.proServices}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-emerald-400 font-bold">{current.about}</Link>
            <Link href="/#consultancy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.consultancy}</Link>
            
            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <p className="text-xs font-bold text-emerald-400">{current.communicate}</p>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg">{current.contactUsMenu}</Link>
              <Link href="/start-up-form" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 text-sm font-bold text-emerald-400 hover:bg-neutral-800 rounded-lg">{current.startUpFormMenu}</Link>
            </div>
          </div>
        )}
      </header>

      {/* محتوى صفحة من نحن */}
      <main className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600/10 text-emerald-400 mb-2">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{current.pageTitle}</h1>
          <p className="text-sm sm:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">{current.pageSubtitle}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>{current.card1Title}</span>
            </h3>
            <p className="opacity-80 text-sm sm:text-base leading-relaxed">{current.card1Text}</p>
          </div>

          <div className="bg-neutral-800/40 p-8 sm:p-10 rounded-3xl border border-neutral-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Users className="w-6 h-6 text-emerald-400" />
              <span>{current.card2Title}</span>
            </h3>
            <p className="opacity-80 text-sm sm:text-base leading-relaxed">{current.card2Text}</p>
          </div>
        </div>
      </main>

      {/* الفوتر الموحد المتناسق */}
      <footer className="bg-neutral-800 text-neutral-300 py-16 sm:py-20 border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            
            {/* الكرت الأول: الخريطة */}
            <div className="bg-neutral-900/60 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <h3 className="text-xl font-extrabold mb-4 text-white">موقعنا على الخريطة</h3>
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

            {/* الكرت الثاني: Contact Us */}
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

              {/* QR Code */}
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

            {/* الكرت الثالث: أرسل لنا رسالة */}
            <div className="bg-neutral-900/60 border border-neutral-700 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold mb-4 text-white">أرسل لنا رسالة</h3>
                {isMessageSent ? (
                  <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                    تم ارسال رسالتك بنجاح!
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">الاسم</label>
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
                      <label className="block text-sm font-bold mb-2 text-white">البريد الإلكتروني</label>
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
                      <label className="block text-sm font-bold mb-2 text-white">الرسالة</label>
                      <textarea 
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Write message..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none text-sm resize-none"
                      />
                    </div>
                    <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">
                      إرسال الرسالة
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-700 text-xs sm:text-sm text-center md:text-right">
            <div>
              <p className="text-white font-bold text-sm sm:text-base mb-1">{current.footerTitle}</p>
              <p className="opacity-80"><span dir="ltr">{current.phoneText}</span> :Phone | info@transmissionsqa.com :Email | Qatar</p>
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
    </div>
  );
}