import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import 'rxjs/add/operator/map';

import { DepartmentIndexQuery } from '../graphql/schema';
import DepartmentIndexQueryNode from '../graphql/departmentIndex.gql';

import { DepartmentGetQuery } from '../graphql/schema';
import DepartmentGetQueryNode from '../graphql/departmentGet.gql';

import { DepartmentUpdateMutation } from '../graphql/schema';
import DepartmentUpdateMutationNode from '../graphql/departmentUpdate.gql';

import { TreeNode } from 'primeng/primeng';

@Injectable()
export class DepartmentService {

  constructor(private apollo: Apollo) {}

  departmentIndex(parentId?: string) {
    return this.apollo.watchQuery<DepartmentIndexQuery>({
      query: DepartmentIndexQueryNode,
      variables: {
        parent_id: parentId,
      }
    }).map(result => {
        return result.data.department_index.map(department => this.deserializeDepartment(department));
    }) as any;
  }

  departmentGet(id: string, deserialize = true) {
    return this.apollo.watchQuery<DepartmentGetQuery>({
      query: DepartmentGetQueryNode,
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
      mutation: DepartmentUpdateMutationNode,
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
