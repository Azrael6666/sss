const express = require('express');
const app = express();

const TEMPLATE_CSS = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    * { box-sizing: border-box; }
    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
    }

    /* الهيدر والملاحة (القائمة الرئيسية) */
    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 20px 8%; position: absolute; width: 100%; z-index: 1000;
        background: rgba(0,0,0,0.5); backdrop-filter: blur(5px);
    }
    .nav-links a { 
        color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s;
    }
    .nav-links a:hover { color: #d4af37; }
    .logo { 
        font-size: 24px; font-weight: bold; color: #d4af37; 
        display: flex; align-items: center; gap: 10px; text-decoration: none;
    }

    /* القسم الرئيسي (Hero Section) */
    .hero {
        height: 100vh;
        /* استخدام صورة سيارة مناسبة كخلفية */
        background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), 
                    url('https://images.wallpaperscraft.com/image/single/chevrolet_camaro_front_view_156230_1920x1080.jpg');
        background-size: cover; background-position: center;
        display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        padding: 0 20px;
    }
    .hero h1 { font-size: 50px; margin-bottom: 10px; color: #fff; }
    .hero p { font-size: 18px; color: rgba(255,255,255,0.8); max-width: 700px; margin-bottom: 30px; }
    
    .btn-discord {
        background: #d4af37; color: #000; padding: 12px 40px; border-radius: 5px;
        text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    }
    .btn-discord:hover { background: #fff; transform: translateY(-3px); }

    /* قسم المميزات (التجربة الفريدة) */
    .features-section { padding: 80px 8%; text-align: center; background: #0d0d0d; }
    .features-section h2 { font-size: 32px; margin-bottom: 40px; color: #d4af37; }
    .features-grid { 
        display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; 
    }
    .f-card {
        background: rgba(255,255,255,0.03); border: 1px solid rgba(212, 175, 55, 0.1);
        padding: 40px; border-radius: 10px; transition: 0.3s; text-align: center;
    }
    .f-card:hover { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); transform: translateY(-10px); }
    .f-card i { font-size: 40px; color: #d4af37; margin-bottom: 20px; display: block; }
    .f-card h3 { margin-bottom: 15px; font-size: 22px; color: #fff; }
    .f-card p { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; }

    footer { padding: 40px; text-align: center; border-top: 1px solid #222; color: #555; font-size: 14px; background: #0d0d0d; }
</style>
`;

const renderLayout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة ريج - رول بلاي</title>
    ${TEMPLATE_CSS}
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">
            <img src="https://example.com/your-logo.png" width="40" alt="" onerror="this.style.display='none'"> 
            مقاطعة ريج
        </a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/safe">القوانين</a>
            <a href="/trusted">الوظائف</a>
            <a href="/chat">الإعلام</a>
            <a href="#">متجر ريج</a>
        </div>
    </nav>

    ${content}

    <footer>جميع الحقوق محفوظة لمقاطعة ريج &copy; 2026</footer>
</body>
</html>
`;

// الصفحة الرئيسية (القائمة الرئيسية)
app.get('/', (req, res) => {
    const homeContent = `
    <section class="hero">
        <h1>مرحباً بك في رول بلاي مقاطعة ريج</h1>
        <p>انضم إلى مجتمعنا واستمتع بتجربة واقعية فريدة في مدينة افتراضية متكاملة الخدمات والأنظمة.</p>
        <a href="https://discord.gg/yourserver" class="btn-discord" target="_blank">انضم الآن عبر Discord</a>
    </section>

    <section id="features" class="features-section">
        <p style="color: #d4af37; font-weight: bold; margin-bottom: 10px;">نحن نوفر لك أفضل تجربة</p>
        <h2>تجربتنا الفريدة</h2>
        <div class="features-grid">
            <div class="f-card">
                <i>👤</i> <h3>مجتمع نشط</h3>
                <p>انضم إلى مجتمع عربي متفاعل، كون صداقات جديدة وابدأ قصتك الخاصة.</p>
            </div>
            <div class="f-card">
                <i>🛡️</i> <h3>نظام أمني متطور</h3>
                <p>قوانين واضحة وإدارة فاعلة تضمن لك بيئة لعب عادلة وممتعة للجميع.</p>
            </div>
            <div class="f-card">
                <i>💼</i> <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div class="f-card">
                <i>📡</i> <h3>تجربة واقعية</h3>
                <p>استمتع بتجربة رول بلاي احترافية مبنية على أعلى المعايير الواقعية.</p>
            </div>
        </div>
    </section>
    `;
    res.send(renderLayout(homeContent));
});

// المسارات الأخرى (يمكنك حذفها إذا لم تكن بحاجة إليها الآن)
app.get('/safe', (req, res) => {
    const safeContent = `<div style="padding: 150px; text-align: center;"><h1>القوانين</h1><p>سيتم عرض القوانين هنا قريباً.</p></div>`;
    res.send(renderLayout(safeContent));
});
app.get('/trusted', (req, res) => {
    const trustedContent = `<div style="padding: 150px; text-align: center;"><h1>الوظائف</h1><p>سيتم عرض قائمة الوظائف هنا قريباً.</p></div>`;
    res.send(renderLayout(trustedContent));
});
app.get('/chat', (req, res) => {
    const chatContent = `<div style="padding: 150px; text-align: center;"><h1>الإعلام</h1><p>سيتم عرض أخبار الإعلام هنا قريباً.</p></div>`;
    res.send(renderPage(chatContent));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('SparkWeb Live! SparkWeb Live!'); });
