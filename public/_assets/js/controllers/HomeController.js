App.controller('HomeController', function($scope, $rootScope, $http, Auth) {

  'use strict';

  $rootScope.currentSection = 'Home';

  $http({
    url: "http://dev.jawsproject.com/api/Project/listAll",
    method: 'GET'
  })
  .success(function (data) {
    $scope.projects = data;
  });

  $scope.toggleMenu = function(item) {
    $scope.openMenu = !$scope.openMenu;

    if (item) {
      $rootScope.currentSection = item;
    }
  };

  $scope.logout = function() {
    Auth.logout();
  };

});
