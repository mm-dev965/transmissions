import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// إعدادات مشروع فايربيز الخاص بك
const firebaseConfig = {
  apiKey: "ضع_مفتاح_api_هنا",
  authDomain: "transmissions-storage.firebaseapp.com",
  projectId: "transmissions-storage",
  storageBucket: "transmissions-storage.appspot.com",
  messagingSenderId: "رقم_المراسلة",
  appId: "معرف_التطبيق"
};

// تهيئة تطبيق فايربيز بشكل آمن
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };