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

    /* حاوية البطاقات لتوزيعها بشكل شبكي */
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
            <h2 style="color: #d4af37;">نبذة مقاطعة سبارك</h2>
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

// القوانين الشاملة
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 10px;">دستور وقوانين مقاطعة سبارك</h1>
        <p style="color: #aaa; margin-bottom: 40px;">ملاحظة: هذه القوانين قابلة للتحديث والزيادة في اي وقت والجهل بالقوانين لا يعفيك من العقوبة.</p>
        
        <div class="cards-container">
            <div class="rule-card" onclick="openModal('general-modal')">
                <div class="icon-box" style="background-color: #4CAF50;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">القوانين العامة</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">قوانين اللعب، المناطق الآمنة، والقيادة</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('certified-modal')">
                <div class="icon-box" style="background-color: #d4af37;"><i class="fa-solid fa-user-check"></i></div>
                <div>
                    <h3 style="margin: 0; color: #fff;">اللاعب المعتمد</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">الشروط، الرتب، ونظام الانتداب</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('crime-modal')">
                <div class="icon-box" style="background-color: #f44336;"><i class="fa-solid fa-mask"></i></div>
                <div>
            
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
                    <li>5. الهروب عن طريق البحر بدون قارب مجهز.</li>
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

                <h3>المناطق الآمنة:</h3>
                <ul class="rules-list">
                    <li>1. المستشفيات ومراكز الشرط ومراكز امن المنشأت.</li>
                    <li>2. معرض المركبات والشاحنات.</li>
                    <li>3. مركز التوظيف ومكان استخراج رخص.</li>
                    <li>4. حجز المركبات والشاحنات.</li>
                    <li>5. مناطق العمل (الاخشاب - الدواجن - الاعناب الخ...).</li>
                </ul>
            </div>
        </div>
        <div id="robbery-modal" class="modal">

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
                    <li>4. التمثيل بشكل جيد والالتزام في التمثيل الخاص في مدينة فرسان.</li>
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
                    <li><strong>القاعدة 1:</strong> يجب عليك فهم معنى الحياة الواقعية سواء كنت مجرمًا أو رهينة وذلك بقياسها بالحياة الواقعية.</li>
                    <li><strong>القاعدة 2:</strong> يمنع الاتفاق مع أي شخص ليصبح رهينة.</li>
                    <li><strong>القاعدة 3:</strong> يمنع طلب عسكري أو مسعف أو ميكانيكي (لغرض خطفه).</li>
                    <li><strong>القاعدة 4:</strong> مدة رهن الرهينة (15 دقائق كحد أقصى قبل بدء السيناريو) في حال بدأ السيناريو يلغى الوقت.</li>
                    <li><strong>القاعدة 5:</strong> يمنع المتاجرة بالممنوعات في المناطق الآمنة ويمنع النصب والاحتيال في المناطق الآمنة.</li>
                    <li><strong>القاعدة 6:</strong> يمنع تهديد المواطن لطلب فدية مالية.</li>
                    <li><strong>القاعدة 7:</strong> العداوة بين اللاعبين تنتهي من بعد القتل.</li>
                    <li><strong>القاعدة 8:</strong> يمنع تحالف العصابات ضد الأمن بشكل عام.</li>
                    <li><strong>القاعدة 9:</strong> يمنع الاعتداء على مفاوض الأمن في السيناريو ومفاوض المجرمين.</li>
                    <li><strong>القاعدة 10:</strong> يمنع مقاومة السلاح الناري بسلاح أبيض مهما كانت الحالة.</li>
                    <li><strong>القاعدة 11:</strong> يمنع إطلاق النار أو خطف العسكري في أي استيقاف مروري.</li>
                    <li><strong>القاعدة 12:</strong> يمنع منعًا باتًا مشاركة الرهينة للخاطفين في السيناريو.</li>
                    <li><strong>القاعدة 13:</strong> يمنع تقليد ملابس أحد العصابات أو الأمن + الاكسسوارت العسكريه.</li>
                    <li><strong>القاعدة 14:</strong> يمنع دخول الميناء بغرض القتال فقط.</li>
                    <li><strong>القاعدة 15:</strong> يمنع التدخل من خارج نداء الاستغاثة او الاستنفار (لغرض قتل العساكر).</li>
                    <li><strong>القاعدة 16:</strong> يسمح التهريب بالقارب.</li>
                    <li><strong>القاعدة 17:</strong> يسمح التدخل الخارجي (2) شخصين فقط في السرقات الكبيرة مثل البنك المركزي وبنك ميز المركزي في نطاق العدد المسموح (وبإمكانهم التدخل بالمطاردة فقط).</li>
                    <li><strong>القاعدة 18:</strong> يمنع على التدخل الخارجي التدخل أثناء التفاوض والمداهمه.</li>
                    <li><strong>القاعدة 19:</strong> يمنع الترصد للاعبين في مناطق العمل او المناطق الامنه (بغرض قتلهم).</li>
                    <li><strong>القاعدة 20:</strong> يجب تمثيل هروبك بعد اسقاط شخص (وعدم انتظار وصول رجال الأمن).</li>
                    <li><strong>القاعدة 21:</strong> يمنع خطف العسكري بغرض السرقة.</li>
                    <li><strong>القاعدة 22:</strong> يمنع قتل العسكري بداخل المناطق الامنة (يشمل ذلك حركة الاغتيال من الخلف) (مركز الشرطة) (المستشفيات) (مركز امن المنشات).</li>
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
                    <li>15. يمنع الصدم بوقت المطاردة بشكل نهائي.</li>
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
                    <li>- ممنوع اي موظف للحرس ان يستوقف استقاف مروري.</li>
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

// صناع المحتوى (تمت إضافة القوانين الجديدة)
app.get('/creators', (req, res) => {
    res.send(layout(`
        <h1 style="font-size: 45px; color: #d4af37; margin-bottom: 40px;">صناع المحتوى</h1>
        
        <div class="rule-card" onclick="openModal('creators-modal')" style="width: 450px; margin: auto;">
            <div class="icon-box" style="background-color: #e91e63;"><i class="fa-solid fa-video"></i></div>
            <div>
                <h3 style="margin: 0; color: #fff;">شروط وقوانين صناع المحتوى</h3>
                <p style="color: #999; font-size: 14px; margin-top: 5px;">الامتيازات، الضوابط، وقوانين البث</p>
            </div>
        </div>

        <div id="creators-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creators-modal')">&times;</span>
                <h2>شروط التقديم وقوانين صانع المحتوى</h2>
                
                <div class="highlight-box">
                    تحرص إدارة مقاطعة سبارك على دعم صنّاع المحتوى وتوفير بيئة ملائمة تساعدهم على تقديم محتوى احترافي ومميز داخل السيرفر مع الحفاظ على قوانين المقاطعة واحترام سير الحياة الواقعية داخل اللعبة.
                </div>

                <h3>📹 قوانين صانع المحتوى (أثناء البث):</h3>
                <ul class="rules-list">
                    <li>1. يمنع التطرق بالكلام المسيء للاداره او السيرفر باي شكل من الاشكال.</li>
                    <li>2. يجب عليك وضع اسم (مقاطعة سبارك) في عنوان البث.</li>
                    <li>3. عدم التطرق لأمور الحظر بالستريم مثل الستريم سنايب وسبب الحظر والخ ويجب التوجه إلى الادارة.</li>
                    <li>4. في حال توقفك عن صنع المحتوى بأي شكل كان في السيرفر لمدة 15يوم سوف يتم سحب ميزات صانع محتوئ بشكل تلقائي منك.</li>
                    <li>5. في حال رصدك لمخالف داخل السيرفر يمنع الخروج عن التمثيل او طلب الرقابة افتح تكت وابلغ الرقابة بالمخالف وسيتم محاسبته.</li>
                    <li>6. يمنع سب وشتم اللاعبين السيرفر عن طريق بثك ومن يخالف سيتم سحب ميزات صانع محتوئ منك.</li>
                    <li>7. في حال مخالفتك لقانون صانع المحتوئ او قانون الإجرام سيتم سحب ميزات صانع المحتوئ منك تلقائيا.</li>
                </ul>

                <h3>🎥 قوانين المشاركة والتصوير:</h3>
                <ul class="rules-list">
                    <li>- يمنع نشر فيديوهات او صور خادشة للحياة.</li>
                    <li>- يمنع نشر فيديوهات او صور من خارج السيرفر.</li>
                    <li>- يمنع عليك منشن الوظائف المعتمدة إلا بعد اذن من قائد الوظيفة او من ينوب عنه.</li>
                    <li>- يسمح لك تركيب لقطات على المقطع من خارج السيرفر بحدود المعقول ويمنع تركيب لقطات تخص سيرفر اخر.</li>
                    <li><strong>شروط محترف تصوير روكستار:</strong> يجب اخراج مواهبك في التصوير وتعطى على حسب رؤيه المراقب لك.</li>
                </ul>

                <h3>🎁 الامتيازات الممنوحة:</h3>
                <ul class="rules-list">
                    <li>- يُعفى صانع المحتوى من استلام العمليات في جميع القطاعات الحكومية خلال فترات التصوير فقط.</li>
                    <li>- الدخول المؤقت إلى مناطق مقفلة الاستنفارات او السيناريوهات الكبيره أو خاصة بعد التنسيق مع الإدارة.</li>
                    <li>- دعم فني مباشر لحل أي مشاكل تقنية قد تواجه صانع المحتوى خلال فترة التصوير.</li>
                </ul>

                <h3>🚫 الضوابط والاستثناءات:</h3>
                <ul class="rules-list">
                    <li>- جميع الامتيازات مخصصة للتصوير فقط، ويُمنع استغلالها لأغراض اللعب الشخصي أو المكاسب داخل اللعبة.</li>
                    <li>- يُمنع التدخل في الأحداث الجارية أو مواقف اللاعبين أثناء التصوير، إذا لم يكن الشخص طرفاً رسمياً فيها.</li>
                    <li>- يُمنع تبادل الأموال أو الممتلكات أو التأثير على سير اللعبة باستخدام صلاحيات صانع المحتوى.</li>
                    <li>- يجب التنسيق المسبق عند التصوير في مناطق حساسة.</li>
                </ul>

                <h3>📝 شروط القبول كصانع محتوى:</h3>
                <ul class="rules-list">
                    <li>1. التقديم عبر فتح تذكرة مع إرفاق روابط الحسابات أو القنوات المستخدمة.</li>
                    <li>2. يُشترط أن يكون المحتوى المقدم ملتزماً بالأخلاقيات العامة، وذو طابع احترافي.</li>
                    <li>3. بعد موافقة لجنة القبول يتم الجدولة لاجراء المقابلة.</li>
                </ul>

                <div class="note-box">
                    <strong>تنويه:</strong> هذه الامتيازات وُضعت لتمكين صنّاع المحتوى من تقديم الأفضل، ووجودها لا يعني أبداً أنهم فوق القوانين. احترام الجميع والتعاون شرط أساسي.
                </div>

                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://discord.gg/sp10" class="btn-main btn-discord">انضم للديسكورد لفتح تذكرة</a>
                </div>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><p>قريباً...</p>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><p>قريباً...</p>`)));

module.exports = app;
