// ================================
// النظام الأساسي
// ================================

let currentStep = 'dataSource';
let botData = {
    sourceType: '',
    content: '',
    botName: '',
    adminEmail: '',
    password: '',
    language: 'ar',
    createdAt: ''
};

// إدارة خطوات النظام
function selectDataSource(type) {
    botData.sourceType = type;
    
    // إزالة التحديد السابق
    document.querySelectorAll('#dataSource > div').forEach(div => {
        div.classList.remove('border-blue-500', 'border-green-500', 'shadow-lg');
    });
    
    // إضافة التحديد الجديد
    const selectedDiv = event.currentTarget;
    selectedDiv.classList.add(type === 'file' ? 'border-blue-500' : 'border-green-500', 'shadow-lg');
    
    // إظهار حقل الإدخال المناسب
    if (type === 'file') {
        document.getElementById('fileUploadArea').classList.remove('hidden');
        document.getElementById('linkInputArea').classList.add('hidden');
        
        // إعداد رفع الملف
        setupFileUpload();
    } else {
        document.getElementById('linkInputArea').classList.remove('hidden');
        document.getElementById('fileUploadArea').classList.add('hidden');
    }
}

// رفع الملف
function setupFileUpload() {
    const fileInput = document.getElementById('infoFile');
    const dropArea = document.querySelector('.file-upload-area .border-dashed');
    
    // عند اختيار ملف
    fileInput.addEventListener('change', handleFileSelect);
    
    // سحب وإفلات
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });
    
    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });
    
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        fileInput.files = e.dataTransfer.files;
        handleFileSelect({ target: fileInput });
    });
}

// معالجة الملف المرفوع
async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // التحقق من نوع الملف
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'text/plain'];
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
        alert('نوع الملف غير مدعوم. الرجاء رفع ملف PDF، Word، أو ملف نصي.');
        return;
    }
    
    // التحقق من الحجم
    if (file.size > 10 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت.');
        return;
    }
    
    document.getElementById('fileName').textContent = `✓ ${file.name}`;
    document.getElementById('fileName').classList.remove('hidden');
    
    // استخراج النص من الملف
    try {
        const content = await extractTextFromFile(file);
        botData.content = content;
        
        // الانتقال للخطوة التالية
        setTimeout(() => {
            showInfoPreview(content);
        }, 500);
    } catch (error) {
        alert('حدث خطأ في قراءة الملف. الرجاء التأكد من أن الملف غير تالف.');
        console.error(error);
    }
}

// استخراج النص من الملف
async function extractTextFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            let content = '';
            
            if (file.type === 'application/pdf') {
                // لملفات PDF (محاكاة - في الواقع ستحتاج مكتبة PDF.js)
                content = `[محتوى PDF] ${file.name}\n\nهذا نموذج محاكاة. في النسخة الكاملة، سيتم استخراج النص الفعلي من ملف PDF.\n\nمعلومات عن ${file.name}: ملف PDF تم رفعه للبوت.`;
            } else if (file.type.includes('word')) {
                content = `[محتوى Word] ${file.name}\n\nهذا نموذج محاكاة. في النسخة الكاملة، سيتم استخراج النص الفعلي من ملف Word.\n\nمعلومات عن ${file.name}: ملف Word يحتوي على بيانات الشركة.`;
            } else {
                content = e.target.result;
            }
            
            resolve(content.substring(0, 5000)); // تحديد 5000 حرف كحد أقصى
        };
        
        reader.onerror = reject;
        
        if (file.type === 'application/pdf' || file.type.includes('word')) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }
    });
}

// جلب المعلومات من رابط
async function fetchWebsiteInfo() {
    const url = document.getElementById('websiteLink').value;
    if (!url) {
        showLinkError('الرجاء إدخال رابط الموقع');
        return;
    }
    
    // التحقق من صحة الرابط
    try {
        new URL(url);
    } catch {
        showLinkError('الرجاء إدخال رابط صحيح');
        return;
    }
    
    // عرض حالة التحميل
    const btn = document.querySelector('#linkInputArea button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="loader"></span> جاري جلب المعلومات...';
    btn.disabled = true;
    
    try {
        // محاكاة جلب المعلومات (في الواقع ستستخدم fetch مع proxy لتجنب CORS)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // محتوى تجريبي
        const mockContent = `معلومات من الموقع: ${url}

عن الشركة:
شركة رائدة في مجال التقنية تقدم حلول مبتكرة للشركات والأفراد.

الخدمات:
- تصميم وتطوير المواقع
- تطبيقات الجوال
- التسويق الإلكتروني
- استضافة المواقع

معلومات الاتصال:
العنوان: الرياض، المملكة العربية السعودية
الهاتف: +966 500000000
البريد: info@example.com

ساعات العمل:
الأحد - الخميس: 9 صباحاً - 6 مساءً
الجمعة - السبت: إجازة

هذا محتوى تجريبي من الموقع. في النسخة الكاملة، سيتم جلب المحتوى الفعلي من الصفحة.`;

        botData.content = mockContent;
        botData.sourceUrl = url;
        
        showInfoPreview(mockContent);
        showLinkError('');
    } catch (error) {
        showLinkError('فشل جلب المعلومات من الموقع. الرجاء التأكد من صحة الرابط.');
        console.error(error);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function validateLink() {
    const url = document.getElementById('websiteLink').value;
    if (!url) {
        showLinkError('');
        return;
    }
    
    try {
        new URL(url);
        showLinkError('');
    } catch {
        showLinkError('الرجاء إدخال رابط صحيح يبدأ بـ https://');
    }
}

function showLinkError(message) {
    const errorEl = document.getElementById('linkError');
    errorEl.textContent = message;
    errorEl.classList.toggle('hidden', !message);
}

// عرض معاينة المعلومات
function showInfoPreview(content) {
    const previewEl = document.getElementById('previewContent');
    
    // عرض أول 1000 حرف مع زر "عرض المزيد"
    const shortContent = content.length > 1000 ? content.substring(0, 1000) + '...' : content;
    
    previewEl.innerHTML = `
        <div class="prose max-w-none">
            <div class="whitespace-pre-line text-gray-700">${escapeHtml(shortContent)}</div>
            ${content.length > 1000 ? `
                <div class="mt-4 text-center">
                    <button onclick="showFullContent()" class="text-blue-600 hover:text-blue-800 font-medium">
                        <i class="fas fa-expand ml-2"></i> عرض المزيد
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('infoPreview').classList.remove('hidden');
    document.getElementById('infoPreview').scrollIntoView({ behavior: 'smooth' });
}

function showFullContent() {
    const modal = document.getElementById('infoModal');
    const editor = document.getElementById('infoEditor');
    editor.value = botData.content;
    modal.classList.remove('hidden');
}

// إدارة المودال
function closeModal() {
    document.getElementById('infoModal').classList.add('hidden');
}

function saveEditedInfo() {
    const newContent = document.getElementById('infoEditor').value;
    if (newContent.trim()) {
        botData.content = newContent;
        showInfoPreview(newContent);
        closeModal();
    }
}

function editInfo() {
    showFullContent();
}

function confirmInfo() {
    if (!botData.content.trim()) {
        alert('الرجاء إدخال معلومات للبوت أولاً');
        return;
    }
    
    document.getElementById('infoPreview').classList.add('hidden');
    document.getElementById('accountSection').classList.remove('hidden');
    document.getElementById('accountSection').scrollIntoView({ behavior: 'smooth' });
}

// إنشاء حساب البوت
document.getElementById('botAccountForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const botName = document.getElementById('botName').value;
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    if (!botName || !email || !password) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }
    
    botData.botName = botName;
    botData.adminEmail = email;
    botData.password = password;
    botData.createdAt = new Date().toISOString();
    botData.botId = 'bot_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // تعطيل الزر أثناء المعالجة
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loader"></span> جاري إنشاء البوت...';
    submitBtn.disabled = true;
    
    try {
        // حفظ البيانات في LocalStorage (في الواقع ستخزن في قاعدة بيانات)
        const bots = JSON.parse(localStorage.getItem('ai_chatbots') || '{}');
        bots[botData.botId] = {
            ...botData,
            // لا تخزن كلمة المرور نصياً (في الواقع ستشفرها)
            passwordHash: btoa(password + '_salt') // تشفير بسيط للتوضيح
        };
        localStorage.setItem('ai_chatbots', JSON.stringify(bots));
        
        // تأخير لمحاكاة الإنشاء
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // عرض قسم التحميل
        showDownloadSection();
    } catch (error) {
        console.error('Error creating bot:', error);
        alert('حدث خطأ أثناء إنشاء البوت. الرجاء المحاولة مرة أخرى.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ================================
// توليد البوت الذكي
// ================================

function generateAIChatBot() {
    const botId = botData.botId;
    const botName = botData.botName;
    const encodedData = btoa(JSON.stringify({
        id: botId,
        name: botName,
        content: botData.content.substring(0, 30000), // تحديد حجم البيانات
        source: botData.sourceType,
        created: botData.createdAt
    }));
    
    return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${botName} - AI ChatBot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* زر البوت العائم */
        .chatbot-toggle {
            position: fixed;
            bottom: 30px;
            left: 30px;
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
            transition: all 0.3s ease;
            border: none;
            outline: none;
        }
        
        .chatbot-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }
        
        .chatbot-toggle.active {
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            transform: rotate(45deg);
        }
        
        .chatbot-toggle.active:hover {
            transform: rotate(45deg) scale(1.1);
        }
        
        /* نافذة البوت */
        .chatbot-container {
            position: fixed;
            bottom: 100px;
            left: 30px;
            width: 400px;
            max-width: 90vw;
            height: 550px;
            max-height: 80vh;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 9998;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid #e5e7eb;
        }
        
        .chatbot-container.active {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        /* رأس البوت */
        .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }
        
        .chat-header h3 {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
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
        
        .chat-messages::-webkit-scrollbar {
            width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
        }
        
        /* الرسائل */
        .message {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 18px;
            line-height: 1.5;
            word-wrap: break-word;
            animation: messageAppear 0.3s ease-out;
        }
        
        @keyframes messageAppear {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .bot-message {
            background: white;
            color: #1f2937;
            border: 1px solid #e5e7eb;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 18px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .user-message {
            background: #3b82f6;
            color: white;
            align-self: flex-start;
            border-bottom-right-radius: 18px;
            border-bottom-left-radius: 4px;
        }
        
        /* مؤشر الكتابة */
        .typing-indicator {
            display: none;
            padding: 12px 16px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            align-self: flex-end;
            width: fit-content;
            margin-bottom: 10px;
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
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-5px);
            }
        }
        
        /* منطقة الإدخال */
        .chat-input {
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            background: white;
            display: flex;
            gap: 10px;
            flex-shrink: 0;
        }
        
        .chat-input input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
            text-align: right;
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
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chat-input button:hover {
            background: #5a67d8;
        }
        
        .chat-input button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }
        
        /* زر إدارة البوت */
        .admin-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.1);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.3s;
            z-index: 1;
        }
        
        .admin-btn:hover {
            background: rgba(0,0,0,0.2);
        }
        
        /* نافذة الإدارة */
        .admin-panel {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        }
        
        .admin-panel.active {
            display: flex;
        }
        
        .admin-modal {
            background: white;
            border-radius: 20px;
            width: 100%;
            max-width: 500px;
            max-height: 80vh;
            overflow: hidden;
            animation: modalAppear 0.3s ease-out;
        }
        
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .admin-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .admin-body {
            padding: 20px;
            overflow-y: auto;
            max-height: 60vh;
        }
        
        .admin-body form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .admin-body input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 14px;
        }
        
        .admin-body input:focus {
            border-color: #667eea;
            outline: none;
        }
        
        .admin-body textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 14px;
            min-height: 100px;
            resize: vertical;
            font-family: inherit;
        }
        
        .admin-body textarea:focus {
            border-color: #667eea;
            outline: none;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .form-group label {
            font-weight: bold;
            color: #374151;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-primary {
            background: #667eea;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5a67d8;
        }
        
        .btn-secondary {
            background: #9ca3af;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #6b7280;
        }
        
        /* تنبيهات */
        .alert {
            padding: 12px;
            border-radius: 10px;
            margin-bottom: 15px;
            display: none;
        }
        
        .alert-success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        
        .alert-error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
        /* استجابة للجوال */
        @media (max-width: 640px) {
            .chatbot-container {
                width: 95vw;
                height: 70vh;
                left: 2.5vw;
                right: 2.5vw;
            }
            
            .chatbot-toggle {
                left: 20px;
                bottom: 20px;
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
            
            .admin-modal {
                max-width: 95vw;
                max-height: 95vh;
            }
        }
    </style>
</head>
<body>
    <!-- زر البوت العائم -->
    <button class="chatbot-toggle" id="chatToggle">
        <i class="fas fa-robot" id="toggleIcon"></i>
    </button>
    
    <!-- زر إدارة البوت -->
    <button class="admin-btn" id="adminBtn" title="إدارة البوت">
        <i class="fas fa-cog"></i>
    </button>
    
    <!-- نافذة البوت -->
    <div class="chatbot-container" id="chatbot">
        <div class="chat-header">
            <h3>${botName}</h3>
            <button class="close-btn" id="closeChat">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message" id="welcomeMessage">
                مرحباً! أنا ${botName}، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟
            </div>
        </div>
        
        <div class="typing-indicator" id="typingIndicator">
            <span></span><span></span><span></span>
        </div>
        
        <div class="chat-input">
            <input type="text" id="userInput" placeholder="اكتب سؤالك هنا..." autocomplete="off">
            <button id="sendButton"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    
    <!-- نافذة الإدارة -->
    <div class="admin-panel" id="adminPanel">
        <div class="admin-modal">
            <div class="admin-header">
                <h3>إدارة البوت</h3>
                <button class="close-btn" id="closeAdmin">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-body">
                <div class="alert" id="adminAlert"></div>
                
                <form id="loginForm">
                    <div class="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" id="loginEmail" placeholder="admin@example.com" required>
                    </div>
                    <div class="form-group">
                        <label>كلمة المرور</label>
                        <input type="password" id="loginPassword" placeholder="********" required>
                    </div>
                    <button type="submit" class="btn btn-primary">تسجيل الدخول</button>
                </form>
                
                <form id="manageForm" style="display: none;">
                    <div class="form-group">
                        <label>إضافة معلومات جديدة</label>
                        <textarea id="newInfo" placeholder="أضف معلومات جديدة للبوت..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>أو ربط موقع جديد</label>
                        <input type="url" id="newWebsite" placeholder="https://example.com">
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="addNewInfo()" class="btn btn-primary flex-1">إضافة معلومات</button>
                        <button type="button" onclick="resetBot()" class="btn btn-secondary">إعادة تعيين</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        // ===== البيانات الأساسية =====
        const BOT_DATA = "${encodedData}";
        const BOT_ID = "${botId}";
        const BOT_CONFIG = {
            name: "${botName}",
            source: "${botData.sourceType}",
            content: \`${botData.content.replace(/`/g, '\\`').substring(0, 30000)}\`
        };
        
        // ===== متغيرات النظام =====
        let chatHistory = [];
        let isProcessing = false;
        let isAdminLoggedIn = false;
        
        // ===== تهيئة البوت =====
        document.addEventListener('DOMContentLoaded', function() {
            // عناصر DOM
            const chatToggle = document.getElementById('chatToggle');
            const chatbot = document.getElementById('chatbot');
            const toggleIcon = document.getElementById('toggleIcon');
            const closeChat = document.getElementById('closeChat');
            const chatMessages = document.getElementById('chatMessages');
            const userInput = document.getElementById('userInput');
            const sendButton = document.getElementById('sendButton');
            const typingIndicator = document.getElementById('typingIndicator');
            const adminBtn = document.getElementById('adminBtn');
            const adminPanel = document.getElementById('adminPanel');
            const closeAdmin = document.getElementById('closeAdmin');
            const loginForm = document.getElementById('loginForm');
            const manageForm = document.getElementById('manageForm');
            const adminAlert = document.getElementById('adminAlert');
            
            // ===== إدارة فتح/إغلاق البوت =====
            chatToggle.addEventListener('click', toggleChat);
            closeChat.addEventListener('click', closeChat);
            
            function toggleChat() {
                if (chatbot.classList.contains('active')) {
                    closeChat();
                } else {
                    openChat();
                }
            }
            
            function openChat() {
                chatbot.classList.add('active');
                chatToggle.classList.add('active');
                toggleIcon.className = 'fas fa-times';
                userInput.focus();
            }
            
            function closeChat() {
                chatbot.classList.remove('active');
                chatToggle.classList.remove('active');
                toggleIcon.className = 'fas fa-robot';
            }
            
            // ===== معالجة الأسئلة =====
            sendButton.addEventListener('click', processQuestion);
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    processQuestion();
                }
            });
            
            async function processQuestion() {
                const question = userInput.value.trim();
                if (!question || isProcessing) return;
                
                // إضافة سؤال المستخدم
                addMessage(question, 'user');
                userInput.value = '';
                userInput.disabled = true;
                sendButton.disabled = true;
                isProcessing = true;
                
                // عرض مؤشر الكتابة
                typingIndicator.style.display = 'flex';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                try {
                    // محاكاة معالجة الذكاء الاصطناعي
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    // البحث عن الإجابة
                    const answer = await findAIAnswer(question);
                    
                    // إضافة الإجابة
                    hideTypingIndicator();
                    addMessage(answer, 'bot');
                    
                    // حفظ في السجل
                    chatHistory.push({
                        question: question,
                        answer: answer,
                        timestamp: new Date().toISOString()
                    });
                    
                } catch (error) {
                    console.error('Error:', error);
                    hideTypingIndicator();
                    addMessage('عذراً، حدث خطأ في المعالجة. الرجاء المحاولة مرة أخرى.', 'bot');
                } finally {
                    userInput.disabled = false;
                    sendButton.disabled = false;
                    isProcessing = false;
                    userInput.focus();
                }
            }
            
            // ===== البحث الذكي عن الإجابة =====
            async function findAIAnswer(question) {
                // استخراج الكلمات المفتاحية
                const keywords = extractKeywords(question);
                
                // البحث في المحتوى
                const relevantParts = searchInContent(question, keywords);
                
                if (relevantParts.length > 0) {
                    // دمج أفضل الأجزاء مع نص طبيعي
                    return generateNaturalResponse(relevantParts, question);
                }
                
                // إذا لم يتم العثور على إجابة مباشرة
                return generateFallbackResponse(question);
            }
            
            function extractKeywords(text) {
                const stopWords = ['ما', 'هل', 'كيف', 'متى', 'أين', 'لماذا', 'من', 'هل', 'the', 'is', 'are', 'how', 'what', 'when', 'where', 'why'];
                const words = text.toLowerCase()
                    .replace(/[^\w\\s]/g, '')
                    .split(/\\s+/)
                    .filter(word => word.length > 2 && !stopWords.includes(word));
                return [...new Set(words)];
            }
            
            function searchInContent(question, keywords) {
                const content = BOT_CONFIG.content.toLowerCase();
                const questionLower = question.toLowerCase();
                const results = [];
                
                // البحث عن مطابقات مباشرة
                if (content.includes(questionLower.substring(0, 20))) {
                    const startIndex = content.indexOf(questionLower.substring(0, 20));
                    const relevantText = extractContext(content, startIndex);
                    if (relevantText) results.push(relevantText);
                }
                
                // البحث بالكلمات المفتاحية
                keywords.forEach(keyword => {
                    const regex = new RegExp(\`[^.!?]*\${keyword}[^.!?]*[.!?]\`, 'gi');
                    const matches = content.match(regex);
                    if (matches) {
                        matches.forEach(match => {
                            if (match.length > 20 && match.length < 300) {
                                results.push(match.trim());
                            }
                        });
                    }
                });
                
                // البحث عن أرقام الهواتف والعناوين
                const phoneRegex = /(\\+?\\d[\\d\\s\\-\\(\\)]{8,}\\d)/g;
                const phoneMatches = content.match(phoneRegex);
                if (phoneMatches && (questionLower.includes('هاتف') || questionLower.includes('اتصل') || questionLower.includes('رقم') || questionLower.includes('phone') || questionLower.includes('call'))) {
                    phoneMatches.forEach(phone => results.push(\`رقم الهاتف: \${phone}\`));
                }
                
                const emailRegex = /[\\w\\.-]+@[\\w\\.-]+\\.\\w+/g;
                const emailMatches = content.match(emailRegex);
                if (emailMatches && (questionLower.includes('بريد') || questionLower.includes('إيميل') || questionLower.includes('email') || questionLower.includes('contact'))) {
                    emailMatches.forEach(email => results.push(\`البريد الإلكتروني: \${email}\`));
                }
                
                return [...new Set(results)].slice(0, 5);
            }
            
            function extractContext(text, index) {
                const start = Math.max(0, index - 100);
                const end = Math.min(text.length, index + 200);
                let extracted = text.substring(start, end);
                
                // جعل الجمل كاملة
                const firstPeriod = extracted.indexOf('.', 50);
                const lastPeriod = extracted.lastIndexOf('.');
                
                if (firstPeriod !== -1 && lastPeriod !== -1 && lastPeriod > firstPeriod) {
                    extracted = extracted.substring(firstPeriod + 1, lastPeriod + 1).trim();
                }
                
                return extracted.length > 50 ? extracted : null;
            }
            
            function generateNaturalResponse(parts, question) {
                const responses = [
                    \`بناءً على سؤالك "\${question}"، \${parts[0]}\`,
                    \`\${parts[0]} هذا ما يمكنني إخبارك به عن سؤالك.\`,
                    \`بالنسبة لسؤالك، \${parts[0]}\`,
                    \`وفقاً للمعلومات المتاحة، \${parts[0]}\`
                ];
                
                let response = responses[Math.floor(Math.random() * responses.length)];
                
                // إضافة معلومات إضافية إذا كانت متوفرة
                if (parts.length > 1) {
                    response += \` \\n\\nبالإضافة إلى ذلك، \${parts[1]}\`;
                }
                
                // إضافة خاتمة
                const closings = [
                    'هل تحتاج إلى مزيد من المعلومات؟',
                    'أتمنى أن أكون قد أجبت على سؤالك.',
                    'هل هناك شيء آخر يمكنني مساعدتك به؟'
                ];
                
                response += \` \\n\\n\${closings[Math.floor(Math.random() * closings.length)]}\`;
                
                return response;
            }
            
            function generateFallbackResponse(question) {
                const fallbacks = [
                    \`عذراً، لم أجد معلومات محددة عن "\${question}" في قاعدة معرفتي الحالية. يمكنني مساعدتك في مواضيع أخرى.\`,
                    \`للأسف، لا أملك معلومات كافية للإجابة على سؤالك عن "\${question}". يمكنك التواصل مع الدعم مباشرة.\`,
                    \`سؤالك مهم، لكن المعلومات المتاحة لدي حالياً لا تغطي "\${question}". هل يمكنني مساعدتك في شيء آخر؟\`
                ];
                
                return fallbacks[Math.floor(Math.random() * fallbacks.length)];
            }
            
            // ===== مساعدات الرسائل =====
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = \`message \${sender}-message\`;
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            function hideTypingIndicator() {
                typingIndicator.style.display = 'none';
            }
            
            // ===== إدارة البوت =====
            adminBtn.addEventListener('click', () => {
                adminPanel.classList.add('active');
            });
            
            closeAdmin.addEventListener('click', () => {
                adminPanel.classList.remove('active');
                resetAdminForms();
            });
            
            // النقر خارج نافذة الإدارة للإغلاق
            adminPanel.addEventListener('click', (e) => {
                if (e.target === adminPanel) {
                    adminPanel.classList.remove('active');
                    resetAdminForms();
                }
            });
            
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // التحقق من بيانات تسجيل الدخول
                if (await verifyAdminCredentials(email, password)) {
                    isAdminLoggedIn = true;
                    loginForm.style.display = 'none';
                    manageForm.style.display = 'flex';
                    showAlert('تم تسجيل الدخول بنجاح! يمكنك الآن إدارة البوت.', 'success');
                } else {
                    showAlert('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 'error');
                }
            });
            
            // ===== الوظائف المساعدة =====
            async function verifyAdminCredentials(email, password) {
                // في الواقع، ستتحقق من الخادم
                // هنا محاكاة باستخدام localStorage
                try {
                    const storedHash = localStorage.getItem(\`bot_auth_\${BOT_ID}\`);
                    if (storedHash) {
                        const expectedHash = btoa(email + ':' + password + '_salt');
                        return storedHash === expectedHash;
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                }
                return false;
            }
            
            function showAlert(message, type) {
                adminAlert.textContent = message;
                adminAlert.className = \`alert alert-\${type}\`;
                adminAlert.style.display = 'block';
                
                setTimeout(() => {
                    adminAlert.style.display = 'none';
                }, 5000);
            }
            
            function resetAdminForms() {
                loginForm.reset();
                manageForm.reset();
                loginForm.style.display = 'flex';
                manageForm.style.display = 'none';
                isAdminLoggedIn = false;
                adminAlert.style.display = 'none';
            }
            
            // ===== الوظائف العامة للنافذة =====
            window.addNewInfo = async function() {
                const newInfo = document.getElementById('newInfo').value.trim();
                const newWebsite = document.getElementById('newWebsite').value.trim();
                
                if (!newInfo && !newWebsite) {
                    showAlert('الرجاء إدخال معلومات جديدة أو رابط موقع.', 'error');
                    return;
                }
                
                // محاكاة إضافة المعلومات
                showAlert('جاري تحديث معلومات البوت...', 'success');
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                if (newInfo) {
                    BOT_CONFIG.content += '\\n\\n' + newInfo;
                    showAlert('تمت إضافة المعلومات الجديدة بنجاح!', 'success');
                }
                
                if (newWebsite) {
                    showAlert(\`سيتم ربط الموقع \${newWebsite} في النسخة الكاملة.\`, 'success');
                }
                
                document.getElementById('newInfo').value = '';
                document.getElementById('newWebsite').value = '';
            };
            
            window.resetBot = function() {
                if (confirm('هل أنت متأكد من إعادة تعيين البوت؟ سيتم حذف جميع الإضافات.')) {
                    BOT_CONFIG.content = \`${botData.content.substring(0, 30000)}\`;
                    showAlert('تمت إعادة تعيين البوت إلى الإعدادات الأصلية.', 'success');
                }
            };
            
            // ===== تهيئة أولية =====
            // إخفاء زر الإدارة للمستخدمين العاديين
            adminBtn.style.display = 'none';
            
        });
    </script>
</body>
</html>`;
}

// ================================
// عرض قسم التحميل
// ================================

function showDownloadSection() {
    const botContent = generateAIChatBot();
    const blob = new Blob([botContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const fileName = `ai-chatbot-${Date.now()}.html`;
    
    const html = `
        <section class="py-16 bg-gradient-to-b from-white to-green-50">
            <div class="container mx-auto px-4">
                <div class="text-center bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
                    <div class="text-green-600 text-6xl mb-6">🚀</div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-4">تهانينا! بوتك جاهز 🎉</h3>
                    <p class="text-gray-600 text-lg mb-8">
                        تم إنشاء بوتك الذكي بنجاح. يمكنك الآن تحميله ورفعه على موقعك.
                    </p>
                    
                    <div class="space-y-6">
                        <!-- معلومات البوت -->
                        <div class="bg-blue-50 p-6 rounded-xl">
                            <h4 class="font-bold text-xl mb-4 text-blue-800">معلومات بوتك:</h4>
                            <div class="space-y-3 text-right">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">اسم البوت:</span>
                                    <span class="font-bold">${botData.botName}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">مصدر المعلومات:</span>
                                    <span class="font-bold">${botData.sourceType === 'file' ? 'ملف مرفوع' : 'موقع ويب'}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">البريد الإداري:</span>
                                    <span class="font-bold">${botData.adminEmail}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- زر التحميل -->
                        <div class="text-center">
                            <a href="${url}" download="${fileName}" 
                               class="btn-primary text-xl px-12 py-4 inline-block">
                                <i class="fas fa-download ml-2"></i> تحميل ملف البوت
                            </a>
                            <p class="text-gray-500 text-sm mt-3">
                                حجم الملف: ${(botContent.length / 1024).toFixed(1)} كيلوبايت
                            </p>
                        </div>
                        
                        <!-- التعليمات -->
                        <div class="bg-yellow-50 p-6 rounded-xl">
                            <h4 class="font-bold text-xl mb-4 text-yellow-800">كيفية الاستخدام:</h4>
                            <ol class="space-y-3 text-gray-700 text-right pr-6">
                                <li><strong>1.</strong> حمّل ملف <code class="bg-gray-200 px-2 py-1 rounded">${fileName}</code></li>
                                <li><strong>2.</strong> ارفعه على استضافة موقعك في المجلد الرئيسي</li>
                                <li><strong>3.</strong> أضف هذا السطر في نهاية صفحات موقعك:<br>
                                    <code class="bg-gray-800 text-white p-3 rounded block text-sm mt-2 text-left overflow-x-auto">
                                        &lt;script src="/${fileName}" defer&gt;&lt;/script&gt;
                                    </code>
                                </li>
                                <li><strong>4.</strong> سيظهر زر البوت في الزاوية اليسرى السفلية</li>
                                <li><strong>5.</strong> لإدارة البوت، اضغط على زر الإعدادات ⚙️ داخل البوت</li>
                            </ol>
                        </div>
                        
                        <!-- ملاحظات مهمة -->
                        <div class="bg-green-50 p-6 rounded-xl">
                            <h4 class="font-bold text-xl mb-4 text-green-800">ملاحظات مهمة:</h4>
                            <ul class="space-y-2 text-right text-gray-700">
                                <li class="flex items-center">
                                    <i class="fas fa-check text-green-500 ml-2"></i>
                                    البوت يعمل <strong>بدون إنترنت</strong> بعد التحميل
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-green-500 ml-2"></i>
                                    يمكن إضافة معلومات جديدة عبر <strong>واجهة الإدارة</strong>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-green-500 ml-2"></i>
                                    <strong>لا يوجد</strong> رسوم شهرية أو اشتراكات
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-green-500 ml-2"></i>
                                    يدعم <strong>العربية والإنجليزية</strong> تلقائياً
                                </li>
                            </ul>
                        </div>
                        
                        <!-- إنشاء بوت جديد -->
                        <div class="text-center pt-6 border-t">
                            <button onclick="location.reload()" class="btn-secondary px-8 py-3">
                                <i class="fas fa-plus ml-2"></i> أنشئ بوتاً جديداً
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    document.getElementById('downloadSection').innerHTML = html;
    document.getElementById('downloadSection').classList.remove('hidden');
    document.getElementById('downloadSection').scrollIntoView({ behavior: 'smooth' });
    
    // إخفاء الأقسام الأخرى
    document.getElementById('builder').classList.add('hidden');
    document.getElementById('accountSection').classList.add('hidden');
}

// ================================
// دوال مساعدة
// ================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================
// تهيئة النظام
// ================================

document.addEventListener('DOMContentLoaded', function() {
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
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .animate-pulse {
            animation: pulse 2s infinite;
        }
        
        .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            display: inline-block;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .dragover {
            border-color: #667eea !important;
            background-color: #f0f4ff !important;
        }
    `;
    document.head.appendChild(style);
});
