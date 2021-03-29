const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

//시퀄라이즈
const { sequelize } = require('./models');
const AptDong = require('./models/aptDong');
const AptHo = require('./models/aptHo');
const Sensor = require('./models/sensor');


const app = express();

// 포트번호
app.set('port', process.env.PORT || 3000);

// 시퀄라이즈 설정
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// json설정
app.use(express.json());

// 실험용
app.get('/', async (req, res) => {
    await AptDong.create({
        aptDong: req.body.dong,
        aptComplex: req.body.complex,
    })
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});