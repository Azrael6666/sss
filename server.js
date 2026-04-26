const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
    
    * { box-sizing: border-box; scroll-behavior: smooth; }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0b0b; }
    ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }

    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
        background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }

    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    
    .logo { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; }
    .logo img { height: 55px; width: 55px; border-radius: 50%; border: 1px solid rgba(212, 175, 55, 0.4); object-fit: cover; }

    .content-area { padding: 40px 8%; text-align: center; }
    
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }

    .cards-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px; }

    .rule-card {
        background: rgba(22, 18, 15, 0.9); border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 15px; padding: 25px; text-align: right; width: 380px;
        cursor: pointer; transition: 0.3s; display: flex; align-items: center; 
    }
    .rule-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2); border-color: #d4af37; }
    .icon-box { width: 55px; height: 55px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; color: #fff; margin-left: 20px; flex-shrink: 0; }

    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; transition: 0.3s; }
    .close-btn:hover { color: #d4af37; }
    
    .modal-content h2 { color: #d4af37; font-size: 32px; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 25px; }
    .modal-content h3 { color: #d4af37; margin-top: 35px; border-right: 4px solid #d4af37; padding-right: 15px; background: rgba(212, 175, 55, 0.05); padding: 10px 15px;}
    
    .rules-list { list-style: none; padding: 0; margin: 20px 0; }
    .rules-list li { background: rgba(255,255,255,0.02); margin: 10px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.7; color: #ddd; }

    .highlight-box { background: rgba(212,175,55,0.1); padding: 20px; border-right: 5px solid #d4af37; border-radius: 8px; margin-bottom: 25px; font-size: 17px; line-height: 1.8; }
    .note-box { color: #ffab00; background: rgba(255, 171, 0, 0.1); padding: 20px; border-radius: 10px; font-size: 15px; margin-top: 20px; border: 1px dashed #ffab00; line-height: 1.8; }
    .danger-box { color: #ff4c4c; background: rgba(255, 76, 76, 0.1); padding: 20px; border-radius: 10px; font-size: 15px; margin-top: 20px; border: 1px dashed #ff4c4c; line-height: 1.8; }

    .grid-rules { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-top: 20px; }
    .grid-item { background: rgba(212,175,55,0.1); padding: 18px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.3); text-align: center; font-weight: bold; transition: 0.3s; }
    .grid-item i { font-size: 24px; color: #d4af37; margin-bottom: 10px; }

    footer { padding: 30px; text-align: center; color: #555; border-top: 1px solid #222; margin-top: 50px; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${STYLES}
    <script>
        function openModal(id) { document.getElementById(id).style.display = "block"; document.body.style.overflow = "hidden"; }
        function closeModal(id) { document.getElementById(id).style.display = "none"; document.body.style.overflow = "auto"; }
        window.onclick = function(event) { if (event.target.className === 'modal') closeModal(event.target.id); }
    </script>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">
            <img src="https://cdn.discordapp.com/attachments/1478519443968753695/1478522144328781986/727d7d25559b45a4.gif?ex=69ef3ccc&is=69edeb4c&hm=1f04178069920aa5617e35ad853d0cbab96678aa19e14111f2dfd2201f4247ac&" alt="Spark Logo">
            <span>مقاطعة سبارك</span>
        </a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/rules">القوانين</a>
            <a href="/creators">صناع المحتوى</a>
            <a href="/jobs">الوظائف</a>
            <a href="/store">المتجر</a>
        </div>
    </nav>
    <div class="content-area">${content}</div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

// الرئيسية
app.get('/', (req, res) => {
    res.send(layout(`
        <section style="height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 style="font-size: 60px; color: #d4af37; font-weight: 900;">مقاطعة سبارك</h1>
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا</p>
            <div>
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> دخول السيرفر</a>
            </div>
        </section>

        <div style="background: rgba(20,20,20,0.8); padding: 40px; border-radius: 15px; max-width: 900px; margin: 40px auto; border: 1px solid rgba(212,175,55,0.2);">
            <h2 style="color: #d4af37;">عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </div>
    `));
});

// القوانين
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 10px;">دستور وقوانين مقاطعة سبارك</h1>
        <p style="color: #aaa; margin-bottom: 40px;">ملاحظة: هذه القوانين قابلة للتحديث والزيادة في اي وقت والجهل بالقوانين لا يعفيك من العقوبة.</p>
        
        <div class="cards-container">
            <div class="rule-card" onclick="openModal('general-modal')">
                <div class="icon-box" style="background-color: #4CAF50;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div><h3 style="margin: 0; color: #fff;">القوانين العامة</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">قوانين اللعب والقيادة</p></div>
            </div>

            <div class="rule-card" onclick="openModal('safezones-modal')">
                <div class="icon-box" style="background-color: #009688;"><i class="fa-solid fa-shield-heart"></i></div>
                <div><h3 style="margin: 0; color: #fff;">المناطق الآمنة</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الأماكن المحمية في المقاطعة</p></div>
            </div>

            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div><h3 style="margin: 0; color: #fff;">قوانين الإجرام</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الرهائن والاعتداءات</p></div>
            </div>

            <div class="rule-card" onclick="openModal('robbery-modal')">
                <div class="icon-box" style="background-color: #ff9800;"><i class="fa-solid fa-sack-dollar"></i></div>
                <div><h3 style="margin: 0; color: #fff;">أعداد السرقات</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الأعداد المسموحة للبنوك</p></div>
            </div>

            <div class="rule-card" onclick="openModal('police-modal')">
                <div class="icon-box" style="background-color: #2196F3;"><i class="fa-solid fa-building-shield"></i></div>
                <div><h3 style="margin: 0; color: #fff;">الأمن العام</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الصلاحيات والمطاردات</p></div>
            </div>

            <div class="rule-card" onclick="openModal('border-modal')">
                <div class="icon-box" style="background-color: #00bcd4;"><i class="fa-solid fa-ship"></i></div>
                <div><h3 style="margin: 0; color: #fff;">حرس الحدود</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">قوانين الميناء</p></div>
            </div>

            <div class="rule-card" onclick="openModal('smuggling-modal')">
                <div class="icon-box" style="background-color: #9c27b0;"><i class="fa-solid fa-box-open"></i></div>
                <div><h3 style="margin: 0; color: #fff;">التهريب</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الهروب والاشتباك</p></div>
            </div>

            <div class="rule-card" onclick="openModal('mechanic-modal')">
                <div class="icon-box" style="background-color: #ff5722;"><i class="fa-solid fa-wrench"></i></div>
                <div><h3 style="margin: 0; color: #fff;">الميكانيك</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">كراج التزويد والعمل</p></div>
            </div>
        </div>

        <div id="safezones-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('safezones-modal')">&times;</span>
                <h2>خريطة المناطق الآمنة (Safe Zones)</h2>
                <div class="highlight-box">يمنع منعاً باتاً القيام بأي عمل إجرامي، إطلاق نار، خطف، أو تهديد داخل هذه النطاقات.</div>
                <div class="grid-rules">
                    <div class="grid-item"><i class="fa-solid fa-hospital"></i><br>المستشفيات</div>
                    <div class="grid-item"><i class="fa-solid fa-shield-halved"></i><br>مراكز الشرطة</div>
                    <div class="grid-item"><i class="fa-solid fa-building-user"></i><br>أمن المنشآت</div>
                    <div class="grid-item"><i class="fa-solid fa-car"></i><br>معرض المركبات</div>
                    <div class="grid-item"><i class="fa-solid fa-truck"></i><br>معرض الشاحنات</div>
                    <div class="grid-item"><i class="fa-solid fa-id-card"></i><br>مركز التوظيف</div>
                    <div class="grid-item"><i class="fa-solid fa-file-contract"></i><br>أماكن استخراج الرخص</div>
                    <div class="grid-item"><i class="fa-solid fa-warehouse"></i><br>حجز المركبات</div>
                    <div class="grid-item"><i class="fa-solid fa-tree"></i><br>مناطق الأخشاب</div>
                    <div class="grid-item"><i class="fa-solid fa-egg"></i><br>مناطق الدواجن</div>
                    <div class="grid-item"><i class="fa-solid fa-seedling"></i><br>مناطق الأعناب</div>
                </div>
            </div>
        </div>

        <div id="general-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('general-modal')">&times;</span>
                <h2>القوانين العامة</h2>
                <div class="danger-box">VDM: يمنع الدهس المتعمد | RDM: يمنع القتل بدون سبب إجرامي واضح</div>
                <ul class="rules-list">
                    <li>1. اسم الهوية يجب أن يكون واقعياً (أول وثاني) وباللغة العربية أو الانجليزية.</li>
                    <li>2. يمنع طلب المطاردة أو الترصد للعساكر بدون سبب مقنع.</li>
                    <li>3. التواصل داخل المنطقة عبر موجة الراديو فقط، ويمنع استخدام الديسكورد للتواصل أثناء اللعب (MetaGaming).</li>
                    <li>4. يمنع السب والقذف والشتم بجميع أنواعه (أووك أو إن كاركتر).</li>
                    <li>5. يمنع الراديو في حال تقييد اليدين أو الغوص تحت الماء.</li>
                    <li>6. يمنع سرقة مركبات الوظائف المعتمدة (إسعاف، شرطة، ميكانيك).</li>
                    <li>7. الالتزام بالتمثيل الواقعي والاحترافي شرط أساسي للاستمرار في المقاطعة.</li>
                    <li>8. يمنع إطلاق النار بوجود الهلال الأحمر في الموقع.</li>
                </ul>
            </div>
        </div>

        <div id="crime-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('crime-modal')">&times;</span>
                <h2>دستور الإجرام</h2>
                <ul class="rules-list">
                    <li>القاعدة 1: تمثيل الحياة الواقعية سواء كنت مجرمًا أو رهينة (قيمة حياتك أهم شيء).</li>
                    <li>القاعدة 2: يمنع الاتفاق المسبق مع الرهينة (رهينة صديق).</li>
                    <li>القاعدة 3: يمنع طلب عسكري أو مسعف عبر الجهاز بغرض الخطف.</li>
                    <li>القاعدة 4: يمنع المتاجرة بالممنوعات أو النصب داخل المناطق الآمنة.</li>
                    <li>القاعدة 5: يمنع مقاومة السلاح الناري بسلاح أبيض إذا كان موجهاً إليك.</li>
                    <li>القاعدة 6: يمنع تقليد ملابس الأمن أو استخدام رتبهم العسكرية.</li>
                </ul>
            </div>
        </div>

        <div id="robbery-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('robbery-modal')">&times;</span>
                <h2>توزيع أعداد السرقات</h2>
                <div class="grid-rules">
                    <div class="grid-item"><i class="fa-solid fa-building-columns"></i><br>البنك المركزي<br>4-6 مجرمين | 10 أمن</div>
                    <div class="grid-item"><i class="fa-solid fa-vault"></i><br>بنك ميز<br>2-4 مجرمين | 7 أمن</div>
                    <div class="grid-item"><i class="fa-solid fa-shop"></i><br>المتاجر<br>1-3 مجرمين | 4 أمن</div>
                    <div class="grid-item"><i class="fa-solid fa-gem"></i><br>المجوهرات<br>2-4 مجرمين | 6 أمن</div>
                    <div class="grid-item"><i class="fa-solid fa-box"></i><br>شحنة الأسلحة<br>3-5 مجرمين | 8 أمن</div>
                </div>
            </div>
        </div>

        <div id="police-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('police-modal')">&times;</span>
                <h2>لوائح الأمن العام</h2>
                <ul class="rules-list">
                    <li>1. يحق للأمن تفتيش أي شخص مشتبه به في المناطق المشبوهة.</li>
                    <li>2. يمنع استخدام القوة المميتة إلا في حال تعرض حياة العسكري أو المواطن للخطر.</li>
                    <li>3. الالتزام بالرتب العسكرية والتعليمات الصادرة من القيادة.</li>
                    <li>4. يمنع التخريب على الزملاء أو تسريب معلومات العمل.</li>
                </ul>
            </div>
        </div>

        <div id="border-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('border-modal')">&times;</span>
                <h2>قوانين حرس الحدود</h2>
                <ul class="rules-list">
                    <li>1. منطقة الميناء منطقة عسكرية تخضع لتفتيش دقيق.</li>
                    <li>2. يمنع دخول القوارب غير المصرح لها لنطاق الحجز.</li>
                    <li>3. التعامل مع المهربين يكون بحزم وفق لوائح الاشتباك.</li>
                </ul>
            </div>
        </div>

        <div id="smuggling-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('smuggling-modal')">&times;</span>
                <h2>قوانين التهريب</h2>
                <ul class="rules-list">
                    <li>1. يمنع الهروب سباحة لمسافات طويلة، يجب استخدام قارب.</li>
                    <li>2. يمنع استخدام سيارات "سوبر" داخل طرق الميناء الوعرة.</li>
                    <li>3. الاشتباك يبدأ بعد التحذير الرسمي من قبل الأمن.</li>
                </ul>
            </div>
        </div>

        <div id="mechanic-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('mechanic-modal')">&times;</span>
                <h2>لوائح الميكانيك</h2>
                <ul class="rules-list">
                    <li>1. أوقات العمل الرسمية لكراج التزويد من 9 صباحاً حتى 10 مساءً.</li>
                    <li>2. يمنع القيام بأعمال إجرامية أثناء ارتداء لبس الوظيفة.</li>
                    <li>3. يمنع تزويد سيارات الأمن أو الإسعاف خارج النطاق المخصص.</li>
                </ul>
            </div>
        </div>
    `));
});

// صناع المحتوى
app.get('/creators', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 40px;">صناع المحتوى</h1>
        <div class="rule-card" onclick="openModal('creators-modal')" style="margin: auto;">
            <div class="icon-box" style="background-color: #e91e63;"><i class="fa-solid fa-video"></i></div>
            <div><h3>قوانين البث وصناعة المحتوى</h3><p>الامتيازات والضوابط</p></div>
        </div>
        <div id="creators-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creators-modal')">&times;</span>
                <h2>قوانين صناع المحتوى</h2>
                <ul class="rules-list">
                    <li>1. يجب كتابة (مقاطعة سبارك) في عنوان البث بوضوح.</li>
                    <li>2. يمنع منعاً باتاً الإساءة للإدارة أو انتقاد القوانين أثناء البث (يوجد تذكرة للشكاوى).</li>
                    <li>3. يمنع استغلال الـ "كاميرا" لكشف أماكن اللاعبين أو الهروب من السيناريو.</li>
                    <li>4. الالتزام بالأدب العام وعدم التلفظ بكلمات غير لائقة أمام المشاهدين.</li>
                </ul>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p style="font-size:20px;">قريباً سيتم فتح باب التقديم للوظائف الحكومية والخاصة.</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p style="font-size:20px;">المتجر قيد التجهيز حالياً لتوفير أفضل العروض.</p>`)));

app.listen(3000, () => console.log('Spark District Web is running on port 3000'));
