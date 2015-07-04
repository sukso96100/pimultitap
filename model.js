var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ConfigSchema = mongoose.Schema({
    name: String
    state: Boolean
});

 mongoose.model('Config', ConfigSchema);
