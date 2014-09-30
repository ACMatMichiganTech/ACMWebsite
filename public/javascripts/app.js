var acm = angular.module('acm',
  ['ngRoute', 'acm.hardware', 'acm.calendar', 'mwl.calendar']);

acm.controller('header', function($scope, $location) {
  $scope.isActive = function(route) {
    var controller = $location.path().split('/')[1];
    return controller === route;
  };
})

acm.controller('main', function($scope) {});

acm.config(['$routeProvider', '$locationProvider',
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
      })
      .when('/calendar', {
        templateUrl: 'views/calendar/index.html',
        controller: 'calendar'
      });
  }
]);
