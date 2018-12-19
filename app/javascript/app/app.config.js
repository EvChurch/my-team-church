import Routes from './routes';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

/* @ngInject */
export default function appConfig(
  apolloProvider, $stateProvider, $locationProvider, $windowProvider
) {
  let $window = $windowProvider.$get();

  $locationProvider.html5Mode({
    enabled: true,
    rewriteLinks: false
  }).hashPrefix('!');

  const httpLink = createHttpLink({ uri: $window.document.getElementById('queries_url').getAttribute('value') });

  const middlewareLink = setContext(() => ({
    headers: { authorization: $window.localStorage.getItem('token') || null }
  }));

  const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  apolloProvider.defaultClient(client);

  Routes.config($stateProvider);
}
