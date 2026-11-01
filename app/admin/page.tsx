'use client';

import React, { useState } from 'react';
import { Users, FileText, CheckCircle2, Clock, Phone, Mail, Building2, Search, Trash2, Eye } from 'lucide-react';

export default function AdminDashboard() {
  // بيانات تجريبية للطلبات الواردة من العملاء (يمكن ربطها بقاعدة بيانات لاحقاً)
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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 sm:p-10" dir="rtl">
      {/* ترويسة لوحة التحكم */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-emerald-500 tracking-wider">قطر | لوحة الإدارة</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">إدارة طلبات عملاء ترانس ميشنز</h1>
        </div>
        <a href="/" className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-sm font-medium transition">
          العودة للموقع الرئيسي &larr;
        </a>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* إحصائيات سريعة */}
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

        {/* صندوق البحث */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
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

        {/* جدول الطلبات */}
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
                          <option value="قيد المراجعة">قيد المراجعة</option>
                          <option value="جاري التنفيذ">جاري التنفيذ</option>
                          <option value="مكتمل">مكتمل</option>
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
    </div>
  );
}