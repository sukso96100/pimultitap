var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SwitchesConfigSchema = mongoose.Schema({
    num: Number;
    name: String
    state: Boolean
});

mongoose.model('SwitchesConfig', SwitchesConfigSchema);
mongoose.connect( 'mongodb://localhost/relay-switch' );
