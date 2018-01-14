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
            parent: 'root',
            params: {
              navbar: false
            }
        });
    }
}
