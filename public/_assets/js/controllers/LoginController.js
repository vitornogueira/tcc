App.controller('LoginController', function($scope, $rootScope, Auth) {

  'use strict';

  $rootScope.currentSection = 'Login';

  $scope.login = function() {
    Auth.login($scope.user);
  };
});
