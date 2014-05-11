App.filter('dateToISO', function() {

  'use strict';

  return function(input) {
    input = new Date(input);
    return input;
  };
});

App.filter('tel', function() {

  'use strict';

  return function(input) {
    if (!input) return '';

    var value = input.toString().trim().replace(/^\+/, ''),
        ddd,
        n1,
        n2;

    if (value.match(/[^0-9]/)) {
      return input;
    }

    ddd = value.slice(0, 2);
    n1 = value.slice(2, 6);
    n2 = value.slice(6, 10);

    return '(' + ddd + ') ' + n1 + '-' + n2;
  };
});
