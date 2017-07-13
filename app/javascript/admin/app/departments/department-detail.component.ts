import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Department, DepartmentService }  from './department.service';
import template from './department-detail.html';

@Component({
  template: template
})

export class DepartmentDetailComponent implements OnInit {

  department: Department;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DepartmentService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getDepartment(params.get('id')))
      .subscribe((department: Department) => this.department = department);
  }

  gotoDepartments() {
    let departmentId = this.department ? this.department.id : null;
    this.router.navigate(['/departments', { id: departmentId }]);
  }
}
