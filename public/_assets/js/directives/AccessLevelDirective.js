App.directive('accessLevel', function(Auth) {
  'use strict';

  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      var prevDisp = element.css('display'),
          userRole,
          accessLevel;

      $scope.user = Auth.user;
      $scope.$watch('user', function(user) {
        if (user.role) {
          userRole = user.role;
        }

        updateCSS();
      });

      attrs.$observe('accessLevel', function(al) {
        if (al) {
          accessLevel = $scope.$eval(al);
        }

        updateCSS();
      });

      function updateCSS() {
        if (userRole && accessLevel) {
          if (!Auth.authorize(accessLevel, userRole)) {
            element.css('display', 'none');
          }
          else {
            element.css('display', prevDisp);
          }
        }
      }
    }
  };
});
