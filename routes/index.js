var configdb = require('../models/config');
var express = require('express');
var router = express.Router();
var Configs = configdb.Configs;
var ConfigsArray = [];
  // res.render('index', { title: 'RelaySwitch', state: config });
/* GET home page. */
router.get('/', function(req, res, next) {


  //Check if DB Table is empty
  Configs.findAll({ limit: 8 }).then(function(configs) {
  // projects will be an array of all Project instances
  res.render('index', { title: 'RelaySwitch', state: configs });
  });

});

//Function that sorts an array of objects by key
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = router;
