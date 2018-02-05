import Routes from './routes';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

/* @ngInject*/
export default function appConfig(
  apolloProvider, $stateProvider, $locationProvider, $windowProvider
) {
  let $window = $windowProvider.$get();

  $locationProvider.html5Mode({
    enabled: true,
    rewriteLinks: false
  }).hashPrefix('!');

  const networkInterface = createNetworkInterface({
    uri: 'http://api.lvh.me:3000/queries'
  });

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['authorization'] =
        $window.localStorage.getItem('token');
      next();
    }
  }]);

  apolloProvider.defaultClient(
    new ApolloClient({
      networkInterface
    })
  );

  Routes.config($stateProvider);
}
