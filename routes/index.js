const express = require('express');
const router = express.Router();

const commRouter = require('./comm/index');
const authRouter = require('./auth/index');
const electricityRouter = require('./electricity/index');

router.use('/common', commRouter);
router.use('/auth', authRouter);
router.use('/electricity', electricityRouter);

module.exports = router;
