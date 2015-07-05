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
    res.render('index', { title: 'RelaySwitch - Settings', state: config });
  })

});

module.exports = router;
