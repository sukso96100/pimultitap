var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://config.db');
var db = [];

var Configs = sequelize.define('Configs', {
  num: Sequelize.INTEGER,
  name: Sequelize.STRING,
  state: Sequelize.BOOLEAN
});

//Sync DB - Create Table unless exists.
sequelize.sync();
//Create Default configs
Configs.findOne({where: {num: 0}})
  .then(function(config) {
    if(config==null){
      for(var i=0; i<8; i++){
        Configs.create({ num: i, name: 'Switch'+i, state:false });
      }
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Configs = Configs;

module.exports = db;
