import gql from 'graphql-tag';

class Departments {
  constructor($rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load(reset = false) {
    if (this.data && !reset) {
      Promise.resolve(this.data);
    }

    return this.api.query(gql`
      query {
        departments {
          id
          name
          children {
            id
            name
          }
        }
      }
    `).then((data) => {
      this.data = data.departments;
      return this.data;
    });
  }
  get(id) {
    return this.api.query(gql`
      query department($id: ID!){
        department(id: $id) {
          id
          name
          positions {
            id
            name
          }
          children {
            id
            name
            positions {
              id
              name
            }
          }
        }
      }
    `, { id: id }).then((data) => {
      return data.department;
    });
  }
  create(department) {
    return this.api.mutate(gql`
      mutation createDepartment($department: DepartmentInputType!) {
        createDepartment(
          department: $department
        ) {
          id
          name
          description
        }
      }
    `, { department: department }).then((data) => {
      const department = data.createDepartment;
      this.$rootScope.$emit('departmentCreate', department);
      return department;
    });
  }
  update(id, department) {
    return this.api.mutate(gql`
      mutation updateDepartment($id: ID!, $department: DepartmentInputType!) {
        updateDepartment(
          id: $id,
          department: $department
        ) {
          id
          name
          description
        }
      }
    `, { id: id, department: department }).then((data) => {
      const department = data.updateDepartment;
      this.$rootScope.$emit('departmentUpdate', department);
      return department;
    });
  }
  delete(id) {
    return this.api.mutate(gql`
      mutation deleteDepartment($id: ID!) {
        deleteDepartment(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const department = data.deleteDepartment;
      this.$rootScope.$emit('departmentDelete', department);
      return department;
    });
  }
  getObjectives(id) {
    return this.api.query(gql`
      query department($id: ID!){
        department(id: $id) {
          id
          objectives {
            id
            name
          }
        }
      }
    `, { id: id }).then((data) => {
      return data.department.objectives;
    });
  }
  getPositions(id) {
    return this.api.query(gql`
      query department($id: ID!){
        department(id: $id) {
          id
          positions {
            id
            name
          }
        }
      }
    `, { id: id }).then((data) => {
      return data.department.positions;
    });
  }
  openNewDepartmentModal() {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsNewModalController'
    });
  }
  openEditDepartmentModal(department) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'departmentsEditModalController',
      locals: {
        department: department
      }
    });
  }
}


export default angular.module('app.components.departments.service', [
]).service('departments', Departments).name;
