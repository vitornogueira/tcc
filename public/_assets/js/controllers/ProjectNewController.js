App.controller('ProjectNewController', function($scope, $rootScope, $http) {

  'use strict';

  $scope.create = function (project) {
    if (project) {
      project.costumer_id = project.costumer.id;
      project.costumer_name = project.costumer.name;

      project.sponsor_id = project.sponsor.id;
      project.sponsor_name = project.sponsor.name;

      delete project.costumer;
      delete project.sponsor;

      $http({
        url: 'http://dev.jawsproject.com/api/Project/create',
        method: 'POST',
        data: project
      })
      .success(function(data) {
        $rootScope.$broadcast('newproject', data);
      });
    }
  };

});
