App.controller('EnterpriseController', function($scope, $rootScope, $http, Flash) {

  'use strict';

  $rootScope.currentSection = 'Empresas';

  $http({
    url: "http://dev.jawsproject.com/api/Enterprise/listAll",
    method: 'GET'
  })
  .success(function (data) {
    $rootScope.enterprises = data;
  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.updateStatus = function (enterprise) {
    var data = {
      id: enterprise.id,
      status: (enterprise.status == '0') ? '1' : '0'
    };

    $http({
      url: 'http://dev.jawsproject.com/api/Enterprise/updateStatus',
      method: 'PUT',
      data: data
    })
    .success(function (data) {
      enterprise.status = data.status;

      Flash.add({
        class: 'alert-success',
        title: 'Empresa:',
        text: 'status alterado'
      });
    })
    .error(function () {
      $scope.error = 'Ops :(';
    });
  };

  $scope.$on('newenterprise', function(event, enterprise) {
    $scope.enterprises.push(enterprise);
  });

  $scope.$on('editenterprise', function(event, enterprise) {
    $rootScope.enterprises[enterprise.index] = enterprise.data;
  });
});
