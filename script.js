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
            border: 1px solid #e
