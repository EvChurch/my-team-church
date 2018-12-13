import gql from 'graphql-tag';

class Teams {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load(departmentId) {
    return this.api.query(gql`
      query teams($department_id: ID!) {
        teams(
          department_id: $department_id
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId }).then((data) => {
      return data.teams;
    });
  }
  get(id) {
    return this.api.query(gql`
      query team($id: ID!){
        team(
          id: $id
        ) {
          id
          name
          description
        }
      }
    `, { id: id }).then((data) => {
      if (data.team) {
        return data.team;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(departmentId, team) {
    return this.api.mutate(gql`
      mutation createTeam(
        $department_id: ID!,
        $team: TeamInputType!
      ) {
        createTeam(
          department_id: $department_id,
          team: $team
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, team: team }).then((data) => {
      const team = data.createTeam;
      this.$rootScope.$emit('teamCreate', departmentId, team);
      return team;
    });
  }
  update(departmentId, id, team) {
    return this.api.mutate(gql`
      mutation updateTeam(
        $id: ID!,
        $team: TeamInputType!
      ) {
        updateTeam(
          id: $id,
          team: $team
        ) {
          id
          name
          description
        }
      }
    `, { id: id, team: team }).then((data) => {
      const team = data.updateTeam;
      this.$rootScope.$emit('teamUpdate', departmentId, team);
      return team;
    });
  }
  delete(departmentId, id) {
    return this.api.mutate(gql`
      mutation deleteTeam(
        $id: ID!
      ) {
        deleteTeam(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const team = data.deleteTeam;
      this.$rootScope.$emit('teamDelete', departmentId, team);
      return team;
    });
  }
  openNewModal(departmentId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsDetailTeamsNewModalController',
      locals: {
        departmentId: departmentId
      }
    });
  }
  openEditModal(departmentId, team) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'departmentsDetailTeamsEditModalController',
      locals: {
        departmentId: departmentId,
        team: team
      }
    });
  }
}

export default angular.module('app.components.departments.detail.teams.service', [
]).service('departmentsDetailTeams', Teams).name;
