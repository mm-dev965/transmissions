'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Building2, UserPlus, ArrowRight, Phone, Globe, AlertCircle, Search, ShieldCheck, KeyRound, Eye, EyeOff, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface ClientCompanyItem {
  id: string;
  nameAr: string;
  email?: string;
  password?: string;
}

export default function ClientLogin() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [mode, setMode] = useState<'client' | 'admin'>('client');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [adminSecretPass, setAdminSecretPass] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  const [companiesList, setCompaniesList] = useState<ClientCompanyItem[]>([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as 'ar' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const loaded: ClientCompanyItem[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const compName = data.companyName || data.company || data.nameAr || data.name || data.clientName || '';
          if (compName && compName.trim() !== '' && compName !== 'ADMIN') {
            loaded.push({
              id: docSnap.id,
              nameAr: compName,
              email: data.email || '',
              password: data.password || 'TM-2026'
            });
          }
        });
        setCompaniesList(loaded);
      } catch (error) {
        console.error("Error fetching companies list:", error);
      }
    };
    fetchCompanies();
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  // دالة الحذف الجذري للشركة من فايربيس والموقع
  const handleDeleteCompany = async (companyId: string, companyName: string) => {
    const confirmDelete = window.confirm(`هل أنت متأكد من حذف شركة "${companyName}" من جذورها نهائياً من قاعدة البيانات والموقع؟`);
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "clients", companyId));
      setCompaniesList(companiesList.filter(c => c.id !== companyId));
      alert("تم حذف الشركة بنجاح من قاعدة البيانات!");
    } catch (err) {
      console.error("Error deleting company:", err);
      alert("حدث خطأ أثناء محاولة حذف الشركة.");
    }
  };

  const t = {
    ar: {
      homeBtn: "الرئيسية",
      clientTab: "لوحة العملاء",
      adminTab: "لوحة المشرف (Admin)",
      title: "بوابة عملاء ترانس ميشنز",
      subtitle: "تابع معاملات شركتك ومستنداتك في قطر ثانية بثانية",
      emailLabel: "اسم الشركة أو البريد الإلكتروني",
      passwordLabel: "كلمة المرور الخاصة بك",
      loginBtn: "تسجيل الدخول",
      loadingText: "جاري التحقق...",
      noAccount: "ليس لديك حساب؟ اطلب حساب متابعة جديد الآن",
      companyNameLabel: "اسم الشركة في قطر",
      phoneLabel: "رقم الهاتف / الواتساب (مع رمز الدولة)",
      phoneHint: "مثال صحيح: 974XXXXXXXX (بدون علامة + أو أصفار في البداية)",
      registerBtn: "طلب حساب وتوليد كلمة المرور",
      registeringText: "جاري الإنشاء...",
      backToLogin: "العودة إلى تسجيل الدخول",
      footer: "ترانس ميشنز للتجارة والخدمات ذ.م.م © 2026",
      errorMsg: "بيانات الدخول غير صحيحة.",
      generalError: "حدث خطأ، يرجى المحاولة مرة أخرى.",
      successReg: (pwd: string) => `تم إنشاء حساب شركتك بنجاح! كلمة المرور: ${pwd}`,
      countryLabel: "قطر",
      companyName: "ترانس ميشنز للتجارة والخدمات",
      companySub: "ذ.م.م",
      formNoticeTitle: "تنبيه هام للعملاء الجدد:",
      formNoticeText: "يتوجب عليك أولاً ملء استمارة التأسيس (Start-up Form) ورفع مستنداتك الرسمية لضمان تفعيل حسابك ومتابعة معاملاتك بدقة.",
      noCompanies: "لا توجد شركات مسجلة حالياً.",
      adminTitle: "لوحة تحكم المشرف (Admin)",
      adminSubtitle: "منطقة سرية خاصة بإدارة المنصة ومتابعة كلمات مرور العملاء",
      adminPassLabel: "كلمة المرور السرية للأدمن",
      adminPassPlaceholder: "أدخل كلمة المرور السرية...",
      adminUnlockBtn: "فتح لوحة المشرف السرية 🔓",
      adminSuccess: "✅ تم التحقق بنجاح!",
      masterViewBtn: "⚡ الدخول للوحة التحكم الشاملة (Master View)",
      adminListTitle: "📋 قائمة جميع الشركات المسجلة وكلمات المرور الخاصة بها:",
      adminSearchPlaceholder: "بحث سريع عن شركة في لوحة المشرف...",
      adminError: "كلمة مرور لوحة الأدمن غير صحيحة"
    },
    en: {
      homeBtn: "Home",
      clientTab: "Client Portal",
      adminTab: "Admin Panel",
      title: "Trans Missions Client Portal",
      subtitle: "Track your company transactions and documents in Qatar second by second",
      emailLabel: "Company Name or Email",
      passwordLabel: "Your Password",
      loginBtn: "Sign In",
      loadingText: "Verifying...",
      noAccount: "Don't have an account? Request a new tracking account",
      companyNameLabel: "Company Name in Qatar",
      phoneLabel: "Phone / WhatsApp (with country code)",
      phoneHint: "Correct example: 974XXXXXXXX (without + or leading zeros)",
      registerBtn: "Request Account & Generate Password",
      registeringText: "Creating...",
      backToLogin: "Back to Sign In",
      footer: "Trans Missions Trading And Services W.L.L © 2026",
      errorMsg: "Invalid login credentials.",
      generalError: "An error occurred, please try again.",
      successReg: (pwd: string) => `Company account created successfully! Password: ${pwd}`,
      countryLabel: "Qatar",
      companyName: "Trans Missions Trading And Services",
      companySub: "W.L.L",
      formNoticeTitle: "Important Notice for New Clients:",
      formNoticeText: "You must first fill out the Start-up Form and upload your official documents to ensure account activation and accurate transaction tracking.",
      noCompanies: "No registered companies found.",
      adminTitle: "Admin Control Panel",
      adminSubtitle: "Secure area for managing platform and viewing client passwords",
      adminPassLabel: "Admin Secret Password",
      adminPassPlaceholder: "Enter secret password...",
      adminUnlockBtn: "Unlock Admin Panel 🔓",
      adminSuccess: "✅ Verified Successfully!",
      masterViewBtn: "⚡ Enter Master Control View",
      adminListTitle: "📋 All Registered Companies & Passwords:",
      adminSearchPlaceholder: "Quick search company in admin panel...",
      adminError: "Incorrect Admin Password"
    }
  };

  const current = t[lang];
  const currentLogo = '/logo1.png';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const q1 = query(collection(db, "clients"), where("email", "==", email), where("password", "==", password));
      let querySnapshot = await getDocs(q1);

      if (querySnapshot.empty) {
        const q2 = query(collection(db, "clients"), where("companyName", "==", email), where("password", "==", password));
        querySnapshot = await getDocs(q2);
      }

      if (querySnapshot.empty) {
        const q3 = query(collection(db, "clients"), where("company", "==", email), where("password", "==", password));
        querySnapshot = await getDocs(q3);
      }

      if (!querySnapshot.empty) {
        const clientData = querySnapshot.docs[0].data();
        localStorage.setItem('current_client', JSON.stringify(clientData));
        router.push('/client-portal');
      } else {
        setError(current.errorMsg);
      }
    } catch (err) {
      console.error(err);
      setError(current.generalError);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const autoPassword = 'TM-' + Math.floor(1000 + Math.random() * 9000);

      await addDoc(collection(db, "clients"), {
        companyName,
        email,
        phone,
        password: autoPassword,
        createdAt: new Date().toISOString()
      });

      setSuccessMsg(current.successReg(autoPassword));
      
      const whatsAppMessage = `مرحباً بك في ترانس ميشنز للتجارة والخدمات (قطر).\nتم إنشاء حساب بورتال المتابعة لشركة: ${companyName}\nالبريد: ${email}\nكلمة المرور: ${autoPassword}\nرابط الدخول: https://transmissions.qa/client-login`;
      
      const cleanPhone = phone.replace(/\D/g, '').replace(/^0+/, '');
      const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsAppMessage)}`;
      
      localStorage.setItem('current_client', JSON.stringify({ companyName, email, password: autoPassword }));
      
      setTimeout(() => {
        window.open(waLink, '_blank');
        router.push('/client-portal');
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(current.generalError);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminSecretPass === 'TM-123A') {
      setIsAdminUnlocked(true);
      setError('');
    } else {
      setError(current.adminError);
    }
  };

  const loginAsMasterAdmin = () => {
    localStorage.setItem('current_client', JSON.stringify({ companyName: 'ADMIN', isAdmin: true }));
    router.push('/client-portal');
  };

  const filteredAdminCompanies = companiesList.filter(c => 
    c.nameAr.toLowerCase().includes(adminSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <header className="bg-neutral-800/95 border-neutral-700 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="transition hover:scale-105 flex items-center justify-center p-1">
              <img src={currentLogo} alt="Trans Missions Logo" className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider leading-none mb-0.5">{current.countryLabel}</span>
              <span className="font-extrabold text-xs sm:text-sm tracking-wider leading-tight">{current.companyName}</span>
              <span className="text-[11px] opacity-75 font-medium leading-none mt-1">{current.companySub}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-neutral-900 border border-neutral-700 p-1 rounded-xl flex items-center gap-1">
              <button 
                onClick={() => { setMode('client'); setIsAdminUnlocked(false); setError(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${mode === 'client' ? 'bg-emerald-600 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                {current.clientTab}
              </button>
              <button 
                onClick={() => { setMode('admin'); setError(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${mode === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                {current.adminTab}
              </button>
            </div>

            <a href="/" className="flex items-center gap-1.5 bg-neutral-700/80 hover:bg-neutral-600 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-600 text-white">
              <span>{current.homeBtn}</span>
            </a>
            <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-neutral-700/80 hover:bg-neutral-600 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border border-neutral-600 text-white">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex items-center justify-center">
        
        {mode === 'client' ? (
          <div className="w-full max-w-lg mx-auto">
            
            <div className="bg-neutral-900/90 border border-neutral-700 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600/10 text-emerald-400 rounded-2xl mb-3 shadow-inner">
                  <Building2 className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-extrabold text-white">{current.title}</h1>
                <p className="text-xs text-neutral-400 mt-1">{current.subtitle}</p>
              </div>

              {error && (
                <div className="bg-red-950/60 border border-red-500 text-red-300 p-3 rounded-xl text-xs mb-4 text-center">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-xs mb-4 text-center">
                  {successMsg}
                </div>
              )}

              {!isRegistering ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-neutral-300">{current.emailLabel}</label>
                    <div className="relative">
                      <span className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none text-neutral-400`}>
                        <User className="w-4 h-4" />
                      </span>
                      <input 
                        type="text" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Company name or email..."
                        className={`w-full bg-neutral-800 border border-neutral-700 rounded-xl ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-white focus:outline-none focus:border-emerald-500 text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-neutral-300">{current.passwordLabel}</label>
                    <div className="relative">
                      <span className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none text-neutral-400`}>
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full bg-neutral-800 border border-neutral-700 rounded-xl ${lang === 'ar' ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-3 text-white focus:outline-none focus:border-emerald-500 text-sm`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 ${lang === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-neutral-400 hover:text-white transition`}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{loading ? current.loadingText : current.loginBtn}</span>
                    <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>

                  <div className="text-center pt-2">
                    <button 
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="text-xs text-emerald-400 hover:underline font-semibold"
                    >
                      {current.noAccount}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-3.5 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-relaxed text-amber-200/90">
                      <strong className="block font-bold text-amber-300 mb-0.5">{current.formNoticeTitle}</strong>
                      {current.formNoticeText}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-neutral-300">{current.companyNameLabel}</label>
                    <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Al Noor Trading" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-neutral-300">{current.emailLabel}</label>
                    <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="company@example.com" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-neutral-300">{current.phoneLabel}</label>
                    <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="974XXXXXXXX" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm" dir="ltr" />
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>{loading ? current.registeringText : current.registerBtn}</span>
                  </button>

                  <div className="text-center pt-2">
                    <button type="button" onClick={() => setIsRegistering(false)} className="text-xs text-neutral-400 hover:text-white font-semibold">
                      {current.backToLogin}
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center text-[11px] text-neutral-400 border-t border-neutral-800 pt-4">
                {current.footer}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-neutral-900/95 border border-amber-500/50 p-8 rounded-3xl max-w-xl w-full shadow-2xl backdrop-blur-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl mb-4 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-white mb-1">{current.adminTitle}</h2>
            <p className="text-xs text-neutral-400 mb-6">{current.adminSubtitle}</p>

            {error && (
              <div className="bg-red-950/60 border border-red-500 text-red-300 p-3 rounded-xl text-xs mb-4 text-center">
                {error}
              </div>
            )}

            {!isAdminUnlocked ? (
              <form onSubmit={handleAdminAuth} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-bold mb-2 text-neutral-300 text-right">{current.adminPassLabel}</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
                      <KeyRound className="w-4 h-4" />
                    </span>
                    <input 
                      type={showAdminPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={adminSecretPass}
                      onChange={(e) => setAdminSecretPass(e.target.value)}
                      placeholder={current.adminPassPlaceholder}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pr-10 pl-10 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 hover:text-white transition"
                    >
                      {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition shadow-lg"
                >
                  {current.adminUnlockBtn}
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-right">
                <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-xs font-bold text-center">
                  {current.adminSuccess}
                </div>

                <button 
                  onClick={loginAsMasterAdmin}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-lg text-center"
                >
                  {current.masterViewBtn}
                </button>

                <div className="mt-4 border-t border-neutral-800 pt-4">
                  <h3 className="text-xs font-bold text-amber-400 mb-2">{current.adminListTitle}</h3>
                  
                  <div className="relative mb-3">
                    <span className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none text-neutral-400`}>
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="text"
                      placeholder={current.adminSearchPlaceholder}
                      value={adminSearchQuery}
                      onChange={(e) => setAdminSearchQuery(e.target.value)}
                      className={`w-full bg-neutral-950 border border-neutral-800 rounded-xl ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 text-xs text-white focus:outline-none focus:border-amber-500`}
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-1.5 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                    {filteredAdminCompanies.length === 0 ? (
                      <div className="text-center py-4 text-neutral-500 text-xs">{current.noCompanies}</div>
                    ) : (
                      filteredAdminCompanies.map(comp => (
                        <div key={comp.id} className="flex justify-between items-center text-[11px] py-1.5 px-2 border-b border-neutral-900 rounded hover:bg-neutral-900/50">
                          <span className="text-neutral-200 font-bold">{comp.nameAr}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-300 font-mono bg-neutral-900 px-2.5 py-1 rounded border border-amber-500/20">{comp.password}</span>
                            <button
                              onClick={() => handleDeleteCompany(comp.id, comp.nameAr)}
                              className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 p-1.5 rounded transition border border-rose-800/50"
                              title="حذف الشركة نهائياً"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}