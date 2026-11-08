'use client';
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function ConsultancyPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        phone,
        message: `[Online Consultancy Request] ${message}`,
        createdAt: new Date().toISOString(),
      });

      await emailjs.send(
        "service_qtbr79k",
        "template_whk6cxn",
        {
          from_name: name,
          from_email: email,
          phone: phone,
          message: `Consultancy Request: ${message}`,
        },
        "mvQrmbMTkV4nm9Lzz"
      );

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-100 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="bg-neutral-800/95 border-neutral-700 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo1.png" alt="Logo" className="h-10 w-auto object-contain" />
            <span className="font-extrabold text-sm">Trans Missions</span>
          </Link>
          <button onClick={toggleLanguage} className="flex items-center gap-1 bg-neutral-700 px-3 py-1.5 rounded-xl text-xs font-medium">
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </header>

      <main className="py-12 px-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-700 transition text-sm font-medium">
            <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-700 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl sm:text-3xl font-black mb-2 uppercase text-center">
            {lang === 'ar' ? 'حجز استشارة مجانية أونلاين' : 'Book Free Online Consultancy'}
          </h1>
          <p className="text-center text-sm opacity-75 mb-8">
            {lang === 'ar' ? 'تواصل مع خبرائنا في السوق القطري واحصل على استشارتك' : 'Connect with our experts in the Qatari market'}
          </p>

          {success ? (
            <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center font-medium">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              {lang === 'ar' ? 'تم حجز استشارتك بنجاح وسنتواصل معك قريباً!' : 'Consultancy booked successfully!'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Mohamed Ali" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+974 ..." className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'موضوع الاستشارة' : 'Consultancy Topic'}</label>
                <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Write your inquiry here...'} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xl">
                {loading ? (lang === 'ar' ? 'جاري الحجز...' : 'Booking...') : (lang === 'ar' ? 'تأكيد حجز الاستشارة' : 'Confirm Consultation Booking')}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}