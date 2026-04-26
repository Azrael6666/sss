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
    .hero h1 { font-size: 60px; margin-bottom: 15px; color: #d4af37; font-weight: 900; text-shadow: 0 0 20px rgba(212,175,55,0.3); }
    
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }
    .btn-cfx-main:hover { background: transparent; color: #d4af37; }

    .about-box {
        background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(212, 175, 55, 0.2);
        padding: 40px; border-radius: 15px; margin: 40px auto; max-width: 950px; text-align: center;
    }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0; }
    .card {
        background: rgba(25, 25, 25, 0.85); border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 35px; border-radius: 15px; transition: 0.3s; text-align: center;
    }
    .card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block; }

    /* قوانين السيرفر (Card) */
    .rules-grid { display: flex; justify-content: center; margin-top: 30px; }
    .rule-card {
        background: rgba(22, 18, 15, 0.95); border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 15px; padding: 30px; text-align: right; width: 450px;
        cursor: pointer; transition: 0.3s;
    }
    .rule-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.1); }
    .icon-box { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #fff; float: right; margin-left: 20px; }

    /* Modal Styling */
    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; box-shadow: 0 0 40px rgba(0,0,0,1); }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; transition: 0.3s; }
    .close-btn:hover { color: #d4af37; }
    
    .modal-content h2 { font-size: 32px; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 25px; }
    .modal-content h3 { color: #d4af37; margin-top: 35px; border-right: 4px solid #d4af37; padding-right: 15px; }
    
    .rules-list { list-style: none; padding: 0; margin: 20px 0; }
    .rules-list li { background: rgba(255,255,255,0.02); margin: 10px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.7; color: #ddd; }
    .rules-list li strong { color: #fff; }

    .rank-section { background: rgba(20,20,20,0.6); padding: 25px; border-radius: 12px; border: 1px solid #333; margin: 20px 0; }
    .rank-section h4 { color: #d4af37; font-size: 22px; margin-top: 0; }
    .note { color: #ffab00; background: rgba(255, 171, 0, 0.1); padding: 15px; border-radius: 8px; font-size: 14px; margin-top: 15px; border: 1px dashed #ffab00; }

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
            <p style="line-height: 1.9; font-size: 18px; color: #eee;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </section>

        <h2 style="margin-top: 60px;">تجربتنا الفريدة</h2>
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
            <a href="/rules" class="btn-main btn-cfx-main" style="width: 350px; background: rgba(212,175,55,0.1); color: #d4af37;">
                <i class="fa-solid fa-book-open"></i> الانتقال إلى القوانين
            </a>
        </div>
    `));
});

app.get('/rules', (req, res) => {
    res.send(layout(`
        <div style="text-align: center; margin-bottom: 50px;">
            <h1 style="font-size: 45px; color: #d4af37; font-weight: 900;">قوانين مقاطعة سبارك</h1>
            <p style="color: #ccc;">يرجى قراءة القوانين والالتزام بها لضمان أفضل تجربة لعب</p>
        </div>

        <div class="rules-grid">
            <div class="rule-card" onclick="openModal('certified-player-modal')">
                <div class="icon-box" style="background-color: #d4af37;"><i class="fa-solid fa-user-check"></i></div>
                <div>
                    <h3 style="color: #fff; margin: 0; font-size: 24px;">قوانين لاعب معتمد</h3>
                    <p style="color: #999; font-size: 15px; margin-top: 8px;">تعريف اللاعب المعتمد، الشروط، ونظام الرتب</p>
                </div>
            </div>
        </div>

        <div id="certified-player-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('certified-player-modal')">&times;</span>
                <h2 style="color:#d4af37;"><i class="fa-solid fa-scroll"></i> قوانين اللاعب المعتمد</h2>
                
                <p style="background:rgba(212,175,55,0.1); padding:20px; border-right:5px solid #d4af37; border-radius: 8px; font-size: 18px; line-height: 1.8;">
                    <strong>اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة والتغير بين الوظائف بشكل دوري ومستمر.
                </p>
                
                <h3>القواعد الأساسية للاعب المعتمد</h3>
                <ul class="rules-list">
                    <li>1. حسن السمعة ولبق في تعاملك وأسلوبك مع اللاعبين.</li>
                    <li>2. التقديم على وظيفتين معتمدة على الأقل والتغير بينهم بشكل دوري والحرص على تطوير نفسك ومساندة زملائك في الوظيفة سواء كانت أساسية أو انتداب.</li>
                    <li>3. مساعدة اللاعبين في الدسكورد بشكل عام.</li>
                    <li>4. التمثيل بشكل جيد والالتزام في التمثيل الخاص في مدينة فرسان.</li>
                    <li>5. مساندة الوظائف المعتمدة الأخرى عند الضرورة.</li>
                </ul>

                <h3>🟢 شروط القبول في اللاعب المعتمد 🟢</h3>
                <ul class="rules-list">
                    <li>-1 [ عدم وجود مخالفات رقابية في أخر 30 يوم .]</li>
                    <li>-2 [ أن يكون المتقدم متفرغ لـ مهام اللاعب المعتمد بشكل عام .]</li>
                    <li>-3 [ يجب على المتقدم أن يتواجد في وظيفة معتمدة .]</li>
                    <li>-4 [ في حال تم إعفائك من مهام اللاعب المعتمد يمنع من دخولك إلا بعد 60 يوم من تاريخ خروجك .]</li>
                    <li>-5 [ السمعة الطيبة في الوظيفة وعدم وجود أي مخالفة وظيفية .]</li>
                    <li>-6 [ مساعدة اللاعبين في روم #الاستفسار-والمساعدة .]</li>
                    <li>-7 [ الرتبة المسموحة للوظائف العلمية ( مستوى 6) ]</li>
                    <li>-8 [ الرتبة المسموحة للوظائف العسكرية ( ملازم )]</li>
                    <li>-9 [ أن تكون خبرة المتقدم 36 فما فوق ]</li>
                    <li>-10 [ أن يكون المتقدم خالي من المخالفات أو السجلات الرقابية ]</li>
                    <li>-11 [ يجب التقيد بالانتداب بشكل أسبوعي لجميع الوظائف المدة المسموحة تبدأ من يوم إلى ٧ أيام]</li>
                    <li>-12 [ يمنع منعاً باتاً أثناء التقدم أو في حال امتلك الاعتماد أن تكون لاعب معتمد أو من طاقم إداري في مدن أخرى . ]</li>
                    <li>-13 [ يحق لمسؤول اللاعب المعتمد إعفاء أي لاعب في حال خالف أي بند يخص اللاعب المعتمد ]</li>
                    <li>* ملاحظة: في حال تم إغلاق التذكرة يعتبر الطلب تحت المعالجة وفي حال عدم القبول يعني أنك لم تكمل أحد الشروط.</li>
                </ul>

                <h3>شروط قبول اللاعب معتمد حسب الرتب</h3>
                <p>اللاعب المعتمد ينقسم إلى 3 رتب ولكل رتبة شروط وقوانين معينة:</p>

                <div class="rank-section">
                    <h4>1- رتبة [CP]</h4>
                    <p>يشترط للتقديم على اللاعب المعتمد والحصول على رتبة [CP] أن تكون موظفاً حكومياً ويُعرف عنك بحسن التعامل والسلوك بين اللاعبين. ويبدأ التقديم بعد وصولك إلى إحدى الرتب التالية بالقطاعات:</p>
                    <ul style="padding-right: 20px;">
                        <li>الشرطة: رتبة رقيب أول أو أعلى.</li>
                        <li>أمن المنشآت: رتبة رقيب أول أو أعلى.</li>
                        <li>الهلال الاحمر: مستوى 4 وأعلى.</li>
                    </ul>
                    <p>وبهذه الرتبة، يسمح لك بالتوظف ببقية القطاعات الحكومية والتنقل بينهم بعد طلب الإذن والسماح لك من قبل قائد قطاعك الأساسي وتوثيق الموافقة بالروم المخصص، ويجب أن يكون مرة واحدة على الأقل كل أسبوع.</p>
                </div>

                <div class="rank-section">
                    <h4>2- رتبة [CR]</h4>
                    <p>يتم الترشيح لهذه الرتبة من قبل الإدارة ومسؤول اللاعب المعتمد، والأولوية للستريمر وأصحاب السمعة الحسنة داخل المقاطعة.</p>
                    <p>يعتبر حامل هذه الرتبة مشرفاً على اللاعبين المعتمدين الأحدث منه. يسمح لحامل هذه الرتبة بالتنقل بين القطاعات الحكومية بحرية أو حسب الاحتياج عند وجود نقص بالعدد وبدون إذن مسبق، لكن لا يمكنك أخذ رتبة مواطن إلا بعد أخذ إجازة رسمية من القائد أو النائب ويتم الموافقة عليها، ومن ثم تعتبر إجازة داخلية يومين إلى ثلاث.</p>
                    <div class="note">ملاحظة: استكمالك لجميع الشروط أعلاه لا يعني ضمان قبولك. يكون القبول بعد استيفاء جميع الشروط من قبل مسؤول اللاعب المعتمد والإدارة. كذلك توجد مميزات ومكافآت مجزية ونادرة من قبل الإدارة تُمنح ولا تُطلب. في حال يوجد نقص في قطاع إجباري تتوجه بأسرع وقت.</div>
                </div>

                <div class="rank-section">
                    <h4>3- رتبة [CA]</h4>
                    <p>يتم الترشيح لهذه الرتبة من قبل الإدارة ومسؤول اللاعب المعتمد، والأولوية للستريمر وأصحاب السمعة الحسنة داخل المقاطعة.</p>
                    <p>يعتبر حامل هذه الرتبة مشرفاً على اللاعبين المعتمدين الأحدث منه. يسمح لحامل هذه الرتبة بالتنقل بين القطاعات الحكومية بحرية أو حسب الاحتياج عند وجود نقص بالعدد وبدون إذن مسبق.</p>
                    <div class="note">ملاحظة: استكمالك لجميع الشروط أعلاه لا يعني ضمان قبولك. يكون القبول بعد استيفاء جميع الشروط من قبل مسؤول اللاعب المعتمد والإدارة.</div>
                </div>

                <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
                    <p><strong>ملاحظات مهمة:</strong></p>
                    <ul class="rules-list">
                        <li>يحق لادارة الرقابة و التفتيش سحب الاعتماد بحال مخالفة قوانين مدينة سبارك أو مخالفة قوانين الوظائف المعتمدة.</li>
                        <li>يجب عليك التدرج في رتب الوظيفة المنتدب إليها.</li>
                        <li>يتم قبول ورفض الانتداب من قبل مسؤول اللاعب المعتمد.</li>
                    </ul>
                </div>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><div class="about-box"><p>جار العمل على تحديث القائمة...</p></div>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><div class="about-box"><p>المتجر سيفتح قريباً!</p></div>`)));

app.listen(3000, () => console.log('Spark Web Started!'));
