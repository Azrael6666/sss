const express = require('express');
const app = express();

let totalVisits = 0; 

// نظام كاش بسيط لتسريع استجابة السيرفر ومنع التأخير
app.use((req, res, next) => {
res.set('Cache-Control', 'no-store');

    totalVisits++;

    next();
});
// نظام كاش بسيط لتسريع استجابة السيرفر ومنع التأخير

const STYLES = `
<style>
    * { box-sizing: border-box; scroll-behavior: smooth; }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0b0b; }
    ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }
body { 
    margin: 0;
    padding: 0;
    font-family: 'Cairo', sans-serif;
    color: #fff;
    direction: rtl;
    overflow-x: hidden;

    background-image:
    linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)),
    url('https://cdn.discordapp.com/attachments/1396289374735302837/1497962624027988110/fca6a48587bf24ac.png?ex=69f210e8&is=69f0bf68&hm=c9ccb7c9affa32eeeda0ddc317276a77e310bbe8fb86ac4223e4588cfa44eaad&');

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: #0b0b0b;
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
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${STYLES}
    <script>
        function openModal(id) { 
            const modal = document.getElementById(id);
            if(modal) {
                modal.style.display = "block"; 
                document.body.style.overflow = "hidden"; 
            }
        }
        function closeModal(id) { document.getElementById(id).style.display = "none"; document.body.style.overflow = "auto"; }
        window.onclick = function(event) { if (event.target.className === 'modal') closeModal(event.target.id); }
        
        // كود لفتح النافذة تلقائياً إذا جاي من رابط الوظائف
        window.onload = function() {
            if(window.location.hash) {
                const modalId = window.location.hash.substring(1);
                openModal(modalId);
            }
        }
    </script>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">
            <img src="https://cdn.discordapp.com/attachments/1396289374735302837/1497962623726260436/727d7d25559b45a4.gif?ex=69f2b9a8&is=69f16828&hm=dbd4fbaee50880a4e74b00fc558105b09e8a5acea35b6320462da0879fee983d&">
            <span>مقاطعة سبارك</span>
        </a>
  <div class="nav-links">
  <a href="/">الرئيسية</a>
<a href="/rules">القوانين</a>
<a href="/creators">صناع المحتوى</a>
<a href="/jobs">الوظائف</a>
<a href="/store">المتجر</a>
<a href="/admin-login">تسجيل دخول كأداري</a>
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
            <p>مع مقاطعة سبارك مش هتقدر تغمض عينيك</p>
            <div>
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> دخول السيرفر</a>
            </div>
        </section>

        <div style="background: rgba(20,20,20,0.8); padding: 40px; border-radius: 15px; max-width: 900px; margin: 40px auto; border: 1px solid rgba(212,175,55,0.2);">
            <h2 style="color: #d4af37;">نبذة عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </div>
<div style="margin: 60px auto; max-width: 900px;">
    <h2 style="color:#d4af37; margin-bottom:30px;">منصاتنا الاجتماعية</h2>

    <div style="display:flex; justify-content:center; gap:25px; flex-wrap:wrap;">

        <a href="https://www.tiktok.com/@spark_0100?_r=1&_t=ZS-95wdUTYAP1r" target="_blank" style="
            background: rgba(20,20,20,0.85);
            border: 1px solid rgba(212,175,55,0.2);
            border-radius: 15px;
            padding: 30px;
            width: 220px;
            text-decoration: none;
            color: white;
            transition: 0.3s;
        ">
            <i class="fa-brands fa-tiktok" style="font-size:50px; color:#fff; margin-bottom:15px;"></i>
            <h3>تيك توك</h3>
            <p style="color:#999;">تابع محتوى السيرفر على تيك توك</p>
        </a>

        <a href="https://www.youtube.com/@SSPP10" target="_blank" style="
            background: rgba(20,20,20,0.85);
            border: 1px solid rgba(212,175,55,0.2);
            border-radius: 15px;
            padding: 30px;
            width: 220px;
            text-decoration: none;
            color: white;
            transition: 0.3s;
        ">
            <i class="fa-brands fa-youtube" style="font-size:50px; color:#ff0000; margin-bottom:15px;"></i>
            <h3>يوتيوب</h3>
            <p style="color:#999;">شاهد فيديوهات السيرفر</p>
        </a>

    </div>
</div>
        <h2 style="margin-top: 60px;">تجربتنا الفريدة</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0;">
            <div style="background: rgba(25,25,25,0.85); padding: 35px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05);">
                <i class="fa-solid fa-briefcase" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك وحرس الحدود .</p>
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

app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 10px;">قوانين مقاطعة سبارك</h1>
        <p style="color: #aaa; margin-bottom: 40px;">ملاحظة: هذه القوانين قابلة للتحديث والزيادة في اي وقت والجهل بالقوانين لا يعفيك من العقوبة.</p>
        
        <div class="cards-container">
            <div class="rule-card" onclick="openModal('general-modal')">
                <div class="icon-box" style="background-color: #4CAF50;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">القوانين العامة</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">قوانين المقاطعة العامة </p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('certified-modal')">
                <div class="icon-box" style="background-color: #d4af37;"><i class="fa-solid fa-user-check"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">اللاعب المعتمد</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">شروط، الرتب، ونظام الانتداب</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">قوانين الإجرام</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الرهائن، السرقات، والاعتداءات</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('robbery-modal')">
                <div class="icon-box" style="background-color: #ff9800;"><i class="fa-solid fa-sack-dollar"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">أعداد السرقات</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الأعداد المسموحة للبنوك والمتاجر</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('police-modal')">
                <div class="icon-box" style="background-color: #2196F3;"><i class="fa-solid fa-building-shield"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">قوانين الأمن العام</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الصلاحيات، التفتيش، والمطاردات</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('border-modal')">
                <div class="icon-box" style="background-color: #00bcd4;"><i class="fa-solid fa-ship"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">حرس الحدود</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الميناء، التفتيش، وإطلاق النار</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('smuggling-modal')">
                <div class="icon-box" style="background-color: #9c27b0;"><i class="fa-solid fa-box-open"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">قوانين التهريب</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الهروب، الموانئ، والاشتباك</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('mechanic-modal')">
                <div class="icon-box" style="background-color: #ff5722;"><i class="fa-solid fa-wrench"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">كراج الميكانيكي</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">ساعات العمل وقواعد التعديل</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('discord-modal')">
                <div class="icon-box" style="background-color: #5865F2;"><i class="fa-brands fa-discord"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">قوانين الديسكورد</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الآداب العامة، التذاكر، والمحادثات</p>
                </div>
            </div>
        </div>

        <div id="general-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('general-modal')">&times;</span>
                <h2>القوانين العامة الأساسية</h2>
                <div class="danger-box">يمنع استخدام المركبة كسلاح ودهس اللاعبين (VDM) | يمنع استخدام السلاح بشكل عشوائي والقتل بدون سبب (RDM)</div>
                <ul class="rules-list">
                    <li>1. يجب ان يكون اسمك في الهويه اسم اول وثاني واقعي وغير ذالك سيتم محاسبتك (انذار اول).</li>
                    <li>2. يمنع طلب المطاردة من العساكر او الترصد لقتلهم او قتلهم دون اي سبب واضح.</li>
                    <li>3. يمنع التواصل الغير شرعي وانت داخل المنطقة (يجب عليك التواصل مع اصدقائك على موجة راديو).</li>
                    <li>4. عدم الترصد للمواطنين عن طريق البث المباشر.</li>
                    <li>5. يمنع السب والقذف والشتم بجميع انواعة.</li>
                    <li>6. يمنع التحدث في الراديو في حال كانت يديك مقيدتان وفي حال كنت تغوص تحت الماء.</li>
                    <li>7. يمنع الترصد لجميع الوظائف الحكومية لقتلهم ويجب ان يكون هناك سبب.</li>
                    <li>8. يمنع سرقة جميع مركبات الوظائف المعتمده.</li>
                    <li>9. يحق للرهينة الهروب في حال كان المجرم على غفله ومو مطلع سلاحه.</li>
                    <li>10. الاحترام المتبادل بين الجميع والالتزام بالتمثيل بشكل كامل واقعي واحترافي.</li>
                    <li>11. يمنع المقاومه بعد الانعاش (تعرضك لعقوبه).</li>
                    <li>12. يمنع اطلاق النار بوجود الهلال الاحمر.</li>
                    <li>13. يمنع تهديد او خطف موظفين الهلال الاحمر وكراج الميكانيكي.</li>
                    <li>14. يمنع الركوب بالشنطه في حال انك مواطن او مجرم الخ...</li>
                </ul>

                <h3>يمنع أثناء مطاردتك من قبل الأمن:</h3>
                <ul class="rules-list">
                    <li>1. دخول المنزل.</li>
                    <li>2. تخزين المركبة.</li>
                    <li>3. الصدم الغير واقعي.</li>
                    <li>4. القياده الغير واقعية.</li>
                    <li>5. الهروب عن طريق البحر سباحة بدون تجهيز عدة غوص.</li>
                </ul>

                <h3>يمنع القيادة بشكل غير واقعي مثل:</h3>
                <ul class="rules-list">
                    <li>1. تعمد المخالفات المروريه.</li>
                    <li>2. طلوع اوفرود بمركبة غير مخصصة.</li>
                    <li>3. الصدم العشوئي.</li>
                    <li>4. عكس السير بشكل مستمر.</li>
                    <li>5. تقطيع الاشارات بشكل مستمر وحولك عساكر.</li>
                    <li>6. تعديل مركبة مقلوبة بدون طلب ميكانيكي.</li>
                </ul>
            </div>
        </div>

        <div id="certified-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('certified-modal')">&times;</span>
                <h2>قوانين اللاعب المعتمد</h2>
                <div class="highlight-box">
                    <strong>اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة والتغير بين الوظائف بشكل دوري ومستمر.
                </div>
                <h3>القواعد الأساسية</h3>
                <ul class="rules-list">
                    <li>1. حسن السمعة ولبق في تعاملك وأسلوبك مع اللاعبين.</li>
                    <li>2. التقديم على وظيفتين معتمدة على الأقل والتغير بينهم بشكل دوري والحرص على تطوير نفسك ومساندة زملائك في الوظيفة سواء كانت أساسية أو انتداب.</li>
                    <li>3. مساعدة اللاعبين في الدسكورد بشكل عام.</li>
                    <li>4. التمثيل بشكل جيد والالتزام في التمثيل الخاص في مقاطعة سبارك.</li>
                    <li>5. مساندة الوظائف المعتمدة الأخرى عند الضرورة.</li>
                </ul>
                <h3>🟢 شروط القبول</h3>
                <ul class="rules-list">
                    <li>- خلو السجل الرقابي لآخر 30 يوم والخبرة 36 فما فوق.</li>
                    <li>- الرتبة الدنيا: مستوى 6 (علمية) أو ملازم (عسكرية).</li>
                    <li>- يمنع الاعتماد في مدن أخرى نهائياً.</li>
                    <li>- يجب التقيد بالانتداب بشكل أسبوعي (من يوم إلى 7 أيام).</li>
                </ul>
                <h3>رتب اللاعب المعتمد [CP, CR, CA]</h3>
                <p>تخضع هذه الرتب لنظام ترقيات دقيق يعتمد على الأداء والسمعة والاحتياج الوظيفي داخل المقاطعة.</p>
            </div>
        </div>

        <div id="crime-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('crime-modal')">&times;</span>
                <h2>قوانين الإجرام</h2>
                <ul class="rules-list">
                    <li><strong> 1:</strong> يجب عليك فهم معنى الحياة الواقعية سواء كنت مجرمًا أو رهينة وذلك بقياسها بالحياة الواقعية.</li>
                    <li><strong>2:</strong> يمنع الاتفاق مع أي شخص ليصبح رهينة.</li>
                    <li><strong> 3:</strong> يمنع طلب عسكري أو مسعف أو ميكانيكي (لغرض خطفه).</li>
                    <li><strong> 4:</strong> مدة رهن الرهينة (15 دقائق كحد أقصى قبل بدء السيناريو) في حال بدأ السيناريو يلغى الوقت.</li>
                    <li><strong> 5:</strong> يمنع المتاجرة بالممنوعات في المناطق الآمنة ويمنع النصب والاحتيال في المناطق الآمنة.</li>
                    <li><strong> 6:</strong> يمنع تهديد المواطن لطلب فدية مالية اكثر من 10 الاف.</li>
                    <li><strong>7:</strong> العداوة بين اللاعبين تنتهي من بعد القتل.</li>
                    <li><strong> 8:</strong> يمنع تحالف العصابات ضد الأمن بشكل عام.</li>
                    <li><strong> 9:</strong> يمنع الاعتداء على مفاوض الأمن في السيناريو ومفاوض المجرمين.</li>
                    <li><strong>ا 10:</strong> يمنع مقاومة السلاح الناري بسلاح أبيض مهما كانت الحالة.</li>
                    <li><strong> 11:</strong> يمنع إطلاق النار أو خطف العسكري في أي استيقاف مروري.</li>
                    <li><strong> 12:</strong> يمنع منعًا باتًا مشاركة الرهينة للخاطفين في السيناريو.</li>
                    <li><strong> 13:</strong> يمنع تقليد ملابس أحد العصابات أو الأمن + الاكسسوارت العسكريه.</li>
                    <li><strong>ا 14:</strong> يمنع دخول الميناء بغرض القتال فقط.</li>
                    <li><strong>ا 15:</strong> يمنع التدخل من خارج نداء الاستغاثة او الاستنفار (لغرض قتل العساكر).</li>
                    <li><strong> 16:</strong> يسمح التهريب بالقارب.</li>
                    <li><strong> 17:</strong> يمنع  التدخل الخارجي  أثناء التفاوض والمداهمه.</li>
                    <li><strong> 18:</strong> يمنع الترصد للاعبين في مناطق العمل او المناطق الامنه (بغرض قتلهم).</li>
                    <li><strong> 19:</strong> يجب تمثيل هروبك بعد اسقاط شخص (وعدم انتظار وصول رجال الأمن).</li>
                    <li><strong> 20:</strong> يمنع خطف العسكري بغرض السرقة.</li>
                </ul>
            </div>
        </div>

        <div id="robbery-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('robbery-modal')">&times;</span>
                <h2>أعداد السرقات المسموحة</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>البنك المركزي:</strong><br>المجرمين: 4 - 6 | الأمن الأقصى: 10</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>بنك بليتو & ساندي:</strong><br>المجرمين: 3 - 5 | الأمن الأقصى: 7</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>بنك ميز:</strong><br>المجرمين: 2 - 4 | الأمن الأقصى: 7</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>بنك ميز المركزي:</strong><br>المجرمين: 4 - 7 | الأمن الأقصى: 11</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>بنك ليبرتي:</strong><br>المجرمين: 2 - 4 | الأمن الأقصى: 8</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>الكازينو:</strong><br>المجرمين: 2 - 4 | الأمن الأقصى: 7</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>المتاجر:</strong><br>المجرمين: 1 - 3 | الأمن الأقصى: 4</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>متجر الاسلحة:</strong><br>المجرمين: 2 - 3 | الأمن الأقصى: 4</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>البار:</strong><br>المجرمين: 1 - 3 | الأمن الأقصى: 4</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>معرض الفنون:</strong><br>المجرمين: 3 - 5 | الأمن الأقصى: 8</div>
                    <div class="highlight-box" style="margin-bottom: 0;"><strong>سرقة المجوهرات:</strong><br>المجرمين: 2 - 4 | الأمن الأقصى: 6</div>
                </div>
            </div>
        </div>

        <div id="police-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('police-modal')">&times;</span>
                <h2>قوانين الأمن العام</h2>
                <ul class="rules-list">
                    <li>1. يجب على جميع منسوبي ادارة الشرطة احترام جميع المواطنين.</li>
                    <li>2. يمنع رفع السلاح الناري على المواطن بدون سبب مقنع.</li>
                    <li>3. يمنع اخذ اي مواطن في موقع اشتباه الى قسم الشرطة بدون دليل قاطع.</li>
                    <li>4. يمنع سجن المواطن الا بعد اثبات قاطع وسماع جميع اقواله.</li>
                    <li>5. يمنع تفتيش اي مواطن الا بعد ثبوت التهمه عليه ويجب على المواطن مراعاة رجل الامن في حال اعطاه امر بنزع السترة او القناع تجنباً للتفتيش.</li>
                    <li>6. يسمح لرجل الامن تفتيش المواطن في مركز الشرطة او في نقطة تفتيش فقط.</li>
                    <li>7. يمنع لرجل الامن تفتيش مركبة الشخص إلا في حال تم وصول بلاغ على المركبه.</li>
                    <li>8. لا يحق لرجل الامن اخذ المواطن الى القسم لأي مخالفة مرورية الا في حال عدم التعاون.</li>
                    <li>9. يمنع التحدث مع المواطنين بتكبر او التدخل في شؤون المواطن الا اذا كان المواطن يقوم بالشغب.</li>
                    <li>10. يمنع منعاً باتاً اعطاء المواطن اي غرض يخص ادارة الشرطة.</li>
                    <li>11. يجب على رجال الامن احضار مركبه مخصصه للآفرود في حال وجود مركبه افرود للمجرمين.</li>
                    <li>12. يمنع الصعود خلف المجرمين في حال صعودهم للافرود بمركبات غير مخصصه لذلك.</li>
                    <li>13. يسمح اسقاط المجرم في حال انه ماسك مواطن في وضعيه تهديد الرهينه, من قبل القوات الخاصه ويتم ذلك من قبلهم فقط.</li>
                    <li>14. يمنع سحب الاسلحة بجميع انواعها بدون سجلات يتم اعطاء الشخص في حال استخدامه للسلاح 3 سجلات وبعدها يتم سحبه - إلا الاسلحه البيضاء والمسدس يتم سحبها بشكل فوري.</li>
                    <li>15. يمنع الصدم المباشر من قبل الامن العام الا بعد مرور 3 دقائق  من المطاردة الا اذا تم تفشيل المطاردة من قبل المواطن [قطع اشارة , القيادة بشكل معاكس للسير , الى الخ...</li>
                </ul>
            </div>
        </div>

        <div id="border-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('border-modal')">&times;</span>
                <h2>قوانين حرس الحدود</h2>
                <div class="note-box">اوقات فتح واقفال الميناء من الساعة 7:00 صباحا الى الساعة 7:00 مساء</div>
                <ul class="rules-list">
                    <li>- يجب احترام المواطنين وعدم التقليل من اي شخص.</li>
                    <li>- يمنع سجن المواطن الا بعد اثبات قاطع وسماع جميع اقواله.</li>
                    <li>- يمنع تفتيش اي مواطن الا بعد ثبوت التهمه عليه ويجب على المواطن مراعات رجل الامن في حال اعطاه امر بنزع السترة او القناع تجنباً للتفتيش.</li>
                    <li>- يسمح لرجل حرس الحدود تفتيش المواطن في حال تبين تحركات غريبه داخل الميناء وبدون لبس العمل.</li>
                    <li>- يسمح لرجل امن حرس الحدود تفتيش مركبة الشخص عند الاشتباه فقط.</li>
                    <li>- يمنع التحدث مع المواطنين بتكبر او التدخل في شئون المواطن الا اذا كان المواطن يقوم بالشغب.</li>
                    <li>- منع منعاً باتاً اعطاء المواطن اي غرض يخص القطاع + فصل تصل الى باند ومنع من التوظيف بشكل نهائي حسب تقدير الاداره.</li>
                    <li>-يسمع لموضف حرس الحدود استيقاف اي مركبة مرورية داخل نطاق الميناء ويسمح استيقاف المروري خارج الميناء في حال بلاغ جنائي .</li>
                    <li>- ينبغي عليك عدم استخدام السلاح الناري الا في حال تهديد حياتك من قبل المهرب.</li>
                    <li>- الحالات المسموح إصابته بسلاح ناري هي في حال صوب السلاح في اتجاهك يتم اطلاق عليه النار وفي حال رفعت عليه السلاح والشخص يهرب يحق لك تيزرته فقط أو رفع تذكرة للرقابة والتفتيش.</li>
                </ul>
            </div>
        </div>

        <div id="smuggling-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('smuggling-modal')">&times;</span>
                <h2>قوانين التهريب</h2>
                
                <h3>في حال تم كشفك وانت تهرب داخل الموانئ:</h3>
                <ul class="rules-list">
                    <li>- يمنع الهروب سباحة عن طريق البحر ويمكن الهروب بالقارب عن طريق البحر.</li>
                    <li>- يمنع تعمد قتل رجال الامن بطريقة عشوائية واكتفي باسقاط من يعترض طريقك او يحاول اعتقالك فقط.</li>
                    <li>- في حال استحالة الهروب لا يمنع تسليم نفسك تقديرا لحياتك وتحافظ على خبرتك.</li>
                    <li>- يمنع استخدام الاسلحة من القارب ضد اي شخص على رصيف الميناء (يطبق على الامن والمهربين).</li>
                </ul>

                <h3>قواعد تبادل إطلاق النار بين الأمن والمهربين:</h3>
                <ul class="rules-list">
                    <li>- في حال هروب المهرب من الأمن ورفض الاستسلام او الإستجابة للطلقات التحذيرية يحق للأمن إسقاط المهرب فورا.</li>
                    <li>- يمنع على الأمن مواجهة المهربين إذا كان عدد المهربين 3 أو أكثر وعدد الأمن في موقع التهريب أقل من 3.</li>
                    <li>- مسؤولية الأمن التأكد والبحث عن عدد المهربين قبل البدأ بالسناريو.</li>
                </ul>

                <h3>المحظورات:</h3>
                <ul class="rules-list">
                    <li>- يمنع الدخول بـ الدباب او مركبة سوبر او سبورت او طائرات الى الميناء البحري.</li>
                    <li>- يمنع دخول الميناء بطريقة غير شرعية بدون ممنوعات بهدف اطلاق النار او حماية صديقك.</li>
                    <li>- يجب توفر قارب مجهز للهروب من الموقع.</li>
                    <li>- في حال تم رفع استنفار امني يمنع دخول الميناء, ويجب المغادرة فورا.</li>
                    <li>- في حال لم يتم كشفك من قبل رجال الامن يمنع كشف نفسك بهدف تبادل اطلاق النار.</li>
                    <li>- في حال الدخول للتهريب يمنع تعريض حياه المواطنين والتجار الى الخطر.</li>
                </ul>
                <div class="danger-box">+ ملاحظة هامة: الفصل اثناء التهريب يعرضك لاشد العقوبات وقد تصل الى الحظر اسبوع.</div>
            </div>
        </div>

        <div id="mechanic-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('mechanic-modal')">&times;</span>
                <h2>قوانين كراج الميكانيكي</h2>
                <div class="highlight-box">
                    <strong>تعريف الميكانيكي:</strong> هو شخص مخول في تعديل وتزويد المركبات وتقديم خدمه المساعده للوظائف المعتمده والمواطنين من اصلاح مركبات او تعبئة بانزين في حال واجه المواطن احدى المشاكل عبر التواصل معهم عبر الهاتف.
                </div>
                <ul class="rules-list">
                    <li>1. الاحترام المتبادل بينك وبين الزملاء والمواطنين على حد سواء.</li>
                    <li>2. يمنع العمل الاجرامي بوظيفة الميكانيك ويمنع حيازتك على أسلحة أو ممنوعات. "يستثنى من ذلك المطرقة والمفك المتاحة من الكراج، وتستخدم في تكملة التمثيل ويحظر استخدامها للقتل".</li>
                    <li>3. يجب على الميكانيكي الإلتزام بالقواعد المروريه وعدم قطع الإشارات.</li>
                    <li>4. اوقات عمل الكراج للتزويد والتعديل الفتره الصباحيه من الساعه 9:00 ص الى الساعه 10:00 م.</li>
                    <li>5. يمنع تهديد او خطف فنيين كراج الميكانيكي.</li>
                    <li>6. يمنع تواجد اكثر من نصف عدد الميكانيك داخل كراج التزويد.</li>
                </ul>
            </div>
        </div>

        <div id="discord-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('discord-modal')">&times;</span>
                <h2>قوانين الديسكورد</h2>
                <ul class="rules-list">
                    <li>1. تقمص الشخصية بكل إحترافية قولاً وفعلاً وتمثيل الحياة الواقعية في طور اللعبة.</li>
                    <li>2. يمنع التواصل مع طاقم الادارة في الخاص في شيء يخص المساعدة في مقاطعة سبارك ويوجد رومات مخصصة لذلك.</li>
                    <li>3. يمنع السب والشتم او التحدث بعبارات خادشه ومسيئه او نشر صور مسيئه وذلك يعرضك للحظر من دخول المقاطعة.</li>
                    <li>4. يمنع طلب مساعدة في الشات العام يوجد رومات مخصصة.</li>
                    <li>5. سوف يتم حظرك نهائي في حال رؤيه منك صفات عدوانيه لا تمس للتمثيل بصلة او الشتم واللعن.</li>
                    <li>6. يمنع عليك نشر سيرفرات اخرى او التحدث عنها او نشر روابط وهميه.</li>
                    <li>7. يمنع استخدامك بلوقن الخاص لرؤيه الرومات المخفية في ديسكورد مقاطعة سبارك.</li>
                    <li>8. يجب عليك الرد بسلوك حسن وعدم شخصنة الامور.</li>
                    <li>9. يمنع منشن الوظائف المعتمدة.</li>
                </ul>
            </div>
        </div>
    `));
});

app.get('/creators', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 40px;">صناع المحتوى</h1>

        <div class="cards-container">

            <div class="rule-card" onclick="openModal('creator-benefits-modal')">
                <div class="icon-box" style="background-color:#d4af37;">
                    <i class="fa-solid fa-gift"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">امتيازات صناع المحتوى</h3>
                    <p style="color:#999; font-size:14px;">المميزات والباقات</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('creator-rules-modal')">
                <div class="icon-box" style="background-color:#f44336;">
                    <i class="fa-solid fa-scale-balanced"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">قوانين صناع المحتوى</h3>
                    <p style="color:#999; font-size:14px;">قوانين البث والالتزام</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('creator-conditions-modal')">
             <div class="icon-box" style="
    background-image:url('https://cdn.discordapp.com/attachments/1396289374735302837/1499256862980309022/Untitled_10.png?ex=69f42342&is=69f2d1c2&hm=32928548fe0b1d0ca2c87932763e3d392293d2157771dae6ae13411991d0236e&&');
    background-size:cover;
    background-position:center;
    background-color:transparent;
">
</div>
                <div>
                    <h3 style="margin:0; color:#fff;">شروط صناع المحتوى</h3>
                    <p style="color:#999; font-size:14px;">شروط القبول والتقديم</p>
                </div>
            </div>

        </div>

        <div id="creator-benefits-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creator-benefits-modal')">&times;</span>

                <h2>امتيازات صناع المحتوى</h2>

                <div class="highlight-box">
                    تحرص إدارة مقاطعة سبارك على دعم صنّاع المحتوى وتوفير بيئة ملائمة تساعدهم على تقديم محتوى احترافي ومميز داخل السيرفر.
                </div>

                <h3>🎁 مميزات صانع المحتوى</h3>
                <ul class="rules-list">
                    <li>- <strong>1. باقة الستريمر:</strong> يحصل على مركبة من نوع (دودج) + مبلغ مالي 1,500,000 + 65,000 خبرة.</li>
                    <li>- يُعفى صانع المحتوى من استلام العمليات في جميع القطاعات الحكومية خلال فترات التصوير.</li>
                    <li>- الدخول المؤقت إلى مناطق الاستنفارات أو السيناريوهات الكبيرة بعد التنسيق.</li>
                    <li>- دعم فني مباشر لحل أي مشاكل تقنية تواجه صانع المحتوى.</li>
                </ul>

                <h3>🌟 مميزات صانع المحتوى المعتمد</h3>
                <ul class="rules-list">
                    <li>- <strong>2. باقة راعي ستريمر معتمد:</strong> يحصل على مبلغ مالي 1,000,000 + 15,000 خبرة.</li>
                </ul>

                <div class="note-box">
                    <strong>تنويه:</strong> هذه الامتيازات والباقات وُضعت لتمكين صنّاع المحتوى، ووجودها لا يعني أبداً أنهم فوق القوانين.
                </div>
            </div>
        </div>

        <div id="creator-rules-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creator-rules-modal')">&times;</span>

                <h2>قوانين صناع المحتوى</h2>

                <ul class="rules-list">
                    <li>1. يمنع التطرق بالكلام المسيء للادارة او السيرفر باي شكل من الاشكال.</li>
                    <li>2. يجب عليك وضع اسم (مقاطعة سبارك) في عنوان البث.</li>
                    <li>3. عدم التطرق لأمور الحظر بالستريم مثل الستريم سنايب ويجب التوجه إلى الادارة.</li>
                    <li>4. في حال توقفك عن صنع المحتوى لمدة 15 يوم سوف يتم سحب الميزات تلقائياً.</li>
                    <li>5. يمنع الخروج عن التمثيل أو طلب الرقابة أثناء البث؛ افتح تذكرة وابلغ عن المخالفين.</li>
                    <li>6. يمنع سب وشتم لاعبين السيرفر عن طريق بثك.</li>
                </ul>
            </div>
        </div>

        <div id="creator-conditions-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creator-conditions-modal')">&times;</span>

                <h2>شروط القبول كصانع محتوى</h2>

                <ul class="rules-list">
                    <li>1. التقديم عبر فتح تذكرة مع إرفاق روابط الحسابات أو القنوات المستخدمة.</li>
                    <li>2. يُشترط أن يكون المحتوى المقدم ملتزماً بالأخلاقيات العامة وذو طابع احترافي.</li>
                    <li>3. الالتزام بقوانين المقاطعة العامة وعدم استغلال الصلاحيات في اللعب الشخصي.</li>
                    <li>4. بعد موافقة لجنة القبول يتم الجدولة لإجراء المقابلة.</li>
                </ul>

                <div style="text-align:center; margin-top:20px;">
                    <a href="https://discord.gg/sp10" class="btn-main btn-discord">
                        انضم للديسكورد لفتح تذكرة
                    </a>
                </div>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => {
    res.send(layout(`
        <style>
            .jobs-header { text-align: center; margin-bottom: 40px; }
            .jobs-header h1 { font-size: 45px; color: #d4af37; margin-bottom: 10px; }
            .jobs-header p { color: #aaa; font-size: 18px; }
            .jobs-section-title { text-align: center; color: #d4af37; font-size: 30px; margin: 50px 0 25px; }

            .jobs-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 25px; padding: 20px; }

            .job-card {
                background: rgba(15, 15, 15, 0.9);
                border: 1px solid rgba(212, 175, 55, 0.25);
                border-radius: 15px;
                padding: 35px 20px;
                text-align: center;
                width: 280px;
                text-decoration: none;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .job-card:hover {
                transform: translateY(-8px);
                border-color: #d4af37;
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
            }

            .job-icon {
                width: 75px;
                height: 75px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 35px;
                color: #fff;
                margin-bottom: 20px;
            }

            .job-title { color: #fff; font-size: 22px; font-weight: bold; margin: 0 0 10px 0; }
            .job-desc { color: #888; font-size: 15px; line-height: 1.6; margin: 0; }
        </style>

        <div class="jobs-header">
            <h1>الوظائف العامة والمعتمدة</h1>
            <p>اختر مسيرتك المهنية في مقاطعة سبارك</p>
        </div>

        <h2 class="jobs-section-title">الوظائف المعتمدة</h2>

        <div class="jobs-grid">
            <a href="/rules" class="job-card">
                <div class="job-icon" style="background-color: #c62828;"><i class="fa-solid fa-heart-pulse"></i></div>
                <h3 class="job-title">الهلال الأحمر</h3>
                <p class="job-desc">قدم المساعدة الطبية وأنقذ الأرواح</p>
            </a>

            <a href="/rules#border-modal" class="job-card">
                <div class="job-icon" style="background-color: #00838f;"><i class="fa-solid fa-building-shield"></i></div>
                <h3 class="job-title">حرس الحدود</h3>
                <p class="job-desc">احم المنشآت الحيوية والموانئ</p>
            </a>

            <a href="/rules#police-modal" class="job-card">
                <div class="job-icon" style="background-color: #1a4b8c;"><i class="fa-solid fa-shield-halved"></i></div>
                <h3 class="job-title">الأمن العام</h3>
                <p class="job-desc">حافظ على النظام في المقاطعة</p>
            </a>

            <a href="/rules#crime-modal" class="job-card">
                <div class="job-icon" style="background-color: #6a1b9a;"><i class="fa-solid fa-users"></i></div>
                <h3 class="job-title">المنظمات</h3>
                <p class="job-desc">انضم لمنظمة أو أسس منظمتك الخاصة</p>
            </a>

            <a href="/rules#mechanic-modal" class="job-card">
                <div class="job-icon" style="background-color: #e65100;"><i class="fa-solid fa-wrench"></i></div>
                <h3 class="job-title">الميكانيكي</h3>
                <p class="job-desc">اصلح المركبات وقدم خدمات الصيانة</p>
            </a>
        </div>

        <h2 class="jobs-section-title">الوظائف العامة</h2>

<div class="jobs-grid">
    <a href="https://youtu.be/DZwpVsw9CIQ?si=W3owJHBiXYX3HWw2" target="_blank" class="job-card">
        <div class="job-icon" style="background-color: #f1c40f;">
            <i class="fa-solid fa-crow"></i>
        </div>
        <h3 class="job-title">الدواجن</h3>
        <p class="job-desc">اضغط لماشاهدة شرح وظيفة الدواجن</p>
    </a>

    <a href="https://youtu.be/4SRBIhboAUE?si=kPrj9KYNeEgqtg2D" target="_blank" class="job-card">
        <div class="job-icon" style="background-color: #4CAF50;">
            <i class="fa-solid fa-seedling"></i>
        </div>
        <h3 class="job-title">المزارع</h3>
        <p class="job-desc">اضغط لمشاهدة شرح وظيفة المزارع</p>
    </a>
<a href="https://youtu.be/NkR_7TgrTkY?si=4_Czqg2qZKqfmZMX" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #8D6E63;">
        <i class="fa-solid fa-tree"></i>
    </div>
    <h3 class="job-title">الأخشاب</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة الأخشـاب</p>
</a>
<a href="https://youtu.be/1o7V2r0VcNI?si=lg4F4t-wl4Fbk7Gx" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #795548;">
        <i class="fa-solid fa-cow"></i>
    </div>
    <h3 class="job-title">لحوم الأبقار</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة لحوم الأبقار</p>
</a>

<a href="https://youtu.be/UUTpzys6OsE?si=V164lLTCrwGgNpfA" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #0288D1;">
        <i class="fa-solid fa-fish"></i>
    </div>
    <h3 class="job-title">الأسماك</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة الأسماك</p>
</a>

<a href="https://www.youtube.com/watch?v=KFBJXBDjDYc" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #212121;">
        <i class="fa-solid fa-oil-can"></i>
    </div>
    <h3 class="job-title">شركة النفط</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة شركة النفط</p>
</a>
<a href="https://youtu.be/5-OB9lLYwYM?si=KRWdwPO4rv3fw2TB" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #FFC107;">
        <i class="fa-solid fa-jar"></i>
    </div>
    <h3 class="job-title">المناحل</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة المناحل</p>
</a>
<a href="https://youtu.be/VrasZ9cGadY?si=jngVvv5d4-fx4m4S" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #607D8B;">
        <i class="fa-solid fa-hammer"></i>
    </div>
    <h3 class="job-title">المعادن</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة المعادن</p>
</a>
<a href="https://www.youtube.com/watch?v=7nKp4Lt6cyI" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #9C27B0;">
        <i class="fa-solid fa-shirt"></i>
    </div>
    <h3 class="job-title">الأقمشة</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة الأقمشة</p>
</a>
<a href="https://youtu.be/VZhjKbtLnIo?si=BGIMQawOhjM02gye" target="_blank" class="job-card">
    <div class="job-icon" style="background-color: #66BB6A;">
        <i class="fa-solid fa-leaf"></i>
    </div>
    <h3 class="job-title">المراعي</h3>
    <p class="job-desc">اضغط لمشاهدة شرح وظيفة المراعي</p>
</a>
</div>
    `));
});
app.get('/store', (req, res) => {
    res.send(layout(`
        <h1 style="font-size:45px; color:#d4af37; margin-bottom:15px;">المتجر</h1>
        <p style="color:#aaa; margin-bottom:40px;">
            استعرض المنتجات والمميزات الخاصة داخل السيرفر
        </p>
        


<h2 style="color:#d4af37; margin-top:40px;">نبذات المتجر</h2>

<div class="cards-container">

<div class="rule-card" onclick="openModal('sponsor-modal')">
    <div class="icon-box" style="background-color:#d4af37;">
        <i class="fa-solid fa-crown"></i>
    </div>
    <div>
        <h3 style="margin:0; color:#fff;">نبذة عن الراعي الرسمي</h3>
        <p style="color:#999;">مميزات بطاقة الراعي</p>
    </div>
</div>

<div class="rule-card" onclick="openModal('xp-modal')">
  <div class="icon-box" style="
    background-image:url('https://cdn.discordapp.com/attachments/1396289374735302837/1499256862980309022/Untitled_10.png?ex=69f42342&is=69f2d1c2&hm=32928548fe0b1d0ca2c87932763e3d392293d2157771dae6ae13411991d0236e&');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-color:transparent;
">
</div>
    <div>
        <h3 style="margin:0; color:#fff;">نبذة عن ضعف الخبرة</h3>
        <p style="color:#999;">مضاعفة الخبرة داخل السيرفر</p>
    </div>
</div>
</div>

<h2 style="color:#d4af37; margin-top:70px;">قسم الرعاة</h2>

<div class="cards-container">

            <div class="rule-card" onclick="openModal('bronze-modal')">
                <div class="icon-box" style="background-color:#cd7f32;">
                    <i class="fa-solid fa-medal"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">راعي برونزي</h3>
                    <p style="color:#999;">تفاصيل الراعي البرونزي</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('silver-modal')">
                <div class="icon-box" style="background-color:#9e9e9e;">
                    <i class="fa-solid fa-medal"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">الراعي الفضي</h3>
                    <p style="color:#999;">تفاصيل الراعي الفضي</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('gold-modal')">
                <div class="icon-box" style="background-color:#d4af37;">
                    <i class="fa-solid fa-crown"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">الراعي الذهبي</h3>
                    <p style="color:#999;">تفاصيل الراعي الذهبي</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('platinum-modal')">
                <div class="icon-box" style="background-color:#00bcd4;">
                    <i class="fa-solid fa-gem"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">الراعي البلاتيني</h3>
                    <p style="color:#999;">تفاصيل الراعي البلاتيني</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('diamond-modal')">
                <div class="icon-box" style="background-color:#00e5ff;">
                    <i class="fa-solid fa-gem"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">الراعي الألماسي</h3>
                    <p style="color:#999;">تفاصيل الراعي الألماسي</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('official-modal')">
                <div class="icon-box" style="background-color:#8e24aa;">
                    <i class="fa-solid fa-certificate"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">الراعي الرسمي</h3>
                    <p style="color:#999;">تفاصيل الراعي الرسمي</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('strategic-modal')">
                <div class="icon-box" style="background-color:#ff5722;">
                    <i class="fa-solid fa-chess-king"></i>
                </div>
                <div>
                    <h3 style="margin:0; color:#fff;">الراعي الاستراتيجي</h3>
                    <p style="color:#999;">تفاصيل الراعي الاستراتيجي</p>
                </div>
            </div>


</div>


<h2 style="color:#d4af37; margin-top:70px;">قسم ضعف الخبرة</h2>

<div class="cards-container">

    <div class="rule-card" onclick="openModal('xp6-modal')">
      <div class="icon-box" style="
    background-image:url('https://cdn.discordapp.com/attachments/1396289374735302837/1499256862980309022/Untitled_10.png?ex=69f42342&is=69f2d1c2&hm=32928548fe0b1d0ca2c87932763e3d392293d2157771dae6ae13411991d0236e&');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-color:transparent;
">
</div>
        <div>
            <h3 style="margin:0; color:#fff;">ضعف خبرة 6 ساعات</h3>
            <p style="color:#999;">تفاصيل العرض في الديسكورد</p>
        </div>
    </div>

    <div class="rule-card" onclick="openModal('xp12-modal')">
  <div class="icon-box" style="
    background-image:url('https://cdn.discordapp.com/attachments/1396289374735302837/1499256862980309022/Untitled_10.png?ex=69f42342&is=69f2d1c2&hm=32928548fe0b1d0ca2c87932763e3d392293d2157771dae6ae13411991d0236e&');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-color:transparent;
">
</div>
        <div>
            <h3 style="margin:0; color:#fff;">ضعف خبرة 12 ساعة</h3>
            <p style="color:#999;">تفاصيل العرض في الديسكورد </p>
        </div>
    </div>

<div class="rule-card" onclick="openModal('xp24-modal')">
  <div class="icon-box" style="
    background-image:url('https://cdn.discordapp.com/attachments/1396289374735302837/1499256862980309022/Untitled_10.png?ex=69f42342&is=69f2d1c2&hm=32928548fe0b1d0ca2c87932763e3d392293d2157771dae6ae13411991d0236e&');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-color:transparent;
">
  </div>

  <div>
      <h3 style="margin:0; color:#fff;">ضعف خبرة 24 ساعة</h3>
      <p style="color:#999;">تفاصيل العرض في الديسكورد</p>
  </div>
</div>


</div> <!-- إغلاق قسم ضعف الخبرة -->

<h2 style="color:#d4af37; margin-top:70px;">قسم المركبات</h2>

<div class="cards-container">

    <div class="rule-card" onclick="openModal('sedan-modal')">
        <div class="icon-box" style="background-color:#607D8B;">
            <i class="fa-solid fa-car-side"></i>
        </div>
        <div>
            <h3 style="margin:0; color:#fff;">سيدان</h3>
            <p style="color:#999;">مركبات السيدان</p>



    </div>
</div>
 
<div id="sedan-modal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="closeModal('sedan-modal')">&times;</span>

        <h2>مركبات السيدان</h2>

        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:25px;">

            <img src="https://d.top4top.io/p_37703mby38.png"
            style="width:350px; border-radius:15px;">

            <img src="https://e.top4top.io/p_3770z77kn2.png"
            style="width:350px; border-radius:15px;">

        </div>
    </div>
        <div class="note-box" style="margin-top:35px;">
            للشراء أو الاستفسار يرجى فتح تذكرة متجر داخل الديسكورد.
        </div>

        <div style="text-align:center; margin-top:20px;">
            <a href="https://discord.gg/sp10" class="btn-main btn-discord">
                فتح تذكرة متجر
            </a>
        </div>

    </div>
</div>

            <h3 style="margin:0; color:#fff;">سيدان</h3>
            <p style="color:#999;">مركبات السيدان</p>
        </div>
    </div>

    <div class="rule-card" onclick="openModal('sport-modal')">
        <div class="icon-box" style="background-color:#E53935;">
            <i class="fa-solid fa-car"></i>
        </div>
        <div>
            <h3 style="margin:0; color:#fff;">سبورت</h3>
            <p style="color:#999;">مركبات السبورت</p>
        </div>
    </div>

    <div class="rule-card" onclick="openModal('drift-modal')">
        <div class="icon-box" style="background-color:#9C27B0;">
            <i class="fa-solid fa-road"></i>
        </div>
        <div>
            <h3 style="margin:0; color:#fff;">درفت</h3>
            <p style="color:#999;">مركبات الدرفت</p>
        </div>
    </div>

    <div class="rule-card" onclick="openModal('pickup-modal')">
        <div class="icon-box" style="background-color:#795548;">
            <i class="fa-solid fa-truck-pickup"></i>
        </div>
        <div>
            <h3 style="margin:0; color:#fff;">بيك أب</h3>
            <p style="color:#999;">مركبات البيك أب</p>
        </div>
    </div>

    <div class="rule-card" onclick="openModal('truck-modal')">
        <div class="icon-box" style="background-color:#FF9800;">
            <i class="fa-solid fa-truck"></i>
        </div>
        <div>
            <h3 style="margin:0; color:#fff;">حمولات</h3>
            <p style="color:#999;">مركبات الحمولات</p>
        </div>
    </div>

    <div class="rule-card" onclick="openModal('government-modal')">
        <div class="icon-box" style="background-color:#3F51B5;">
            <i class="fa-solid fa-building-shield"></i>
        </div>
        <div>
            <h3 style="margin:0; color:#fff;">مركبات حكومية</h3>
            <p style="color:#999;">مركبات الجهات الحكومية</p>
        </div>
    </div>

</div>
</div>
        </div>

        <div id="sponsor-modal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="closeModal('sponsor-modal')">&times;</span>

        <h2>نبذة عن الراعي الرسمي</h2>

        <div class="highlight-box">
            مميزات بطاقة الراعي
        </div>

        <ul class="rules-list">
            <li>إعفاء من رسوم حجز المركبات العادي.</li>
            <li>إعفاء من رسوم دخول الميناء من الساعة 7 صباحًا إلى الساعة 7 مساءً بتوقيت السيرفر.</li>
            <li>أولوية الدخول للسيرفر إذا كان يوجد طابور انتظار.</li>
            <li>تسجيل الدخول في الوظيفة حتى لو كان العدد كامل.</li>
            <li>حصولك على بطاقة خاصة للراعي داخل السيرفر يمكن إظهارها لأقرب لاعب.</li>
            <li>تحسب مدة الاشتراك من تاريخ استلامك للبطاقة داخل السيرفر وليس من تاريخ الشراء.</li>
            <li>من الممكن إضافة مميزات جديدة للراعي في المستقبل ويتم الإعلان عنها لاحقًا.</li>
            <li>لا يمكن شراء نفس الراعي مرتين حتى انتهاء مدة صلاحية الراعي الحالية.</li>
        </ul>
    </div>
</div>

<div id="xp-modal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="closeModal('xp-modal')">&times;</span>

        <h2>نبذة عن ضعف الخبرة</h2>

        <div class="highlight-box">
            استغل وقتك بذكاء وارفع مستواك بشكل أسرع من خلال ميزة مضاعفة الخبرة.
        </div>

        <h3>المميزات</h3>

        <ul class="rules-list">
            <li>مضاعفة الخبرة بنسبة 50 بالمئة.</li>
            <li>احتساب الوقت تلقائيًا ويتم حساب مدة العرض فقط أثناء اتصالك بالسيرفر.</li>
            <li>عدم احتساب الوقت عند الانقطاع؛ إذا فقدت الاتصال بالسيرفر يتوقف الوقت تلقائيًا.</li>
        </ul>

        <h3>كيفية الاستفادة من مضاعفة الخبرة</h3>

        <ul class="rules-list">
            <li>إنعاش المرضى في الطوارئ الطبية.</li>
            <li>حجز المركبات للوظائف المعتمدة مثل الميكانيكي والشرطة والحراسة والدفاع المدني.</li>
            <li>البيع في الموانئ.</li>
            <li>توصيل الصناديق إلى المتاجر للمستثمرين والموظفين.</li>
            <li>الخبرة الدورية المكتسبة مع الرواتب.</li>
            <li>تركيب التعديلات على المركبات.</li>
            <li>والعديد من الأنشطة الأخرى داخل السيرفر.</li>
        </ul>

        <div class="note-box">
            استفد من هذه الميزة لزيادة مستواك بشكل أسرع واستمتع بتجربة لعب أكثر إثارة.
        </div>
    </div>
</div>

${makeSponsor('bronze-modal','راعي برونزي','14 يوم','500 ألف شرعي','2500 خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215853672075314/15ebcc13e242a635.png?ex=69f3fd11&is=69f2ab91&hm=a264b8f0be1fe708e47e23dd6dd99b6f0bbdf485840a96c73ca17540835441cc&')}
${makeSponsor('silver-modal','الراعي الفضي','21 يوم','705 ألف','4 آلاف خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215854959595602/def4a742970be443.png?ex=69f3fd11&is=69f2ab91&hm=2182c2e64527f38f7d375d44dee7a7e2ae09c9ad14f393739a5dcad36ecc7582&')}
${makeSponsor('gold-modal','الراعي الذهبي','30 يوم','1 مليون','5 آلاف خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215854536097953/d9cfc19cbb465e74.png?ex=69f3fd11&is=69f2ab91&hm=108b22bfa51b9d87e7b6a9525ece8bd06bf1e5477acce5f29b5c00f721fde7e3&')}
${makeSponsor('platinum-modal','الراعي البلاتيني','30 يوم','2 مليون وخمسمية','7500 خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215855228026950/ebfad16bb87d35a4.png?ex=69f3fd11&is=69f2ab91&hm=c721054bb28fa3d3256f41b1b3f9f967b372a8d4f12e2d666166d42083a792c5&')}
${makeSponsor('diamond-modal','الراعي الألماسي','30 يوم','3 مليون','10 آلاف خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215853957283930/35d0acbb638fe055.png?ex=69f3fd11&is=69f2ab91&hm=5de33a3a05603f309fec7a841d6eabcd8605a41cd03dad1aacc8b74d6f377de8&')}
${makeSponsor('official-modal','الراعي الرسمي','30 يوم','5 مليون','13 ألف خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215853391183972/5e8570ee84a2b183.png?ex=69f3fd11&is=69f2ab91&hm=dbc7351f1116a85fa123ce3a0f56276ff50d61ca4a3e65951fa2934447dffa83&')}
${makeSponsor('strategic-modal','الراعي الاستراتيجي','30 يوم','7 مليون وخمسمية','20 ألف خبرة','https://cdn.discordapp.com/attachments/1489305135472705707/1499215854233980928/346b4db315caa3d7.png?ex=69f3fd11&is=69f2ab91&hm=547ae93f0d9713704a8bb05c90a6c79d6ce62731a7ff839602e6a55390f3204c&')}
    `));
});

function makeSponsor(id, title, duration, money, xp, image) {
    return `
        <div id="${id}" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${id}')">&times;</span>

                <div style="text-align:center; margin-bottom:25px;">
                    <img src="${image}" style="
                   width:600px;
max-width:100%;
                        border:2px solid rgba(212,175,55,0.4);
                    ">
                </div>

                <h2>${title}</h2>
                <ul class="rules-list">
                    <li>المدة: ${duration}</li>
                    <li>المبلغ: ${money}</li>
                    <li>الخبرة: ${xp}</li>
                </ul>
            </div>
        </div>
    `;
}

const adminEmails = [
    "mx@gmail.com",
    "admin2@gmail.com"
];

app.get('/admin-login', (req, res) => {
    res.send(layout(`
        <h1 style="color:#d4af37;">تسجيل دخول كأداري</h1>

        <form action="/admin-check" method="GET" style="margin-top:30px;">
            <input 
                type="email" 
                name="email" 
                placeholder="اكتب الإيميل"
                required
                style="padding:15px; width:300px; border-radius:8px; border:none; font-size:16px;"
            >

            <br><br>

            <button 
                type="submit"
                class="btn-main btn-cfx-main"
            >
                دخول
            </button>
        </form>
    `));
});

app.get('/admin-visitors', (req, res) => {

const totalVisitors = totalVisits;

    res.send(layout(`
        <h1 style="color:#d4af37;">زوار الموقع</h1>

        <div style="
            background:#111;
            padding:30px;
            border-radius:15px;
            max-width:500px;
            margin:30px auto;
            border:1px solid rgba(212,175,55,0.3);
        ">
            <h2 style="font-size:50px; color:#d4af37; margin:0;">
                ${totalVisitors}
            </h2>

            <p style="color:#999; font-size:18px;">
                عدد زيارات الموقع
            </p>
        </div>

        <div style="margin-top:30px;">
            <a href="/admin-login" class="btn-main btn-cfx-main">
                رجوع للإدارة
            </a>
        </div>
    `));
});
app.get('/admin-check', (req, res) => {
    const email = req.query.email;

    if (adminEmails.includes(email)) {
        res.send(layout(`
            <h1 style="color:#d4af37;">القائمة الإدارية</h1>
            <p>مرحباً بك، تم التحقق من صلاحيتك.</p>

            <div style="margin-top:30px;">
                <a href="/admin-visitors" class="btn-main btn-cfx-main">
                    زوار الموقع
                </a>
            </div>
        `));
    } else {
        res.send(layout(`
            <h1 style="color:#ff4c4c;">غير مصرح</h1>
            <p>هذا الإيميل غير موجود ضمن الإدارة.</p>
        `));
    }
});
module.exports = app;
