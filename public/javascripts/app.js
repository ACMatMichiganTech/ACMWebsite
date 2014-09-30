var acmApp = angular.module('acmApp',
  ['ngRoute', 'ngResource', 'mwl.calendar']);

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

    $scope.returned = function(hardware) {
      hardware.checkedOut = false;
      Hardware.update({id: hardware._id}, hardware);
    };
  }
]);

acmApp.controller('calendar', function($scope, $modal) {
  $scope.events = [
    {
      title: 'Event 1',
      type: 'warning',
      starts_at: new Date(),
      ends_at: new Date()
    },
    {
      title: 'Event 2',
      type: 'info',
      starts_at: new Date(2013,5,1,1),
      ends_at: new Date(2014,8,26,15),
      editable: false
    }
  ];

  $scope.calendarView = 'month';
  $scope.calendarDay = new Date();

  function showModal(action, event) {
    $modal.open({
      templateUrl: 'modalContent.html',
      controller: function($scope, $modalInstance) {
        $scope.$modalInstance = $modalInstance;
        $scope.action = action;
        $scope.event = event;
      }
    });
  }

  $scope.prettyMonth = function() {
    return moment($scope.calendarDay).format('MMMM YYYY');
  };

  $scope.eventClicked = function(event) {
    showModal('Clicked', event);
  };

  $scope.eventEdited = function(event) {
    showModal('Edited', event);
  };

  $scope.eventDeleted = function(event) {
    showModal('Deleted', event);
  };

  $scope.setCalendarToToday = function() {
    $scope.calendarDay = new Date();
  };

  $scope.toggle = function($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();

    event[field] = !event[field];
  };
});

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
      })
      .when('/calendar', {
        templateUrl: 'views/calendar/index.html',
        controller: 'calendar'
      });
  }
]);
