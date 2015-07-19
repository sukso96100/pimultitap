var Gpio = require('onoff').Gpio;
var gpios = [];

for(var i=2; i<9; i++){
  gpioItem = new Gpio(i,'out');
  gpios.push(gpioItem);
  console.log("setting up gpio"+i);
}
console.log(gpios);
module.exports = gpios;
