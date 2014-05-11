var App = angular.module('jawsPopcorn', ['ngSanitize', 'ngAnimate', 'ui.router', 'ui.utils', 'ui.bootstrap', 'vn.flash']);

App.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  'use strict';

  var access = routingConfig.accessLevels;

  $urlRouterProvider.otherwise("/404");

  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'public/partials/login.html',
      access: access.public
    })
    .state('root', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'public/partials/home.html',
      access: access.user
    })
    .state('root.user', {
      url: 'user',
      controller: 'UserController',
      templateUrl: 'public/partials/user/index.html',
      access: access.admin
    })
    .state('root.user.new', {
      url: '/new',
      controller: 'UserNewController',
      templateUrl: 'public/partials/user/create.html',
      access: access.admin
    })
    .state('root.user.view', {
      url: '/:userID',
      controller: 'UserViewController',
      templateUrl: 'public/partials/user/view.html',
      access: access.admin
    })
    .state('root.project', {
      url: 'project',
      controller: 'ProjectController',
      templateUrl: 'public/partials/project/index.html',
      access: access.admin
    })
    .state('root.project.new', {
      url: '/new',
      controller: 'ProjectNewController',
      templateUrl: 'public/partials/project/create.html',
      access: access.admin
    })
    .state('root.project.edit', {
      url: '/edit/:projectID',
      controller: 'ProjectEditController',
      templateUrl: 'public/partials/project/edit.html',
      access: access.admin
    })
    .state('root.project.users', {
      url: '/users/:projectID',
      controller: 'ProjectUserController',
      templateUrl: 'public/partials/project/users.html',
      access: access.admin
    })
    .state('root.enterprise', {
      url: 'enterprise',
      controller: 'EnterpriseController',
      templateUrl: 'public/partials/enterprise/index.html',
      access: access.admin
    })
    .state('root.enterprise.new', {
      url: '/new',
      controller: 'EnterpriseNewController',
      templateUrl: 'public/partials/enterprise/create.html',
      access: access.admin
    })
    .state('root.enterprise.edit', {
      url: '/edit/:enterpriseID',
      controller: 'EnterpriseEditController',
      templateUrl: 'public/partials/enterprise/edit.html',
      access: access.admin
    })
    .state('root.ticket', {
      url: 'ticket/:ticketID',
      controller: 'TicketController',
      templateUrl: 'public/partials/ticket/view.html',
      access: access.public
    })
    .state('root.ticketProject', {
      url: 'ticket/project/:projectID',
      controller: 'TicketProjectController',
      templateUrl: 'public/partials/ticket/project.html',
      access: access.public
    })
    .state('root.ticketNew', {
      url: 'ticket/new/:projectID',
      controller: 'TicketNewController',
      templateUrl: 'public/partials/ticket/new.html',
      access: access.public
    })
    .state('root.setting', {
      url: 'setting',
      controller: 'SettingController',
      templateUrl: 'public/partials/setting/index.html',
      access: access.admin
    })
    .state('root.profile', {
      url: 'profile',
      controller: 'ProfileController',
      templateUrl: 'public/partials/profile.html',
      access: access.public
    })
    .state('root.404', {
      url: '/404',
      templateUrl: 'public/partials/404.html',
      access: access.public
    });

  // $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  });
});

App.run([
  '$rootScope',
  '$location',
  '$http',
  'Auth',
  function($rootScope, $location, $http, Auth) {

    'use strict';

    $rootScope.$on('$stateChangeStart', function(event, next) {
      $rootScope.error = null;

      if (!Auth.authorize(next.access)) {
        if (Auth.isLoggedIn()) {
          $location.path('/');
        }
        else {
          $location.path('/login');
        }
      }
    });
  }
]);
