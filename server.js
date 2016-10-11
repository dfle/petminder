var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var handlers = require('./server/handlers');
var db = require('./server/db');
var dbCtrl = require('./server/dbCtrl');
var app = express();
var port = 9001;

app.use(bodyParser());

app.use('/', express.static(__dirname + '/client'));

app.post('/api/messages', handlers.postMessage);

app.post('/api/dogs', dbCtrl.addDogRecord);
app.post('/api/walks', dbCtrl.addDogWalkRecord);

app.get('/api/dogs', dbCtrl.getDogRecord);

app.listen(port, function() {
  console.log('connected to port: ', port);
});
