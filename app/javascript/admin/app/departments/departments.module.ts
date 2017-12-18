import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/primeng';
import { DepartmentDetailComponent }  from './detail/department-detail.component';
import { DepartmentListComponent }    from './list/department-list.component';
import { DepartmentService } from './department.service';
import { DepartmentsRoutingModule } from './departments-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DepartmentsRoutingModule,
    TreeModule
  ],
  declarations: [
    DepartmentDetailComponent,
    DepartmentListComponent
  ],
  providers: [
    DepartmentService
  ]
})

export class DepartmentsModule {}
