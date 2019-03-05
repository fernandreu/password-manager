import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';
import {CardDetailComponent} from '../card-detail/card-detail.component';
import {LoginComponent} from '../login/login.component';
import {LandingComponent} from '../landing/landing.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MaterialModule} from '../material';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DataService, IDataService} from '../services/data-service';
import {PassCard, PassSession} from '../model/pass-model';
import {CloudServiceProvider} from '../services/cloud-service-provider';

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

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardListComponent,
        CardDetailComponent,
        LandingComponent,
        LoginComponent,
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
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
