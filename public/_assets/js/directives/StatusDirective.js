App.directive('status', function() {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    template: '<span class="label label-{{ statusClass }}"><i class="fa {{ statusIcon }}"></i> {{ statusText }}</span>',
    link: function(scope, element, attrs) {
      switch (attrs.type) {
        case 'ticket':
          switch (attrs.status) {
            case '0':
              scope.statusClass = 'danger';
              scope.statusIcon = 'fa-exclamation';
              scope.statusText = 'Aberto';
              break;

            case '1':
              scope.statusClass = 'warning';
              scope.statusIcon = 'fa-coffee';
              scope.statusText = 'Em aprovação';
              break;

            case '2':
              scope.statusClass = 'success';
              scope.statusIcon = 'fa-smile-o';
              scope.statusText = 'Finalizado';
              break;

            default:
              scope.statusClass = 'default';
              scope.statusIcon = 'fa-asterisk';
              scope.statusText = 'Status';
          }
          break;

        default:
          scope.statusClass = 'default';
          scope.statusIcon = 'fa-asterisk';
          scope.statusText = 'Status';
      }
    }
  };
});
