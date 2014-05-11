App.directive('activeNav', function($location) {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element) {
      var nestedA = element.find('a')[0],
          path = nestedA.href;

      scope.location = $location;
      scope.$watch('location.absUrl()', function(newPath) {
        if (path === newPath) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      });
    }
  };
});
