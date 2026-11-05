'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, FileText, CheckCircle2, Clock, Trash2, Lock, KeyRound, X, MessageSquare, Eye, FileSpreadsheet, Plus, Layers } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc, updateDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'messages' | 'portalTasks'>('orders');
  
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangedMsg, setPassChangedMsg] = useState(false);

  const [selectedItemModal, setSelectedItemModal] = useState<any>(null);
  const [admins, setAdmins] = useState<any>({
    admin: { name: "admin (المدير الرئيسي)", email: "main-admin@transmissions.qa", pass: "admin123", isMaster: true },
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskNameAr, setNewTaskNameAr] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('working');
  const [newTaskPriority, setNewTaskPriority] = useState('high');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskNotes, setNewTaskNotes] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubOrders = onSnapshot(collection(db, "start_up_forms"), (snapshot) => {
      setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubMessages = onSnapshot(collection(db, "contact_messages"), (snapshot) => {
      setContactMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const fetchClientsList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const clientsList = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setClients(clientsList);
        if (clientsList.length > 0) {
          setSelectedClient(clientsList[0]);
          fetchTasks(clientsList[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchClientsList();

    return () => {
      unsubOrders();
      unsubMessages();
    };
  }, [isAuthenticated]);

  const fetchTasks = async (clientId: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, `clients/${clientId}/tasks`));
      setTasks(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectClient = (client: any) => {
    setSelectedClient(client);
    fetchTasks(client.id);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    try {
      const taskData = {
        nameAr: newTaskNameAr,
        nameEn: newTaskNameAr,
        status: newTaskStatus,
        priority: newTaskPriority,
        dueDate: newTaskDueDate || "TBD",
        notes: newTaskNotes || "-",
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, `clients/${selectedClient.id}/tasks`), taskData);
      setTasks([...tasks, { id: docRef.id, ...taskData }]);
      setNewTaskNameAr('');
      setNewTaskDueDate('');
      setNewTaskNotes('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: string) => {
    if (!selectedClient) return;
    try {
      await updateDoc(doc(db, `clients/${selectedClient.id}/tasks`, taskId), { status: newStatus });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!selectedClient) return;
    if (confirm("هل أنت متأكد من حذف هذه المعاملة؟")) {
      try {
        await deleteDoc(doc(db, `clients/${selectedClient.id}/tasks`, taskId));
        setTasks(tasks.filter(t => t.id !== taskId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (admins[selectedAdmin] && admins[selectedAdmin].pass === password) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const deleteOrder = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      await deleteDoc(doc(db, "start_up_forms", id));
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      await deleteDoc(doc(db, "contact_messages", id));
    }
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
          <div className="w-14 h-14 bg-emerald-600/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 text-white">بوابة الإدارة الآمنة</h1>
          <p className="text-sm opacity-70 mb-6">أدخل كلمة المرور للمتابعة (admin123).</p>

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold mb-1.5 opacity-80">كلمة المرور</label>
              <input 
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            {loginError && <p className="text-xs text-rose-400 text-center">كلمة المرور غير صحيحة!</p>}
            <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition text-sm">
              تسجيل الدخول
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-neutral-800 text-xs">
            <a href="/" className="opacity-70 hover:opacity-100">&larr; الموقع الرئيسي</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 sm:p-10" dir="rtl">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-emerald-500">لوحة تحكم ترانس ميشنز</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">إدارة الطلبات ورسائل ومعاملات البورتال</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/client-portal')} className="px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500 text-sm font-bold">
            بورتال العملاء
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-sm">
            خروج
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 rounded-2xl font-bold text-sm border ${activeTab === 'orders' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}>
            طلبات التأسيس ({orders.length})
          </button>
          <button onClick={() => setActiveTab('messages')} className={`px-6 py-3 rounded-2xl font-bold text-sm border ${activeTab === 'messages' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}>
            رسائل الاتصال ({contactMessages.length})
          </button>
          <button onClick={() => setActiveTab('portalTasks')} className={`px-6 py-3 rounded-2xl font-bold text-sm border ${activeTab === 'portalTasks' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}>
            إدارة معاملات البورتال (Monday Style)
          </button>
        </div>

        {activeTab === 'orders' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm opacity-70">إجمالي الطلبات: {orders.length}</span>
              <button onClick={() => exportToExcel(orders, 'orders')} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> تصدير Excel
              </button>
            </div>
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-xs opacity-75 bg-neutral-950/50">
                    <th className="p-4">اسم العميل</th>
                    <th className="p-4">الخدمة</th>
                    <th className="p-4">الهاتف</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-sm">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-neutral-800/40">
                      <td className="p-4 font-bold">{o.clientName}</td>
                      <td className="p-4 text-emerald-400">{o.service}</td>
                      <td className="p-4 font-mono" dir="ltr">{o.phone}</td>
                      <td className="p-4">{o.status || 'قيد المراجعة'}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => deleteOrder(o.id)} className="p-2 bg-rose-500/10 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm opacity-70">إجمالي الرسائل: {contactMessages.length}</span>
              <button onClick={() => exportToExcel(contactMessages, 'messages')} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> تصدير Excel
              </button>
            </div>
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-xs opacity-75 bg-neutral-950/50">
                    <th className="p-4">المرسل</th>
                    <th className="p-4">البريد</th>
                    <th className="p-4">الرسالة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-sm">
                  {contactMessages.map(m => (
                    <tr key={m.id} className="hover:bg-neutral-800/40">
                      <td className="p-4 font-bold">{m.name || m.fullName}</td>
                      <td className="p-4 text-emerald-400 font-mono" dir="ltr">{m.email}</td>
                      <td className="p-4 opacity-90 truncate max-w-xs">{m.message || m.content}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => deleteMessage(m.id)} className="p-2 bg-rose-500/10 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'portalTasks' && (
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-80 bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl space-y-4 shadow-xl">
              <h2 className="text-sm font-bold text-emerald-400 uppercase">الشركات المسجلة بالبورتال</h2>
              <div className="space-y-2">
                {clients.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectClient(c)}
                    className={`w-full text-right p-3 rounded-xl border text-xs sm:text-sm ${selectedClient?.id === c.id ? 'bg-emerald-600/20 border-emerald-500 font-bold' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}
                  >
                    <div>{c.companyName}</div>
                    <div className="text-[10px] text-emerald-300 font-mono">{c.email}</div>
                  </button>
                ))}
              </div>
            </aside>

            <main className="flex-1 space-y-6">
              {selectedClient ? (
                <>
                  <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl shadow-xl flex justify-between items-center">
                    <div>
                      <span className="text-xs text-emerald-400 font-bold">إدارة معاملات شركة:</span>
                      <h2 className="text-xl font-extrabold text-white">{selectedClient.companyName}</h2>
                    </div>
                  </div>

                  <form onSubmit={handleAddTask} className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl shadow-xl space-y-4">
                    <h3 className="text-sm font-bold text-white">إضافة معاملة جديدة للشركة</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        placeholder="اسم المعاملة بالعربي" 
                        required
                        value={newTaskNameAr}
                        onChange={(e) => setNewTaskNameAr(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                      <input 
                        type="text" 
                        placeholder="الموعد النهائي (مثال: Feb 26)" 
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                      <select 
                        value={newTaskStatus}
                        onChange={(e) => setNewTaskStatus(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                      >
                        <option value="working">قيد الإجراء</option>
                        <option value="done">مكتمل</option>
                        <option value="stuck">عالق</option>
                        <option value="notStarted">قيد الانتظار</option>
                      </select>
                    </div>
                    <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">
                      إضافة المعاملة
                    </button>
                  </form>

                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl shadow-xl overflow-hidden">
                    <table className="w-full text-start border-collapse text-xs">
                      <thead>
                        <tr className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                          <th className="py-3 px-4 text-start">المعاملة</th>
                          <th className="py-3 px-4 text-center">الحالة</th>
                          <th className="py-3 px-4 text-center">الموعد</th>
                          <th className="py-3 px-4 text-center">حذف</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {tasks.map(t => (
                          <tr key={t.id} className="hover:bg-neutral-800/40">
                            <td className="py-3 px-4 font-bold">{t.nameAr}</td>
                            <td className="py-3 px-4 text-center">
                              <select 
                                value={t.status}
                                onChange={(e) => handleUpdateStatus(t.id, e.target.value)}
                                className="bg-neutral-800 text-white text-xs rounded-lg px-2 py-1"
                              >
                                <option value="working">قيد الإجراء</option>
                                <option value="done">مكتمل</option>
                                <option value="stuck">عالق</option>
                                <option value="notStarted">قيد الانتظار</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-center font-mono">{t.dueDate}</td>
                            <td className="py-3 px-4 text-center">
                              <button onClick={() => handleDeleteTask(t.id)} className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500 hover:text-white">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center py-20 opacity-60">اختر شركة لعرض معاملاتها.</div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}