export default class Routes {
  static config($stateProvider) {
    $stateProvider.state({
      name: 'root',
      abstract: true,
      component: 'root',
      resolve: {
        0: /* @ngInject*/ ($state, user) => {
          return user.load().catch(() => {
            $state.go('signIn');
          });
        },
        1: /* @ngInject*/ ($state, organizations) => {
          organizations.load().then((data) => {
            if (data.length === 0) {
              $state.go('organizations');
            }
          }).catch(() => {
            $state.go('organizations');
          });
        }
      }
    }).state({
      name: 'home',
      title: 'Home',
      url: '/',
      component: 'home',
      parent: 'root'
    }).state({
      name: 'user',
      title: 'User',
      url: '/user',
      component: 'user',
      parent: 'root'
    }).state({
      name: 'departments',
      title: 'Departments',
      url: '/departments',
      component: 'departments',
      parent: 'root',
      resolve: {
        0: /* @ngInject*/ (departments) => departments.load()
      }
    }).state({
      name: 'departments.detail',
      url: '/:departmentId',
      component: 'departmentsDetail'
    }).state({
      name: 'departments.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId,
        resourceType: () => 'departments'
      }
    }).state({
      name: 'departments.detail.objectives.detail',
      url: '/:objectiveId',
      component: 'objectivesDetail',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId,
        resourceType: () => 'departments',
        objective: /* @ngInject*/ ($state, $stateParams, objectives) => {
          return objectives.get($stateParams.departmentId, 'departments', $stateParams.objectiveId).catch((ex) => {
            $state.go('departments.detail.objectives', { departmentId: $stateParams.departmentId });
            throw ex;
          });
        }
      }
    }).state({
      name: 'departments.detail.positions',
      url: '/positions',
      component: 'departmentsDetailPositions',
      resolve: {
        positions: /* @ngInject*/ ($stateParams, departments) => departments.getPositions($stateParams.departmentId)
      }
    }).state({
      name: 'auth',
      abstract: true,
      component: 'auth'
    }).state({
      name: 'signIn',
      title: 'Sign In',
      url: '/sign_in',
      component: 'authSignIn',
      parent: 'auth'
    }).state({
      name: 'signUp',
      title: 'Sign Up',
      url: '/sign_up',
      component: 'authSignUp',
      parent: 'auth'
    }).state({
      name: 'organizations',
      component: 'organizations',
      url: '/organizations'
    }).state({
      name: 'organizations.create',
      component: 'organizationsCreate',
      url: '/create'
    }).state({
      name: 'organizations.edit',
      component: 'organizationsEdit',
      url: '/edit',
      resolve: {
        0: /* @ngInject*/ (organizations) => organizations.load(),
        organization: /* @ngInject*/ (api, organizations) => organizations.get(api.organization_id)
      }
    }).state({
      name: 'organizations.connect',
      component: 'organizationsConnect',
      url: '/connect'
    });
  }
}
