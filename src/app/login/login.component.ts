import { Component, OnInit } from '@angular/core';
import {DropboxService} from '../dropbox-service';
import {Utils} from '../utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PassSession} from '../pass-model';
import {SessionDataService} from '../session-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password = '';

  /**
   * This is only used when logging in for the first time
   */
  public confirmPassword = '';

  private encryptedData: ArrayBuffer = null;

  public loading = true;

  public newAccount = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dropboxService: DropboxService,
    private router: Router,
    private sessionDataService: SessionDataService,
  ) { }

  ngOnInit() {
    this.dropboxService.getData(this.dropboxService.getAccessTokenByLocation(location))
      .then(result => {
        this.encryptedData = result;
      })
      .catch(err => {
        // This should hopefully mean the data does not exist. If so, offer a second password field to confirm it
        console.error(err);
        this.newAccount = true;
      })
      .finally(() => this.loading = false);
  }

  logIn() {
    console.log(`The password is: ${this.password}`);

    const hash = Utils.passwordHash(this.password);
    let session: PassSession = null;
    if (!this.newAccount) {
      const data = Utils.decryptData(this.encryptedData, hash);
      if (data === null) {
        // TODO: Show the error in the GUI
        console.error('Invalid password');
        return;
      }
      session = new PassSession(data);
    } else {
      session = new PassSession();
    }

    this.sessionDataService.passwordHash = hash;
    this.sessionDataService.session = session;
    this.sessionDataService.accessToken = this.dropboxService.getAccessTokenByLocation(location);
    this.router.navigateByUrl('/list');
  }

  /**
   * Error message to be shown depending on what the user has typed
   */
  errorMessage(): string {
    if (this.loading) {
      return 'Loading stored data...';
    }
    if (!this.newAccount) {
      return null;
    }
    if (this.password.length < 4) {
      return 'Password must be of at least 4 characters';
    }
    if (this.password !== this.confirmPassword) {
      return 'Both passwords do not coincide';
    }
    return null;
  }
}
