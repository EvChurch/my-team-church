import gql from 'graphql-tag';

class Departments {
  constructor(api) {
    this.api = api;
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
}


export default angular.module('app.components.departments.service', [
]).service('departments', Departments).name;
