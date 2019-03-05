import {Inject} from '@angular/core';
import {DataService, IDataService} from './data-service';
import {ICloudService} from './cloud-service';
import {DropboxService} from './dropbox-service';

export class CloudServiceProvider {
  constructor(
    @Inject(DataService) private dataService: IDataService,
    private dropboxService: DropboxService,
  ) { }

  getCloudService(): ICloudService {
    switch (this.dataService.cloudService) {
      case 'dropbox':
        return this.dropboxService;
    }
    console.error('Unrecognized cloud service: ' + this.dataService.cloudService);
  }
}
