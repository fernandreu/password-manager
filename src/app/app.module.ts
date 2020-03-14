import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './landing/landing.component';
import {CardListComponent} from './card-list/card-list.component';
import {CardDetailComponent} from './card-detail/card-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DataService} from './services/data-service';
import {SessionDataService} from './services/session-data.service';
import {CloudServiceProvider} from './services/cloud-service-provider';

const fabIconList = Object
  .keys(fab)
  .filter(x => x !== 'fab' && x.startsWith('fa'))
  .map(x => fab[x]);

const fasIconList = Object
  .keys(fas)
  .filter(x => x !== 'fas' && x.startsWith('fa'))
  .map(x => fas[x]);

const farIconList = Object
  .keys(far)
  .filter(x => x !== 'far' && x.startsWith('fa'))
  .map(x => far[x]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    CardListComponent,
    CardDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
  ],
  providers: [
    CloudServiceProvider,
    { provide: DataService, useClass: SessionDataService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...fabIconList);
    library.addIcons(...fasIconList);
    library.addIcons(...farIconList);
  }
}
