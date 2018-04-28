export default class Routes {
  static config($stateProvider) {
    $stateProvider.state({
      name: 'root',
      abstract: true,
      component: 'root',
      resolve: {
        0: /* @ngInject*/ ($state, user, organizations) => {
          return user.load().then(() => {
            return organizations.load().then((data) => {
              if (data.length === 0) {
                $state.go('organizations');
              }
            });
          }).catch((ex) => {
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
      name: 'people.new',
      url: '/new',
      component: 'peopleDetail'
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
      name: 'people.detail.positionEntities',
      url: '/position_entities',
      component: 'peopleDetailPositionEntities',
      resolve: {
        personId: /* @ngInject*/ ($stateParams) => $stateParams.personId,
        list: /* @ngInject*/ ($state, $stateParams, personPositionEntities) => {
          return personPositionEntities.load(
            $stateParams.personId
          ).catch((ex) => {
            $state.go('people.detail');
            throw ex;
          });
        }
      }
    }).state({
      name: 'people.detail.positionEntities.detail',
      url: '/:positionEntityId',
      component: 'peopleDetailPositionEntitiesDetail',
      resolve: {
        personId: /* @ngInject*/ ($stateParams) => $stateParams.personId,
        positionEntityId: /* @ngInject*/ ($stateParams) => $stateParams.positionEntityId,
        positionEntity: /* @ngInject*/ ($state, $stateParams, personPositionEntities) => {
          return personPositionEntities.get(
            $stateParams.personId, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('person.detail.positionEntities.detail');
            throw ex;
          });
        }
      }
    }).state({
      name: 'people.detail.positionEntities.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionEntityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'me',
      url: '/me',
      component: 'peopleDetail',
      parent: 'root',
      resolve: {
        person: /* @ngInject*/ ($state, $stateParams, people) => {
          return people.getMe().catch((ex) => {
            $state.go('organizations.connect');
            throw ex;
          });
        }
      }
    }).state({
      name: 'me.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ (people) => people.me.id,
        resourceType: () => 'person'
      }
    }).state({
      name: 'me.positionEntities',
      url: '/position_entities',
      component: 'peopleDetailPositionEntities',
      resolve: {
        personId: /* @ngInject*/ (people) => people.me.id,
        list: /* @ngInject*/ ($state, people, personPositionEntities) => {
          return personPositionEntities.load(
            people.me.id
          ).catch((ex) => {
            $state.go('people.detail');
            throw ex;
          });
        }
      }
    }).state({
      name: 'me.positionEntities.detail',
      url: '/:positionEntityId',
      component: 'peopleDetailPositionEntitiesDetail',
      resolve: {
        personId: /* @ngInject*/ (people) => people.me.id,
        positionEntityId: /* @ngInject*/ ($stateParams) => $stateParams.positionEntityId,
        positionEntity: /* @ngInject*/ ($state, $stateParams, people, personPositionEntities) => {
          return personPositionEntities.get(
            people.me.id, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('person.detail.positionEntities.detail');
            throw ex;
          });
        }
      }
    }).state({
      name: 'me.positionEntities.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionEntityId,
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
