import * as moment from 'moment';
import { reduce } from 'lodash/fp';
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
          start_at
          end_at
          trial
          person {
            id
            name
            first_name
            last_name
            picture
          }
          service_types {
            id
            name
          }
        }
      }
    `, { position_id: positionId }).then((data) => {
      this.data = reduce((result, positionEntity) => {
        result.push(this.format(positionEntity));
        return result;
      }, [], JSON.parse(JSON.stringify(data.positionEntities)));
      return this.data;
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
          start_at
          end_at
          trial
          person {
            id
            name
            first_name
            last_name
            picture
          }
          service_types {
            id
            name
          }
        }
      }
    `, { position_id: positionId, id: id }).then((data) => {
      return this.format(data.positionEntity);
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
          start_at
          end_at
          trial
          person {
            id
            name
            first_name
            last_name
            picture
          }
          service_types {
            id
            name
          }
        }
      }
    `, { position_id: positionId, position_entity: positionEntity }).then((data) => {
      const positionEntity = this.format(data.createPositionEntity);
      this.$rootScope.$emit('departmentPositionEntityCreate', positionId, positionEntity);
      return positionEntity;
    });
  }
  update(positionId, id, positionEntity) {
    return this.api.mutate(gql`
      mutation updatePositionEntity(
        $position_id: ID!,
        $id: ID!,
        $position_entity: PositionEntityInputType!
      ) {
        updatePositionEntity(
          position_id: $position_id,
          id: $id,
          position_entity: $position_entity
        ) {
          id
          start_at
          end_at
          trial
          person {
            id
            name
            first_name
            last_name
            picture
          }
          service_types {
            id
            name
          }
        }
      }
    `, { position_id: positionId, id: id, position_entity: positionEntity }).then((data) => {
      const positionEntity = this.format(data.updatePositionEntity);
      this.$rootScope.$emit('departmentPositionEntityUpdate', positionId, positionEntity);
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
          id: $id
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
  openEditModal(positionId, id, positionEntity) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'departmentPositionEntitiesEditModalController',
      locals: {
        positionId: positionId,
        id: id,
        positionEntity
      }
    });
  }
  format(positionEntity) {
    positionEntity = JSON.parse(JSON.stringify(positionEntity));
    positionEntity.start_at = positionEntity.start_at ? new Date(moment(positionEntity.start_at).format('l LT')) : null;
    positionEntity.end_at = positionEntity.end_at ? new Date(moment(positionEntity.end_at).format('l LT')) : null;
    return positionEntity;
  }
}

export default angular.module('app.components.departments.detail.entities.service', [
]).service('departmentPositionEntities', Entities).name;
