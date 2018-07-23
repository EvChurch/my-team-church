import { find } from 'lodash/fp';

class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentLeaders, serviceTypes
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentLeaders = departmentLeaders;
    this.serviceTypes = serviceTypes;
    this.serviceTypeList = [];
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('departmentLeaderDelete', (_event, departmentId, leader) => {
      if (leader.id === this.leader.id) this.$state.go('departments.detail.leaders');
    });
    this.watcher0 = this.$rootScope.$on('departmentLeaderUpdate', (_event, departmentId, leader) => {
      if (leader.id === this.leader.id) this.leader = leader;
    });

    this.serviceTypes.load().then((data) => {
      this.serviceTypeList = data;
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  activeServiceType(serviceType) {
    return find({ 'service_type': { 'id': serviceType.id } }, this.leader.leader_service_types);
  }
  toggleServiceType(serviceType) {
    const leaderServiceType = this.activeServiceType(serviceType);
    if (leaderServiceType) {
      this.departmentLeaders.deleteDepartmentLeaderServiceType(
        this.$stateParams.departmentId, this.$stateParams.leaderId, leaderServiceType.id
      )
    } else {
      this.departmentLeaders.createDepartmentLeaderServiceType(
        this.$stateParams.departmentId, this.$stateParams.leaderId, {
        service_type_id: serviceType.id
      });
    }
  }
}

let Detail = {
  bindings: {
    departmentId: '<',
    leader: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.leaders.detail.component', [
]).component('departmentsDetailLeadersDetail', Detail).name;
