// Component for the landing page, hence the name
import {Component, Inject, OnInit} from '@angular/core';
import {DataService, IDataService} from '../services/data-service';
import {CloudServiceProvider} from '../services/cloud-service-provider';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    @Inject(DataService) private dataService: IDataService,
    private cloudServiceProvider: CloudServiceProvider
  ) { }

  ngOnInit() {
  }

  async logIn(provider: string) {
    this.dataService.accessToken = null;
    this.dataService.cloudService = provider;
    const service = this.cloudServiceProvider.cloudService;
    try {
      await service.logIn();
    } catch (err) {
      console.error('Error logging in:', err);
    }
  }
}
