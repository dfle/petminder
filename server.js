var express = require('express');
require('dotenv').config();
//var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var handlers = require('./server/handlers');

var app = express();
var port = 9001;

app.use('/', express.static(__dirname + '/client'));

app.post('/api/messages', handlers.postMessage);

app.listen(port, function() {
  console.log('connected to port: ', port);
});
