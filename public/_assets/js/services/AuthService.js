App.factory('Auth', function($http, $location, $rootScope, Session) {

  'use strict';

  var accessLevels = routingConfig.accessLevels,
      userRoles = routingConfig.userRoles,
      currentUser = Session.get('authorized') ? Session.get('authorized') : { email: '', role: userRoles.public };

  return {
    authorize: function(accessLevel, role) {
      if (role === undefined) {
        role = currentUser.role;
      }

      return accessLevel.bitMask & role.bitMask;
    },
    isLoggedIn: function() {
      return Session.get('authorized');
    },
    login: function(user) {
      var login = $http.post('/api/Auth/login', user);

      login.success(function(res) {
        var user = {
          user_name: res.name,
          enterprise_name: res.enterprise,
          email: res.email,
          token: res.token,
          role: userRoles[res.role]
        };

        Session.set('authorized', JSON.stringify(user));
        $location.path('/');
      });

      login.error(function(res) {
        $rootScope.error = "Email ou senha inválidos.";
      });

    },
    logout: function(success, error) {
      var logout = $http.post('/api/Auth/logout');

      logout.success(function() {
        $location.path('/login');
        Session.unset('authorized');
      });

      logout.error(function() {
        $rootScope.error = 'Erro ao fazer logout, tente novamente.';
      });
    },
    accessLevels: accessLevels,
    userRoles: userRoles,
    user: currentUser
  };
});
