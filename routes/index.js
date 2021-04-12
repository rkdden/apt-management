const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');
const sensorRouter = require('./sensor/index');

router.use('/common', commRouter);
router.use('/sensor', sensorRouter);

module.exports = router;
