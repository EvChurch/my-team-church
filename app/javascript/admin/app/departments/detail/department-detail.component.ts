import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApolloQueryObservable } from 'apollo-angular';
import { Subscription }   from 'rxjs/Subscription';

import { DepartmentService }  from '../department.service';
import template from './department-detail.html';

@Component({
  template: template
})

export class DepartmentDetailComponent implements OnInit {
  department: object;
  private paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DepartmentService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: { id: string }) => {
      this.service.departmentGet(params.id, false).subscribe((data) => {
        this.department = data;
      });
    });
  }

  ngOnDestroy() {
    if(this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  save() {
    console.log(this.department);
    this.service.departmentUpdate(this.department['id'], {
      name: this.department['name']
    });
  }
}
