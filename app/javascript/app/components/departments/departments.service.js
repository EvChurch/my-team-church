import gql from 'graphql-tag';
import { flattenDeep, map } from 'lodash/fp';

class Departments {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load() {
    return this.api.query(gql`
      query {
        departments {
          ...DepartmentFields
          ...ChildrenRecursive
        }
      }

      fragment ChildrenRecursive on Department {
        children {
          ...DepartmentFields
          children {
            ...DepartmentFields
            children {
              ...DepartmentFields
              children {
                ...DepartmentFields
                children {
                  ...DepartmentFields
                  children {
                    ...DepartmentFields
                    children {
                      ...DepartmentFields
                      children {
                        ...DepartmentFields
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      fragment DepartmentFields on Department {
        id
        name
        breadcrumb
        positions_needing_people
      }
    `).then((data) => {
      this.data = data;
      this.allDepartments = angular.copy(flattenDeep(this.flattenDepartment(this.data.departments)));
      return this.data.departments;
    });
  }
  flattenDepartment(departments) {
    const children = map((department) => this.flattenDepartment(department.children), departments);
    return [departments, children];
  }
  get(id) {
    return this.api.query(gql`
      query department($id: ID!) {
        department(id: $id) {
          id
          name
          description
          parent_id
        }
      }
    `, { id: id }).then((data) => {
      if (data.department) {
        return data.department;
      } else {
        throw 'Not Found';
      }
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
  openNewModal(parentId = null) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsNewModalController',
      locals: {
        parentId: parentId
      }
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
