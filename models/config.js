var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://config.db');
var db = [];

var Configs = sequelize.define('Configs', {
  num: Sequelize.INTEGER,
  name: Sequelize.STRING,
  state: Sequelize.BOOLEAN
});

sequelize.sync();
Configs.findOne({where: {num: 0}, defaults: {name: 'Switch'+0, state:false}})
  .then(function(config) {
    if(config==null){
      for(var i=0; i<8; i++){
        Configs.create({ num: i, name: 'Switch'+i, state:false });
      }
    }
  })





db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Configs = Configs;

module.exports = db;
