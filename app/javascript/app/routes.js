export default class Routes {
  static config($stateProvider) {
    $stateProvider.state({
      name: 'root',
      abstract: true,
      component: 'root',
      resolve: {
        0: /* @ngInject*/ (user) => user.load()
      }
    }).state({
      name: 'home',
      title: 'Home',
      url: '/',
      component: 'home',
      parent: 'root'
    }).state({
      name: 'user',
      title: 'User',
      url: '/user',
      component: 'user',
      parent: 'root'
    }).state({
      name: 'departments',
      title: 'Departments',
      url: '/departments',
      component: 'departments',
      parent: 'root',
      resolve: {
        0: /* @ngInject*/ (departments) => departments.load()
      }
    }).state({
      name: 'departments.detail',
      url: '/:id',
      component: 'departmentsDetail'
    }).state({
      name: 'departments.detail.objectives',
      url: '/objectives',
      component: 'objectives',
      resolve: {
        service: /* @ngInject*/ (departments) => departments,
        collection: /* @ngInject*/ ($stateParams, departments) => departments.getObjectives($stateParams.id)
      }
    }).state({
      name: 'departments.detail.positions',
      url: '/positions',
      component: 'departmentsDetailPositions',
      resolve: {
        positions: /* @ngInject*/ ($stateParams, departments) => departments.getPositions($stateParams.id)
      }
    });
  }
}
