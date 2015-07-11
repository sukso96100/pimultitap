var configdb = require('../models/config');
var express = require('express');
var router = express.Router();
var Configs = configdb.Configs;
//DB

/* GET Settings page. */
router.get('/', function(req, res, next) {
  //Query Config
  console.log("Querying Config from DB");
  Configs.findAll({ limit: 8 }).then(function(configs) {
  res.render('settings', { title: 'RelaySwitch', state: configs });
  });
});

router.get('/load/:num', function(req, res, next) {
  var reqnum = req.params.num;
  console.log(reqnum);

  // Query Config
  console.log("Querying Config from DB");
  Configs.findOne({where: {num: reqnum}})
    .then(function(config) {
      res.send(config);
    });
});

router.post('/save/:num', function(req, res, next) {
    console.log("POST /save/ Request");
    var reqnum = req.params.num;
    console.log(reqnum);
    var reqdata = req.body;
    console.log(reqdata);

    Configs.findOne({ where: {num: reqnum}})
    .then(function(config) {
      config.name = reqdata.name;
      config.state = reqdata.state;
      config.save().then(function() {
        res.send("Config for Switch ''"+reqdata.name+"'' was saved!");
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
