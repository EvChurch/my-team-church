// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Department, DepartmentService }  from './department.service';
import template from './department-list.html';

@Component({
  template: template
})
export class DepartmentListComponent implements OnInit {
  departments: Observable<Department[]>;

  private selectedId: number;

  constructor(
    private service: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.departments = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getDepartments();
      });
  }

  isSelected(department: Department) { return department.id === this.selectedId; }

  onSelect(department: Department) {
    this.router.navigate(['/department', department.id]);
  }
}
