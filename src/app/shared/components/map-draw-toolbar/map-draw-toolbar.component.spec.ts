import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDrawToolbarComponent } from './map-draw-toolbar.component';

describe('MapDrawToolbarComponent', () => {
  let component: MapDrawToolbarComponent;
  let fixture: ComponentFixture<MapDrawToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDrawToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDrawToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
