// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApolloQueryObservable } from 'apollo-angular';
import { TreeDragDropService } from 'primeng/primeng';
import { Subscription }   from 'rxjs/Subscription';

import { DepartmentService }  from '../department.service';
import { PositionService }  from '../../positions/position.service';
import { DepartmentIndexQuery } from '../../graphql/schema';
import template from './department-list.html';


@Component({
  template: template,
  providers: [TreeDragDropService]
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  departments: ApolloQueryObservable<DepartmentIndexQuery>;
  private paramsSubscription: Subscription;

  constructor(
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.departments = this.departmentService.departmentIndex(params['parent_id']);
    });
  }

  ngOnDestroy() {
    if(this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  moveNode(event) {
    const dragNode = event.dragNode;
    const dropNode = event.dropNode;

    if (dragNode) {
      switch (dragNode.data.type) {
        case 'Department':
        this.departmentService.departmentUpdate(dragNode.data.id, { parent_id: dropNode ? dropNode.data.id : '' });
        break;
        case 'Position':
        this.positionService.positionUpdate(dragNode.data.id, { department_id: dropNode ? dropNode.data.id : '' });
        break;
      }
    }
  }

  selectNode(event) {
    const node = event.node;

    if(node) {
      switch (node.data.type) {
        case 'Department':
        this.router.navigate(['/departments', { outlets: { 'workspace': [node.data.id] } }]);
        break;
        case 'Position':
        this.router.navigate(['position', { id: node.data.id }]);
        break;
        case 'Person':
        this.router.navigate(['person', { id: node.data.id }]);
        break;
      }
    }
  }

  loadNode(event) {
    const node = event.node;

    if(node) {
      switch (node.data.type) {
        case 'Department':
        this.departmentService.departmentGet(node.data.id).subscribe((data) => {
          node.children = data.children;
        });
        break;
        case 'Position':
        this.positionService.positionGet(node.data.id).subscribe((data) => {
          node.children = data.children;
        });
        break;
      }
    }
  }
}
