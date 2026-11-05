'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, FileText, CheckCircle2, Clock, AlertCircle, LogOut, Globe, Phone, Calendar, Layers } from 'lucide-react';

export default function ClientPortal() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [clientData, setClientData] = useState<{ companyName: string; email: string; phone: string; password?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as 'ar' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }

    try {
      const currentClient = localStorage.getItem('current_client');
      if (!currentClient) {
        router.push('/client-login');
      } else {
        setClientData(JSON.parse(currentClient));
      }
    } catch (e) {
      console.error(e);
      router.push('/client-login');
    }
  }, [router]);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('current_client');
    router.push('/client-login');
  };

  const t = {
    ar: {
      homeBtn: "الرئيسية",
      portalTitle: "لوحة متابعة معاملات الشركة",
      welcome: "مرحباً بك،",
      emailLabel: "البريد الإلكتروني:",
      phoneLabel: "رقم الهاتف / الواتساب:",
      tableTitle: "جدول المعاملات والخدمات في قطر",
      tableSub: "تتبع حالة الخدمات، أولوياتها، والمواعيد النهائية ثانية بثانية",
      colTask: "المعاملة / الخدمة",
      colStatus: "الحالة",
      colPriority: "الأولوية",
      colDueDate: "الموعد النهائي",
      colNotes: "ملاحظات",
      statusWorking: "قيد الإجراء",
      statusDone: "مكتمل",
      statusStuck: "عالق / يتطلب توضيح",
      statusNotStarted: "قيد الانتظار",
      priorityHigh: "عالي",
      priorityMedium: "متوسط",
      priorityCritical: "حرج ⚠️",
      priorityLow: "منخفض",
      supportTitle: "تحتاج إلى مساعدة عاجلة أو استفسار؟",
      supportDesc: "فريقنا القانوني وفريق العلاقات العامة بقطر في خدمتك دائماً.",
      whatsappBtn: "تواصل عبر الواتساب",
      logoutBtn: "تسجيل الخروج",
      footer: "ترانس ميشنز للتجارة والخدمات ذ.م.م © 2026",
      countryLabel: "قطر",
      companyNameMain: "ترانس ميشنز للتجارة والخدمات",
      companySub: "ذ.م.م"
    },
    en: {
      homeBtn: "Home",
      portalTitle: "Company Transactions Dashboard",
      welcome: "Welcome,",
      emailLabel: "Email Address:",
      phoneLabel: "Phone / WhatsApp:",
      tableTitle: "Qatar Services & Transactions Table",
      tableSub: "Live tracking of service statuses, priorities, and deadlines",
      colTask: "Task / Service",
      colStatus: "Status",
      colPriority: "Priority",
      colDueDate: "Due Date",
      colNotes: "Notes",
      statusWorking: "Working on it",
      statusDone: "Done",
      statusStuck: "Stuck",
      statusNotStarted: "Not Started",
      priorityHigh: "High",
      priorityMedium: "Medium",
      priorityCritical: "Critical ⚠️",
      priorityLow: "Low",
      supportTitle: "Need Urgent Assistance?",
      supportDesc: "Our legal and PRO team in Qatar is always ready to serve you.",
      whatsappBtn: "Contact via WhatsApp",
      logoutBtn: "Sign Out",
      footer: "Trans Missions Trading And Services W.L.L © 2026",
      countryLabel: "Qatar",
      companyNameMain: "Trans Missions Trading And Services",
      companySub: "W.L.L"
    }
  };

  const current = t[lang];
  const currentLogo = '/logo1.png';

  // قائمة المعاملات والخدمات الافتراضية بنظام الجدول الفخم
  const tasksList = [
    { id: 1, nameAr: "تأسيس الشركة والسجل التجاري", nameEn: "Company Setup & Commercial Registration", status: "working", priority: "critical", dueDate: "Feb 26 - 2026", notes: "جاري استخراج قيد المنشأة" },
    { id: 2, nameAr: "توثيق العقود بوزارة العدل", nameEn: "Contracts Attestation at Ministry of Justice", status: "working", priority: "high", dueDate: "Mar 05 - 2026", notes: "مراجعة المستندات النهائية" },
    { id: 3, nameAr: "رخصة البلدية والدفاع المدني", nameEn: "Municipal License & Civil Defense", status: "notStarted", priority: "medium", dueDate: "Mar 15 - 2026", notes: "-" },
    { id: 4, nameAr: "إقامات الموظفين وأذونات العمل", nameEn: "Staff Residencies & Work Permits", status: "notStarted", priority: "high", dueDate: "Mar 20 - 2026", notes: "-" },
    { id: 5, nameAr: "فتح الحساب البنكي للشركة", nameEn: "Company Bank Account Opening", status: "done", priority: "critical", dueDate: "Jan 10 - 2026", notes: "تم بنجاح" },
  ];

  if (!clientData) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-sm text-emerald-400">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-neutral-100 flex flex-col font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* هيدر البورتال */}
      <header className="bg-neutral-900/95 border-neutral-800 backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
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
              <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight">{current.companyNameMain}</span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-700 text-white shadow">
              <span>{current.homeBtn}</span>
            </a>

            <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-700 text-white shadow">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-red-800 shadow">
              <LogOut className="w-4 h-4" />
              <span>{current.logoutBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* بطاقة معلومات الشركة */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {current.portalTitle}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {current.welcome} <span className="text-emerald-400">{clientData.companyName}</span>
              </h1>
            </div>
            <div className="bg-neutral-950/80 border border-neutral-800 p-4 rounded-2xl space-y-1.5 text-xs sm:text-sm w-full md:w-auto shadow-inner">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-semibold">{current.emailLabel}</span>
                <span className="text-white font-mono">{clientData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-semibold">{current.phoneLabel}</span>
                <span className="text-white font-mono" dir="ltr">{clientData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* لوحة المعاملات بنظام الجدول الاحترافي (Monday Style) */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="p-6 sm:p-8 border-b border-neutral-800">
            <h2 className="text-xl font-extrabold text-white mb-1">{current.tableTitle}</h2>
            <p className="text-xs text-neutral-400">{current.tableSub}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-neutral-950/80 text-neutral-400 text-xs uppercase tracking-wider border-b border-neutral-800">
                  <th className="py-4 px-6 font-bold text-start">{current.colTask}</th>
                  <th className="py-4 px-6 font-bold text-center">{current.colStatus}</th>
                  <th className="py-4 px-6 font-bold text-center">{current.colPriority}</th>
                  <th className="py-4 px-6 font-bold text-center">{current.colDueDate}</th>
                  <th className="py-4 px-6 font-bold text-start">{current.colNotes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs sm:text-sm">
                {tasksList.map((task) => {
                  // تحديد ألوان الحالة بناءً على الصور المرفقة
                  let statusBg = "bg-neutral-700 text-neutral-200";
                  let statusText = current.statusNotStarted;
                  if (task.status === "working") {
                    statusBg = "bg-amber-500 text-neutral-950 font-bold";
                    statusText = current.statusWorking;
                  } else if (task.status === "done") {
                    statusBg = "bg-emerald-600 text-white font-bold";
                    statusText = current.statusDone;
                  } else if (task.status === "stuck") {
                    statusBg = "bg-rose-600 text-white font-bold";
                    statusText = current.statusStuck;
                  }

                  // تحديد ألوان الأولوية
                  let priorityBg = "bg-neutral-700 text-neutral-200";
                  let priorityText = current.priorityMedium;
                  if (task.priority === "critical") {
                    priorityBg = "bg-neutral-800 border border-neutral-600 text-amber-300 font-bold";
                    priorityText = current.priorityCritical;
                  } else if (task.priority === "high") {
                    priorityBg = "bg-indigo-700 text-white font-bold";
                    priorityText = current.priorityHigh;
                  } else if (task.priority === "medium") {
                    priorityBg = "bg-blue-600 text-white font-bold";
                    priorityText = current.priorityMedium;
                  }

                  return (
                    <tr key={task.id} className="hover:bg-neutral-800/40 transition">
                      <td className="py-4 px-6 font-bold text-white">
                        {lang === 'ar' ? task.nameAr : task.nameEn}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1.5 rounded-xl text-xs shadow-md transition ${statusBg}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1.5 rounded-xl text-xs shadow-md transition ${priorityBg}`}>
                          {priorityText}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-neutral-300 font-mono">
                        {task.dueDate}
                      </td>
                      <td className="py-4 px-6 text-neutral-400">
                        {task.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* بطاقة الدعم الفني وتواصل الواتساب */}
        <div className="bg-gradient-to-r from-emerald-950/80 to-neutral-900 border border-emerald-800/50 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{current.supportTitle}</h3>
            <p className="text-xs text-neutral-300">{current.supportDesc}</p>
          </div>
          <a 
            href="https://wa.me/97450080984" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg flex items-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>{current.whatsappBtn}</span>
          </a>
        </div>

      </main>

      {/* الفوتر */}
      <footer className="bg-neutral-950 text-neutral-400 py-6 border-t border-neutral-800 text-center text-xs">
        {current.footer}
      </footer>

    </div>
  );
}