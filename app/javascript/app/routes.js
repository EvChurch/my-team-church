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
      views: {
        'list@departments.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId,
        resourceType: () => 'department'
      }
    }).state({
      name: 'departments.detail.leaders',
      url: '/leaders',
      views: {
        'list@departments.detail': {
          component: 'departmentsDetailLeaders'
        }
      },
      resolve: {
        departmentId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId
      }
    }).state({
      name: 'departments.detail.leaders.detail',
      url: '/:leaderId',
      views: {
        'branch@departments.detail': {
          component: 'departmentsDetailLeadersDetail'
        }
      },
      resolve: {
        departmentId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId,
        leader: /* @ngInject*/ ($state, $stateParams, departmentLeaders) => {
          return departmentLeaders.get($stateParams.departmentId, $stateParams.leaderId).catch((ex) => {
            $state.go('departments.detail.leaders');
            throw ex;
          });
        }
      }
    }).state({
      name: 'departments.detail.positions',
      url: '/positions',
      views: {
        'list@departments.detail': {
          component: 'departmentsDetailPositions'
        }
      },
      resolve: {
        departmentId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId
      }
    }).state({
      name: 'departments.detail.positions.detail',
      url: '/:positionId',
      views: {
        'branch@departments.detail': {
          component: 'departmentsDetailPositionsDetail'
        }
      },
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
      views: {
        'list@departments.detail.positions.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionId,
        resourceType: () => 'position'
      }
    }).state({
      name: 'departments.detail.positions.detail.entities',
      url: '/entities',
      views: {
        'list@departments.detail.positions.detail': {
          component: 'departmentsDetailPositionsDetailEntities'
        }
      },
      resolve: {
        positionId: /* @ngInject*/ ($stateParams) => $stateParams.positionId,
      }
    }).state({
      name: 'departments.detail.positions.detail.entities.detail',
      url: '/:entityId',
      views: {
        'branch@departments.detail.positions.detail': {
          component: 'departmentsDetailPositionsDetailEntitiesDetail'
        }
      },
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
      views: {
        'list@departments.detail.positions.detail.entities.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'locations',
      title: 'Locations',
      url: '/locations',
      component: 'locations',
      parent: 'root',
      resolve: {
        0: /* @ngInject*/ (locations) => locations.load()
      }
    }).state({
      name: 'locations.new',
      url: '/new',
      component: 'locationsDetail'
    }).state({
      name: 'locations.detail',
      url: '/:locationId',
      component: 'locationsDetail',
      resolve: {
        location: /* @ngInject*/ ($state, $stateParams, locations) => {
          return locations.get($stateParams.locationId).catch((ex) => {
            $state.go('locations');
            throw ex;
          });
        }
      }
    }).state({
      name: 'serviceTypes',
      title: 'Service Types',
      url: '/service_types',
      component: 'serviceTypes',
      parent: 'root',
      resolve: {
        0: /* @ngInject*/ (serviceTypes) => serviceTypes.load()
      }
    }).state({
      name: 'serviceTypes.new',
      url: '/new',
      component: 'serviceTypesDetail'
    }).state({
      name: 'serviceTypes.detail',
      url: '/:serviceTypeId',
      component: 'serviceTypesDetail',
      resolve: {
        serviceType: /* @ngInject*/ ($state, $stateParams, serviceTypes) => {
          return serviceTypes.get($stateParams.serviceTypeId).catch((ex) => {
            $state.go('serviceTypes');
            throw ex;
          });
        }
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
      views: {
        'list@people.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.personId,
        resourceType: () => 'person'
      }
    }).state({
      name: 'people.detail.positionEntities',
      url: '/position_entities',
      views: {
        'list@people.detail': {
          component: 'peopleDetailPositionEntities'
        }
      },
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
      views: {
        'branch@people.detail': {
          component: 'peopleDetailPositionEntitiesDetail',
        }
      },
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
      views: {
        'list@me': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ (people) => people.me.id,
        resourceType: () => 'person'
      }
    }).state({
      name: 'me.positionEntities',
      url: '/position_entities',
      views: {
        'list@me': {
          component: 'peopleDetailPositionEntities'
        }
      },
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
      views: {
        'branch@me': {
          component: 'peopleDetailPositionEntitiesDetail'
        }
      },
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
