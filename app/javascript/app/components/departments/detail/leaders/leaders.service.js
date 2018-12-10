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
  load(departmentId) {
    return this.api.query(gql`
      query departmentLeaders($department_id: ID!) {
        departmentLeaders(
          department_id: $department_id
        ) {
          id
          person {
            id
            name
          }
        }
      }
    `, { department_id: departmentId }).then((data) => {
      return data.departmentLeaders;
    });
  }
  get(departmentId, id) {
    return this.api.query(gql`
      query departmentLeader($department_id: ID!, $id: ID!){
        departmentLeader(
          department_id: $department_id,
          id: $id
        ) {
          id
          person {
            id
            name
          }
        }
      }
    `, { department_id: departmentId, id: id }).then((data) => {
      if (data.departmentLeader) {
        return data.departmentLeader;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(departmentId, departmentLeader) {
    return this.api.mutate(gql`
      mutation createDepartmentLeader(
        $department_id: ID!,
        $department_leader: DepartmentLeaderInputType!
      ) {
        createDepartmentLeader(
          department_id: $department_id,
          department_leader: $department_leader
        ) {
          id
          person {
            id
            name
          }
        }
      }
    `, { department_id: departmentId, department_leader: departmentLeader }).then((data) => {
      const departmentLeader = data.createDepartmentLeader;
      this.$rootScope.$emit('departmentLeaderCreate', departmentId, departmentLeader);
      return departmentLeader;
    });
  }
  delete(departmentId, id) {
    return this.api.mutate(gql`
      mutation deleteDepartmentLeader(
        $id: ID!
      ) {
        deleteDepartmentLeader(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const leader = data.deleteDepartmentLeader;
      this.$rootScope.$emit('departmentLeaderDelete', departmentId, leader);
      return leader;
    });
  }
  openNewModal(departmentId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentLeadersNewModalController',
      locals: {
        departmentId: departmentId
      }
    });
  }
}

export default angular.module('app.components.departments.detail.leaders.service', [
]).service('departmentLeaders', Positions).name;
