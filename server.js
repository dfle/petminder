var express = require('express');

var app = express();
var port = 9001;

app.use('/', express.static(__dirname + '/client'));

app.listen(port, function() {
  console.log('connected to port: ', port);
});
