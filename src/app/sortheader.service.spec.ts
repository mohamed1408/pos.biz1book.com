import { TestBed } from '@angular/core/testing';

import { SortheaderService } from './sortheader.service';

describe('SortheaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortheaderService = TestBed.get(SortheaderService);
    expect(service).toBeTruthy();
  });
});
