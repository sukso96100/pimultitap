var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('switches', { title: 'RelaySwitch - Settings' });
});

module.exports = router;
