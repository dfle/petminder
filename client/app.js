var app = angular.module('app', []);

app.controller('AppController', function(AppFactory) {
  var vm = this;
  vm.newDogName;
  vm.newDogOwner;
  vm.newDogAddress;
  vm.dogs = [];

  vm.addDog = function(name, owner, address) {
    AppFactory.addDog(name, owner, address);
  };

  vm.addDogWalk = function(dog) {
    console.log('inside vm.addDogWalk')
    AppFactory.addDogWalk(dog);
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
    // this.addDogWalk = function() {
    //   console.log('inside Dog addDogWalk');
    //   return $http({
    //     method: 'POST',
    //     url: '/api/walks',
    //     data: { name: name }
    //   });
    // };
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

  var addDogWalk = function(dog) {
    console.log('inside Dog addDogWalk');
    return $http({
      method: 'POST',
      url: '/api/walks',
      data: { name: dog.name }
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
    }).
    then(function(data) {
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
