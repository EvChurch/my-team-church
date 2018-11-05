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
      parent: 'root',
      resolve: {
        0: /* @ngInject*/ ($state) => {
          $state.go('me.positionEntities');
        }
      }
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
      parent: 'root'
    }).state({
      name: 'departments.detail',
      url: '/:departmentId',
      component: 'departmentsDetail'
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
      name: 'departments.detail.leaders.detail.objectives',
      url: '/objectives',
      views: {
        'list@departments.detail.leaders.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'department_leader'
      }
    }).state({
      name: 'departments.detail.leaders.detail.serviceTypeConnections',
      url: '/service_type_connections',
      views: {
        'list@departments.detail.leaders.detail': {
          component: 'serviceTypeConnections'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'department_leader'
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
        departmentId: /* @ngInject*/ ($stateParams) => $stateParams.departmentId
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
        entityId: /* @ngInject*/ ($stateParams) => $stateParams.entityId
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
      name: 'departments.detail.positions.detail.entities.detail.serviceTypeConnections',
      url: '/service_type_connections',
      views: {
        'list@departments.detail.positions.detail.entities.detail': {
          component: 'serviceTypeConnections'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'departments.detail.positions.detail.items',
      url: '/items',
      views: {
        'list@departments.detail.positions.detail': {
          component: 'departmentsDetailPositionsDetailItems'
        }
      },
      resolve: {
        positionId: /* @ngInject*/ ($stateParams) => $stateParams.positionId
      }
    }).state({
      name: 'departments.detail.positions.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@departments.detail.positions.detail': {
          component: 'departmentsDetailPositionsDetailJobDescription'
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
      name: 'departments.detail.positions.detail.training',
      url: '/training',
      views: {
        'list@departments.detail.positions.detail': {
          component: 'departmentsDetailPositionsDetailTraining'
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
            $state.go('person.detail.positionEntities');
            throw ex;
          });
        }
      }
    }).state({
      name: 'people.detail.positionEntities.detail.objectives',
      url: '/objectives',
      views: {
        'list@people.detail.positionEntities.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionEntityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'people.detail.positionEntities.detail.items',
      url: '/items',
      views: {
        'list@people.detail.positionEntities.detail': {
          component: 'departmentsDetailPositionsDetailItems'
        }
      },
      resolve: {
        positionEntity: /* @ngInject*/ ($state, $stateParams, personPositionEntities) => {
          return personPositionEntities.get(
            $stateParams.personId, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('person.detail.positionEntities');
            throw ex;
          });
        },
        positionId: /* @ngInject*/ (positionEntity) => positionEntity.position.id,
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.positionEntities.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@people.detail.positionEntities.detail': {
          component: 'departmentsDetailPositionsDetailJobDescription'
        }
      },
      resolve: {
        positionEntity: /* @ngInject*/ ($state, $stateParams, personPositionEntities) => {
          return personPositionEntities.get(
            $stateParams.personId, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('person.detail.positionEntities');
            throw ex;
          });
        },
        position: /* @ngInject*/ (positionEntity) => positionEntity.position,
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.positionEntities.detail.training',
      url: '/training',
      views: {
        'list@people.detail.positionEntities.detail': {
          component: 'departmentsDetailPositionsDetailTraining'
        }
      },
      resolve: {
        positionEntity: /* @ngInject*/ ($state, $stateParams, personPositionEntities) => {
          return personPositionEntities.get(
            $stateParams.personId, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('person.detail.positionEntities');
            throw ex;
          });
        },
        position: /* @ngInject*/ (positionEntity) => positionEntity.position,
        readOnly: () => true
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
            $state.go('me.positionEntities');
            throw ex;
          });
        }
      }
    }).state({
      name: 'me.positionEntities.detail.objectives',
      url: '/objectives',
      views: {
        'list@me.positionEntities.detail': {
          component: 'objectives',
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionEntityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'me.positionEntities.detail.items',
      url: '/items',
      views: {
        'list@me.positionEntities.detail': {
          component: 'departmentsDetailPositionsDetailItems'
        }
      },
      resolve: {
        positionEntity: /* @ngInject*/ ($state, $stateParams, people, personPositionEntities) => {
          return personPositionEntities.get(
            people.me.id, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('me.positionEntities');
            throw ex;
          });
        },
        positionId: /* @ngInject*/ (positionEntity) => positionEntity.position.id,
        readOnly: () => true
      }
    }).state({
      name: 'me.positionEntities.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@me.positionEntities.detail': {
          component: 'departmentsDetailPositionsDetailJobDescription'
        }
      },
      resolve: {
        positionEntity: /* @ngInject*/ ($state, $stateParams, people, personPositionEntities) => {
          return personPositionEntities.get(
            people.me.id, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('me.positionEntities');
            throw ex;
          });
        },
        position: /* @ngInject*/ (positionEntity) => positionEntity.position,
        readOnly: () => true
      }
    }).state({
      name: 'me.positionEntities.detail.training',
      url: '/training',
      views: {
        'list@me.positionEntities.detail': {
          component: 'departmentsDetailPositionsDetailTraining'
        }
      },
      resolve: {
        positionEntity: /* @ngInject*/ ($state, $stateParams, people, personPositionEntities) => {
          return personPositionEntities.get(
            people.me.id, $stateParams.positionEntityId
          ).catch((ex) => {
            $state.go('me.positionEntities');
            throw ex;
          });
        },
        position: /* @ngInject*/ (positionEntity) => positionEntity.position,
        readOnly: () => true
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
      title: 'Organizations',
      component: 'organizations',
      url: '/organizations',
      resolve: {
        0: /* @ngInject*/ ($state, user, organizations) => {
          return user.load().catch((ex) => {
            $state.go('signIn');
            throw ex;
          });
        }
      }
    }).state({
      name: 'organizations.create',
      title: 'Sign Up My Organization',
      component: 'organizationsCreate',
      url: '/create'
    }).state({
      name: 'organizations.edit',
      title: 'Edit My Organization',
      component: 'organizationsEdit',
      url: '/edit',
      resolve: {
        0: /* @ngInject*/ (organizations) => organizations.load(),
        organization: /* @ngInject*/ (api, organizations) => organizations.get(api.organization_id)
      }
    }).state({
      name: 'organizations.integrations',
      title: 'My Organization Integrations',
      component: 'organizationsIntegrations',
      url: '/integrations',
      resolve: {
        0: /* @ngInject*/ (organizations) => organizations.load(),
        organization: /* @ngInject*/ (api, organizations) => organizations.get(api.organization_id)
      }
    }).state({
      name: 'organizations.connect',
      title: 'Connect My Organization',
      component: 'organizationsConnect',
      url: '/connect?access_code'
    });
  }
}
