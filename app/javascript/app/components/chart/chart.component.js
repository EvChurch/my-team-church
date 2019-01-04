import gql from 'graphql-tag';

class ChartController {
  constructor(
    api
  ) {
    this.api = api;
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
          name
        }
        teams {
          leaders {
            name
          }
          positions {
            name
          }
        }
      }
    `).then((data) => {
      this.loading = false
      this.list = data.departments;
      this.createChart();
    });
  }
  createChart() {
    $('#chart-container').orgchart({
      'data' : this.list,
      'nodeContent': 'title'
    });
  }
}

let Chart = {
  template: require('./chart.html'),
  controller: ChartController
};

export default angular.module('app.components.chart.component', [
]).component('chart', Chart).name;
