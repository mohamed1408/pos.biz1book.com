import { TestBed } from '@angular/core/testing';

import { LocsService } from './locs.service';

describe('LocsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocsService = TestBed.get(LocsService);
    expect(service).toBeTruthy();
  });
});
