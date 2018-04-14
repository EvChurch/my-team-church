export default class Routes {
  static config($stateProvider) {
    $stateProvider.state({
      name: 'root',
      abstract: true,
      component: 'root'
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
      component: 'departmentsDetail',
      resolve: {
        department: /* @ngInject*/ ($state, $stateParams, departments) => {
          return departments.get($stateParams.departmentId).catch((ex) => {
            $state.go('departments');
            throw ex;
          });
        }
      }
    }).state({
      name: 'departments.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId,
        resourceType: () => 'department'
      }
    }).state({
      name: 'departments.detail.positions',
      url: '/positions',
      component: 'departmentsDetailPositions',
      resolve: {
        departmentId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId
      }
    }).state({
      name: 'departments.detail.positions.detail',
      url: '/:positionId',
      component: 'departmentsDetailPositionsDetail',
      resolve: {
        departmentId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId,
        position: /* @ngInject*/ ($state, $stateParams, departmentPositions) => {
          return departmentPositions.get($stateParams.departmentId, $stateParams.positionId).catch((ex) => {
            $state.go('departments.detail.positions');
            throw ex;
          });
        }
      }
    }).state({
      name: 'departments.detail.positions.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionId,
        resourceType: () => 'position'
      }
    }).state({
      name: 'departments.detail.positions.detail.entities',
      url: '/entities',
      component: 'departmentsDetailPositionsDetailEntities',
      resolve: {
        positionId: /* @ngInject*/ ($stateParams) => $stateParams.positionId
      }
    }).state({
      name: 'departments.detail.positions.detail.entities.detail',
      url: '/:entityId',
      component: 'departmentsDetailPositionsDetailEntitiesDetail',
      resolve: {
        positionId: /* @ngInject*/ ($stateParams) => $stateParams.positionId,
        entityId: /* @ngInject*/ ($stateParams) => $stateParams.entityId,
        entity: /* @ngInject*/ ($state, $stateParams, departmentPositionEntities) => {
          return departmentPositionEntities.get(
            $stateParams.positionId, $stateParams.entityId
          ).catch((ex) => {
            $state.go('departments.detail.positions.detail.entities');
            throw ex;
          });
        }
      }
    }).state({
      name: 'departments.detail.positions.detail.entities.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'position_entity'
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
      name: 'organizations.integrations',
      component: 'organizationsIntegrations',
      url: '/integrations',
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
