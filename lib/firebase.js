import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// إعدادات مشروع فايربيس الخاص بك
const firebaseConfig = {
  apiKey: "مفتاح_الـ_api_هنا",
  authDomain: "transmissions-storage.firebaseapp.com",
  projectId: "transmissions-storage",
  storageBucket: "transmissions-storage.appspot.com",
  messagingSenderId: "رقم_المراسله",
  appId: "معرف_التطبيق"
};

// تهيئة تطبيق فايربيس أو جلب النسخة الموجودة فعلياً
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };