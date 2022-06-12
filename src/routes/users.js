const express = require('express');
const router = express.Router();
const { createUser, loginUser, deleteUserAccount, getMessages } = require('../controllers/users');
const { verifyToken } = require('../middleware/auth');

router.post('/create', createUser)
router.post('/login', loginUser)
router.delete('/delete-account', verifyToken, deleteUserAccount)
router.get('/get-sent-messages', verifyToken, getMessages)

module.exports = router;
