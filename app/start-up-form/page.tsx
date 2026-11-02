"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowRight, Upload, CheckCircle2, Globe, MessageSquare, ChevronDown, Menu, X } from "lucide-react";

export default function StartUpFormPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'faded' | 'cyber' | 'light'>('faded');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);

  // بيانات الشركاء (4 شركاء)
  const [partners, setPartners] = useState([
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
  ]);

  const [totalShares, setTotalShares] = useState("");
  const [activities, setActivities] = useState("");
  const [partnersContacts, setPartnersContacts] = useState("");
  const [signatories, setSignatories] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handlePartnerChange = (index: number, field: string, value: any) => {
    const newPartners = [...partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setPartners(newPartners);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "start_up_forms"), {
        partners: partners.map(p => ({
          name: p.name,
          percentage: p.percentage,
          idNumber: p.idNumber,
          hasAttachment: p.file ? true : false,
        })),
        totalShares,
        activities,
        partnersContacts,
        signatories,
        createdAt: new Date().toISOString(),
      });

      setSuccessMessage("تم إرسال نموذج التأسيس بنجاح وحفظه في النظام!");
      setPartners([
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
      ]);
      setTotalShares("");
      setActivities("");
      setPartnersContacts("");
      setSignatories("");
    } catch (error) {
      console.error("خطأ في حفظ النموذج:", error);
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  // اختيار اللوجو بناءً على الثيم النشط
  const currentLogo = theme === 'cyber' ? '/logo 2.png' : theme === 'light' ? '/logo 3.png' : '/logo 1.png';

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
    bg: "bg-neutral-950 text-neutral-100",
    header: "bg-neutral-950/95 border-neutral-800",
    cardBg: "bg-neutral-900/60 border-neutral-800 text-neutral-100",
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
      onlineOrderMenu: "الطلب أونلاين",
      freeConsultancyMenu: "استشارة مجانية",
      startUpFormMenu: "نموذج التأسيس",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",
      countryLabel: "قطر",
    },
    en: {
      home: "Home",
      services: "Services",
      proServices: "PRO Services",
      about: "About Us",
      consultancy: "Consultancy",
      communicate: "Communicate",
      contactUsMenu: "Contact us",
      onlineOrderMenu: "Online Order",
      freeConsultancyMenu: "Free Consultancy",
      startUpFormMenu: "Start Up Form",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",
      countryLabel: "Qatar",
    }
  };

  const current = t[lang];

  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* هيدر الموقع الموحد */}
      <header className={`${currentTheme.header} backdrop-blur-md border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="transition hover:scale-105 flex items-center justify-center p-1">
                <img 
                  src={currentLogo} 
                  alt="Trans Missions Logo" 
                  className="h-10 sm:h-12 w-auto object-contain transition-all duration-300" 
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

          <div className="hidden md:flex items-center justify-between w-full md:w-auto gap-5 lg:gap-6">
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
                    <Link href="/contact" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2 text-xs sm:text-sm text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 transition font-medium">{current.onlineOrderMenu}</Link>
                    <Link href="/contact" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2 text-xs sm:text-sm text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 transition font-medium">{current.freeConsultancyMenu}</Link>
                    <Link href="/start-up-form" onClick={() => setCommunicateDropdownOpen(false)} className="block px-4 py-2 text-xs sm:text-sm text-emerald-400 hover:bg-neutral-800 transition font-bold">{current.startUpFormMenu}</Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 shrink-0 border-s border-neutral-800 ps-3">
              <div className="flex items-center bg-black/10 dark:bg-black/40 border border-neutral-800/20 dark:border-neutral-800 rounded-xl p-0.5 gap-0.5">
                <button onClick={() => setTheme('faded')} className={`w-7 h-7 text-xs rounded-lg font-medium flex items-center justify-center transition ${theme === 'faded' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>1</button>
                <button onClick={() => setTheme('cyber')} className={`w-7 h-7 text-xs rounded-lg font-medium flex items-center justify-center transition ${theme === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold' : 'opacity-70 hover:opacity-100'}`}>2</button>
                <button onClick={() => setTheme('light')} className={`w-7 h-7 text-xs rounded-lg font-medium flex items-center justify-center transition ${theme === 'light' ? 'bg-emerald-600 text-white font-bold' : 'opacity-70 hover:opacity-100'}`}>3</button>
              </div>

              <button onClick={toggleLanguage} className="flex items-center gap-1 bg-black/5 dark:bg-neutral-900/80 hover:opacity-80 px-2.5 py-1.5 rounded-xl text-xs font-medium transition border border-neutral-800/20 dark:border-neutral-800">
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* محتوى نموذج التأسيس */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-700 transition font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
        </div>

        <div className={`${currentTheme.cardBg} border p-8 sm:p-10 rounded-3xl shadow-2xl`}>
          <div className="text-center mb-10 border-b border-neutral-800 pb-6">
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
                <div className="col-span-5">Partner Name</div>
                <div className="col-span-2">Percentage</div>
                <div className="col-span-3">ID Number</div>
                <div className="col-span-2 text-center">ID Copy</div>
              </div>

              {partners.map((partner, index) => (
                <div key={index} className="bg-black/20 border border-neutral-800 p-4 rounded-2xl grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <label className="block text-[11px] opacity-70 mb-1">Partner {index + 1}</label>
                    <input
                      type="text"
                      required={index < 2}
                      value={partner.name}
                      onChange={(e) => handlePartnerChange(index, "name", e.target.value)}
                      placeholder={`Owner Name ${index + 1}`}
                      className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[11px] opacity-70 mb-1">%</label>
                    <input
                      type="text"
                      value={partner.percentage}
                      onChange={(e) => handlePartnerChange(index, "percentage", e.target.value)}
                      placeholder="e.g. 25%"
                      className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-center"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-[11px] opacity-70 mb-1">ID / Passport</label>
                    <input
                      type="text"
                      value={partner.idNumber}
                      onChange={(e) => handlePartnerChange(index, "idNumber", e.target.value)}
                      placeholder="ID Number"
                      className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
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

            <div>
              <label className="block text-sm font-bold mb-2">Total Shares</label>
              <input
                type="text"
                required
                value={totalShares}
                onChange={(e) => setTotalShares(e.target.value)}
                placeholder="Enter total shares capital..."
                className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
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
                className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
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
                className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
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
                className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl ${currentTheme.btnPrimary} shadow-xl transition duration-200 disabled:bg-neutral-800`}
            >
              {loading ? "Submitting Form..." : "Submit Start Up Form Now"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}