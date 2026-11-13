'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

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

// قاموس الترجمة الفورية للخدمات الشائعة
const serviceTranslations: { [key: string]: string } = {
  'سجل تجاري': 'Commercial Register',
  'تأسيس الشركة والسجل التجاري': 'Company Formation & Commercial Register',
  'توثيق العقود بوزارة العدل': 'Notarizing Contracts at Ministry of Justice',
  'رخصة البلدية والدفاع المدني': 'Municipality & Civil Defense License',
  'إقامات الموظفين وأذونات العمل': 'Employee Visas & Work Permits',
  'فتح الحساب البنكي للشركة': 'Corporate Bank Account Opening',
  'استخراج البطاقة الضريبية': 'Tax Card Issuance'
};

const getDisplayServiceName = (t: Transaction, english: boolean) => {
  if (!english) return t.nameAr || t.nameEn;
  return serviceTranslations[t.nameAr] || t.nameEn || t.nameAr;
};

export default function ClientPortalPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [clientsList, setClientsList] = useState<ClientCompany[]>([]);
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

  useEffect(() => {
    const savedClient = localStorage.getItem('current_client');
    if (!savedClient) {
      router.push('/client-login');
      return;
    }

    let clientData: any = {};
    try {
      clientData = JSON.parse(savedClient);
      if (clientData.companyName === 'ADMIN' || clientData.isAdmin || clientData.company === 'ADMIN') {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    } catch (e) {
      console.error(e);
      router.push('/client-login');
      return;
    }

    const fetchAllDataFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const loadedCompanies: ClientCompany[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const compName = data.company || data.companyName || data.nameAr || data.name || 'شركة بدون اسم';
          
          loadedCompanies.push({
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
          });
        });

        if (loadedCompanies.length > 0) {
          setClientsList(loadedCompanies);

          const targetComp = clientData.company || clientData.companyName;
          if (clientData.companyName === 'ADMIN' || clientData.isAdmin || targetComp === 'ADMIN') {
            setCurrentCompany({
              id: 'all',
              nameAr: 'جميع الشركات (Master View)',
              nameEn: 'All Companies (Master View)',
              clientPassword: '',
              activeTasksCount: 0,
              generalClientNote: 'عرض كافة معاملات ومستندات الشركات المسجلة',
              clientFiles: [],
              todoTasks: [],
              completedTasks: []
            });
          } else if (targetComp) {
            const found = loadedCompanies.find(c => c.nameAr.trim().toLowerCase() === targetComp.trim().toLowerCase());
            if (found) {
              setCurrentCompany(found);
            } else {
              setCurrentCompany({
                id: clientData.id || Date.now().toString(),
                nameAr: targetComp,
                nameEn: targetComp,
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
          }
        }
      } catch (error) {
        console.error("Error fetching from Firebase:", error);
      }
    };

    fetchAllDataFromFirebase();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('current_client');
    router.push('/client-login');
  };

  const handleSaveChanges = async () => {
    try {
      if (currentCompany.id && currentCompany.id !== 'all') {
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
      setSuccessMessage(isEnglish ? 'Changes saved to database successfully!' : 'تم حفظ التحديثات في قاعدة البيانات بنجاح!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error saving to database:", error);
      setSuccessMessage(isEnglish ? 'Error saving changes.' : 'حدث خطأ أثناء الحفظ.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // فحص ما إذا كان موعد التجديد قريباً (أقل من 10 أيام)
  const checkIsExpiringSoon = (expiryDateStr?: string) => {
    if (!expiryDateStr) return false;
    const expiry = new Date(expiryDateStr).getTime();
    const now = new Date().getTime();
    const diffDays = (expiry - now) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 10;
  };

  const isTradeExpiring = checkIsExpiringSoon(currentCompany.tradeLicenseExpiry);
  const isCommercialExpiring = checkIsExpiringSoon(currentCompany.commercialRecordExpiry);

  const sendWhatsAppReminder = (docTitle: string, expiryDate?: string) => {
    const phone = '97400000000'; // رقم افتراضي أو رقم العميل
    const msg = `مرحباً بك من شركة ترانس ميشنز للتجارة والخدمات (قطر).\nنود تذكيركم بأن (${docTitle}) الخاصة بشركتكم (${currentCompany.nameAr}) ستنتهي بتاريخ (${expiryDate || 'قريباً'}). يرجى سرعة التجديد لتجنب أي غرامات.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || currentCompany.id === 'all') return;

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        alert(isEnglish 
          ? `File "${files[i].name}" exceeds 1MB! Please upload a smaller document.` 
          : `الملف "${files[i].name}" حجمه أكبر من 1 ميجابايت! يرجى رفع مستند أصغر حجماً.`);
        return;
      }
    }

    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = async (uploadEvent) => {
        newFiles.push({
          name: file.name,
          url: uploadEvent.target?.result as string,
          type: file.type
        });
        if (newFiles.length === files.length) {
          const updatedFiles = [...(currentCompany.clientFiles || []), ...newFiles];
          const updatedComp = { ...currentCompany, clientFiles: updatedFiles };
          setCurrentCompany(updatedComp);

          try {
            if (currentCompany.id) {
              const docRef = doc(db, "clients", currentCompany.id);
              await updateDoc(docRef, { clientFiles: updatedFiles });
            }
          } catch (err) {
            console.error(err);
          }

          setSuccessMessage(isEnglish ? 'Files attached and saved successfully!' : 'تم إرفاق المستندات وحفظها بنجاح!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCompanySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === 'all') {
      setCurrentCompany({
        id: 'all',
        nameAr: isEnglish ? 'All Companies (Master View)' : 'جميع الشركات (Master View)',
        nameEn: 'All Companies (Master View)',
        clientPassword: '',
        activeTasksCount: 0,
        generalClientNote: 'عرض كافة معاملات ومستندات الشركات المسجلة',
        clientFiles: [],
        todoTasks: [],
        completedTasks: []
      });
      return;
    }
    const found = clientsList.find(c => c.id === selectedId);
    if (found) setCurrentCompany(found);
  };

  const addNewCompany = async () => {
    const nameAr = prompt('أدخل اسم الشركة الجديدة بالعربي:');
    const nameEn = prompt('أدخل اسم الشركة بالإنجليزية:');
    const clientPassword = prompt('أدخل كلمة المرور الخاصة بالعميل:') || 'TM-2026';
    if (nameAr && nameEn) {
      try {
        const docRef = await addDoc(collection(db, "clients"), {
          company: nameAr,
          password: clientPassword,
          todoTasks: [],
          completedTasks: [],
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
          nameEn,
          clientPassword,
          activeTasksCount: 0,
          generalClientNote: '',
          clientFiles: [],
          todoTasks: [],
          completedTasks: [],
          partners: 'الشركاء المؤسسون',
          activity: 'تجارة عامة وخدمات',
          createdAtDate: new Date().toISOString().split('T')[0],
          tradeLicenseExpiry: '2026-12-01',
          commercialRecordExpiry: '2026-12-01'
        };
        setClientsList([...clientsList, newComp]);
        setCurrentCompany(newComp);
        setSuccessMessage('تم إضافة الشركة وحفظها بنجاح!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error("Error adding company:", error);
      }
    }
  };

  const addNewTask = () => {
    if (currentCompany.id === 'all') return;
    const newTask: Transaction = {
      id: Date.now().toString(),
      nameAr: 'خدمة جديدة / مستند جديد',
      nameEn: 'New Service / Document',
      status: 'Working on it',
      teamNotes: 'جاري البدء',
      clientNotes: '-',
      subitemsCount: 1,
      updatesText: 'تمت الإضافة بواسطة الأدمن',
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

      {/* رأس الصفحة */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-neutral-800 pb-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white font-bold p-2.5 rounded-xl shadow-lg text-lg">TM</div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              <span>Trans Missions Co</span>
              <a 
                href={`https://wa.me/97400000000?text=${encodeURIComponent(`مرحباً شركة ترانس ميشنز بخصوص شركة (${currentCompany.nameAr})`)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600/20 text-emerald-400 p-1 rounded-lg text-xs border border-emerald-500/30 flex items-center gap-1 hover:bg-emerald-600/30"
                title="مراسلة عامة عبر واتساب"
              >
                💬 واتساب الشركة
              </a>
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              لوحة متابعة معاملات شركة: <span className="text-emerald-400 font-semibold">{currentCompany.nameAr}</span>
              {isAdminMode && <span className="ml-2 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold">Admin Mode ON ⚡</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleLogout} className="bg-rose-950/50 hover:bg-rose-900 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-rose-800/50">
            🚪 تسجيل خروج
          </button>
          <button onClick={() => setIsEnglish(!isEnglish)} className="bg-[#2b2d31] hover:bg-neutral-700 text-neutral-200 px-3 py-2 rounded-xl text-xs font-semibold transition border border-neutral-700">
            {isEnglish ? 'العربية 🇸🇦' : 'English 🇬🇧'}
          </button>
        </div>
      </div>

      {/* 🏢 بطاقة الملف التعريفي العلوي ومواعيد التجديد */}
      {currentCompany.id !== 'all' && (
        <div className="mb-6 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-3 gap-3">
            <div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-emerald-500/20">الملف التعريفي للشركة (Qatar - C.R. 210470)</span>
              <h2 className="text-lg font-bold text-white mt-1">{currentCompany.nameAr}</h2>
            </div>
            {isAdminMode && (
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="أسماء الشركاء"
                  value={currentCompany.partners || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, partners: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1 text-xs text-white"
                />
                <input 
                  type="date" 
                  value={currentCompany.createdAtDate || ''}
                  onChange={e => setCurrentCompany({ ...currentCompany, createdAtDate: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1 text-xs text-white"
                />
                <button onClick={handleSaveChanges} className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-lg text-xs font-bold">حفظ التغييرات</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <span className="text-neutral-500 block mb-1">الشركاء / الملاك:</span>
              <strong className="text-white">{currentCompany.partners || 'غير محدد'}</strong>
            </div>
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <span className="text-neutral-500 block mb-1">النشاط التجاري:</span>
              <strong className="text-white">{currentCompany.activity || 'تجارة عامة وخدمات'}</strong>
            </div>
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <span className="text-neutral-500 block mb-1">تاريخ تأسيس الشركة:</span>
              <strong className="text-emerald-400 font-mono">{currentCompany.createdAtDate || '2025-01-01'}</strong>
            </div>
          </div>

          {/* تنبيهات التجديد الأوتوماتيكية (قبل 10 أيام) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${isTradeExpiring ? 'bg-amber-950/30 border-amber-500/50 text-amber-200' : 'bg-neutral-950 border-neutral-800'}`}>
              <div>
                <span className="text-[11px] text-neutral-400 block">انتهاء الرخصة التجارية:</span>
                {isAdminMode ? (
                  <input 
                    type="date" 
                    value={currentCompany.tradeLicenseExpiry || ''}
                    onChange={e => setCurrentCompany({ ...currentCompany, tradeLicenseExpiry: e.target.value })}
                    className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white mt-1"
                  />
                ) : (
                  <strong className="text-xs font-mono text-white">{currentCompany.tradeLicenseExpiry || '2026-12-01'}</strong>
                )}
              </div>
              {isTradeExpiring && (
                <button 
                  onClick={() => sendWhatsAppReminder('الرخصة التجارية', currentCompany.tradeLicenseExpiry)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow flex items-center gap-1"
                >
                  💬 تنبيه واتساب (قبل 10 أيام)
                </button>
              )}
            </div>

            <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${isCommercialExpiring ? 'bg-amber-950/30 border-amber-500/50 text-amber-200' : 'bg-neutral-950 border-neutral-800'}`}>
              <div>
                <span className="text-[11px] text-neutral-400 block">انتهاء السجل التجاري:</span>
                {isAdminMode ? (
                  <input 
                    type="date" 
                    value={currentCompany.commercialRecordExpiry || ''}
                    onChange={e => setCurrentCompany({ ...currentCompany, commercialRecordExpiry: e.target.value })}
                    className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white mt-1"
                  />
                ) : (
                  <strong className="text-xs font-mono text-white">{currentCompany.commercialRecordExpiry || '2026-12-01'}</strong>
                )}
              </div>
              {isCommercialExpiring && (
                <button 
                  onClick={() => sendWhatsAppReminder('السجل التجاري', currentCompany.commercialRecordExpiry)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow flex items-center gap-1"
                >
                  💬 تنبيه واتساب (قبل 10 أيام)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isAdminMode && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-amber-400 font-bold whitespace-nowrap">لوحة التحكم الإدارية (اختر الشركة):</span>
            <select 
              value={currentCompany.id}
              onChange={handleCompanySelectChange}
              className="bg-[#2b2d31] text-white border border-amber-500/50 rounded-xl px-3 py-2 font-semibold focus:outline-none w-full md:w-64"
            >
              <option value="all">⚡ عرض جميع الشركات (Master View)</option>
              {clientsList.map((comp) => (
                <option key={comp.id} value={comp.id}>{comp.nameAr}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addNewCompany} className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-bold">
              + إضافة شركة جديدة
            </button>
            {currentCompany.id !== 'all' && (
              <button onClick={addNewTask} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold">
                + إضافة خدمة
              </button>
            )}
            <button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg font-bold">
              🔄 حفظ التحديثات
            </button>
          </div>
        </div>
      )}

      {/* جدول الخدمات وقيد الإجراء */}
      {currentCompany.id !== 'all' && (
        <div className="bg-[#18191c] rounded-2xl border border-neutral-800 overflow-hidden mb-8 shadow-2xl">
          <div className="bg-[#202225] px-4 py-3 font-bold text-sm text-emerald-400 flex justify-between items-center border-b border-neutral-800">
            <span>🟢 جدول الخدمات ومستندات الشركة (بدون Subitems)</span>
            <span className="text-xs bg-[#2b2d31] px-2.5 py-1 rounded-md text-neutral-300 font-normal">
              {currentCompany.todoTasks.length} خدمات مسجلة
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#151618] text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="p-3.5">اسم الخدمة / المستند</th>
                  <th className="p-3.5">الملف المرفق (معاينة)</th>
                  <th className="p-3.5">الحالة</th>
                  <th className="p-3.5">ملاحظات الفريق</th>
                  <th className="p-3.5">ملاحظات العميل</th>
                  <th className="p-3.5">موعد التجديد (عند Done)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {currentCompany.todoTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-neutral-400">لا توجد خدمات مسجلة حالياً.</td>
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
                        {t.attachmentUrl ? (
                          <a href={t.attachmentUrl} target="_blank" rel="noreferrer" className="bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded text-[11px] font-bold border border-emerald-500/30">
                            👁️ عرض المستند
                          </a>
                        ) : (
                          <span className="text-neutral-500 text-[11px]">بدون مرفق</span>
                        )}
                        {isAdminMode && (
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
                            className="block mt-1 text-[10px] text-neutral-400"
                          />
                        )}
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
                            className="bg-neutral-800 text-emerald-400 border border-neutral-700 rounded px-2 py-1 text-xs"
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="Working on it">Working on it</option>
                            <option value="Stuck">Stuck</option>
                            <option value="Done">Done</option>
                          </select>
                        ) : (
                          <span className="bg-neutral-800 text-emerald-400 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                            {t.status}
                          </span>
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
                        {t.status === 'Done' ? (
                          isAdminMode ? (
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
                            <span className="text-amber-300 font-mono text-xs">{t.renewalDate ? `تجديد: ${t.renewalDate}` : 'مكتمل'}</span>
                          )
                        ) : (
                          <span className="text-neutral-500 text-[11px]">قيد العمل</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}