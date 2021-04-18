const express = require('express');
const axios = require('axios');
const messageController = require('./message.controller');
const router = express.Router();

router.get('/send', messageController.sendMessage);

module.exports = router;