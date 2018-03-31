import gql from 'graphql-tag';

class Entities {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load(departmentId, positionId) {
    return this.api.query(gql`
      query entities(
        $department_id: ID!,
        $position_id: ID!
      ) {
        entities(
          department_id: $department_id
          position_id: $position_id
        ) {
          id
          person {
            first_name
            last_name
          }
        }
      }
    `, { department_id: departmentId, position_id: positionId }).then((data) => {
      return data.entities;
    });
  }
  get(departmentId, positionId, id) {
    return this.api.query(gql`
      query entity(
        $department_id: ID!,
        $position_id: ID!, $id: ID!
      ) {
        entity(
          department_id: $department_id,
          position_id: $position_id,
          id: $id
        ) {
          id
          person {
            first_name
            last_name
          }
        }
      }
    `, { department_id: departmentId, position_id: positionId, id: id }).then((data) => {
      return data.entity;
    });
  }
  create(departmentId, positionId, entity) {
    return this.api.mutate(gql`
      mutation createEntity(
        $department_id: ID!,
        $position_id: ID!,
        $entity: EntityInputType!
      ) {
        createEntity(
          department_id: $department_id,
          position_id: $position_id,
          entity: $entity
        ) {
          id
          person {
            first_name
            last_name
          }
        }
      }
    `, { department_id: departmentId, position_id: positionId, entity: entity }).then((data) => {
      const entity = data.createEntity;
      this.$rootScope.$emit('departmentPositionEntityCreate', departmentId, positionId, entity);
      return entity;
    });
  }
  delete(departmentId, positionId, id) {
    return this.api.mutate(gql`
      mutation deleteEntity(
        $department_id: ID!,
        $id: ID!
      ) {
        deleteEntity(
          department_id: $department_id,
          id: $id,
        ) {
          id
        }
      }
    `, { department_id: departmentId, id: id }).then((data) => {
      const entity = data.deleteEntity;
      this.$rootScope.$emit('departmentPositionEntityDelete', departmentId, positionId, entity);
      return entity;
    });
  }
  openNewEntityModal(departmentId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'entitiesNewModalController',
      locals: {
        departmentId: departmentId
      }
    });
  }
  openEditEntityModal(departmentId, entity) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'entitiesEditModalController',
      locals: {
        departmentId: departmentId,
        entity: entity
      }
    });
  }
}

export default angular.module('app.components.departments.detail.entities.service', [
]).service('departmentPositionEntities', Entities).name;
