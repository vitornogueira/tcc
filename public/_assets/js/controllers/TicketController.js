App.controller('TicketController', function($scope, $rootScope, $stateParams, $http, Session) {

  'use strict';

  var ticket = $stateParams.ticketID;

  var user = Session.get('authorized');

  $scope.filter = {
    'status': '0'
  };

  $http({
    url: "http://dev.jawsproject.com/api/Ticket/list/" + ticket,
    method: 'GET'
  })
  .success(function (data) {
    $scope.ticket = data;

    $scope.newcomment = {
      'status': data.status
    };

    $rootScope.currentSection = data.ticket_title;
  });

  $scope.addComment = function(comment) {

    comment.ticket = $scope.ticket.ticket_id;
    comment.user_name = user.user_name;
    comment.enterprise_name = user.enterprise_name;

    $http({
      url: 'http://dev.jawsproject.com/api/Ticket/comment',
      method: 'POST',
      data: comment
    })
    .success(function (data) {
      $scope.ticket.comments.push(data);
      $scope.ticket.status = data.status;
    });

  };
});
