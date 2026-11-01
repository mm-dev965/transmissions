'use client';

import React, { useState } from 'react';
import { Users, FileText, CheckCircle2, Clock, Phone, Mail, Building2, Search, Trash2, Lock, Unlock, ArrowRight, KeyRound, MailCheck, X } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangedMsg, setPassChangedMsg] = useState(false);

  const [admins, setAdmins] = useState<any>({
    admin: { name: "admin (المدير الرئيسي)", email: "main-admin@transmissions.qa", pass: "admin123", isMaster: true },
    "admin-1": { name: "admin-1", email: "", pass: "admin123", isMaster: false },
    "admin-2": { name: "admin-2", email: "", pass: "admin123", isMaster: false },
    "admin-3": { name: "admin-3", email: "", pass: "admin123", isMaster: false },
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      clientName: "شركة الأفق للتجارة",
      service: "تأسيس الشركات وتعديلها (MOCI)",
      phone: "+974 55123456",
      notes: "نحتاج تعديل أنشطة الشركة وإضافة شريك جديد.",
      status: "قيد المراجعة",
      date: "2026-11-01"
    },
    {
      id: 2,
      clientName: "محمد المري",
      service: "معاملات وزارة العدل (MOJ)",
      phone: "+974 50987654",
      notes: "توثيق عقد تأسيس وتوكيل خاص.",
      status: "جاري التنفيذ",
      date: "2026-11-01"
    },
    {
      id: 3,
      clientName: "مؤسسة الدوحة التقنية",
      service: "الترجمة المعتمدة",
      phone: "+974 33445566",
      notes: "ترجمة عقود قانونية للغة الإنجليزية.",
      status: "مكتمل",
      date: "2026-10-31"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (admins[selectedAdmin] && admins[selectedAdmin].pass === password) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryEmail.trim()) {
      setRecoverySent(true);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPass === admins[selectedAdmin].pass) {
      setAdmins({
        ...admins,
        [selectedAdmin]: { ...admins[selectedAdmin], pass: newPass }
      });
      setPassChangedMsg(true);
      setTimeout(() => {
        setPassChangedMsg(false);
        setShowChangePassModal(false);
        setCurrentPass('');
        setNewPass('');
      }, 2000);
    } else {
      alert("كلمة المرور الحالية غير صحيحة!");
    }
  };

  const updateStatus = (id: number, newStatus: string) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const deleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const filteredOrders = orders.filter(o => 
    o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm)
  );

  if (isForgotMode) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
          <div className="w-14 h-14 bg-emerald-600/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 text-white">استعادة كلمة المرور</h1>
          <p className="text-sm opacity-70 mb-6">أدخل بريدك الإلكتروني الشخصي، وسنرسل لك كلمة المرور الجديدة أو رابط إعادة التعيين فوراً.</p>

          {recoverySent ? (
            <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-4 rounded-2xl text-sm font-medium mb-4">
              تم إرسال بيانات استعادة كلمة المرور بنجاح إلى بريدك الشخصي ({recoveryEmail})!
            </div>
          ) : (
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <input 
                type="email"
                placeholder="أدخل بريدك الإلكتروني الشخصي"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
                required
              />
              <button 
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition text-sm"
              >
                إرسال بيانات الاستعادة
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <button onClick={() => { setIsForgotMode(false); setRecoverySent(false); setRecoveryEmail(''); }} className="text-xs opacity-70 hover:opacity-100 transition">
              &larr; العودة لتسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
          <div className="w-14 h-14 bg-emerald-600/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 text-white">بوابة الإدارة الآمنة</h1>
          <p className="text-sm opacity-70 mb-6">اختر حساب الأدمن وأدخل كلمة المرور للمتابعة.</p>

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold mb-1.5 opacity-80">اختر حساب الأدمن</label>
              <select 
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="admin">admin (المدير الرئيسي)</option>
                <option value="admin-1">admin-1</option>
                <option value="admin-2">admin-2</option>
                <option value="admin-3">admin-3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 opacity-80">كلمة المرور</label>
              <input 
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 font-medium text-center">كلمة المرور غير صحيحة لهذا الحساب!</p>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition text-sm mt-2"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800 flex justify-between items-center text-xs">
            <button onClick={() => setIsForgotMode(true)} className="text-emerald-400 hover:underline">
              نسيت كلمة المرور؟
            </button>
            <a href="/" className="opacity-70 hover:opacity-100 transition">
              &larr; الموقع الرئيسي
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 sm:p-10" dir="rtl">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-emerald-500 tracking-wider">
            قطر | تم تسجيل الدخول بـ ({admins[selectedAdmin].name}) {admins[selectedAdmin].isMaster ? "⭐ [مدير عام]" : ""}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">إدارة طلبات عملاء ترانس ميشنز</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => setShowChangePassModal(true)}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-sm font-medium transition flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-emerald-500" />
            <span>تغيير كلمة المرور</span>
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-sm font-medium transition"
          >
            تسجيل الخروج
          </button>
          <a href="/" className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-sm font-medium transition">
            الموقع &larr;
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-70">قيد المراجعة</p>
              <h3 className="text-2xl font-bold mt-1">{orders.filter(o => o.status === 'قيد المراجعة').length}</h3>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-70">جاري التنفيذ</p>
              <h3 className="text-2xl font-bold mt-1">{orders.filter(o => o.status === 'جاري التنفيذ').length}</h3>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-70">الطلبات المكتملة</p>
              <h3 className="text-2xl font-bold mt-1">{orders.filter(o => o.status === 'مكتمل').length}</h3>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 absolute right-4 top-3.5 opacity-50" />
            <input 
              type="text" 
              placeholder="البحث باسم العميل، الخدمة أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pr-12 pl-4 py-3 text-white text-sm focus:outline-none"
            />
          </div>
          <span className="text-sm opacity-60">إجمالي الطلبات: {filteredOrders.length}</span>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-xs opacity-75 bg-neutral-950/50">
                  <th className="p-4">اسم العميل / الشركة</th>
                  <th className="p-4">الخدمة المطلوبة</th>
                  <th className="p-4">رقم الهاتف</th>
                  <th className="p-4">ملاحظات الطلب</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-sm">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-800/40 transition">
                      <td className="p-4 font-bold text-white">{order.clientName}</td>
                      <td className="p-4 text-emerald-400 font-medium">{order.service}</td>
                      <td className="p-4 font-mono" dir="ltr">{order.phone}</td>
                      <td className="p-4 opacity-80 max-w-xs truncate">{order.notes || "لا توجد ملاحظات"}</td>
                      <td className="p-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                            order.status === 'مكتمل' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' :
                            order.status === 'جاري التنفيذ' ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300' :
                            'bg-amber-950/60 border-amber-500 text-amber-300'
                          }`}
                        >
                          <option value="قيد المراجعة" className="bg-neutral-900 text-white">قيد المراجعة</option>
                          <option value="جاري التنفيذ" className="bg-neutral-900 text-white">جاري التنفيذ</option>
                          <option value="مكتمل" className="bg-neutral-900 text-white">مكتمل</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => deleteOrder(order.id)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                          title="حذف الطلب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center opacity-60">لا توجد طلبات مطابقة للبحث.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showChangePassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-md w-full shadow-2xl relative" dir="rtl">
            <button onClick={() => setShowChangePassModal(false)} className="absolute top-4 left-4 p-2 rounded-full bg-neutral-800 hover:opacity-80 transition">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold mb-4 text-white">تغيير كلمة المرور للحساب الحالي</h3>
            
            {passChangedMsg ? (
              <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-4 rounded-2xl text-sm font-medium text-center">
                تم تغيير كلمة المرور بنجاح!
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-bold mb-1.5 opacity-80">كلمة المرور الحالية</label>
                  <input 
                    type="password"
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 opacity-80">كلمة المرور الجديدة</label>
                  <input 
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition text-sm mt-2"
                >
                  حفظ كلمة المرور الجديدة
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}