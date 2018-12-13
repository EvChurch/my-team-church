import gql from 'graphql-tag';

class Items {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  load(positionId) {
    return this.api.query(gql`
      query teamPositionItems($position_id: ID!) {
        positionItems(
          position_id: $position_id,
        ) {
          id
          name
        }
      }
    `, { position_id: positionId }).then((data) => {
      return data.positionItems;
    });
  }
  get(positionId, id) {
    return this.api.query(gql`
      query teamPositionItem($position_id: ID!, $id: ID!){
        positionItem(
          position_id: $position_id,
          id: $id
        ) {
          id
          name
        }
      }
    `, { position_id: positionId, id: id }).then((data) => {
      if (data.positionItem) {
        return data.positionItem;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(positionId, positionItem) {
    return this.api.mutate(gql`
      mutation createTeamPositionItem(
        $position_id: ID!,
        $position_item: PositionItemInputType!
      ) {
        createTeamPositionItem(
          position_id: $position_id,
          position_item: $position_item
        ) {
          id
          name
        }
      }
    `, { position_id: positionId, position_item: positionItem }).then((data) => {
      const positionItem = data.createTeamPositionItem;
      this.$rootScope.$emit('departmentPositionItemCreate', positionId, positionItem);
      return positionItem;
    });
  }
  update(positionId, id, positionItem) {
    return this.api.mutate(gql`
      mutation updateTeamPositionItem(
        $id: ID!,
        $position_item: PositionItemInputType!
      ) {
        updateTeamPositionItem(
          id: $id,
          position_item: $position_item
        ) {
          id
          name
        }
      }
    `, { id: id, position_item: positionItem }).then((data) => {
      const positionItem = data.updateTeamPositionItem;
      this.$rootScope.$emit('departmentPositionItemUpdate', positionId, positionItem);
      return positionItem;
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
      const positionItem = data.deleteTeamPositionItem;
      this.$rootScope.$emit('departmentPositionItemDelete', positionId, positionItem);
      return positionItem;
    });
  }
}

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.items.service', [
]).service('departmentsDetailTeamDetailPositionsDetailItems', Items).name;
