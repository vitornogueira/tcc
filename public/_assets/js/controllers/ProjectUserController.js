App.controller('ProjectUserController', function($scope, $rootScope, $stateParams, $http, Util, Flash) {

  'use strict';

  var project = $stateParams.projectID;

  $http({
    url: "http://dev.jawsproject.com/api/Project/users/" + project,
    method: 'GET'
  })
  .success(function (data) {
    $scope.projectUsers = data;

    $http({
      url: 'http://dev.jawsproject.com/api/User/listAll',
      method: 'GET'
    })
    .success(function (data) {
      $scope.users = [];
      for (var i = 0, j = data.length; i < j; i++) {
        if (Util.findById($scope.projectUsers, data[i].id, 'index') === null) {
          $scope.users.push(data[i]);
        }
      }
    });

  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.addUser = function() {
    var index = Util.findById($scope.users, $scope.user.id, 'index'),
      data = {
        user: $scope.user.id,
        project: project
      };

    $http({
      url: 'http://dev.jawsproject.com/api/Project/addUser',
      method: 'POST',
      data: data
    })
    .success(function () {
      $scope.projectUsers.push($scope.user);

      $scope.users.splice(index, 1);

      Flash.add({
        class: 'alert-success',
        title: 'Usuário:',
        text: $scope.user.name + ' adicionado'
      });
    });
  };

  $scope.removeUser = function(user) {
    var index = Util.findById($scope.projectUsers, user.id, 'index'),
      data = {
        user: user.id,
        project: project
      };

    $http({
      url: 'http://dev.jawsproject.com/api/Project/removeUser',
      method: 'DELETE',
      data: data
    })
    .success(function () {
      $scope.users.push(user);

      $scope.projectUsers.splice(index, 1);

      Flash.add({
        class: 'alert-warning',
        title: 'Usuário:',
        text: user.name + ' removido'
      });
    });

  };

});
