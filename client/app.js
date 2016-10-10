var app = angular.module('app', []);

var data = ['Blanket', 'Willow'];

app.controller('AppController', function(AppFactory) {
  var vm = this;
  vm.test = 'test';
  vm.dogs = [];

  data.forEach(function(dog) {
    vm.dogs.push(new AppFactory.Dog(dog));
  });
});

app.factory('AppFactory', function() {
  var Dog = function(name) {
    this.name = name;
    this.morning = false;
    this.noon = false;
    this.evening = false;
    this.night = false;
  };

  return {
    Dog: Dog
  }
});
