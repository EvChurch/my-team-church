/* @ngInject*/
export default function appRun(
  $rootScope, $transitions, $window
) {
  $transitions.onFinish(null, (trans) => {
    changePageTitle(trans, $rootScope, $window);
  });
}

function changePageTitle(transition, $rootScope) {
  const newState = transition.$to();
  $rootScope.pageTitle = newState.title;
}
