'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        phone,
        message,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-300 hover:bg-neutral-800 transition font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>العودة للرئيسية / Back to Home</span>
          </Link>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
          <div className="text-center border-b border-neutral-800 pb-6">
            <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
              Contact Us - اتصل بنا
            </h1>
            <p className="text-neutral-400 text-sm">
              Trans Missions Trading And Services W.L.L - Qatar
            </p>
          </div>

          {/* معلومات الاتصال المباشر */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800 text-center space-y-2">
              <Phone className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="text-xs text-neutral-400">Phone / الهاتف</p>
              <p className="text-sm font-bold text-white font-mono" dir="ltr">+974 50080984</p>
            </div>

            <div className="bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800 text-center space-y-2">
              <Mail className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="text-xs text-neutral-400">Email / البريد</p>
              <p className="text-sm font-bold text-white">info@transmissionsqa.com</p>
            </div>

            <div className="bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800 text-center space-y-2">
              <MapPin className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="text-xs text-neutral-400">Location / الموقع</p>
              <p className="text-xs font-bold text-white">Al Mirqab Mall, Doha</p>
            </div>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-300 rounded-2xl text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>تم إرسال رسالتك بنجاح، سنقوم بالتواصل معك في أقرب وقت!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-300 mb-2">Full Name / الاسم الكامل</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mohamed Ali"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-300 mb-2">Email / البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-300 mb-2">Phone / رقم الهاتف</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+974 ..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-300 mb-2">Message / نص الرسالة</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or inquiry here..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl transition duration-200 disabled:bg-neutral-800"
            >
              {loading ? "Sending Message..." : "Send Message Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}