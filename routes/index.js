const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');
const authRouter = require('./auth/index');
const sensorRouter = require('./sensor/index');
const messageRouter = require('./message/index');
const chartRouter = require('./chart/index');

// /로 접속시 /login으로 보냄
// 완료
router.get('/', (req, res) => {
    res.redirect('/login');
});
// 완료
router.use('/common', commRouter);
// 완료
router.get('/login', (req, res) => {
    res.render('login');
});
// 진행중
router.use('/auth', authRouter);
// 진행중
router.use('/chart', chartRouter);
// 완료
router.use('/message', messageRouter);
// 
router.use('/sensor', sensorRouter);


module.exports = router;
