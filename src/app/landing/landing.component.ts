// Component for the landing page, hence the name
import {Component, OnInit} from '@angular/core';
import {DropboxService} from '../services/dropbox-service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private dropboxService: DropboxService
  ) { }

  ngOnInit() {
  }

  dropboxAuthUrl(): string {
    return this.dropboxService.getAuthenticationUrl();
  }
}
