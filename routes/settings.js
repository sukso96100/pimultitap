var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('config.db');
var express = require('express');
var router = express.Router();
var gpio = require('../gpio/gpio');
var gpios = gpio.gpios;
//DB

/* GET Settings page. */
router.get('/', function(req, res, next) {
  //Query Config
  console.log("Querying Config from DB");
  db.serialize(function() {
    db.all("SELECT * FROM config", function(err, rows) {
      console.log(rows);
      rows = sortByKey(rows,"NUM");
       res.render('settings', { title: 'RelaySwitch', state: rows });
     });
    });
});

router.get('/load/:num', function(req, res, next) {
  var reqnum = req.params.num;
  console.log(reqnum);

  db.serialize(function() {
    db.get("SELECT * FROM config WHERE NUM="+reqnum, function(err, row) {
      console.log(row);
       res.send(row);
     });
    });

  // Query Config
  console.log("Querying Config from DB");
  // Configs.findOne({where: {num: reqnum}})
  //   .then(function(config) {
  //     res.send(config);
  //   });
});

router.post('/save/:num', function(req, res, next) {
    console.log("POST /save/ Request");
    var reqnum = req.params.num;
    console.log(reqnum);
    var reqdata = req.body;
    console.log(reqdata);
    var stateboolean;
    if(reqdata.state==false){
      stateboolean = 0;
      gpios[reqnum].writeSync(0);
      console.log("gpio off");
    }else{
      stateboolean = 1;
      gpios[reqnum].writeSync(1);
      console.log("gpio on");
    }
    db.serialize(function() {
      console.log("UPDATE config SET NAME='"+reqdata.name+"',STATE="+stateboolean+" WHERE NUM="+reqnum);
      db.run("UPDATE config SET NAME='"+reqdata.name+"',STATE="+stateboolean+" WHERE NUM="+reqnum,
      function(err, row) {
        if(err==undefined){
          res.send("OK");
        }else {
          console.log(err);
          throw err;
        }

        });
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
