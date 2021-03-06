/* @ngInject */
function autofocusDirective(
    $timeout
) {
    return {
        restrict: 'A',
        link: (scope, element, attributes) => {
            const focus = () => {
                $timeout(() => {
                    element[0].focus();
                }, 300);
            };
            scope.$watch(attributes.autofocus, (value) => {
                if (value) {
                    focus();
                }
            });
            if (attributes.autofocus === '') {
                focus();
            }
        }
    };
}

export default angular.module('app.common.autofocus.directive', [])
    .directive('autofocus', autofocusDirective).name;
