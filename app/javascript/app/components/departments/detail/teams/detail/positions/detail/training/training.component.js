
class TrainingController {
  constructor(
    $sce, $stateParams,
    departmentsDetailTeamsDetailPositions, trix
  ) {
    this.$sce = $sce;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
    this.trix = trix;
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
        { training_description: this.position.training_description }
      );
    }
  }
}

let Training = {
  bindings: {
    readOnly: '<'
  },
  template: require('./training.html'),
  controller: TrainingController
};

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.training.component', [
]).component('departmentsDetailTeamsDetailPositionsDetailTraining', Training).name;
