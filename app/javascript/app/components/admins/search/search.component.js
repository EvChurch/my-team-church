import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    admins
  ) {
    this.admins = admins;

    this.searchString = '';
    this.list = [];
    this.admin = null;
  }
  search() {
    if (this.searchString === '') {
      this.list = [];
    } else {
      this.loading = true;
      this.admins.loadUsers(this.searchString).then((admins) => {
        this.loading = false;
        this.list = angular.copy(admins);
        this.list.hasNextPage = admins.hasNextPage;
      });
    }
  }
  loadMore() {
    this.loading = true;
    this.admins.loadUsers(this.searchString, this.list[this.list.length - 1].cursor).then((admins) => {
      this.loading = false;
      this.list = concat(this.list, angular.copy(admins));
      this.list.hasNextPage = admins.hasNextPage;
    });
  }
  setAdmin(admin = null) {
    const id = admin ? admin.id : null;
    this.admin = admin;
    this.searchString = '';
    this.list = [];
    this.setAdminId({ $id: id });
  }
}

let Search = {
  bindings: {
    setAdminId: '&'
  },
  template: require('./search.html'),
  controller: SearchController
};

export default angular.module('app.components.admins.search.component', [
]).component('adminsSearch', Search).name;
