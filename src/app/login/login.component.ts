import { Component, OnInit } from '@angular/core';
import {DropboxService} from '../dropbox-service';
import {Utils} from '../utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PassCard, PassSession} from '../pass-model';
import {AppRoutingModule} from '../app-routing.module';
import {SessionDataService} from '../session-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password = '';

  private encryptedData: ArrayBuffer = null;

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
      .catch(err => console.error(err));
  }

  logIn() {
    console.log(`The password is: ${this.password}`);
    if (this.encryptedData === null) {
      return;
    }

    const hash = Utils.passwordHash(this.password);
    const data = Utils.decryptData(this.encryptedData, hash);

    if (data === null) {
      console.error('Invalid password');
      return;
    }

    const session = new PassSession(data);

    this.sessionDataService.passwordHash = hash;
    this.sessionDataService.session = session;
    this.sessionDataService.accessToken = this.dropboxService.getAccessTokenByLocation(location);
    this.router.navigateByUrl('/list');
  }
}
