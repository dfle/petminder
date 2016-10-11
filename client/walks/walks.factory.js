angular.module('app-walk-factory', [])
  .factory('walksFactory', function($http){
  var getDogWalkRecord = function() {
    return $http({
      method: 'GET',
      url: '/api/walks'
    })
    .then(function(data) {
      return data;
    });
  };

  return {
    getDogWalkRecord: getDogWalkRecord
  }
});
