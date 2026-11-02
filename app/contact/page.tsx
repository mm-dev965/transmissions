"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function ContactPage() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("orders@transmissionsqa.com");
  const [signerName, setSignerName] = useState("");
  const [signerPhone, setSignerPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [caseDetails, setCaseDetails] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "orders"), {
        companyName,
        companyEmail,
        signerName,
        signerPhone,
        whatsappNumber,
        caseDetails,
        totalFilesAttached: fileCount,
        createdAt: new Date().toISOString(),
      });

      setSuccessMessage("تم إرسال طلبك بنجاح وحفظه في قاعدة البيانات!");
      setCompanyName("");
      setSignerName("");
      setSignerPhone("");
      setWhatsappNumber("");
      setCaseDetails("");
      setFileCount(0);
    } catch (error) {
      console.error("خطأ في حفظ الطلب: ", error);
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* زر الرجوع للرئيسية */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition shadow-sm font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>الرجوع إلى الرئيسية</span>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
            شركة Trans Missions Trading And Services W.L.L
          </h1>
          <p className="text-gray-600 text-center mb-3">
            بوابة رفع الطلبات أونلاين وإرفاق المستندات
          </p>

          {/* رقم هاتف الشركة الرسمي في الأعلى */}
          <div className="flex items-center justify-center gap-2 mb-8 bg-blue-50 py-2.5 px-4 rounded-xl border border-blue-100 text-blue-800 font-semibold text-sm">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>للتواصل المباشر مع الشركة:</span>
            <span dir="ltr" className="font-mono font-bold">+974 50080984</span>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الشركة
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="أدخل اسم الشركة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني الرسمي
              </label>
              <input
                type="email"
                required
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم
              </label>
              <input
                type="text"
                required
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="الاسم الكامل"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم هاتف التواصل بقطر
              </label>
              <input
                type="tel"
                required
                value={signerPhone}
                onChange={(e) => setSignerPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="+974 ..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الواتساب
              </label>
              <input
                type="tel"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="+974 ..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تفاصيل الحالة أو الطلب
              </label>
              <textarea
                rows={4}
                required
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="اكتب تفاصيل حالتك أو الخدمة المطلوبة بالتفصيل..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                إرفاق الأوراق الرسمية والمستندات (يمكنك اختيار حتى 40 صورة أو ملف PDF دفعة واحدة)
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,image/png,image/jpeg"
                onChange={(e) => {
                  if (e.target.files) {
                    setFileCount(e.target.files.length);
                  }
                }}
                className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {fileCount > 0 && (
                <p className="text-sm text-green-600 mt-2 font-medium">
                  تم تحديد {fileCount} ملفاً للرفع بنجاح.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
            >
              {loading ? "جاري إرسال الطلب..." : "إرسال الطلب الآن"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}