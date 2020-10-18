import {Injectable} from '@angular/core';
import {environment} from 'src/app/../environments/environment';
import {Utils} from 'src/app/model/utils';
import {Dropbox} from 'dropbox';
import {ICloudService} from './cloud-service';
import fetch from 'isomorphic-fetch';
import {FileUtils} from '../model/file';

const CLIENT_ID = 'fe6hp2qg2ipodyz';


@Injectable({ providedIn: 'root' })
export class DropboxService implements ICloudService {

  getAuthenticationUrl(): string {
    const dbx = new Dropbox({clientId: CLIENT_ID, fetch: fetch} as any);
    return dbx.getAuthenticationUrl(environment.baseUrl + '/login');
  }

  getAccessTokenByLocation(location: Location) {
    return this.getAccessTokenByHash(location.hash);
  }

  getAccessTokenByHash(hash: string): string {
    return Utils.parseQueryString(hash)['access_token'];
  }

  private async loadData(dbx: any): Promise<ArrayBuffer> {
    const metaData = await dbx.filesDownload({ path: '/data.json' });
    return await FileUtils.readAsBinaryStringAsync(metaData.fileBlob);
  }

  async getData(accessToken: string): Promise<ArrayBuffer> {
    const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch } as any);
    await dbx.filesGetMetadata({ path: '/data.json' });
    const data = await this.loadData(dbx);
    console.log('Data:', data);
    return data;
  }

  async saveData(accessToken: string, data: any, passwordHash: string) {
    const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch } as any);
    const encrypted = Utils.encryptData(data, passwordHash);
    // Save a backup first
    const backupPath = '/data-' + new Date() + '.json';
    await this.renameFile('/data.json', backupPath, accessToken);
    try {
      await dbx.filesUpload({path: '/data.json', contents: encrypted, mode: {'.tag': 'overwrite'}});
    } catch (ex) {
      // Rethrow, but not without renaming back the backup first
      await this.renameFile(backupPath, '/data.json', accessToken);
      throw ex;
    }
  }

  private async renameFile(oldName: string, newName: string, accessToken: string) {
    const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch } as any);
    await dbx.filesMoveV2({ from_path: oldName, to_path: newName, autorename: true });
  }
}
