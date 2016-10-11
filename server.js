var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var handlers = require('./server/handlers');
var db = require('./server/db');
var dbCtrl = require('./server/dbCtrl');
var app = express();
var port = process.env.PORT || 9001;

app.use(bodyParser());

app.use('/', express.static(__dirname + '/client'));

app.post('/api/messages', handlers.postMessage);

app.get('/api/dogs', dbCtrl.getDogRecord);
app.post('/api/dogs', dbCtrl.addDogRecord);

app.get('/api/walks', dbCtrl.getDogWalkRecord)
app.post('/api/walks', dbCtrl.addDogWalkRecord);




app.listen(port, function() {
  console.log('connected to port: ', port);
});
