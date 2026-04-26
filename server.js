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
    
    /* الهيرو مع الزرين */
    .hero { height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
    .hero h1 { font-size: 60px; margin-bottom: 15px; color: #d4af37; text-shadow: 0 0 30px rgba(212,175,55,0.4); }
    .hero p { font-size: 20px; margin-bottom: 30px; color: #eee; }
    
    .hero-btns { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    
    /* أزرار الهيرو */
    .btn-main {
        padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; 
        font-size: 18px; transition: 0.3s; min-width: 220px; text-align: center;
    }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; }
    .btn-discord:hover { background: transparent; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(88, 101, 242, 0.4); }
    
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; }
    .btn-cfx-main:hover { background: transparent; color: #d4af37; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4); }

    /* بقية التنسيقات */
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
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا  </p>
            <div class="hero-btns">
                <a href="https://discord.gg/sp10" class="btn-main btn-discord" target="_blank">انضم إلى الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main">الدخول إلى المقاطعة</a>
            </div>
        </section>
        
        <section class="about-box">
            <h2 style="color: #d4af37;">عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </section>

        <h2 style="margin-top: 60px;">مميزاتنا</h2>
        <div class="grid">
            <div class="card"><i>🛡️</i><h3>حماية شاملة</h3><p>نظام أمان متقدم يضمن تجربة عادلة للجميع.</p></div>
            <div class="card"><i>💼</i><h3>وظائف حقيقية</h3><p>تنوع كبير في الوظائف الحكومية والخاصة.</p></div>
            <div class="card"><i>🚗</i><h3>مركبات حصرية</h3><p>سيارات واقعية بلمسات سبارك الخاصة.</p></div>
        </div>
    `));
});

// المسارات الإضافية
app.get('/jobs', (req, res) => res.send(layout(`<h1 style="color:#d4af37;">الوضائف المتاحة</h1><div class="about-box"><p>جار العمل على قوانين مقاطعة سبارك .</p></div>`)));
app.get('/store', (req, res) =>res.send(layout(`<h1 style="color:#d4af37;">متجر مقاطعة سبارك</h1><div class="about-box"><p>جار العمل على قوانين مقاطعة سبارك .</p></div>`)));
app.get('/rules', (req, res) => res.send(layout(`<h1 style="color:#d4af37;">القوانين</h1><div class="about-box"><p>جار العمل على قوانين مقاطعة سبارك .</p></div>`)));

app.listen(3000, () => console.log('Spark Web Updated!'));
