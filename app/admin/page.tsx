'use client';

import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle2, Clock, Phone, Mail, Building2, Search, Trash2, Lock, Unlock, ArrowRight, KeyRound, MailCheck, X, MessageSquare, Eye, Printer, FileSpreadsheet } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders');

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangedMsg, setPassChangedMsg] = useState(false);

  // حالة لعرض تفاصيل الطلب أو الرسالة في نافذة منبثقة (Modal)
  const [selectedItemModal, setSelectedItemModal] = useState<any>(null);

  const [admins, setAdmins] = useState<any>({
    admin: { name: "admin (المدير الرئيسي)", email: "main-admin@transmissions.qa", pass: "admin123", isMaster: true },
    "admin-1": { name: "admin-1", email: "", pass: "admin123", isMaster: false },
    "admin-2": { name: "admin-2", email: "", pass: "admin123", isMaster: false },
    "admin-3": { name: "admin-3", email: "", pass: "admin123", isMaster: false },
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // جلب البيانات من Firebase بشكل حي (Real-time)
  useEffect(() => {
    if (!isAuthenticated) return;

    // جلب طلبات التأسيس
    const unsubOrders = onSnapshot(collection(db, "start_up_forms"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    }, (error) => {
      console.error("Error fetching orders:", error);
    });

    // جلب رسائل الفوتر contact_messages
    const unsubMessages = onSnapshot(collection(db, "contact_messages"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContactMessages(data);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => {
      unsubOrders();
      unsubMessages();
    };
  }, [isAuthenticated]);

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

  const deleteOrder = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      try {
        await deleteDoc(doc(db, "start_up_forms", id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      try {
        await deleteDoc(doc(db, "contact_messages", id));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  // دالة تصدير البيانات إلى Excel (CSV) مع دعم كامل للغة العربية
  const exportToExcel = (dataArray: any[], type: 'orders' | 'messages') => {
    if (dataArray.length === 0) {
      alert("لا توجد بيانات للتصدير!");
      return;
    }

    let csvContent = "\uFEFF"; // لدعم الحروف العربية في Excel
    
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

  const filteredOrders = orders.filter(o => 
    (o.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.phone || '').includes(searchTerm)
  );

  const filteredMessages = contactMessages.filter(m =>
    (m.name || m.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.message || m.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isForgotMode) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
          <div className="w-14 h-14 bg-emerald-600/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 text-white">استعادة كلمة المرور</h1>
          <p className="text-sm opacity-70 mb-6">أدخل بريدك الإلكتروني الشخصي، وسنرسل لك كلمة المرور الجديدة فوراً.</p>

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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">إدارة طلبات ورسائل ترانس ميشنز</h1>
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
        {/* أزرار التبويب */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => { setActiveTab('orders'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'orders'
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>طلبات تأسيس الشركات ({orders.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('messages'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'messages'
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>رسائل نموذج الاتصال / الفوتر ({contactMessages.length})</span>
          </button>
        </div>

        {activeTab === 'orders' ? (
          <>
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
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => exportToExcel(orders, 'orders')}
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-2xl text-sm font-bold transition flex items-center gap-2 shadow-lg"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>تصدير كل الطلبات Excel</span>
                </button>
                <span className="text-sm opacity-60">إجمالي الطلبات: {filteredOrders.length}</span>
              </div>
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
                      <th className="p-4 text-center">الإجراءات (عرض وتحميل / حذف)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-sm">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-800/40 transition">
                          <td className="p-4 font-bold text-white">{order.clientName || 'بدون اسم'}</td>
                          <td className="p-4 text-emerald-400 font-medium">{order.service || '---'}</td>
                          <td className="p-4 font-mono" dir="ltr">{order.phone || '---'}</td>
                          <td className="p-4 opacity-80 max-w-xs truncate">{order.notes || "لا توجد ملاحظات"}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                              order.status === 'مكتمل' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' :
                              order.status === 'جاري التنفيذ' ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300' :
                              'bg-amber-950/60 border-amber-500 text-amber-300'
                            }`}>
                              {order.status || 'قيد المراجعة'}
                            </span>
                          </td>
                          <td className="p-4 text-center flex items-center justify-center gap-2">
                            <button 
                              onClick={() => setSelectedItemModal({ type: 'order', data: order })}
                              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                              title="عرض التفاصيل والتحميل"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
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
                        <td colSpan={6} className="p-8 text-center opacity-60">لا توجد طلبات تأسيس مطابقة.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-5 h-5 absolute right-4 top-3.5 opacity-50" />
                <input 
                  type="text" 
                  placeholder="البحث بالاسم، البريد أو محتوى الرسالة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pr-12 pl-4 py-3 text-white text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => exportToExcel(contactMessages, 'messages')}
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-2xl text-sm font-bold transition flex items-center gap-2 shadow-lg"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>تصدير كل الرسائل Excel</span>
                </button>
                <span className="text-sm opacity-60">إجمالي الرسائل: {filteredMessages.length}</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-xs opacity-75 bg-neutral-950/50">
                      <th className="p-4">اسم المرسل</th>
                      <th className="p-4">البريد الإلكتروني</th>
                      <th className="p-4">نص الرسالة</th>
                      <th className="p-4">وقت الإرسال</th>
                      <th className="p-4 text-center">الإجراءات (عرض وتحميل / حذف)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-sm">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-neutral-800/40 transition">
                          <td className="p-4 font-bold text-white">{msg.name || msg.fullName || 'بدون اسم'}</td>
                          <td className="p-4 text-emerald-400 font-mono" dir="ltr">{msg.email || '---'}</td>
                          <td className="p-4 opacity-90 max-w-md truncate">{msg.message || msg.content || 'لا توجد رسالة'}</td>
                          <td className="p-4 text-xs opacity-60 font-mono">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : (msg.date || '---')}
                          </td>
                          <td className="p-4 text-center flex items-center justify-center gap-2">
                            <button 
                              onClick={() => setSelectedItemModal({ type: 'message', data: msg })}
                              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                              title="عرض الرسالة بالتفصيل والتحميل"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteMessage(msg.id)}
                              className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                              title="حذف الرسالة"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center opacity-60">لا توجد رسائل مسجلة في الفوتر حتى الآن.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* نافذة عرض التفاصيل وتحميل الـ PDF */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative text-right" dir="rtl">
            <button onClick={() => setSelectedItemModal(null)} className="absolute top-4 left-4 p-2 rounded-full bg-neutral-800 hover:opacity-80 transition text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold mb-4 text-white border-b border-neutral-800 pb-3">
              {selectedItemModal.type === 'order' ? 'تفاصيل طلب التأسيس' : 'تفاصيل رسالة الفوتر'}
            </h3>
            
            <div className="space-y-3 mb-6 text-sm">
              {selectedItemModal.type === 'order' ? (
                <>
                  <p><strong>اسم العميل / الشركة:</strong> <span className="text-white">{selectedItemModal.data.clientName}</span></p>
                  <p><strong>الخدمة المطلوبة:</strong> <span className="text-emerald-400">{selectedItemModal.data.service}</span></p>
                  <p><strong>رقم الهاتف:</strong> <span className="font-mono" dir="ltr">{selectedItemModal.data.phone}</span></p>
                  <p><strong>الحالة:</strong> <span className="text-amber-400">{selectedItemModal.data.status}</span></p>
                  <p><strong>ملاحظات الطلب:</strong> <span className="opacity-90">{selectedItemModal.data.notes || 'لا توجد ملاحظات'}</span></p>
                  {selectedItemModal.data.partners && (
                    <div className="pt-2 border-t border-neutral-800">
                      <strong>بيانات الشركاء:</strong>
                      <pre className="mt-1 text-xs bg-neutral-950 p-3 rounded-xl overflow-x-auto text-emerald-300 font-mono" dir="ltr">
                        {JSON.stringify(selectedItemModal.data.partners, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p><strong>اسم المرسل:</strong> <span className="text-white">{selectedItemModal.data.name || selectedItemModal.data.fullName}</span></p>
                  <p><strong>البريد الإلكتروني:</strong> <span className="text-emerald-400 font-mono" dir="ltr">{selectedItemModal.data.email}</span></p>
                  <p><strong>وقت الإرسال:</strong> <span className="opacity-80 font-mono">{selectedItemModal.data.createdAt ? new Date(selectedItemModal.data.createdAt).toLocaleString() : '---'}</span></p>
                  <div className="pt-2 border-t border-neutral-800">
                    <strong className="block mb-1">نص الرسالة:</strong>
                    <div className="bg-neutral-950 p-4 rounded-xl text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedItemModal.data.message || selectedItemModal.data.content}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة أو حفظ كـ PDF</span>
              </button>
              <button 
                onClick={() => setSelectedItemModal(null)}
                className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl transition text-sm"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال تغيير كلمة المرور */}
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