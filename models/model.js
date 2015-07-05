var mongoose = require('mongoose')
//Connect to MongoDB
console.log("Opening DB Connection");
mongoose.connect( 'mongodb://localhost/relay-switch' );
//Open DB Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("Yay! Opened DB Connection!");
});
console.log("Registering DB Schema : SwitchesConfig");
var SwitchesConfigSchema = mongoose.Schema({
    num: Number,
    name: String,
    state: Boolean
});
mongoose.model('SwitchesConfig', SwitchesConfigSchema);
