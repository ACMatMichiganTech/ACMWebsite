var acmApp = angular.module('acmApp', ['ngRoute', 'ngResource']);

acmApp.factory('Hardware', function($resource) {
  return $resource('/hardwares/:id', null, {
    'update': {
      method: 'PUT'
    }
  });
});

acmApp.controller('header', function($scope, $location) {
  $scope.isActive = function(route) {
    var controller = $location.path().split('/')[1];
    return controller === route;
  };
})

acmApp.controller('main', function($scope) {});

acmApp.controller('hardwares', ['$scope', 'Hardware',
  function($scope, Hardware) {
    $scope.hardwares = Hardware.query();
    $scope.checkout = function(hardware) {
      hardware.checkedOut = true;
      Hardware.update({id: hardware._id}, hardware);
    };
  }
]);

acmApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'main'
      })
      .when('/hardwares', {
        templateUrl: 'views/hardwares/index.html',
        controller: 'hardwares'
      });
  }
]);