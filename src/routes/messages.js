var express = require('express');
var router = express.Router();
var { sendMessageToContact, sendMessageToNumber } = require('../controllers/messages')
var { verifyToken } = require('../middleware/auth')

router.post('/send', verifyToken, sendMessageToNumber)
router.post('/send/:contactId', verifyToken, sendMessageToContact)

module.exports = router;
