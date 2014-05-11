App.factory('Session', function() {
  'use strict';

  return {
    set: function(key, value) {
      sessionStorage.setItem(key, value);
    },
    get: function(key) {
      return JSON.parse(sessionStorage.getItem(key));
    },
    unset: function(key) {
      sessionStorage.removeItem(key);
    }
  };
});
