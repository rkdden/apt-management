const express = require('express');

const router = express.Router();
const sensorController = require('./sensor.controller');

router.post('/data', sensorController.selectAll);

module.exports = router;