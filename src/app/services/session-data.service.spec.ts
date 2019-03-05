import { TestBed } from '@angular/core/testing';

import { SessionDataService } from './session-data.service';

describe('SessionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create', () => {
    const service: SessionDataService = TestBed.get(SessionDataService);
    expect(service).toBeTruthy();
  });
});
