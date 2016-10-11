angular.module('app-history', [])
  .controller('walkController', function($scope, walksFactory){
  var vm = this;
  vm.dogWalkRecords = [];

  vm.getDogWalkRecord = function() {
    walksFactory.getDogWalkRecord()
      .then(function(records){
        vm.dogWalkRecords = records.data;
      });
  };

  vm.getDogWalkRecord();
});
