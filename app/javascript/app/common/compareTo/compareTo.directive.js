/* @ngInject */
const compareToDirective = () => {
  return {
      require: 'ngModel',
      scope: {
          otherModelValue: '=compareTo'
      },
      link: function(scope, _element, _attributes, ngModel) {
          ngModel.$validators.compareTo = function(modelValue) {
              return modelValue == scope.otherModelValue;
          };
          scope.$watch('otherModelValue', function() {
              ngModel.$validate();
          });
      }
  };
};

export default angular.module('app.common.compareTo.directive', [])
    .directive('compareTo', compareToDirective).name;
