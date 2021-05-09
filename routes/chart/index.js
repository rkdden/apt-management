
const express = require('express');
const router = express.Router();
const chartController = require('./chart.controller');

router.get('/', chartController.chartPage);

// 차트 상세 페이지
router.get('/detail', chartController.chartDetailPage);

module.exports = router;

