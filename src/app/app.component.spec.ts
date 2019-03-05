import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {CardListComponent} from './card-list/card-list.component';
import {CardDetailComponent} from './card-detail/card-detail.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DataService} from './services/data-service';
import {SessionDataService} from './services/session-data.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        { provide: DataService, useClass: SessionDataService },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Password Manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Password Manager');
  });

  it('should have a Dropbox sign in button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Password Manager');
  });
});
