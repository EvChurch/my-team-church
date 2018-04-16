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
      query objectiveKeyResults(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!
      ) {
        objectiveKeyResults(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id
        ) {
          id
          name
          result_type
          start_value
          target_value
          current_value
          weight
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId
    }).then((data) => {
      this.data = data.objectiveKeyResults;
      return this.data;
    });
  }
  get(resourceId, resourceType, objectiveId, id) {
    return this.api.query(gql`
      query objectiveKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $id: ID!
      ){
        objectiveKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id,
          id: $id
        ) {
          id
          name
          result_type
          start_value
          target_value
          current_value
          weight
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id
    }).then((data) => {
      return data.objectiveKeyResult;
    });
  }
  create(resourceId, resourceType, objectiveId, keyResult) {
    return this.api.mutate(gql`
      mutation createObjectiveKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $key_result: KeyResultInputType!
      ) {
        createObjectiveKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id,
          key_result: $key_result
        ) {
          id
          name
          result_type
          start_value
          target_value
          current_value
          weight
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      key_result: keyResult
    }).then((data) => {
      const keyResult = data.createObjectiveKeyResult;
      this.$rootScope.$emit('keyResultCreate', objectiveId, keyResult);
      return keyResult;
    });
  }
  update(resourceId, resourceType, objectiveId, id, keyResult) {
    return this.api.mutate(gql`
      mutation updateObjectiveKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $id: ID!,
        $key_result: KeyResultInputType!
      ) {
        updateObjectiveKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id,
          id: $id,
          key_result: $key_result
        ) {
          id
          name
          result_type
          start_value
          target_value
          current_value
          weight
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id,
      key_result: keyResult
    }).then((data) => {
      const keyResult = data.updateObjectiveKeyResult;
      this.$rootScope.$emit('keyResultUpdate', objectiveId, keyResult);
      return keyResult;
    });
  }
  delete(resourceId, resourceType, objectiveId, id) {
    return this.api.mutate(gql`
      mutation deleteObjectiveKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $id: ID!
      ) {
        deleteObjectiveKeyResult(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective_id: $objective_id,
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
      const keyResult = data.deleteObjectiveKeyResult;
      this.$rootScope.$emit('keyResultDelete', objectiveId, keyResult);
      return keyResult;
    });
  }
  openEditKeyResultModal(resourceId, resourceType, objective, id, keyResult) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'objectivesDetailKeyResultsEditModalController',
      locals: {
        resourceId: resourceId,
        resourceType: resourceType,
        objective: objective,
        id: id,
        keyResult: keyResult
      }
    });
  }
}


export default angular.module('app.common.objectives.details.keyResults.service', [
]).service('keyResults', KeyResults).name;