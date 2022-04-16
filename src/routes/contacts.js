const express = require('express');
const router = express.Router();
const { createContact, getContactByName, getContacts, updateContact, deleteContact } = require('../controllers/contacts')
const { verifyToken } = require('../middleware/auth')

router.post('/create', verifyToken, createContact)
router.get('/:name', verifyToken, getContactByName)
router.delete('/:name', verifyToken, deleteContact)
router.get('/', verifyToken, getContacts)
router.patch('/update', verifyToken, updateContact)

module.exports = router;
