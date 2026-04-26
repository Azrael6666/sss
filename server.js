const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    * { box-sizing: border-box; }
    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
        /* الخلفية الخاصة بك مع تثبيت وتعتيم احترافي */
        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }

    /* الهيدر */
    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 15px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    .logo { font-size: 24px; font-weight: bold; color: #d4af37; text-decoration: none; }

    .hero {
        height: 60vh; display: flex; flex-direction: column; justify-content: center; 
        align-items: center; text-align: center; padding: 0 20px;
    }
    .hero h1 { font-size: 48px; margin-bottom: 10px; color: #d4af37; }

    /* قسم النبذة */
    .about-box {
        background: rgba(20, 20, 20, 0.8); border: 1px solid rgba(212, 175, 55, 0.2);
        padding: 40px; border-radius: 15px; margin: -50px auto 50px; max-width: 900px; text-align: center;
    }
    .about-box h2 { color: #d4af37; margin-bottom: 15px; font-size: 28px; }
    .about-box p { line-height: 1.8; color: #ccc; font-size: 17px; }

    /* قسم تجربتنا */
    .experience-section { padding: 50px 8%; text-align: center; }
    .experience-section h2 { font-size: 30px; margin-bottom: 40px; color: #fff; position: relative; }
    .experience-section h2::after { content: ""; display: block; width: 60px; height: 3px; background: #d4af37; margin: 10px auto; }
    
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .card {
        background: rgba(25, 25, 25, 0.7); border: 1px solid rgba(255,255,255,0.05);
        padding: 30px; border-radius: 12px; transition: 0.3s;
    }
    .card:hover { border-color: #d4af37; transform: translateY(-5px); }
    .card i { font-size: 35px; color: #d4af37; margin-bottom: 15px; display: block; }
    .card h3 { font-size: 20px; margin-bottom: 10px; }
    .card p { font-size: 14px; color: #aaa; }

    /* أزرار الأكشن */
    .btn-gold {
        background: #d4af37; color: #000; padding: 12px 35px; border-radius: 5px;
        text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-block;
    }
    .btn-gold:hover { background: #fff; transform: scale(1.05); }

    .btn-outline {
        border: 2px solid #d4af37; color: #d4af37; padding: 10px 30px; border-radius: 5px;
        text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-block;
        margin-top: 20px;
    }
    .btn-outline:hover { background: #d4af37; color: #000; }

    footer { padding: 30px; text-align: center; background: rgba(10,10,10,0.9); border-top: 1px solid #222; color: #666; font-size: 13px; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة ريج</title>
    ${STYLES}
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">مقاطعة سبارك </a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/rules">القوانين</a>
            <a href="#">الوظائف</a>
            <a href="#">متجر ريج</a>
        </div>
    </nav>
    ${content}
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

app.get('/', (req, res) => {
    const home = `
    <section class="hero">
        <h1>مرحباً بك في مقاطعة سبارك </h1>
        <p>عالم من الواقعية والاحترافية بانتظارك</p>
        <a href="https://discord.gg/sp10" class="btn-gold">انضم الآن عبر Discord</a>
    </section>

    <section class="about-box">
        <h2>من نحن</h2>
        <p>نحن مجتمع رول بلاي متكامل يسعى لتقديم أفضل تجربة واقعية للاعب العربي. نتميز بأنظمة برمجية فريدة، إدارة عادلة، وبيئة لعب نظيفة تضمن لك الاستمتاع بكل لحظة تقضيها داخل المدينة.</p>
    </section>

    <section class="experience-section">
        <h2>تجربتنا الفريدة</h2>
        <div class="grid">
            <div class="card"><i>🛡️</i><h3>نظام أمني</h3><p>حماية متكاملة وقوانين صارمة لضمان جودة التمثيل.</p></div>
            <div class="card"><i>💼</i><h3>وظائف متنوعة</h3><p>أكثر من 20 وظيفة مختلفة بانتظارك لتبدأ مسيرتك.</p></div>
            <div class="card"><i>🤝</i><h3>مجتمع متفاعل</h3><p>الاف اللاعبين النشطين يومياً لخلق قصص لا تنسى.</p></div>
            <div class="card"><i>🚀</i><h3>تحديثات مستمرة</h3><p>نعمل دائماً على إضافة ميزات جديدة وحصرية للمدينة.</p></div>
        </div>
        
        <a href="/rules" class="btn-outline">اطلع على القوانين</a>
    </section>
    `;
    res.send(layout(home));
});

app.get('/rules', (req, res) => {
    const rules = `
    <div style="padding: 100px 8%; text-align: center;">
        <h1 style="color: #d4af37;">قوانين مقاطعة سبارك</h1>
        <p>هنا سيتم عرض كافة القوانين والأنظمة المعمول بها.</p>
        <a href="/" style="color: #d4af37; text-decoration: none;">&larr; العودة للرئيسية</a>
    </div>
    `;
    res.send(layout(rules));
});

app.listen(3000, () => console.log('Rage Web is Running!'));
