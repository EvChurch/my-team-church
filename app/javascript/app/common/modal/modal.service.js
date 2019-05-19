import { assign } from 'lodash/fp';

class ModalService {
  constructor($modal, $q) {
    this.$modal = $modal;
    this.$q = $q;
    this.defaultParams = {
      animation: 'am-fade',
      placement: 'center',
      controllerAs: '$ctrl',
      locals: {}
    };
  }
  open(params) {
    let deferred = this.$q.defer();
    let openParams = assign(this.defaultParams, params);
    openParams.onHide = (value) => {
      deferred.resolve();
      if (params.onHide) {
        params.onHide(value);
      }
    };
    openParams.locals.success = false;
    this.$modal(openParams);
    return deferred.promise;
  }
  confirm(message, title = null) {
    let deferred = this.$q.defer();
    const params = {
      template: require('./confirm/confirm.html'),
      controller: 'confirmController',
      locals: {
        message: message,
        confirmPromise: deferred,
        title: title
      },
      onHide: () => {
        deferred.reject();
      }
    };
    this.open(params);
    return deferred.promise;
  }
  delete(name, type = 'record') {
    let deferred = this.$q.defer();
    const params = {
      template: require('./delete/delete.html'),
      controller: 'deleteController',
      locals: {
        name: name,
        deletePromise: deferred,
        type: type
      },
      onHide: () => {
        deferred.reject();
      }
    };
    this.open(params);
    return deferred.promise;
  }
  info(message, type = null) {
    let deferred = this.$q.defer();
    const params = {
      template: require('./info/info.html'),
      controller: 'infoController',
      locals: {
        message: message,
        infoPromise: deferred,
        title: title
      },
      onHide: () => {
        deferred.resolve();
      }
    };
    this.open(params);
    return deferred.promise;
  }
}

export default angular.module('app.common.modal.service', [
]).service('modal', ModalService).name;
