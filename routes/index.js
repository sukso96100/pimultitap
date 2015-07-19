var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('config.db');
var express = require('express');
var router = express.Router();
  // res.render('index', { title: 'RelaySwitch', state: config });
/* GET home page. */
router.get('/', function(req, res, next) {
db.serialize(function() {
  db.all("SELECT * FROM config", function(err, rows) {
    console.log(rows);
    rows = sortByKey(rows,"NUM");
     res.render('index', { title: 'RelaySwitch', state: rows });
   });
  });
});

router.get('/getinfo', function(req, res, next) {
  var fs;
  var infoConfigFile;
  infoConfigFile = '../config.json';
  fs = require('fs');
  var infoConfig = JSON.parse(
      fs.readFileSync(infoConfigFile)
  );

  res.send("infoConfig");
});

//Function that sorts an array of objects by key
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = router;
