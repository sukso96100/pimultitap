var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':config:');

db.serialize(function() {
  db.run("CREATE TABLE config(
   NUM    INTERGER      NOT NULL,
   NAME   VARCHAR(255)  NOT NULL,
   STATE  TINYINT(1)    NOT NULL);");

   db.run("SELECT * FROM config", function(err, rows) {
    if(rows == undefined){
      for(var i=0; i<8; i++){
      db.run("INSERT INTO config (NUM, NAME, STATE) VALUES ("+i+",Switch"+i+",0)");
      }
    }
  });
});

process.on('exit', function() {
  // Add shutdown logic here.
  db.close();
});
module.exports = db;
