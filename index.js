const express = require('express');
const app = express();

// هنا وضعنا كل التصاميم (الألوان والخطوط) التي استخدمتها أنت
const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
    * { box-sizing: border-box; scroll-behavior: smooth; }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0b0b; }
    ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }

    body { 
        margin: 0; padding: 0;
        font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
        background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }

    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.95); backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    
    .logo { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; }
    .logo img { height: 55px; width: 55px; border-radius: 50%; border: 1px solid rgba(212, 175, 55, 0.4); object-fit: cover; }

    .content-area { padding: 40px 8%; text-align: center; }
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; border: none; }
    .btn-discord { background: #5865F2; color: #fff; }
    .btn-cfx-main { background: #d4af37; color: #000; }
    
    .cards-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px; }
    .rule-card { background: rgba(22, 18, 15, 0.9); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 15px; padding: 25px; text-align: right; width: 380px; cursor: pointer; transition: 0.3s; display: flex; align-items: center; }
    .rule-card:hover { transform: translateY(-8px); border-color: #d4af37; }
    .icon-box { width: 55px; height: 55px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; color: #fff; margin-left: 20px; flex-shrink: 0; }

    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; }
    
    .rules-list { list-style: none; padding: 0; margin: 20px 0; }
    .rules-list li { background: rgba(255,255,255,0.02); margin: 10px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.7; color: #ddd; }
    .note-box { color: #ffab00; background: rgba(255, 171, 0, 0.1); padding: 15px; border-radius: 8px; border: 1px dashed #ffab00; margin-bottom: 20px; }
    .danger-box { color: #ff4c4c; background: rgba(255, 76, 76, 0.1); padding: 20px; border-radius: 10px; font-size: 15px; margin-top: 20px; border: 1px dashed #ff4c4c; line-height: 1.8; }
    .highlight-box { background: rgba(212,175,55,0.1); padding: 20px; border-right: 5px solid #d4af37; border-radius: 8px; margin-bottom: 25px; font-size: 17px; line-height: 1.8; }

    footer { padding: 30px; text-align: center; color: #555; border-top: 1px solid #222; margin-top: 50px; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك | Spark District</title>
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
            <img src="https://cdn.discordapp.com/attachments/1478519443968753695/1478522144328781986/727d7d25559b45a4.gif" alt="Spark Logo">
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

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send(layout(`
        <section style="height: 45vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 style="font-size: 60px; color: #d4af37; font-weight: 900; margin: 0;">مقاطعة سبارك</h1>
            <p style="font-size: 22px; color: #ccc;">عالمك الجديد من الواقعية والاحترافية</p>
            <div style="margin-top: 25px;">
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> دخول السيرفر</a>
            </div>
        </section>
    `));
});

// صفحة القوانين (جامعة لكل الأقسام التي كتبتها)
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 40px; color: #d4af37; margin-bottom: 40px;">دستور وقوانين مقاطعة سبارك</h1>
        <div class="cards-container">
            <div class="rule-card" onclick="openModal('safe-modal')">
                <div class="icon-box" style="background-color: #009688;"><i class="fa-solid fa-shield-heart"></i></div>
                <div><h3>المناطق الآمنة</h3><p>الأماكن المحمية وقوانينها</p></div>
            </div>
            <div class="rule-card" onclick="openModal('smuggling-modal')">
                <div class="icon-box" style="background-color: #9c27b0;"><i class="fa-solid fa-box-open"></i></div>
                <div><h3>قوانين التهريب</h3><p>قواعد الموانئ والاشتباكات</p></div>
            </div>
            <div class="rule-card" onclick="openModal('general-modal')">
                <div class="icon-box" style="background-color: #4CAF50;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div><h3>القوانين العامة</h3><p>أساسيات اللعب والقيادة</p></div>
            </div>
            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div><h3>قوانين الإجرام</h3><p>الرهائن والاعتداءات</p></div>
            </div>
            <div class="rule-card" onclick="openModal('robbery-modal')">
                <div class="icon-box" style="background-color: #ff9800;"><i class="fa-solid fa-sack-dollar"></i></div>
                <div><h3>أعداد السرقات</h3><p>الأعداد المسموحة للبنوك</p></div>
            </div>
        </div>

        <div id="safe-modal" class="modal">
            <div class="modal-content"><span class="close-btn" onclick="closeModal('safe-modal')">&times;</span><h2 style="color:#009688;">🛡️ المناطق الآمنة</h2><ul class="rules-list"><li>1. المستشفيات ومراكز الشرطة ومراكز أمن المنشآت.</li><li>2. معرض المركبات والشاحنات وكراجات الحجز.</li><li>3. مركز التوظيف وأماكن استخراج الرخص.</li><li>4. مناطق العمل (الأخشاب، الدواجن.. إلخ).</li></ul></div>
        </div>
        <div id="smuggling-modal" class="modal">
            <div class="modal-content"><span class="close-btn" onclick="closeModal('smuggling-modal')">&times;</span><h2 style="color:#9c27b0;">📦 قوانين التهريب</h2><div class="note-box">الميناء يفتح من 7:00 ص إلى 7:00 م.</div><ul class="rules-list"><li>- الهروب يكون بالقارب فقط.</li><li>- يمنع الدخول بمركبات "سوبر" للميناء.</li></ul></div>
        </div>
        <div id="general-modal" class="modal">
            <div class="modal-content"><span class="close-btn" onclick="closeModal('general-modal')">&times;</span><h2>⚖️ القوانين العامة</h2><ul class="rules-list"><li>- يمنع الـ VDM والـ RDM نهائياً.</li><li>- يمنع سرقة مركبات الوظائف الحكومية.</li></ul></div>
        </div>
        <div id="crime-modal" class="modal">
            <div class="modal-content"><span class="close-btn" onclick="closeModal('crime-modal')">&times;</span><h2>قوانين الإجرام</h2><ul class="rules-list"><li>- يمنع الاتفاق مع أي شخص ليصبح رهينة.</li><li>- يمنع خطف العساكر أو المسعفين دون سبب واضح.</li></ul></div>
        </div>
        <div id="robbery-modal" class="modal">
            <div class="modal-content"><span class="close-btn" onclick="closeModal('robbery-modal')">&times;</span><h2>أعداد السرقات المسموحة</h2><div class="highlight-box">البنك المركزي: المجرمين 4-6 | الأمن الأقصى 10</div><div class="highlight-box">المتاجر: المجرمين 1-3 | الأمن الأقصى 4</div></div>
        </div>
    `));
});

// صفحة صناع المحتوى
app.get('/creators', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 40px;">صناع المحتوى</h1>
        <div class="rule-card" onclick="openModal('creators-modal')" style="width: 450px; margin: auto;">
            <div class="icon-box" style="background-color: #e91e63;"><i class="fa-solid fa-video"></i></div>
            <div><h3>شروط صناع المحتوى</h3><p>الامتيازات والضوابط</p></div>
        </div>
        <div id="creators-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creators-modal')">&times;</span>
                <h2>شروط صانع المحتوى</h2>
                <ul class="rules-list">
                    <li>- وضع اسم (مقاطعة سبارك) في عنوان البث.</li>
                    <li>- يمنع الكلام المسيء للإدارة أو السيرفر.</li>
                    <li>- الإعفاء من العمليات الحكومية وقت التصوير فقط.</li>
                </ul>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p>قريباً...</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p>قريباً...</p>`)));

// السطر الأهم لتشغيل الكود على Vercel
module.exports = app;
