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
  load(positionId) {
    return this.api.query(gql`
      query positionEntities(
        $position_id: ID!
      ) {
        positionEntities(
          position_id: $position_id
        ) {
          id
          person {
            id
            name
            first_name
            last_name
          }
          service_types {
            name
          }
        }
      }
    `, { position_id: positionId }).then((data) => {
      return data.positionEntities;
    });
  }
  get(positionId, id) {
    return this.api.query(gql`
      query positionEntity(
        $position_id: ID!,
        $id: ID!
      ) {
        positionEntity(
          position_id: $position_id,
          id: $id
        ) {
          id
          person {
            id
            name
            first_name
            last_name
          }
          service_types {
            name
          }
        }
      }
    `, { position_id: positionId, id: id }).then((data) => {
      return data.positionEntity;
    });
  }
  create(positionId, positionEntity) {
    return this.api.mutate(gql`
      mutation createPositionEntity(
        $position_id: ID!,
        $position_entity: PositionEntityInputType!
      ) {
        createPositionEntity(
          position_id: $position_id,
          position_entity: $position_entity
        ) {
          id
          person {
            id
            name
            first_name
            last_name
          }
          service_types {
            name
          }
        }
      }
    `, { position_id: positionId, position_entity: positionEntity }).then((data) => {
      const positionEntity = data.createPositionEntity;
      this.$rootScope.$emit('departmentPositionEntityCreate', positionId, positionEntity);
      return positionEntity;
    });
  }
  delete(positionId, id) {
    return this.api.mutate(gql`
      mutation deletePositionEntity(
        $position_id: ID!,
        $id: ID!
      ) {
        deletePositionEntity(
          position_id: $position_id,
          id: $id,
        ) {
          id
        }
      }
    `, { position_id: positionId, id: id }).then((data) => {
      const positionEntity = data.deletePositionEntity;
      this.$rootScope.$emit('departmentPositionEntityDelete', positionId, positionEntity);
      return positionEntity;
    });
  }
  openNewModal(positionId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentPositionEntitiesNewModalController',
      locals: {
        positionId: positionId
      }
    });
  }
}

export default angular.module('app.components.departments.detail.entities.service', [
]).service('departmentPositionEntities', Entities).name;
