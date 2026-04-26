const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    * { box-sizing: border-box; scroll-behavior: smooth; }
    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), 
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
    .logo { font-size: 26px; font-weight: bold; color: #d4af37; text-decoration: none; text-shadow: 0 0 10px rgba(212,175,55,0.5); }

    .content-area { padding: 40px 8%; text-align: center; }
    
    .hero { height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
    .hero h1 { font-size: 60px; margin-bottom: 15px; color: #d4af37; text-shadow: 0 0 30px rgba(212,175,55,0.4); }
    .hero p { font-size: 20px; margin-bottom: 30px; color: #eee; }
    
    .hero-btns { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    
    .btn-main {
        padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; 
        font-size: 18px; transition: 0.3s; min-width: 220px; text-align: center;
    }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; }
    .btn-discord:hover { background: transparent; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(88, 101, 242, 0.4); }
    
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; }
    .btn-cfx-main:hover { background: transparent; color: #d4af37; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4); }

    .about-box {
        background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(212, 175, 55, 0.2);
        padding: 40px; border-radius: 15px; margin: 40px auto; max-width: 900px;
    }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0; }
    .card {
        background: rgba(25, 25, 25, 0.85); border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 35px; border-radius: 15px; transition: 0.3s;
    }
    .card:hover { border-color: #d4af37; transform: translateY(-10px); }
    .card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block; }
    .card h3 { color: #fff; margin-bottom: 12px; }
    .card p { color: #ccc; font-size: 15px; line-height: 1.6; }

    /* تنسيقات زر وقائمة القوانين */
    .rules-container { text-align: right; }
    .toggle-btn {
        background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37;
        padding: 15px 25px; font-size: 18px; font-weight: bold; border-radius: 8px; 
        cursor: pointer; width: 100%; text-align: right; display: flex; 
        justify-content: space-between; align-items: center; font-family: 'Cairo', sans-serif;
        transition: 0.3s; margin-bottom: 15px;
    }
    .toggle-btn:hover { background: #d4af37; color: #000; }
    
    .rules-content {
        display: none; background: rgba(0, 0, 0, 0.5); padding: 25px; 
        border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2); 
        margin-bottom: 20px; text-align: right; line-height: 1.8;
    }
    .rules-content h3 { color: #d4af37; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 25px; }
    .rules-content p.def { font-size: 17px; background: rgba(212,175,55,0.1); padding: 15px; border-right: 4px solid #d4af37; border-radius: 5px; }
    .rules-list { list-style: none; padding: 0; }
    .rules-list li { background: rgba(255,255,255,0.03); margin: 8px 0; padding: 12px 15px; border-radius: 5px; border-right: 3px solid #555; transition: 0.2s; }
    .rules-list li:hover { border-right-color: #d4af37; background: rgba(255,255,255,0.06); }
    .rank-box { background: rgba(25,25,25,0.8); border: 1px solid #333; padding: 15px; margin: 15px 0; border-radius: 8px; }
    .rank-box h4 { color: #d4af37; margin-top: 0; font-size: 18px; }

    footer { padding: 40px; text-align: center; background: rgba(10,10,10,0.95); border-top: 1px solid #222; color: #777; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك</title>
    ${STYLES}
    <script>
        function toggleRules(id) {
            var el = document.getElementById(id);
            if (el.style.display === "block") {
                el.style.display = "none";
            } else {
                el.style.display = "block";
            }
        }
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
    <div class="content-area">
        ${content}
    </div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(layout(`
        <section class="hero">
            <h1>مقاطعة سبارك</h1>
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا</p>
            <div class="hero-btns">
                <a href="https://discord.gg/sp10" class="btn-main btn-discord" target="_blank">انضم إلى الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main">الدخول إلى المقاطعة</a>
            </div>
        </section>
        
        <section class="about-box">
            <h2 style="color: #d4af37;">عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </section>

        <h2 style="margin-top: 60px;">تجربتنا الفريدة</h2>
        <div class="grid">
            <div class="card">
                <i>💼</i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div class="card">
                <i>🛡️</i>
                <h3>نظام العساكر المتطور</h3>
                <p>لدينا نظام عسكري متطور من المركبات والمراكز الحكومية والملابس الحصرية.</p>
            </div>
            <div class="card">
                <i>🤝</i>
                <h3>مجتمع نشط</h3>
                <p>لدينا طاقم إدارة متفاعل {انضم إلى مجتمع عربي متفاعل ومتواجد}</p>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1 style="color:#d4af37;">الوظائف المتاحة</h1><div class="about-box"><p>جار العمل على وظائف مقاطعة سبارك .</p></div>`)));
app.get('/store', (req, res) => res.send(layout(`<h1 style="color:#d4af37;">متجر مقاطعة سبارك</h1><div class="about-box"><p>جار العمل على متجر مقاطعة سبارك .</p></div>`)));

// مسار القوانين الجديد المحدث
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="color:#d4af37;">القوانين والأنظمة</h1>
        
        <div class="about-box rules-container">
            <button class="toggle-btn" onclick="toggleRules('certified-player')">
                <span>قوانين لاعب معتمد</span>
                <span>▼</span>
            </button>
            
            <div id="certified-player" class="rules-content">
                <p class="def"><strong>اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة والتغيير بين الوظائف بشكل دوري ومستمر.</p>
                
                <h3>القوانين العامة للاعب المعتمد</h3>
                <ul class="rules-list">
                    <li>1. حسن السمعة ولبق في تعاملك وأسلوبك مع اللاعبين.</li>
                    <li>2. التقديم على وظيفتين معتمدة على الأقل والتغيير بينهم بشكل دوري والحرص على تطوير نفسك ومساندة زملائك في الوظيفة سواء كانت أساسية أو انتداب.</li>
                    <li>3. مساعدة اللاعبين في الديسكورد بشكل عام.</li>
                    <li>4. التمثيل بشكل جيد والالتزام في التمثيل الخاص في المدينة.</li>
                    <li>5. مساندة الوظائف المعتمدة الأخرى عند الضرورة.</li>
                </ul>

                <h3>🟢 شروط القبول في اللاعب المعتمد 🟢</h3>
                <ul class="rules-list">
                    <li>1. عدم وجود مخالفات رقابية في أخر 30 يوم.</li>
                    <li>2. أن يكون المتقدم متفرغ لمهام اللاعب المعتمد بشكل عام.</li>
                    <li>3. يجب على المتقدم أن يتواجد في وظيفة معتمدة.</li>
                    <li>4. في حال تم إعفاؤك من مهام اللاعب المعتمد يمنع من دخولك إلا بعد 60 يوم من تاريخ خروجك.</li>
                    <li>5. السمعة الطيبة في الوظيفة وعدم وجود أي مخالفة وظيفية.</li>
                    <li>6. مساعدة اللاعبين في روم #الاستفسار-والمساعدة.</li>
                    <li>7. الرتبة المسموحة للوظائف العلمية (مستوى 6).</li>
                    <li>8. الرتبة المسموحة للوظائف العسكرية (ملازم).</li>
                    <li>9. أن تكون خبرة المتقدم 36 فما فوق.</li>
                    <li>10. أن يكون المتقدم خالي من المخالفات أو السجلات الرقابية.</li>
                    <li>11. يجب التقيد بالانتداب بشكل أسبوعي لجميع الوظائف، المدة المسموحة تبدأ من يوم إلى ٧ أيام.</li>
                    <li>12. يمنع منعاً باتاً أثناء التقدم أو في حال امتلاك الاعتماد أن تكون لاعب معتمد أو من طاقم إداري في مدن أخرى.</li>
                    <li>13. يحق لمسؤول اللاعب المعتمد إعفاء أي لاعب في حال خالف أي بند يخص اللاعب المعتمد.</li>
                    <li>14. في حال تم إغلاق التذكرة يعتبر الطلب تحت المعالجة وفي حال عدم القبول يعني أنك لم تكمل أحد الشروط.</li>
                </ul>

                <h3>ملاحظات هامة</h3>
                <ul class="rules-list">
                    <li> يحق لإدارة الرقابة والتفتيش سحب الاعتماد بحال مخالفة قوانين المدينة أو مخالفة قوانين الوظائف المعتمدة.</li>
                    <li> يجب عليك التدرج في رتب الوظيفة المنتدب إليها.</li>
                    <li> يتم قبول ورفض الانتداب من قبل مسؤول اللاعب المعتمد.</li>
                </ul>

                <h3>شروط قبول اللاعب المعتمد حسب الرتب</h3>
                <p>اللاعب المعتمد ينقسم إلى 3 رتب ولكل رتبة شروط وقوانين معينة:</p>

                <div class="rank-box">
                    <h4>1- رتبة [CP]</h4>
                    <p>يشترط للتقديم على اللاعب المعتمد والحصول على رتبة [CP] أن تكون موظفاً حكومياً ويُعرف عنك بحسن التعامل والسلوك بين اللاعبين. ويبدأ التقديم بعد وصولك إلى إحدى الرتب التالية بالقطاعات:</p>
                    <ul>
                        <li>الشرطة: رتبة رقيب أول أو أعلى.</li>
                        <li>أمن المنشآت: رتبة رقيب أول أو أعلى.</li>
                        <li>الهلال الأحمر: مستوى 4 وأعلى.</li>
                    </ul>
                    <p>وبهذه الرتبة، يسمح لك بالتوظف ببقية القطاعات الحكومية والتنقل بينهم بعد طلب الإذن والسماح لك من قبل قائد قطاعك الأساسي وتوثيق الموافقة بالروم المخصص، ويجب أن يكون مرة واحدة على الأقل كل أسبوع.</p>
                </div>

                <div class="rank-box">
                    <h4>2- رتبة [CR]</h4>
                    <p>يتم الترشيح لهذه الرتبة من قبل الإدارة ومسؤول اللاعب المعتمد، والأولوية للستريمر وأصحاب السمعة الحسنة داخل المقاطعة.</p>
                    <p>يعتبر حامل هذه الرتبة مشرفاً على اللاعبين المعتمدين الأحدث منه. يسمح لحامل هذه الرتبة بالتنقل بين القطاعات الحكومية بحرية أو حسب الاحتياج عند وجود نقص بالعدد وبدون إذن مسبق، لكن لا يمكنك أخذ رتبة مواطن إلا بعد أخذ إجازة رسمية من القائد أو النائب ويتم الموافقة عليها، ومن ثم تعتبر إجازة داخلية يومين إلى ثلاث.</p>
                    <p style="color: #ff9800;">ملاحظة: استكمالك لجميع الشروط أعلاه لا يعني ضمان قبولك. يكون القبول بعد استيفاء جميع الشروط من قبل مسؤول اللاعب المعتمد والإدارة. كذلك توجد مميزات ومكافآت مجزية ونادرة من قبل الإدارة تُمنح ولا تُطلب. في حال يوجد نقص في قطاع إجباري تتوجه بأسرع وقت.</p>
                </div>

                <div class="rank-box">
                    <h4>3- رتبة [CA]</h4>
                    <p>يتم الترشيح لهذه الرتبة من قبل الإدارة ومسؤول اللاعب المعتمد، والأولوية للستريمر وأصحاب السمعة الحسنة داخل المقاطعة.</p>
                    <p>يعتبر حامل هذه الرتبة مشرفاً على اللاعبين المعتمدين الأحدث منه. يسمح لحامل هذه الرتبة بالتنقل بين القطاعات الحكومية بحرية أو حسب الاحتياج عند وجود نقص بالعدد وبدون إذن مسبق.</p>
                    <p style="color: #ff9800;">ملاحظة: استكمالك لجميع الشروط أعلاه لا يعني ضمان قبولك. يكون القبول بعد استيفاء جميع الشروط من قبل مسؤول اللاعب المعتمد والإدارة. كذلك توجد مميزات ومكافآت مجزية ونادرة من قبل الإدارة تُمنح ولا تُطلب.</p>
                </div>

            </div>
        </div>
    `));
});

app.listen(3000, () => console.log('Spark Web Updated!'));
