App.factory('Contact', function($http, Util) {

  'use strict';

  var url = 'http://dev.jawsproject.com/api';

  return {
    add: function(item, scope, data, callback) {
      if (item !== 'Email' && item !== 'Phone') return null;

      var _item = angular.lowercase(item),
          items = scope[_item + 's'];

      $http({
        url: url + '/' + item + '/add',
        method: 'POST',
        data: data
      })
      .success(function(data) {
        items.push(data);
        scope['new' + _item] = '';

        if (callback) {
          callback.apply(null, [data]);
        }
      });

    },
    edit: function(item, data, callback) {
      if (item !== 'Email' && item !== 'Phone') return null;

      $http({
        url: url + '/' + item + '/edit',
        method: 'PUT',
        data: data
      })
      .success(function() {
        if (callback) {
          callback.apply(null, [data]);
        }
      });
    },
    remove: function(item, scope, data, callback) {
      if (item !== 'Email' && item !== 'Phone') return null;

      var _item = angular.lowercase(item),
          items = scope[_item + 's'];

      $http({
        url: url + '/' + item + '/remove',
        method: 'DELETE',
        data: data
      })
      .success(function(data) {
        var index = Util.findById(items, data.id, 'index');

        items.splice(index, 1);

        if (callback) {
          callback.apply(null, [data]);
        }
      });
    },
    setDefault: function(item, scope, data, callback) {
      if (item !== 'Email' && item !== 'Phone') return null;

      var _item = angular.lowercase(item),
          items = scope[_item + 's'];

      $http({
        url: url + '/' + item + '/setDefault',
        method: 'PUT',
        data: data
      })
      .success(function (data) {
        for (var i = 0, j = items.length; i < j; i++) {
          items[i].nivel = (items[i].id == data.id) ? 1 : 0;
        }

        if (callback) {
          callback(data);
        }
      });
    }
  };
});
