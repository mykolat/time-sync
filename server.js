//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser')

var async = require('async');
// var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
// var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
router.get('/ping', function(req, res) {
  var serverTime = getTime() + ""

  res.set({
    'date': serverTime
  });


  res.send(serverTime, {
    'Content-Type': 'text/plain'
  }, 201);
  // }
});

router.post('/ping', function(req, res) {
  console.log(req)
  res.send(getTime() + "");
})

var messages = [];
var sockets = [];

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

function getTime() {
  return new Date().getTime();
}
