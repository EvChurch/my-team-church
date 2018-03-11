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
      query positions($department_id: ID!) {
        positions(
          department_id: $department_id
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId }).then((data) => {
      return data.positions;
    });
  }
  get(departmentId, id) {
    return this.api.query(gql`
      query position($department_id: ID!, $id: ID!){
        position(
          department_id: $department_id,
          id: $id
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, id: id }).then((data) => {
      return data.position;
    });
  }
  create(departmentId, position) {
    return this.api.mutate(gql`
      mutation createPosition(
        $department_id: ID!,
        $position: PositionInputType!
      ) {
        createPosition(
          department_id: $department_id,
          position: $position
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, position: position }).then((data) => {
      const position = data.createPosition;
      this.$rootScope.$emit('positionCreate', departmentId, position);
      return position;
    });
  }
  update(departmentId, id, position) {
    return this.api.mutate(gql`
      mutation updatePosition(
        $department_id: ID!,
        $id: ID!,
        $position: PositionInputType!
      ) {
        updatePosition(
          department_id: $department_id,
          id: $id,
          position: $position
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, id: id, position: position }).then((data) => {
      const position = data.updatePosition;
      this.$rootScope.$emit('positionUpdate', departmentId, position);
      return position;
    });
  }
  delete(departmentId, id) {
    return this.api.mutate(gql`
      mutation deletePosition(
        $department_id: ID!,
        $id: ID!
      ) {
        deletePosition(
          department_id: $department_id,
          id: $id,
        ) {
          id
        }
      }
    `, { department_id: departmentId, id: id }).then((data) => {
      const position = data.deletePosition;
      this.$rootScope.$emit('positionDelete', departmentId, position);
      return position;
    });
  }
  openNewPositionModal(departmentId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'positionsNewModalController',
      locals: {
        departmentId: departmentId
      }
    });
  }
  openEditPositionModal(departmentId, position) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'positionsEditModalController',
      locals: {
        departmentId: departmentId,
        position: position
      }
    });
  }
}

export default angular.module('app.componenets.departments.detail.positions.service', [
]).service('positions', Positions).name;
