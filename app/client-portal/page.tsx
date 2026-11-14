'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Transaction {
  id: string;
  nameEn: string;
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
  nameEn: string;
  clientPassword: string;
  generalClientNote?: string;
  clientFiles?: UploadedFile[];
  todoTasks: Transaction[];
  partners?: string;
  activity?: string;
  createdAtDate?: string;
  tradeLicenseExpiry?: string;
  commercialRecordExpiry?: string;
}

export default function ClientPortalPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingTaskId, setUploadingTaskId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const [newServiceName, setNewServiceName] = useState('');

  const [currentCompany, setCurrentCompany] = useState<ClientCompany>({
    id: '',
    nameAr: 'جاري التحميل...',
    nameEn: 'Loading...',
    clientPassword: '',
    generalClientNote: '',
    clientFiles: [],
    todoTasks: [],
    partners: '',
    activity: '',
    createdAtDate: '',
    tradeLicenseExpiry: '',
    commercialRecordExpiry: ''
  });

  const t = {
    ar: {
      adminBadge: "🔒 لوحة تحكم المشرف (Admin Management View)",
      companyPortal: "إدارة معاملات شركة:",
      logout: "رجوع / تسجيل خروج 🚪",
      exportZip: "تصدير كافة المستندات (ZIP) 📦",
      profileTitle: "الملف التعريفي للشركة (C.R. 210470 - QATAR)",
      partners: "الشركاء / الملاك:",
      activity: "النشاط التجاري:",
      createdAt: "تاريخ تأسيس الشركة:",
      tradeExpiry: "انتهاء الرخصة التجارية ودرجة الخطورة:",
      commercialExpiry: "انتهاء السجل التجاري ودرجة الخطورة:",
      tableTitle: "جدول الخدمات ومستندات الشركة (تحكم إداري كامل) 🟢",
      servicesCount: "خدمات مسجلة",
      thService: "اسم الخدمة / المستند",
      thFile: "الملف المرفق",
      thStatus: "Status",
      thTeamNotes: "ملاحظات الفريق",
      thClientNotes: "ملاحظات العميل",
      thRenewal: "موعد التجديد (الحالة)",
      downloadFile: "تحميل 📥",
      preview: "معاينة 👁️",
      removeFile: "حذف ❌",
      deleteService: "حذف 🗑️",
      noFile: "لا يوجد مرفق",
      uploadNew: "رفع ملف (< 1MB) ➕",
      uploading: "جاري الضغط...",
      replaceFile: "استبدال 🔄",
      fileSizeHint: "الحد الأقصى 1 ميجا",
      noServices: "لا توجد خدمات مسجلة حالياً.",
      notSpecified: "غير محدد",
      generalActivity: "تجارة عامة وخدمات",
      savedSuccess: "تم حفظ التحديثات وحالة الخدمات وملاحظات الفريق بنجاح!",
      noFilesAlert: "لا توجد مستندات مرفقة للتصدير.",
      saveChanges: "حفظ التحديثات والمستندات 💾",
      saving: "جاري الحفظ...",
      addNewServiceTitle: "إضافة خدمة أو مستند جديد ➕",
      serviceNamePlaceholder: "اكتب اسم الخدمة الجديدة...",
      addServiceBtn: "إضافة للجدول",
      emptyServiceAlert: "يرجى كتابة اسم الخدمة أولاً."
    },
    en: {
      adminBadge: "🔒 Admin Management View",
      companyPortal: "Managing Company Transactions:",
      logout: "Back / Logout 🚪",
      exportZip: "Export All Documents (ZIP) 📦",
      profileTitle: "Company Profile (C.R. 210470 - QATAR)",
      partners: "Partners / Owners:",
      activity: "Commercial Activity:",
      createdAt: "Establishment Date:",
      tradeExpiry: "Trade License Expiry & Risk Level:",
      commercialExpiry: "Commercial Record Expiry & Risk Level:",
      tableTitle: "Company Services & Documents (Full Admin Control) 🟢",
      servicesCount: "Registered Services",
      thService: "Service Name / Document",
      thFile: "Attached File",
      thStatus: "Status",
      thTeamNotes: "Team Notes",
      thClientNotes: "Client Notes",
      thRenewal: "Renewal Date",
      downloadFile: "Download 📥",
      preview: "Preview 👁️",
      removeFile: "Remove ❌",
      deleteService: "Delete 🗑️",
      noFile: "No attachment",
      uploadNew: "Upload (< 1MB) ➕",
      uploading: "Compressing...",
      replaceFile: "Replace 🔄",
      fileSizeHint: "Max size 1MB",
      noServices: "No services registered currently.",
      notSpecified: "Not specified",
      generalActivity: "General Trading & Services",
      savedSuccess: "Changes, status and team notes saved successfully!",
      noFilesAlert: "No attachments found to export.",
      saveChanges: "Save Changes & Documents 💾",
      saving: "Saving...",
      addNewServiceTitle: "Add New Service or Document ➕",
      serviceNamePlaceholder: "Enter new service name...",
      addServiceBtn: "Add to Table",
      emptyServiceAlert: "Please enter the new service name first."
    }
  };

  const currentT = t[isEnglish ? 'en' : 'ar'];

  useEffect(() => {
    const adminModeFlag = localStorage.getItem('is_admin_view') === 'true';
    setIsAdminMode(adminModeFlag);

    const savedClient = localStorage.getItem('current_client');
    if (!savedClient) {
      router.push('/client-login');
      return;
    }

    let clientData: any = {};
    try {
      clientData = JSON.parse(savedClient);
    } catch (e) {
      router.push('/client-login');
      return;
    }

    const fetchCompanyData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        let foundCompany: ClientCompany | null = null;
        const targetComp = (clientData.company || clientData.companyName || '').trim().toLowerCase();

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const compName = (data.company || data.companyName || data.nameAr || data.name || '').trim().toLowerCase();
          
          if (targetComp && compName === targetComp) {
            const rawTasks = data.todoTasks || [];
            const sanitizedFetchedTasks = Array.isArray(rawTasks) ? rawTasks.map((t: any) => ({
              id: String(t.id || 'task_' + Math.random()),
              nameEn: String(t.nameEn || ''),
              nameAr: String(t.nameAr || ''),
              status: (t.status || 'Not Started') as any,
              teamNotes: String(t.teamNotes || ''),
              clientNotes: String(t.clientNotes || ''),
              attachmentName: t.attachmentName ? String(t.attachmentName) : '',
              attachmentUrl: t.attachmentUrl ? String(t.attachmentUrl) : '',
              renewalDate: t.renewalDate || t.dueDate ? String(t.renewalDate || t.dueDate) : ''
            })) : [];

            foundCompany = {
              id: docSnap.id,
              nameAr: data.companyName || data.company || data.nameAr || data.name || '',
              nameEn: data.companyName || data.company || data.nameAr || data.name || '',
              clientPassword: data.password || '',
              generalClientNote: data.generalClientNote || '',
              clientFiles: data.clientFiles || [],
              todoTasks: sanitizedFetchedTasks,
              partners: data.partners || 'غير محدد',
              activity: data.activity || 'تجارة عامة وخدمات (قطر)',
              createdAtDate: data.createdAt ? data.createdAt.split('T')[0] : '2025-01-01',
              tradeLicenseExpiry: data.tradeLicenseExpiry || '2026-12-01',
              commercialRecordExpiry: data.commercialRecordExpiry || '2026-12-01'
            };
          }
        });

        if (foundCompany) {
          setCurrentCompany(foundCompany);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('current_client');
    localStorage.removeItem('is_admin_view');
    router.push('/client-login');
  };

  const handleDeleteService = (taskId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      const updatedTasks = currentCompany.todoTasks.filter(task => task.id !== taskId);
      setCurrentCompany({ ...currentCompany, todoTasks: updatedTasks });
    }
  };

  const handleRemoveAttachment = (taskId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المرفق؟")) {
      const updatedTasks = currentCompany.todoTasks.map(task => 
        task.id === taskId ? { ...task, attachmentName: '', attachmentUrl: '' } : task
      );
      setCurrentCompany({ ...currentCompany, todoTasks: updatedTasks });
    }
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

  const handleSaveClientChanges = async () => {
    if (!currentCompany.id) {
      alert("خطأ: لم يتم التعرف على معرف الشركة في قاعدة البيانات.");
      return;
    }

    setIsSaving(true);
    try {
      const sanitizedTasks = currentCompany.todoTasks.map(task => ({
        id: String(task.id || 'task_' + Date.now()),
        nameAr: String(task.nameAr || ''),
        nameEn: String(task.nameEn || ''),
        status: String(task.status || 'Not Started'),
        teamNotes: String(task.teamNotes || ''),
        clientNotes: String(task.clientNotes || ''),
        attachmentName: task.attachmentName ? String(task.attachmentName) : "",
        attachmentUrl: task.attachmentUrl ? String(task.attachmentUrl) : "",
        renewalDate: task.renewalDate ? String(task.renewalDate) : "",
        dueDate: task.renewalDate ? String(task.renewalDate) : ""
      }));

      const finalTasks = JSON.parse(JSON.stringify(sanitizedTasks));

      const docRef = doc(db, "clients", currentCompany.id);
      await updateDoc(docRef, {
        todoTasks: finalTasks
      });
      
      setSuccessMessage(currentT.savedSuccess);
      setTimeout(() => setSuccessMessage(''), 3500);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("حدث خطأ أثناء الحفظ: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNewService = () => {
    if (!newServiceName.trim()) {
      alert(currentT.emptyServiceAlert);
      return;
    }

    const newTask: Transaction = {
      id: 'task_' + Date.now(),
      nameAr: newServiceName.trim(),
      nameEn: newServiceName.trim(),
      status: 'Not Started',
      teamNotes: '-',
      clientNotes: 'طلب جديد',
      renewalDate: ''
    };

    setCurrentCompany({
      ...currentCompany,
      todoTasks: [...currentCompany.todoTasks, newTask]
    });
    setNewServiceName('');
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
      alert(currentT.noFilesAlert);
      return;
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${currentCompany.nameAr}_documents.zip`);
  };

  const getUrgencyBadge = (expiryDateStr?: string) => {
    if (!expiryDateStr) return <span className="text-neutral-500 text-[10px]">-</span>;
    const expiry = new Date(expiryDateStr).getTime();
    if (isNaN(expiry)) return <span className="text-neutral-300 text-xs font-mono">{expiryDateStr}</span>;

    const now = new Date().getTime();
    const diffDays = Math.ceil((expiry - now) / (1000 * 3600 * 24));

    if (diffDays < 0) {
      return <span className="bg-rose-950 text-rose-300 border border-rose-600 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1">🚨 منتهي منذ {Math.abs(diffDays)} يوم</span>;
    } else if (diffDays <= 7) {
      return <span className="bg-red-900/60 text-red-200 border border-red-500 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1">⚠️ خطورة ({diffDays} أيام)</span>;
    } else if (diffDays <= 20) {
      return <span className="bg-amber-900/60 text-amber-200 border border-amber-500 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1">⏳ تحذير ({diffDays} يوم)</span>;
    } else {
      return <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1">✅ آمن ({diffDays} يوم)</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Done':
        return <span className="bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow">Done</span>;
      case 'Working on it':
        return <span className="bg-blue-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow">Working on it</span>;
      case 'Stuck':
        return <span className="bg-rose-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow">Stuck</span>;
      default:
        return <span className="bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded text-[11px] font-bold">Not Started</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#111214] text-white p-4 md:p-8 font-sans" dir="rtl">
      {successMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-bold animate-bounce">
          {successMessage}
        </div>
      )}

      {/* رأس الصفحة */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-neutral-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 text-white font-bold p-2.5 rounded-xl shadow-lg text-lg">TM</div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">Trans Missions Co</h1>
              {isAdminMode && (
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                  {currentT.adminBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {currentT.companyPortal} <span className="text-emerald-400 font-semibold">{currentCompany.nameAr}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={handleSaveClientChanges}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow cursor-pointer disabled:opacity-50"
          >
            {isSaving ? currentT.saving : currentT.saveChanges}
          </button>
          <button onClick={handleLogout} className="bg-neutral-800 hover:bg-neutral-700 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-neutral-700 cursor-pointer">
            {currentT.logout}
          </button>
        </div>
      </div>

      {/* الملف التعريفي للشركة */}
      <div className="mb-6 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-3 gap-3">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-emerald-500/20">{currentT.profileTitle}</span>
            <h2 className="text-base font-bold text-white mt-1">{currentCompany.nameAr}</h2>
          </div>

          <button 
            onClick={handleBatchDownloadZip}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
          >
            {currentT.exportZip}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block mb-1">{currentT.partners}</span>
            <strong className="text-white">{currentCompany.partners || currentT.notSpecified}</strong>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block mb-1">{currentT.activity}</span>
            <strong className="text-white">{currentCompany.activity || currentT.generalActivity}</strong>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block mb-1">{currentT.createdAt}</span>
            <strong className="text-emerald-400 font-mono">{currentCompany.createdAtDate || '2025-01-01'}</strong>
          </div>
        </div>
      </div>

      {/* قسم إضافة خدمة جديدة */}
      <div className="mb-6 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
        <input 
          type="text"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
          placeholder={currentT.serviceNamePlaceholder}
          className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white flex-1 focus:outline-none focus:border-emerald-500"
        />
        <button 
          onClick={handleAddNewService}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow cursor-pointer whitespace-nowrap"
        >
          {currentT.addServiceBtn}
        </button>
      </div>

      {/* جدول الخدمات ومستندات الشركة */}
      <div className="bg-[#18191c] rounded-2xl border border-neutral-800 overflow-hidden mb-8 shadow-2xl">
        <div className="bg-[#202225] px-4 py-3 font-bold text-sm text-emerald-400 flex justify-between items-center border-b border-neutral-800">
          <span>{currentT.tableTitle}</span>
          <span className="text-xs bg-[#2b2d31] px-2 py-0.5 rounded text-neutral-300 font-normal">
            {currentCompany.todoTasks.length} {currentT.servicesCount}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#151618] text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="p-3 w-1/5">{currentT.thService}</th>
                <th className="p-3 w-1/5">{currentT.thFile}</th>
                <th className="p-3 w-[15%]" style={{ minWidth: '130px' }}>{currentT.thStatus}</th>
                <th className="p-3 w-[15%]">{currentT.thTeamNotes}</th>
                <th className="p-3 w-[15%]">{currentT.thClientNotes}</th>
                <th className="p-3 w-[15%]">{currentT.thRenewal}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {currentCompany.todoTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-neutral-400">{currentT.noServices}</td>
                </tr>
              ) : (
                currentCompany.todoTasks.map((t) => {
                  const isThisUploading = uploadingTaskId === t.id;
                  return (
                    <tr key={t.id} className="hover:bg-neutral-800/40 transition">
                      {/* اسم الخدمة */}
                      <td className="p-3 font-bold text-white">
                        <div className="flex items-center justify-between gap-2">
                          <input 
                            type="text"
                            value={t.nameAr}
                            onChange={(e) => {
                              const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, nameAr: e.target.value } : task);
                              setCurrentCompany({ ...currentCompany, todoTasks: updated });
                            }}
                            className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full focus:outline-none focus:border-emerald-500 font-bold"
                          />
                          <button 
                            onClick={() => handleDeleteService(t.id)}
                            className="text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 p-1.5 rounded border border-rose-800/50 transition cursor-pointer shrink-0"
                            title="حذف الخدمة"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>

                      {/* الملف المرفق */}
                      <td className="p-3">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-1">
                            {t.attachmentUrl ? (
                              <>
                                <button 
                                  onClick={() => handleSingleDownload(t.attachmentUrl!, t.attachmentName || 'document')}
                                  className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/40 transition cursor-pointer"
                                >
                                  تحميل
                                </button>
                                <button 
                                  onClick={() => handlePreviewFile(t.attachmentUrl!)}
                                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded text-[10px] font-bold border border-neutral-700 transition cursor-pointer"
                                >
                                  معاينة
                                </button>
                                <button 
                                  onClick={() => handleRemoveAttachment(t.id)}
                                  className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-800 transition cursor-pointer"
                                  title="حذف المرفق"
                                >
                                  حذف
                                </button>
                              </>
                            ) : (
                              <span className="text-neutral-500 text-[10px]">{currentT.noFile}</span>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] text-amber-400 cursor-pointer inline-block bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded border border-neutral-700 font-bold text-center w-full">
                              <span>{isThisUploading ? currentT.uploading : (t.attachmentUrl ? currentT.replaceFile : currentT.uploadNew)}</span>
                              <input 
                                type="file" 
                                accept="image/png,image/gif,image/jpeg,application/pdf"
                                disabled={isThisUploading}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileProcessed(file, t.id);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </td>

                      {/* الحالة (إنجليزي فقط + ألوان زاهية أخضر، أزرق، أصفر، أحمر) */}
                      <td className="p-3">
                        <select
                          value={t.status || 'Not Started'}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => 
                              task.id === t.id ? { ...task, status: e.target.value as any } : task
                            );
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          className={`w-full border rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none cursor-pointer ${
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

                      {/* ملاحظات الفريق */}
                      <td className="p-3">
                        <input 
                          type="text" 
                          value={t.teamNotes || ''}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => 
                              task.id === t.id ? { ...task, teamNotes: e.target.value } : task
                            );
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          placeholder="ملاحظات الفريق..."
                          className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1.5 text-xs text-white w-full focus:outline-none focus:border-emerald-500 truncate"
                        />
                      </td>

                      {/* ملاحظات العميل */}
                      <td className="p-3">
                        <input 
                          type="text" 
                          value={t.clientNotes || ''}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => 
                              task.id === t.id ? { ...task, clientNotes: e.target.value } : task
                            );
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          placeholder="ملاحظات العميل..."
                          className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1.5 text-xs text-white w-full focus:outline-none focus:border-emerald-500 truncate"
                        />
                      </td>

                      {/* موعد التجديد (مع فحص انتهاء المدة تلقائياً وتلوين المؤشر) */}
                      <td className="p-3 space-y-1.5">
                        <input 
                          type="date" 
                          value={t.renewalDate || ''}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => 
                              task.id === t.id ? { ...task, renewalDate: e.target.value } : task
                            );
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-amber-300 font-mono w-full focus:outline-none focus:border-emerald-500"
                        />
                        <div>
                          {getUrgencyBadge(t.renewalDate)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}