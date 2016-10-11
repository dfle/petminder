angular.module('app-main', [])
.controller('MainController', function MainController ($scope, MainFactory, walksFactory) {
  var vm = this;
  vm.dogs = [];

  vm.addDog = function(name, owner, address) {
    MainFactory.addDog(name, owner, address);
    vm.getDogs();
  };

  vm.addDogWalk = function(dog, timeOfDay) {
    MainFactory.addDogWalk(dog, timeOfDay);
    walksFactory.getDogWalkRecord();
  };

  vm.sendMessage = function() {
    MainFactory.sendMessage();
  };

  vm.getDogs = function() {
    MainFactory.getDogs()
      .then(function(dogs) {
        vm.dogs = dogs.data;
      });
  };

  vm.reset = function() {
    $scope.newDogName = '';
    $scope.newDogOwner = '';
    $scope.newDogAddress = '';
  };

  vm.getDogs();
});
