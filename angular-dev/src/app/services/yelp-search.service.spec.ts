import { TestBed } from './node_modules/@angular/core/testing';

import { YelpSearchService } from './yelp-search.service';

describe('YelpSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YelpSearchService = TestBed.get(YelpSearchService);
    expect(service).toBeTruthy();
  });
});
