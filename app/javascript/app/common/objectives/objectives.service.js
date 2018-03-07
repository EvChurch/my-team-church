import gql from 'graphql-tag';

class Objectives {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  load(resourceId, resourceType) {
    return this.api.query(gql`
      query objectives($resource_id: ID!, $resource_type: String!) {
        objectives(
          resource_id: $resource_id,
          resource_type: $resource_type
        ) {
          id
          name
          description
          key_results {
            id
            name
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType }).then((data) => {
      this.data = data.objectives;
      return this.data;
    });
  }
  get(resourceId, resourceType, id) {
    return this.api.query(gql`
      query objective($resource_id: ID!, $resource_type: String!, $id: ID!){
        objective(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id
        ) {
          id
          name
          description
          key_results {
            id
            name
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, id: id }).then((data) => {
      return data.objective;
    });
  }
  create(resourceId, resourceType, objective) {
    return this.api.mutate(gql`
      mutation createObjective(
        $resource_id: ID!,
        $resource_type: String!,
        $objective: ObjectiveInputType!
      ) {
        createObjective(
          resource_id: $resource_id,
          resource_type: $resource_type,
          objective: $objective
        ) {
          id
          name
          description
          key_results {
            id
            name
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, objective: objective }).then((data) => {
      const objective = data.createObjective;
      this.$rootScope.$emit('objectiveCreate', resourceId, resourceType, objective);
      return objective;
    });
  }
  update(resourceId, resourceType, id, objective) {
    return this.api.mutate(gql`
      mutation updateObjective(
        $resource_id: ID!,
        $resource_type: String!,
        $id: ID!,
        $objective: ObjectiveInputType!
      ) {
        updateObjective(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id,
          objective: $objective
        ) {
          id
          name
          description
          key_results {
            id
            name
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, id: id, objective: objective }).then((data) => {
      const objective = data.updateObjective;
      this.$rootScope.$emit('objectiveUpdate', resourceId, resourceType, objective);
      return objective;
    });
  }
  delete(resourceId, resourceType, id) {
    return this.api.mutate(gql`
      mutation deleteObjective(
        $resource_id: ID!,
        $resource_type: String!,
        $id: ID!
      ) {
        deleteObjective(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id,
        ) {
          id
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, id: id }).then((data) => {
      const objective = data.deleteObjective;
      this.$rootScope.$emit('objectiveDelete', resourceId, resourceType, objective);
      return objective;
    });
  }
  openNewObjectiveModal(resourceId, resourceType) {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'objectivesNewModalController',
      locals: {
        resourceId: resourceId,
        resourceType: resourceType
      }
    });
  }
  openEditObjectiveModal(resourceId, resourceType, objective) {
    return this.modal.open({
      template: require('./edit/edit.html'),
      controller: 'objectivesEditModalController',
      locals: {
        resourceId: resourceId,
        resourceType: resourceType,
        objective: objective
      }
    });
  }
}


export default angular.module('app.common.objectives.service', [
]).service('objectives', Objectives).name;
