/* @ngInject*/
export default function appRun(
  $rootScope, $transitions, $window
) {
  $transitions.onFinish(null, (trans) => {
    changePageTitle(trans, $rootScope, $window);
  });
}

function changePageTitle(transition, $rootScope, $window) {
    const newState = transition.$to();
    $rootScope.pageTitle = newState.title;
}
