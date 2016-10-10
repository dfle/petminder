var express = require('express');
require('dotenv').config();
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

var app = express();
var port = 9001;

app.use('/', express.static(__dirname + '/client'));

app.listen(port, function() {
  console.log('connected to port: ', port);
});

client.sendMessage({
  to: process.env.toNum,
  from: process.env.fromNum,
  body: 'testing'
})
.then(function(response) {
  console.log('message sent', response);
})
.catch(function(err){
  console.log('err: ', err);
});
