angular.module('app-main-factory', [])
  .factory('MainFactory', function($http) {
  var dogs = [];

  var Dog = function(name, owner, address) {
    this.name = name;
    this.owner = owner || '-';
    this.address = address || '-';
    this.morning = false;
    this.noon = false;
    this.evening = false;
    this.night = false;
  };

  var addDog = function(name, owner, address) {
    var newDog = new this.Dog(name, owner, address);
    // add newDog to database
    return $http({
      method: 'POST',
      url: '/api/dogs',
      data: newDog
    });
  };

  var addDogWalk = function(dog, timeOfDay) {
    for (var key in dog) {
      if (key === timeOfDay) {
        if (!dog[timeOfDay]) {
          dog[timeOfDay] = !dog[timeOfDay];
        }
      }
    }
    return $http({
      method: 'POST',
      url: '/api/walks',
      data: { name: dog.name, owner: dog.owner, address: dog.address, morning: dog.morning, noon: dog.noon, evening: dog.evening, night: dog.night }
    });
  };

  var sendMessage = function() {
    return $http({
      method: 'POST',
      url: '/api/messages'
    });
  };

  var getDogs = function() {
    return $http({
      method: 'GET',
      url: '/api/dogs'
    })
    .then(function(data) {
      return data;
    });
  };

  return {
    dogs: dogs,
    Dog: Dog,
    addDog: addDog,
    addDogWalk: addDogWalk,
    getDogs: getDogs,
    sendMessage: sendMessage
  }
});
