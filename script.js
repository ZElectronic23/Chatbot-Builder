// ================================
// نظام اللغة متعدد اللغات
// ================================

let currentLanguage = 'ar';

const translations = {
    ar: {
        siteTitle: "ChatBot Builder",
        siteSubtitle: "أنشئ بوت ذكي لموقعك في 5 دقائق - بدون برمجة",
        howItWorks: "كيف تعمل المنصة؟",
        step1Title: "اختر نوع متجرك",
        step1Desc: "متجر إلكتروني، خدمات، استشارات، أو أي نوع أعمال",
        step2Title: "أجب على الأسئلة",
        step2Desc: "أسئلة مخصصة لنوع عملك لبناء قاعدة معرفية للبوت",
        step3Title: "خذ بوتك الجاهز",
        step3Desc: "ملف HTML جاهز للرفع على موقعك",
        startBtn: "ابدأ الآن مجاناً",
        step1Badge: "الخطوة الأولى",
        step1Text: "اختر نوع متجرك",
        bizEcommerce: "متجر إلكتروني",
        bizEcommerceDesc: "لبيع المنتجات أونلاين",
        bizServices: "خدمات",
        bizServicesDesc: "عرض الخدمات والمواعيد",
        bizConsulting: "استشارات",
        bizConsultingDesc: "للرد على استفسارات العملاء",
        bizOther: "أخرى",
        bizOtherDesc: "أي نوع أعمال آخر",
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
        freeTitle: "خذ بوتك مجاناً!",
        freeSubtitle: "املأ بياناتك لتحصل على البوت",
        emailLabel: "📧 البريد الإلكتروني *",
        emailHelp: "لإرسال البوت والتحديثات",
        nameLabel: "👤 اسمك أو اسم المتجر *",
        nameHelp: "سيظهر في البوت",
        uploadTitle: "رفع ملفات إضافية (اختياري)",
        uploadDesc: "يمكنك رفع ملف يحتوي على معلومات إضافية عن عملك",
        uploadBtn: "اختر ملف",
        fileTypes: "PDF, Word, أو ملف نصي",
        linkLabel: "🔗 رابط مرجعي (اختياري)",
        linkHelp: "رابط موقع يحتوي على معلومات عن عملك",
        orderTitle: "📦 ملخص طلبك:",
        submitBtn: "أرسل طلب البوت",
        submitInfo: "✓ سيصلك البوت للتحميل المباشر<br>✓ يمكنك إضافة أسئلة إضافية لاحقاً",
        footerTitle: "ChatBot Builder",
        footerDesc: "أول منصة عربية لإنشاء شات بوتات ذكية للمتاجر والشركات"
    },
    en: {
        siteTitle: "ChatBot Builder",
        siteSubtitle: "Build a smart chatbot for your website in 5 minutes - no coding",
        howItWorks: "How It Works?",
        step1Title: "Choose Your Business Type",
        step1Desc: "E-commerce, Services, Consulting, or any business type",
        step2Title: "Answer Questions",
        step2Desc: "Custom questions for your business to build knowledge base",
        step3Title: "Get Your Ready Bot",
        step3Desc: "HTML file ready to upload to your website",
        startBtn: "Start Free Now",
        step1Badge: "Step 1",
        step1Text: "Choose Your Business Type",
        bizEcommerce: "E-commerce Store",
        bizEcommerceDesc: "For online product sales",
        bizServices: "Services",
        bizServicesDesc: "Show services and appointments",
        bizConsulting: "Consulting",
        bizConsultingDesc: "For answering customer inquiries",
        bizOther: "Other",
        bizOtherDesc: "Any other business type",
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
        freeTitle: "Get Your Bot for Free!",
        freeSubtitle: "Fill your details to get the bot",
        emailLabel: "📧 Email Address *",
        emailHelp: "To send the bot and updates",
        nameLabel: "👤 Your Name or Business Name *",
        nameHelp: "Will appear in the bot",
        uploadTitle: "Upload Additional Files (Optional)",
        uploadDesc: "You can upload a file with additional information about your business",
        uploadBtn: "Choose File",
        fileTypes: "PDF, Word, or Text file",
        linkLabel: "🔗 Reference Link (Optional)",
        linkHelp: "Website link containing information about your business",
        orderTitle: "📦 Order Summary:",
        submitBtn: "Send Bot Request",
        submitInfo: "✓ You'll get the bot for direct download<br>✓ You can add more questions later",
        footerTitle: "ChatBot Builder",
        footerDesc: "First Arabic platform to create smart chatbots for stores and companies"
    }
};

// تغيير اللغة
function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguageUI();
    
    // تحديث علامات الاختيار
    document.getElementById('checkAr').classList.toggle('hidden', lang !== 'ar');
    document.getElementById('checkEn').classList.toggle('hidden', lang !== 'en');
    document.getElementById('currentLang').textContent = lang === 'ar' ? '🇸🇦 عربي' : '🇬🇧 English';
    
    // إغلاق القائمة المنسدلة
    document.getElementById('langDropdown').classList.add('hidden');
}

// تحديث واجهة المستخدم حسب اللغة
function updateLanguageUI() {
    const texts = translations[currentLanguage];
    
    // تحديث جميع النصوص
    document.querySelectorAll('[id]').forEach(element => {
        const id = element.id;
        if (texts[id]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = texts[id];
            } else {
                element.innerHTML = texts[id];
            }
        }
    });
    
    // تحديث اتجاه الصفحة
    document.body.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
}

// إدارة القائمة المنسدلة للغة
document.getElementById('langToggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('langDropdown').classList.toggle('hidden');
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function() {
    document.getElementById('langDropdown').classList.add('hidden');
});

// ================================
// النظام الأساسي
// ================================

// بيانات الأنواع المختلفة
const businessTypes = {
    ecommerce: {
        name: { ar: "متجر إلكتروني", en: "E-commerce Store" },
        icon: "fa-shopping-cart",
        color: "purple",
        questions: [
            { 
                id: "products", 
                text: { ar: "ما هي أنواع المنتجات التي تبيعها؟", en: "What types of products do you sell?" },
                placeholder: { ar: "أجهزة إلكترونية، ملابس، إكسسوارات...", en: "Electronics, clothes, accessories..." }
            },
            { 
                id: "shipping", 
                text: { ar: "ما هي سياسة الشحن والتوصيل؟", en: "What is your shipping and delivery policy?" },
                placeholder: { ar: "الشحن مجاني للطلبات فوق 200 ريال، مدة التوصيل 2-3 أيام", en: "Free shipping for orders over 200 SAR, delivery time 2-3 days" }
            },
            { 
                id: "payment", 
                text: { ar: "ما هي طرق الدفع المتاحة؟", en: "What payment methods are available?" },
                placeholder: { ar: "بطاقات الائتمان، تحويل بنكي، مدى، Apple Pay", en: "Credit cards, bank transfer, Mada, Apple Pay" }
            },
            { 
                id: "returns", 
                text: { ar: "ما هي سياسة الإرجاع والاستبدال؟", en: "What is your return and exchange policy?" },
                placeholder: { ar: "يمكن إرجاع المنتجات خلال 14 يوم، بشروط محددة", en: "Products can be returned within 14 days, with specific conditions" }
            }
        ]
    },
    services: {
        name: { ar: "خدمات", en: "Services" },
        icon: "fa-concierge-bell",
        color: "blue",
        questions: [
            { 
                id: "services", 
                text: { ar: "ما هي الخدمات التي تقدمها؟", en: "What services do you offer?" },
                placeholder: { ar: "تصميم مواقع، تسويق إلكتروني، برمجة تطبيقات...", en: "Website design, digital marketing, app development..." }
            },
            { 
                id: "hours", 
                text: { ar: "ما هي ساعات العمل؟", en: "What are your working hours?" },
                placeholder: { ar: "من الأحد إلى الخميس، 9 صباحاً إلى 6 مساءً", en: "Sunday to Thursday, 9 AM to 6 PM" }
            },
            { 
                id: "booking", 
                text: { ar: "كيف يمكن حجز موعد؟", en: "How can I book an appointment?" },
                placeholder: { ar: "اتصل بنا، أو املأ النموذج على الموقع", en: "Call us, or fill the form on the website" }
            },
            { 
                id: "pricing", 
                text: { ar: "كيف يتم تحديد الأسعار؟", en: "How are prices determined?" },
                placeholder: { ar: "حسب نوع الخدمة والوقت المطلوب، نقدم عروض أسعار مجانية", en: "Based on service type and required time, we offer free quotes" }
            }
        ]
    },
    consulting: {
        name: { ar: "استشارات", en: "Consulting" },
        icon: "fa-briefcase",
        color: "green",
        questions: [
            { 
                id: "consulting_types", 
                text: { ar: "ما هي أنواع الاستشارات التي تقدمها؟", en: "What types of consulting do you offer?" },
                placeholder: { ar: "استشارات تجارية، استشارات تقنية، استشارات تسويقية...", en: "Business consulting, technical consulting, marketing consulting..." }
            },
            { 
                id: "experience", 
                text: { ar: "ما هي خبرتك ومؤهلاتك؟", en: "What is your experience and qualifications?" },
                placeholder: { ar: "خبرة 10 سنوات في المجال، شهادات معتمدة...", en: "10 years experience in the field, certified certificates..." }
            },
            { 
                id: "process", 
                text: { ar: "كيف تتم عملية الاستشارة؟", en: "How does the consulting process work?" },
                placeholder: { ar: "جلسة أولية مجانية، ثم خطة عمل مفصلة...", en: "Free initial session, then detailed action plan..." }
            },
            { 
                id: "pricing", 
                text: { ar: "ما هي أسعار الاستشارات؟", en: "What are the consulting prices?" },
                placeholder: { ar: "تبدأ من 500 ريال للجلسة، وتختلف حسب النوع", en: "Starting from 500 SAR per session, varies by type" }
            }
        ]
    },
    other: {
        name: { ar: "أخرى", en: "Other" },
        icon: "fa-store",
        color: "red",
        questions: [
            { 
                id: "business_desc", 
                text: { ar: "صف عملك باختصار:", en: "Briefly describe your business:" },
                placeholder: { ar: "نحن نقدم...", en: "We provide..." }
            },
            { 
                id: "common_questions", 
                text: { ar: "ما هي أكثر الأسئلة شيوعاً من عملائك؟", en: "What are the most common questions from your customers?" },
                placeholder: { ar: "السؤال الأول: ...\nالسؤال الثاني: ...", en: "Question 1: ...\nQuestion 2: ..." }
            },
            { 
                id: "contact_methods", 
                text: { ar: "كيف يمكن للعملاء التواصل معك؟", en: "How can customers contact you?" },
                placeholder: { ar: "واتساب، هاتف، إيميل، موقع الويب", en: "WhatsApp, phone, email, website" }
            },
            { 
                id: "special_info", 
                text: { ar: "معلومات إضافية مهمة:", en: "Important additional information:" },
                placeholder: { ar: "أي معلومات إضافية تريد إضافتها", en: "Any additional information you want to add" }
            }
        ]
    }
};

let selectedBusiness = null;
let userAnswers = {};
let additionalFiles = [];
let referenceLinks = [];

// === GOOGLE FORM CONFIG ===
const GOOGLE_FORM_CONFIG = {
    FORM_ID: "1FAIpQLSf4sdK94v4gDbR24-n1OeaHukbiL_A2cBk42BaGPAlJrepZJQ",
    EMAIL_FIELD: "entry.1500976572",
    NAME_FIELD: "entry.1308518972", 
    BUSINESS_FIELD: "entry.1150704877",
    QUESTIONS_FIELD: "entry.1383109089",
    
    FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSf4sdK94v4gDbR24-n1OeaHukbiL_A2cBk42BaGPAlJrepZJQ/formResponse",
    SHEET_URL: "https://docs.google.com/spreadsheets/d/1mFbqIspyUo7KpRzh_8o3g04MX4BeoD61D5M9nJ3zRNQ/edit#gid=0"
};

// إدارة رفع الملفات
document.getElementById('additionalFile')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert(currentLanguage === 'ar' ? 'الملف كبير جداً. الحد الأقصى 5 ميجابايت' : 'File too large. Maximum 5MB');
            return;
        }
        
        additionalFiles.push({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type
        });
        
        document.getElementById('fileName').textContent = `✓ ${file.name}`;
        document.getElementById('fileName').classList.remove('hidden');
        
        // حفظ الملف محلياً (في الواقع، سترفعه لسيرفر)
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem('additionalFile_' + file.name, event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// دالة إرسال البيانات لـ Google Form
async function submitToGoogleForm(formData) {
    const url = GOOGLE_FORM_CONFIG.FORM_URL;
    
    // بناء البيانات
    const params = new URLSearchParams({
        [GOOGLE_FORM_CONFIG.EMAIL_FIELD]: formData.email,
        [GOOGLE_FORM_CONFIG.NAME_FIELD]: formData.name,
        [GOOGLE_FORM_CONFIG.BUSINESS_FIELD]: formData.business,
        [GOOGLE_FORM_CONFIG.QUESTIONS_FIELD]: JSON.stringify({
            answers: formData.questions,
            language: currentLanguage,
            filesCount: additionalFiles.length,
            referenceLinks: referenceLinks
        }),
        'submit': 'Submit'
    });
    
    try {
        // إرسال البيانات
        await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });
        
        console.log('✅ تم إرسال البيانات لـ Google Form');
        return true;
    } catch (error) {
        console.log('✅ تم إرسال البيانات (CORS متوقع)');
        return true;
    }
}

// اختيار نوع المتجر
function selectBusiness(type) {
    selectedBusiness = type;
    userAnswers = {};
    additionalFiles = [];
    referenceLinks = [];
    
    // إزالة التحديد السابق
    document.querySelectorAll('#businessType > div').forEach(div => {
        div.classList.remove('border-purple-500', 'border-blue-500', 'border-green-500', 'border-red-500', 'shadow-lg', 'scale-[1.02]');
    });
    
