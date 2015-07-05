var express = require('express');
var router = express.Router();
//DB
var mongoose = require( 'mongoose' );
var SwitchesConfig = mongoose.model( 'SwitchesConfig' );

/* GET Settings page. */
router.get('/', function(req, res, next) {
  //Query Config
  console.log("Querying Config from DB");
  var query = SwitchesConfig.find().limit(8);
  query.exec(function (err, config) {
    if (err) return handleError(err);
    console.log(config);
    config = sortByKey(config,'num');
    res.render('settings', { title: 'Settings', state: config });
  })
});

router.get('/load/:num', function(req, res, next) {
  var reqnum = req.params.num;
  console.log(reqnum);

  // Query Config
  console.log("Querying Config from DB");
  var query = SwitchesConfig.findOne({num:reqnum});
  query.exec(function (err, config) {
    if (err) return handleError(err);
    console.log(config);
      res.send(config);
  })
});

router.post('/save/:num', function(req, res, next) {
  console.log("POST /save/ Request");

  var reqnum = req.params.num;
  console.log(reqnum);
  var reqdata = JSON.parse(req.body);
  console.log(reqdata);
  // Query Config
  console.log("Querying Config from DB");
  var query = SwitchesConfig.findOne({num:reqnum});
  query.exec(function (err, config) {
    if (err) return handleError(err);
    console.log(config);
    config.name = reqdata.name;
    config.state = reqdata.state;
    config.save();
      // res.send(config);
  })
});

//Function that sorts an array of objects by key
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = router;
