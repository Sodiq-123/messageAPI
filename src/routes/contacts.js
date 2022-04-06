var express = require('express');
var router = express.Router();
var { createContact, getContactByName, getContacts, updateContact, deleteContact } = require('../controllers/contacts')
var { verifyToken } = require('../middleware/auth')

router.post('/create', verifyToken, createContact)
router.get('/:name', verifyToken, getContactByName)
router.delete('/:name', verifyToken, deleteContact)
router.get('/', verifyToken, getContacts)
router.patch('/update', verifyToken, updateContact)

module.exports = router;
