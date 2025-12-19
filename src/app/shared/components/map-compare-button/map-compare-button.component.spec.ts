import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCompareButtonComponent } from './map-compare-button.component';

describe('MapCompareButtonComponent', () => {
  let component: MapCompareButtonComponent;
  let fixture: ComponentFixture<MapCompareButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCompareButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCompareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
