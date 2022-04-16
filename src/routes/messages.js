const express = require('express');
const router = express.Router();
const { sendMessageToContact } = require('../controllers/messages')
const { verifyToken } = require('../middleware/auth')

router.post('/send/:name', verifyToken, sendMessageToContact)

module.exports = router;
