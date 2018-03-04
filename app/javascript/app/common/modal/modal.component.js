class ModalController {
  constructor(
    $element, $attrs, $scope,
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.$scope = $scope;
  }
  $onInit() {
    this.hideFooter = this.hideFooter || false;
    this.size = this.size || 'md';
    this.valid = this.valid || true;
    this.saving = false;

    this.cancelText = this.cancelText || 'Cancel';
    this.saveText = this.saveText || 'Save';
  }
  $postLink() {
    this.$element.addClass('modal');
    this.$element.attr('tabindex', '-1');
    this.$element.attr('role', 'dialog');
  }
  saveAndBlock() {
    this.saving = true;
    return this.save().then((data) => {
      this.saving = false;
      return data;
    }).catch((err) => {
      this.saving = false;
      throw err;
    });
  }
  deleteAndBlock() {
    this.saving = true;
    return this.delete().then((data) => {
      this.saving = false;
      return data;
    }).catch((err) => {
      this.saving = false;
      throw err;
    });
  }
}

const Modal = {
  template: require('./modal.html'),
  controller: ModalController,
  transclude: true,
  bindings: {
    title: '@',
    size: '@',
    cancel: '&',
    cancelText: '@',
    delete: '&',
    hideFooter: '<',
    showDelete: '<',
    save: '&',
    saveText: '@',
    valid: '<'
  }
};

export default angular.module('app.common.modal.component', [
]).component('modal', Modal).name;
