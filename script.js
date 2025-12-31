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
            
            <form id="questionsForm" onsubmit="return showPreview(event)">
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
                ></textarea>
                <div class="text-left mt-2">
                    <span id="charCount${q.id}" class="text-sm text-gray-500">0 حرف</span>
                </div>
            </div>
        `;
    });
    
    html += `
            <div class="text-center mt-12">
                <button type="submit" class="bg-${business.color}-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-${business.color}-700 transition shadow-lg">
                    <i class="fas fa-eye ml-2"></i> معاينة البوت
                </button>
                <p class="text-gray-500 mt-4">ستتم معاينة البوت قبل الدفع</p>
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
    document.getElementById('previewSection').classList.add('hidden');
}

// معاينة البوت
function showPreview(e) {
    e.preventDefault();
    
    const business = businessTypes[selectedBusiness];
    const totalChars = Object.values(userAnswers).join('').length;
    
    let html = `
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fadeIn">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <span class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">
                        الخطوة الثالثة
                    </span>
                    <h3 class="text-2xl font-bold text-gray-800 mt-2">
                        معاينة البوت النهائي
                    </h3>
                </div>
                <button onclick="goBack()" class="text-gray-600 hover:text-gray-800">
                    <i class="fas fa-arrow-right ml-2"></i> العودة
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- معاينة البوت -->
                <div class="border-2 border-gray-200 rounded-xl p-6">
                    <h4 class="font-bold text-xl mb-4 flex items-center">
                        <i class="fas fa-robot text-${business.color}-600 ml-2"></i>
                        معاينة البوت
                    </h4>
                    <div class="chatbot-preview bg-gray-50 p-4 rounded-lg">
                        <div class="bg-white rounded-lg shadow-inner p-4 h-64 overflow-y-auto">
                            <div class="mb-4">
                                <div class="bg-${business.color}-100 text-${business.color}-700 p-3 rounded-lg inline-block rounded-bl-none">
                                    <strong>البوت:</strong> مرحباً! أنا البوت المساعد لـ ${business.name}. كيف يمكنني مساعدتك؟
                                </div>
                            </div>
                            ${business.questions.map((q, i) => `
                                <div class="mb-4 text-left">
                                    <div class="bg-gray-100 text-gray-700 p-3 rounded-lg inline-block rounded-br-none max-w-xs">
                                        <strong>الزبون:</strong> ${q.text}
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <div class="bg-${business.color}-100 text-${business.color}-700 p-3 rounded-lg inline-block rounded-bl-none max-w-xs">
                                        <strong>البوت:</strong> ${userAnswers[q.id] || 'سيتم إضافة الإجابة هنا...'}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- اختيار الباقة -->
                <div>
                    <h4 class="font-bold text-xl mb-6">اختر باقاتك</h4>
                    
                    <div class="space-y-6">
                        <!-- الباقة الأساسية -->
                        <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h5 class="font-bold text-lg">الباقة الأساسية</h5>
                                    <p class="text-gray-600 text-sm">مناسب للبداية</p>
                                </div>
                                <div class="text-left">
                                    <span class="text-3xl font-bold">$15</span>
                                    <span class="text-gray-500 block">مرة واحدة</span>
                                </div>
                            </div>
                            <ul class="space-y-2 mb-6">
                                <li class="flex items-center"><i class="fas fa-check text-green-500 ml-2"></i> ملف HTML جاهز</li>
                                <li class="flex items-center"><i class="fas fa-check text-green-500 ml-2"></i> ${business.questions.length} سؤال أساسي</li>
                                <li class="flex items-center"><i class="fas fa-times text-red-500 ml-2"></i> بدون Google Sheet</li>
                                <li class="flex items-center"><i class="fas fa-times text-red-500 ml-2"></i> دعم محدود</li>
                            </ul>
                            <button onclick="selectPlan('basic')" class="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                                اختر هذه الباقة
                            </button>
                        </div>
                        
                        <!-- الباقة المتقدمة -->
                        <div class="border-2 border-${business.color}-500 rounded-xl p-6 bg-${business.color}-50 relative">
                            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span class="bg-${business.color}-600 text-white px-4 py-1 rounded-full text-sm font-bold">الأفضل</span>
                            </div>
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h5 class="font-bold text-lg">الباقة المتقدمة</h5>
                                    <p class="text-gray-600 text-sm">الأكثر طلباً</p>
                                </div>
                                <div class="text-left">
                                    <span class="text-3xl font-bold text-${business.color}-700">$30</span>
                                    <span class="text-gray-500 block">مرة واحدة</span>
                                </div>
                            </div>
                            <ul class="space-y-2 mb-6">
                                <li class="flex items-center"><i class="fas fa-check text-green-500 ml-2"></i> ملف HTML جاهز</li>
                                <li class="flex items-center"><i class="fas fa-check text-green-500 ml-2"></i> ${business.questions.length} سؤال أساسي</li>
                                <li class="flex items-center"><i class="fas fa-check text-green-500 ml-2"></i> <strong>Google Sheet تلقائي</strong></li>
                                <li class="flex items-center"><i class="fas fa-check text-green-500 ml-2"></i> دعم لمدة 6 أشهر</li>
                            </ul>
                            <button onclick="selectPlan('pro')" class="w-full bg-${business.color}-600 text-white py-3 rounded-lg font-bold hover:bg-${business.color}-700 transition">
                                اختر هذه الباقة
                            </button>
                        </div>
                    </div>
                    
                    <div class="mt-8 p-4 bg-blue-50 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-info-circle text-blue-600 text-xl ml-3"></i>
                            <div>
                                <p class="font-bold text-blue-800">Google Sheet التلقائي</p>
                                <p class="text-blue-600 text-sm">سيتم إنشاء Google Sheet باسمك تلقائياً بعد الدفع، يحفظ كل بيانات البوت ويسمح لك بتعديلها</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('previewSection').innerHTML = html;
    document.getElementById('previewSection').classList.remove('hidden');
    document.getElementById('questionsSection').classList.add('hidden');
    
    // Scroll
    document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
}

// اختيار الباقة
function selectPlan(plan) {
    const business = businessTypes[selectedBusiness];
    const email = prompt("📧 أدخل بريدك الإلكتروني لإرسال البوت:");
    
    if (!email) return;
    
    alert(`🎉 تم استلام طلبك!\n\nسيتم إرسال البوت إلى:\n${email}\n\nالخطوات القادمة:\n1. سيصلك رابط الدفع\n2. بعد التأكيد، سيصلك البوت\n3. للباقة المتقدمة: Google Sheet سيصلك تلقائياً`);
    
    // محاكاة الإرسال
    setTimeout(() => {
        alert(`✅ تم إرسال رابط الدفع إلى ${email}\n\nتحقق من بريدك (والمجلد الرسائل المزعجة أيضاً)`);
    }, 1000);
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
`;
document.head.appendChild(style);
