'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, X, Menu, ChevronDown, MessageSquare } from 'lucide-react';
import NewsTicker from './NewsTicker';

interface HeaderProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  activeSection?: string;
  onSelectSection?: (section: string) => void;
}

export default function Header({
  lang,
  onToggleLang,
  activeSection,
  onSelectSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('site_lang');
      if ((savedLang === 'ar' || savedLang === 'en') && savedLang !== lang) {
        onToggleLang();
      }
    } catch {
      // تجاهل أي خطأ في الوصول إلى localStorage
    }
  }, []);

  const handleLanguageToggle = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    try {
      localStorage.setItem('site_lang', nextLang);
      window.dispatchEvent(new Event('siteLangChange'));
    } catch {
      // تجاهل أي خطأ في الوصول إلى localStorage
    }
    onToggleLang();
  };

  const isAr = lang === 'ar';
  const currentLogo = '/logo1.png';

  const labels = {
    ar: {
      countryLabel: 'قطر',
      companyName: 'ترانس ميشنز للتجارة والخدمات',
      companySub: 'ذ.م.م',
      home: 'الرئيسية',
      services: 'خدماتنا',
      proServices: 'خدمات العلاقات العامة',
      about: 'من نحن',
      consultancy: 'الاستشارات',
      portalMenu: 'بوابة العملاء',
      communicate: 'تواصل معنا',
      contactUsMenu: 'اتصل بنا',
      startUpFormMenu: 'نموذج التأسيس (Start Up Form)',
      followUs: 'تابعنا:',
      magazine: 'المجلة',
      workingHours: 'نعمل على مدار الساعة لخدمتكم في قطر',
    },
    en: {
      countryLabel: 'Qatar',
      companyName: 'Trans Missions Trading And Services',
      companySub: 'W.L.L',
      home: 'Home',
      services: 'Services',
      proServices: 'PRO Services',
      about: 'About Us',
      consultancy: 'Consultancy',
      portalMenu: 'Client Portal',
      communicate: 'Communicate',
      contactUsMenu: 'Contact us',
      startUpFormMenu: 'Start Up Form',
      followUs: 'Follow Us:',
      magazine: 'Magazine',
      workingHours: 'Working around the clock for your business in Qatar',
    },
  };

  const t = labels[lang];

  return (
    <>
      <header className="bg-neutral-800/95 border-neutral-700 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={() => onSelectSection?.('home')}
            title={t.home}
            className="group flex items-center gap-3 shrink-0 rounded-2xl p-1 -m-1 transition active:scale-95 focus:outline-none"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center p-1">
              <img
                src={currentLogo}
                alt="Trans Missions Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider leading-none mb-0.5 transition-colors group-hover:text-emerald-300">
                {t.countryLabel}
              </span>
              <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight transition-colors group-hover:text-emerald-400">
                {t.companyName}
              </span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">
                {t.companySub}
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/#home"
                onClick={() => onSelectSection?.('home')}
                className={`transition ${
                  activeSection === 'home' ? 'text-emerald-400 font-bold' : 'hover:opacity-85'
                }`}
              >
                {t.home}
              </Link>
              <Link
                href="/#services"
                onClick={() => onSelectSection?.('services')}
                className={`transition ${
                  activeSection === 'services' ? 'text-emerald-400 font-bold' : 'hover:opacity-85'
                }`}
              >
                {t.services}
              </Link>
              <Link href="/pro-services" className="hover:opacity-85 transition">
                {t.proServices}
              </Link>
              <Link href="/about" className="hover:opacity-85 transition">
                {t.about}
              </Link>
              <Link href="/consultancy" className="hover:opacity-85 transition">
                {t.consultancy}
              </Link>
              <Link href="/client-login" className="text-emerald-400 font-bold hover:opacity-85 transition">
                {t.portalMenu}
              </Link>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCommunicateDropdownOpen(!communicateDropdownOpen)}
                  className="flex items-center gap-1.5 text-emerald-400 font-bold hover:opacity-85 transition py-1 focus:outline-none cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.communicate}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      communicateDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {communicateDropdownOpen && (
                  <div
                    className={`absolute top-full mt-2 w-64 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-2xl py-2 z-50 ${
                      isAr ? 'right-0 text-right' : 'left-0 text-left'
                    }`}
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setCommunicateDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 hover:text-emerald-400 transition font-medium"
                    >
                      {t.contactUsMenu}
                    </Link>
                    <Link
                      href="/start-up-form"
                      onClick={() => setCommunicateDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 transition font-bold border-t border-neutral-700 mt-1 pt-2"
                    >
                      {t.startUpFormMenu}
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 shrink-0 border-s border-neutral-700 ps-4">
              <button
                type="button"
                onClick={handleLanguageToggle}
                className="flex items-center gap-1.5 bg-neutral-700/80 hover:opacity-80 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-600 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>{isAr ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={handleLanguageToggle}
              className="flex items-center gap-1 bg-neutral-700/80 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-neutral-600 text-white"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-700/50 border border-neutral-600 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-5 space-y-3 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <Link
              href="/#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400"
            >
              {t.home}
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400"
            >
              {t.services}
            </Link>
            <Link
              href="/pro-services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400"
            >
              {t.proServices}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400"
            >
              {t.about}
            </Link>
            <Link
              href="/consultancy"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-200 hover:text-emerald-400"
            >
              {t.consultancy}
            </Link>
            <Link
              href="/client-login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
            >
              {t.portalMenu}
            </Link>

            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <p className="text-xs font-bold text-emerald-400">{t.communicate}</p>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 px-3 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg"
              >
                {t.contactUsMenu}
              </Link>
              <Link
                href="/start-up-form"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 px-3 text-sm font-bold text-emerald-400 hover:bg-neutral-800 rounded-lg"
              >
                {t.startUpFormMenu}
              </Link>
            </div>
          </div>
        )}
      </header>

      <div className="bg-neutral-900/90 border-b border-neutral-800 py-2.5 px-4 sm:px-8">
        <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-300">
          <div className="flex items-center gap-3.5">
            <span className="font-bold text-emerald-400 text-sm">{t.followUs}</span>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/97450080984"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573540018745"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/transmissions1?cplk=MXVjaGdEaW12aGVDVjFjdyUzRCUzRA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/trans-missions-trading-and-services/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@transmissions2?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
                title="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/@trans-missions?sender_web_id=5f03d2cc-bae4-408a-bf07-ac120d46b691&device_type=desktop&is_copy_url=true"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
                title="Snapchat"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-3.174 0-5.464 2.124-5.464 5.253 0 1.953.944 3.193 1.927 4.102.585.541.879.882.879 1.487 0 .394-.176.841-.527 1.341-.334.477-.798 1.141-1.229 1.839-.427.691-.825 1.336-1.148 1.905-.333.593-.565 1.109-.687 1.527-.123.421-.131.78-.024 1.071.148.403.541.657 1.14.739 1.127.155 2.503-.049 3.864-.226 1.092-.143 2.179-.286 3.32-.286 1.14 0 2.228.143 3.32.286 1.361.177 2.737.381 3.864.226.599-.082.992-.336 1.14-.739.107-.291.099-.65-.024-1.071-.122-.418-.354-.934-.687-1.527-.323-.569-.721-1.214-1.148-1.905-.431-.698-.895-1.362-1.229-1.839-.351-.5-.527-.947-.527-1.341 0-.605.294-.946.879-1.487.983-.909 1.927-2.149 1.927-4.102 0-3.129-2.29-5.253-5.464-5.253z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@transmission-d9i"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
                title="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <Link
            href="/magazine"
            className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-emerald-400/60 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-neutral-950 text-xs font-bold transition"
          >
            <span>📖</span>
            <span>{t.magazine}</span>
          </Link>

          <div className="hidden sm:block text-xs text-neutral-400 font-medium">
            {t.workingHours}
          </div>
        </div>
      </div>

      <NewsTicker lang={lang} />
    </>
  );
}