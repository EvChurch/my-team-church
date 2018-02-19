class RootController {
  constructor($document, $rootScope) {
    this.$document = $document;
    this.$rootScope = $rootScope;
  }
  $onInit() {
    this.$document.on('click', () => {
      this.$rootScope.$emit('root:click');
      this.$rootScope.$digest();
    });
  }
}

let Root = {
  bindings: {},
  template: require('./root.html'),
  controller: RootController
};


export default angular.module('app.components.root.component', [
]).component('root', Root).name;
