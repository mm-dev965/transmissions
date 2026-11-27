'use client';
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, FileCheck2, ShieldCheck, Briefcase } from "lucide-react";
import emailjs from '@emailjs/browser';
import Header from '../components/Header';

export default function ProServicesPage() {
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('site_lang');
        if (savedLang === 'ar' || savedLang === 'en') return savedLang;
      } catch {}
    }
    return 'ar';
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const syncLang = () => {
      try {
        const savedLang = localStorage.getItem('site_lang');
        if (savedLang === 'ar' || savedLang === 'en') {
          setLang(savedLang);
        }
      } catch {}
    };

    syncLang();
    window.addEventListener('siteLangChange', syncLang);
    window.addEventListener('storage', syncLang);

    return () => {
      window.removeEventListener('siteLangChange', syncLang);
      window.removeEventListener('storage', syncLang);
    };
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      try {
        localStorage.setItem('site_lang', next);
        window.dispatchEvent(new Event('siteLangChange'));
      } catch {}
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        phone,
        message: `[PRO Services Request] ${message}`,
        createdAt: new Date().toISOString(),
      });

      await emailjs.send(
        "service_qtbr79k",
        "template_whk6cxn",
        {
          from_name: name,
          from_email: email,
          phone: phone,
          message: `PRO Services Request: ${message}`,
        },
        "mvQrmbMTkV4nm9Lzz"
      );

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isAr = lang === 'ar';

  const servicesList = [
    {
      icon: Building2,
      titleAr: "تأسيس شركات بقطر واستخراج السجل التجاري",
      descAr: "حجز الاسم التجاري، إعداد وتوثيق عقد التأسيس، استخراج السجل التجاري (CR) والرخصة التجارية من البلدية للمستثمرين القطريين والأجانب (ملكية 100%).",
      titleEn: "Company Formation in Qatar & CR Issuance",
      descEn: "Trade name reservation, Articles of Association attestation, Commercial Registration (CR), and municipal trade licensing for Qatari and 100% foreign-owned companies.",
    },
    {
      icon: FileCheck2,
      titleAr: "تعديل السجلات التجارية وعقود الشركات",
      descAr: "إضافة أو حذف الأنشطة التجارية، تعديل نسب الشركاء والمخولين بالتوقيع، تجديد السجلات والرخص التجارية، وتنفيذ عقود البيع والتوكيلات في وزارة العدل.",
      titleEn: "Commercial Register Amendments & MOJ Attestation",
      descEn: "Adding or removing business activities, updating partners and authorized signatories, CR/license renewals, and MOJ contract/POA attestation.",
    },
    {
      icon: Briefcase,
      titleAr: "خدمات الجوازات ووزارة العمل وقيد المنشأة",
      descAr: "إصدار وتجديد قيد المنشأة، إقامات الموظفين، أذونات العمل، تغيير المستقدم، وتصديق عقود الإيجار التجارية لدى وزارة البلدية.",
      titleEn: "Immigration, Ministry of Labour & Computer Card",
      descEn: "Issuing and renewing establishment computer cards, employee residence permits (RP), work visas, employer sponsorship changes, and MME lease registration.",
    },
    {
      icon: ShieldCheck,
      titleAr: "الترجمة القانونية المعتمدة وتصديق المستندات",
      descAr: "ترجمة قانونية معتمدة لجميع العقود والوثائق الرسمية مقبولة لدى كافة الوزارات والسفارات والجهات القضائية في دولة قطر.",
      titleEn: "Certified Legal Translation & Document Attestation",
      descEn: "Certified legal translation for contracts and official documents accepted across all ministries, embassies, and judicial bodies in Qatar.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <Header lang={lang} onToggleLang={toggleLanguage} />

      <main className="py-10 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-700 transition text-sm font-medium">
            <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
          <Link href="/start-up-form" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-400 hover:bg-emerald-600/30 transition text-sm font-bold">
            <span>{isAr ? 'نموذج تأسيس شركة (Start Up Form)' : 'Company Start Up Form'}</span>
          </Link>
        </div>

        {/* القسم التعريفي لخدمات تأسيس الشركات والعلاقات العامة */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
            {isAr ? 'تأسيس شركات بقطر وتخليص المعاملات الحكومية' : 'Company Formation & PRO Services in Qatar'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight text-white">
            {isAr
              ? 'خدمات تأسيس شركات بقطر والعلاقات العامة (PRO Services)'
              : 'Company Formation in Qatar & Corporate PRO Services'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {isAr
              ? 'نقدم حلولاً متكاملة لتأسيس الشركات في قطر واستخراج السجل التجاري والرخص التجارية وتخليص كافة المعاملات الحكومية في الدوحة بسرعة ودقة واحترافية.'
              : 'We provide end-to-end company formation in Qatar, commercial registration, trade licensing, and fast government PRO clearance in Doha.'}
          </p>
        </section>

        {/* بطاقات تفاصيل الخدمات */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-14">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div key={idx} className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-5 sm:p-6 hover:border-emerald-500/40 transition shadow-lg">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600/15 text-emerald-400 flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white mb-2">
                  {isAr ? service.titleAr : service.titleEn}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {isAr ? service.descAr : service.descEn}
                </p>
              </div>
            );
          })}
        </section>

        {/* نموذج طلب الخدمة */}
        <div className="max-w-2xl mx-auto bg-neutral-900/80 border border-neutral-700 p-5 sm:p-8 rounded-3xl shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-black mb-2 text-center text-white">
            {isAr ? 'اطلب خدمة تأسيس شركة أو تخليص معاملات الآن' : 'Request Company Setup or PRO Service Now'}
          </h2>
          <p className="text-center text-xs sm:text-sm text-neutral-400 mb-6 sm:mb-8">
            {isAr ? 'املأ النموذج وسيتواصل معك مستشارونا لإنجاز معاملاتك في قطر فوراً' : 'Fill out the form and our consultants in Qatar will contact you immediately'}
          </p>

          {success ? (
            <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              {isAr ? 'تم إرسال طلبك بنجاح وسنتواصل معك قريباً!' : 'Your request has been sent successfully!'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Mohamed Ali" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+974 ..." className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{isAr ? 'تفاصيل الخدمة المطلوبة (تأسيس شركة / سجل تجاري / تخليص معاملات)' : 'Service Details'}</label>
                <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={isAr ? 'اكتب تفاصيل معاملتك أو نوع الشركة التي ترغب بتأسيسها...' : 'Write service details...'} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-emerald-500" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xl">
                {loading ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'إرسال الطلب الآن' : 'Submit Request Now')}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}