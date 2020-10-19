/**
 * This will hold all data to be shared between pages of the navigation. This will mostly be:
 * - The current password
 * - The current access token for the cloud service (only Dropbox so far)
 * - All the currently stored cards
 */

import { Injectable } from '@angular/core';
import { PassSession } from 'src/app/model/pass-model';
import {IDataService} from './data-service';

const CloudServiceKey = 'cloudService';
const PasswordHashKey = 'passwordHash';
const SessionKey = 'passSession';
const AccessTokenKey = 'accessToken';


@Injectable({
  providedIn: 'root'
})
export class SessionDataService implements IDataService {

  private _cloudService: string = null;
  private _passwordHash: string = null;
  private _session: PassSession = null;
  private _accessToken: string = null;

  constructor() { }

  get cloudService() {
    if (this._cloudService === null) {
      this._cloudService = sessionStorage.getItem(CloudServiceKey);
    }
    return this._cloudService;
  }

  get passwordHash() {
    if (this._passwordHash === null) {
      this._passwordHash = sessionStorage.getItem(PasswordHashKey);
    }
    return this._passwordHash;
  }

  get session() {
    if (this._session === null) {
      const key = sessionStorage.getItem(SessionKey);
      if (key !== null) {
        this._session = new PassSession(JSON.parse(key));
      }
    }
    return this._session;
  }

  get accessToken() {
    if (this._accessToken === null) {
      this._accessToken = sessionStorage.getItem(AccessTokenKey);
    }
    return this._accessToken;
  }

  set cloudService(value: string) {
    if (this._cloudService === value) {
      return;
    }
    this._cloudService = value;
    sessionStorage.setItem(CloudServiceKey, value);
  }

  set passwordHash(value: string) {
    if (this._passwordHash === value) {
      return;
    }
    this._passwordHash = value;
    sessionStorage.setItem(PasswordHashKey, value);
  }

  set session(value: PassSession) {
    if (this._session === value) {
      return;
    }
    this._session = value;
    sessionStorage.setItem(SessionKey, JSON.stringify(value));
  }

  set accessToken(value: string) {
    if (this._accessToken === value) {
      return;
    }
    this._accessToken = value;
    sessionStorage.setItem(AccessTokenKey, value);
  }
}
