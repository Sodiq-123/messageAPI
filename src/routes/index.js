var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Welcome to the API'
  });
});

module.exports = router;
