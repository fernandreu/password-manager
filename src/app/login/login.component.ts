import {Component, Inject, OnInit} from '@angular/core';
import {Utils} from '../model/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PassSession} from '../model/pass-model';
import {DataService, IDataService} from '../services/data-service';
import {CloudServiceProvider} from '../services/cloud-service-provider';

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
    private cloudServiceProvider: CloudServiceProvider,
    private router: Router,
    @Inject(DataService) private dataService: IDataService,
  ) { }

  ngOnInit() {
    const service = this.cloudServiceProvider.getCloudService();
    service.getData(service.getAccessTokenByLocation(location))
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
    // console.log(`The password is: ${this.password}`);

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

    this.dataService.passwordHash = hash;
    this.dataService.session = session;
    this.dataService.accessToken = this.cloudServiceProvider.getCloudService().getAccessTokenByLocation(location);
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
