import {InjectionToken} from '@angular/core';
import {PassSession} from '../model/pass-model';

export const DataService = new InjectionToken<IDataService>('dataService');

export interface IDataService {

  passwordHash: string;

  session: PassSession;

  accessToken: string;

  cloudService: string;
}
