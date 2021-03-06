const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');
const authRouter = require('./auth/index');
const sensorRouter = require('./sensor/index');
const messageRouter = require('./message/index');
const chartRouter = require('./chart/index');
const apiRouter = require('./api/index');

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

router.use('/api', apiRouter);


module.exports = router;
