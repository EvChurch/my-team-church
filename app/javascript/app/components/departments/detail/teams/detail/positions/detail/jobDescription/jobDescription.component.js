
class JobDescriptionController {
  constructor(
    $sce, $stateParams,
    departmentsDetailTeamsDetailPositions
  ) {
    this.$sce = $sce;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
  }
  $onInit() {
    this.loading = true;
    this.departmentsDetailTeamsDetailPositions.get(this.$stateParams.positionId).then((position) => {
      this.position = angular.copy(position);
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments.detail.teams.detail.positions');
      throw ex;
    });
  }
  save() {
    if (!this.readOnly) {
      return this.departmentsDetailTeamsDetailPositions.update(
        this.$stateParams.teamId,
        this.$stateParams.positionId,
        { description: this.position.description }
      );
    }
  }
}

let JobDescription = {
  bindings: {
    readOnly: '<'
  },
  template: require('./jobDescription.html'),
  controller: JobDescriptionController
};

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.jobDescription.component', []
).component('departmentsDetailTeamsDetailPositionsDetailJobDescription', JobDescription).name;
