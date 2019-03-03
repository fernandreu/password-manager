import { Component } from '@angular/core';
import {SessionDataService} from './session-data.service';
import {DropboxService} from './dropbox-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Private Pass';

  constructor(
    private dropboxService: DropboxService,
    private sessionDataService: SessionDataService,
  ) {

  }

  sessionIsActive() {
    return this.sessionDataService.session !== null && this.sessionDataService.accessToken !== null && this.sessionDataService.passwordHash !== null;
  }

  saveSession() {
    this.dropboxService.saveData(this.sessionDataService.accessToken, this.sessionDataService.session, this.sessionDataService.passwordHash)
      .then(() => console.log('Saved'))
      .catch((error) => console.error(error));
  }
}
