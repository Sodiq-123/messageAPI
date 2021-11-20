var express = require('express');
var router = express.Router();
var { createContact, getContactById, getContacts, updateContact, deleteContact } = require('../controllers/contacts')
var { verifyToken } = require('../middleware/auth')

router.post('/create', verifyToken, createContact)
router.get('/:id', verifyToken, getContactById)
router.delete('/:id', verifyToken, deleteContact)
router.get('/', verifyToken, getContacts)
router.patch('/update', verifyToken, updateContact)

module.exports = router;
