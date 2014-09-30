angular.module('acm.hardware').controller('hardwares',
  ['$scope', 'Hardware', function($scope, Hardware) {
    $scope.hardwares = Hardware.query();

    $scope.checkout = function(hardware) {
      hardware.checkedOut = true;
      Hardware.update({id: hardware._id}, hardware);
    };

    $scope.returned = function(hardware) {
      hardware.checkedOut = false;
      Hardware.update({id: hardware._id}, hardware);
    };
  }]
);
