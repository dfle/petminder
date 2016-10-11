var mongoose = require('mongoose');

var db = mongoose.connection;
mongoose.connect(process.env.mongoURI);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

var dogRecordSchema = new mongoose.Schema({
  name: String,
  owner: String,
  address: String,
  morning: Boolean,
  noon: Boolean,
  evening: Boolean,
  night: Boolean
});

var dogWalkRecordSchema = new mongoose.Schema({
  name: String,
  time: Date
});

var DogRecord = mongoose.model('DogRecord', dogRecordSchema);
var DogWalkRecord = mongoose.model('DogWalkRecord', dogWalkRecordSchema);

module.exports = {
  DogRecord: DogRecord,
  DogWalkRecord: DogWalkRecord
}
