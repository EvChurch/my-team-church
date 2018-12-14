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
        teamPositionEntities(
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
      return reduce((result, entity) => {
        result.push(this.format(entity));
        return result;
      }, [], JSON.parse(JSON.stringify(data.teamPositionEntities)));
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
  create(positionId, entity) {
    return this.api.mutate(gql`
      mutation createTeamPositionEntity(
        $position_id: ID!,
        $entity: TeamPositionEntityInputType!
      ) {
        createTeamPositionEntity(
          position_id: $position_id,
          entity: $entity
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
    `, { position_id: positionId, entity: entity }).then((data) => {
      const entity = this.format(data.createTeamPositionEntity);
      this.$rootScope.$emit('entityCreate', positionId, entity);
      return entity;
    });
  }
  update(positionId, id, entity) {
    return this.api.mutate(gql`
      mutation updateTeamPositionEntity(
        $id: ID!,
        $entity: TeamPositionEntityInputType!
      ) {
        updateTeamPositionEntity(
          id: $id,
          entity: $entity
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
    `, { id: id, entity: entity }).then((data) => {
      const entity = this.format(data.updateTeamPositionEntity);
      this.$rootScope.$emit('entityUpdate', positionId, entity);
      return entity;
    });
  }
  delete(positionId, entity) {
    return this.api.mutate(gql`
      mutation deleteTeamPositionEntity(
        $id: ID!
      ) {
        deleteTeamPositionEntity(
          id: $id
        ) {
          id
        }
      }
    `, { id: entity.id }).then((data) => {
      const entity = data.deleteTeamPositionEntity;
      this.$rootScope.$emit('entityDelete', positionId, entity);
      return entity;
    });
  }
  openNewModal(positionId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'departmentsDetailTeamsDetailPositionsDetailEntitiesNewModalController',
      locals: {
        positionId: positionId
      }
    });
  }
  openEditModal(positionId, entity) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'departmentsDetailTeamsDetailPositionsDetailEntitiesEditModalController',
      locals: {
        positionId: positionId,
        entity: entity
      }
    });
  }
  format(entity) {
    entity = JSON.parse(JSON.stringify(entity));
    entity.start_at = entity.start_at ? new Date(moment(entity.start_at).format('l LT')) : null;
    entity.end_at = entity.end_at ? new Date(moment(entity.end_at).format('l LT')) : null;
    return entity;
  }
}

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.entities.service', [
]).service('departmentsDetailTeamsDetailPositionsDetailEntities', Entities).name;
