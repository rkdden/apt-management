const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');
const authRouter = require('./auth/index');
const sensorRouter = require('./sensor/index');
const messageRouter = require('./message/index');
const chartRouter = require('./chart/index');

// /로 접속시 /login으로 보냄
router.get('/', (req, res) => {
    res.redirect('/login');
})
router.use('/common', commRouter);
router.get('/login', (req, res) => {
    res.render('login');
});
router.use('/auth', authRouter);
router.use('/chart', chartRouter);
router.use('/message', messageRouter);
router.use('/sensor', sensorRouter);


module.exports = router;
