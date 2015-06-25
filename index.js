var server = require("./server");
var router = require("./router");
var reqhandler = require("./reqhandler");

var handle = {}
handle["/"] = reqhandler.start;
handle["/start"] = reqhandler.start;
handle["/upload"] = reqhandler.upload;

server.start(router.route, handle);