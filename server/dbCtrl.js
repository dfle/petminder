var mongoose = require('mongoose');
var DogRecord = require('./db').DogRecord;
var DogWalkRecord = require('./db').DogWalkRecord;

var addDogRecord = function(req, res) {
  console.log('inside addDogRecord', req.body.name, req.body.owner, req.body.address, req.body.morning);
  new DogRecord({
    name: req.body.name,
    owner: req.body.owner,
    address: req.body.address,
    morning: req.body.morning,
    noon: req.body.noon,
    evening: req.body.evening,
    night: req.body.night
  })
  .save(function(err, DogRecord) {
    if (err) {
      console.log(err);
    } else {
      console.log(DogRecord);
    }
  });
};

var addDogWalkRecord = function(req, res) {
  // add record of dog walk
  new DogWalkRecord({
    name: req.body.name,
    time: new Date()
  })
  .save(function(err, DogWalkRecord) {
    if (err) {
      console.log(err);
    } else {
      console.log(DogWalkRecord);
    }
  });
  // update dog walk
  DogRecord.findOneAndUpdate({ name: req.body.name, owner: req.body.owner, address: req.body.address }, {morning: req.body.morning, noon: req.body.noon, evening: req.body.evening, night: req.body.night}, {new: true})
    .then(function(dogRecord) {
      console.log('dogRecord', dogRecord);
    })
    .catch(function(err) {
      console.log(err);
    });
}

var getDogRecord = function(req, res) {
  DogRecord.find({}, function(err, records) {
    console.log('err', err, 'records', records);
    return records;
  }).then(function(records){
    res.send(records);
  });
};

module.exports = {
  addDogRecord: addDogRecord,
  addDogWalkRecord: addDogWalkRecord,
  getDogRecord: getDogRecord
};
