import { Injectable } from '@angular/core';
import maplibregl, { Map, LngLatLike } from 'maplibre-gl';
import { BehaviorSubject } from 'rxjs';
import { BASEMAP_SOURCES } from './map-source.service';
import { BASEMAP_LAYERS } from './map-layer.service';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  private map?: Map;
  private zoom$ = new BehaviorSubject<number>(12);
  private center$ = new BehaviorSubject<LngLatLike>([-74.08, 4.6]);

  initializeMap(map: Map): void {
    this.map = map;
  }

  initMap(containerId: string): Map {
    this.map = new maplibregl.Map({
      container: containerId,
      center: [-74.08, 4.60],
      zoom: 11,
      style: {
        version: 8,
        sources: {
          ...BASEMAP_SOURCES
          // aquí después agregas WMTS, WMS, MVT, etc.
        },
        layers: [
          ...BASEMAP_LAYERS
          // capas de MVT, GeoJSON dinámico, interacciones, etc.
        ]
      }
    });

    return this.map;
  }

  getMap(): Map | undefined {
    return this.map;
  }

  setZoom(z: number): void {
    this.zoom$.next(z);
  }

  zoomChanges$() {
    return this.zoom$.asObservable();
  }

  destroy(): void {
    this.map?.remove();
    this.map = undefined;
  }
}
