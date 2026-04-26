const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
    
    * { box-sizing: border-box; scroll-behavior: smooth; }
    
    /* ستايل السكرول بار */
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
    
    /* أزرار الهيرو */
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; border: none; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }
    .btn-cfx-main:hover { background: #fff; border-color: #fff; }

    /* قسم النبذة */
    .about-section { max-width: 900px; margin: 40px auto; text-align: center; background: rgba(212,175,55,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(212,175,55,0.1); }

    /* شبكة تجرُبتنا الفريدة (مثل الصورة) */
    .experience-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin: 40px 0; }
    .exp-card { 
        background: rgba(25, 20, 15, 0.7); border: 1px solid rgba(212, 175, 55, 0.2); 
        padding: 35px 20px; border-radius: 12px; transition: 0.3s;
    }
    .exp-card:hover { border-color: #d4af37; transform: translateY(-5px); }
    .exp-card i { font-size: 40px; color: #d4af37; margin-bottom: 20px; }
    .exp-card h3 { font-size: 22px; margin: 10px 0; color: #fff; font-weight: 700; }
    .exp-card p { font-size: 15px; color: #aaa; line-height: 1.6; }

    .btn-outline-gold { 
        border: 1px solid #d4af37; color: #d4af37; padding: 12px 40px; 
        border-radius: 30px; text-decoration: none; font-size: 16px; transition: 0.3s;
        display: inline-block; margin-top: 20px; font-weight: bold;
    }
    .btn-outline-gold:hover { background: #d4af37; color: #000; }

    /* ستايل كروت القوانين */
    .cards-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px; }
    .rule-card {
        background: rgba(22, 18, 15, 0.9); border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 15px; padding: 25px; text-align: right; width: 380px;
        cursor: pointer; transition: 0.3s; display: flex; align-items: center; 
    }
    .rule-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2); border-color: #d4af37; }
    .icon-box { width: 55px; height: 55px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; color: #fff; margin-left: 20px; flex-shrink: 0; }

    /* المودلز (النوافذ المنبثقة) */
    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; transition: 0.3s; }
    .close-btn:hover { color: #d4af37; }
    
    .rules-list { list-style: none; padding: 0; margin: 20px 0; }
    .rules-list li { background: rgba(255,255,255,0.02); margin: 10px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.7; color: #ddd; }

    .grid-rules { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-top: 20px; }
    .grid-item { background: rgba(212,175,55,0.1); padding: 18px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.3); text-align: center; font-weight: bold; }

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

// الرئيسية
app.get('/', (req, res) => {
    res.send(layout(`
        <section style="height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-shadow: 0 5px 15px rgba(0,0,0,0.5);">
            <h1 style="font-size: 70px; color: #d4af37; font-weight: 900; margin: 0;">مقاطعة سبارك</h1>
            <p style="font-size: 22px; color: #eee;">حيث تبدأ مغامرتك الواقعية في عالم FiveM</p>
            <div style="margin-top: 30px;">
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> سيرفر الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-play"></i> دخول المقاطعة</a>
            </div>
        </section>

        <div class="about-section">
            <h2 style="color: #d4af37; margin-bottom: 15px;">نبذة عن مقاطعة سبارك</h2>
            <p style="font-size: 19px; line-height: 1.8; color: #e0e0e0;">
                مقاطعة سبارك هي مجتمع رول بلاي (Roleplay) متكامل يهدف لتقديم تجربة حياة واقعية فريدة. نعتمد على سكربتات حصرية، إدارة احترافية، وبيئة لعب تضمن العدل والمتعة لكل المواطنين.
            </p>
        </div>

        <div style="max-width: 1200px; margin: 80px auto;">
            <h2 style="font-size: 35px; margin-bottom: 10px;">تجربتنا الفريدة</h2>
            <div class="experience-grid">
                <div class="exp-card">
                    <i class="fa-solid fa-tower-broadcast"></i>
                    <h3>تجربة واقعية</h3>
                    <p>رول بلاي احترافي يطبق أعلى المعايير لضمان انغماسك الكامل في الشخصية.</p>
                </div>
                <div class="exp-card">
                    <i class="fa-solid fa-briefcase"></i>
                    <h3>وظائف متنوعة</h3>
                    <p>من الشرطة والإسعاف إلى التجارة الحرة، اختر مسارك المهني الذي يناسبك.</p>
                </div>
                <div class="exp-card">
                    <i class="fa-solid fa-shield-halved"></i>
                    <h3>نظام أمني متطور</h3>
                    <p>نظام حماية وقوانين مدروسة لضمان بيئة لعب خالية من التخريب والمشاكل.</p>
                </div>
                <div class="exp-card">
                    <i class="fa-solid fa-users-gear"></i>
                    <h3>مجتمع نشط</h3>
                    <p>انضم إلى آلاف اللاعبين المتفاعلين يومياً وكون صداقات وعصابات جديدة.</p>
                </div>
            </div>
            
            <p style="color: #888; font-size: 17px; margin-bottom: 25px;">استمتع بتجربة رول بلاي مميزة مع وظائف عامة وخاصة، ونظام شرطة وطوارئ، ومتجر للميزات الإضافية.</p>
            <a href="/rules" class="btn-outline-gold">اطلع على القوانين</a>
        </div>
    `));
});

// القوانين (كاملة بدون حذف)
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 10px;">دستور وقوانين سبارك</h1>
        <p style="color: #aaa; margin-bottom: 40px;">الالتزام بالقوانين يضمن لك ولغيرك تجربة ممتعة. الجهل بالقانون لا يعفي من العقوبة.</p>
        
        <div class="cards-container">
            <div class="rule-card" onclick="openModal('general-modal')">
                <div class="icon-box" style="background-color: #4CAF50;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div><h3>القوانين العامة</h3><p>أساسيات اللعب والتعامل</p></div>
            </div>
            <div class="rule-card" onclick="openModal('safezones-modal')">
                <div class="icon-box" style="background-color: #009688;"><i class="fa-solid fa-shield-heart"></i></div>
                <div><h3>المناطق الآمنة</h3><p>الأماكن المحمية كلياً</p></div>
            </div>
            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div><h3>قوانين الإجرام</h3><p>الخطف، القتل، والاعتداءات</p></div>
            </div>
            <div class="rule-card" onclick="openModal('robbery-modal')">
                <div class="icon-box" style="background-color: #ff9800;"><i class="fa-solid fa-sack-dollar"></i></div>
                <div><h3>أعداد السرقات</h3><p>توزيع المجرمين والأمن</p></div>
            </div>
            <div class="rule-card" onclick="openModal('police-modal')">
                <div class="icon-box" style="background-color: #2196F3;"><i class="fa-solid fa-building-shield"></i></div>
                <div><h3>الأمن العام</h3><p>صلاحيات الشرطة والتدخل</p></div>
            </div>
            <div class="rule-card" onclick="openModal('mechanic-modal')">
                <div class="icon-box" style="background-color: #ff5722;"><i class="fa-solid fa-wrench"></i></div>
                <div><h3>الميكانيك</h3><p>قوانين التزويد والتصليح</p></div>
            </div>
        </div>

        <div id="general-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('general-modal')">&times;</span><h2>القوانين العامة</h2><ul class="rules-list"><li>1. يمنع الـ VDM (الدهس العشوائي) والـ RDM (القتل بدون سبب).</li><li>2. يجب أن يكون اسمك واقعياً وبالعربية أو الانجليزية.</li><li>3. يمنع استخدام معلومات الديسكورد داخل اللعبة (MetaGaming).</li><li>4. احترام الجميع واجب، السب والقذف خارج الرول بلاي يعرضك للباند النهائي.</li></ul></div></div>
        
        <div id="safezones-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('safezones-modal')">&times;</span><h2>المناطق الآمنة</h2><div class="grid-rules"><div class="grid-item">المستشفيات</div><div class="grid-item">مراكز الشرطة</div><div class="grid-item">معرض المركبات</div><div class="grid-item">البنك المركزي (خارج وقت السرقة)</div></div></div></div>

        <div id="crime-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('crime-modal')">&times;</span><h2>قوانين الإجرام</h2><ul class="rules-list"><li>يمنع خطف المسعفين أو العساكر بدون سبب إجرامي قوي.</li><li>يجب إعطاء فرصة للطرف الآخر قبل إطلاق النار.</li><li>يمنع الانتقام (Revenge Kill) بعد الموت والإنعاش.</li></ul></div></div>

        <div id="robbery-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('robbery-modal')">&times;</span><h2>أعداد السرقات</h2><div class="grid-rules"><div class="grid-item">البنك المركزي: 6 مجرمين | 10 أمن</div><div class="grid-item">محل المجوهرات: 4 مجرمين | 7 أمن</div><div class="grid-item">المتاجر: 3 مجرمين | 4 أمن</div></div></div></div>

        <div id="police-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('police-modal')">&times;</span><h2>لوائح الأمن</h2><ul class="rules-list"><li>يمنع استخدام الأسلحة الثقيلة إلا في حال استخدامها من الطرف الآخر.</li><li>الالتزام بسلم الرتب والتعليمات العسكرية.</li></ul></div></div>

        <div id="mechanic-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('mechanic-modal')">&times;</span><h2>الميكانيك</h2><ul class="rules-list"><li>يمنع تزويد السيارات أثناء المطاردات.</li><li>التسعيرة ثابتة لجميع المواطنين.</li></ul></div></div>
    `));
});

// صناع المحتوى
app.get('/creators', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 40px;">صناع المحتوى</h1>
        <div class="rule-card" onclick="openModal('creators-modal')" style="margin: auto;">
            <div class="icon-box" style="background-color: #e91e63;"><i class="fa-solid fa-clapperboard"></i></div>
            <div><h3>نظام الشركاء</h3><p>sp10</p></div>
        </div>
        <div id="creators-modal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeModal('creators-modal')">&times;</span><h2>متطلبات صناع المحتوى</h2><p>جار العمل على تحديث الشروط والمميزات الجديدة لصناع المحتوى.</p></div></div>
    `));
});

// الصفحات الأخرى
app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p style="font-size:20px;">التقديم مفتوح حالياً عبر الديسكورد للقطاع العسكري والصحي.</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p style="font-size:20px;">تصفح الباقات الحصرية للسيارات والفلل قريباً.</p>`)));

app.listen(3000, () => console.log('Spark District Web: Full Version is Live!'));
