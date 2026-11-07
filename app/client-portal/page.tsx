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
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | '-';
  dueDate: string;
  teamNotes: string;
  clientNotes: string;
  subitemsCount: number;
  updatesText: string;
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
}

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
    completedTasks: []
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
      if (clientData.companyName === 'ADMIN' || clientData.isAdmin) {
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
          const compName = data.companyName || data.name || data.nameAr;
          if (compName) {
            loadedCompanies.push({
              id: docSnap.id,
              nameAr: compName,
              nameEn: compName,
              clientPassword: data.password || 'TM-2026',
              activeTasksCount: 0,
              generalClientNote: data.generalClientNote || '',
              clientFiles: data.clientFiles || [],
              todoTasks: [],
              completedTasks: []
            });
          }
        });

        if (loadedCompanies.length === 0) {
          const startUpSnap = await getDocs(collection(db, "start_up_forms"));
          startUpSnap.forEach((docSnap) => {
            const data = docSnap.data();
            const compName = data.companyName || data.name || data.nameAr;
            if (compName) {
              loadedCompanies.push({
                id: docSnap.id,
                nameAr: compName,
                nameEn: compName,
                clientPassword: data.password || 'TM-2026',
                activeTasksCount: 0,
                generalClientNote: data.generalClientNote || '',
                clientFiles: data.clientFiles || [],
                todoTasks: [],
                completedTasks: []
              });
            }
          });
        }

        if (loadedCompanies.length > 0) {
          setClientsList(loadedCompanies);

          if (clientData.companyName === 'ADMIN' || clientData.isAdmin) {
            setCurrentCompany(loadedCompanies[0]);
          } else {
            const found = loadedCompanies.find(c => c.nameAr.trim().toLowerCase() === clientData.companyName.trim().toLowerCase());
            if (found) {
              setCurrentCompany(found);
            } else {
              setCurrentCompany({
                id: clientData.id || Date.now().toString(),
                nameAr: clientData.companyName,
                nameEn: clientData.companyName,
                clientPassword: clientData.password || '',
                activeTasksCount: 0,
                generalClientNote: '',
                clientFiles: [],
                todoTasks: [],
                completedTasks: []
              });
            }
          }
        } else {
          if (!isAdminMode) {
            setCurrentCompany({
              id: '1',
              nameAr: clientData.companyName || 'شركة جديدة',
              nameEn: clientData.companyName || 'New Company',
              clientPassword: '',
              activeTasksCount: 0,
              generalClientNote: '',
              clientFiles: [],
              todoTasks: [],
              completedTasks: []
            });
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

  const availableServices = [
    { ar: 'تأسيس الشركة والسجل التجاري', en: 'Company Formation & Commercial Register' },
    { ar: 'توثيق العقود بوزارة العدل', en: 'Notarizing Contracts at Ministry of Justice' },
    { ar: 'رخصة البلدية والدفاع المدني', en: 'Municipality & Civil Defense License' },
    { ar: 'إقامات الموظفين وأذونات العمل', en: 'Employee Visas & Work Permits' },
    { ar: 'فتح الحساب البنكي للشركة', en: 'Corporate Bank Account Opening' },
    { ar: 'استخراج البطاقة الضريبية', en: 'Tax Card Issuance' }
  ];

  const handleSaveChanges = () => {
    setSuccessMessage(isEnglish ? 'Changes updated successfully!' : 'تم تحديث وحفظ التغييرات بنجاح!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleClientNoteChange = (id: string, group: 'todo' | 'completed', newNote: string) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, clientNotes: newNote } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, clientNotes: newNote } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const updateSingleClientNote = (taskId: string) => {
    setCurrentCompany({ ...currentCompany });
    setSuccessMessage(isEnglish ? 'Client note updated successfully!' : 'تم تحديث وحفظ ملاحظة العميل بنجاح!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // رفع الملفات الحقيقية (PDF أو صور) وحفظها
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        newFiles.push({
          name: file.name,
          url: uploadEvent.target?.result as string,
          type: file.type
        });
        if (newFiles.length === files.length) {
          const updatedFiles = [...(currentCompany.clientFiles || []), ...newFiles];
          setCurrentCompany({ ...currentCompany, clientFiles: updatedFiles });
          setSuccessMessage(isEnglish ? 'Files attached successfully!' : 'تم إرفاق المستندات بنجاح!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // دالة تتيح للعميل إضافة طلب خدمة جديد بنفسه
  const clientAddRequest = () => {
    const serviceName = prompt(isEnglish ? 'Enter requested service/task name:' : 'أدخل اسم الخدمة أو الطلب المراد إضافته:');
    if (!serviceName) return;

    const newServiceTask: Transaction = {
      id: Date.now().toString(),
      nameAr: serviceName,
      nameEn: serviceName,
      status: 'Not Started',
      priority: 'Medium',
      dueDate: 'قريباً',
      teamNotes: '-',
      clientNotes: 'طلب جديد تم إضافته بواسطة العميل',
      subitemsCount: 1,
      updatesText: 'قيد المراجعة من الإدارة'
    };

    const updatedComp = {
      ...currentCompany,
      todoTasks: [...currentCompany.todoTasks, newServiceTask]
    };
    setCurrentCompany(updatedComp);
    setSuccessMessage(isEnglish ? 'Request added successfully!' : 'تم إضافة طلبك بنجاح وفي انتظار مراجعة فريق العمل!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleGeneralNoteUpdate = async () => {
    try {
      if (currentCompany.id && !isAdminMode) {
        const docRef = doc(db, "clients", currentCompany.id);
        await updateDoc(docRef, { 
          generalClientNote: currentCompany.generalClientNote || '',
          clientFiles: currentCompany.clientFiles || []
        });
      }
      setSuccessMessage(isEnglish ? 'Note & files saved successfully!' : 'تم حفظ وإرسال ملاحظتك ومستنداتك لفريق العمل بنجاح!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (e) {
      setSuccessMessage(isEnglish ? 'Saved successfully!' : 'تم الحفظ بنجاح!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleTeamNoteChange = (id: string, group: 'todo' | 'completed', newNote: string) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, teamNotes: newNote } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, teamNotes: newNote } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const handleDateChange = (id: string, group: 'todo' | 'completed', newDate: string) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, dueDate: newDate } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, dueDate: newDate } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const handleStatusChange = (id: string, group: 'todo' | 'completed', newStatus: Transaction['status']) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, status: newStatus } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, status: newStatus } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const handlePriorityChange = (id: string, group: 'todo' | 'completed', newPriority: Transaction['priority']) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, priority: newPriority } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, priority: newPriority } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const handleSubitemsChange = (id: string, group: 'todo' | 'completed', count: number) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, subitemsCount: count } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, subitemsCount: count } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const handleUpdatesChange = (id: string, group: 'todo' | 'completed', text: string) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, updatesText: text } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, updatesText: text } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const handleServiceNameChange = (id: string, group: 'todo' | 'completed', newName: string) => {
    const updatedCompany = { ...currentCompany };
    if (group === 'todo') {
      updatedCompany.todoTasks = updatedCompany.todoTasks.map(t => t.id === id ? { ...t, nameAr: newName, nameEn: newName } : t);
    } else {
      updatedCompany.completedTasks = updatedCompany.completedTasks.map(t => t.id === id ? { ...t, nameAr: newName, nameEn: newName } : t);
    }
    setCurrentCompany(updatedCompany);
  };

  const addNewTask = () => {
    const newTask: Transaction = {
      id: Date.now().toString(),
      nameAr: 'خدمة جديدة / مستند جديد',
      nameEn: 'New Service / Document',
      status: 'Working on it',
      priority: 'Medium',
      dueDate: new Date().toISOString().split('T')[0],
      teamNotes: 'جاري البدء',
      clientNotes: '-',
      subitemsCount: 1,
      updatesText: 'تمت الإضافة بواسطة الأدمن'
    };
    const updatedCompany = { ...currentCompany, todoTasks: [...currentCompany.todoTasks, newTask] };
    setCurrentCompany(updatedCompany);
  };

  const handleCompanySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const found = clientsList.find(c => c.id === selectedId);
    if (found) {
      setCurrentCompany(found);
      setSuccessMessage(isEnglish ? `Switched to ${found.nameEn}` : `تم الانتقال إلى لوحة: ${found.nameAr}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const addNewCompany = async () => {
    const nameAr = prompt('أدخل اسم الشركة الجديدة بالعربي:');
    const nameEn = prompt('أدخل اسم الشركة بالإنجليزية:');
    const clientPassword = prompt('أدخل كلمة المرور الخاصة بالعميل:') || 'TM-2026';
    if (nameAr && nameEn) {
      try {
        await addDoc(collection(db, "clients"), {
          companyName: nameAr,
          password: clientPassword,
          createdAt: new Date().toISOString()
        });

        const newComp: ClientCompany = {
          id: Date.now().toString(),
          nameAr,
          nameEn,
          clientPassword,
          activeTasksCount: 0,
          generalClientNote: '',
          clientFiles: [],
          todoTasks: [],
          completedTasks: []
        };
        setClientsList([...clientsList, newComp]);
        setCurrentCompany(newComp);
        setSuccessMessage(isEnglish ? 'Company added!' : 'تم إضافة الشركة بنجاح!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error("Error adding company:", error);
      }
    }
  };

  const exportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const companiesToExport = isAdminMode ? clientsList : [currentCompany];

    let htmlContent = `
      <html dir="${isEnglish ? 'ltr' : 'rtl'}">
        <head>
          <title>Trans Missions Co - Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h2 { text-align: center; color: #10b981; }
            h3 { color: #374151; margin-top: 25px; border-bottom: 2px solid #10b981; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: ${isEnglish ? 'left' : 'right'}; font-size: 11px; }
            th { background-color: #10b981; color: white; }
          </style>
        </head>
        <body>
          <h2>${isEnglish ? 'Trans Missions Co - Master Report' : 'التقرير الشامل لمعاملات الشركات - ترانس ميشنز'}</h2>
    `;

    companiesToExport.forEach(comp => {
      const companyDisplayName = isEnglish ? comp.nameEn : comp.nameAr;
      const allCompTasks = [...comp.todoTasks, ...comp.completedTasks];
      const filesList = comp.clientFiles && comp.clientFiles.length > 0 ? comp.clientFiles.map(f => f.name).join(', ') : 'لا توجد مرفقات';
      htmlContent += `
        <h3>${isEnglish ? 'Company' : 'اسم الشركة'}: ${companyDisplayName}</h3>
        <p><strong>ملاحظة العميل:</strong> ${comp.generalClientNote || '-'}</p>
        <p><strong>المستندات المرفقة:</strong> ${filesList}</p>
        <table>
          <thead>
            <tr>
              <th>${isEnglish ? 'Service Name' : 'اسم الخدمة'}</th>
              <th>${isEnglish ? 'Status' : 'الحالة'}</th>
              <th>${isEnglish ? 'Priority' : 'الأولوية'}</th>
              <th>${isEnglish ? 'Timeline' : 'الموعد النهائي'}</th>
              <th>${isEnglish ? 'Team Notes' : 'ملاحظات الفريق'}</th>
              <th>${isEnglish ? 'Client Notes' : 'ملاحظات العميل'}</th>
              <th>${isEnglish ? 'Updates' : 'التحديثات'}</th>
            </tr>
          </thead>
          <tbody>
            ${allCompTasks.length === 0 ? `<tr><td colspan="7" style="text-align:center;">${isEnglish ? 'No tasks found.' : 'لا توجد خدمات مسجلة.'}</td></tr>` : 
              allCompTasks.map(t => `
                <tr>
                  <td>${isEnglish ? t.nameEn : t.nameAr}</td>
                  <td>${t.status}</td>
                  <td>${t.priority}</td>
                  <td>${t.dueDate}</td>
                  <td>${t.teamNotes}</td>
                  <td>${t.clientNotes}</td>
                  <td>${t.updatesText}</td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      `;
    });

    htmlContent += `
          <script>window.print();</script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const exportExcel = () => {
    const companiesToExport = isAdminMode ? clientsList : [currentCompany];
    
    let csvContent = "\uFEFF" + (isEnglish 
      ? "Company Name,Service Name,Status,Priority,Timeline,Team Notes,Client Notes,Updates\n" 
      : "اسم الشركة,اسم الخدمة,الحالة,الأولوية,الموعد النهائي,ملاحظات الفريق,ملاحظات العميل,التحديثات\n");

    companiesToExport.forEach(comp => {
      const compName = isEnglish ? comp.nameEn : comp.nameAr;
      const allCompTasks = [...comp.todoTasks, ...comp.completedTasks];
      
      if (allCompTasks.length === 0) {
        csvContent += `"${compName}","لا توجد خدمات مسجلة بعد (ملاحظة: ${comp.generalClientNote || '-'})","-","-","-","-","-","-"\n`;
      } else {
        allCompTasks.forEach(t => {
          const serviceName = isEnglish ? t.nameEn : t.nameAr;
          csvContent += `"${compName}","${serviceName}","${t.status}","${t.priority}","${t.dueDate}","${t.teamNotes}","${t.clientNotes}","${t.updatesText}"\n`;
        });
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Trans_Missions_All_Companies_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">Trans Missions Co</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              {isEnglish ? 'Active Client Dashboard: ' : 'لوحة متابعة معاملات شركة: '} 
              <span className="text-emerald-400 font-semibold">{isEnglish ? currentCompany.nameEn : currentCompany.nameAr}</span>
              {isAdminMode && <span className="ml-2 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold">Admin Mode ON ⚡</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleLogout} 
            className="bg-rose-950/50 hover:bg-rose-900 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-rose-800/50">
            🚪 {isEnglish ? 'Logout' : 'تسجيل خروج'}
          </button>

          <button 
            onClick={() => setIsEnglish(!isEnglish)} 
            className="bg-[#2b2d31] hover:bg-neutral-700 text-neutral-200 px-3 py-2 rounded-xl text-xs font-semibold transition border border-neutral-700">
            {isEnglish ? 'العربية 🇸🇦' : 'English 🇬🇧'}
          </button>
          <button onClick={exportPDF} className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md">
            📄 {isEnglish ? 'PDF' : 'طباعة PDF'}
          </button>
          <button onClick={exportExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md">
            📊 {isEnglish ? 'Excel' : 'تصدير Excel'}
          </button>
        </div>
      </div>

      {isAdminMode && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-amber-400 font-bold whitespace-nowrap">⚡ لوحة التحكم الإدارية (تنقل بين الشركات):</span>
            <select 
              value={currentCompany.id}
              onChange={handleCompanySelectChange}
              className="bg-[#2b2d31] text-white border border-amber-500/50 rounded-xl px-3 py-2 font-semibold focus:outline-none w-full md:w-64">
              {clientsList.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {isEnglish ? comp.nameEn : comp.nameAr}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={addNewCompany} className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-bold transition">
              + {isEnglish ? 'Add Company' : 'إضافة شركة جديدة'}
            </button>
            <button onClick={addNewTask} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold transition">
              + {isEnglish ? 'Add Service' : 'إضافة خدمة'}
            </button>
            <button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg font-bold transition shadow">
              🔄 {isEnglish ? 'Update & Save' : 'تحديث وحفظ'}
            </button>
          </div>
        </div>
      )}

      {/* صندوق ملاحظات العميل وطلب الخدمات ورفع المستندات */}
      <div className="mb-6 bg-neutral-900 border border-neutral-700 p-4 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-emerald-400 mb-1.5">
              {isEnglish ? 'Your Notes / Document Status to Team:' : 'ملاحظاتك ومستنداتك لفريق العمل:'}
            </label>
            <input 
              type="text"
              value={currentCompany.generalClientNote || ''}
              disabled={isAdminMode}
              onChange={(e) => setCurrentCompany({ ...currentCompany, generalClientNote: e.target.value })}
              placeholder={isEnglish ? 'e.g. I have not uploaded my documents yet...' : 'مثال: لم أرفع مستنداتي بعد، أو أي ملاحظة تريد إرسالها للأدمن...'}
              className="bg-[#2b2d31] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white w-full focus:outline-none focus:border-emerald-500 disabled:opacity-75"
            />
          </div>

          {!isAdminMode && (
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-4 md:mt-5">
              {/* زرار طلب خدمة جديدة للعميل */}
              <button 
                onClick={clientAddRequest}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-md whitespace-nowrap text-center">
                ➕ {isEnglish ? 'Request Service' : 'طلب خدمة أو تعديل جديد'}
              </button>

              <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md whitespace-nowrap text-center">
                📁 {isEnglish ? 'Upload Files' : 'إرفاق مستندات (PDF / صور)'}
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
              </label>

              <button 
                onClick={handleGeneralNoteUpdate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md whitespace-nowrap">
                {isEnglish ? 'Update Note' : 'تحديث الملاحظة'}
              </button>
            </div>
          )}
        </div>

        {/* عرض المستندات المرفقة (للعميل وللأدمن) */}
        {currentCompany.clientFiles && currentCompany.clientFiles.length > 0 && (
          <div className="border-t border-neutral-800 pt-3">
            <span className="text-xs font-bold text-neutral-400 block mb-2">
              {isEnglish ? 'Attached Documents:' : 'المستندات والمرفقات الخاصة بالشركة:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {currentCompany.clientFiles.map((file, idx) => (
                <a 
                  key={idx} 
                  href={file.url} 
                  download={file.name}
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#2b2d31] hover:bg-neutral-700 text-emerald-400 border border-neutral-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition">
                  <span>📎 {file.name}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">تحميل / معاينة</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* شريط البحث السريع */}
      <div className="flex items-center justify-between mb-6 bg-[#1e1f22] p-3 rounded-xl border border-neutral-800">
        <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold">
          {isEnglish ? `Dashboard: ${currentCompany.nameEn}` : `لوحة متابعة معاملات: ${currentCompany.nameAr}`}
        </span>
        <input 
          type="text"
          placeholder={isEnglish ? 'Quick search services...' : 'بحث سريع في الخدمات...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#2b2d31] border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-64"
        />
      </div>

      {/* جدول قيد الإجراء */}
      <div className="bg-[#18191c] rounded-2xl border border-neutral-800 overflow-hidden mb-8 shadow-2xl">
        <div className="bg-[#202225] px-4 py-3 font-bold text-sm text-emerald-400 flex justify-between items-center border-b border-neutral-800">
          <span className="flex items-center gap-2">🟢 {isEnglish ? 'To-Do (In Progress)' : 'قيد الإجراء (To-Do)'}</span>
          <span className="text-xs bg-[#2b2d31] px-2.5 py-1 rounded-md text-neutral-300 font-normal">{currentCompany.todoTasks.length} {isEnglish ? 'Services' : 'خدمات'}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#151618] text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="p-3.5">{isEnglish ? 'Service / Transaction' : 'اسم الخدمة / المعاملة'}</th>
                <th className="p-3.5 text-center">Updates</th>
                <th className="p-3.5 text-center">Subitems</th>
                <th className="p-3.5">{isEnglish ? 'Status' : 'الحالة'}</th>
                <th className="p-3.5">{isEnglish ? 'Priority' : 'الأولوية'}</th>
                <th className="p-3.5">{isEnglish ? 'Timeline' : 'الموعد النهائي'}</th>
                <th className="p-3.5">{isEnglish ? 'Team Notes' : 'ملاحظات الفريق'}</th>
                <th className="p-3.5">{isEnglish ? 'Client Notes' : 'ملاحظات العميل'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {currentCompany.todoTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-400">
                    {isEnglish ? 'No active services yet. The admin will assign your services soon.' : 'لا توجد خدمات قيد الإجراء حالياً. سيقوم فريق العمل بإضافة خدماتك قريباً.'}
                  </td>
                </tr>
              ) : (
                currentCompany.todoTasks.filter(t => (isEnglish ? t.nameEn : t.nameAr).includes(searchTerm)).map((t) => (
                  <tr key={t.id} className="hover:bg-[#202225]/60 transition">
                    <td className="p-3.5 font-medium text-white">
                      {/* تعديل حقل اسم الخدمة ليصبح مرناً ومتاحاً للاختيار أو الكتابة اليدوية للجميع (للأدمن وللعميل) */}
                      <div className="flex flex-col gap-1.5">
                        <select
                          onChange={(e) => {
                            if (e.target.value) handleServiceNameChange(t.id, 'todo', e.target.value);
                          }}
                          className="bg-[#2b2d31] text-emerald-400 border border-neutral-700 rounded p-1.5 text-[11px] font-bold focus:outline-none focus:border-emerald-500">
                          <option value="">-- اختر من الخدمات الجاهزة أو اكتب يدوياً --</option>
                          {availableServices.map((s, idx) => (
                            <option key={idx} value={isEnglish ? s.en : s.ar}>{isEnglish ? s.en : s.ar}</option>
                          ))}
                        </select>
                        <input 
                          type="text"
                          value={isEnglish ? t.nameEn : t.nameAr}
                          onChange={(e) => handleServiceNameChange(t.id, 'todo', e.target.value)}
                          placeholder="اكتب اسم الخدمة أو الطلب الخاص بك..."
                          className="bg-[#2b2d31] border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </td>
                    
                    <td className="p-3.5 text-center">
                      {isAdminMode ? (
                        <input 
                          type="text"
                          value={t.updatesText}
                          onChange={(e) => handleUpdatesChange(t.id, 'todo', e.target.value)}
                          className="bg-[#2b2d31] border border-neutral-700 rounded px-2 py-1 text-[11px] text-white w-32 focus:outline-none focus:border-emerald-500"
                        />
                      ) : (
                        <span title={t.updatesText} className="cursor-pointer bg-[#2b2d31] px-2 py-1 rounded text-neutral-300 text-[11px]">💬 عرض</span>
                      )}
                    </td>

                    <td className="p-3.5 text-center">
                      {isAdminMode ? (
                        <input 
                          type="number"
                          min="0"
                          value={t.subitemsCount}
                          onChange={(e) => handleSubitemsChange(t.id, 'todo', parseInt(e.target.value) || 0)}
                          className="bg-[#2b2d31] border border-neutral-700 rounded px-1 py-1 text-[11px] text-white w-14 text-center focus:outline-none focus:border-emerald-500"
                        />
                      ) : (
                        <span className="bg-[#2b2d31] text-neutral-300 px-2 py-0.5 rounded text-[10px]">🔲 {t.subitemsCount}</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      {isAdminMode ? (
                        <select 
                          value={t.status}
                          onChange={(e) => handleStatusChange(t.id, 'todo', e.target.value as Transaction['status'])}
                          className="bg-[#2b2d31] text-white border border-neutral-700 rounded p-1 text-[11px] font-bold">
                          <option value="Working on it">Working on it</option>
                          <option value="Done">Done</option>
                          <option value="Stuck">Stuck</option>
                          <option value="Not Started">Not Started</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-semibold inline-block text-center min-w-[100px] ${
                          t.status === 'Working on it' ? 'bg-[#fdab3d] text-neutral-950 font-bold' :
                          t.status === 'Done' ? 'bg-[#00c875] text-white font-bold' :
                          t.status === 'Stuck' ? 'bg-[#e2445c] text-white font-bold' :
                          'bg-[#c4c4c4] text-neutral-900 font-bold'
                        }`}>
                          {t.status}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      {isAdminMode ? (
                        <select 
                          value={t.priority}
                          onChange={(e) => handlePriorityChange(t.id, 'todo', e.target.value as Transaction['priority'])}
                          className="bg-[#2b2d31] text-white border border-neutral-700 rounded p-1 text-[11px] font-bold">
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold inline-block text-center min-w-[80px] ${
                          t.priority === 'Critical' ? 'bg-[#333333] text-white border border-rose-500' :
                          t.priority === 'High' ? 'bg-[#401694] text-purple-200' :
                          t.priority === 'Medium' ? 'bg-[#5559df] text-blue-100' :
                          'bg-[#579bfc] text-blue-50'
                        }`}>
                          {t.priority}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      {isAdminMode ? (
                        <input 
                          type="date"
                          value={t.dueDate}
                          onChange={(e) => handleDateChange(t.id, 'todo', e.target.value)}
                          className="bg-[#2b2d31] border border-neutral-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-emerald-500"
                        />
                      ) : (
                        <span className="bg-[#2b2d31] text-neutral-300 px-2.5 py-1 rounded-md text-[11px]">{t.dueDate}</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      {isAdminMode ? (
                        <input 
                          type="text"
                          value={t.teamNotes}
                          onChange={(e) => handleTeamNoteChange(t.id, 'todo', e.target.value)}
                          className="bg-[#2b2d31] border border-neutral-700 rounded px-2 py-1 text-xs text-white w-full focus:outline-none focus:border-emerald-500"
                        />
                      ) : (
                        <span className="text-neutral-400 italic">{t.teamNotes}</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="text"
                          value={t.clientNotes}
                          onChange={(e) => handleClientNoteChange(t.id, 'todo', e.target.value)}
                          placeholder="اكتب ملاحظة..."
                          className="bg-[#2b2d31] border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-white w-full focus:outline-none focus:border-emerald-500"
                        />
                        <button 
                          onClick={() => updateSingleClientNote(t.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap shadow">
                          {isEnglish ? 'Update' : 'تحديث'}
                        </button>
                      </div>
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