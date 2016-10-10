var app = angular.module('app', []);

var data = ['Blanket', 'Willow'];

app.controller('AppController', function(AppFactory) {
  var vm = this;
  vm.test = 'test';
  vm.dogs = [];

  vm.sendMessage = function() {
    AppFactory.sendMessage();
  };

  data.forEach(function(dog) {
    vm.dogs.push(new AppFactory.Dog(dog));
  });
});

app.factory('AppFactory', function($http) {
  var Dog = function(name) {
    this.name = name;
    this.morning = false;
    this.noon = false;
    this.evening = false;
    this.night = false;
  };

  var sendMessage = function() {
    console.log('inside send message');
    return $http({
      method: 'POST',
      url: '/api/messages'
    });
  };

  return {
    Dog: Dog,
    sendMessage: sendMessage
  }
  
});
