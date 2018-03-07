import gql from 'graphql-tag';

class KeyResults {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load(resourceId, resourceType, objectiveId) {
    return this.api.query(gql`
      query keyResults(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!
      ) {
        keyResults(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id
        ) {
          id
          name
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId
    }).then((data) => {
      this.data = data.keyResults;
      return this.data;
    });
  }
  get(resourceId, resourceType, objectiveId, id) {
    return this.api.query(gql`
      query keyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $id: ID!
      ){
        keyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id,
          id: $id
        ) {
          id
          name
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id
    }).then((data) => {
      return data.keyResult;
    });
  }
  create(resourceId, resourceType, objectiveId, keyResult) {
    return this.api.mutate(gql`
      mutation createKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $keyResult: KeyResultInputType!
      ) {
        createKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          keyResult: $keyResult
        ) {
          id
          name
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      keyResult: keyResult
    }).then((data) => {
      const keyResult = data.createKeyResult;
      this.$rootScope.$emit('keyResultCreate', objectiveId, keyResult);
      return keyResult;
    });
  }
  update(resourceId, resourceType, objectiveId, id, keyResult) {
    return this.api.mutate(gql`
      mutation updateKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $id: ID!,
        $keyResult: KeyResultInputType!
      ) {
        updateKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id,
          keyResult: $keyResult
        ) {
          id
          name
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id,
      keyResult: keyResult
    }).then((data) => {
      const keyResult = data.updateKeyResult;
      this.$rootScope.$emit('keyResultUpdate', objectiveId, keyResult);
      return keyResult;
    });
  }
  delete(resourceId, resourceType, objectiveId, id) {
    return this.api.mutate(gql`
      mutation deleteKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $id: ID!
      ) {
        deleteKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id,
        ) {
          id
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id
    }).then((data) => {
      const keyResult = data.deleteKeyResult;
      this.$rootScope.$emit('keyResultDelete', objectiveId, keyResult);
      return keyResult;
    });
  }
  openNewKeyResultModal(resourceId, resourceType, objectiveId) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'keyResultsNewModalController',
      locals: {
        resourceId: resourceId,
        resourceType: resourceType,
        objectiveId: objectiveId
      }
    });
  }
  openEditKeyResultModal(resourceId, resourceType, objectiveId, keyResult) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'keyResultsEditModalController',
      locals: {
        resourceId: resourceId,
        resourceType: resourceType,
        objectiveId: objectiveId,
        keyResult: keyResult
      }
    });
  }
}


export default angular.module('app.common.objectives.details.keyResults.service', [
]).service('keyResults', KeyResults).name;
