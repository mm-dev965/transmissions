'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { MessageSquare, X } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  
  useEffect(() => {
    const checkLanguage = () => {
      if (typeof window === 'undefined') return;
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

  const getWelcomeText = (english: boolean) => 
    english 
      ? 'Welcome to Trans Missions Trading And Services! How can I assist you with your company formation or inquiries in Qatar today?' 
      : 'مرحباً بك في ترانس ميشنز للتجارة والخدمات! كيف يمكنني مساعدتك في تأسيس شركتك أو استفسارك حول السوق القطري اليوم؟';

  const getTimeString = () => {
    if (typeof window === 'undefined') return '';
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'مرحباً بك في ترانس ميشنز للتجارة والخدمات! كيف يمكنني مساعدتك في تأسيس شركتك أو استفسارك حول السوق القطري اليوم؟',
      timestamp: ''
    }
  ]);

  useEffect(() => {
    setMessages(prev => [
      { ...prev[0], text: getWelcomeText(isEnglish) }
    ]);
  }, [isEnglish]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const saveChatToFirebase = async (currentMessages: Message[]) => {
    try {
      await addDoc(collection(db, "chat_conversations"), {
        messages: currentMessages,
        createdAt: new Date().toISOString(),
        platform: 'Website AI Chat',
        company: 'Trans Missions Trading And Services W.L.L'
      });
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const timeString = getTimeString();
    const userMsg: Message = { role: 'user', text: input, timestamp: timeString };
    const newMessages: Message[] = [...messages, userMsg];
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
      const replyTime = getTimeString();
      
      let updatedMessages: Message[] = [];
      if (data.reply) {
        updatedMessages = [...newMessages, { role: 'model', text: data.reply, timestamp: replyTime }];
      } else {
        const errorText = isEnglish ? 'Sorry, an error occurred. Please try again.' : 'عذراً، حدث خطأ في الرد. يرجى المحاولة مرة أخرى.';
        updatedMessages = [...newMessages, { role: 'model', text: errorText, timestamp: replyTime }];
      }
      
      setMessages(updatedMessages);
      await saveChatToFirebase(updatedMessages);

    } catch (err) {
      const replyTime = getTimeString();
      const errorConn = isEnglish ? 'Sorry, could not connect to AI assistant.' : 'عذراً، تعذر الاتصال بالمساعد الذكي حالياً.';
      const updatedMessages: Message[] = [...newMessages, { role: 'model', text: errorConn, timestamp: replyTime }];
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

  const showWhatsappButton = messages.length > 1;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-8" dir={isEnglish ? 'ltr' : 'rtl'}>
      {!isOpen ? (
        <div className="bg-neutral-900 border border-emerald-600/50 p-6 rounded-3xl text-center shadow-xl flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isEnglish ? 'Need instant help? Chat with our AI Assistant' : 'تحتاج مساعدة فورية؟ تحدث مع المساعد الذكي'}
          </h3>
          <p className="text-xs text-neutral-400 max-w-md">
            {isEnglish ? 'Ask anything about company formation, requirements, or services in Qatar.' : 'اسأل عن أي تفاصيل تخص تأسيس الشركات، الشروط، أو الخدمات في قطر.'}
          </p>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:bg-emerald-700 transition font-bold text-xs flex items-center gap-2 cursor-pointer mt-1"
          >
            💬 {isEnglish ? 'Start AI Chat' : 'ابدأ المحادثة الآن'}
          </button>
        </div>
      ) : (
        <div className="w-full h-[480px] bg-neutral-900 text-white rounded-3xl shadow-2xl flex flex-col border border-emerald-600 overflow-hidden">
          
          <div className="bg-emerald-700 p-4 flex justify-between items-center shrink-0">
            <span className="font-bold text-sm">Trans Missions AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg cursor-pointer p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`p-3 rounded-2xl max-w-[85%] ${m.role === 'user' ? 'bg-emerald-600 ' + (isEnglish ? 'ml-auto' : 'mr-auto') + ' text-white' : 'bg-neutral-800 ' + (isEnglish ? 'mr-auto' : 'ml-auto') + ' text-neutral-200'}`}>
                <div>{m.text}</div>
                {m.timestamp && <div className={`text-[9px] opacity-70 mt-1 ${isEnglish ? 'text-right' : 'text-left'}`}>{m.timestamp}</div>}
              </div>
            ))}
            {loading && <div className="text-emerald-400 text-xs italic text-center">{isEnglish ? 'Typing...' : 'جاري الرد...'}</div>}
          </div>

          {showWhatsappButton && (
            <div className="p-3 bg-neutral-900 border-t border-neutral-800 shrink-0">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs transition shadow-md border border-emerald-500/50"
              >
                {isEnglish ? '💬 Please click here to follow up with the Public Relations Officer' : '💬 من فضلك اضغط هنا للمتابعة مع مسئول العلاقات العامة'}
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-800 flex gap-2 bg-neutral-950 shrink-0">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEnglish ? 'Type your inquiry here...' : 'اكتب استفسارك هنا...'} 
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button type="submit" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs hover:bg-emerald-700 font-bold cursor-pointer">
              {isEnglish ? 'Send' : 'إرسال'}
            </button>
          </form>

        </div>
      )}
    </div>
  );
}