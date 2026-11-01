'use client';

import React, { useState } from 'react';
import { Building2, Languages as LangIcon, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const t = {
    ar: {
      brandSub: "للتجارة والخدمات - قطر",
      home: "الرئيسية",
      services: "خدماتنا",
      about: "من نحن",
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
      footerTitle: "شركة ترانسميشن للتجارة والخدمات",
      footerInfo: "قطر | البريد الإلكتروني: info@transmissions.qa | الهاتف: 97450080984+",
      rights: "جميع الحقوق محفوظة © 2026 Trans Missions."
    },
    en: {
      brandSub: "TRADING & SERVICES QATAR",
      home: "Home",
      services: "Services",
      about: "About Us",
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
      footerTitle: "Trans Missions Trading And Services",
      footerInfo: "Qatar | Email: info@transmissions.qa | Phone: +97450080984",
      rights: "© 2026 Trans Missions. All rights reserved."
    }
  };

  const current = t[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Image */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Trans Missions Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-blue-600 transition">{current.home}</a>
            <a href="#services" className="hover:text-blue-600 transition">{current.services}</a>
            <a href="#about" className="hover:text-blue-600 transition">{current.about}</a>
            <a href="#contact" className="hover:text-blue-600 transition">{current.contact}</a>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-sm font-semibold transition border border-slate-200 shadow-xs"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <a href="#contact" className="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition duration-200 text-sm">
              {current.consultation}
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>{current.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {current.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {current.titleHighlight}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {current.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition flex items-center justify-center gap-2">
              <span>{current.explore}</span>
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-md transition">
              {current.contactUs}
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{current.servicesTitle}</h2>
          <p className="text-slate-600 text-lg">{current.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition duration-300 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{current.s1Title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{current.s1Desc}</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> {current.s1Item1}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> {current.s1Item2}</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition duration-300 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
              <LangIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{current.s2Title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{current.s2Desc}</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> {current.s2Item1}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> {current.s2Item2}</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition duration-300 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{current.s3Title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{current.s3Desc}</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> {current.s3Item1}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> {current.s3Item2}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
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