var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Check if DB Table is empty
  req.models.config.find({num : 0}, function (err, config) {
        if (config.length){
            console.log("DB Table is NOT empty!");
        }else{
          console.log("DB Table is EMPTY!");
          //Create Default Config
          for(var i=0;i<8;i++){
            req.models.config.create({
          num: i,
          name: "Switch"+i,
          state: false},
          function (err, items) {
            // err - description of the error or null
            // items - array of inserted items
          });}
        }
    });
    //Query Config
    console.log("Querying Config from DB");
    var query = req.models.config.find().limit(8);
    query.exec(function (err, config) {
      if (err) return handleError(err);
      console.log(config);
      config = sortByKey(config,'num');
      res.render('index', { title: 'RelaySwitch', state: config });
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
