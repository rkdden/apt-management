const express = require('express');
const {initialize, config} = require('./initialize');
const {swaggerConfig, swaggerUIServe, swaggerUiSetup} = require('./docs/swagger');
const dotenv = require('dotenv');
const router = require('./routes');
dotenv.config();
const app = express();
//시퀄라이즈
// const { sequelize } = require('./models');
// const AptDong = require('./models/aptDong');
// const AptHo = require('./models/aptHo');
// const Sensor = require('./models/sensor');


// 시퀄라이즈 설정
// sequelize.sync({force: true})
//     .then(() => {
//         console.log('데이터베이스 연결 성공');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

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
app.use(`/api/v1`, router);

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});
