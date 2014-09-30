angular.module('acm.hardware').factory('Hardware', function($resource) {
  return $resource('/hardwares/:id', null, {
    'update': {
      method: 'PUT'
    }
  });
});
