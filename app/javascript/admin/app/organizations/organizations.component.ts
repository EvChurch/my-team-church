import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { OrganizationsService }  from './organizations.service';
import { organizationIndexQuery } from '../graphql/schema';
import template from './organizations.html';

@Component({
  selector: 'organizations',
  template: template
})
export class OrganizationsComponent implements OnInit {
  organizations: ApolloQueryObservable<organizationIndexQuery>;

  constructor(
    private organizationsService: OrganizationsService
  ) {}

  ngOnInit() {
    this.organizations = this.organizationsService.organizationIndex();
  }
}
