import gql from 'graphql-tag';

class Leaders {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load(teamId) {
    return this.api.query(gql`
      query teamLeaders($team_id: ID!) {
        teamLeaders(
          team_id: $team_id
        ) {
          id
          person {
            id
            name
            picture
          }
        }
      }
    `, { team_id: teamId }).then((data) => {
      return data.teamLeaders;
    });
  }
  get(id) {
    return this.api.query(gql`
      query teamLeader($id: ID!){
        teamLeader(
          id: $id
        ) {
          id
          person {
            id
            name
            picture
          }
          team {
            id
            name
            breadcrumb
          }
        }
      }
    `, { id: id }).then((data) => {
      if (data.teamLeader) {
        return data.teamLeader;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(teamId, leader) {
    return this.api.mutate(gql`
      mutation createTeamLeader(
        $team_id: ID!,
        $leader: TeamLeaderInputType!
      ) {
        createTeamLeader(
          team_id: $team_id,
          leader: $leader
        ) {
          id
          person {
            id
            name
          }
        }
      }
    `, { team_id: teamId, leader: leader }).then((data) => {
      const teamLeader = data.createTeamLeader;
      this.$rootScope.$emit('leaderCreate', teamId, teamLeader);
      return teamLeader;
    });
  }
  delete(teamId, id) {
    return this.api.mutate(gql`
      mutation deleteTeamLeader(
        $id: ID!
      ) {
        deleteTeamLeader(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const leader = data.deleteTeamLeader;
      this.$rootScope.$emit('leaderDelete', teamId, leader);
      return leader;
    });
  }
  openNewModal(teamId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsDetailTeamsDetailLeadersNewModalController',
      locals: {
        teamId: teamId
      }
    });
  }
}

export default angular.module('app.components.departments.detail.teams.detail.leaders.service', [
]).service('departmentsDetailTeamsDetailLeaders', Leaders).name;
