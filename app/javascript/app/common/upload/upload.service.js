import gql from 'graphql-tag';
import { FileChecksum } from "@rails/activestorage/src/file_checksum";
import { BlobUpload } from "@rails/activestorage/src/blob_upload";

class Upload {
  constructor(
    api
  ) {
    this.api = api;
  }
  async upload(file) {
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
    await this.uploadToFileStorageService(url, JSON.parse(headers), file);
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
  uploadToFileStorageService(url, headers, file) {
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
}

export default angular.module('app.common.upload.service', [
]).service('upload', Upload).name;
