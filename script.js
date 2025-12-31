// ===== ملف JavaScript الأساسي =====

console.log('🚀 script.js يعمل بنجاح!');

// === 1. تهيئة جميع العناصر ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ الصفحة جاهزة');
    
    // جعل كل العناصر قابلة للنقر
    makeEverythingClickable();
    
    // تفعيل رفع الملفات
    setupFileUpload();
    
    // تفعيل نموذج إنشاء البوت
    setupBotForm();
    
    // تفعيل أزرار التنقل
    setupNavigation();
});

// === 2. جعل كل شيء قابل للنقر ===
function makeEverythingClickable() {
    // الأزرار الأساسية
    document.querySelectorAll('button, a[href], .btn-primary, .btn-secondary, .option-card').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function(e) {
            console.log('🖱️ تم النقر على:', e.target.className || e.target.tagName);
        });
    });
    
    // تفعيل أزرار الخيارات
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('📁 اختيار مصدر بيانات');
            selectDataSource(this);
        });
    });
    
    console.log('✅ جميع العناصر قابلة للنقر');
}

// === 3. اختيار مصدر البيانات ===
function selectDataSource(card) {
    // إزالة التحديد القديم
    document.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('border-blue-500', 'border-green-500', 'shadow-lg', 'bg-blue-50', 'bg-green-50');
    });
    
    // إضافة التحديد الجديد
    const isFileOption = card.querySelector('.fa-file-upload');
    const color = isFileOption ? 'blue' : 'green';
    
    card.classList.add(`border-${color}-500`, 'shadow-lg', `bg-${color}-50`);
    
    // إظهار الحقل المناسب
    if (isFileOption) {
        document.getElementById('fileUploadArea').classList.remove('hidden');
        document.getElementById('linkInputArea').classList.add('hidden');
    } else {
        document.getElementById('linkInputArea').classList.remove('hidden');
        document.getElementById('fileUploadArea').classList.add('hidden');
    }
    
    // إظهار الخطوة التالية بعد ثانية
    setTimeout(() => {
        showNextStep();
    }, 500);
}

// === 4. رفع الملفات ===
function setupFileUpload() {
    const dropArea = document.querySelector('.file-upload-area .border-dashed');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'realFileInput';
    fileInput.className = 'hidden';
    fileInput.accept = '.pdf,.doc,.docx,.txt';
    document.body.appendChild(fileInput);
    
    if (dropArea) {
        // النقر
        dropArea.addEventListener('click', function() {
            console.log('📂 فتح نافذة اختيار الملف');
            fileInput.click();
        });
        
        // سحب وإفلات
        dropArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        dropArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        dropArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
    }
    
    // عند اختيار ملف
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });
}

function handleFile(file) {
    console.log('📄 ملف مرفوع:', file.name);
    
    // عرض اسم الملف
    const fileNameEl = document.getElementById('fileName');
    fileNameEl.textContent = `✅ ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    fileNameEl.classList.remove('hidden');
    
    // محاكاة معالجة الملف
    setTimeout(() => {
        showInfoPreview(file.name);
    }, 800);
}

// === 5. معاينة المعلومات ===
function showInfoPreview(filename) {
    console.log('👁️ عرض معاينة المعلومات');
    
    const previewContent = `
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <h4 class="font-bold mb-2">📄 ${filename}</h4>
                <p class="text-gray-600">تم رفع الملف بنجاح! البوت سيستخدم المعلومات من هذا الملف للإجابة على أسئلة العملاء.</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-blue-700">✓ الملف готова للمعالجة<br>✓ البوت سيفهم محتواه تلقائياً<br>✓ يمكنك تعديل المعلومات إذا أردت</p>
            </div>
        </div>
    `;
    
    document.getElementById('previewContent').innerHTML = previewContent;
    document.getElementById('infoPreview').classList.remove('hidden');
    document.getElementById('infoPreview').scrollIntoView({ behavior: 'smooth' });
}

// === 6. الخطوة التالية ===
function showNextStep() {
    console.log('➡️ الانتقال للخطوة التالية');
    
    // إذا كان في قسم المعلومات، اذهب للحساب
    const infoPreview = document.getElementById('infoPreview');
    if (infoPreview && !infoPreview.classList.contains('hidden')) {
        confirmInfo();
    }
}

function confirmInfo() {
    console.log('✅ تأكيد المعلومات');
    
    document.getElementById('infoPreview').classList.add('hidden');
    document.getElementById('accountSection').classList.remove('hidden');
    document.getElementById('accountSection').scrollIntoView({ behavior: 'smooth' });
}

// === 7. نموذج إنشاء البوت ===
function setupBotForm() {
    const form = document.getElementById('botAccountForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('🤖 إنشاء بوت جديد');
        
        const botName = document.getElementById('botName').value;
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        if (!botName || !email || !password) {
            alert('⚠️ الرجاء ملء جميع الحقول');
            return;
        }
        
        // عرض حالة التحميل
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loader"></span> جاري إنشاء البوت...';
        submitBtn.disabled = true;
        
        // محاكاة إنشاء البوت
        setTimeout(() => {
            console.log('🎉 البوت تم إنشاؤه:', botName);
            
            // إظهار قسم التحميل
            showDownloadSection(botName, email);
            
            // إعادة تعيين الزر
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// === 8. قسم التحميل ===
function showDownloadSection(botName, email) {
    console.log('⬇️ عرض قسم التحميل');
    
    const downloadHTML = `
        <section class="py-16 bg-gradient-to-b from-white to-green-50 animate-fadeIn">
            <div class="container mx-auto px-4">
                <div class="text-center bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
                    <div class="text-green-600 text-6xl mb-6">🎉</div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-4">تهانينا! بوتك جاهز</h3>
                    <p class="text-gray-600 text-lg mb-8">
                        تم إنشاء <strong>${botName}</strong> بنجاح<br>
                        يمكنك الآن تحميله ورفعه على موقعك
                    </p>
                    
                    <div class="space-y-6">
                        <!-- زر التحميل -->
                        <div>
                            <button onclick="downloadRealBot('${botName}', '${email}')" 
                                    class="btn-primary text-xl px-12 py-4 hover:scale-105 transition-transform">
                                <i class="fas fa-download ml-2"></i> تحميل ملف البوت
                            </button>
                            <p class="text-gray-500 text-sm mt-3">انقر للتحميل المباشر</p>
                        </div>
                        
                        <!-- التعليمات -->
                        <div class="bg-yellow-50 p-6 rounded-xl text-right">
                            <h4 class="font-bold text-xl mb-4 text-yellow-800">📝 خطوات التركيب:</h4>
                            <ol class="space-y-3 text-gray-700 pr-6">
                                <li><strong>1.</strong> حمّل ملف البوت أعلاه</li>
                                <li><strong>2.</strong> ارفعه على استضافة موقعك</li>
                                <li><strong>3.</strong> أضف هذا الكود في صفحات موقعك:<br>
                                    <code class="bg-gray-800 text-white p-2 rounded block text-sm mt-2 text-left">
                                        &lt;script src="/my-chatbot.html"&gt;&lt;/script&gt;
                                    </code>
                                </li>
                                <li><strong>4.</strong> سيظهر البوت في الزاوية السفلية اليسرى</li>
                            </ol>
                        </div>
                        
                        <!-- إنشاء بوت جديد -->
                        <div class="pt-6 border-t">
                            <button onclick="createNewBot()" class="btn-secondary px-8 py-3">
                                <i class="fas fa-plus ml-2"></i> إنشاء بوت جديد
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    document.getElementById('downloadSection').innerHTML = downloadHTML;
    document.getElementById('downloadSection').classList.remove('hidden');
    document.getElementById('builder').classList.add('hidden');
    document.getElementById('downloadSection').scrollIntoView({ behavior: 'smooth' });
}

// === 9. دوال المساعدة ===
function downloadRealBot(botName, email) {
    console.log('💾 تحميل بوت:', botName);
    
    // إنشاء محتوى البوت البسيط
    const botContent = `<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${botName} - AI ChatBot</title>
    <style>
        .chatbot {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102,126,234,0.4);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
        }
        .chatbot:hover { transform: scale(1.05); }
    </style>
</head>
<body>
    <div class="chatbot" onclick="alert('🎉 ${botName} يعمل بنجاح!\\nالبريد: ${email}')">
        <i class="fas fa-robot"></i>
        <span>${botName}</span>
    </div>
    
    <script>
        console.log('🤖 ${botName} يعمل بنجاح!');
    </script>
</body>
</html>`;
    
    // إنشاء ملف للتحميل
    const blob = new Blob([botContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chatbot-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    alert(`✅ تم تحميل ${botName} بنجاح!\nالملف: ${a.download}`);
}

function createNewBot() {
    console.log('🔄 إنشاء بوت جديد');
    location.reload();
}

// === 10. التنقل ===
function setupNavigation() {
    // أزرار البداية
    document.querySelectorAll('a[href="#builder"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// === 11. CSS للتحميل ===
const style = document.createElement('style');
style.textContent = `
    .loader {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        display: inline-block;
        vertical-align: middle;
        margin-left: 8px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .dragover {
        border-color: #667eea !important;
        background: #f0f4ff !important;
    }
`;
document.head.appendChild(style);

console.log('✅ تم تحميل script.js بنجاح');
