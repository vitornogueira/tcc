App.controller('UserViewController', function($scope, $http, $stateParams, Util) {

  'use strict';

  $http({
    url: "http://dev.jawsproject.com/api/User/profile/" + $stateParams.userID,
    method: 'GET'
  })
  .success(function (data) {
    $scope.user = data;
  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $http({
    url: 'http://dev.jawsproject.com/api/Enterprise/listAll',
    method: 'GET'
  })
  .success(function (data) {
    $scope.enterprises = data;

    $scope.enterprise = Util.findById(data, $scope.user.enterprise_id);
  });

});
