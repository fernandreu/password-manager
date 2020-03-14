import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';
import {CardDetailComponent} from 'src/app/card-detail/card-detail.component';
import {LoginComponent} from 'src/app/login/login.component';
import {LandingComponent} from 'src/app/landing/landing.component';
import {MaterialModule} from 'src/app/material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DataService, IDataService} from 'src/app/services/data-service';
import {PassCard, PassSession} from 'src/app/model/pass-model';
import {CloudServiceProvider} from 'src/app/services/cloud-service-provider';
import {IconsModule} from '../icons.module';

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
        IconsModule,
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
