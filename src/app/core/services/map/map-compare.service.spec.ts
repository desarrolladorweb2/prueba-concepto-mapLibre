import { TestBed } from '@angular/core/testing';

import { MapCompareService } from './map-compare.service';

describe('MapCompareService', () => {
  let service: MapCompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
