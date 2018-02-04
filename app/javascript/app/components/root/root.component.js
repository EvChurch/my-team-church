class RootController {
}

let Root = {
  bindings: {},
  template: require('./root.html'),
  controller: RootController
};


export default angular.module('app.components.root.component', [
]).component('root', Root).name;
