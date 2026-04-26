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
        padding: 15px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    .logo { font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; }

    .content-area { padding: 40px 8%; text-align: center; }
    
    .hero { height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .hero h1 { font-size: 60px; margin-bottom: 15px; color: #d4af37; font-weight: 900; }
    
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }
    .btn-cfx-main:hover { background: transparent; color: #d4af37; }

    .about-box {
        background: rgba(20, 20, 20, 0.8); border: 1px solid rgba(212, 175, 55, 0.2);
        padding: 40px; border-radius: 15px; margin: 40px auto; max-width: 900px;
    }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0; }
    .card {
        background: rgba(25, 25, 25, 0.85); border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 35px; border-radius: 15px; transition: 0.3s;
    }
    .card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block; }

    /* صفحة القوانين */
    .rules-grid { display: flex; justify-content: center; margin-top: 30px; }
    .rule-card {
        background: rgba(22, 18, 15, 0.9); border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 15px; padding: 30px; text-align: right; width: 400px;
        cursor: pointer; transition: 0.3s;
    }
    .rule-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
    .icon-box { width: 55px; height: 55px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #fff; float: right; margin-left: 20px; }

    /* Modal */
    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); }
    .modal-content { background: #111; margin: 5% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 900px; max-height: 80vh; overflow-y: auto; text-align: right; position: relative; }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 20px; font-size: 30px; cursor: pointer; }
    
    .rules-list { list-style: none; padding: 0; }
    .rules-list li { background: rgba(255,255,255,0.03); margin: 8px 0; padding: 12px; border-right: 3px solid #d4af37; border-radius: 5px; }

    footer { padding: 30px; text-align: center; color: #555; border-top: 1px solid #222; }
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
    </script>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">مقاطعة سبارك</a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/rules">القوانين</a>
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
        <section class="hero">
            <h1>مقاطعة سبارك</h1>
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا</p>
            <div>
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> دخول السيرفر</a>
            </div>
        </section>

        <section class="about-box">
            <h2 style="color: #d4af37;">عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </section>

        <h2>تجربتنا الفريدة</h2>
        <div class="grid">
            <div class="card">
                <i class="fa-solid fa-briefcase"></i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-shield-halved"></i>
                <h3>نظام العساكر المتطور</h3>
                <p>لدينا نظام عسكري متطور من المركبات والمراكز الحكومية والملابس الحصرية.</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-users"></i>
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

app.get('/rules', (req, res) => {
    res.send(layout(`
        <div style="text-align: center; margin-bottom: 50px;">
            <h1 style="font-size: 45px; color: #d4af37;">قوانين مقاطعة سبارك</h1>
            <p style="color: #ccc;">اطلع على الأنظمة الخاصة باللاعبين المعتمدين</p>
        </div>

        <div class="rules-grid">
            <div class="rule-card" onclick="openModal('certified-player-modal')">
                <div class="icon-box" style="background-color: #d4af37;"><i class="fa-solid fa-user-check"></i></div>
                <div>
                    <h3 style="color: #fff; margin: 0;">قوانين لاعب معتمد</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الشروط، الرتب، ونظام الانتداب الوظيفي</p>
                </div>
            </div>
        </div>

        <div id="certified-player-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('certified-player-modal')">&times;</span>
                <h2 style="color:#d4af37;">قوانين اللاعب المعتمد</h2>
                <p style="background:rgba(212,175,55,0.1); padding:15px; border-right:4px solid #d4af37;">اللاعب المعتمد: لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز مع الحفاظ على رتبه الأساسية.</p>
                
                <h3>القوانين العامة</h3>
                <ul class="rules-list">
                    <li>حسن السمعة واللباقة في التعامل.</li>
                    <li>التقديم على وظيفتين على الأقل والتغيير بينهم دورياً.</li>
                    <li>مساعدة اللاعبين في الديسكورد والتمثيل الواقعي الجيد.</li>
                </ul>

                <h3>🟢 شروط القبول</h3>
                <ul class="rules-list">
                    <li>خلو السجل الرقابي لآخر 30 يوم.</li>
                    <li>الخبرة 36 فما فوق والتفرغ لمهام الاعتماد.</li>
                    <li>الرتبة الدنيا: مستوى 6 للوظائف العلمية / ملازم للعسكرية.</li>
                    <li>يمنع الاعتماد في مدن أخرى نهائياً.</li>
                </ul>

                <h3>الرتب المعتمدة</h3>
                <div style="background:#1a1a1a; padding:15px; border-radius:10px; margin-top:10px;">
                    <h4 style="color:#d4af37;">رتبة [CP]</h4>
                    <p>للشرطة/المنشآت (رقيب أول+) وللهلال الأحمر (مستوى 4+). يسمح بالتنقل بإذن القائد.</p>
                </div>
                <div style="background:#1a1a1a; padding:15px; border-radius:10px; margin-top:10px;">
                    <h4 style="color:#d4af37;">رتبة [CR] و [CA]</h4>
                    <p>ترشيح إداري (للستريمر والسمعة الحسنة). تنقل حر بين القطاعات عند النقص.</p>
                </div>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p>قريباً...</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p>قريباً...</p>`)));

app.listen(3000, () => console.log('Spark Web Started!'));
