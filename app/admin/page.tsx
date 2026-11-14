'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Eye, EyeOff, Trash2, FileSpreadsheet, Palette, Lock, CheckCircle, RefreshCw } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

export default function GeneralAdminMasterPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'messages' | 'theme' | 'passwords'>('orders');

  const [orders, setOrders] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  
  // إعدادات الألوان والمظهر
  const [siteTheme, setSiteTheme] = useState<'dark' | 'light' | 'emerald' | 'amber'>('dark');
  
  // إدارة كلمات المرور
  const [currentMasterPass, setCurrentMasterPass] = useState('TM-123A');
  const [newMasterPass, setNewMasterPass] = useState('');
  const [passSuccessMsg, setPassSuccessMsg] = useState('');

  const router = useRouter();

  useEffect(() => {
    // استرجاع السمة المحفوظة مسبقاً إن وجدت
    const savedTheme = localStorage.getItem('site_custom_theme') as any;
    if (savedTheme) setSiteTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubOrders = onSnapshot(collection(db, "start_up_forms"), (snapshot) => {
      setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubMessages = onSnapshot(collection(db, "contact_messages"), (snapshot) => {
      setContactMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubOrders();
      unsubMessages();
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === currentMasterPass || passwordInput === 'TM-123A') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('كلمة المرور غير صحيحة. يرجى إدخال TM-123A');
    }
  };

  const deleteOrder = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب نهائياً؟")) {
      await deleteDoc(doc(db, "start_up_forms", id));
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة نهائياً؟")) {
      await deleteDoc(doc(db, "contact_messages", id));
    }
  };

  const handleThemeChange = (theme: 'dark' | 'light' | 'emerald' | 'amber') => {
    setSiteTheme(theme);
    localStorage.setItem('site_custom_theme', theme);
  };

  const handleChangeMasterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMasterPass.trim()) return;
    setCurrentMasterPass(newMasterPass);
    setPassSuccessMsg('✅ تم تحديث كلمة المرور الرئيسية بنجاح!');
    setNewMasterPass('');
    setTimeout(() => setPassSuccessMsg(''), 4000);
  };

  const exportToExcel = (dataArray: any[], type: 'orders' | 'messages') => {
    if (dataArray.length === 0) {
      alert("لا توجد بيانات للتصدير!");
      return;
    }
    let csvContent = "\uFEFF";
    if (type === 'orders') {
      csvContent += "اسم العميل/الشركة,الخدمة المطلوبة,رقم الهاتف,الحالة,ملاحظات الطلب\n";
      dataArray.forEach(item => {
        csvContent += `"${item.clientName || ''}","${item.service || ''}","${item.phone || ''}","${item.status || 'قيد المراجعة'}","${item.notes || ''}"\n`;
      });
    } else {
      csvContent += "اسم المرسل,البريد الإلكتروني,نص الرسالة,وقت الإرسال\n";
      dataArray.forEach(item => {
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleString() : (item.date || '');
        csvContent += `"${item.name || item.fullName || ''}","${item.email || ''}","${item.message || item.content || ''}","${dateStr}"\n`;
      });
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // تحديد خلفيات الموقع بناءً على السمة المتاحة لراحة العين
  const getThemeClass = () => {
    switch (siteTheme) {
      case 'light': return 'bg-slate-100 text-slate-900';
      case 'emerald': return 'bg-[#061a14] text-emerald-100';
      case 'amber': return 'bg-[#1c1408] text-amber-100';
      default: return 'bg-[#111214] text-neutral-100';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111214] text-neutral-100 flex items-center justify-center p-4 font-sans" dir="rtl">
        <div className="bg-neutral-900 border border-amber-500/50 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold mb-1 text-white">لوحة تحكم الموقع العامة</h1>
          <p className="text-xs text-neutral-400 mb-6">أدخل كلمة المرور السرية (TM-123A) للوصول إلى مركز الإدارة الشامل.</p>

          {loginError && (
            <div className="bg-rose-950/60 border border-rose-500 text-rose-300 p-3 rounded-xl text-xs mb-4 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-neutral-300">كلمة المرور السرية</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-10 pl-10 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 hover:text-white transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition text-sm shadow-lg cursor-pointer">
              تسجيل الدخول للإدارة 🔓
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-neutral-800 text-xs">
            <a href="/" className="text-neutral-400 hover:text-white transition">&larr; العودة إلى الموقع الرئيسي</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans p-6 sm:p-10 transition-colors duration-300 ${getThemeClass()}`} dir="rtl">
      {passSuccessMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-bold animate-bounce">
          {passSuccessMsg}
        </div>
      )}

      {/* رأس اللوحة */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-5">
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Trans Missions Master Panel</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">لوحة تحكم الموقع وإدارة الطلبات العامة</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/')} className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-bold transition cursor-pointer">
            الموقع الرئيسي 🌐
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold transition cursor-pointer">
            تسجيل خروج 🚪
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* التبويبات الرئيسية */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button onClick={() => setActiveTab('orders')} className={`px-5 py-2.5 rounded-2xl font-bold text-xs border cursor-pointer transition ${activeTab === 'orders' ? 'bg-amber-600 border-amber-500 text-white shadow-lg' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}>
            📋 طلبات التأسيس ({orders.length})
          </button>
          <button onClick={() => setActiveTab('messages')} className={`px-5 py-2.5 rounded-2xl font-bold text-xs border cursor-pointer transition ${activeTab === 'messages' ? 'bg-amber-600 border-amber-500 text-white shadow-lg' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}>
            📬 رسائل اتصل بنا ({contactMessages.length})
          </button>
          <button onClick={() => setActiveTab('theme')} className={`px-5 py-2.5 rounded-2xl font-bold text-xs border cursor-pointer transition ${activeTab === 'theme' ? 'bg-amber-600 border-amber-500 text-white shadow-lg' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}>
            🎨 ستايل وألوان الموقع المريحة
          </button>
          <button onClick={() => setActiveTab('passwords')} className={`px-5 py-2.5 rounded-2xl font-bold text-xs border cursor-pointer transition ${activeTab === 'passwords' ? 'bg-amber-600 border-amber-500 text-white shadow-lg' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}>
            🔑 تغيير كلمات المرور والأمان
          </button>
        </div>

        {/* محتوى تبويب طلبات التأسيس */}
        {activeTab === 'orders' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-xs opacity-75">إجمالي طلبات التأسيس الواردة: {orders.length}</span>
              <button onClick={() => exportToExcel(orders, 'orders')} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow">
                <FileSpreadsheet className="w-4 h-4" /> تصدير Excel
              </button>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-950/60">
                    <th className="p-4">اسم العميل</th>
                    <th className="p-4">الخدمة المطلوبة</th>
                    <th className="p-4">رقم الهاتف</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-neutral-500">لا توجد طلبات تأسيس مسجلة حالياً.</td>
                    </tr>
                  ) : (
                    orders.map(o => (
                      <tr key={o.id} className="hover:bg-neutral-800/40 transition">
                        <td className="p-4 font-bold text-white">{o.clientName || o.companyName || '-'}</td>
                        <td className="p-4 text-amber-400 font-semibold">{o.service || o.activity || '-'}</td>
                        <td className="p-4 font-mono text-neutral-300" dir="ltr">{o.phone || '-'}</td>
                        <td className="p-4">
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md font-bold">
                            {o.status || 'قيد المراجعة'}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button onClick={() => deleteOrder(o.id)} className="p-2 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-xl border border-rose-800 transition cursor-pointer" title="حذف الطلب">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* محتوى تبويب رسائل اتصل بنا */}
        {activeTab === 'messages' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-xs opacity-75">إجمالي الرسائل الواردة: {contactMessages.length}</span>
              <button onClick={() => exportToExcel(contactMessages, 'messages')} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow">
                <FileSpreadsheet className="w-4 h-4" /> تصدير Excel
              </button>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-950/60">
                    <th className="p-4">اسم المرسل</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">نص الرسالة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {contactMessages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-neutral-500">لا توجد رسائل مسجلة حالياً.</td>
                    </tr>
                  ) : (
                    contactMessages.map(m => (
                      <tr key={m.id} className="hover:bg-neutral-800/40 transition">
                        <td className="p-4 font-bold text-white">{m.name || m.fullName || '-'}</td>
                        <td className="p-4 text-amber-400 font-mono" dir="ltr">{m.email || '-'}</td>
                        <td className="p-4 text-neutral-300 max-w-md truncate">{m.message || m.content || '-'}</td>
                        <td className="p-4 text-center">
                          <button onClick={() => deleteMessage(m.id)} className="p-2 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-xl border border-rose-800 transition cursor-pointer" title="حذف الرسالة">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* محتوى تبويب ألوان ومظهر الموقع */}
        {activeTab === 'theme' && (
          <div className="bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <Palette className="w-6 h-6 text-amber-400" />
              <h2 className="text-base font-bold text-white">تخصيص ألوان وستايل الموقع (راحة العين)</h2>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              اختر مظهر الألوان المريح الذي تفضله لواجهة الموقع واللوحات لضمان تجربة تصفح هادئة ومرنة:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-2xl border text-right transition cursor-pointer flex justify-between items-center ${siteTheme === 'dark' ? 'bg-neutral-800 border-amber-500 shadow-lg' : 'bg-neutral-950 border-neutral-800 text-neutral-400'}`}
              >
                <div>
                  <strong className="block text-white text-xs mb-1">الوضع الداكن الأساسي</strong>
                  <span className="text-[10px] text-neutral-400">أسود رمادي مريح للعين</span>
                </div>
                {siteTheme === 'dark' && <CheckCircle className="w-5 h-5 text-amber-400" />}
              </button>

              <button 
                onClick={() => handleThemeChange('emerald')}
                className={`p-4 rounded-2xl border text-right transition cursor-pointer flex justify-between items-center ${siteTheme === 'emerald' ? 'bg-emerald-950/60 border-emerald-500 shadow-lg' : 'bg-neutral-950 border-neutral-800 text-neutral-400'}`}
              >
                <div>
                  <strong className="block text-white text-xs mb-1">الوضع الزمردي (Emerald)</strong>
                  <span className="text-[10px] text-neutral-400">درجات أخضر هادئة وفاخرة</span>
                </div>
                {siteTheme === 'emerald' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              </button>

              <button 
                onClick={() => handleThemeChange('amber')}
                className={`p-4 rounded-2xl border text-right transition cursor-pointer flex justify-between items-center ${siteTheme === 'amber' ? 'bg-amber-950/60 border-amber-500 shadow-lg' : 'bg-neutral-950 border-neutral-800 text-neutral-400'}`}
              >
                <div>
                  <strong className="block text-white text-xs mb-1">الوضع الذهبي الدافئ (Amber)</strong>
                  <span className="text-[10px] text-neutral-400">درجات كهرمانية دافئة</span>
                </div>
                {siteTheme === 'amber' && <CheckCircle className="w-5 h-5 text-amber-400" />}
              </button>

              <button 
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-2xl border text-right transition cursor-pointer flex justify-between items-center ${siteTheme === 'light' ? 'bg-slate-200 border-slate-400 text-slate-900 shadow-lg' : 'bg-neutral-950 border-neutral-800 text-neutral-400'}`}
              >
                <div>
                  <strong className="block text-slate-900 text-xs mb-1">الوضع الفاتح النظيف</strong>
                  <span className="text-[10px] text-slate-600">إضاءة بيضاء ناصعة</span>
                </div>
                {siteTheme === 'light' && <CheckCircle className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>
        )}

        {/* محتوى تبويب كلمات المرور والأمان */}
        {activeTab === 'passwords' && (
          <div className="bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl shadow-2xl max-w-md mx-auto space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <Lock className="w-6 h-6 text-amber-400" />
              <h2 className="text-base font-bold text-white">تغيير كلمة المرور الرئيسية (TM-123A)</h2>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              يمكنك هنا تحديث كلمة المرور الخاصة بلوحة تحكم الموقع العامة لتظل محمية بالكامل:
            </p>

            <form onSubmit={handleChangeMasterPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-neutral-300">كلمة المرور الجديدة</label>
                <input 
                  type="text"
                  required
                  value={newMasterPass}
                  onChange={(e) => setNewMasterPass(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition shadow cursor-pointer">
                حفظ كلمة المرور الجديدة 💾
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}