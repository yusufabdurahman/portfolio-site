var express = require('express');
var router = express.Router();

/* GET users listing. (Default file created by express-generator.) */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
