import Routes from './routes';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

/* @ngInject*/
export default function appConfig(
  apolloProvider, $stateProvider, $locationProvider, $windowProvider
) {
  const $window = $windowProvider.$get();
  $locationProvider.html5Mode({
    enabled: true,
    rewriteLinks: false
  }).hashPrefix('!');

  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql'
  });

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['authorization'] = `Bearer ${angular.element(document).find('#access_token').val()}`
      next();
    }
  }]);

  const client = new ApolloClient({
    networkInterface
  });
  apolloProvider.defaultClient(client);

  Routes.config($stateProvider);
}
