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
    
    /* أزرار */
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; border: none; }
    .btn-discord { background: #5865F2; color: #fff; }
    .btn-cfx-main { background: #d4af37; color: #000; }
    .btn-outline-gold { border: 1px solid #d4af37; color: #d4af37; padding: 12px 45px; border-radius: 30px; text-decoration: none; font-size: 16px; transition: 0.3s; display: inline-block; margin-top: 30px; font-weight: bold; }
    .btn-outline-gold:hover { background: #d4af37; color: #000; }

    /* قسم تجربتنا الفريدة */
    .experience-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin: 50px 0; }
    .exp-card { background: rgba(25, 20, 15, 0.75); border: 1px solid rgba(212, 175, 55, 0.2); padding: 40px 20px; border-radius: 12px; transition: 0.3s; }
    .exp-card:hover { border-color: #d4af37; transform: translateY(-5px); }
    .exp-card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; }

    /* كروت القوانين */
    .cards-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px; }
    .rule-card {
        background: rgba(22, 18, 15, 0.9); border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 15px; padding: 25px; text-align: right; width: 380px;
        cursor: pointer; transition: 0.3s; display: flex; align-items: center; 
    }
    .rule-card:hover { transform: translateY(-8px); border-color: #d4af37; }
    .icon-box { width: 55px; height: 55px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; color: #fff; margin-left: 20px; flex-shrink: 0; }

    /* المودلز */
    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; }
    
    .rules-list { list-style: none; padding: 0; margin: 20px 0; }
    .rules-list li { background: rgba(255,255,255,0.02); margin: 10px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.7; color: #ddd; }
    .note-box { color: #ffab00; background: rgba(255, 171, 0, 0.1); padding: 15px; border-radius: 8px; border: 1px dashed #ffab00; margin-bottom: 20px; }

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

        <div style="max-width: 1200px; margin: 40px auto;">
            <h2 style="font-size: 35px; font-weight: 900; color: #d4af37;">تجربتنا الفريدة</h2>
            <div class="experience-grid">
                <div class="exp-card"><i class="fa-solid fa-tower-broadcast"></i><h3>تجربة واقعية</h3><p>رول بلاي احترافي بأعلى المعايير.</p></div>
                <div class="exp-card"><i class="fa-solid fa-briefcase"></i><h3>وظائف متنوعة</h3><p>خيارات مهنية واسعة لكل اللاعبين.</p></div>
                <div class="exp-card"><i class="fa-solid fa-shield-halved"></i><h3>نظام أمني</h3><p>بيئة لعب عادلة ومنظمة بقوانين صارمة.</p></div>
                <div class="exp-card"><i class="fa-solid fa-users"></i><h3>مجتمع نشط</h3><p>انضم لمجتمع عربي متفاعل وراقي.</p></div>
            </div>
            <a href="/rules" class="btn-outline-gold">اطلع على القوانين</a>
        </div>
    `));
});

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
        </div>

        <div id="safe-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('safe-modal')">&times;</span>
                <h2 style="color:#009688;">🛡️ المناطق الآمنة (Safe Zones)</h2>
                <div class="note-box">هي مناطق يمنع فيها أي عمل إجرامي (خطف، قتل، إطلاق نار) نهائياً.</div>
                <ul class="rules-list">
                    <li>1. المستشفيات ومراكز الشرطة ومراكز أمن المنشآت. [cite: 297]</li>
                    <li>2. معرض المركبات والشاحنات وكراجات الحجز. [cite: 298, 300]</li>
                    <li>3. مركز التوظيف وأماكن استخراج الرخص. [cite: 299]</li>
                    <li>4. مناطق العمل (الأخشاب، الدواجن، الأعناب.. إلخ). [cite: 301]</li>
                    <li>5. يمنع المتاجرة بالممنوعات أو النصب والاحتيال داخل هذه المناطق. [cite: 318]</li>
                </ul>
            </div>
        </div>

        <div id="smuggling-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('smuggling-modal')">&times;</span>
                <h2 style="color:#9c27b0;">📦 قوانين التهريب (Smuggling)</h2>
                <div class="note-box">اوقات فتح واقفال الميناء من الساعة 7:00 صباحا الى الساعة 7:00 مساء. [cite: 350]</div>
                <ul class="rules-list">
                    <li>- يمنع الهروب سباحة؛ الهروب يكون بالقارب فقط. [cite: 355]</li>
                    <li>- في حال وجود 3 مهربين أو أكثر، يمنع على الأمن المواجهة إذا كان عددهم أقل من 3. [cite: 358]</li>
                    <li>- يمنع الدخول بمركبات "سوبر" أو "سبورت" أو "دباب" أو طائرات للميناء البحري. [cite: 359]</li>
                    <li>- يمنع استخدام الأسلحة من القارب ضد أشخاص على رصيف الميناء. [cite: 356]</li>
                    <li>- يمنع دخول الميناء بهدف القتال فقط دون وجود ممنوعات. [cite: 321, 359]</li>
                </ul>
            </div>
        </div>

        <div id="general-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('general-modal')">&times;</span>
                <h2>⚖️ القوانين العامة</h2>
                <ul class="rules-list">
                    <li>- يمنع الـ VDM والـ RDM (الدهس والقتل العشوائي). [cite: 274]</li>
                    <li>- يمنع التواصل "خارج النطاق" (يجب استخدام الراديو). [cite: 275]</li>
                    <li>- يمنع سرقة مركبات الوظائف الحكومية المعتمدة. [cite: 279]</li>
                    <li>- الالتزام التام بالتمثيل الواقعي وعدم الخروج عن الشخصية. [cite: 281]</li>
                </ul>
            </div>
        </div>
    `));
});

// صفحات فرعية
app.get('/creators', (req, res) => res.send(layout(`<h1>صناع المحتوى</h1><p>سيتم عرض الشروط هنا قريباً...</p>`)));
app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p>التقديم متاح عبر الديسكورد.</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p>قريباً...</p>`)));

app.listen(3000, () => console.log('Spark Web Running on port 3000'));const express = require('express');
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
        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.95)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }

    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.9); backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    
    .logo { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; }
    .logo img { height: 55px; width: 55px; border-radius: 50%; border: 1px solid rgba(212, 175, 55, 0.4); object-fit: cover; }

    .content-area { padding: 40px 8%; text-align: center; }
    
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; border: none; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }

    .cards-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px; }

    .rule-card {
        background: rgba(22, 18, 15, 0.9); border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 15px; padding: 30px; text-align: right; width: 400px;
        cursor: pointer; transition: 0.3s; display: flex; align-items: center; 
    }
    .rule-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2); border-color: #d4af37; }
    .icon-box { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #fff; margin-left: 20px; flex-shrink: 0; }

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

        <h2 style="margin-top: 60px;">تجربتنا الفريدة</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0;">
            <div style="background: rgba(25,25,25,0.85); padding: 35px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05);">
                <i class="fa-solid fa-briefcase" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div style="background: rgba(25,25,25,0.85); padding: 35px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05);">
                <i class="fa-solid fa-shield-halved" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>نظام العساكر المتطور</h3>
                <p>لدينا نظام عسكري متطور من المركبات والمراكز الحكومية والملابس الحصرية.</p>
            </div>
            <div style="background: rgba(25,25,25,0.85); padding: 35px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05);">
                <i class="fa-solid fa-users" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>مجتمع نشط</h3>
                <p>انضم إلى مجتمع عربي متفاعل ومتواجد مع طاقم إدارة متفاعل.</p>
            </div>
        </div>

        <div style="margin-top: 50px;">
            <a href="/rules" class="btn-main btn-cfx-main" style="width: 300px; background: transparent; color: #d4af37;">
                <i class="fa-solid fa-book-open"></i> الانتقال إلى القوانين
            </a>
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

            <div class="rule-card" onclick="openModal('safe-modal')">
                <div class="icon-box" style="background-color: #009688;"><i class="fa-solid fa-shield-heart"></i></div>
                <div><h3 style="margin: 0; color: #fff;">المناطق الآمنة</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">المناطق الممنوع فيها القتال</p></div>
            </div>

            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div><h3 style="margin: 0; color: #fff;">قوانين الإجرام</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الرهائن، السرقات، والاعتداءات</p></div>
            </div>

            <div class="rule-card" onclick="openModal('robbery-modal')">
                <div class="icon-box" style="background-color: #ff9800;"><i class="fa-solid fa-sack-dollar"></i></div>
                <div><h3 style="margin: 0; color: #fff;">أعداد السرقات</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الأعداد المسموحة للبنوك</p></div>
            </div>

            <div class="rule-card" onclick="openModal('police-modal')">
                <div class="icon-box" style="background-color: #2196F3;"><i class="fa-solid fa-building-shield"></i></div>
                <div><h3 style="margin: 0; color: #fff;">قوانين الأمن العام</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الصلاحيات والمطاردات</p></div>
            </div>

            <div class="rule-card" onclick="openModal('smuggling-modal')">
                <div class="icon-box" style="background-color: #9c27b0;"><i class="fa-solid fa-box-open"></i></div>
                <div><h3 style="margin: 0; color: #fff;">قوانين التهريب</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الهروب، الموانئ، والاشتباك</p></div>
            </div>
        </div>

        <div id="general-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('general-modal')">&times;</span>
                <h2>القوانين العامة الأساسية</h2>
                <div class="danger-box">يمنع استخدام المركبة كسلاح (VDM) | يمنع القتل بدون سبب (RDM)</div>
                <ul class="rules-list">
                    <li>1. يجب ان يكون اسمك في الهويه اسم واقعي (انذار اول).</li>
                    <li>2. يمنع طلب المطاردة من العساكر دون سبب واضح.</li>
                    <li>3. يمنع التحدث في الراديو في حال كانت يديك مقيدتان.</li>
                    <li>4. يمنع سرقة جميع مركبات الوظائف المعتمده.</li>
                    <li>5. الالتزام بالتمثيل بشكل كامل واقعي واحترافي.</li>
                </ul>
            </div>
        </div>

        <div id="safe-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('safe-modal')">&times;</span>
                <h2 style="color:#009688;">🛡️ المناطق الآمنة (Safe Zones)</h2>
                <div class="note-box">يمنع فيها أي عمل إجرامي (خطف، قتل، إطلاق نار) نهائياً.</div>
                <ul class="rules-list">
                    <li>1. المستشفيات ومراكز الشرط ومراكز أمن المنشأت. [cite: 297]</li>
                    <li>2. معرض المركبات والشاحنات. [cite: 298]</li>
                    <li>3. مركز التوظيف ومكان استخراج رخص. [cite: 299]</li>
                    <li>4. حجز المركبات والشاحنات. [cite: 300]</li>
                    <li>5. مناطق العمل (الاخشاب - الدواجن - الاعناب الخ...). [cite: 301]</li>
                </ul>
            </div>
        </div>

        <div id="smuggling-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('smuggling-modal')">&times;</span>
                <h2 style="color:#9c27b0;">📦 قوانين التهريب (Smuggling)</h2>
                <div class="note-box">اوقات فتح واقفال الميناء من الساعة 7:00 صباحا الى الساعة 7:00 مساء. [cite: 350]</div>
                <ul class="rules-list">
                    <li>- يمنع الهروب سباحة؛ الهروب يكون بالقارب فقط. [cite: 355]</li>
                    <li>- في حال وجود 3 مهربين أو أكثر، يمنع على الأمن المواجهة إذا كان عددهم أقل من 3. [cite: 358]</li>
                    <li>- يمنع الدخول بـ الدباب او مركبة سوبر او سبورت او طائرات الى الميناء البحري. [cite: 359]</li>
                    <li>- يمنع استخدام الاسلحة من القارب ضد اي شخص على رصيف الميناء. [cite: 356]</li>
                    <li>- يمنع دخول الميناء بهدف القتال فقط دون وجود ممنوعات. [cite: 359]</li>
                </ul>
            </div>
        </div>

        <div id="crime-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('crime-modal')">&times;</span>
                <h2>قوانين الإجرام</h2>
                <ul class="rules-list">
                    <li>يمنع الاتفاق مع أي شخص ليصبح رهينة. [cite: 317]</li>
                    <li>يمنع طلب عسكري أو مسعف أو ميكانيكي لغرض خطفه. [cite: 318]</li>
                    <li>يمنع تحالف العصابات ضد الأمن بشكل عام. [cite: 319]</li>
                </ul>
            </div>
        </div>

        <div id="robbery-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('robbery-modal')">&times;</span>
                <h2>أعداد السرقات المسموحة</h2>
                <div class="highlight-box">البنك المركزي: المجرمين 4-6 | الأمن الأقصى 10 [cite: 326]</div>
                <div class="highlight-box">المتاجر: المجرمين 1-3 | الأمن الأقصى 4 [cite: 328, 329]</div>
            </div>
        </div>
    `));
});

// صفحة صناع المحتوى
app.get('/creators', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 40px;">صناع المحتوى</h1>
        <div class="rule-card" onclick="openModal('creators-modal')" style="width: 450px; margin: auto;">
            <div class="icon-box" style="background-color: #e91e63;"><i class="fa-solid fa-video"></i></div>
            <div><h3 style="margin: 0; color: #fff;">شروط وقوانين صناع المحتوى</h3><p style="color: #999; font-size: 14px; margin-top: 5px;">الامتيازات والضوابط</p></div>
        </div>

        <div id="creators-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creators-modal')">&times;</span>
                <h2>شروط وقوانين صانع المحتوى</h2>
                <div class="highlight-box">دعم كامل لصنّاع المحتوى لتوفير بيئة احترافية داخل السيرفر. [cite: 384]</div>
                <ul class="rules-list">
                    <li>- يجب وضع اسم (مقاطعة سبارك) في عنوان البث. [cite: 386]</li>
                    <li>- يمنع الكلام المسيء للإدارة أو السيرفر. [cite: 385]</li>
                    <li>- يعفى صانع المحتوى من العمليات الحكومية خلال فترات التصوير فقط. [cite: 394]</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;"><a href="https://discord.gg/sp10" class="btn-main btn-discord">انضم للديسكورد لفتح تذكرة</a></div>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p>قريباً...</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p>قريباً...</p>`)));
module.exports = app;
