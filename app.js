const express = require('express');
const session = require('express-session');
const {initialize, config} = require('./initialize');
const {swaggerConfig, swaggerUIServe, swaggerUiSetup} = require('./docs/swagger');
const dotenv = require('dotenv');
const passport = require('passport');
const router = require('./routes');
dotenv.config();

const app = express();
const passportConfig = require('./passport');

passportConfig();
/**
 * initialize
 */
initialize();

/**
 * Set SwaggerConfig
 */
const swaggerDoc = swaggerConfig();
app.use(`/api-docs`, swaggerUIServe, swaggerUiSetup(swaggerDoc));

// 포트번호
app.set('port', config.comm.nodePort || 3000);

// json설정
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(`/api/v1`, router);
// app.post('/hi', async (req, res) => {
//     try {
//         // 동 만들기
//         // await AptDong.create({
//         //     apt_dong: req.body.apt_dong,
//         //     apt_complex: req.body.apt_complex
//         // })
//         const dongId = await AptDong.findOne({ where: { id: 1}});
//         // console.log(dongId.id);
//         // 호 만들기
//         await AptHo.create({
//             apt_ho: req.body.apt_ho,
//             sensor: true,
//             AptDongId: dongId.id,
//         });
//         res.send("OK");
//     } catch (error) {
//         console.error(error);
//     }
// });



app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});
