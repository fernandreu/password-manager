import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailComponent } from './card-detail.component';
import {MaterialModule} from 'src/app/material.module';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {LandingComponent} from 'src/app/landing/landing.component';
import {LoginComponent} from 'src/app/login/login.component';
import {CardListComponent} from 'src/app/card-list/card-list.component';
import {DataService, IDataService} from 'src/app/services/data-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PassCard, PassSession} from 'src/app/model/pass-model';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
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

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardDetailComponent,
        LoginComponent,
        LandingComponent,
        CardListComponent,
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
        { provide: DataService, useClass: MockDataService },
        { provide: ActivatedRoute, useValue: {params: of({ id: '0'}) } },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
