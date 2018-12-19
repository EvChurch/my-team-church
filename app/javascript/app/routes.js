export default class Routes {
  static config($stateProvider) {
    $stateProvider.state({
      name: 'root',
      abstract: true,
      component: 'root',
      resolve: {
        0: /* @ngInject */ ($state, user, organizations) => {
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
        0: /* @ngInject */ ($state) => {
          $state.go('me.entities');
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
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.departmentId,
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
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
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
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.teamId,
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
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.positionId,
        resourceType: () => 'team_position'
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.entities',
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
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'team_position_entity'
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
        0: /* @ngInject */ (people) => people.load()
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
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.personId,
        resourceType: () => 'person'
      }
    }).state({
      name: 'people.detail.entities',
      url: '/entities',
      views: {
        'list@people.detail': {
          component: 'peopleDetailEntities'
        }
      },
      resolve: {
        personId: /* @ngInject */ ($stateParams) => $stateParams.personId,
      }
    }).state({
      name: 'people.detail.entities.detail',
      url: '/:entityId',
      views: {
        'branch@people.detail': {
          component: 'peopleDetailEntitiesDetail',
        }
      },
      resolve: {
        personId: /* @ngInject */ ($stateParams) => $stateParams.personId,
        entityId: /* @ngInject */ ($stateParams) => $stateParams.entityId
      }
    }).state({
      name: 'people.detail.entities.detail.objectives',
      url: '/objectives',
      views: {
        'list@people.detail.entities.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'team_position_entity'
      }
    }).state({
      name: 'people.detail.entities.detail.items',
      url: '/positions/:positionId/items',
      views: {
        'list@people.detail.entities.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.entities.detail.jobDescription',
      url: '/positions/:positionId/job_description',
      views: {
        'list@people.detail.entities.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.entities.detail.training',
      url: '/positions/:positionId/training',
      views: {
        'list@people.detail.entities.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
        }
      },
      resolve: {
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
      }
    }).state({
      name: 'me.entities',
      url: '/entities',
      views: {
        'list@me': {
          component: 'peopleDetailEntities'
        }
      }
    }).state({
      name: 'me.entities.detail',
      url: '/:entityId',
      views: {
        'branch@me': {
          component: 'peopleDetailEntitiesDetail'
        }
      }
    }).state({
      name: 'me.entities.detail.objectives',
      url: '/objectives',
      views: {
        'list@me.entities.detail': {
          component: 'objectives',
        }
      }
    }).state({
      name: 'me.entities.detail.items',
      url: '/items',
      views: {
        'list@me.entities.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'me.entities.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@me.entities.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'me.entities.detail.training',
      url: '/training',
      views: {
        'list@me.entities.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
        }
      },
      resolve: {
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
        0: /* @ngInject */ ($state, user) => {
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
        0: /* @ngInject */ (organizations) => organizations.load(),
        organization: /* @ngInject */ (api, organizations) => organizations.get(api.organization_id)
      }
    }).state({
      name: 'organizations.integrations',
      title: 'My Organization Integrations',
      component: 'organizationsIntegrations',
      url: '/integrations',
      resolve: {
        0: /* @ngInject */ (organizations) => organizations.load(),
        organization: /* @ngInject */ (api, organizations) => organizations.get(api.organization_id)
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
