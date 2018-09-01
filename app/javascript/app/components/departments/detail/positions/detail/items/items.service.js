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
      query positionItems($position_id: ID!) {
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
      query positionItem($position_id: ID!, $id: ID!){
        positionItem(
          position_id: $position_id,
          id: $id
        ) {
          id
          name
        }
      }
    `, { position_id: positionId, id: id }).then((data) => {
      return data.positionItem;
    });
  }
  create(positionId, positionItem) {
    return this.api.mutate(gql`
      mutation createPositionItem(
        $position_id: ID!,
        $position_item: PositionItemInputType!
      ) {
        createPositionItem(
          position_id: $position_id,
          position_item: $position_item
        ) {
          id
          name
        }
      }
    `, { position_id: positionId, position_item: positionItem }).then((data) => {
      const positionItem = data.createPositionItem;
      this.$rootScope.$emit('departmentPositionItemCreate', positionId, positionItem);
      return positionItem;
    });
  }
  update(positionId, id, positionItem) {
    return this.api.mutate(gql`
      mutation updatePositionItem(
        $id: ID!,
        $position_item: PositionItemInputType!
      ) {
        updatePositionItem(
          id: $id,
          position_item: $position_item
        ) {
          id
          name
        }
      }
    `, { id: id, position_item: positionItem }).then((data) => {
      const positionItem = data.updatePositionItem;
      this.$rootScope.$emit('departmentPositionItemUpdate', positionId, positionItem);
      return positionItem;
    });
  }
  delete(positionId, id) {
    return this.api.mutate(gql`
      mutation deletePositionItem(
        $id: ID!
      ) {
        deletePositionItem(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const positionItem = data.deletePositionItem;
      this.$rootScope.$emit('departmentPositionItemDelete', positionId, positionItem);
      return positionItem;
    });
  }
}

export default angular.module('app.components.departments.detail.positions.detail.items.service', [
]).service('departmentPositionItems', Items).name;
