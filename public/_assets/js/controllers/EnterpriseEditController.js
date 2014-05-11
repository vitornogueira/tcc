App.controller('EnterpriseEditController', function($scope, $rootScope, $stateParams, $http, Util, Contact, Flash, telFilter) {

  'use strict';

  var enterprise = $stateParams.enterpriseID;

  $http({
    url: "http://dev.jawsproject.com/api/Enterprise/list/" + enterprise,
    method: 'GET'
  })
  .success(function (data) {
    $scope.enterprise = data;
  })
  .error(function () {
    $scope.error = 'Ops :(';
  });

  $scope.edit = function(enterprise) {
    if (enterprise) {

      $http({
        url: 'http://dev.jawsproject.com/api/Enterprise/edit',
        method: 'PUT',
        data: enterprise
      })
      .success(function(data) {
        var enterprise = {
          index: Util.findById($rootScope.enterprises, data.id, 'index'),
          data: data
        };

        enterprise.data.number = enterprise.data.phones[0].number;
        enterprise.data.email = enterprise.data.emails[0].email;

        Flash.add({
          class: 'alert-success',
          title: 'Empresa:',
          text: data.name + ' editada com sucesso!'
        });

        $rootScope.$broadcast('editenterprise', enterprise);
      });
    }
  };

  $scope.addPhone = function(enterprise) {
    if ($scope.enterprise.newphone) {
      var data = {
        'owner_type': 'enterprise',
        'owner_id': enterprise,
        'number': $scope.enterprise.newphone,
        'nivel': 0
      };

      Contact.add('Phone', $scope.enterprise, data, function(data) {
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
        'owner_type': 'enterprise',
        'owner_id': enterprise,
        'id': phone.id
      };

    Contact.setDefault('Phone', $scope.enterprise, data, function() {
      Flash.add({
        class: 'alert-success',
        title: telFilter(phone.number),
        text: 'adicionado como telefone principal.'
      });
    });
  };

  $scope.removePhone = function(phone) {
    Contact.remove('Phone', $scope.enterprise, phone, function(data) {
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

  $scope.addEmail = function(enterprise) {
    if ($scope.enterprise.newemail) {
      var data = {
        'owner_type': 'enterprise',
        'owner_id': enterprise,
        'email': $scope.enterprise.newemail,
        'nivel': 0
      };

      Contact.add('Email', $scope.enterprise, data, function(data) {
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
        'owner_type': 'enterprise',
        'owner_id': enterprise,
        'id': email.id
      };

    Contact.setDefault('Email', $scope.enterprise, data, function() {
      Flash.add({
        class: 'alert-success',
        title: email.email,
        text: 'adicionado como e-mail principal.'
      });
    });
  };

  $scope.removeEmail = function(email) {
    Contact.remove('Email', $scope.enterprise, email, function(data) {
      Flash.add({
        class: 'alert-warning',
        title: 'E-mail',
        text: data.email + ' removido com sucesso!'
      });
    });
  };

  $scope.editEmail = function(phone) {
    Contact.edit('Email', phone, function(data) {
      Flash.add({
        class: 'alert-success',
        title: 'E-mail',
        text: data.email + ' editado com sucesso!'
      });
    });
  };

});
