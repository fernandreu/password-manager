import {Injectable} from '@angular/core';
import {Utils} from 'src/app/model/utils';
import {Dropbox} from 'dropbox';
import {ICloudService} from './cloud-service';
import fetch from 'isomorphic-fetch';
import {FileUtils} from '../model/file';
import {MsalService} from '@azure/msal-angular';
import {environment} from '../../environments/environment';

export const OAuthSettings = {
  appId: '97792b2b-19f8-4bbf-9148-d7a0fb908888',
  redirectUri: environment.baseUrl + '/login',
  responseType: 'id_token',
  scopes: [
    'User.ReadWrite'
  ]
};

@Injectable({ providedIn: 'root' })
export class OneDriveService implements ICloudService {
  public authenticated = false;

  constructor(
    private msalService: MsalService,
  ) {
  }

  getName(): string {
    return 'onedrive';
  }

  async logIn(): Promise<void> {
    await this.msalService.loginRedirect(OAuthSettings);
    this.authenticated = true;
  }

  // Silently requests an access token
  private async getAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(OAuthSettings);
    return result.accessToken;
  }

  getAccessTokenByLocation(location: Location) {
    console.log('location:', location);
    return this.getAccessTokenByHash(location.hash);
  }

  getAccessTokenByHash(hash: string): string {
    console.log('hash:', hash);
    return Utils.parseQueryString(hash)['id_token'];
  }

  async getData(accessToken: string): Promise<ArrayBuffer> {
    return null;
    // const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch } as any);
    // await dbx.filesGetMetadata({ path: '/data.json' });
    // const data = await this.loadData(dbx);
    // console.log('Data:', data);
    // return data;
  }

  async saveData(accessToken: string, data: any, passwordHash: string) {
    // const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch } as any);
    // const encrypted = Utils.encryptData(data, passwordHash);
    // // Save a backup first
    // const backupPath = '/data-' + new Date() + '.json';
    // await this.renameFile('/data.json', backupPath, accessToken);
    // try {
    //   await dbx.filesUpload({path: '/data.json', contents: encrypted, mode: {'.tag': 'overwrite'}});
    // } catch (ex) {
    //   // Rethrow, but not without renaming back the backup first
    //   await this.renameFile(backupPath, '/data.json', accessToken);
    //   throw ex;
    // }
  }

  // private async renameFile(oldName: string, newName: string, accessToken: string) {
  //   const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch } as any);
  //   await dbx.filesMoveV2({ from_path: oldName, to_path: newName, autorename: true });
  // }
}
