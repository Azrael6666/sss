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
        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.95)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }

    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    
    .logo { 
        display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; 
    }
    .logo img { 
        height: 55px; width: 55px; border-radius: 50%; border: 1px solid rgba(212, 175, 55, 0.4); object-fit: cover;
    }

    .content-area { padding: 40px 8%; text-align: center; }
    
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }

    .cards-container {
        display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px;
    }

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

app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 10px;">دستور وقوانين مقاطعة سبارك</h1>
        
        <div class="cards-container">
            <div class="rule-card" onclick="openModal('general-modal')">
                <div class="icon-box" style="background-color: #4CAF50;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div><h3>القوانين العامة</h3><p style="color: #999; font-size: 14px;">قوانين اللعب الأساسية والقيادة</p></div>
            </div>

            <div class="rule-card" onclick="openModal('safe-modal')">
                <div class="icon-box" style="background-color: #2196F3;"><i class="fa-solid fa-shield-halved"></i></div>
                <div><h3>المناطق الآمنة</h3><p style="color: #999; font-size: 14px;">أماكن الحماية والمرافق الرسمية</p></div>
            </div>

            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div><h3>قوانين الإجرام</h3><p style="color: #999; font-size: 14px;">الرهائن، السرقات، والاعتداءات</p></div>
            </div>

            <div class="rule-card" onclick="openModal('robbery-modal')">
                <div class="icon-box" style="background-color: #ff9800;"><i class="fa-solid fa-sack-dollar"></i></div>
                <div><h3>أعداد السرقات</h3><p style="color: #999; font-size: 14px;">الأعداد المسموحة للبنوك والمتاجر</p></div>
            </div>
        </div>

        <div id="general-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('general-modal')">&times;</span>
                <h2>القوانين العامة الأساسية</h2>
                <div class="danger-box">يمنع استخدام المركبة كسلاح (VDM) | يمنع القتل بدون سبب (RDM)</div>
                <ul class="rules-list">
                    <li>1. يجب ان يكون اسمك في الهويه واقعي (اسم اول وثاني).</li>
                    <li>2. يمنع السب والقذف والشتم بجميع انواعة.</li>
                    <li>3. الاحترام المتبادل بين الجميع والالتزام بالتمثيل الواقعي.</li>
                </ul>
            </div>
        </div>

        <div id="safe-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('safe-modal')">&times;</span>
                <h2>المناطق الآمنة</h2>
                <ul class="rules-list">
                    <li>1 - المستشفيات و مراكز الشرط و مراكز امن المنشأت</li>
                    <li>2 - معرض المركبات و الشاحنات</li>
                    <li>3- مركز التوظيف و مكان استخراج رخص</li>
                    <li>4 - حجز المركبات و الشاحنات</li>
                    <li>5- مناطق العمل - الاخشاب - الدواجن - الاعناب الخ...</li>
                </ul>
            </div>
        </div>

        <div id="robbery-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('robbery-modal')">&times;</span>
                <h2>أعداد السرقات المسموحة</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>البنك المركزي:</strong><br>المجرمين: 4 - 6 | الأمن: 10</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>المتاجر:</strong><br>المجرمين: 1 - 3 | الأمن: 4</div>
                </div>
            </div>
        </div>

        <div id="crime-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('crime-modal')">&times;</span>
                <h2>قوانين الإجرام</h2>
                <ul class="rules-list">
                    <li>- يمنع الاتفاق مع أي شخص ليصبح رهينة.</li>
                    <li>- يمنع طلب عسكري أو مسعف أو ميكانيكي لغرض خطفه.</li>
                </ul>
            </div>
        </div>
    `));
});

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
                <div class="highlight-box">دعم كامل لصنّاع المحتوى لتوفير بيئة احترافية داخل السيرفر.</div>
                <ul class="rules-list">
                    <li>- يجب وضع اسم (مقاطعة سبارك) في عنوان البث.</li>
                    <li>- يمنع الكلام المسيء للإدارة أو السيرفر.</li>
                    <li>- يعفى صانع المحتوى من العمليات الحكومية خلال فترات التصوير فقط.</li>
                </ul>
            </div>
        </div>
    `));
});

module.exports = app;
