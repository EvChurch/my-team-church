export default class Routes {
  static config($stateProvider) {
    $stateProvider.state({
      name: 'root',
      abstract: true,
      component: 'root',
      resolve: {
        0: /* @ngInject*/ ($state, user) => {
          return user.load().catch((ex) => {
            $state.go('signIn');
            throw ex;
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
      name: 'departments.detail.position',
      url: '/position/:positionId',
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
      name: 'departments.detail.position.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionId,
        resourceType: () => 'position'
      }
    }).state({
      name: 'departments.detail.position.entity',
      url: '/entity/:entityId',
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
      name: 'departments.detail.position.entity.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'people',
      title: 'People',
      url: '/people',
      component: 'people',
      parent: 'root',
      resolve: {
        0: /* @ngInject*/ (people) => people.load()
      }
    }).state({
      name: 'people.detail',
      url: '/:personId',
      component: 'peopleDetail',
      resolve: {
        person: /* @ngInject*/ ($state, $stateParams, people) => {
          return people.get($stateParams.personId).catch((ex) => {
            $state.go('people');
            throw ex;
          });
        }
      }
    }).state({
      name: 'people.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.personId,
        resourceType: () => 'person'
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
