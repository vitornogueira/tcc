App.controller('ProjectEditController', function($scope, $rootScope, $stateParams, $http, Util, Flash) {

  'use strict';

  $http({
    url: "http://dev.jawsproject.com/api/Project/list/" + $stateParams.projectID,
    method: 'GET'
  })
  .success(function (data) {
    $scope.project = data;

    $http({
      url: 'http://dev.jawsproject.com/api/Enterprise/listAll',
      method: 'GET'
    })
    .success(function (data) {
      $scope.costumers = data;
      $scope.sponsors = data;

      $scope.costumer = Util.findById(data, $scope.project.costumer_id);
      $scope.sponsor = Util.findById(data, $scope.project.sponsor_id);
    });

  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.edit = function(project) {
    if (project) {

      project.costumer_id = $scope.costumer.id;
      project.costumer_name = $scope.costumer.name;

      project.sponsor_id = $scope.sponsor.id;
      project.sponsor_name = $scope.sponsor.name;

      $http({
        url: 'http://dev.jawsproject.com/api/Project/edit',
        method: 'PUT',
        data: project
      })
      .success(function(data) {
        var project = {
          index: Util.findById($rootScope.projects, data.id, 'index'),
          data: data
        };

        Flash.add({
          class: 'alert-success',
          title: 'Projeto:',
          text: data.title + ' editado com sucesso!'
        });

        $rootScope.$broadcast('editproject', project);
      });
    }
  };

});
