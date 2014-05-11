App.controller('ProjectController', function($scope, $rootScope, $http) {

  'use strict';

  $rootScope.currentSection = 'Projetos';

  $scope.order = 'title';

  $http({
    url: 'http://dev.jawsproject.com/api/Enterprise/listAll',
    method: 'GET'
  })
  .success(function (data) {
    $rootScope.costumers = data;
    $rootScope.sponsors = data;
  });

  $http({
    url: "http://dev.jawsproject.com/api/Project/listAll",
    method: 'GET'
  })
  .success(function (data) {
    $rootScope.projects = data;
  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.$on('newproject', function(event, project) {
    $rootScope.projects.push(project);
  });

  $scope.$on('editproject', function(event, project) {
    $rootScope.projects[project.index] = project.data;
  });
});
