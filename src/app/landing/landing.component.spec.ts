import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import {MaterialModule} from '../material';
import {CloudServiceProvider} from '../services/cloud-service-provider';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingComponent
      ],
      imports: [
        MaterialModule,
        FontAwesomeModule,
      ],
      providers: [
        CloudServiceProvider,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
