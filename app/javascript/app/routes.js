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
          $state.go('me.roles');
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
      parent: 'root',
      resolve: {
        0: /* @ngInject */ ($state, organizations) => {
          if(!organizations.primary.admin && !organizations.primary.department_leader) {
            $state.go('home');
          }
        }
      }
    }).state({
      name: 'departments.chart',
      title: 'Organizational Chart',
      url: '/chart',
      component: 'departmentsChart'
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
      },
      params: {
        departmentsDetailExapanded: true
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
      },
      params: {
        departmentsDetailTeamsDetailExpanded: true
      }
    }).state({
      name: 'departments.detail.teams.detail.leaders',
      url: '/leaders',
      views: {
        'list@departments.detail.teams.detail': {
          component: 'departmentsDetailTeamsDetailLeaders'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.leaders.detail',
      url: '/:leaderId',
      views: {
        'branch@departments.detail.teams.detail': {
          component: 'departmentsDetailTeamsDetailLeadersDetail'
        }
      }
    }).state({
      name: 'departments.detail.teams.detail.leaders.detail.objectives',
      url: '/objectives',
      views: {
        'list@departments.detail.teams.detail.leaders.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'team_leader'
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
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
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
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'departments.detail.teams.detail.positions.detail.training',
      url: '/training',
      views: {
        'list@departments.detail.teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
        }
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'teams',
      title: 'Teams',
      url: '/teams',
      component: 'teams',
      parent: 'root',
      resolve: {
        0: /* @ngInject */ ($state, organizations) => {
          if(!organizations.primary.admin && !organizations.primary.team_leader) {
            $state.go('home');
          }
        }
      }
    }).state({
      name: 'teams.detail',
      url: '/:teamId',
      component: 'departmentsDetailTeamsDetail'
    }).state({
      name: 'teams.detail.objectives',
      url: '/objectives',
      views: {
        'list@teams.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.teamId,
        resourceType: () => 'team'
      },
      params: {
        departmentsDetailTeamsDetailExpanded: true
      }
    }).state({
      name: 'teams.detail.leaders',
      url: '/leaders',
      views: {
        'list@teams.detail': {
          component: 'departmentsDetailTeamsDetailLeaders'
        }
      }
    }).state({
      name: 'teams.detail.leaders.detail',
      url: '/:leaderId',
      views: {
        'branch@teams.detail': {
          component: 'departmentsDetailTeamsDetailLeadersDetail'
        }
      }
    }).state({
      name: 'teams.detail.leaders.detail.objectives',
      url: '/objectives',
      views: {
        'list@teams.detail.leaders.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'team_leader'
      },
      params: {
        expanded: true
      }
    }).state({
      name: 'teams.detail.positions',
      url: '/positions',
      views: {
        'list@teams.detail': {
          component: 'departmentsDetailTeamsDetailPositions'
        }
      }
    }).state({
      name: 'teams.detail.positions.detail',
      url: '/:positionId',
      views: {
        'branch@teams.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetail'
        }
      }
    }).state({
      name: 'teams.detail.positions.detail.objectives',
      url: '/objectives',
      views: {
        'list@teams.detail.positions.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.positionId,
        resourceType: () => 'team_position'
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'teams.detail.positions.detail.entities',
      url: '/entities',
      views: {
        'list@teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailEntities'
        }
      }
    }).state({
      name: 'teams.detail.positions.detail.entities.detail',
      url: '/:entityId',
      views: {
        'branch@teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailEntitiesDetail'
        }
      }
    }).state({
      name: 'teams.detail.positions.detail.entities.detail.objectives',
      url: '/objectives',
      views: {
        'list@teams.detail.positions.detail.entities.detail': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'team_position_entity'
      }
    }).state({
      name: 'teams.detail.positions.detail.items',
      url: '/items',
      views: {
        'list@teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
        }
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'teams.detail.positions.detail.jobDescription',
      url: '/job_description',
      views: {
        'list@teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'teams.detail.positions.detail.training',
      url: '/training',
      views: {
        'list@teams.detail.positions.detail': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
        }
      },
      params: {
        departmentsDetailTeamsDetailPositionsDetailExpanded: true
      }
    }).state({
      name: 'people',
      title: 'People',
      url: '/people',
      component: 'people',
      parent: 'root',
      resolve: {
        0: /* @ngInject */ ($state, organizations) => {
          if(!organizations.primary.admin) {
            $state.go('home');
          }
        },
        1: /* @ngInject */ (people) => people.load()
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
      },
      params: {
        peopleDetailExpanded: true
      }
    }).state({
      name: 'people.detail.roles',
      url: '/roles',
      views: {
        'list@people.detail': {
          component: 'peopleDetailRoles'
        }
      },
      resolve: {
        personId: /* @ngInject */ ($stateParams) => $stateParams.personId,
      }
    }).state({
      name: 'people.detail.roles.entity',
      url: '/entities/:entityId',
      views: {
        'branch@people.detail': {
          component: 'peopleDetailRolesEntity',
        }
      },
      resolve: {
        personId: /* @ngInject */ ($stateParams) => $stateParams.personId,
        entityId: /* @ngInject */ ($stateParams) => $stateParams.entityId
      }
    }).state({
      name: 'people.detail.roles.entity.objectives',
      url: '/objectives',
      views: {
        'list@people.detail.roles.entity': {
          component: 'objectives'
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'team_position_entity'
      }
    }).state({
      name: 'people.detail.roles.entity.items',
      url: '/positions/:positionId/items',
      views: {
        'list@people.detail.roles.entity': {
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.roles.entity.jobDescription',
      url: '/positions/:positionId/job_description',
      views: {
        'list@people.detail.roles.entity': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.roles.entity.training',
      url: '/positions/:positionId/training',
      views: {
        'list@people.detail.roles.entity': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'people.detail.roles.departmentLeader',
      url: '/department_leaders/:leaderId',
      views: {
        'branch@people.detail': {
          component: 'departmentsDetailLeadersDetail'
        }
      }
    }).state({
      name: 'people.detail.roles.departmentLeader.objectives',
      url: '/objectives',
      views: {
        'list@people.detail.roles.departmentLeader': {
          component: 'objectives',
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'department_leader'
      }
    }).state({
      name: 'people.detail.roles.teamLeader',
      url: '/team_leaders/:leaderId',
      views: {
        'branch@people.detail': {
          component: 'departmentsDetailTeamsDetailLeadersDetail'
        }
      }
    }).state({
      name: 'people.detail.roles.teamLeader.objectives',
      url: '/objectives',
      views: {
        'list@people.detail.roles.teamLeader': {
          component: 'objectives',
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'team_leader'
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
        resourceId: /* @ngInject */ (people) => people.getMe().then((me) => me.id),
        resourceType: () => 'person'
      },
      params: {
        peopleDetailExpanded: true
      }
    }).state({
      name: 'me.roles',
      url: '/roles',
      views: {
        'list@me': {
          component: 'peopleDetailRoles'
        }
      }
    }).state({
      name: 'me.roles.entity',
      url: '/entities/:entityId',
      views: {
        'branch@me': {
          component: 'peopleDetailRolesEntity'
        }
      }
    }).state({
      name: 'me.roles.entity.objectives',
      url: '/objectives',
      views: {
        'list@me.roles.entity': {
          component: 'objectives',
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.entityId,
        resourceType: () => 'team_position_entity'
      }
    }).state({
      name: 'me.roles.entity.items',
      url: '/positions/:positionId/items',
      views: {
        'list@me.roles.entity': {
          component: 'departmentsDetailTeamsDetailPositionsDetailItems'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'me.roles.entity.jobDescription',
      url: '/positions/:positionId/job_description',
      views: {
        'list@me.roles.entity': {
          component: 'departmentsDetailTeamsDetailPositionsDetailJobDescription'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'me.roles.entity.training',
      url: '/positions/:positionId/training',
      views: {
        'list@me.roles.entity': {
          component: 'departmentsDetailTeamsDetailPositionsDetailTraining'
        }
      },
      resolve: {
        readOnly: () => true
      }
    }).state({
      name: 'me.roles.departmentLeader',
      url: '/department_leaders/:leaderId',
      views: {
        'branch@me': {
          component: 'departmentsDetailLeadersDetail'
        }
      }
    }).state({
      name: 'me.roles.departmentLeader.objectives',
      url: '/objectives',
      views: {
        'list@me.roles.departmentLeader': {
          component: 'objectives',
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'department_leader'
      }
    }).state({
      name: 'me.roles.teamLeader',
      url: '/team_leaders/:leaderId',
      views: {
        'branch@me': {
          component: 'departmentsDetailTeamsDetailLeadersDetail'
        }
      }
    }).state({
      name: 'me.roles.teamLeader.objectives',
      url: '/objectives',
      views: {
        'list@me.roles.teamLeader': {
          component: 'objectives',
        }
      },
      resolve: {
        resourceId: /* @ngInject */ ($stateParams) => $stateParams.leaderId,
        resourceType: () => 'team_leader'
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
    }).state({
      name: 'admins',
      title: 'Admins',
      component: 'admins',
      url: '/admins',
      parent: 'root',
      resolve: {
        0: /* @ngInject */ ($state, organizations) => {
          if(!organizations.primary.admin) {
            $state.go('home');
          }
        }
      }
    });
  }
}
