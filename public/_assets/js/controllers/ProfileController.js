App.controller('ProfileController', function($scope, $rootScope, $http, $timeout, Util, Contact, Flash, telFilter) {

  'use strict';

  $http({
    url: "http://dev.jawsproject.com/api/User/profile",
    method: 'GET'
  })
  .success(function (data) {
    $scope.user = data;

    $scope.user.phone = data.phones[0].number;
    $scope.user.email = data.emails[0].email;
  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.edit = function(user) {
    if (user) {

      $http({
        url: 'http://dev.jawsproject.com/api/User/edit',
        method: 'PUT',
        data: user
      })
      .success(function() {
        Flash.add({
          class: 'alert-success',
          title: 'Nome',
          text: ' editado com sucesso!'
        });
      });
    }
  };

  $scope.addPhone = function() {
    if ($scope.user.newphone) {
      var data = {
        'owner_type': 'user',
        'owner_id': $scope.user.id,
        'number': $scope.user.newphone,
        'nivel': 0
      };

      Contact.add('Phone', $scope.user, data, function(data) {
        Flash.add({
          class: 'alert-success',
          title: 'Telefone',
          text: telFilter(data.number) + ' adicionado com sucesso!'
        });
      });
    }
  };

  $scope.setDefaultPhone = function(phone) {
    var data = {
        'owner_type': 'user',
        'owner_id': $scope.user.id,
        'id': phone.id
      };

    Contact.setDefault('Phone', $scope.user, data, function() {
      $scope.user.phone = phone.number;

      Flash.add({
        class: 'alert-success',
        title: telFilter(phone.number),
        text: 'adicionado como telefone principal.'
      });
    });
  };

  $scope.removePhone = function(phone) {
    Contact.remove('Phone', $scope.user, phone, function(data) {
      Flash.add({
        class: 'alert-warning',
        title: 'Telefone',
        text: telFilter(data.number) + ' removido com sucesso!'
      });
    });
  };

  $scope.editPhone = function(phone) {
    Contact.edit('Phone', phone, function(data) {
      Flash.add({
        class: 'alert-success',
        title: 'Telefone',
        text: telFilter(data.number) + ' editado com sucesso!'
      });
    });
  };

  $scope.addEmail = function() {
    if ($scope.user.newemail) {
      var data = {
        'owner_type': 'user',
        'owner_id': $scope.user.id,
        'email': $scope.user.newemail,
        'nivel': 0
      };

      Contact.add('Email', $scope.user, data, function(data) {
        Flash.add({
          class: 'alert-success',
          title: 'E-mail',
          text: data.email + ' adicionado com sucesso!'
        });
      });
    }
  };

  $scope.setDefaultEmail = function(email) {
    var data = {
        'owner_type': 'user',
        'owner_id': $scope.user.id,
        'id': email.id
      };

    Contact.setDefault('Email', $scope.user, data, function() {
      $scope.user.email = email.email;

      Flash.add({
        class: 'alert-success',
        title: email.email,
        text: 'adicionado como e-mail principal.'
      });
    });
  };

  $scope.removeEmail = function(email) {
    Contact.remove('Email', $scope.user, email, function(data) {
      Flash.add({
        class: 'alert-warning',
        title: 'E-mail',
        text: data.email + ' removido com sucesso!'
      });
    });
  };

  $scope.editEmail = function(email) {
    Contact.edit('Email', email, function(data) {
      Flash.add({
        class: 'alert-success',
        title: 'E-mail',
        text: data.email + ' editado com sucesso!'
      });
    });
  };

});
