export default class Routes {
    static config($stateProvider) {
        $stateProvider.state({
            name: 'root',
            abstract: true,
            component: 'root'
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
