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
sequelize.sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// json설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 실험용
app.post('/', async (req, res) => {
    // 동 생성
    // await AptDong.create({
    //     apt_dong: req.body.apt_dong,
    //     apt_complex: req.body.apt_complex,
    // });
    // 호 생성
    // await AptHo.create({
    //     apt_ho: req.body.apt_ho,
    //     sensor: req.body.sensor,
    //     apt_dong_id: req.body.apt_dong_id,
    // });
    // 센서 생성
    // await Sensor.create({
    //     temperature: req.body.temperature,
    //     humidity: req.body.humidity,
    //     room_type: req.body.roomType,
    //     electricity: req.body.electricity,
    //     apt_ho_id: req.body.apt_ho_id,
    // })
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});