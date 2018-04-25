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
          position {
            id
            name
          }
        }
      }
    `, { person_id: personId }).then((data) => {
      return data.personPositionEntities;
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
          position {
            id
            name
            department {
              id
              name
            }
          }
        }
      }
    `, { person_id: personId, id: id }).then((data) => {
      return data.personPositionEntity;
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
}

export default angular.module('app.components.people.detail.positionEntities.service', [
]).service('personPositionEntities', PositionEntities).name;
