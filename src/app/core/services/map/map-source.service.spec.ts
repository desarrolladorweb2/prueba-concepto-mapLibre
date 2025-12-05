import { TestBed } from '@angular/core/testing';

import { MapSourceService } from './map-source.service';

describe('MapSourceService', () => {
  let service: MapSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
