import { Injectable } from '@angular/core';

export class Department {
  constructor(public id: number, public name: string) { }
}

let HEROES = [
  new Department(11, 'Mr. Nice'),
  new Department(12, 'Narco'),
  new Department(13, 'Bombasto'),
  new Department(14, 'Celeritas'),
  new Department(15, 'Magneta'),
  new Department(16, 'RubberMan')
];

let departmentsPromise = Promise.resolve(HEROES);

@Injectable()
export class DepartmentService {
  getDepartments() { return departmentsPromise; }

  getDepartment(id: number | string) {
    return departmentsPromise
      // (+) before `id` turns the string into a number
      .then(departments => departments.find(department => department.id === +id));
  }
}
