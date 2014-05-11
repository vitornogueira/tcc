App.directive('priority', function() {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    template: '<span class="{{ priorityClass }} label"><i class="fa {{ priorityIcon }}"></i> Prioridade {{ priorityText }}</span>',
    link: function(scope, element, attrs) {
      switch (attrs.value) {
        case '0':
          scope.priorityClass = 'label-success';
          scope.priorityIcon = 'fa-plane';
          scope.priorityText = 'Baixa';
          break;

        case '1':
          scope.priorityClass = 'label-warning';
          scope.priorityIcon = 'fa-fighter-jet';
          scope.priorityText = 'Média';
          break;

        case '2':
          scope.priorityClass = 'label-danger';
          scope.priorityIcon = 'fa-rocket';
          scope.priorityText = 'Alta';
          break;
      }
    }
  };
});
