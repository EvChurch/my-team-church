import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import 'rxjs/add/operator/map';

import { departmentIndexQuery } from '../graphql/schema';
import departmentIndexQueryNode from '../graphql/departmentIndex.gql';

import { departmentGetQuery } from '../graphql/schema';
import departmentGetQueryNode from '../graphql/departmentGet.gql';

import { departmentUpdateMutation } from '../graphql/schema';
import departmentUpdateMutationNode from '../graphql/departmentUpdate.gql';

import { TreeNode } from 'primeng/primeng';

@Injectable()
export class DepartmentService {

  constructor(private apollo: Apollo) {}

  departmentIndex(parentId?: string) {
    return this.apollo.watchQuery<departmentIndexQuery>({
      query: departmentIndexQueryNode,
      variables: {
        parent_id: parentId,
      }
    }).map(result => {
        return result.data.department_index.map(department => this.deserializeDepartment(department));
    }) as any;
  }

  departmentGet(id: string, deserialize = true) {
    return this.apollo.watchQuery<departmentGetQuery>({
      query: departmentGetQueryNode,
      variables: {
        id: id,
      }
    }).map(result => {
      if (deserialize) {
        return this.deserializeDepartment(result.data.department_get);
      } else {
        return result.data.department_get;
      }
    }) as any;
  }

  departmentUpdate(id: string, department: object) {
    return this.apollo.mutate({
      mutation: departmentUpdateMutationNode,
      variables: {
        id: id,
        department: department
      }
    });
  }

  private deserializeDepartment(department: object) {
      return {
        'icon': 'fa-folder-o',
        'label': department['name'],
        'data': {
          'id': department['id'],
          'name': department['name'],
          'type': 'Department'
        },
        'leaf': false,
        'children':
          [].concat(
            department['children'] ? department['children'].map(child => this.deserializeDepartment(child)) : [],
            department['positions'] ? department['positions'].map(position => this.deserializePosition(position)) : []
          )
      };
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
      'leaf': false
    }
  }
}
