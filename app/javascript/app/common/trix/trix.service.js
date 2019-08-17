import gql from 'graphql-tag';

class Trix {
  constructor(
    api
  ) {
    this.api = api;
  }
  attachmentAdd(event) {
    if (event.attachment.file) {
      this.getBlob(event.attachment);
    }
  }
  getBlob(attachment) {
    let upload = {
      filename: "dev.to", // file name
      content_type: "image/jpeg", // file content type
      checksum: "Z3Yzc2Q5iA5eXIgeTJn", // checksum
      byte_size: 2019 // size in bytes
    }
    return this.api.mutate(gql`
      mutation createUpload($upload: UploadInputType!) {
        createUpload(
          upload: $upload
          ) {
            blob_id
            headers
            signed_blob_id
            url
        }
      }
    `, { upload: upload }).then((data) => {
      console.log(data);
    });
  }
  // uploadFileAttachment(attachment) {
  //   uploadFile(attachment.file, setProgress, setAttributes)

  //   function setProgress(progress) {
  //     attachment.setUploadProgress(progress)
  //   }

  //   function setAttributes(attributes) {
  //     attachment.setAttributes(attributes)
  //   }
  // }
  // uploadFile(file, progressCallback, successCallback) {
  //   var key = createStorageKey(file)
  //   var formData = createFormData(key, file)
  //   var xhr = new XMLHttpRequest()
  //   xhr.open("POST", HOST, true)
  //   xhr.upload.addEventListener("progress", function(event) {
  //     var progress = event.loaded / event.total * 100
  //     progressCallback(progress)
  //   })
  //   xhr.addEventListener("load", function(event) {
  //     if (xhr.status == 204) {
  //       var attributes = {
  //         url: HOST + key,
  //         href: HOST + key + "?content-disposition=attachment"
  //       }
  //       successCallback(attributes)
  //     }
  //   })
  //   xhr.send(formData)
  // }
  // createStorageKey(file) {
  //   var date = new Date()
  //   var day = date.toISOString().slice(0,10)
  //   var name = date.getTime() + "-" + file.name
  //   return [ "tmp", day, name ].join("/")
  // }
  // createFormData(key, file) {
  //   var data = new FormData()
  //   data.append("key", key)
  //   data.append("Content-Type", file.type)
  //   data.append("file", file)
  //   return data
  // }
}

export default angular.module('app.common.trix.service', [
]).service('trix', Trix).name;
