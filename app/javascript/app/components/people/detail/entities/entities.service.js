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
  load(personId) {
    return this.api.query(gql`
      query personTeamPositionEntities(
        $person_id: ID!
      ) {
        personTeamPositionEntities(
          person_id: $person_id
        ) {
          id
          start_at
          end_at
          trial
          position {
            id
            name
          }
        }
      }
    `, { person_id: personId }).then((data) => {
      let entities = reduce((result, entity) => {
        result.push(this.format(entity));
        return result;
      }, [], JSON.parse(JSON.stringify(data.personTeamPositionEntities)));
      return entities;
    });
  }
  get(id) {
    return this.api.query(gql`
      query personTeamPositionEntity(
        $id: ID!
      ) {
        personPositionEntity(
          id: $id
        ) {
          id
          start_at
          end_at
          trial
          position {
            id
            name
            description
            training_description
            department {
              id
              name
            }
          }
        }
      }
    `, { id: id }).then((data) => {
      if (data.personPositionEntity) {
        return this.format(data.personPositionEntity);
      } else {
        throw 'Not Found';
      }
    });
  }
  delete(personId, id) {
    return this.api.mutate(gql`
      mutation deletePersonTeamPositionEntity(
        $id: ID!
      ) {
        deletePersonTeamPositionEntity(
          person_id: $person_id,
          id: $id,
        ) {
          id
        }
      }
    `, { person_id: personId, id: id }).then((data) => {
      const entity = data.deletePersonTeamPositionEntity;
      this.$rootScope.$emit('entityDelete', personId, entity);
      return entity;
    });
  }
  format(entity) {
    entity = JSON.parse(JSON.stringify(entity));
    entity.start_at = entity.start_at ? new Date(moment(entity.start_at).format('l LT')) : null;
    entity.end_at = entity.end_at ? new Date(moment(entity.end_at).format('l LT')) : null;
    return entity;
  }
}

export default angular.module('app.components.people.detail.entities.service', [
]).service('peopleDetailEntities', Entities).name;
