import { reduce } from 'lodash/fp';

class EditModalController {
  constructor(
    $scope, $stateParams,
    departmentsDetailTeamsDetailPositionsDetailEntities, departmentsDetailTeamsDetailLeaders,
    positionId,
    entity
  ) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
    this.departmentsDetailTeamsDetailLeaders = departmentsDetailTeamsDetailLeaders;
    this.positionId = positionId;
    this.entity = entity;
    this.entity.leader_ids = reduce((result, leader) => {
      result.push(leader.id);
      return result;
    }, [], this.entity.leaders);
    this.loadLeaders();
  }
  loadLeaders() {
    this.departmentsDetailTeamsDetailLeaders.load(this.$stateParams.teamId).then((leaders) => {
      this.leadersList = angular.copy(leaders);
    });
  }
  save() {
    return this.departmentsDetailTeamsDetailPositionsDetailEntities.update(this.positionId, this.entity.id, {
      start_at: this.entity.start_at,
      end_at: this.entity.end_at,
      leader_ids: this.entity.leader_ids,
      trial: this.entity.trial
    }).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.departmentsDetailTeamsDetailPositionsDetailEntities.delete(this.positionId, this.entity).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.entities.edit.controller', []
).controller('departmentsDetailTeamsDetailPositionsDetailEntitiesEditModalController', EditModalController).name;
