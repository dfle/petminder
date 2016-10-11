var app = angular.module('app', []);

app.controller('AppController', function($scope, AppFactory) {
  var vm = this;
  vm.dogs = [];

  vm.addDog = function(name, owner, address) {
    AppFactory.addDog(name, owner, address);
    vm.getDogs();
  };

  vm.addDogWalk = function(dog, timeOfDay) {
    console.log('inside vm.addDogWalk', timeOfDay)
    AppFactory.addDogWalk(dog, timeOfDay);
  };

  vm.sendMessage = function() {
    AppFactory.sendMessage();
  };

  vm.getDogs = function() {
    console.log('inside vm.getDogs');
    AppFactory.getDogs()
      .then(function(dogs) {
        vm.dogs = dogs.data;
        console.log(vm.dogs, dogs);
      });
  };

  vm.reset = function() {
    $scope.newDogName = '';
    $scope.newDogOwner = '';
    $scope.newDogAddress = '';
  };

  vm.getDogs();
});

app.factory('AppFactory', function($http) {
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
    console.log('inside addDog', name, owner, address);
    //return new this.Dog(name, owner, address);
    var newDog = new this.Dog(name, owner, address);
    console.log(newDog);
    // add newDog to database
    return $http({
      method: 'POST',
      url: '/api/dogs',
      data: newDog
    });
  };

  var addDogWalk = function(dog, timeOfDay) {
    console.log('inside Dog addDogWalk', timeOfDay);
    for (var key in dog) {
      if (key === timeOfDay) {
        dog[timeOfDay] = !dog[timeOfDay];
      }
    }
    console.log('dog in addDogWalk', dog);
    return $http({
      method: 'POST',
      url: '/api/walks',
      data: { name: dog.name, owner: dog.owner, address: dog.address, morning: dog.morning, noon: dog.noon, evening: dog.evening, night: dog.night }
    });
  };

  var sendMessage = function() {
    console.log('inside send message');
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
      console.log(data);
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
