App.controller('UserController', function($scope, $rootScope, $http) {

  'use strict';

  $rootScope.currentSection = 'Usuários';

  $scope.search = {
    'status': ''
  };

  $http({
    url: 'http://dev.jawsproject.com/api/User/listAll',
    method: 'GET'
  })
  .success(function (data) {
    $scope.users = data;
  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.updateStatus = function (user) {
    var data = {
      id: user.id,
      status: (user.status == '1') ? '2' : '1'
    };

    $http({
      url: 'http://dev.jawsproject.com/api/User/updateStatus',
      method: 'PUT',
      data: data
    })
    .success(function (data) {
      user.status = data.status;

      Flash.add({
        class: 'alert-success',
        title: 'Usuário:',
        text: 'status alterado com sucesso!'
      });
    })
    .error(function () {
      $scope.error = 'Ops :(';
    });
  };

  $scope.$on('newuser', function(event, data) {
    $scope.users.push(data);
  });

});
