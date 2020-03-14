import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MaterialModule} from 'src/app/material';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CloudServiceProvider} from 'src/app/services/cloud-service-provider';
import {DataService, IDataService} from 'src/app/services/data-service';
import {PassCard, PassSession} from 'src/app/model/pass-model';
import {CardListComponent} from 'src/app/card-list/card-list.component';
import {LandingComponent} from 'src/app/landing/landing.component';
import {CardDetailComponent} from 'src/app/card-detail/card-detail.component';

class MockDataService implements IDataService {
  accessToken = '';
  cloudService = 'dropbox';
  passwordHash = '1234';
  session: PassSession;

  constructor() {
    console.log('Creating MockDataService');
    this.session = new PassSession();
    this.session.cards.push(new PassCard());
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LandingComponent,
        CardListComponent,
        CardDetailComponent,
      ],
      imports: [
        FontAwesomeModule,
        MaterialModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DragDropModule,
      ],
      providers: [
        CloudServiceProvider,
        { provide: DataService, useClass: MockDataService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
