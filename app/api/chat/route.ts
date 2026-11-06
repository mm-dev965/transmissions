import { NextResponse } from 'next/server';
import { companyInfo } from '../../components/companyInfo';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.text?.toLowerCase() || '';
    const isEnglish = /[a-zA-Z]/.test(lastMessage);

    const info = isEnglish ? companyInfo.en : companyInfo.ar;
    let reply = "";

    // التحيات
    if (lastMessage.includes('السلام') || lastMessage.includes('أهلاً') || lastMessage.includes('مرحبا') || lastMessage.includes('hi') || lastMessage.includes('hello')) {
      reply = isEnglish 
        ? `Hello! Welcome to ${info.name}. How can we assist you today? Please fill out the Start-up Form and our team will contact you.`
        : `أهلاً بك في شركة ${info.name}! كيف يمكننا مساعدتك اليوم؟ يرجى ملء نموذج التأسيس (Start-up Form) وسيتواصل معك فريقنا المختص.`;
    } 
    // أسئلة التكاليف
    else if (lastMessage.includes('تكلفة') || lastMessage.includes('سعر') || lastMessage.includes('رسوم') || lastMessage.includes('cost')) {
      reply = isEnglish
        ? `Regarding setup costs: They vary based on the legal form and license type. ${info.closing}`
        : `بخصوص التكاليف والرسوم: تختلف حسب الكيان القانوني ونوع الرخصة. ${info.closing}`;
    }
    // أسئلة الإجراءات والخطوات
    else if (lastMessage.includes('إجراءات') || lastMessage.includes('خطوات') || lastMessage.includes('كيف') || lastMessage.includes('steps')) {
      reply = `${info.formationSteps}\n\n${info.closing}`;
    } 
    // أسئلة الأوراق والمتطلبات والشروط
    else if (lastMessage.includes('أوراق') || lastMessage.includes('شروط') || lastMessage.includes('متطلبات') || lastMessage.includes('conditions')) {
      reply = `${info.conditions}\n\n${info.closing}`;
    } 
    // السجل التجاري
    else if (lastMessage.includes('سجل') || lastMessage.includes('رخصة') || lastMessage.includes('cr')) {
      reply = `${info.commercialRegister}\n\n${info.closing}`;
    } 
    // الاقتصاد والاستثمار
    else if (lastMessage.includes('اقتصاد') || lastMessage.includes('استثمار') || lastMessage.includes('سوق') || lastMessage.includes('قطر')) {
      reply = `${info.economyAndBusiness}\n\n${info.closing}`;
    } 
    // الاستفسار العام
    else {
      reply = isEnglish
        ? `At ${info.name}, we provide complete business solutions for your inquiry about "${lastMessage}". ${info.closing}`
        : `في شركة ${info.name}، نوفر لك الدعم المتكامل بخصوص "${lastMessage}". ${info.closing}`;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: 'أهلاً بك في ترانس ميشنز للتجارة والخدمات! يرجى ملء نموذج التأسيس (Start-up Form) وسيتواصل معك فريقنا المختص.' 
    });
  }
}