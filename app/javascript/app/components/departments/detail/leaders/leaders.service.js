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
            picture
          }
        }
      }
    `, { department_id: departmentId }).then((data) => {
      return data.departmentLeaders;
    });
  }
  get(id) {
    return this.api.query(gql`
      query departmentLeader($id: ID!){
        departmentLeader(
          id: $id
        ) {
          id
          person {
            id
            name
            picture
          }
        }
      }
    `, { id: id }).then((data) => {
      if (data.departmentLeader) {
        return data.departmentLeader;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(departmentId, leader) {
    return this.api.mutate(gql`
      mutation createDepartmentLeader(
        $department_id: ID!,
        $leader: DepartmentLeaderInputType!
      ) {
        createDepartmentLeader(
          department_id: $department_id,
          leader: $leader
        ) {
          id
          person {
            id
            name
            picture
          }
        }
      }
    `, { department_id: departmentId, leader: leader }).then((data) => {
      const departmentLeader = data.createDepartmentLeader;
      this.$rootScope.$emit('leaderCreate', departmentId, departmentLeader);
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
      this.$rootScope.$emit('leaderDelete', departmentId, leader);
      return leader;
    });
  }
  openNewModal(departmentId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsDetailLeadersNewModalController',
      locals: {
        departmentId: departmentId
      }
    });
  }
}

export default angular.module('app.components.departments.detail.leaders.service', [
]).service('departmentsDetailLeaders', Leaders).name;
