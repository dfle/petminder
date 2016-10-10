var app = angular.module('app', []);

var data = ['Blanket', 'Willow'];

app.controller('AppController', function(AppFactory) {
  var vm = this;
  vm.newDogName;
  vm.newDogOwner;
  vm.newDogAddress;
  vm.dogs = AppFactory.dogs;

  vm.addDog = function() {
    if (!!vm.newDogName) {
      var newDog = AppFactory.addDog(vm.newDogName, vm.newDogOwner, vm.newDogAddress);
      vm.dogs.push(newDog);
    }
    vm.newDogName = '';
    vm.newDogOwner = '';
    vm.newDogAddress = '';
  };

  vm.sendMessage = function() {
    AppFactory.sendMessage();
  };

  // data.forEach(function(dog) {
  //   vm.dogs.push(new AppFactory.Dog(dog));
  // });
  AppFactory.initialize();
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
    return new this.Dog(name, owner, address);
  };

  var sendMessage = function() {
    console.log('inside send message');
    return $http({
      method: 'POST',
      url: '/api/messages'
    });
  };

  var initialize = function() {
    console.log('inside initialize');
    data.forEach(function(dog) {
      dogs.push(new Dog(dog));
    });
  };
  
  return {
    dogs: dogs,
    Dog: Dog,
    addDog: addDog,
    initialize: initialize,
    sendMessage: sendMessage
  }
});
