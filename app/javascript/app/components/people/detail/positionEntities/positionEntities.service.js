import * as moment from 'moment';
import { reduce } from 'lodash/fp';
import gql from 'graphql-tag';

class PositionEntities {
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
      query personPositionEntities(
        $person_id: ID!
      ) {
        personPositionEntities(
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
          service_types {
            id
            name
          }
        }
      }
    `, { person_id: personId }).then((data) => {
      let personPositionEntities = reduce((result, positionEntity) => {
        result.push(this.format(positionEntity));
        return result;
      }, [], JSON.parse(JSON.stringify(data.personPositionEntities)));
      return personPositionEntities;
    });
  }
  get(personId, id) {
    return this.api.query(gql`
      query personPositionEntity(
        $person_id: ID!,
        $id: ID!
      ) {
        personPositionEntity(
          person_id: $person_id,
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
            department {
              id
              name
            }
          }
        }
      }
    `, { person_id: personId, id: id }).then((data) => {
      return this.format(data.personPositionEntity);
    });
  }
  delete(personId, id) {
    return this.api.mutate(gql`
      mutation deletePersonPositionEntity(
        $person_id: ID!,
        $id: ID!
      ) {
        deletePersonPositionEntity(
          person_id: $person_id,
          id: $id,
        ) {
          id
        }
      }
    `, { person_id: personId, id: id }).then((data) => {
      const deletePersonPositionEntity = data.deletePersonPositionEntity;
      this.$rootScope.$emit('personPositionEntityDelete', personId, deletePersonPositionEntity);
      return deletePersonPositionEntity;
    });
  }
  format(personPositionEntity) {
    personPositionEntity = JSON.parse(JSON.stringify(personPositionEntity));
    personPositionEntity.start_at =
      personPositionEntity.start_at ? new Date(moment(personPositionEntity.start_at).format('l LT')) : null;
    personPositionEntity.end_at =
      personPositionEntity.end_at ? new Date(moment(personPositionEntity.end_at).format('l LT')) : null;
    return personPositionEntity;
  }
}

export default angular.module('app.components.people.detail.positionEntities.service', [
]).service('personPositionEntities', PositionEntities).name;
