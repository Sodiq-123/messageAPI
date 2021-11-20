var express = require('express');
var router = express.Router();
var { createUser, loginUser, getUserById, deleteUser } = require('../controllers/users')

router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)

module.exports = router;
