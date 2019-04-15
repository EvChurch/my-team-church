class Trix {
  constructor(
    api
  ) {
    this.api = api;
  }
  attachmentAdd(e) {
    var reader = new FileReader();
    let data = reader.readAsDataURL(e.attachment.file);
  }
}

export default angular.module('app.common.trix.service', [
]).service('trix', Trix).name;
