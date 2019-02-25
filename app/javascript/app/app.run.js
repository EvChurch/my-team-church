/* @ngInject */
export default function appRun(
  $location, $rootScope, $transitions, $window, user, organizations
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
      if (!$window.localStorage.getItem('redirect')) {
        $window.localStorage.setItem('redirect', $location.absUrl());
      }
      trans.router.stateService.target('signIn');
    });
  });

  $transitions.onFinish(null, (trans) => {
    changePageTitle(trans, $rootScope, $window);
    $('.pad-box').scrollLeft($(document).outerWidth());
  });

  $window.addEventListener('resize', () => {
    setVh();
  });

  setVh();
}

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
}

function changePageTitle(transition, $rootScope) {
  const newState = transition.$to();
  $rootScope.pageTitle = newState.title;
}
