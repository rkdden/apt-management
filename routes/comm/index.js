const express = require('express');

const router = express.Router();
const commonController = require('./comm.controller');

router.head('/alive/server', commonController.alive);

module.exports = router;
