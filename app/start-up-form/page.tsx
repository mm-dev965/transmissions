"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowRight, Building, Upload, CheckCircle2 } from "lucide-react";

export default function StartUpFormPage() {
  // بيانات الشركاء (العدد 4 شركاء كما طلبتِ)
  const [partners, setPartners] = useState([
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
    { name: "", percentage: "", idNumber: "", file: null as File | null },
  ]);

  const [totalShares, setTotalShares] = useState("");
  const [activities, setActivities] = useState("");
  const [partnersContacts, setPartnersContacts] = useState("");
  const [signatories, setSignatories] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePartnerChange = (index: number, field: string, value: any) => {
    const newPartners = [...partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setPartners(newPartners);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // حفظ بيانات نموذج التأسيس في فايرستور
      await addDoc(collection(db, "start_up_forms"), {
        partners: partners.map(p => ({
          name: p.name,
          percentage: p.percentage,
          idNumber: p.idNumber,
          hasAttachment: p.file ? true : false,
        })),
        totalShares,
        activities,
        partnersContacts,
        signatories,
        createdAt: new Date().toISOString(),
      });

      setSuccessMessage("تم إرسال نموذج التأسيس بنجاح وحفظه في النظام!");
      // تفريغ الحقول بعد الإرسال الناجح
      setPartners([
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
        { name: "", percentage: "", idNumber: "", file: null },
      ]);
      setTotalShares("");
      setActivities("");
      setPartnersContacts("");
      setSignatories("");
    } catch (error) {
      console.error("خطأ في حفظ النموذج:", error);
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="max-w-4xl mx-auto">
        {/* زر الرجوع */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-700 transition font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10 border-b border-neutral-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-wide uppercase mb-2">
              Start Up Form
            </h1>
            <p className="text-neutral-400 text-sm">
              Trans Missions Trading And Services W.L.L - Company Incorporation Portal
            </p>
          </div>

          {successMessage && (
            <div className="mb-8 p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-300 rounded-2xl text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* قسم الشركاء الأربعة مع إرفاق المستندات لكل شريك */}
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-3 text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
                <div className="col-span-5">Partner Name</div>
                <div className="col-span-2">Percentage</div>
                <div className="col-span-3">ID Number</div>
                <div className="col-span-2 text-center">ID Copy</div>
              </div>

              {partners.map((partner, index) => (
                <div key={index} className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <label className="block text-[11px] text-neutral-400 mb-1">Partner {index + 1}</label>
                    <input
                      type="text"
                      required={index < 2} // أول شريكين إلزابيين مثلاً
                      value={partner.name}
                      onChange={(e) => handlePartnerChange(index, "name", e.target.value)}
                      placeholder={`Owner Name ${index + 1}`}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1">%</label>
                    <input
                      type="text"
                      value={partner.percentage}
                      onChange={(e) => handlePartnerChange(index, "percentage", e.target.value)}
                      placeholder="e.g. 25%"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 text-center"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-[11px] text-neutral-400 mb-1">ID / Passport</label>
                    <input
                      type="text"
                      value={partner.idNumber}
                      onChange={(e) => handlePartnerChange(index, "idNumber", e.target.value)}
                      placeholder="ID Number"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-2 text-center">
                    <label className="block text-[11px] text-neutral-400 mb-1">Attach ID</label>
                    <label className="cursor-pointer inline-flex items-center justify-center w-full px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 rounded-xl border border-neutral-700 text-xs font-semibold transition">
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      <span>{partner.file ? "Attached" : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handlePartnerChange(index, "file", e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* إجمالي الحصص */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Total Shares</label>
              <input
                type="text"
                required
                value={totalShares}
                onChange={(e) => setTotalShares(e.target.value)}
                placeholder="Enter total shares capital..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* الأنشطة ونطاق العمل */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Activities / Scope of Works</label>
              <textarea
                rows={3}
                required
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="Describe company activities and scope of works..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            {/* إيميلات وهواتف الشركاء */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Emails of Partners and their Phones</label>
              <textarea
                rows={3}
                required
                value={partnersContacts}
                onChange={(e) => setPartnersContacts(e.target.value)}
                placeholder="Enter partners emails and phone numbers..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            {/* أسماء المخولين بالتوقيع */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Names of Signatories</label>
              <textarea
                rows={3}
                required
                value={signatories}
                onChange={(e) => setSignatories(e.target.value)}
                placeholder="Enter names of authorized signatories..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl transition duration-200 disabled:bg-neutral-800"
            >
              {loading ? "Submitting Form..." : "Submit Start Up Form Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}