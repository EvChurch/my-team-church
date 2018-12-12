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
      }
    }).state({
      name: 'departments.detail.leaders.detail',
      url: '/:leaderId',
      views: {
        'branch@departments.detail': {
          component: 'departmentsDetailLeadersDetail'
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
      name: 'departments.detail.teams',
      url: '/teams',
      views: {
        'list@departments.detail': {
          component: 'departmentsDetailTeams'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail',
      url: '/:teamId',
      views: {
        'branch@departments.detail': {
          component: 'departmentsDetailTeamsDetail'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.objectives',
      url: '/objectives',
      views: {
        'list@departments.detail.teams.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.teamId,
        resourceType: () => 'team'
      }
    }).state({
      name: 'departments.detail.teams.detail.positions',
      url: '/positions',
      views: {
        'list@departments.detail.teams.detail': {
          component: 'departmentsDetailTeamsDetailPositions'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail',
      url: '/:positionId',
      views: {
        'branch@departments.detail.teams.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetail'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.objectives',
      url: '/objectives',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.positionId,
        resourceType: () => 'team_position'
      }
    }).state({
      name: 'departments.detail.team.detail.positions.detail.entities',
      url: '/entities',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailEntities'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.entities.detail',
      url: '/:entityId',
      views: {
        'branch@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailEntitiesDetail'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.entities.detail.objectives',
      url: '/objectives',
      views: {
        'list@departments.detail.teams.detail.positions.detail.entities.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'position_entity'
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.items',
      url: '/items',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.training',
      url: '/training',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
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
      component: 'peopleDetail'
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
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
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
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
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
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
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
      parent: 'root'
    }).state({
      name: 'me.objectives',
      url: '/objectives',
      views: {
        'list@me': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject*/ (people) => people.getMe().then((me) => me.id),
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
        personId: /* @ngInject*/ (people) => people.getMe().then((me) => me.id)
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
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
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
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
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
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
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
      name: 'organizations.integrations.elvanto',
      title: 'Elvanto Integration',
      component: 'organizationsIntegrationsElvanto',
      url: '/elvanto',
    }).state({
      name: 'organizations.integrations.fluro',
      title: 'Fluro Integration',
      component: 'organizationsIntegrationsFluro',
      url: '/fluro',
    }).state({
      name: 'organizations.connect',
      title: 'Connect My Organization',
      component: 'organizationsConnect',
      url: '/connect?access_code'
    });
  }
}
