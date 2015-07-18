var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('config.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS config(NUM    INTERGER      NOT NULL,NAME   VARCHAR(255)  NOT NULL,STATE  TINYINT(1)    NOT NULL)");

   db.all("SELECT * FROM config", function(err, rows) {
    if(rows == undefined){
      for(var i=0; i<8; i++){
        console.log("INSERT INTO 'config'('NUM','NAME','STATE') VALUES ('"+i+"','Switch"+i+"','0')");
      db.run("INSERT INTO 'config'('NUM','NAME','STATE') VALUES ('"+i+"','Switch"+i+"','0')");
      }
    }
  });
});
//
// process.on('exit', function() {
//   // Add shutdown logic here.
//   db.close();
// });
module.exports = db;
