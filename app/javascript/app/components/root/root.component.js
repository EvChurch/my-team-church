class RootController {
  constructor($document, $rootScope) {
    this.$document = $document;
    this.$rootScope = $rootScope;
  }
  click() {
    this.$rootScope.$emit('root:click');
  }
}

let Root = {
  template: require('./root.html'),
  controller: RootController
};


export default angular.module('app.components.root.component', [
]).component('root', Root).name;
