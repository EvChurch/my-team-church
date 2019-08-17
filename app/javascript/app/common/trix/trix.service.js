import gql from 'graphql-tag';
import { FileChecksum } from "@rails/activestorage/src/file_checksum";
import { BlobUpload } from "@rails/activestorage/src/blob_upload";

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
  async getBlob({ file }) {
    const checksum = await this.calculateChecksum(file);
    let upload = {
      filename: file.name,
      content_type: file.type,
      checksum: checksum,
      byte_size: file.size
    }
    const { createUpload: { url, headers, signed_blob_id } } = await this.api.mutate(gql`
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
    `, { upload: upload });
    console.log(headers);
    await this.upload(url, JSON.parse(headers), file);
    return signed_blob_id;
  }
  calculateChecksum(file) {
    return new Promise((resolve, reject) => {
      FileChecksum.create(file, (error, checksum) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(checksum);
      });
    });
  }
  upload(url, headers, file) {
    const upload = new BlobUpload({ file, directUploadData: { url, headers } });
    return new Promise((resolve, reject) => {
      upload.create(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
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
