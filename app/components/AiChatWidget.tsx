'use client';
import { useState, useEffect } from 'react';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  
  // التحقق المباشر من حالة اللغة في الموقع (مسار الصفحة أو زر اللغة)
  useEffect(() => {
    const checkLanguage = () => {
      const currentPath = window.location.pathname;
      const htmlLang = document.documentElement.lang || '';
      // التحقق إذا كان المسار يحتوي على /en أو أن لغة الصفحة إنجليزية
      const isEnPage = currentPath.includes('/en') || htmlLang.startsWith('en') || document.body.classList.contains('en');
      
      // يمكنك أيضاً التحقق مما إذا كانت النصوص في الصفحة بالإنجليزية
      const hasEnglishElements = document.querySelector('nav')?.textContent?.includes('Services') || false;

      setIsEnglish(isEnPage || hasEnglishElements);
    };

    checkLanguage();
    
    // مراقبة التغييرات في الصفحة
    const interval = setInterval(checkLanguage, 500);
    return () => clearInterval(interval);
  }, []);

  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      text: isEnglish 
        ? 'Welcome to Trans Missions Trading And Services! How can I assist you with your company formation or inquiries in Qatar today?' 
        : 'مرحباً بك في ترانس ميشنز للتجارة والخدمات! كيف يمكنني مساعدتك في تأسيس شركتك أو استفسارك حول السوق القطري اليوم؟' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      { 
        role: 'model', 
        text: isEnglish 
          ? 'Welcome to Trans Missions Trading And Services! How can I assist you with your company formation or inquiries in Qatar today?' 
          : 'مرحباً بك في ترانس ميشنز للتجارة والخدمات! كيف يمكنني مساعدتك في تأسيس شركتك أو استفسارك حول السوق القطري اليوم؟' 
      }
    ]);
  }, [isEnglish]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
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
      
      if (data.reply) {
        setMessages([...newMessages, { role: 'model', text: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'model', text: isEnglish ? 'Sorry, an error occurred. Please try again.' : 'عذراً، حدث خطأ في الرد. يرجى المحاولة مرة أخرى.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'model', text: isEnglish ? 'Sorry, could not connect to AI assistant.' : 'عذراً، تعذر الاتصال بالمساعد الذكي حالياً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-5 ${isEnglish ? 'right-5' : 'left-5'} z-50`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-700 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-800 transition font-bold text-sm flex items-center gap-2"
        >
          💬 {isEnglish ? 'Chat with AI Assistant' : 'تواصل مع المساعد الذكي'}
        </button>
      ) : (
        <div className={`w-80 h-[420px] bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col border border-green-600 ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
          <div className="bg-green-800 p-4 rounded-t-2xl flex justify-between items-center">
            <span className="font-bold text-sm">Trans Missions AI</span>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg">✕</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-green-700 ' + (isEnglish ? 'ml-auto' : 'mr-auto') + ' text-white' : 'bg-gray-800 ' + (isEnglish ? 'mr-auto' : 'ml-auto') + ' text-gray-200'}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="text-green-400 text-xs italic text-center">{isEnglish ? 'Typing...' : 'جاري الرد...'}</div>}
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex gap-2 bg-gray-900 rounded-b-2xl">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEnglish ? 'Type your inquiry here...' : 'اكتب استفسارك هنا...'} 
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500"
            />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs hover:bg-green-800 font-bold">
              {isEnglish ? 'Send' : 'إرسال'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}