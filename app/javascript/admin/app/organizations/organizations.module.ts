import { CommonModule }   from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsService } from './organizations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OrganizationsComponent
  ],
  providers: [
    OrganizationsService
  ]
})

export class OrganizationsModule {}
