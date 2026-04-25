const express = require('express');
const app = express();

const styles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    body { margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: white; direction: rtl; overflow-x: hidden; background-color: #000; }
    
    /* تحسين الخلفية لتعمل على كل الشاشات */
    .banner { 
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background-size: cover; 
        background-position: center; 
        background-attachment: fixed; 
        background-repeat: no-repeat;
        z-index: -1; 
        filter: brightness(0.5); /* تعتيم قليل لتوضيح النصوص */
    }

    .navbar { background: rgba(0, 0, 0, 0.85); padding: 10px 0; text-align: center; position: sticky; top: 0; backdrop-filter: blur(10px); border-bottom: 3px solid #e74c3c; z-index: 100; display: flex; justify-content: center; flex-wrap: wrap; }
    .navbar a { color: white; text-decoration: none; margin: 5px 12px; font-weight: bold; font-size: 14px; transition: 0.3s; padding: 6px 12px; border-radius: 5px; border: 1px solid transparent; }
    .navbar a:hover { background: #e74c3c; border-color: white; }
    
    .container { background: rgba(0, 0, 0, 0.8); max-width: 1000px; margin: 30px auto; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #333; }
    h1 { border-bottom: 2px solid #e74c3c; padding-bottom: 10px; color: #e74c3c; text-align: center; font-size: 28px; }
    h2 { color: #e74c3c; margin-top: 25px; border-right: 5px solid #e74c3c; padding-right: 15px; font-size: 22px; }
    
    .law-list { list-style: none; padding: 0; margin-top: 15px; }
    .law-list li { margin-bottom: 10px; font-size: 16px; line-height: 1.7; background: rgba(255,255,255,0.05); padding: 12px 18px; border-radius: 8px; border-right: 4px solid #e74c3c; transition: 0.2s; }
    .law-list li:hover { background: rgba(231, 76, 60, 0.1); transform: scale(1.01); }
    
    .footer-section { text-align: center; margin-top: 40px; padding-bottom: 20px; border-top: 1px solid #333; padding-top: 20px; }
    .server-invite { display: inline-block; background: #e74c3c; color: white; padding: 12px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; transition: 0.3s; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3); }
    .server-invite:hover { transform: translateY(-3px); background: #ff5e4d; box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5); }
    
    .copyright-text { display: inline-block; margin-top: 25px; font-size: 16px; font-weight: bold; background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 5s ease infinite; }
    @keyframes rainbow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
</style>
`;

// رابط الصورة الذي وضعته أنت (تم وضعه مباشرة في الخلفية)
const bgImage = 'https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&';

const renderPage = (title, content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - مقاطعة سبارك</title>
    ${styles}
</head>
<body>
    <div class="banner" style="background-image: url('${bgImage}');"></div>
    <nav class="navbar">
        <a href="/">القوانين العامة</a>
        <a href="/chat">قوانين الجريدة</a>
        <a href="/chase">المطاردات والقيادة</a>
        <a href="/safe">المناطق الآمنة</a>
        <a href="/police">قوانين الشرطة</a>
    </nav>
    <div class="container">
        <h1>${title} - مقاطعة سبارك</h1>
        ${content}
        <div class="footer-section">
            <a href="https://discord.gg/WvNpv4SH" class="server-invite" target="_blank">دخول مقاطعة سبارك</a>
            <br>
            <span class="copyright-text">جميع الحقوق محفوظة لمقاطعة سبارك</span>
        </div>
    </div>
</body>
</html>
`;

app.get('/', (req, res) => {
    const content = `
        <h2>القوانين الأساسية</h2>
        <ul class="law-list">
            <li>استخدام المركبة كسلاح ودهس اللاعبين (VDM)</li>
            <li>استخدام السلاح بشكل عشوائي و القتل بدون سبب (RDM)</li>
            <li>1 - يجب ان يكون اسمك في الهويه اسم اول و ثاني واقعي</li>
            <li>2-يمنع طلب المطاردة من العساكر او الترصد لقتلهم</li>
            <li>3- يمنع التواصل الغير شرعي (ميتارينغ) عقوبتها سجن 60 شهر</li>
            <li>4 - عدم الترصد للمواطنين عن طريق البث المباشر</li>
            <li>5 - يمنع السب و القذف و الشتم بجميع انواعة</li>
            <li>6 - يمنع التحدث في الراديو في حال كنت مقيد او تغوص تحت الماء</li>
            <li>7-يمنع الترصد للوظائف الحكومية لقتلهم ويجب ان يكون هناك سبب</li>
            <li>8-في حال قمت بتهديد شخص لطلب مبلغ مالي يجب ان لا يزيد عن 15الف</li>
            <li>9-يمنع سرقة جميع مركبات الوظائف المعتمدة</li>
            <li>10-يحق للرهينة الهروب في حال كان المجرم على غفله</li>
            <li>11-الاحترام المتبادل بين الجميع والالتزام بالتمثيل الواقعي</li>
            <li>12- يمنع المقاومه بعد الانعاش مباشرة</li>
            <li>13-يمنع اطلاق النار بوجود الهلال الاحمر</li>
            <li>14-يمنع تهديد او خطف موظفين الهلال الاحمر و كراج الميكانيكي</li>
            <li>15- يمنع الركوب بالشنطه في حال انك مواطن او مجرم</li>
            <li>16- يجب تقدير حياتك وحياة الاخرين (عدم تقدير الحياة = حظر 7 أيام)</li>
        </ul>`;
    res.send(renderPage('القوانين العامة', content));
});

app.get('/chat', (req, res) => {
    const content = `
        <h2>قوانين الجريدة [شات اللعبة]</h2>
        <ul class="law-list">
            <li>1- يمنع منعا باتا الكتابة في الجريدة / الشات إلا للتمثيل</li>
            <li>2- الشات مخصص للرسائل المهمة مثل حالة الخطر أو التوجيهات</li>
            <li>3- تويتر للإعلانات فقط ويمنع ذكر أي أمر آخر</li>
            <li>4- إدارة الرقابة تحاسب أي لاعب يخالف هذه الأنظمة</li>
        </ul>`;
    res.send(renderPage('قوانين الجريدة', content));
});

app.get('/chase', (req, res) => {
    const content = `
        <h2>يمنع أثناء مطاردتك من الأمن:</h2>
        <ul class="law-list">
            <li>1 - دخول المنزل / 2 - تخزين المركبة / 3- الصدم الغير واقعي</li>
            <li>4- القيادة الغير واقعية / 5- الهروب بالبحر بدون قارب مجهز</li>
        </ul>
        <h2>يمنع القيادة بشكل غير واقعي مثل:</h2>
        <ul class="law-list">
            <li>1 - تعمد المخالفات المروريه / 2 - طلوع اوفرود بمركبة غير مخصصة</li>
            <li>3 - الصدم العشوائي / 4 - عكس السير بشكل مستمر</li>
            <li>5 - تقطيع الاشارات المستمر حول العساكر / 6 - تعديل مركبة مقلوبة</li>
        </ul>`;
    res.send(renderPage('المطاردات والقيادة', content));
});

app.get('/safe', (req, res) => {
    const content = `
        <h2>المناطق الآمنة</h2>
        <ul class="law-list">
            <li>1 - المستشفيات و مراكز اشرطة و الحرس الحدود</li>
            <li>2 - معرض المركبات و الشاحنات</li>
            <li>3- مركز التوظيف و مكان استخراج رخص</li>
            <li>4 - حجز المركبات و الشاحنات</li>
            <li>5- مناطق العمل - الاخشاب - الدواجن - الاعناب الخ...</li>
        </ul>`;
    res.send(renderPage('المناطق الآمنة', content));
});

app.get('/police', (req, res) => {
    const content = `
        <h2>قوانين قطاع الشرطة</h2>
        <ul class="law-list">
            <li>يمنع استخدام السلاح الثقيل إلا بأمر من القيادة</li>
            <li>يجب احترام الرتب العسكرية داخل مقاطعة سبارك</li>
            <li>يمنع تفتيش أي مواطن بدون سبب قانوني واضح</li>
            <li>الالتزام التام بزي قطاع الشرطة الرسمي</li>
        </ul>`;
    res.send(renderPage('قوانين الشرطة', content));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Spark Server Ready!'); });
