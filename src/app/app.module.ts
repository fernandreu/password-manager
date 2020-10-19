import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './landing/landing.component';
import {CardListComponent} from './card-list/card-list.component';
import {CardDetailComponent} from './card-detail/card-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DataService} from './services/data-service';
import {SessionDataService} from './services/session-data.service';
import {CloudServiceProvider} from './services/cloud-service-provider';
import {IconsModule} from './icons.module';
import {MsalModule} from '@azure/msal-angular';
import {OAuthSettings} from './services/onedrive-service';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    IconsModule,
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId
      }
    }, {
      popUp: true,
      consentScopes: ['user.read']
    })
  ],
  providers: [
    CloudServiceProvider,
    { provide: DataService, useClass: SessionDataService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
