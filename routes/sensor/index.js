const express = require('express');
const router = express.Router();
const sensorController = require('./sensor.controller');

router.get('/data', sensorController.mainData);

router.post('/data/detail', sensorController.detailData);

module.exports = router;