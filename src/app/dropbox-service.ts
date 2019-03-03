import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Utils} from './utils';
import {Dropbox} from 'dropbox';

const CLIENT_ID = 'fe6hp2qg2ipodyz';

@Injectable({ providedIn: 'root' })
export class DropboxService {

  getAuthenticationUrl(): string {
    const dbx = new Dropbox({clientId: CLIENT_ID});
    return dbx.getAuthenticationUrl(environment.baseUrl + '/login');
  }

  getAccessTokenByLocation(location: Location) {
    return this.getAccessTokenByHash(location.hash);
  }

  getAccessTokenByHash(hash: string): string {
    return Utils.parseQueryString(hash)['access_token'];
  }

  private loadData(dbx: any): Promise<ArrayBuffer> {
    return new Promise(((resolve, reject) => {
      dbx.filesDownload({ path: '/data.json' })
        .then(metaData => {
          const reader = new FileReader();
          reader.onload = () => {
            const encryptedData = reader.result as ArrayBuffer;
            resolve(encryptedData);
          };
          reader.readAsBinaryString(metaData.fileBlob);
        })
        .catch(reject);
    }));
  }

  getData(accessToken: string): Promise<ArrayBuffer> {
    const dbx = new Dropbox({ accessToken: accessToken });
    return new Promise((resolve, reject) => {
      dbx.filesGetMetadata({ path: '/data.json' })
        .then( metaData => {
           this.loadData(dbx)
             .then(resolve)
             .catch(reject);
        })
        .catch(reject);
    });
  }

  saveData(accessToken: string, data: any, passwordHash: string): Promise<boolean> {
    const dbx = new Dropbox({ accessToken: accessToken });
    const encrypted = Utils.encryptData(data, passwordHash);
    // Save a backup first
    const backupPath = '/data-' + new Date() + '.json';
    return new Promise( (resolve, reject) => {
      this.renameFile('/data.json', backupPath, accessToken)
        .then(() => {
          dbx.filesUpload({path: '/data.json', contents: encrypted, mode: {'.tag': 'overwrite'}})
            .then(() => resolve(true))
            .catch((error) => {
              // Call reject, but not without renaming back the backup first
              this.renameFile(backupPath, '/data.json', accessToken)
                .finally(() => reject(error));
            });
        })
        .catch(reject);
    });
  }

  private renameFile(oldName: string, newName: string, accessToken: string): Promise<boolean> {
    const dbx = new Dropbox({ accessToken: accessToken });
    return new Promise((resolve, reject) => {
      dbx.filesMoveV2({ from_path: oldName, to_path: newName, autorename: true })
        .then(() => resolve(true))
        .catch(reject);
    });
  }
}
