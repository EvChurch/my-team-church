import gql from 'graphql-tag';

class Items {
  constructor(
    $rootScope,
    api
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  load(positionId) {
    return this.api.query(gql`
      query teamPositionItems($position_id: ID!) {
        teamPositionItems(
          position_id: $position_id,
        ) {
          id
          name
        }
      }
    `, { position_id: positionId }).then((data) => {
      return data.teamPositionItems;
    });
  }
  get(id) {
    return this.api.query(gql`
      query teamPositionItem($position_id: ID!, $id: ID!){
        teamPositionItem(
          id: $id
        ) {
          id
          name
        }
      }
    `, { id: id }).then((data) => {
      if (data.teamPositionItem) {
        return data.teamPositionItem;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(positionId, item) {
    return this.api.mutate(gql`
      mutation createTeamPositionItem(
        $position_id: ID!,
        $item: TeamPositionItemInputType!
      ) {
        createTeamPositionItem(
          position_id: $position_id,
          item: $item
        ) {
          id
          name
        }
      }
    `, { position_id: positionId, item: item }).then((data) => {
      const item = data.createTeamPositionItem;
      this.$rootScope.$emit('itemCreate', positionId, item);
      return item;
    });
  }
  update(positionId, id, item) {
    return this.api.mutate(gql`
      mutation updateTeamPositionItem(
        $id: ID!,
        $item: TeamPositionItemInputType!
      ) {
        updateTeamPositionItem(
          id: $id,
          item: $item
        ) {
          id
          name
        }
      }
    `, { id: id, item: item }).then((data) => {
      const item = data.updateTeamPositionItem;
      this.$rootScope.$emit('itemUpdate', positionId, item);
      return item;
    });
  }
  delete(positionId, id) {
    return this.api.mutate(gql`
      mutation deleteTeamPositionItem(
        $id: ID!
      ) {
        deleteTeamPositionItem(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const item = data.deleteTeamPositionItem;
      this.$rootScope.$emit('itemDelete', positionId, item);
      return item;
    });
  }
}

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.items.service', [
]).service('departmentsDetailTeamDetailPositionsDetailItems', Items).name;
