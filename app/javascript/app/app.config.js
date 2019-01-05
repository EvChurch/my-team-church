import Routes from './routes';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

/* @ngInject */
export default function appConfig(
  apolloProvider, $stateProvider, $locationProvider, $windowProvider, $tooltipProvider
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

  angular.extend($tooltipProvider.defaults, {
    bsEnabled: !isTouchDevice()
  });
}

function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}
