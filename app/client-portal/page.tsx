'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  subitemsCount: number;
  updatesText: string;
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
  activeTasksCount: number;
  generalClientNote?: string;
  clientFiles?: UploadedFile[];
  todoTasks: Transaction[];
  completedTasks: Transaction[];
  partners?: string;
  activity?: string;
  createdAtDate?: string;
  tradeLicenseExpiry?: string;
  commercialRecordExpiry?: string;
}

export default function ClientPortalPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [currentCompany, setCurrentCompany] = useState<ClientCompany>({
    id: '1',
    nameAr: 'جاري التحميل...',
    nameEn: 'Loading...',
    clientPassword: '',
    activeTasksCount: 0,
    generalClientNote: '',
    clientFiles: [],
    todoTasks: [],
    completedTasks: [],
    partners: '',
    activity: '',
    createdAtDate: '',
    tradeLicenseExpiry: '',
    commercialRecordExpiry: ''
  });

  const t = {
    ar: {
      companyPortal: "لوحة متابعة معاملات شركة:",
      adminMode: "Admin Mode ON ⚡",
      logout: "تسجيل خروج 🚪",
      exportZip: "تصدير كافة المستندات (ZIP) 📦",
      profileTitle: "الملف التعريفي للشركة (C.R. 210470 - QATAR)",
      partners: "الشركاء / الملاك:",
      activity: "النشاط التجاري:",
      createdAt: "تاريخ تأسيس الشركة:",
      tradeExpiry: "انتهاء الرخصة التجارية ودرجة الخطورة:",
      commercialExpiry: "انتهاء السجل التجاري ودرجة الخطورة:",
      addAdminTask: "+ إضافة خدمة",
      saveChanges: "حفظ التحديثات 🔄",
      tableTitle: "جدول الخدمات ومستندات الشركة (Subitems) 🟢",
      servicesCount: "خدمات مسجلة",
      thService: "اسم الخدمة / المستند",
      thFile: "الملف المرفق (معاينة وتحميل)",
      thStatus: "الحالة",
      thTeamNotes: "ملاحظات الفريق",
      thClientNotes: "ملاحظات العميل",
      thRenewal: "موعد التجديد النشط",
      downloadFile: "تحميل 📥",
      preview: "معاينة 👁️",
      noFile: "لا يوجد مرفق",
      replaceFile: "استبدال الملف 🔄",
      uploadNew: "رفع ملف ➕",
      noServices: "لا توجد خدمات مسجلة حالياً.",
      notSpecified: "غير محدد",
      generalActivity: "تجارة عامة وخدمات",
      savedSuccess: "تم حفظ التحديثات في قاعدة البيانات بنجاح!",
      noFilesAlert: "لا توجد مستندات مرفقة للتصدير."
    },
    en: {
      companyPortal: "Company Transactions Portal:",
      adminMode: "Admin Mode ON ⚡",
      logout: "Logout 🚪",
      exportZip: "Export All Documents (ZIP) 📦",
      profileTitle: "Company Profile (C.R. 210470 - QATAR)",
      partners: "Partners / Owners:",
      activity: "Commercial Activity:",
      createdAt: "Establishment Date:",
      tradeExpiry: "Trade License Expiry & Risk Level:",
      commercialExpiry: "Commercial Record Expiry & Risk Level:",
      addAdminTask: "+ Add Service",
      saveChanges: "Save Changes 🔄",
      tableTitle: "Company Services & Documents Table (Subitems) 🟢",
      servicesCount: "Registered Services",
      thService: "Service Name / Document",
      thFile: "Attached File (Preview & Download)",
      thStatus: "Status",
      thTeamNotes: "Team Notes",
      thClientNotes: "Client Notes",
      thRenewal: "Active Renewal Date",
      downloadFile: "Download 📥",
      preview: "Preview 👁️",
      noFile: "No attachment",
      replaceFile: "Replace File 🔄",
      uploadNew: "Upload File ➕",
      noServices: "No services registered currently.",
      notSpecified: "Not specified",
      generalActivity: "General Trading & Services",
      savedSuccess: "Changes saved to database successfully!",
      noFilesAlert: "No attachments found to export."
    }
  };

  const currentT = t[isEnglish ? 'en' : 'ar'];

  useEffect(() => {
    const savedClient = localStorage.getItem('current_client');
    if (!savedClient) {
      router.push('/client-login');
      return;
    }

    let clientData: any = {};
    try {
      clientData = JSON.parse(savedClient);
      if (clientData.isAdmin) {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    } catch (e) {
      console.error(e);
      router.push('/client-login');
      return;
    }

    const fetchCompanyData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        let foundCompany: ClientCompany | null = null;
        const targetComp = clientData.company || clientData.companyName;

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const compName = data.company || data.companyName || data.nameAr || data.name || '';
          if (targetComp && compName.trim().toLowerCase() === targetComp.trim().toLowerCase()) {
            foundCompany = {
              id: docSnap.id,
              nameAr: compName,
              nameEn: compName,
              clientPassword: data.password || 'TM-2026',
              activeTasksCount: (data.todoTasks || []).length,
              generalClientNote: data.generalClientNote || '',
              clientFiles: data.clientFiles || [],
              todoTasks: data.todoTasks || [],
              completedTasks: data.completedTasks || [],
              partners: data.partners || 'غير محدد',
              activity: data.activity || 'تجارة عامة وخدمات (قطر)',
              createdAtDate: data.createdAtDate || '2025-01-01',
              tradeLicenseExpiry: data.tradeLicenseExpiry || '2026-12-01',
              commercialRecordExpiry: data.commercialRecordExpiry || '2026-12-01'
            };
          }
        });

        if (foundCompany) {
          setCurrentCompany(foundCompany);
        } else {
          setCurrentCompany({
            id: clientData.id || Date.now().toString(),
            nameAr: targetComp || 'شركة جديدة',
            nameEn: targetComp || 'New Company',
            clientPassword: clientData.password || '',
            activeTasksCount: 0,
            generalClientNote: '',
            clientFiles: [],
            todoTasks: [],
            completedTasks: [],
            partners: 'غير محدد',
            activity: 'تجارة عامة وخدمات',
            createdAtDate: '2025-01-01',
            tradeLicenseExpiry: '2026-12-01',
            commercialRecordExpiry: '2026-12-01'
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('current_client');
    router.push('/client-login');
  };

  const handleSaveChanges = async () => {
    try {
      if (currentCompany.id) {
        const docRef = doc(db, "clients", currentCompany.id);
        await updateDoc(docRef, {
          company: currentCompany.nameAr,
          generalClientNote: currentCompany.generalClientNote || '',
          clientFiles: currentCompany.clientFiles || [],
          todoTasks: currentCompany.todoTasks || [],
          completedTasks: currentCompany.completedTasks || [],
          partners: currentCompany.partners || '',
          activity: currentCompany.activity || '',
          createdAtDate: currentCompany.createdAtDate || '',
          tradeLicenseExpiry: currentCompany.tradeLicenseExpiry || '',
          commercialRecordExpiry: currentCompany.commercialRecordExpiry || ''
        });
      }
      setSuccessMessage(currentT.savedSuccess);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error saving to database:", error);
      setSuccessMessage(isEnglish ? 'Error saving changes.' : 'حدث خطأ أثناء الحفظ.');
      setTimeout(() => setSuccessMessage(''), 3000);
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
    if (!expiryDateStr) return <span className="text-neutral-400">-</span>;
    const expiry = new Date(expiryDateStr).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((expiry - now) / (1000 * 3600 * 24));

    if (diffDays < 0) {
      return <span className="bg-rose-950 text-rose-300 border border-rose-600 px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1">🚨 {isEnglish ? `Expired since ${Math.abs(diffDays)} days` : `منتهي منذ ${Math.abs(diffDays)} يوم`}</span>;
    } else if (diffDays <= 7) {
      return <span className="bg-red-900/60 text-red-200 border border-red-500 px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1">⚠️ {isEnglish ? `High Risk (${diffDays} days left)` : `خطورة عالية (${diffDays} أيام متبقية)`}</span>;
    } else if (diffDays <= 20) {
      return <span className="bg-amber-900/60 text-amber-200 border border-amber-500 px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1">⏳ {isEnglish ? `Warning (${diffDays} days left)` : `تحذير (${diffDays} يوم متبقي)`}</span>;
    } else {
      return <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1">✅ {isEnglish ? `Safe (${diffDays} days left)` : `آمن (${diffDays} يوم متبقي)`}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Done':
        return <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-[11px] font-bold shadow">{isEnglish ? 'Done (Completed)' : 'Done (مكتمل)'}</span>;
      case 'Working on it':
        return <span className="bg-amber-600 text-white px-3 py-1 rounded-lg text-[11px] font-bold shadow">{isEnglish ? 'Working on it' : 'Working on it (قيد التنفيذ)'}</span>;
      case 'Stuck':
        return <span className="bg-rose-600 text-white px-3 py-1 rounded-lg text-[11px] font-bold shadow">{isEnglish ? 'Stuck' : 'Stuck (متوقف)'}</span>;
      default:
        return <span className="bg-neutral-700 text-neutral-200 px-3 py-1 rounded-lg text-[11px] font-bold">{isEnglish ? 'Not Started' : 'Not Started (جديد)'}</span>;
    }
  };

  const addNewTask = () => {
    const newTask: Transaction = {
      id: Date.now().toString(),
      nameAr: isEnglish ? 'New Service / Document' : 'خدمة جديدة / مستند جديد',
      nameEn: 'New Service / Document',
      status: 'Working on it',
      teamNotes: isEnglish ? 'In Progress' : 'جاري البدء',
      clientNotes: '-',
      subitemsCount: 1,
      updatesText: isEnglish ? 'Added by Admin' : 'تمت الإضافة بواسطة الأدمن',
      renewalDate: ''
    };
    setCurrentCompany({ ...currentCompany, todoTasks: [...currentCompany.todoTasks, newTask] });
  };

  return (
    <div className="min-h-screen bg-[#111214] text-white p-6 md:p-10 font-sans" dir={isEnglish ? 'ltr' : 'rtl'}>
      {successMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-bold animate-bounce">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-neutral-800 pb-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white font-bold p-2.5 rounded-xl shadow-lg text-lg">TM</div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">Trans Missions Co</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              {currentT.companyPortal} <span className="text-emerald-400 font-semibold">{currentCompany.nameAr}</span>
              {isAdminMode && <span className="ml-2 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold">{currentT.adminMode}</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isAdminMode && (
            <button 
              onClick={() => router.push('/admin-portal')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow cursor-pointer"
            >
              ⚡ العودة للوحة الأدمن
            </button>
          )}
          <button onClick={handleLogout} className="bg-neutral-800 hover:bg-neutral-700 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-neutral-700 cursor-pointer">
            {currentT.logout}
          </button>
          <button onClick={() => setIsEnglish(!isEnglish)} className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-2 rounded-xl text-xs font-semibold transition border border-neutral-700 cursor-pointer">
            {isEnglish ? 'العربية 🇸🇦' : 'English 🇬🇧'}
          </button>
        </div>
      </div>

      {isAdminMode && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex justify-between items-center gap-4 text-xs">
          <span className="text-amber-400 font-bold">لوحة تعديل الشركة النشطة:</span>
          <div className="flex gap-2">
            <button onClick={addNewTask} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg font-bold shadow cursor-pointer">
              {currentT.addAdminTask}
            </button>
            <button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg font-bold shadow cursor-pointer">
              {currentT.saveChanges}
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-3 gap-3">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-emerald-500/20">{currentT.profileTitle}</span>
            {isAdminMode ? (
              <input 
                type="text"
                value={currentCompany.nameAr}
                onChange={e => setCurrentCompany({ ...currentCompany, nameAr: e.target.value })}
                className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-base font-bold text-white mt-1 w-full md:w-80"
              />
            ) : (
              <h2 className="text-lg font-bold text-white mt-1">{currentCompany.nameAr}</h2>
            )}
          </div>

          <button 
            onClick={handleBatchDownloadZip}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
          >
            {currentT.exportZip}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block mb-1">{currentT.partners}</span>
            {isAdminMode ? (
              <input 
                type="text" 
                value={currentCompany.partners || ''}
                onChange={e => setCurrentCompany({ ...currentCompany, partners: e.target.value })}
                className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
              />
            ) : (
              <strong className="text-white">{currentCompany.partners || currentT.notSpecified}</strong>
            )}
          </div>
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block mb-1">{currentT.activity}</span>
            {isAdminMode ? (
              <input 
                type="text" 
                value={currentCompany.activity || ''}
                onChange={e => setCurrentCompany({ ...currentCompany, activity: e.target.value })}
                className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
              />
            ) : (
              <strong className="text-white">{currentCompany.activity || currentT.generalActivity}</strong>
            )}
          </div>
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block mb-1">{currentT.createdAt}</span>
            {isAdminMode ? (
              <input 
                type="date" 
                value={currentCompany.createdAtDate || ''}
                onChange={e => setCurrentCompany({ ...currentCompany, createdAtDate: e.target.value })}
                className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
              />
            ) : (
              <strong className="text-emerald-400 font-mono">{currentCompany.createdAtDate || '2025-01-01'}</strong>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl border bg-neutral-950 border-neutral-800 flex justify-between items-center">
            <div>
              <span className="text-[11px] text-neutral-400 block mb-1">{currentT.tradeExpiry}</span>
              {isAdminMode ? (
                <input 
                  type="date" 
                  value={currentCompany.tradeLicenseExpiry || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, tradeLicenseExpiry: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                />
              ) : (
                <strong className="text-xs font-mono text-white">{currentCompany.tradeLicenseExpiry || '2026-12-01'}</strong>
              )}
            </div>
            {getUrgencyBadge(currentCompany.tradeLicenseExpiry)}
          </div>

          <div className="p-3.5 rounded-xl border bg-neutral-950 border-neutral-800 flex justify-between items-center">
            <div>
              <span className="text-[11px] text-neutral-400 block mb-1">{currentT.commercialExpiry}</span>
              {isAdminMode ? (
                <input 
                  type="date" 
                  value={currentCompany.commercialRecordExpiry || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, commercialRecordExpiry: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                />
              ) : (
                <strong className="text-xs font-mono text-white">{currentCompany.commercialRecordExpiry || '2026-12-01'}</strong>
              )}
            </div>
            {getUrgencyBadge(currentCompany.commercialRecordExpiry)}
          </div>
        </div>
      </div>

      <div className="bg-[#18191c] rounded-2xl border border-neutral-800 overflow-hidden mb-8 shadow-2xl">
        <div className="bg-[#202225] px-4 py-3 font-bold text-sm text-emerald-400 flex justify-between items-center border-b border-neutral-800">
          <span>{currentT.tableTitle}</span>
          <span className="text-xs bg-[#2b2d31] px-2.5 py-1 rounded-md text-neutral-300 font-normal">
            {currentCompany.todoTasks.length} {currentT.servicesCount}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} text-xs`}>
            <thead className="bg-[#151618] text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="p-3.5">{currentT.thService}</th>
                <th className="p-3.5">{currentT.thFile}</th>
                <th className="p-3.5">{currentT.thStatus}</th>
                <th className="p-3.5">{currentT.thTeamNotes}</th>
                <th className="p-3.5">{currentT.thClientNotes}</th>
                <th className="p-3.5">{currentT.thRenewal}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {currentCompany.todoTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-neutral-400">{currentT.noServices}</td>
                </tr>
              ) : (
                currentCompany.todoTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-800/40 transition">
                    <td className="p-3.5 font-bold text-white">
                      {isAdminMode ? (
                        <input 
                          type="text" 
                          value={t.nameAr}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, nameAr: e.target.value } : task);
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                        />
                      ) : (
                        t.nameAr
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          {t.attachmentUrl ? (
                            <>
                              <button 
                                onClick={() => handleSingleDownload(t.attachmentUrl!, t.attachmentName || 'document')}
                                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-2.5 py-1 rounded text-[11px] font-bold border border-emerald-500/40 transition cursor-pointer"
                              >
                                {currentT.downloadFile}
                              </button>
                              <a 
                                href={t.attachmentUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded text-[11px] font-bold border border-neutral-700 transition"
                              >
                                {currentT.preview}
                              </a>
                            </>
                          ) : (
                            <span className="text-neutral-500 text-[11px]">{currentT.noFile}</span>
                          )}
                        </div>

                        {isAdminMode && (
                          <div>
                            <label className="text-[10px] text-amber-400 cursor-pointer inline-block bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 rounded border border-neutral-700 font-bold">
                              <span>{t.attachmentUrl ? currentT.replaceFile : currentT.uploadNew}</span>
                              <input 
                                type="file" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      const url = ev.target?.result as string;
                                      const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, attachmentName: file.name, attachmentUrl: url } : task);
                                      setCurrentCompany({ ...currentCompany, todoTasks: updated });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5">
                      {isAdminMode ? (
                        <select 
                          value={t.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as any;
                            const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, status: newStatus } : task);
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          className="bg-neutral-800 text-white border border-neutral-700 rounded px-2 py-1 text-xs"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="Working on it">Working on it</option>
                          <option value="Stuck">Stuck</option>
                          <option value="Done">Done</option>
                        </select>
                      ) : (
                        getStatusBadge(t.status)
                      )}
                    </td>

                    <td className="p-3.5 text-neutral-300">
                      {isAdminMode ? (
                        <input 
                          type="text" 
                          value={t.teamNotes}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, teamNotes: e.target.value } : task);
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full"
                        />
                      ) : (
                        t.teamNotes || '-'
                      )}
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
                      {isAdminMode ? (
                        <input 
                          type="date" 
                          value={t.renewalDate || ''}
                          onChange={(e) => {
                            const updated = currentCompany.todoTasks.map(task => task.id === t.id ? { ...task, renewalDate: e.target.value } : task);
                            setCurrentCompany({ ...currentCompany, todoTasks: updated });
                          }}
                          className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                        />
                      ) : (
                        <span className="text-amber-300 font-mono text-xs bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                          {t.renewalDate ? t.renewalDate : (isEnglish ? 'Not specified' : 'غير محدد')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}