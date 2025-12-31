// ================================
// نظام اللغة متعدد اللغات - مضمون الشغل
// ================================

let currentLanguage = 'ar';
let selectedBusiness = null;
let userAnswers = {};

// إعدادات Google Form - تم إخفاؤها عن المستخدم
const GOOGLE_FORM_CONFIG = {
    FORM_ID: "1FAIpQLSf4sdK94v4gDbR24-n1OeaHukbiL_A2cBk42BaGPAlJrepZJQ",
    FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSf4sdK94v4gDbR24-n1OeaHukbiL_A2cBk42BaGPAlJrepZJQ/formResponse"
};

// الترجمات
const translations = {
    ar: {
        // الهيدر
        siteTitle: "ChatBot Builder",
        siteSubtitle: "أنشئ بوت ذكي لموقعك في 5 دقائق - بدون برمجة",
        startBtn: "ابدأ الآن مجاناً",
        
        // الخطوات
        howItWorks: "كيف تعمل المنصة؟",
        step1Title: "اختر نوع متجرك",
        step1Desc: "متجر إلكتروني، خدمات، استشارات، أو أي نوع أعمال",
        step2Title: "أجب على الأسئلة",
        step2Desc: "أسئلة مخصصة لنوع عملك لبناء قاعدة معرفية للبوت",
        step3Title: "خذ بوتك الجاهز",
        step3Desc: "ملف HTML جاهز للرفع على موقعك",
        step1Badge: "الخطوة الأولى",
        step1Text: "اختر نوع متجرك",
        
        // أنواع الأعمال
        bizEcommerce: "متجر إلكتروني",
        bizEcommerceDesc: "لبيع المنتجات أونلاين",
        bizServices: "خدمات",
        bizServicesDesc: "عرض الخدمات والمواعيد",
        bizConsulting: "استشارات",
        bizConsultingDesc: "للرد على استفسارات العملاء",
        bizOther: "أخرى",
        bizOtherDesc: "أي نوع أعمال آخر",
        
        // الميزات
        feature1: "سياسات شحن",
        feature2: "طرق دفع",
        feature3: "إرجاع منتجات",
        feature4: "ساعات عمل",
        feature5: "حجز مواعيد",
        feature6: "عرض أسعار",
        feature7: "أنواع الاستشارات",
        feature8: "خبرة واستشاريين",
        feature9: "أسعار وجدول",
        feature10: "أسئلة مخصصة",
        feature11: "تصميم مرن",
        feature12: "متوافق مع الجميع",
        
        // النموذج
        freeTitle: "خذ بوتك مجاناً!",
        freeSubtitle: "املأ بياناتك لتحصل على البوت",
        emailLabel: "📧 البريد الإلكتروني *",
        emailHelp: "لإرسال البوت والتحديثات",
        nameLabel: "👤 اسمك أو اسم المتجر *",
        nameHelp: "سيظهر في البوت",
        orderTitle: "📦 ملخص طلبك:",
        submitBtn: "أرسل طلب البوت",
        submitInfo: "✓ سيصلك البوت للتحميل المباشر<br>✓ يمكنك إضافة أسئلة إضافية لاحقاً",
        
        // الفوتر
        footerTitle: "ChatBot Builder",
        footerDesc: "أول منصة عربية لإنشاء شات بوتات ذكية للمتاجر والشركات"
    },
    en: {
        // الهيدر
        siteTitle: "ChatBot Builder",
        siteSubtitle: "Build a smart chatbot for your website in 5 minutes - no coding",
        startBtn: "Start Free Now",
        
        // الخطوات
        howItWorks: "How It Works?",
        step1Title: "Choose Your Business Type",
        step1Desc: "E-commerce, Services, Consulting, or any business type",
        step2Title: "Answer Questions",
        step2Desc: "Custom questions for your business to build knowledge base",
        step3Title: "Get Your Ready Bot",
        step3Desc: "HTML file ready to upload to your website",
        step1Badge: "Step 1",
        step1Text: "Choose Your Business Type",
        
        // أنواع الأعمال
        bizEcommerce: "E-commerce Store",
        bizEcommerceDesc: "For online product sales",
        bizServices: "Services",
        bizServicesDesc: "Show services and appointments",
        bizConsulting: "Consulting",
        bizConsultingDesc: "For answering customer inquiries",
        bizOther: "Other",
        bizOtherDesc: "Any other business type",
        
        // الميزات
        feature1: "Shipping Policies",
        feature2: "Payment Methods",
        feature3: "Returns Policy",
        feature4: "Working Hours",
        feature5: "Booking Appointments",
        feature6: "Pricing Quotes",
        feature7: "Consultation Types",
        feature8: "Experience & Consultants",
        feature9: "Pricing & Schedule",
        feature10: "Custom Questions",
        feature11: "Flexible Design",
        feature12: "Compatible with All",
        
        // النموذج
        freeTitle: "Get Your Bot for Free!",
        freeSubtitle: "Fill your details to get the bot",
        emailLabel: "📧 Email Address *",
        emailHelp: "To send the bot and updates",
        nameLabel: "👤 Your Name or Business Name *",
        nameHelp: "Will appear in the bot",
        orderTitle: "📦 Order Summary:",
        submitBtn: "Send Bot Request",
        submitInfo: "✓ You'll get the bot for direct download<br>✓ You can add more questions later",
        
        // الفوتر
        footerTitle: "ChatBot Builder",
        footerDesc: "First Arabic platform to create smart chatbots for stores and companies"
    }
};

// بيانات الأسئلة باللغتين
const businessTypes = {
    ecommerce: {
        name: { ar: "متجر إلكتروني", en: "E-commerce Store" },
        color: "purple",
        questions: [
            { 
                id: "products", 
                text: { ar: "ما هي أنواع المنتجات التي تبيعها؟", en: "What types of products do you sell?" },
                placeholder: { ar: "مثال: أجهزة إلكترونية، ملابس، إكسسوارات", en: "Example: Electronics, clothes, accessories" }
            },
            { 
                id: "shipping", 
                text: { ar: "ما هي سياسة الشحن والتوصيل؟", en: "What is your shipping policy?" },
                placeholder: { ar: "مثال: شحن مجاني للطلبات فوق 200 ريال", en: "Example: Free shipping for orders over 200 SAR" }
            },
            { 
                id: "payment", 
                text: { ar: "ما هي طرق الدفع المتاحة؟", en: "What payment methods are available?" },
                placeholder: { ar: "مثال: بطاقات ائتمان، تحويل بنكي، مدى", en: "Example: Credit cards, bank transfer, Mada" }
            },
            { 
                id: "returns", 
                text: { ar: "ما هي سياسة الإرجاع؟", en: "What is your return policy?" },
                placeholder: { ar: "مثال: يمكن إرجاع المنتجات خلال 14 يوم", en: "Example: Products can be returned within 14 days" }
            }
        ]
    },
    services: {
        name: { ar: "خدمات", en: "Services" },
        color: "blue",
        questions: [
            { 
                id: "services", 
                text: { ar: "ما هي الخدمات التي تقدمها؟", en: "What services do you offer?" },
                placeholder: { ar: "مثال: تصميم مواقع، تسويق إلكتروني", en: "Example: Website design, digital marketing" }
            },
            { 
                id: "hours", 
                text: { ar: "ما هي ساعات العمل؟", en: "What are your working hours?" },
                placeholder: { ar: "مثال: من الأحد إلى الخميس، 9 صباحاً إلى 6 مساءً", en: "Example: Sunday to Thursday, 9 AM to 6 PM" }
            },
            { 
                id: "booking", 
                text: { ar: "كيف يمكن حجز موعد؟", en: "How can I book an appointment?" },
                placeholder: { ar: "مثال: عبر الهاتف أو نموذج الموقع", en: "Example: Via phone or website form" }
            },
            { 
                id: "pricing", 
                text: { ar: "كيف يتم تحديد الأسعار؟", en: "How are prices determined?" },
                placeholder: { ar: "مثال: حسب نوع الخدمة والوقت المطلوب", en: "Example: Based on service type and required time" }
            }
        ]
    }
};

// ================================
// إدارة اللغة
// ================================

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // تحديث زر اللغة
    document.getElementById('currentLang').textContent = lang === 'ar' ? '🇸🇦 عربي' : '🇬🇧 English';
    document.getElementById('checkAr').classList.toggle('hidden', lang !== 'ar');
    document.getElementById('checkEn').classList.toggle('hidden', lang !== 'en');
    
    // تحديث اتجاه الصفحة
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // تحديث جميع النصوص
    updateAllTexts();
    
    // إغلاق القائمة المنسدلة
    document.getElementById('langDropdown').classList.remove('show');
    
    // تحديث الأسئلة إذا كان هناك نوع محدد
    if (selectedBusiness) {
        updateQuestionsLanguage();
    }
}

function updateAllTexts() {
    const texts = translations[currentLanguage];
    
    // تحديث جميع العناصر التي لها id
    Object.keys(texts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = texts[key];
        }
    });
    
    // تحديث مكان الهولد
    const emailInput = document.getElementById('userEmail');
    const nameInput = document.getElementById('userName');
    if (emailInput && nameInput) {
        emailInput.placeholder = currentLanguage === 'ar' ? 'name@example.com' : 'name@example.com';
        nameInput.placeholder = currentLanguage === 'ar' ? 'مثال: متجر التقنية' : 'Example: Tech Store';
    }
}

function updateQuestionsLanguage() {
    const business = businessTypes[selectedBusiness];
    if (!business) return;
    
    business.questions.forEach((q, index) => {
        const textarea = document.getElementById(q.id);
        const label = textarea?.previousElementSibling;
        
        if (label && textarea) {
            // تحديث نص السؤال
            const questionNumber = label.querySelector('.bg-gray-100');
            const questionText = label.textContent.replace(questionNumber?.textContent || '', '').trim();
            
            label.innerHTML = `<span class="bg-gray-100 px-3 py-1 rounded-full mr-2">${index + 1}</span> ${q.text[currentLanguage]}`;
            textarea.placeholder = q.placeholder[currentLanguage];
        }
    });
}

// ================================
// إدارة القائمة المنسدلة للغة
// ================================

document.getElementById('langToggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('langDropdown').classList.toggle('show');
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-switcher')) {
        document.getElementById('langDropdown').classList.remove('show');
    }
});

// ================================
// النظام الأساسي
// ================================

function selectBusiness(type) {
    selectedBusiness = type;
    userAnswers = {};
    
    // إزالة التحديد السابق
    document.querySelectorAll('#businessType > div').forEach(div => {
        div.classList.remove('border-purple-500', 'border-blue-500', 'border-green-500', 'border-red-500', 'shadow-lg', 'scale-[1.02]');
    });
    
    // إضافة التحديد الجديد
    const selectedDiv = event.currentTarget;
    selectedDiv.classList.add(`border-${businessTypes[type].color}-500`, 'shadow-lg', 'scale-[1.02]');
    
    // إظهار قسم الأسئلة
    setTimeout(() => showQuestionsSection(), 300);
}

function showQuestionsSection() {
    const business = businessTypes[selectedBusiness];
    
    let html = `
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fadeIn">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <span class="bg-${business.color}-100 text-${business.color}-700 px-4 py-2 rounded-full font-bold">
                        ${currentLanguage === 'ar' ? 'الخطوة الثانية' : 'Step 2'}
                    </span>
                    <h3 class="text-2xl font-bold text-gray-800 mt-2">
                        ${currentLanguage === 'ar' ? 'أجب على الأسئلة الأساسية لـ' : 'Answer basic questions for'} ${business.name[currentLanguage]}
                    </h3>
                </div>
                <button onclick="goBack()" class="text-gray-600 hover:text-gray-800">
                    <i class="fas fa-arrow-right ml-2"></i> ${currentLanguage === 'ar' ? 'العودة' : 'Back'}
                </button>
            </div>
            
            <form id="questionsForm" onsubmit="return showFreePlan(event)">
    `;
    
    business.questions.forEach((q, index) => {
        html += `
            <div class="mb-8">
                <label class="block text-gray-700 font-bold text-lg mb-3">
                    <span class="bg-gray-100 px-3 py-1 rounded-full mr-2">${index + 1}</span>
                    ${q.text[currentLanguage]}
                </label>
                <textarea 
                    id="${q.id}"
                    rows="2"
                    class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-${business.color}-500 focus:ring-2 focus:ring-${business.color}-200 transition"
                    placeholder="${q.placeholder[currentLanguage]}"
                    oninput="saveAnswer('${q.id}', this.value)"
                    required
                ></textarea>
            </div>
        `;
    });
    
    html += `
            <div class="text-center mt-12">
                <button type="submit" class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition shadow-lg w-full">
                    <i class="fas fa-gift ml-2"></i> ${currentLanguage === 'ar' ? 'احصل على بوتك المجاني الآن' : 'Get Your Free Bot Now'}
                </button>
                <p class="text-gray-500 mt-4">
                    ${currentLanguage === 'ar' ? '✓ بوت كامل مجاناً<br>✓ يدعم العربية والإنجليزية' : '✓ Complete bot for free<br>✓ Supports Arabic and English'}
                </p>
            </div>
            </form>
        </div>
    `;
    
    document.getElementById('questionsSection').innerHTML = html;
    document.getElementById('questionsSection').classList.remove('hidden');
    document.getElementById('questionsSection').scrollIntoView({ behavior: 'smooth' });
}

function saveAnswer(id, value) {
    userAnswers[id] = value;
}

function goBack() {
    document.getElementById('questionsSection').classList.add('hidden');
    document.getElementById('freePlanSection').classList.add('hidden');
    document.getElementById('successSection').classList.add('hidden');
}

function showFreePlan(e) {
    e.preventDefault();
    
    const business = businessTypes[selectedBusiness];
    
    // التحقق من الإجابات
    let allAnswered = true;
    business.questions.forEach(q => {
        if (!userAnswers[q.id] || userAnswers[q.id].trim() === '') {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        alert(currentLanguage === 'ar' ? '⚠️ الرجاء الإجابة على جميع الأسئلة قبل المتابعة' : '⚠️ Please answer all questions before proceeding');
        return;
    }
    
    // تحديث ملخص الطلب
    let summaryHTML = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <span>${currentLanguage === 'ar' ? 'نوع المتجر:' : 'Business Type:'}</span>
                <span class="font-bold">${business.name[currentLanguage]}</span>
            </div>
    `;
    
    business.questions.forEach(q => {
        const answer = userAnswers[q.id];
        const shortAnswer = answer.length > 50 ? answer.substring(0, 50) + '...' : answer;
        summaryHTML += `
            <div class="flex justify-between items-start">
                <span class="text-gray-600 text-sm">${q.text[currentLanguage]}</span>
                <span class="text-right font-medium text-sm max-w-xs">${shortAnswer}</span>
            </div>
        `;
    });
    
    summaryHTML += `
            <div class="pt-3 border-t">
                <div class="flex justify-between text-green-600 font-bold">
                    <span>${currentLanguage === 'ar' ? 'السعر:' : 'Price:'}</span>
                    <span>${currentLanguage === 'ar' ? 'مجاناً 🎁' : 'Free 🎁'}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('orderSummary').innerHTML = summaryHTML;
    document.getElementById('questionsSection').classList.add('hidden');
    document.getElementById('freePlanSection').classList.remove('hidden');
    document.getElementById('freePlanSection').scrollIntoView({ behavior: 'smooth' });
}

// ================================
// إرسال البيانات ومعالجة الطلب
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('freeBotForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('userEmail').value;
            const name = document.getElementById('userName').value;
            
            if (!email || !name) {
                alert(currentLanguage === 'ar' ? '⚠️ الرجاء إدخال البريد الإلكتروني والاسم' : '⚠️ Please enter email and name');
                return;
            }
            
            // تعطيل الزر أثناء المعالجة
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = currentLanguage === 'ar' 
                ? '<i class="fas fa-spinner fa-spin ml-2"></i> جاري المعالجة...' 
                : '<i class="fas fa-spinner fa-spin ml-2"></i> Processing...';
            submitBtn.disabled = true;
            
            const formData = {
                email: email,
                name: name,
                business: businessTypes[selectedBusiness].name[currentLanguage],
                questions: userAnswers,
                language: currentLanguage,
                timestamp: new Date().toISOString()
            };
            
            try {
                // إرسال البيانات لـ Google Form (في الخلفية)
                await submitToGoogleForm(formData);
                
                // إنشاء البوت
                const botContent = generateCompleteBotFile();
                
                // عرض التحميل المباشر
                showDownloadSection(botContent);
            } catch (error) {
                console.error('Error:', error);
                alert(currentLanguage === 'ar' 
                    ? 'حدث خطأ أثناء المعالجة. حاول مرة أخرى.' 
                    : 'An error occurred. Please try again.');
            } finally {
                // إعادة تفعيل الزر
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

async function submitToGoogleForm(formData) {
    const params = new URLSearchParams({
        'entry.1500976572': formData.email,
        'entry.1308518972': formData.name,
        'entry.1150704877': formData.business,
        'entry.1383109089': JSON.stringify(formData)
    });
    
    try {
        await fetch(GOOGLE_FORM_CONFIG.FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        return true;
    } catch (error) {
        return true; // حتى مع CORS error، البيانات راحت
    }
}

// ================================
// توليد البوت الذكي المتعدد اللغات
// ================================

function generateCompleteBotFile() {
    const business = businessTypes[selectedBusiness];
    const userLanguage = currentLanguage;
    
    // تنظيف الإجابات
    const cleanAnswers = {};
    Object.keys(userAnswers).forEach(key => {
        cleanAnswers[key] = userAnswers[key]
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/\n/g, '<br>');
    });
    
    return `<!DOCTYPE html>
<html dir="${userLanguage === 'ar' ? 'rtl' : 'ltr'}" lang="${userLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatBot - ${business.name[userLanguage]}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* زر التفعيل */
        .chatbot-toggle {
            position: fixed;
            bottom: 30px;
            ${userLanguage === 'ar' ? 'left: 30px;' : 'right: 30px;'}
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            z-index: 9999;
            transition: transform 0.3s;
        }
        .chatbot-toggle:hover {
            transform: scale(1.1);
        }
        .chatbot-toggle .close-icon {
            display: none;
        }
        
        /* نافذة البوت */
        .chatbot-container {
            position: fixed;
            bottom: 100px;
            ${userLanguage === 'ar' ? 'left: 30px;' : 'right: 30px;'}
            width: 380px;
            height: 550px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 9998;
            border: 1px solid #e5e7eb;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .chatbot-container.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* الهيدر */
        .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-header h3 {
            font-size: 18px;
            font-weight: bold;
        }
        .close-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s;
        }
        .close-btn:hover {
            background: rgba(255,255,255,0.3);
        }
        
        /* منطقة الرسائل */
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        /* الرسائل */
        .message {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 18px;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .bot-message {
            background: white;
            color: #1f2937;
            border: 1px solid #e5e7eb;
            align-self: ${userLanguage === 'ar' ? 'flex-end' : 'flex-start'};
            border-bottom-right-radius: ${userLanguage === 'ar' ? '4px' : '18px'};
            border-bottom-left-radius: ${userLanguage === 'ar' ? '18px' : '4px'};
        }
        .user-message {
            background: #3b82f6;
            color: white;
            align-self: ${userLanguage === 'ar' ? 'flex-start' : 'flex-end'};
            border-bottom-right-radius: ${userLanguage === 'ar' ? '18px' : '4px'};
            border-bottom-left-radius: ${userLanguage === 'ar' ? '4px' : '18px'};
        }
        
        /* منطقة الإدخال */
        .chat-input {
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            background: white;
            display: flex;
            gap: 10px;
        }
        .chat-input input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 14px;
            outline: none;
            transition: border 0.3s;
            ${userLanguage === 'ar' ? 'text-align: right;' : ''}
        }
        .chat-input input:focus {
            border-color: #667eea;
        }
        .chat-input button {
            background: #667eea;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0 20px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s;
        }
        .chat-input button:hover {
            background: #5a67d8;
        }
        
        /* الأزرار السريعة */
        .quick-actions {
            padding: 12px 16px;
            background: white;
            border-bottom: 1px solid #e5e7eb;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        .quick-btn {
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            padding: 10px;
            border-radius: 12px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;
            ${userLanguage === 'ar' ? 'text-align: right;' : 'text-align: center;'}
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .quick-btn:hover {
            background: #e5e7eb;
            transform: translateY(-1px);
        }
        
        /* شريط اللغة */
        .language-bar {
            padding: 8px 16px;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
            justify-content: center;
        }
        .lang-btn {
            padding: 6px 12px;
            border: 1px solid #d1d5db;
            border-radius: 20px;
            background: white;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
        }
        .lang-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        
        .hidden {
            display: none !important;
        }
        .typing-indicator {
            display: none;
            padding: 10px 16px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            align-self: ${userLanguage === 'ar' ? 'flex-end' : 'flex-start'};
            width: fit-content;
        }
        .typing-indicator span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #667eea;
            margin: 0 2px;
            animation: typing 1.4s infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- زر فتح البوت -->
    <div class="chatbot-toggle" id="chatToggle">
        <i class="fas fa-robot" id="openIcon"></i>
        <i class="fas fa-times close-icon" id="closeIcon"></i>
    </div>
    
    <!-- نافذة البوت -->
    <div class="chatbot-container" id="chatbot">
        <div class="chat-header">
            <h3>${business.name[userLanguage]}</h3>
            <button class="close-btn" id="closeChat">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <!-- شريط اللغة -->
        <div class="language-bar">
            <button class="lang-btn ${userLanguage === 'ar' ? 'active' : ''}" onclick="switchBotLanguage('ar')">🇸🇦 عربي</button>
            <button class="lang-btn ${userLanguage === 'en' ? 'active' : ''}" onclick="switchBotLanguage('en')">🇬🇧 English</button>
        </div>
        
        <!-- الأزرار السريعة -->
        <div class="quick-actions" id="quickActions">
            <!-- سيتم ملؤها بالأسئلة -->
        </div>
        
        <!-- منطقة الرسائل -->
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message" id="welcomeMessage">
                ${userLanguage === 'ar' 
                    ? 'مرحباً! أنا البوت المساعد لـ ' + business.name.ar + '. كيف يمكنني مساعدتك؟' 
                    : 'Hello! I am the assistant bot for ' + business.name.en + '. How can I help you?'}
            </div>
        </div>
        
        <!-- مؤشر الكتابة -->
        <div class="typing-indicator" id="typingIndicator">
            <span></span><span></span><span></span>
        </div>
        
        <!-- منطقة الإدخال -->
        <div class="chat-input">
            <input type="text" id="userInput" placeholder="${userLanguage === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}" autocomplete="off">
            <button id="sendButton"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

    <script>
        // ===== بيانات البوت =====
        const botData = {
            businessName: ${JSON.stringify(business.name)},
            language: "${userLanguage}",
            answers: ${JSON.stringify(cleanAnswers)},
            questions: ${JSON.stringify(business.questions.map(q => ({
                id: q.id,
                text: q.text,
                placeholder: q.placeholder
            })))},
            
            // === القاموس الذكي (يزيد ذكاء البوت) ===
            smartDictionary: {
                ar: {
                    "سعر": ["السعر", "الأسعار", "التكلفة", "الثمن", "كم يكلف", "بكام"],
                    "وقت": ["الوقت", "موعد", "المدة", "متى", "المواعيد", "ساعات"],
                    "عنوان": ["العنوان", "الموقع", "أين", "مكان", "العناوين"],
                    "اتصال": ["اتصل", "التواصل", "الهاتف", "رقم", "الواتساب", "اتصال"],
                    "خدمة": ["خدمات", "خدمة", "عمل", "مشروع", "تنفيذ"]
                },
                en: {
                    "price": ["price", "cost", "how much", "fee", "charge", "rate"],
                    "time": ["time", "schedule", "when", "appointment", "hours", "duration"],
                    "address": ["address", "location", "where", "place", "locations"],
                    "contact": ["contact", "call", "phone", "number", "whatsapp", "reach"],
                    "service": ["services", "service", "work", "project", "delivery"]
                }
            }
        };
        
        // ===== متغيرات DOM =====
        const chatToggle = document.getElementById('chatToggle');
        const chatbot = document.getElementById('chatbot');
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        const quickActions = document.getElementById('quickActions');
        const typingIndicator = document.getElementById('typingIndicator');
        const closeChat = document.getElementById('closeChat');
        const openIcon = document.getElementById('openIcon');
        const closeIcon = document.getElementById('closeIcon');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        // ===== تهيئة البوت =====
        function initializeBot() {
            // تعيين اللغة الحالية
            let currentBotLang = botData.language;
            
            // تهيئة الأزرار السريعة
            updateQuickActions(currentBotLang);
            
            // إدارة فتح/إغلاق البوت
            chatToggle.addEventListener('click', toggleChatbot);
            closeChat.addEventListener('click', closeChatbot);
            
            // إرسال الرسالة
            sendButton.addEventListener('click', sendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
            
            // تحديث الرسالة الترحيبية عند تغيير اللغة
            function updateWelcomeMessage(lang) {
                welcomeMessage.textContent = lang === 'ar' 
                    ? 'مرحباً! أنا البوت المساعد لـ ' + botData.businessName.ar + '. كيف يمكنني مساعدتك؟'
                    : 'Hello! I am the assistant bot for ' + botData.businessName.en + '. How can I help you?';
            }
            
            // تبديل لغة البوت
            window.switchBotLanguage = function(lang) {
                currentBotLang = lang;
                
                // تحديث الأزرار النشطة
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                event.target.classList.add('active');
                
                // تحديث واجهة البوت
                updateQuickActions(lang);
                updateWelcomeMessage(lang);
                userInput.placeholder = lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...';
                
                // إضافة رسالة إعلامية
                addMessage(
                    lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English',
                    'bot'
                );
            };
            
            // إدارة فتح/إغلاق البوت
            function toggleChatbot() {
                if (chatbot.classList.contains('show')) {
                    closeChatbot();
                } else {
                    openChatbot();
                }
            }
            
            function openChatbot() {
                chatbot.classList.add('show');
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                userInput.focus();
            }
            
            function closeChatbot() {
                chatbot.classList.remove('show');
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
            
            // تحديث الأزرار السريعة
            function updateQuickActions(lang) {
                quickActions.innerHTML = '';
                botData.questions.forEach((q, index) => {
                    const btn = document.createElement('button');
                    btn.className = 'quick-btn';
                    btn.textContent = q.text[lang];
                    btn.title = q.text[lang];
                    btn.onclick = () => handleQuickAction(q.text[lang], lang);
                    quickActions.appendChild(btn);
                });
            }
            
            // معالجة الأزرار السريعة
            function handleQuickAction(question, lang) {
                userInput.value = question;
                sendMessage();
            }
            
            // إرسال الرسالة
            function sendMessage() {
                const question = userInput.value.trim();
                if (!question) return;
                
                // إضافة رسالة المستخدم
                addMessage(question, 'user');
                userInput.value = '';
                
                // محاكاة الكتابة
                showTypingIndicator();
                
                // البحث عن أفضل إجابة بعد تأخير
                setTimeout(() => {
                    const answer = findBestAnswer(question, currentBotLang);
                    hideTypingIndicator();
                    addMessage(answer, 'bot');
                }, 800);
            }
            
            // البحث الذكي عن الإجابة
            function findBestAnswer(question, lang) {
                const qLower = question.toLowerCase();
                
                // 1. البحث المباشر في الأسئلة
                for (const q of botData.questions) {
                    const questionText = q.text[lang].toLowerCase();
                    if (qLower.includes(questionText.substring(0, 15)) || 
                        questionText.includes(qLower.substring(0, 10))) {
                        return botData.answers[q.id] || getDefaultAnswer(lang);
                    }
                }
                
                // 2. البحث الذكي باستخدام القاموس
                for (const [key, synonyms] of Object.entries(botData.smartDictionary[lang])) {
                    for (const synonym of synonyms) {
                        if (qLower.includes(synonym.toLowerCase())) {
                            // البحث عن سؤال مرتبط بهذا المفهوم
                            for (const q of botData.questions) {
                                const questionText = q.text[lang].toLowerCase();
                                if (questionText.includes(key)) {
                                    return botData.answers[q.id] || getDefaultAnswer(lang);
                                }
                            }
                        }
                    }
                }
                
                // 3. إذا لم يتم العثور على إجابة
                return getDefaultAnswer(lang);
            }
            
            // الإجابة الافتراضية
            function getDefaultAnswer(lang) {
                return lang === 'ar' 
                    ? 'عذراً، لم أتعلم بعد الإجابة على هذا السؤال. يمكنك التواصل مع الدعم مباشرة.'
                    : 'Sorry, I haven\'t learned how to answer this question yet. You can contact support directly.';
            }
            
            // إضافة رسالة جديدة
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = \`message \${sender}-message\`;
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // إظهار/إخفاء مؤشر الكتابة
            function showTypingIndicator() {
                typingIndicator.style.display = 'flex';
                typingIndicator.style.alignSelf = currentBotLang === 'ar' ? 'flex-end' : 'flex-start';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            function hideTypingIndicator() {
                typingIndicator.style.display = 'none';
            }
        }
        
        // تشغيل البوت عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', initializeBot);
    </script>
</body>
</html>`;
}

// ================================
// عرض قسم التحميل
// ================================

function showDownloadSection(botContent) {
    // إنشاء ملف للتحميل
    const blob = new Blob([botContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const fileName = `my-chatbot-${Date.now()}.html`;
    
    let html = `
        <div class="text-center bg-white rounded-2xl shadow-xl p-8 my-12 animate-fadeIn">
            <div class="text-green-600 text-6xl mb-6">🎉</div>
            <h3 class="text-3xl font-bold text-gray-800 mb-4">
                ${currentLanguage === 'ar' ? 'بوتك جاهز للتحميل!' : 'Your Bot is Ready to Download!'}
            </h3>
            <p class="text-gray-600 text-lg mb-8">
                ${currentLanguage === 'ar' 
                    ? 'تم إنشاء البوت بنجاح وحفظ إعداداتك' 
                    : 'Bot created successfully and your settings saved'}
            </p>
            
            <div class="max-w-2xl mx-auto">
                <!-- معلومات البوت -->
                <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl mb-8">
                    <h4 class="font-bold text-2xl mb-4 text-purple-700">
                        <i class="fas fa-robot ml-2"></i>
                        ${currentLanguage === 'ar' ? 'مميزات البوت:' : 'Bot Features:'}
                    </h4>
                    <ul class="text-right space-y-3 text-gray-700">
                        <li class="flex items-center ${currentLanguage === 'ar' ? 'justify-end' : 'justify-start'}">
                            <i class="fas fa-check text-green-500 ${currentLanguage === 'ar' ? 'ml-2' : 'mr-2'}"></i>
                            ${currentLanguage === 'ar' ? 'يدعم العربية والإنجليزية' : 'Supports Arabic and English'}
                        </li>
                        <li class="flex items-center ${currentLanguage === 'ar' ? 'justify-end' : 'justify-start'}">
                            <i class="fas fa-check text-green-500 ${currentLanguage === 'ar' ? 'ml-2' : 'mr-2'}"></i>
                            ${currentLanguage === 'ar' ? 'أيقونة عائمة يمكن فتحها وإغلاقها' : 'Floating icon that can be opened and closed'}
                        </li>
                        <li class="flex items-center ${currentLanguage === 'ar' ? 'justify-end' : 'justify-start'}">
                            <i class="fas fa-check text-green-500 ${currentLanguage === 'ar' ? 'ml-2' : 'mr-2'}"></i>
                            ${currentLanguage === 'ar' ? 'ذكي في فهم الأسئلة' : 'Smart in understanding questions'}
                        </li>
                        <li class="flex items-center ${currentLanguage === 'ar' ? 'justify-end' : 'justify-start'}">
                            <i class="fas fa-check text-green-500 ${currentLanguage === 'ar' ? 'ml-2' : 'mr-2'}"></i>
                            ${currentLanguage === 'ar' ? 'تصميم حديث وجذاب' : 'Modern and attractive design'}
                        </li>
                    </ul>
                </div>
                
                <!-- زر التحميل -->
                <div class="mb-8">
                    <a href="${url}" download="${fileName}" 
                       class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition shadow-lg inline-block mb-4">
                        <i class="fas fa-download ml-2"></i>
                        ${currentLanguage === 'ar' ? 'تحميل ملف البوت' : 'Download Bot File'}
                    </a>
                    <p class="text-gray-500 text-sm">
                        ${currentLanguage === 'ar' ? 'حجم الملف:' : 'File size:'} ${(botContent.length / 1024).toFixed(1)} KB
                    </p>
                </div>
                
                <!-- التعليمات -->
                <div class="bg-yellow-50 p-6 rounded-xl text-right mb-8">
                    <h4 class="font-bold text-xl mb-4 text-yellow-800">
                        📝 ${currentLanguage === 'ar' ? 'كيف ترفع البوت على موقعك:' : 'How to upload the bot to your site:'}
                    </h4>
                    <ol class="space-y-3 text-gray-700 ${currentLanguage === 'ar' ? 'pr-6' : 'pl-6'}">
                        <li><strong>1.</strong> ${currentLanguage === 'ar' ? 'حمّل ملف' : 'Download the file'} <code class="bg-gray-200 px-2 py-1 rounded mx-1">${fileName}</code></li>
                        <li><strong>2.</strong> ${currentLanguage === 'ar' ? 'ارفع الملف على استضافة موقعك' : 'Upload the file to your website hosting'}</li>
                        <li><strong>3.</strong> ${currentLanguage === 'ar' ? 'أضف هذا الكود في صفحات موقعك:' : 'Add this code to your website pages:'}<br>
                            <code class="bg-gray-800 text-white p-2 rounded block text-sm mt-2 text-left overflow-x-auto">
                                &lt;script src="/${fileName}"&gt;&lt;/script&gt;
                            </code>
                        </li>
                        <li><strong>4.</strong> ${currentLanguage === 'ar' ? 'أو افتح الملف في متصفحك لتجربته مباشرة' : 'Or open the file in your browser to test it directly'}</li>
                    </ol>
                </div>
                
                <!-- إنشاء بوت آخر -->
                <div class="mt-12">
                    <p class="text-gray-600 mb-4">
                        ${currentLanguage === 'ar' ? 'هل تريد إنشاء بوت آخر؟' : 'Want to create another bot?'}
                    </p>
                    <button onclick="goBack()" 
                            class="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
                        ${currentLanguage === 'ar' ? '← أنشئ بوتاً جديداً' : '← Create New Bot'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('successSection').innerHTML = html;
    document.getElementById('freePlanSection').classList.add('hidden');
    document.getElementById('successSection').classList.remove('hidden');
    document.getElementById('successSection').scrollIntoView({ behavior: 'smooth' });
}

// ================================
// CSS للـ animations
// ================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// ================================
// تشغيل النظام عند التحميل
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // تطبيق اللغة الحالية
    updateAllTexts();
    
    // تعيين حدث لزر البداية
    const startBtn = document.querySelector('a[href="#start"]');
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('start').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
