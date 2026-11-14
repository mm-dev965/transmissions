'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, PlusCircle, Download, Eye, Save, Building, FileText, MessageCircle, Mail } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Transaction {
  id: string;
  nameEn?: string;
  nameAr: string;
  status: 'Done' | 'Working on it' | 'Stuck' | 'Not Started';
  teamNotes: string;
  clientNotes: string;
  attachmentName?: string;
  attachmentUrl?: string;
  renewalDate?: string;
}

interface UploadedFile {
  name: string;
  url: string;
  type: string;
}

interface ClientCompany {
  id: string;
  nameAr: string;
  clientPassword: string;
  generalClientNote?: string;
  clientFiles?: UploadedFile[];
  todoTasks: Transaction[];
  partners?: string;
  activity?: string;
  createdAtDate?: string;
  tradeLicenseExpiry?: string;
  commercialRecordExpiry?: string;
  phone?: string;
  email?: string;
}

export default function AdminPortalPage() {
  const router = useRouter();
  const [companiesList, setCompaniesList] = useState<ClientCompany[]>([]);
  const [currentCompany, setCurrentCompany] = useState<ClientCompany | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadingTaskId, setUploadingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const savedClient = localStorage.getItem('current_client');
    if (!savedClient) {
      router.push('/client-login');
      return;
    }
    fetchCompanies();
  }, [router]);

  const fetchCompanies = async () => {
    try {
      const savedClientStr = localStorage.getItem('current_client');
      let clientData: any = {};
      if (savedClientStr) {
        try { clientData = JSON.parse(savedClientStr); } catch (e) {}
      }
      const targetCompName = (clientData.companyName || clientData.company || '').trim().toLowerCase();

      const querySnapshot = await getDocs(collection(db, "clients"));
      const loaded: ClientCompany[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const compName = data.companyName || data.company || data.nameAr || data.name || '';
        if (compName && compName.trim() !== '' && compName !== 'ADMIN') {
          loaded.push({
            id: docSnap.id,
            nameAr: compName,
            clientPassword: data.password || 'TM-2026',
            generalClientNote: data.generalClientNote || '',
            clientFiles: data.clientFiles || [],
            todoTasks: Array.isArray(data.todoTasks) ? data.todoTasks : [],
            partners: data.partners || 'غير محدد',
            activity: data.activity || 'تجارة عامة وخدمات (قطر)',
            createdAtDate: data.createdAtDate || data.createdAt?.split('T')[0] || '2025-01-01',
            tradeLicenseExpiry: data.tradeLicenseExpiry || '2026-12-01',
            commercialRecordExpiry: data.commercialRecordExpiry || '2026-12-01',
            phone: data.phone || data.clientPhone || '97450080984',
            email: data.email || data.clientEmail || 'info@transmissions.qa'
          });
        }
      });
      setCompaniesList(loaded);

      if (loaded.length > 0) {
        if (targetCompName && targetCompName !== 'admin') {
          const matched = loaded.find(c => c.nameAr.trim().toLowerCase() === targetCompName);
          if (matched) {
            setCurrentCompany(matched);
          } else {
            setCurrentCompany(loaded[0]);
          }
        } else {
          if (!currentCompany) {
            setCurrentCompany(loaded[0]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!currentCompany) return;
    try {
      const docRef = doc(db, "clients", currentCompany.id);
      await updateDoc(docRef, {
        company: currentCompany.nameAr,
        companyName: currentCompany.nameAr,
        generalClientNote: currentCompany.generalClientNote || '',
        clientFiles: currentCompany.clientFiles || [],
        todoTasks: currentCompany.todoTasks || [],
        partners: currentCompany.partners || '',
        activity: currentCompany.activity || '',
        createdAtDate: currentCompany.createdAtDate || '',
        tradeLicenseExpiry: currentCompany.tradeLicenseExpiry || '',
        commercialRecordExpiry: currentCompany.commercialRecordExpiry || '',
        phone: currentCompany.phone || '',
        email: currentCompany.email || ''
      });
      setSuccessMsg("✅ تم حفظ التحديثات بنجاح في قاعدة البيانات!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("حدث خطأ أثناء الحفظ: " + error);
    }
  };

  const handleDeleteCompany = async (companyId: string, companyName: string) => {
    const confirmDelete = window.confirm(`هل أنت متأكد من حذف شركة "${companyName}" نهائياً من قاعدة البيانات؟`);
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "clients", companyId));
      const remaining = companiesList.filter(c => c.id !== companyId);
      setCompaniesList(remaining);
      if (remaining.length > 0) {
        setCurrentCompany(remaining[0]);
      } else {
        setCurrentCompany(null);
      }
      setSuccessMsg("تم حذف الشركة بنجاح!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Error deleting company:", err);
    }
  };

  const addNewCompany = async () => {
    const nameAr = prompt('أدخل اسم الشركة الجديدة بالعربي:');
    if (!nameAr) return;
    const clientPassword = prompt('أدخل كلمة المرور الخاصة بالعميل:') || 'TM-2026';
    const compPhone = prompt('أدخل رقم الواتساب للشركة (مع رمز الدولة):') || '97450080984';
    const compEmail = prompt('أدخل البريد الإلكتروني للشركة:') || 'info@transmissions.qa';

    try {
      const docRef = await addDoc(collection(db, "clients"), {
        company: nameAr,
        companyName: nameAr,
        password: clientPassword,
        phone: compPhone,
        email: compEmail,
        todoTasks: [
          { id: '1', nameAr: 'السجل التجاري', status: 'Not Started', teamNotes: '-', clientNotes: '-', renewalDate: '' },
          { id: '2', nameAr: 'الرخصة التجارية', status: 'Not Started', teamNotes: '-', clientNotes: '-', renewalDate: '' }
        ],
        clientFiles: [],
        partners: 'الشركاء المؤسسون',
        activity: 'تجارة عامة وخدمات',
        createdAtDate: new Date().toISOString().split('T')[0],
        tradeLicenseExpiry: '2026-12-01',
        commercialRecordExpiry: '2026-12-01',
        createdAt: new Date().toISOString()
      });

      const newComp: ClientCompany = {
        id: docRef.id,
        nameAr,
        clientPassword,
        phone: compPhone,
        email: compEmail,
        todoTasks: [
          { id: '1', nameAr: 'السجل التجاري', status: 'Not Started', teamNotes: '-', clientNotes: '-', renewalDate: '' },
          { id: '2', nameAr: 'الرخصة التجارية', status: 'Not Started', teamNotes: '-', clientNotes: '-', renewalDate: '' }
        ],
        clientFiles: [],
        partners: 'الشركاء المؤسسون',
        activity: 'تجارة عامة وخدمات',
        createdAtDate: new Date().toISOString().split('T')[0],
        tradeLicenseExpiry: '2026-12-01',
        commercialRecordExpiry: '2026-12-01'
      };

      setCompaniesList([...companiesList, newComp]);
      setCurrentCompany(newComp);
      setSuccessMsg('تم إضافة الشركة بنجاح!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const addNewTask = () => {
    if (!currentCompany) return;
    const newTask: Transaction = {
      id: Date.now().toString(),
      nameEn: 'New Service',
      nameAr: 'خدمة جديدة / مستند جديد',
      status: 'Not Started',
      teamNotes: '-',
      clientNotes: '-',
      renewalDate: ''
    };
    setCurrentCompany({
      ...currentCompany,
      todoTasks: [...currentCompany.todoTasks, newTask]
    });
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type === 'application/pdf') {
        if (file.size > 900 * 1024) {
          alert("ملف الـ PDF كبير جداً! يرجى رفع ملف أقل من 900 كيلوبايت.");
          reject(new Error("PDF too large"));
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 900;
          const MAX_HEIGHT = 900;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileProcessed = async (file: File, taskId: string) => {
    if (!currentCompany) return;
    setUploadingTaskId(taskId);
    try {
      const base64Url = await compressImage(file);
      const updated = currentCompany.todoTasks.map(task => 
        task.id === taskId ? { ...task, attachmentName: file.name, attachmentUrl: base64Url } : task
      );
      setCurrentCompany({ ...currentCompany, todoTasks: updated });
    } catch (error) {
      console.error("Compression error:", error);
    } finally {
      setUploadingTaskId(null);
    }
  };

  const handleRemoveAttachment = (taskId: string) => {
    if (!currentCompany) return;
    if (confirm("هل أنت متأكد من حذف هذا المرفق؟")) {
      const updated = currentCompany.todoTasks.map(task => 
        task.id === taskId ? { ...task, attachmentName: '', attachmentUrl: '' } : task
      );
      setCurrentCompany({ ...currentCompany, todoTasks: updated });
    }
  };

  const handleSingleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open(fileUrl, '_blank');
    }
  };

  const handlePreviewFile = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (error) {
      window.open(fileUrl, '_blank');
    }
  };

  const handleBatchDownloadZip = async () => {
    if (!currentCompany) return;
    const zip = new JSZip();
    const folder = zip.folder(currentCompany.nameAr || "company_documents");

    let count = 0;
    for (const task of currentCompany.todoTasks) {
      if (task.attachmentUrl) {
        try {
          const resp = await fetch(task.attachmentUrl);
          const blob = await resp.blob();
          folder?.file(task.attachmentName || `${task.nameAr}.pdf`, blob);
          count++;
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (count === 0) {
      alert("لا توجد مستندات مرفقة للتصدير.");
      return;
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${currentCompany.nameAr}_documents.zip`);
  };

  const whatsappMsg = encodeURIComponent("ترانس ميشنز ترحب بكم , تم التعديل علي طلبك لدينا وتحديث الحالة من فضلك إلقاء نظرة عليه");
  const whatsappUrl = currentCompany?.phone ? `https://wa.me/${currentCompany.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}` : '#';
  const emailSubject = encodeURIComponent("تحديث حالة طلبك لدى شركة ترانس ميشنز");
  const emailBody = encodeURIComponent("ترانس ميشنز ترحب بكم,\n\nتم التعديل علي طلبك لدينا وتحديث الحالة من فضلك إلقاء نظرة عليه.\n\nمع تحيات فريق ترانس ميشنز للتجارة والخدمات.");
  const emailUrl = currentCompany?.email ? `mailto:${currentCompany.email}?subject=${emailSubject}&body=${emailBody}` : '#';

  return (
    <div className="min-h-screen bg-[#111214] text-white p-6 md:p-10 font-sans" dir="rtl">
      {successMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-bold animate-bounce">
          {successMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-neutral-800 pb-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 text-black font-bold p-2.5 rounded-xl text-lg">⚡</div>
          <div>
            <h1 className="text-xl font-bold text-white">لوحة تحكم الأدمن المركزية (Admin Master Control)</h1>
            <p className="text-xs text-neutral-400">إدارة الشركات، استعراض المستندات، وتعديل الخدمات مباشرة</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/client-login')}
            className="bg-neutral-800 hover:bg-neutral-700 text-rose-300 px-4 py-2 rounded-xl text-xs font-bold transition border border-neutral-700 cursor-pointer"
          >
            تسجيل خروج 🚪
          </button>
        </div>
      </div>

      <div className="bg-[#18191c] border border-neutral-800 p-4 rounded-2xl mb-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-amber-400 font-bold whitespace-nowrap text-xs">🔄 التنقل السريع بين الشركات:</span>
          <select 
            value={currentCompany?.id || ''}
            onChange={(e) => {
              const found = companiesList.find(c => c.id === e.target.value);
              if (found) setCurrentCompany(found);
            }}
            className="bg-[#2b2d31] text-white border border-amber-500/50 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none w-full md:w-80 cursor-pointer"
          >
            {companiesList.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.nameAr}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          <button 
            onClick={addNewCompany}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ إضافة شركة جديدة</span>
          </button>

          {currentCompany && (
            <button 
              onClick={() => handleDeleteCompany(currentCompany.id, currentCompany.nameAr)}
              className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 px-3 py-2 rounded-xl text-xs font-bold transition border border-rose-800 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>حذف هذه الشركة</span>
            </button>
          )}
        </div>
      </div>

      {currentCompany ? (
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-3 gap-3">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-amber-500/20">الملف التعريفي للشركة</span>
                <input 
                  type="text"
                  value={currentCompany.nameAr}
                  onChange={e => setCurrentCompany({ ...currentCompany, nameAr: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-base font-bold text-white mt-1 w-full md:w-80"
                />
              </div>

              {/* أزرار التواصل المباشر (واتساب وإيميل) */}
              <div className="flex flex-wrap items-center gap-2">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                  title="إرسال رسالة واتساب للشركة بتحديث الحالة"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب مباشر 💬</span>
                </a>

                <a 
                  href={emailUrl}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                  title="إرسال بريد إلكتروني للشركة بتحديث الحالة"
                >
                  <Mail className="w-4 h-4" />
                  <span>إرسال إيميل ✉️</span>
                </a>

                <button 
                  onClick={handleBatchDownloadZip}
                  className="bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-neutral-700 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>ZIP 📦</span>
                </button>

                <button 
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التحديثات 🔄</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">الشركاء / الملاك:</span>
                <input 
                  type="text" 
                  value={currentCompany.partners || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, partners: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                />
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">النشاط التجاري:</span>
                <input 
                  type="text" 
                  value={currentCompany.activity || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, activity: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                />
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">رقم الهاتف (واتساب):</span>
                <input 
                  type="text" 
                  value={currentCompany.phone || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, phone: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full font-mono"
                  dir="ltr"
                />
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">البريد الإلكتروني:</span>
                <input 
                  type="text" 
                  value={currentCompany.email || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, email: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full font-mono"
                  dir="ltr"
                />
              </div>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">تاريخ التأسيس:</span>
                <input 
                  type="date" 
                  value={currentCompany.createdAtDate || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, createdAtDate: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#18191c] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
            <div className="bg-[#202225] px-4 py-3 font-bold text-sm text-amber-400 flex justify-between items-center border-b border-neutral-800">
              <span>📋 جدول خدمات ومستندات شركة: {currentCompany.nameAr}</span>
              <button onClick={addNewTask} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer">
                + إضافة خدمة / مستند جديد
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#151618] text-neutral-400 border-b border-neutral-800">
                  <tr>
                    <th className="p-3.5">اسم الخدمة / المستند</th>
                    <th className="p-3.5">الملف المرفق</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">ملاحظات الفريق</th>
                    <th className="p-3.5">ملاحظات العميل</th>
                    <th className="p-3.5">موعد التجديد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {currentCompany.todoTasks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-neutral-400">لا توجد خدمات مسجلة لهذه الشركة.</td>
                    </tr>
                  ) : (
                    currentCompany.todoTasks.map((t) => (
                      <tr key={t.id} className="hover:bg-neutral-800/40 transition">
                        <td className="p-3.5 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={t.nameAr}
                              onChange={(e) => {
                                const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, nameAr: e.target.value } : task);
                                setCurrentCompany({ ...currentCompany, todoTasks: updated });
                              }}
                              className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                            />
                            <button 
                              onClick={() => {
                                if (confirm("حذف هذه الخدمة؟")) {
                                  setCurrentCompany({ ...currentCompany, todoTasks: currentCompany.todoTasks.filter(x => x.id !== t.id) });
                                }
                              }}
                              className="text-rose-400 bg-rose-950/40 px-2 py-1 rounded text-[10px] border border-rose-800/50 cursor-pointer"
                            >
                              حذف
                            </button>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                              {t.attachmentUrl ? (
                                <>
                                  <button onClick={() => handleSingleDownload(t.attachmentUrl!, t.attachmentName || 'document')} className="bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/40 cursor-pointer">تحميل</button>
                                  <button onClick={() => handlePreviewFile(t.attachmentUrl!)} className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded text-[10px] font-bold border border-neutral-700 cursor-pointer">معاينة</button>
                                  <button onClick={() => handleRemoveAttachment(t.id)} className="bg-rose-950 text-rose-300 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-800 cursor-pointer">حذف</button>
                                </>
                              ) : (
                                <span className="text-neutral-500 text-[10px]">لا يوجد مرفق</span>
                              )}
                            </div>
                            <label className="text-[10px] text-amber-400 cursor-pointer inline-block bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded border border-neutral-700 font-bold text-center">
                              <span>{uploadingTaskId === t.id ? 'جاري الضغط...' : (t.attachmentUrl ? 'استبدال 🔄' : 'رفع ملف ➕')}</span>
                              <input 
                                type="file" 
                                accept="image/png,image/gif,image/jpeg,application/pdf"
                                disabled={uploadingTaskId === t.id}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileProcessed(file, t.id);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <select 
                            value={t.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as any;
                              const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, status: newStatus } : task);
                              setCurrentCompany({ ...currentCompany, todoTasks: updated });
                            }}
                            className={`border rounded px-2.5 py-1.5 text-xs font-bold cursor-pointer ${
                              t.status === 'Done' ? 'bg-emerald-950 text-emerald-300 border-emerald-600' :
                              t.status === 'Working on it' ? 'bg-blue-950 text-blue-300 border-blue-600' :
                              t.status === 'Stuck' ? 'bg-rose-950 text-rose-300 border-rose-600' :
                              'bg-amber-950 text-amber-300 border-amber-600'
                            }`}
                          >
                            <option value="Not Started" className="bg-neutral-900 text-amber-300">Not Started</option>
                            <option value="Working on it" className="bg-neutral-900 text-blue-300">Working on it</option>
                            <option value="Stuck" className="bg-neutral-900 text-rose-300">Stuck</option>
                            <option value="Done" className="bg-neutral-900 text-emerald-300">Done</option>
                          </select>
                        </td>

                        <td className="p-3.5 text-neutral-300">
                          <input 
                            type="text" 
                            value={t.teamNotes}
                            onChange={(e) => {
                              const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, teamNotes: e.target.value } : task);
                              setCurrentCompany({ ...currentCompany, todoTasks: updated });
                            }}
                            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                          />
                        </td>

                        <td className="p-3.5 text-neutral-400">
                          <input 
                            type="text" 
                            value={t.clientNotes}
                            onChange={(e) => {
                              const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, clientNotes: e.target.value } : task);
                              setCurrentCompany({ ...currentCompany, todoTasks: updated });
                            }}
                            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                          />
                        </td>

                        <td className="p-3.5">
                          <input 
                            type="date" 
                            value={t.renewalDate || ''}
                            onChange={(e) => {
                              const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, renewalDate: e.target.value } : task);
                              setCurrentCompany({ ...currentCompany, todoTasks: updated });
                            }}
                            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white font-mono"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">لا توجد شركات مسجلة حالياً.</div>
      )}
    </div>
  );
}