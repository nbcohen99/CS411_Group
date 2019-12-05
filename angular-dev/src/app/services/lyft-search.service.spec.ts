import { TestBed } from '@angular/core/testing';

import { LyftSearchService } from './lyft-search.service';

describe('LyftSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LyftSearchService = TestBed.get(LyftSearchService);
    expect(service).toBeTruthy();
  });
});
