class HomeController {
}

let Home = {
  bindings: {},
  template: require('./home.html'),
  controller: HomeController
};

export default angular.module('app.components.home.component', [
]).component('home', Home).name;
