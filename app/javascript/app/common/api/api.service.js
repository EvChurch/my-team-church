class Api {
    constructor(
      $http, $log, $window,
      apollo
    ) {
      this.$http = $http;
      this.$log = $log;
      this.$window = $window;
      this.apollo = apollo;
    }

    query(gql, variables = {}) {
      return this.apollo.query({
        query: gql,
        variables: variables,
        fetchPolicy: 'network-only'
      }).then((data) => {
        this.$log.log(gql, data.data);
        return data.data;
      });
    }

    mutate(gql, variables) {
      return this.apollo.mutate({
        mutation: gql,
        variables: variables
      }).then((data) => {
        this.$log.log(gql, variables, data.data);
        return data.data;
      });
    }
}

export default angular.module('app.common.api.service', [
]).service('api', Api).name;
