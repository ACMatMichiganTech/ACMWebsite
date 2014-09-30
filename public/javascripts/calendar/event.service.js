angular.module('acm.calendar').factory('Event', function($resource) {
  return $resource('/events/:id');
});
