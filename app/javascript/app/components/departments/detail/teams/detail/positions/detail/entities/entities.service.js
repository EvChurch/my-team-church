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
      query teamPositionEntities(
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
  get(id) {
    return this.api.query(gql`
      query teamPositionEntity(
        $id: ID!
      ) {
        teamPositionEntity(
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
        }
      }
    `, { id: id }).then((data) => {
      if (data.teamPositionEntity) {
        return this.format(data.teamPositionEntity);
      } else {
        throw 'Not Found';
      }
    });
  }
  create(positionId, positionEntity) {
    return this.api.mutate(gql`
      mutation createTeamPositionEntity(
        $position_id: ID!,
        $position_entity: PositionEntityInputType!
      ) {
        createTeamPositionEntity(
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
        }
      }
    `, { position_id: positionId, position_entity: positionEntity }).then((data) => {
      const positionEntity = this.format(data.createTeamPositionEntity);
      this.$rootScope.$emit('departmentPositionEntityCreate', positionId, positionEntity);
      return positionEntity;
    });
  }
  update(positionId, id, positionEntity) {
    return this.api.mutate(gql`
      mutation updateTeamPositionEntity(
        $position_id: ID!,
        $id: ID!,
        $position_entity: PositionEntityInputType!
      ) {
        updateTeamPositionEntity(
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
        }
      }
    `, { position_id: positionId, id: id, position_entity: positionEntity }).then((data) => {
      const positionEntity = this.format(data.updateTeamPositionEntity);
      this.$rootScope.$emit('departmentPositionEntityUpdate', positionId, positionEntity);
      return positionEntity;
    });
  }
  delete(positionId, id) {
    return this.api.mutate(gql`
      mutation deleteTeamPositionEntity(
        $position_id: ID!,
        $id: ID!
      ) {
        deleteTeamPositionEntity(
          position_id: $position_id,
          id: $id
        ) {
          id
        }
      }
    `, { position_id: positionId, id: id }).then((data) => {
      const positionEntity = data.deleteTeamPositionEntity;
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

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.entities.service', [
]).service('departmentsDetailTeamsDetailPositionsDetailEntities', Entities).name;
