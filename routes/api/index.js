const express = require('express');
const router = express.Router();
const weatherController = require('./weather.controller');

router.get('/weather/:city', weatherController.getWeatherInCity)

module.exports = router;
