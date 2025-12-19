import { Injectable } from '@angular/core';
import maplibregl, { Map, LngLatLike } from 'maplibre-gl';
import { BehaviorSubject } from 'rxjs';
import { BASEMAP_SOURCES } from './map-source.service';
import { BASEMAP_LAYERS } from './map-layer.service';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {

  private mapLeft?: Map;
  private mapRight?: Map;

  private compareActive = false;

  private map?: Map;
  private map2?: Map;
  private zoom$ = new BehaviorSubject<number>(12);
  private center$ = new BehaviorSubject<LngLatLike>([-74.08, 4.6]);

  initializeMap(map: Map): void {
    this.map = map;
  }

  initializeMap2(map: Map): void {
    this.map2 = map;
  }  

  initCompareMaps(leftId: string, rightId: string): void {
    this.mapLeft = this.initMap(leftId);
    this.mapRight = this.initMap2(rightId);
  }

  getCompareMaps():
    | { left: Map; right: Map }
    | null {
    if (this.mapLeft && this.mapRight) {
      return { left: this.mapLeft, right: this.mapRight };
    }
    return null;
  }

  initMap(containerId: string): Map {
    this.map = new maplibregl.Map({
      container: containerId,
      center: [-74.20, 11.23],
      zoom: 14,
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

  initMap2(containerId: string): Map {
    this.map2 = new maplibregl.Map({
      container: containerId,
      center: [-74.20, 11.23],
      zoom: 14,
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

    return this.map2;
  }  

  getMap(): Map | undefined {
    return this.map;
  }

  getMap2(): Map | undefined {
    return this.map2;
  }  

  setZoom(z: number): void {
    this.zoom$.next(z);
  }

  zoomChanges$() {
    return this.zoom$.asObservable();
  }

  destroy(): void {
    this.map?.remove();
    this.map2?.remove();
    this.map = undefined;
    this.map2 = undefined;
  }

  setCompareActive(active: boolean): void {
    this.compareActive = active;
  }  

  isCompareActive(): boolean {
    return this.compareActive;
  }  

}
