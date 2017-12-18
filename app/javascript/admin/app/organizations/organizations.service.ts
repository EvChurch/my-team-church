import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import 'rxjs/add/operator/map';

import { organizationIndexQuery } from '../graphql/schema';
import OrganizationIndexQueryNode from '../graphql/organizationIndex.gql';

@Injectable()
export class OrganizationsService {
  public organizations: object

  constructor(private apollo: Apollo) {}

  organizationIndex() {
    return this.apollo.watchQuery<organizationIndexQuery>({
      query: OrganizationIndexQueryNode,
    }).map(result => {
      this.organizations = result.data.organization_index;
    }) as any;
  }
}
