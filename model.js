var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ConfigSchema = mongoose.Schema({
    name: String
    state: Boolean
});

var Config = mongoose.model('Kitten', ConfigSchema);
