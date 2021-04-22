const express = require('express');
const router = express.Router();
const sensorController = require('./sensor.controller');

router.get('/data', sensorController.selectAll);

// 차트 상세 페이지 데이터 해야함
// router.get('/data/detail', sensorController.selectAll);

module.exports = router;