App.factory('Util', function() {

  'use strict';

  return {
    findById: function findById(array, id, returnType) {
      for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
        if (array[i].id == id) {
          return (returnType === 'index') ? i : array[i];
        }
      }
      return null;
    }
  };
});
