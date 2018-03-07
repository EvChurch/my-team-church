/* @ngInject*/
export default function appRun(
  $rootScope, $transitions, $window, user, organizations
) {
  $transitions.onStart({
    to: (state) => state.name !== 'signIn' && state.name !== 'organizations'
  }, (trans) => {
    return user.load().then(() => {
      return organizations.load().then((data) => {
        if (data.length === 0) {
          trans.router.stateService.target('organizations');
        }
      }).catch(() => {
        trans.router.stateService.target('organizations');
      });
    }).catch(() => {
      trans.router.stateService.target('login');
    });
  });

  $transitions.onFinish(null, (trans) => {
    changePageTitle(trans, $rootScope, $window);
  });
}

function changePageTitle(transition, $rootScope) {
  const newState = transition.$to();
  $rootScope.pageTitle = newState.title;
}
