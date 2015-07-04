var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Config = mongoose.model('Config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RelaySwitch' });
});

module.exports = router;
