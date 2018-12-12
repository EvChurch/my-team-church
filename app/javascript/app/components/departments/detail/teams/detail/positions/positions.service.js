import gql from 'graphql-tag';

class Positions {
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
      query teamPositions($team_id: ID!) {
        teamPositions(
          team_id: $team_id
        ) {
          id
          name
          people_needed
          people_active
        }
      }
    `, { team_id: teamId }).then((data) => {
      return data.teamPositions;
    });
  }
  get(id) {
    return this.api.query(gql`
      query teamPosition($id: ID!){
        teamPosition(
          id: $id
        ) {
          id
          name
          description
          training_description
          people_needed
          people_active
        }
      }
    `, { id: id }).then((data) => {
      if (data.teamPosition) {
        return data.teamPosition;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(teamId, position) {
    return this.api.mutate(gql`
      mutation createTeamPosition(
        $team_id: ID!,
        $position: TeamPositionInputType!
      ) {
        createTeamPosition(
          team_id: $team_id,
          position: $position
        ) {
          id
          name
          description
          training_description
          people_needed
        }
      }
    `, { team_id: teamId, position: position }).then((data) => {
      const position = data.createTeamPosition;
      this.$rootScope.$emit('positionCreate', teamId, position);
      return position;
    });
  }
  update(teamId, id, position) {
    return this.api.mutate(gql`
      mutation updateTeamPosition(
        $id: ID!,
        $position: TeamPositionInputType!
      ) {
        updateTeamPosition(
          id: $id,
          position: $position
        ) {
          id
          name
          description
          training_description
          people_needed
        }
      }
    `, { id: id, position: position }).then((data) => {
      const position = data.updateTeamPosition;
      this.$rootScope.$emit('positionUpdate', teamId, position);
      return position;
    });
  }
  delete(teamId, id) {
    return this.api.mutate(gql`
      mutation deleteTeamPosition(
        $id: ID!
      ) {
        deleteTeamPosition(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const position = data.deleteTeamPosition;
      this.$rootScope.$emit('positionDelete', teamId, position);
      return position;
    });
  }
  openNewModal(teamId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentTeamPositionsNewModalController',
      locals: {
        teamId: teamId
      }
    });
  }
  openEditModal(teamId, position) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'departmentTeamPositionsEditModalController',
      locals: {
        teamId: teamId,
        position: position
      }
    });
  }
}

export default angular.module('app.components.departments.detail.teams.detail.positions.service', [
]).service('departmentsDetailTeamsDetailPositions', Positions).name;
