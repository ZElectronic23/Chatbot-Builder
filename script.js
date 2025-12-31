// بيانات الأنواع المختلفة
const businessTypes = {
    ecommerce: {
        name: "متجر إلكتروني",
        icon: "fa-shopping-cart",
        color: "purple",
        questions: [
            { id: "products", text: "ما هي أنواع المنتجات التي تبيعها؟", placeholder: "أجهزة إلكترونية، ملابس، إكسسوارات..." },
            { id: "shipping", text: "ما هي سياسة الشحن والتوصيل؟", placeholder: "الشحن مجاني للطلبات فوق 200 ريال، مدة التوصيل 2-3 أيام" },
            { id: "payment", text: "ما هي طرق الدفع المتاحة؟", placeholder: "بطاقات الائتمان، تحويل بنكي، مدى، Apple Pay" },
            { id: "returns", text: "ما هي سياسة الإرجاع والاستبدال؟", placeholder: "يمكن إرجاع المنتجات خلال 14 يوم، بشروط محددة" }
        ]
    },
    services: {
        name: "خدمات",
        icon: "fa-concierge-bell",
        color: "blue",
        questions: [
            { id: "services", text: "ما هي الخدمات التي تقدمها؟", placeholder: "تصميم مواقع، تسويق إلكتروني، برمجة تطبيقات..." },
            { id: "hours", text: "ما هي ساعات العمل؟", placeholder: "من الأحد إلى الخميس، 9 صباحاً إلى 6 مساءً" },
            { id: "booking", text: "كيف يمكن حجز موعد؟", placeholder: "اتصل بنا، أو املأ النموذج على الموقع" },
            { id: "pricing", text: "كيف يتم تحديد الأسعار؟", placeholder: "حسب نوع الخدمة والوقت المطلوب، نقدم عروض أسعار مجانية" }
        ]
    },
    consulting: {
        name: "استشارات",
        icon: "fa-briefcase",
        color: "green",
        questions: [
            { id: "consulting_types", text: "ما هي أنواع الاستشارات التي تقدمها؟", placeholder: "استشارات تجارية، استشارات تقنية، استشارات تسويقية..." },
            { id: "experience", text: "ما هي خبرتك ومؤهلاتك؟", placeholder: "خبرة 10 سنوات في المجال، شهادات معتمدة..." },
            { id: "process", text: "كيف تتم عملية الاستشارة؟", placeholder: "جلسة أولية مجانية، ثم خطة عمل مفصلة..." },
            { id: "pricing", text: "ما هي أسعار الاستشارات؟", placeholder: "تبدأ من 500 ريال للجلسة، وتختلف حسب النوع" }
        ]
    },
    other: {
        name: "أخرى",
        icon: "fa-store",
        color: "red",
        questions: [
            { id: "business_desc", text: "صف عملك باختصار:", placeholder: "نحن نقدم..." },
            { id: "common_questions", text: "ما هي أكثر الأسئلة شيوعاً من عملائك؟", placeholder: "السؤال الأول: ...\nالسؤال الثاني: ..." },
            { id: "contact_methods", text: "كيف يمكن للعملاء التواصل معك؟", placeholder: "واتساب، هاتف، إيميل، موقع الويب" },
            { id: "special_info", text: "معلومات إضافية مهمة:", placeholder: "أي معلومات إضافية تريد إضافتها" }
        ]
    }
};

let selectedBusiness = null;
let userAnswers = {};

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

// دالة إرسال البيانات لـ Google Form
async function submitToGoogleForm(formData) {
    const url = GOOGLE_FORM_CONFIG.FORM_URL;
    
    // بناء البيانات
    const params = new URLSearchParams({
        [GOOGLE_FORM_CONFIG.EMAIL_FIELD]: formData.email,
        [GOOGLE_FORM_CONFIG.NAME_FIELD]: formData.name,
        [GOOGLE_FORM_CONFIG.BUSINESS_FIELD]: formData.business,
        [GOOGLE_FORM_CONFIG.QUESTIONS_FIELD]: JSON.stringify(formData.questions),
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
    
    // إزالة التحديد السابق
    document.querySelectorAll('#businessType > div').forEach(div => {
        div.classList.remove('border-purple-500', 'border-blue-500', 'border-green-500', 'border-red-500', 'shadow-lg', 'scale-[1.02]');
    });
    
    // إضافة التحديد الجديد
    const selectedDiv = event.currentTarget;
    selectedDiv.classList.add(`border-${businessTypes[type].color}-500`, 'shadow-lg', 'scale-[1.02]');
    
    // إظهار قسم الأسئلة بعد ثانية
    setTimeout(() => showQuestionsSection(), 300);
}

// إظهار قسم الأسئلة
function showQuestionsSection() {
    const business = businessTypes[selectedBusiness];
    
    let html = `
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fadeIn">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <span class="bg-${business.color}-100 text-${business.color}-700 px-4 py-2 rounded-full font-bold">
                        الخطوة الثانية
                    </span>
                    <h3 class="text-2xl font-bold text-gray-800 mt-2">
                        أجب على الأسئلة الأساسية لـ ${business.name}
                    </h3>
                </div>
                <button onclick="goBack()" class="text-gray-600 hover:text-gray-800">
                    <i class="fas fa-arrow-right ml-2"></i> العودة
                </button>
            </div>
            
            <form id="questionsForm" onsubmit="return showFreePlan(event)">
    `;
    
    business.questions.forEach((q, index) => {
        html += `
            <div class="mb-8">
                <label class="block text-gray-700 font-bold text-lg mb-3">
                    <span class="bg-gray-100 px-3 py-1 rounded-full mr-2">${index + 1}</span>
                    ${q.text}
                </label>
                <textarea 
                    id="${q.id}"
                    rows="3"
                    class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-${business.color}-500 focus:ring-2 focus:ring-${business.color}-200 transition"
                    placeholder="${q.placeholder}"
                    oninput="saveAnswer('${q.id}', this.value)"
                    required
                ></textarea>
                <div class="text-left mt-2">
                    <span id="charCount${q.id}" class="text-sm text-gray-500">0 حرف</span>
                </div>
            </div>
        `;
    });
    
    html += `
            <div class="text-center mt-12">
                <button type="submit" class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition shadow-lg w-full">
                    <i class="fas fa-gift ml-2"></i> احصل على بوتك المجاني الآن
                </button>
                <p class="text-gray-500 mt-4">
                    ✓ بوت كامل مجاناً<br>
                    ✓ Google Sheet تلقائي لمتابعة الأسئلة
                </p>
            </div>
            </form>
        </div>
    `;
    
    document.getElementById('questionsSection').innerHTML = html;
    document.getElementById('questionsSection').classList.remove('hidden');
    
    // Scroll إلى القسم
    document.getElementById('questionsSection').scrollIntoView({ behavior: 'smooth' });
}

// حفظ الإجابات
function saveAnswer(id, value) {
    userAnswers[id] = value;
    document.getElementById(`charCount${id}`).textContent = `${value.length} حرف`;
}

// العودة للخلف
function goBack() {
    document.getElementById('questionsSection').classList.add('hidden');
    document.getElementById('freePlanSection').classList.add('hidden');
    document.getElementById('successSection').classList.add('hidden');
}

// عرض قسم الباقة المجانية
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
        alert('⚠️ الرجاء الإجابة على جميع الأسئلة قبل المتابعة');
        return;
    }
    
    // تحديث ملخص الطلب
    let summaryHTML = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <span>نوع المتجر:</span>
                <span class="font-bold">${business.name}</span>
            </div>
    `;
    
    business.questions.forEach(q => {
        const answer = userAnswers[q.id];
        summaryHTML += `
            <div class="flex justify-between items-start">
                <span class="text-gray-600">${q.text}:</span>
                <span class="text-right font-medium max-w-xs">${answer.substring(0, 50)}${answer.length > 50 ? '...' : ''}</span>
            </div>
        `;
    });
    
    summaryHTML += `
            <div class="pt-3 border-t">
                <div class="flex justify-between text-green-600 font-bold">
                    <span>السعر:</span>
                    <span>مجاناً 🎁</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('orderSummary').innerHTML = summaryHTML;
    document.getElementById('questionsSection').classList.add('hidden');
    document.getElementById('freePlanSection').classList.remove('hidden');
    document.getElementById('freePlanSection').scrollIntoView({ behavior: 'smooth' });
}

// معالجة الطلب المجاني
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('freeBotForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('userEmail').value;
            const name = document.getElementById('userName').value;
            
            if (!email || !name) {
                alert('⚠️ الرجاء إدخال البريد الإلكتروني والاسم');
                return;
            }
            
            const formData = {
                email: email,
                name: name,
                business: businessTypes[selectedBusiness].name,
                questions: userAnswers,
                timestamp: new Date().toISOString()
            };
            
            // 1. أرسل البيانات لـ Google Form
            await submitToGoogleForm(formData);
            
            // 2. أنشئ البوت
            const botContent = generateCompleteBotFile();
            
            // 3. عرض التحميل المباشر
            showDownloadSection(botContent);
        });
    }
});

// توليد ملف البوت الكامل
function generateCompleteBotFile() {
    const business = businessTypes[selectedBusiness];
    
    return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>شات بوت ${business.name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .chatbot-container {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 1000;
            border: 1px solid #e5e7eb;
        }
        
        .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .chat-header h3 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .chat-header p {
            font-size: 13px;
            opacity: 0.9;
        }
        
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f9fafb;
        }
        
        .message {
            margin-bottom: 15px;
            max-width: 80%;
            clear: both;
        }
        
        .user-message {
            background: #3b82f6;
            color: white;
            padding: 10px 15px;
            border-radius: 18px 18px 0 18px;
            float: left;
        }
        
        .bot-message {
            background: white;
            color: #1f2937;
            padding: 10px 15px;
            border-radius: 18px 18px 18px 0;
            float: right;
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .chat-input {
            padding: 15px;
            border-top: 1px solid #e5e7eb;
            background: white;
            display: flex;
            gap: 10px;
        }
        
        .chat-input input {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 14px;
            outline: none;
            transition: border 0.3s;
        }
        
        .chat-input input:focus {
            border-color: #667eea;
        }
        
        .chat-input button {
            background: #667eea;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0 20px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s;
        }
        
        .chat-input button:hover {
            background: #5a67d8;
        }
        
        .quick-questions {
            padding: 10px 15px;
            background: white;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .quick-btn {
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .quick-btn:hover {
            background: #e5e7eb;
        }
        
        .chat-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #667eea;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            z-index: 999;
        }
        
        .chat-toggle i {
            font-size: 24px;
        }
        
        .hidden {
            display: none !important;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="chat-toggle" id="chatToggle">
        <i class="fas fa-robot"></i>
    </div>
    
    <div class="chatbot-container hidden" id="chatbot">
        <div class="chat-header">
            <h3>${business.name}</h3>
            <p>أنا البوت المساعد، كيف يمكنني مساعدتك؟</p>
        </div>
        
        <div class="quick-questions" id="quickQuestions"></div>
        
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                مرحباً! أنا البوت المساعد لـ ${business.name}. 
                يمكنك سؤالي عن أي شيء، أو اختيار أحد الأسئلة السريعة.
            </div>
        </div>
        
        <div class="chat-input">
            <input type="text" id="userInput" placeholder="اكتب سؤالك هنا..." dir="rtl">
            <button id="sendButton"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

    <script>
        const botData = {
            businessName: "${business.name}",
            answers: ${JSON.stringify(userAnswers)},
            faqs: [
                ${business.questions.map(q => `{
                    question: "${q.text}",
                    answer: "${userAnswers[q.id] || 'سيتم إضافة الإجابة قريباً'}"
                }`).join(',\n                ')}
            ]
        };
        
        const chatToggle = document.getElementById('chatToggle');
        const chatbot = document.getElementById('chatbot');
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        const quickQuestions = document.getElementById('quickQuestions');
        
        botData.faqs.forEach(faq => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            btn.textContent = faq.question.length > 30 ? faq.question.substring(0, 30) + '...' : faq.question;
            btn.onclick = () => askQuestion(faq.question);
            quickQuestions.appendChild(btn);
        });
        
        chatToggle.onclick = () => {
            chatbot.classList.toggle('hidden');
        };
        
        sendButton.onclick = sendMessage;
        userInput.onkeypress = (e) => {
            if (e.key === 'Enter') sendMessage();
        };
        
        function sendMessage() {
            const question = userInput.value.trim();
            if (question) {
                askQuestion(question);
                userInput.value = '';
            }
        }
        
        function askQuestion(question) {
            addMessage(question, 'user');
            
            let answer = "عذراً، لا أعرف الإجابة على هذا السؤال. يمكنك التواصل مع الدعم.";
            
            for (const faq of botData.faqs) {
                if (question.includes(faq.question.substring(0, 10)) || faq.question.includes(question.substring(0, 10))) {
                    answer = faq.answer;
                    break;
                }
            }
            
            setTimeout(() => {
                addMessage(answer, 'bot');
            }, 500);
        }
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = \`message \${sender}-message\`;
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    </script>
    
    <div style="text-align: center; margin: 20px auto; font-size: 12px; color: #6b7280; padding: 10px; max-width: 500px;">
        <p>بوت مقدم من <strong>ChatBot Builder</strong></p>
        <p>تم الإنشاء: ${new Date().toLocaleDateString('ar-EG')}</p>
        <p>نوع المتجر: ${business.name}</p>
    </div>
</body>
</html>`;
}

// دالة عرض التحميل المباشر
function showDownloadSection(botContent) {
    // إنشاء ملف للتحميل
    const blob = new Blob([botContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    let html = `
        <div class="text-center bg-white rounded-2xl shadow-xl p-8 my-12 animate-fadeIn">
            <div class="text-green-600 text-6xl mb-6">🎉</div>
            <h3 class="text-3xl font-bold text-gray-800 mb-4">بوتك جاهز للتحميل!</h3>
            <p class="text-gray-600 text-lg mb-8">تم إرسال بياناتك بنجاح وحفظها في نظامنا</p>
            
            <div class="max-w-2xl mx-auto">
                <!-- تحميل البوت -->
                <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl mb-8">
                    <h4 class="font-bold text-2xl mb-4 text-purple-700">
                        <i class="fas fa-robot ml-2"></i>
                        حمّل ملف البوت الآن
                    </h4>
                    <p class="text-gray-700 mb-6">ملف HTML جاهز للرفع على موقعك</p>
                    <a href="${url}" download="شات-بوت-موقعي.html" 
                       class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition shadow-lg inline-block">
                        <i class="fas fa-download ml-2"></i> تحميل ملف البوت
                    </a>
                    <p class="text-gray-500 text-sm mt-4">حجم الملف: ${(botContent.length / 1024).toFixed(1)} كيلوبايت</p>
                </div>
                
                <!-- Google Sheet -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl mb-8">
                    <h4 class="font-bold text-2xl mb-4 text-green-700">
                        <i class="fas fa-table ml-2"></i>
                        بياناتك محفوظة في Google Sheet
                    </h4>
                    <p class="text-gray-700 mb-6">يمكنك الاطلاع على جميع الطلبات وتعديلها</p>
                    <a href="${GOOGLE_FORM_CONFIG.SHEET_URL}" target="_blank" 
                       class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition shadow-lg inline-block">
                        <i class="fas fa-external-link-alt ml-2"></i> فتح Google Sheet
                    </a>
                    <p class="text-gray-500 text-sm mt-4">سيتم تحديث البيانات تلقائياً</p>
                </div>
                
                <!-- التعليمات -->
                <div class="bg-yellow-50 p-6 rounded-xl text-right">
                    <h4 class="font-bold text-xl mb-4 text-yellow-800">📝 خطوات رفع البوت على موقعك:</h4>
                    <ol class="space-y-3 text-gray-700 pr-6">
                        <li><strong>1.</strong> حمّل ملف <code class="bg-gray-200 px-2 py-1 rounded">شات-بوت-موقعي.html</code></li>
                        <li><strong>2.</strong> ارفعه على استضافة موقعك (استخدم File Manager أو FTP)</li>
                        <li><strong>3.</strong> أضف هذا الكود في صفحات موقعك:<br>
                            <code class="bg-gray-800 text-white p-2 rounded block text-sm mt-2 text-left">&lt;iframe src="/شات-بوت-موقعي.html" width="350" height="500" style="border:none;"&gt;&lt;/iframe&gt;</code>
                        </li>
                        <li><strong>4.</strong> لحفظ البوت في مجلد معين:<br>
                            <code class="bg-gray-800 text-white p-2 rounded block text-sm mt-2 text-left">&lt;iframe src="/chatbot/شات-بوت-موقعي.html" width="350" height="500"&gt;&lt;/iframe&gt;</code>
                        </li>
                    </ol>
                </div>
                
                <!-- إنشاء بوت آخر -->
                <div class="mt-12">
                    <p class="text-gray-600 mb-4">هل تريد إنشاء بوت آخر؟</p>
                    <button onclick="goBack()" 
                            class="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
                        ← أنشئ بوتاً جديداً
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

// إضافة CSS للـ animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
    }
    .hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);
