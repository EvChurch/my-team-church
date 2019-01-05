import * as moment from 'moment';
import { reduce } from 'lodash/fp';
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
          start_at
          end_at
          kind
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId
    }).then((data) => {
      this.data = reduce((result, keyResult) => {
        result.push(this.format(keyResult));
        return result;
      }, [], JSON.parse(JSON.stringify(data.objectiveKeyResults)));
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
          start_at
          end_at
          kind
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id
    }).then((data) => {
      return this.format(data.objectiveKeyResult);
    });
  }
  create(resourceId, resourceType, objectiveId, keyResult) {
    return this.api.mutate(gql`
      mutation createObjectiveKeyResult(
        $resource_id: ID!,
        $resource_type: String!,
        $objective_id: ID!,
        $key_result: ObjectiveKeyResultInputType!
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
          start_at
          end_at
          kind
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      key_result: keyResult
    }).then((data) => {
      const keyResult = this.format(data.createObjectiveKeyResult);
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
        $key_result: ObjectiveKeyResultInputType!
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
          start_at
          end_at
          kind
        }
      }
    `, {
      resource_id: resourceId,
      resource_type: resourceType,
      objective_id: objectiveId,
      id: id,
      key_result: keyResult
    }).then((data) => {
      const keyResult = this.format(data.updateObjectiveKeyResult);
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
  format(keyResult) {
    keyResult = JSON.parse(JSON.stringify(keyResult));
    keyResult.start_at = keyResult.start_at ? new Date(moment(keyResult.start_at).format('l LT')) : null;
    keyResult.end_at = keyResult.end_at ? new Date(moment(keyResult.end_at).format('l LT')) : null;
    return keyResult;
  }
}


export default angular.module('app.common.objectives.details.keyResults.service', [
]).service('objectivesDetailsKeyResults', KeyResults).name;
