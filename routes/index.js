const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');
const authRouter = require('./auth/index');
const sensorRouter = require('./sensor/index');
const messageRouter = require('./message/index');

router.use('/common', commRouter);
router.use('/auth', authRouter);
router.use('/sensor', sensorRouter);
router.use('/message', messageRouter);

module.exports = router;
