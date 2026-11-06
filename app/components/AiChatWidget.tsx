'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  
  useEffect(() => {
    const checkLanguage = () => {
      const currentPath = window.location.pathname;
      const htmlLang = document.documentElement.lang || '';
      const isEnPage = currentPath.includes('/en') || htmlLang.startsWith('en') || document.body.classList.contains('en');
      const hasEnglishElements = document.querySelector('nav')?.textContent?.includes('Services') || false;

      setIsEnglish(isEnPage || hasEnglishElements);
    };

    checkLanguage();
    const interval = setInterval(checkLanguage, 500);
    return () => clearInterval(interval);
  }, []);

  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      text: isEnglish 
        ? 'Welcome to Trans Missions Trading And Services! How can I assist you with your company formation or inquiries in Qatar today?' 
        : 'مرحباً بك في ترانس ميشنز للتجارة والخدمات! كيف يمكنني مساعدتك في تأسيس شركتك أو استفسارك حول السوق القطري اليوم؟',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSaved, setChatSaved] = useState(false);

  useEffect(() => {
    setMessages([
      { 
        role: 'model', 
        text: isEnglish 
          ? 'Welcome to Trans Missions Trading And Services! How can I assist you with your company formation or inquiries in Qatar today?' 
          : 'مرحباً بك في ترانس ميشنز للتجارة والخدمات! كيف يمكنني مساعدتك في تأسيس شركتك أو استفسارك حول السوق القطري اليوم؟',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [isEnglish]);

  const saveChatToFirebase = async (currentMessages: any[]) => {
    try {
      await addDoc(collection(db, "chat_conversations"), {
        messages: currentMessages,
        createdAt: new Date().toISOString(),
        platform: 'Website AI Chat',
        company: 'Trans Missions Trading And Services W.L.L'
      });
      setChatSaved(true);
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', text: input, timestamp: timeString };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      let updatedMessages = [];
      if (data.reply) {
        updatedMessages = [...newMessages, { role: 'model', text: data.reply, timestamp: replyTime }];
      } else {
        const errorText = isEnglish ? 'Sorry, an error occurred. Please try again.' : 'عذراً، حدث خطأ في الرد. يرجى المحاولة مرة أخرى.';
        updatedMessages = [...newMessages, { role: 'model', text: errorText, timestamp: replyTime }];
      }
      
      setMessages(updatedMessages);
      await saveChatToFirebase(updatedMessages);

    } catch (err) {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const errorConn = isEnglish ? 'Sorry, could not connect to AI assistant.' : 'عذراً، تعذر الاتصال بالمساعد الذكي حالياً.';
      const updatedMessages = [...newMessages, { role: 'model', text: errorConn, timestamp: replyTime }];
      setMessages(updatedMessages);
      await saveChatToFirebase(updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = "97450080984";
  const chatSummaryText = encodeURIComponent(
    isEnglish 
      ? "Hello, please click here to follow up with the Public Relations Officer." 
      : "مرحباً، من فضلك اضغط هنا للمتابعة مع مسئول العلاقات العامة."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${chatSummaryText}`;

  // القاعدة البسيطة: الزرار يظهر فوراً بمجرد أن يكتب العميل أي رسالة (أي أن عدد الرسائل أكبر من رسالة الترحيب الأولى)
  const showWhatsappButton = messages.length > 1;

  return (
    <div className={`fixed bottom-5 ${isEnglish ? 'right-5' : 'left-5'} z-50`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition font-bold text-sm flex items-center gap-2"
        >
          💬 {isEnglish ? 'Chat with AI Assistant' : 'تواصل مع المساعد الذكي'}
        </button>
      ) : (
        <div className={`w-80 h-[520px] bg-neutral-900 text-white rounded-2xl shadow-2xl flex flex-col border border-emerald-600 overflow-hidden ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
          
          {/* رأس الشات */}
          <div className="bg-emerald-700 p-3.5 flex justify-between items-center shrink-0">
            <span className="font-bold text-sm">Trans Missions AI</span>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg">✕</button>
          </div>

          {/* صندوق الرسائل */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-emerald-600 ' + (isEnglish ? 'ml-auto' : 'mr-auto') + ' text-white' : 'bg-neutral-800 ' + (isEnglish ? 'mr-auto' : 'ml-auto') + ' text-neutral-200'}`}>
                <div>{m.text}</div>
                <div className={`text-[9px] opacity-70 mt-1 ${isEnglish ? 'text-right' : 'text-left'}`}>{m.timestamp}</div>
              </div>
            ))}
            {loading && <div className="text-emerald-400 text-xs italic text-center">{isEnglish ? 'Typing...' : 'جاري الرد...'}</div>}
          </div>

          {/* زر العلاقات العامة يظهر تلقائياً بمجرد حدوث أي تفاعل من العميل */}
          {showWhatsappButton && (
            <div className="p-2.5 bg-neutral-900 border-t border-neutral-800 shrink-0">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-xl text-center text-xs transition shadow-md border border-emerald-500/50"
              >
                {isEnglish ? '💬 Please click here to follow up with the Public Relations Officer' : '💬 من فضلك اضغط هنا للمتابعة مع مسئول العلاقات العامة'}
              </a>
            </div>
          )}

          {/* مربع كتابة الرسالة */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-800 flex gap-2 bg-neutral-900 shrink-0">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEnglish ? 'Type your inquiry here...' : 'اكتب استفسارك هنا...'} 
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-emerald-700 font-bold">
              {isEnglish ? 'Send' : 'إرسال'}
            </button>
          </form>

        </div>
      )}
    </div>
  );
}