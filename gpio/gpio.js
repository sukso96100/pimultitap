var Gpio = require('onoff').Gpio;
var gpios = [];

for(var i=2; i<10; i++){
  gpioItem = new Gpio(i,'out');
  gpios.push(gpioItem);
  console.log("setting up gpio"+i);
}
for(var i=0; i<gpios.length; i++){
  gpios[i].writeSync(1);
  console.log("[on]testing gpio"+i);
}
for(var i=0; i<gpios.length; i++){
  gpios[i].writeSync(0);
  console.log("[off]testing gpio"+i);
}
console.log(gpios);
module.exports = gpios;
