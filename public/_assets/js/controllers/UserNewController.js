App.controller('UserNewController', function($scope, $http, $state, $rootScope) {

  'use strict';

  $http({
    url: 'http://dev.jawsproject.com/api/Enterprise/listAll',
    method: 'GET'
  })
  .success(function (data) {
    $scope.enterprises = data;
  });

  $scope.create = function (user) {
    if (user) {
      user.enterprise_id = user.enterprise.id;
      user.enterprise_name = user.enterprise.name;

      delete user.enterprise;

      $http({
        url: 'http://dev.jawsproject.com/api/User/create',
        method: 'POST',
        data: user
      })
      .success(function(data) {
        $rootScope.$broadcast('newuser', data);
      });
    }
  };

});
