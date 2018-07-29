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
          service_type_connections {
            id
            service_type {
              id
              name
            }
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
          service_type_connections {
            id
            service_type {
              id
              name
            }
          }
        }
      }
    `, { department_id: departmentId, id: id }).then((data) => {
      return data.departmentLeader;
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
          service_type_connections {
            id
            service_type {
              id
              name
            }
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
  createDepartmentLeaderServiceType(departmentId, leaderId, leaderServiceType) {
    return this.api.mutate(gql`
      mutation createDepartmentLeaderServiceType(
        $leader_id: ID!,
        $leader_service_type: DepartmentLeaderServiceTypeInputType!
      ) {
        createDepartmentLeaderServiceType(
          leader_id: $leader_id,
          leader_service_type: $leader_service_type
        ) {
          id
          leader {
            id
            person {
              id
              name
            }
            service_type_connections {
              id
              service_type {
                id
                name
              }
            }
          }
        }
      }
    `, { leader_id: leaderId, leader_service_type: leaderServiceType }).then((data) => {
      const leaderServiceType = data.createDepartmentLeaderServiceType;
      this.$rootScope.$emit('departmentLeaderUpdate', departmentId, leaderServiceType.leader);
      return leaderServiceType;
    });
  }
  deleteDepartmentLeaderServiceType(departmentId, leaderId, id) {
    return this.api.mutate(gql`
      mutation deleteDepartmentLeaderServiceType(
        $leader_id: ID!,
        $id: ID!
      ) {
        deleteDepartmentLeaderServiceType(
          leader_id: $leader_id,
          id: $id,
        ) {
          id
          leader {
            id
            person {
              id
              name
            }
            service_type_connections {
              id
              service_type {
                id
                name
              }
            }
          }
        }
      }
    `, { leader_id: leaderId, id: id }).then((data) => {
      const leaderServiceType = data.deleteDepartmentLeaderServiceType;
      this.$rootScope.$emit('departmentLeaderUpdate', departmentId, leaderServiceType.leader);
      return leaderServiceType;
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
