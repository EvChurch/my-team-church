import gql from 'graphql-tag';
import { clone, pickBy, reduce } from 'lodash/fp';

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
      return Promise.resolve(this.data);
    }

    return this.api.query(gql`
      query {
        departments {
          id
          name
          parent_id
        }
      }
    `).then((data) => {
      this.data = data.departments;
      this.data = reduce((result, department) => {
        if (!department.parent_id) {
          department = clone(department);
          department.children = pickBy((child) => department.id === child.parent_id, this.data);
          result.push(department);
        }
        return result;
      }, [], this.data);
      return this.data;
    });
  }
  get(id) {
    return this.api.query(gql`
      query department($id: ID!){
        department(id: $id) {
          id
          name
          description
          parent_id
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
          parent_id
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
          parent_id
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
  openNewModal() {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsNewModalController'
    });
  }
  openEditModal(department) {
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
