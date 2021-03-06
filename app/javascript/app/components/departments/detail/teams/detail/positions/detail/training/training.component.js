
class TrainingController {
  constructor(
    $sce, $stateParams,
    departmentsDetailTeamsDetailPositions, upload
  ) {
    this.$sce = $sce;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
    this.upload = upload;
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
  async uploadAttachment(event) {
    if (event.attachment.file) {
      const signedBlobId = await this.upload.upload(event.attachment.file);
      const attachment = await this.departmentsDetailTeamsDetailPositions.attach(
        this.$stateParams.positionId, signedBlobId
      );
      event.attachment.setAttributes({
        url: attachment.url,
        href: attachment.url
      });
    }
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
