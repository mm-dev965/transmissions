'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Search, Trash2, PlusCircle, LogOut, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface ClientCompanyItem {
  id: string;
  nameAr: string;
  email?: string;
  password?: string;
}

export default function AdminPortalPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [companiesList, setCompaniesList] = useState<ClientCompanyItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as 'ar' | 'en';
    if (savedLang) setLang(savedLang);

    const savedClient = localStorage.getItem('current_client');
    if (!savedClient) {
      router.push('/client-login');
      return;
    }
  }, [router]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const loaded: ClientCompanyItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const compName = data.companyName || data.company || data.nameAr || data.name || '';
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
      console.error("Error fetching companies:", error);
    }
  };

  const handleDeleteCompany = async (companyId: string, companyName: string) => {
    const confirmDelete = window.confirm(`هل أنت متأكد من حذف شركة "${companyName}" نهائياً من جذورها في قاعدة البيانات؟`);
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "clients", companyId));
      setCompaniesList(companiesList.filter(c => c.id !== companyId));
      setSuccessMsg("تم حذف الشركة بنجاح من قاعدة البيانات!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Error deleting company:", err);
      alert("حدث خطأ أثناء محاولة حذف الشركة.");
    }
  };

  const handleOpenCompanyPortal = (companyName: string, companyPassword?: string) => {
    localStorage.setItem('current_client', JSON.stringify({
      companyName: companyName,
      company: companyName,
      password: companyPassword || 'TM-2026',
      isAdmin: true
    }));
    router.push('/client-portal');
  };

  const addNewCompanyModal = async () => {
    const nameAr = prompt('أدخل اسم الشركة الجديدة بالعربي:');
    if (!nameAr) return;
    const clientPassword = prompt('أدخل كلمة المرور الخاصة بالعميل:') || 'TM-2026';

    try {
      await addDoc(collection(db, "clients"), {
        company: nameAr,
        password: clientPassword,
        todoTasks: [],
        clientFiles: [],
        partners: 'الشركاء المؤسسون',
        activity: 'تجارة عامة وخدمات',
        createdAtDate: new Date().toISOString().split('T')[0],
        tradeLicenseExpiry: '2026-12-01',
        commercialRecordExpiry: '2026-12-01',
        createdAt: new Date().toISOString()
      });
      fetchCompanies();
      setSuccessMsg('تم إضافة الشركة بنجاح!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const filteredCompanies = companiesList.filter(c => 
    c.nameAr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111214] text-white p-6 md:p-10 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {successMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-bold">
          {successMsg}
        </div>
      )}

      <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 text-black font-bold p-2.5 rounded-xl text-lg">⚡</div>
          <div>
            <h1 className="text-xl font-bold text-white">لوحة تحكم المشرف (Admin Control Panel)</h1>
            <p className="text-xs text-neutral-400">إدارة الشركات المسجلة وحذفها من جذورها</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/client-login')}
            className="bg-neutral-800 hover:bg-neutral-700 text-rose-300 px-4 py-2 rounded-xl text-xs font-bold transition border border-neutral-700"
          >
            تسجيل خروج 🚪
          </button>
        </div>
      </div>

      <div className="bg-[#18191c] border border-neutral-800 p-6 rounded-3xl mb-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <span className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none text-neutral-400`}>
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text"
            placeholder="بحث سريع عن شركة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-neutral-900 border border-neutral-700 rounded-xl ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 text-xs text-white focus:outline-none focus:border-amber-500`}
          />
        </div>

        <button 
          onClick={addNewCompanyModal}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ إضافة شركة جديدة</span>
        </button>
      </div>

      <div className="bg-[#18191c] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="bg-[#202225] px-4 py-3 font-bold text-sm text-amber-400 border-b border-neutral-800 flex justify-between items-center">
          <span>📋 قائمة الشركات المسجلة ({companiesList.length})</span>
          <span className="text-xs text-neutral-400 font-normal">اضغط على اسم الشركة للدخول المباشر لبورتال المتابعة</span>
        </div>

        <div className="divide-y divide-neutral-800/60">
          {filteredCompanies.length === 0 ? (
            <div className="p-8 text-center text-neutral-400 text-xs">لا توجد شركات مسجلة حالياً.</div>
          ) : (
            filteredCompanies.map(comp => (
              <div key={comp.id} className="p-4 flex justify-between items-center hover:bg-neutral-800/40 transition">
                <button
                  onClick={() => handleOpenCompanyPortal(comp.nameAr, comp.password)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold text-sm transition underline decoration-dotted underline-offset-4 text-right flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  <span>{comp.nameAr}</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-amber-300 font-mono text-xs bg-neutral-900 px-3 py-1.5 rounded-lg border border-amber-500/20">
                    كلمة المرور: {comp.password}
                  </span>
                  <button
                    onClick={() => handleDeleteCompany(comp.id, comp.nameAr)}
                    className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 px-3 py-1.5 rounded-lg text-xs font-bold transition border border-rose-800/50 flex items-center gap-1.5 cursor-pointer"
                    title="حذف الشركة نهائياً من قاعدة البيانات"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف نهائي</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}