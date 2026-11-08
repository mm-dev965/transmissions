'use client';
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowRight, Upload, CheckCircle2, Globe, MessageSquare, ChevronDown, Menu, X } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function StartUpFormPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'cyber' | 'light'>('faded');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);

  // استرجاع اللغة المحفوظة
  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as 'ar' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // بيانات الشركاء (4 شركاء)
  const [partners, setPartners] = useState([
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
  ]);

  const [proposedCompanyName, setProposedCompanyName] = useState("");
  const [totalShares, setTotalShares] = useState("");
  const [activities, setActivities] = useState("");
  const [partnersContacts, setPartnersContacts] = useState("");
  const [signatories, setSignatories] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const handlePartnerChange = (index: number, field: string, value: any) => {
    const newPartners = [...partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setPartners(newPartners);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق أن هناك على الأقل شريك واحد تم إدخال اسمه
    const validPartners = partners.filter(p => p.name.trim() !== "");
    if (validPartners.length === 0) {
      alert(lang === 'ar' ? "يرجى إدخال اسم شريك واحد على الأقل للمتابعة." : "Please enter at least one partner name to proceed.");
      return;
    }

    setLoading(true);

    try {
      // 1. حفظ البيانات في Firebase أولاً
      await addDoc(collection(db, "start_up_forms"), {
        partners: partners.map(p => ({
          name: p.name,
          percentage: p.percentage,
          idNumber: p.idNumber,
          hasAttachment: p.file ? true : false,
          fileName: p.file ? p.file.name : null,
        })),
        proposedCompanyName,
        totalShares,
        activities,
        partnersContacts,
        signatories,
        createdAt: new Date().toISOString(),
      });

      // 2. إرسال بريد إلكتروني فوري عبر EmailJS
      const partnersSummary = partners
        .filter(p => p.name)
        .map((p, i) => `Partner ${i+1}: ${p.name} | Share: ${p.percentage} | ID: ${p.idNumber}`)
        .join('\n');

      await emailjs.send(
        "service_qtbr79k",
        "template_whk6cxn",
        {
          from_name: partners[0].name || "New Investor",
          from_email: partnersContacts || "No email provided",
          phone: partnersContacts,
          message: `--- Start Up Form Submission ---\n\nPartners Details:\n${partnersSummary}\n\nProposed Company Name: ${proposedCompanyName}\nTotal Shares: ${totalShares}\nActivities: ${activities}\nContacts: ${partnersContacts}\nSignatories: ${signatories}`,
        },
        "mvQrmbMTkV4nm9Lzz"
      );

      setSuccessMessage(lang === 'ar' ? "تم إرسال نموذج التأسيس بنجاح وحفظه في النظام وإرسال الإيميل!" : "Start-up form submitted and saved successfully!");
      setPartners([
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
      ]);
      setProposedCompanyName("");
      setTotalShares("");
      setActivities("");
      setPartnersContacts("");
      setSignatories("");
    } catch (error) {
      console.error("خطأ في حفظ النموذج أو الإرسال:", error);
      alert(lang === 'ar' ? "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى." : "An error occurred while submitting, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // اختيار اللوجو بناءً على الثيم النشط
  const currentLogo = theme === 'cyber' ? '/logo 2.png' : theme === 'light' ? '/logo 3.png' : '/logo1.png';

  const currentTheme = theme === 'cyber' ? {
    bg: "bg-slate-950 text-cyan-50",
    header: "bg-slate-950/95 border-slate-800",
    cardBg: "bg-slate-900/70 border-slate-800 text-cyan-50",
    btnPrimary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold",
  } : theme === 'light' ? {
    bg: "bg-slate-50 text-slate-900",
    header: "bg-white/95 border-slate-200 shadow-sm",
    cardBg: "bg-white border-slate-200 text-slate-900 shadow-md",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
  } : {
    bg: "bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100",
    header: "bg-neutral-800/95 border-neutral-700",
    cardBg: "bg-neutral-900/60 border-neutral-700 text-neutral-100",
    btnPrimary: "bg-neutral-100 hover:bg-white text-neutral-950 font-bold",
  };

  const t = {
    ar: {
      home: "الرئيسية",
      services: "خدماتنا",
      proServices: "خدمات العلاقات العامة",
      about: "من نحن",
      consultancy: "الاستشارات",
      communicate: "تواصل معنا",
      contactUsMenu: "اتصل بنا",
      startUpFormMenu: "نموذج التأسيس",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",
      countryLabel: "قطر",
      backToHome: "العودة للرئيسية",
      proposedCompanyLabel: "اسم الشركة المقترح (Proposed Company Name)",
      proposedPlaceholder: "أدخل اسم الشركة المقترح...",
      submitBtn: "إرسال نموذج التأسيس الآن",
      submitting: "جاري الإرسال..."
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
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",
      countryLabel: "Qatar",
      backToHome: "Back to Home",
      proposedCompanyLabel: "Proposed Company Name",
      proposedPlaceholder: "Enter proposed company name...",
      submitBtn: "Submit Start Up Form Now",
      submitting: "Submitting Form..."
    }
  };

  const current = t[lang];

  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* هيدر الموقع الموحد المتجاوب */}
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">
          
          {/* اللوجو بحجم متناسق */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Link href="/" className="transition hover:scale-105 flex items-center justify-center p-0.5 shrink-0">
              <img 
                src={currentLogo} 
                alt="Trans Missions Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300" 
              />
            </Link>
            <div className="flex flex-col truncate">
              <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider leading-none mb-0.5">{current.countryLabel}</span>
              <span className="font-extrabold text-[11px] sm:text-sm tracking-tight truncate">{current.companyName}</span>
              <span className="text-[10px] opacity-75 font-medium leading-none mt-0.5">{current.companySub}</span>
            </div>
          </div>

          {/* روابط الديسك توب */}
          <div className="hidden md:flex items-center justify-between w-auto gap-5 lg:gap-6">
            <nav className="flex items-center gap-3.5 lg:gap-5 text-xs lg:text-sm font-medium">
              <Link href="/" className="hover:opacity-85 transition">{current.home}</Link>
              <Link href="/#services" className="hover:opacity-85 transition">{current.services}</Link>
              <Link href="/#pro-services" className="hover:opacity-85 transition">{current.proServices}</Link>
              <Link href="/about" className="hover:opacity-85 transition">{current.about}</Link>
              <Link href="/#consultancy" className="hover:opacity-85 transition">{current.consultancy}</Link>

              {/* منيو Communicate */}
              <div className="relative">
                <button 
                  onClick={() => setCommunicateDropdownOpen(!communicateDropdownOpen)}
                  className="flex items-center gap-1 text-emerald-400 font-bold hover:opacity-85 transition py-1 focus:outline-none"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{current.communicate}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${communicateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {communicateDropdownOpen && (
                  <div className={`absolute top-full mt-2 w-48 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 z-50 ${lang === 'ar' ? 'right-0 text-right' : 'left-0 text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Link href="/contact" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2 text-xs sm:text-sm text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 transition font-medium">{current.contactUsMenu}</Link>
                    <Link href="/start-up-form" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2 text-xs sm:text-sm text-emerald-400 hover:bg-neutral-800 transition font-bold">{current.startUpFormMenu}</Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 shrink-0 border-s border-neutral-700 ps-3">
              <div className="flex items-center bg-black/10 dark:bg-black/40 border border-neutral-700 rounded-xl p-0.5 gap-0.5">
                <button onClick={() => setTheme('faded')} className={`w-7 h-7 text-xs rounded-lg font-medium flex items-center justify-center transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>1</button>
                <button onClick={() => setTheme('cyber')} className={`w-7 h-7 text-xs rounded-lg font-medium flex items-center justify-center transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>2</button>
                <button onClick={() => setTheme('light')} className={`w-7 h-7 text-xs rounded-lg font-medium flex items-center justify-center transition ${theme === 'light' ? 'bg-emerald-600 text-white font-bold' : 'opacity-70 hover:opacity-100'}`}>3</button>
              </div>

              <button onClick={toggleLanguage} className="flex items-center gap-1 bg-black/5 dark:bg-neutral-900/80 hover:opacity-80 px-2.5 py-1.5 rounded-xl text-xs font-medium transition border border-neutral-700">
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>

          {/* أزرار الموبايل (زر اللغة + زر القائمة) */}
          <div className="flex items-center gap-1.5 md:hidden shrink-0">
            <button onClick={toggleLanguage} className="flex items-center gap-1 bg-neutral-700/80 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-neutral-600 text-white">
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-neutral-700/50 border border-neutral-600 text-white">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* قائمة الموبايل المنسدلة */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-4 space-y-2.5 shadow-2xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.home}</Link>
            <Link href="/#services" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.services}</Link>
            <Link href="/#pro-services" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.proServices}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.about}</Link>
            <Link href="/#consultancy" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium text-neutral-200 hover:text-emerald-400">{current.consultancy}</Link>
            
            <div className="pt-2 border-t border-neutral-800 space-y-1.5">
              <p className="text-[11px] font-bold text-emerald-400">{current.communicate}</p>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2.5 text-xs text-neutral-300 hover:bg-neutral-800 rounded-lg">{current.contactUsMenu}</Link>
              <Link href="/start-up-form" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2.5 text-xs font-bold text-emerald-400 hover:bg-neutral-800 rounded-lg">{current.startUpFormMenu}</Link>
            </div>
          </div>
        )}
      </header>

      {/* محتوى نموذج التأسيس */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-700 transition font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>{current.backToHome}</span>
          </Link>
        </div>

        <div className={`${currentTheme.cardBg} border p-8 sm:p-10 rounded-3xl shadow-2xl`}>
          <div className="text-center mb-10 border-b border-neutral-700 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black tracking-wide uppercase mb-2">
              Start Up Form
            </h1>
            <p className="opacity-75 text-sm">
              Trans Missions Trading And Services W.L.L - Company Incorporation Portal
            </p>
          </div>

          {successMessage && (
            <div className="mb-8 p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-300 rounded-2xl text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-3 text-xs font-bold opacity-70 uppercase tracking-wider px-1">
                <div className="col-span-5">Partner Name (Partner 1 required)</div>
                <div className="col-span-2">Percentage</div>
                <div className="col-span-3">ID Number</div>
                <div className="col-span-2 text-center">ID Copy</div>
              </div>

              {partners.map((partner, index) => (
                <div key={index} className="bg-black/20 border border-neutral-700 p-4 rounded-2xl grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <label className="block text-[11px] opacity-70 mb-1">Partner {index + 1} {index === 0 ? '*' : '(Optional)'}</label>
                    <input
                      type="text"
                      required={index === 0}
                      value={partner.name}
                      onChange={(e) => handlePartnerChange(index, "name", e.target.value)}
                      placeholder={`Owner Name ${index + 1}`}
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[11px] opacity-70 mb-1">%</label>
                    <input
                      type="text"
                      value={partner.percentage}
                      onChange={(e) => handlePartnerChange(index, "percentage", e.target.value)}
                      placeholder="e.g. 25%"
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-center"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-[11px] opacity-70 mb-1">ID / Passport</label>
                    <input
                      type="text"
                      value={partner.idNumber}
                      onChange={(e) => handlePartnerChange(index, "idNumber", e.target.value)}
                      placeholder="ID Number"
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-2 text-center">
                    <label className="block text-[11px] opacity-70 mb-1">Attach ID</label>
                    <label className="cursor-pointer inline-flex items-center justify-center w-full px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 rounded-xl border border-neutral-700 text-xs font-semibold transition">
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      <span>{partner.file ? "Attached" : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handlePartnerChange(index, "file", e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* خانة اسم الشركة المقترح المترجمة ديناميكياً */}
            <div>
              <label className="block text-sm font-bold mb-2">{current.proposedCompanyLabel}</label>
              <input
                type="text"
                required
                value={proposedCompanyName}
                onChange={(e) => setProposedCompanyName(e.target.value)}
                placeholder={current.proposedPlaceholder}
                className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Total Shares Amount</label> 
              <input
                type="text"
                required
                value={totalShares}
                onChange={(e) => setTotalShares(e.target.value)}
                placeholder="Enter total shares capital..."
                className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Activities / Scope of Works</label>
              <textarea
                rows={3}
                required
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="Describe company activities and scope of works..."
                className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Emails of Partners and their Phones</label>
              <textarea
                rows={3}
                required
                value={partnersContacts}
                onChange={(e) => setPartnersContacts(e.target.value)}
                placeholder="Enter partners emails and phone numbers..."
                className="w-full bg-neutral-700/40 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Names of Signatories</label>
              <textarea
                rows={3}
                required
                value={signatories}
                onChange={(e) => setSignatories(e.target.value)}
                placeholder="Names of authorized signatories..."
                className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl ${currentTheme.btnPrimary} shadow-xl transition duration-200 disabled:bg-neutral-800`}
            >
              {loading ? current.submitting : current.submitBtn}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}