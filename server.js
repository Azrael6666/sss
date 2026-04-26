const express = require('express');
const app = express();

const styles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    * { box-sizing: border-box; }
    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        overflow-x: hidden; background-color: #0d0d0d;
        /* الخلفية الخاصة بك مثبته ومغطية الشاشة */
        background-image: url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }
    
    /* طبقة تعتيم فوق الخلفية لتوضيح المحتوى */
    body::before {
        content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7); z-index: -1;
    }

    /* الهيدر والملاحة الذهبي والأسود */
    .navbar { 
        background: rgba(10, 10, 10, 0.9); padding: 15px 0; text-align: center; 
        position: sticky; top: 0; backdrop-filter: blur(10px); 
        border-bottom: 2px solid #d4af37; z-index: 100; display: flex; 
        justify-content: center; flex-wrap: wrap; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }
    .navbar a { 
        color: rgba(255,255,255,0.8); text-decoration: none; margin: 5px 15px; 
        font-weight: bold; font-size: 16px; transition: 0.3s; padding: 8px 15px; border-radius: 8px;
    }
    .navbar a:hover, .navbar a.active { color: #fff; background: rgba(212, 175, 55, 0.1); }
    .logo-text { font-size: 20px; font-weight: bold; color: #d4af37; margin-left: 20px; }

    .container { max-width: 1100px; margin: 40px auto; padding: 0 20px; padding-bottom: 50px; }
    
    /* قسم النبذة الجديد */
    .about-section { 
        background: rgba(20, 20, 20, 0.8); border-radius: 15px; padding: 30px; 
        margin-bottom: 40px; border: 1px solid rgba(212, 175, 55, 0.2); text-align: center;
    }
    .about-section h2 { color: #d4af37; font-size: 28px; margin-bottom: 15px; }
    .about-section p { color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.8; max-width: 800px; margin: 0 auto; }

    /* شبكة البطاقات (Cards Grid) */
    .cards-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;
    }
    
    .card {
        background: rgba(25, 25, 25, 0.9); border-radius: 15px; padding: 25px; 
        text-align: center; transition: 0.3s ease; border: 1px solid rgba(255,255,255,0.05);
        cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(212, 175, 55, 0.1); border-color: rgba(212, 175, 55, 0.3); }
    
    .card-icon-box {
        width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; 
        justify-content: center; font-size: 28px; margin-bottom: 18px; color: #fff;
    }
    
    /* ألوان الأيقونات من تصميم ريج */
    .icon-safe { background: #16a085; } /* اخضر - المناطق الآمنة */
    .icon-trusted { background: #8e44ad; } /* بنفسجي - اللاعب المعتمد */
    .icon-rules { background: #3498db; } /* ازرق - القوانين العامة */
    .icon-chase { background: #d35400; } /* برتقالي - المطاردات */
    .icon-journal { background: #2c3e50; } /* رمادي غامق - الجريدة */
    .icon-apply { background: #c0392b; } /* احمر - شروط القبول */

    .card h3 { margin: 0; font-size: 19px; color: #fff; margin-bottom: 8px; }
    .card p { margin: 0; font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; }
    
    /* الفوتر والأزرار المتحركة الاحترافية */
    .footer-section { text-align: center; margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); }
    .footer-buttons { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 20px; }
    
    /* الأزرار الفول - أحمر وأسود متحرك ونبض */
    .btn-animatedPulse {
        display: inline-block; padding: 12px 30px; text-decoration: none; border-radius: 50px;
        font-weight: bold; font-size: 16px; color: white; transition: 0.5s ease;
        background: linear-gradient(-45deg, #800000, #1a1a1a); /* أحمر غامق وأسود */
        background-size: 400% 400%; animation: gradientShift 3s ease infinite, pulse 2s infinite;
        border: 2px solid #800000; box-shadow: 0 4px 15px rgba(128, 0, 0, 0.3);
    }
    .btn-animatedPulse:hover {
        transform: translateY(-3px); background: linear-gradient(-45deg, #1a1a1a, #e74c3c); /* أحمر فاتح وأسود */
        background-size: 400% 400%; box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5); border-color: white;
    }

    @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); } 100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); } }

    .copyright-text { font-size: 13px; color: rgba(255,255,255,0.4); }
    
</style>
`;

const renderPage = (title, content, activePage) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - مقاطعة سبارك</title>
    ${styles}
</head>
<body>
    <nav class="navbar">
        <span class="logo-text">مقاطعة سبارك</span>
        <a href="/" class="${activePage === 'index' ? 'active' : ''}">الرئيسية</a>
        <a href="/safe" class="${activePage === 'safe' ? 'active' : ''}">المناطق الآمنة</a>
        <a href="/trusted" class="${activePage === 'trusted' ? 'active' : ''}">اللاعب المعتمد</a>
        <a href="/trusted-apply" class="${activePage === 'trustedApply' ? 'active' : ''}">شروط القبول</a>
    </nav>
    <div class="container">
        ${content}
        <div class="footer-section">
            <div class="footer-buttons">
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-animatedPulse">دخول المدينة</a>
                <a href="https://discord.gg/sp10" class="btn-animatedPulse" target="_blank">ديسكورد مقاطعة سبارك</a>
            </div>
            <span class="copyright-text">جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</span>
        </div>
    </div>
</body>
</html>
`;

// الصفحة الرئيسية (شبكة البطاقات الملونة)
app.get('/', (req, res) => {
    const content = `
        <div class="about-section">
            <h2>من نحن</h2>
            <p>نحن مجتمع رول بلاي عربي شغوف بتقديم تجربة واقعية، عادلة، وممتعة في مدينة افتراضية متكاملة الأنظمة، نضمن لك بيئة لعب نظيفة ودعماً فنياً متواصلاً.</p>
        </div>

        <h1 style="text-align: center; color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 30px;">قوانين مقاطعة سبارك</h1>
        <div class="cards-grid">
            <div class="card" onclick="window.location.href='/safe'">
                <div class="card-icon-box icon-safe">🛡️</div>
                <h3>المناطق الآمنة</h3>
                <p>القواعد الأساسية والأماكن التي يمنع فيها أي عمل غير قانوني.</p>
            </div>
            
            <div class="card" onclick="window.location.href='/trusted'">
                <div class="card-icon-box icon-trusted">🤝</div>
                <h3>اللاعب المعتمد</h3>
                <p>قوانين ومهام اللاعبين الحاصلين على صفة "معتمد".</p>
            </div>
            
            <div class="card" onclick="window.location.href='/trusted-apply'">
                <div class="card-icon-box icon-apply">📋</div>
                <h3>شروط قبول المعتمد</h3>
                <p>المتطلبات، الرتب، وكيفية التقديم للحصول على الاعتماد.</p>
            </div>
            
            <div class="card">
                <div class="card-icon-box icon-rules">📜</div>
                <h3>القوانين العامة</h3>
                <p>قريباً - القواعد الأساسية للعب والتمثيل داخل المدينة.</p>
            </div>
        </div>
    `;
    res.send(renderPage('الرئيسية', content, 'index'));
});

// اللاعب المعتمد
app.get('/trusted', (req, res) => {
    const content = `<div style="text-align:center; padding: 50px;"><h2>قوانين اللاعب المعتمد</h2><p>قريباً - سيتم عرض القوانين والمهام هنا.</p><a href="/" style="color:#d4af37; text-decoration:none;">&larr; العودة للرئيسية</a></div>`;
    res.send(renderPage('قوانين اللاعب المعتمد', content, 'trusted'));
});

// شروط القبول والرتب
app.get('/trusted-apply', (req, res) => {
    const content = `<div style="text-align:center; padding: 50px;"><h2>شروط القبول والرتب</h2><p>قريباً - سيتم عرض متطلبات التقديم هنا.</p><a href="/" style="color:#d4af37; text-decoration:none;">&larr; العودة للرئيسية</a></div>`;
    res.send(renderPage('شروط ورتب المعتمد', content, 'trustedApply'));
});

// المناطق الآمنة
app.get('/safe', (req, res) => {
    const content = `<div style="text-align:center; padding: 50px;"><h2>المناطق الآمنة</h2><p>قريباً - سيتم عرض قائمة الأماكن الآمنة هنا.</p><a href="/" style="color:#d4af37; text-decoration:none;">&larr; العودة للرئيسية</a></div>`;
    res.send(renderPage('المناطق الآمنة', content, 'safe'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Spark Web Reverted & Stylized!'); });
