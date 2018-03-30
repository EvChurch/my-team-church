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
      query entities($department_id: ID!) {
        entities(
          department_id: $department_id
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId }).then((data) => {
      return data.entities;
    });
  }
  get(departmentId, id) {
    return this.api.query(gql`
      query entity($department_id: ID!, $id: ID!){
        entity(
          department_id: $department_id,
          id: $id
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, id: id }).then((data) => {
      return data.entity;
    });
  }
  create(departmentId, entity) {
    return this.api.mutate(gql`
      mutation createEntity(
        $department_id: ID!,
        $entity: EntityInputType!
      ) {
        createEntity(
          department_id: $department_id,
          entity: $entity
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, entity: entity }).then((data) => {
      const entity = data.createEntity;
      this.$rootScope.$emit('entityCreate', departmentId, entity);
      return entity;
    });
  }
  update(departmentId, id, entity) {
    return this.api.mutate(gql`
      mutation updateEntity(
        $department_id: ID!,
        $id: ID!,
        $entity: EntityInputType!
      ) {
        updateEntity(
          department_id: $department_id,
          id: $id,
          entity: $entity
        ) {
          id
          name
          description
        }
      }
    `, { department_id: departmentId, id: id, entity: entity }).then((data) => {
      const entity = data.updateEntity;
      this.$rootScope.$emit('entityUpdate', departmentId, entity);
      return entity;
    });
  }
  delete(departmentId, id) {
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
      this.$rootScope.$emit('entityDelete', departmentId, entity);
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
]).service('departmentEntities', Entities).name;
