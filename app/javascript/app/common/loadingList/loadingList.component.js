import { shuffle } from 'lodash/fp';

class LoadingListController {
  constructor() {
    this.list = shuffle([2, 4, 6, 8, 10]);
  }
}

let LoadingList = {
  template: require('./loadingList.html'),
  controller: LoadingListController
};

export default angular.module('app.common.loadingList.component', [
]).component('loadingList', LoadingList).name;
