var config = require('../models/config');
var express = require('express');
var router = express.Router();
var Configs = config.db;
  // res.render('index', { title: 'RelaySwitch', state: config });
/* GET home page. */
router.get('/', function(req, res, next) {

  db.run("SELECT * FROM config", function(err, rows) {
   if(row != undefined){
     res.render('index', { title: 'RelaySwitch', state: rows });
   }
  });

});

//Function that sorts an array of objects by key
// function sortByKey(array, key) {
//   return array.sort(function(a, b) {
//     var x = a[key]; var y = b[key];
//     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//   });
// }

module.exports = router;
