angular.module('acm.calendar').controller('calendar',
  ['$scope', '$modal', 'Event', function($scope, $modal, Event) {
    $scope.events = Event.query();
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();

    function showModal(event) {
      $modal.open({
        templateUrl: 'views/calendar/eventModal.html',
        controller: function($scope, $modalInstance) {
          $scope.$modalInstance = $modalInstance;
          $scope.event = event;
        }
      });
    }

    $scope.prettyMonth = function() {
      return moment($scope.calendarDay).format('MMMM YYYY');
    };

    $scope.eventClicked = showModal;

    $scope.setCalendarToToday = function() {
      $scope.calendarDay = new Date();
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();

      event[field] = !event[field];
    };
  }]
);
