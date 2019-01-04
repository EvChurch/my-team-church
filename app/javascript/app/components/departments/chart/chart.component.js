import gql from 'graphql-tag';
import { concat, each, map, reduce } from 'lodash/fp';

class ChartController {
  constructor(
    api, organizations
  ) {
    this.api = api;
    this.organizations = organizations;
    this.list = [];
  }
  $onInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.api.query(gql`
      query {
        departments {
          ...DepartmentFields
          ...ChildrenRecursive
        }
      }

      fragment ChildrenRecursive on Department {
        children {
          ...DepartmentFields
          children {
            ...DepartmentFields
            children {
              ...DepartmentFields
              children {
                ...DepartmentFields
                children {
                  ...DepartmentFields
                  children {
                    ...DepartmentFields
                    children {
                      ...DepartmentFields
                      children {
                        ...DepartmentFields
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      fragment DepartmentFields on Department {
        id
        name
        leaders {
          person {
            id
            first_name
            last_name
          }
        }
        teams {
          id
          name
          leaders {
            person {
              id
              first_name
              last_name
            }
          }
          positions {
            id
            name
            entities {
              person {
                id
                first_name
                last_name
              }
            }
          }
        }
      }
    `).then((data) => {
      this.loading = false;
      this.list = angular.copy(data.departments);
      this.createChart();
    }).catch((ex) => {
      throw ex;
    });
  }
  createChart() {
    const chart = $('#chart-container').orgchart({
      data: {
        id: this.organizations.primary.id,
        name: this.organizations.primary.name,
        className: 'organization'
      },
      nodeContent: 'content'
    });
    this.addDepartments(
      chart,
      $(`#${this.organizations.primary.id}`),
      { id: this.organizations.primary.id, children: this.list, teams: [] }
    );
  }
  addDepartments(chart, node, department) {
    const children =
      concat(
        map((department) => {
          return {
            id: department.id,
            name: `<i class="fas fa-sitemap"></i>${department.name}`,
            className: 'department',
            content: this.stringifyCollection(department.leaders)
          }
        }, department.children),
        map((team) => {
          return {
            id: team.id,
            name: `<i class="fas fa-users"></i>${team.name}`,
            className: 'team',
            children: map((position) => {
              return {
                id: position.id,
                name: `<i class="fas fa-user"></i>${position.name}`,
                className: 'position',
                content: this.stringifyCollection(position.entities)
              }
            }, team.positions),
            content: this.stringifyCollection(team.leaders)
          }
        }, department.teams),
      );
    chart.addChildren(node, children);
    each((department) => {
      this.addDepartments(chart, $(`#${department.id}`), department);
    }, department.children);
  }
  stringifyCollection(collection) {
    return reduce((result, entity) => {
      if (result !== '') {
        result += '<br>'
      }
      result += `${entity.person.first_name} ${entity.person.last_name}`
      return result;
    }, '', collection);
  }
}

let Chart = {
  template: require('./chart.html'),
  controller: ChartController
};

export default angular.module('app.components.departments.chart.component', [
]).component('departmentsChart', Chart).name;
