const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');

router.use('/common', commRouter);

module.exports = router;
