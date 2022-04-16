const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Welcome to the API'
  });
});

module.exports = router;
