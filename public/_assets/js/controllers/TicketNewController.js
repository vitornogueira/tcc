App.controller('TicketNewController', function($scope, $rootScope, $stateParams, $state, $http) {

  'use strict';

  var project = $stateParams.projectID;

  $scope.newticket = {
    'priority': '0',
    'project': project
  };

  $http({
    url: "http://dev.jawsproject.com/api/Project/list/" + project,
    method: 'GET'
  })
  .success(function (data) {
    $scope.project = data;

    $rootScope.currentSection = 'Criar ticket - ' + data.title;
  });

  $scope.save = function(ticket) {
    $http({
      url: "http://dev.jawsproject.com/api/Ticket/create",
      method: 'POST',
      data: ticket
    })
    .success(function () {
      $state.go('root.ticketProject', { projectID: project });
    });
  };

});
