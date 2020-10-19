import {Inject, Injectable} from '@angular/core';
import {DataService, IDataService} from './data-service';
import {ICloudService} from './cloud-service';
import {DropboxService} from './dropbox-service';
import {OneDriveService} from './onedrive-service';

@Injectable()
export class CloudServiceProvider {
  constructor(
    @Inject(DataService) private dataService: IDataService,
    private dropboxService: DropboxService,
    private oneDriveService: OneDriveService
  ) { }

  get provider(): string {
    return this.dataService.cloudService;
  }

  get cloudService(): ICloudService {
    switch (this.provider) {
      case 'dropbox':
        return this.dropboxService;
      case 'onedrive':
        return this.oneDriveService;
    }
    console.error('Unrecognized cloud service: ' + this.provider);
  }
}
