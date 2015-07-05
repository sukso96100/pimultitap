var express = require('express');
var router = express.Router();
//DB
var mongoose = require( 'mongoose' );
var SwitchesConfig = mongoose.model( 'SwitchesConfig' );

/* GET home page. */
router.get('/', function(req, res, next) {
  //Check if DB Table is empty
  SwitchesConfig.find({num : 0}, function (err, docs) {
        if (docs.length){
            console.log("DB Table is NOT empty!");
        }else{
          console.log("DB Table is EMPTY!");
          //Create Default Config
          for(var i=0;i<8;i++){
            var config0 = new SwitchesConfig({ num:i, name:"Switch "+i, state:false });
            config0.save(function (err, config) {
              if (err) return console.error(err);
            });
          }
        }
    });

  res.render('index', { title: 'RelaySwitch' });
});

module.exports = router;
