import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- الإضافة الجديدة فقط

// إعدادات مشروع فايربيس الخاص بك (نفسها تماماً بدون أي تغيير)
const firebaseConfig = {
  apiKey: "مفتاح_الـ_api_هنا",
  authDomain: "transmissions-storage.firebaseapp.com",
  projectId: "transmissions-storage",
  storageBucket: "transmissions-storage.appspot.com",
  messagingSenderId: "رقم_المراسله",
  appId: "معرف_التطبيق"
};

// تهيئة تطبيق فايربيز أو جلب النسخة الموجودة فعلياً
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app); // <-- الإضافة الجديدة فقط لتعريف الـ Storage

export { db, storage }; // <-- صدرنا الاتنين مع بعض عشان البورتال يشتغل بكفاءة