App.controller('TicketProjectController', function($scope, $rootScope, $stateParams, $http) {

  'use strict';

  var project = $stateParams.projectID;

  $http({
    url: "http://dev.jawsproject.com/api/Project/list/" + project,
    method: 'GET'
  })
  .success(function(data) {
    $scope.projectTitle = data.title;
    $scope.projectID = data.id;

    $rootScope.currentSection = 'Tickets - ' + $scope.projectTitle;
  });

  $http({
    url: 'http://dev.jawsproject.com/api/Ticket/project/' + project,
    method: 'GET'
  })
  .success(function(data) {
    $scope.tickets = data;

    $scope.countStatus();
    $scope.countPriority();
  });

  $scope.countStatus = function(priority) {
    $scope.totalTicketStatus = {
      open: 0,
      forApproval: 0,
      closed: 0
    };

    for (var i = $scope.tickets.length - 1; i >= 0; i--) {
      if (!priority || priority === $scope.tickets[i].priority) {
        switch ($scope.tickets[i].status) {
          case '0':
            $scope.totalTicketStatus.open++;
            break;
          case '1':
            $scope.totalTicketStatus.forApproval++;
            break;
          case '2':
            $scope.totalTicketStatus.closed++;
            break;
        }
      }
    }
  };

  $scope.countPriority = function(status) {
    $scope.totalTicketPriority = {
      low: 0,
      medium: 0,
      high: 0
    };

    for (var i = $scope.tickets.length - 1; i >= 0; i--) {
      if (!status || status === $scope.tickets[i].status) {
        switch ($scope.tickets[i].priority) {
          case '0':
            $scope.totalTicketPriority.low++;
            break;
          case '1':
            $scope.totalTicketPriority.medium++;
            break;
          case '2':
            $scope.totalTicketPriority.high++;
            break;
        }
      }
    }
  };

});
