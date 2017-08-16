import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import 'rxjs/add/operator/map';

import { PositionIndexQuery } from '../graphql/schema';
import PositionIndexQueryNode from '../graphql/positionIndex.gql';

import { PositionGetQuery } from '../graphql/schema';
import PositionGetQueryNode from '../graphql/positionGet.gql';

import { PositionUpdateMutation } from '../graphql/schema';
import PositionUpdateMutationNode from '../graphql/positionUpdate.gql';

import { TreeNode } from 'primeng/primeng';

@Injectable()
export class PositionService {

  constructor(private apollo: Apollo) {}

  positionIndex(parentId?: string) {
    return this.apollo.watchQuery<PositionIndexQuery>({
      query: PositionIndexQueryNode,
      variables: {
        parent_id: parentId,
      }
    }).map(result => {
        return result.data.position_index.map(position => this.deserializePosition(position));
    }) as any;
  }

  positionGet(id: string) {
    return this.apollo.watchQuery<PositionGetQuery>({
      query: PositionGetQueryNode,
      variables: {
        id: id,
      }
    }).map(result => {
      return this.deserializePosition(result.data.position_get);
    }) as any;
  }

  positionUpdate(id: string, position: object) {
    return this.apollo.mutate({
      mutation: PositionUpdateMutationNode,
      variables: {
        id: id,
        position: position
      }
    });
  }

  private deserializePosition(position: object) {
      return {
        'icon': 'fa-id-card-o',
        'label': position['name'],
        'data': {
          'id': position['id'],
          'name': position['name'],
          'type': 'Position'
        },
        'leaf': false,
        'children':
            position['people'] ? position['people'].map(child => this.deserializePerson(child)) : []
      };
  }

  private deserializePerson(person: object) {
    return {
      'icon': 'fa-user-circle-o',
      'draggable': false,
      'label': `${person['firstname']} ${person['lastname']}`,
      'data': {
        'id': person['id'],
        'firstname': person['firstname'],
        'lastname': person['lastname'],
        'type': 'Person'
      },
      'leaf': true
    }
  }
}
