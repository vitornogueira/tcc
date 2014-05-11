App.controller('EnterpriseNewController', function($scope, $rootScope, $http) {

  'use strict';

  $scope.create = function (enterprise) {
    if (enterprise) {

      $http({
        url: 'http://dev.jawsproject.com/api/Enterprise/create',
        method: 'POST',
        data: enterprise
      })
      .success(function(data) {
        $rootScope.$broadcast('newenterprise', data);
      });
    }
  };

});
