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

document.addEventListener('DOMContentLoaded', function()
