import { NgModule }       from '@angular/core';
import { OrganizationsComponent }  from './organizations.component';
import { OrganizationsService } from './organizations.service';

@NgModule({
  imports: [
  ],
  declarations: [
    OrganizationsComponent
  ],
  providers: [
    OrganizationsService
  ]
})

export class OrganizationsModule {}
