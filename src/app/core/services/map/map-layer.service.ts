import { Injectable } from '@angular/core';
import { Map, Expression, StyleSpecification } from 'maplibre-gl';

export const BASEMAP_LAYERS: StyleSpecification['layers'] = [
  {
    id: 'osm-base',
    type: 'raster',
    source: 'osm',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MapLayerService {
  addFillLayer(
    map: Map,
    id: string,
    source: string,
    layer: string,
    color?: string
  ): void {
    if (map.getLayer(id)) return;
    map.addLayer({
      id,
      type: 'fill',
      source,
      'source-layer': layer,
      paint: {
        'fill-color': color ?? '#003cffff',
        'fill-opacity': 1,
      },
    });
  }

  addSymbolLayer(map: Map, source: string, layer: string, styles: any) {
    if (map.getLayer(styles.id)) return;

    map.addLayer({
      ...styles,
      source: source,
      'source-layer': layer,
    });
  }

  addFillLayerWithPaint(
    map: Map,
    id: string,
    source: string,
    sourceLayer: string,
    paint: any
  ) {
    if (map.getLayer(id)) return;

    map.addLayer({
      id,
      type: 'fill',
      source,
      'source-layer': sourceLayer,
      paint,
    });
  }

  addRasterLayer(
    map: Map,
    id: string,
    source: string,
    opacity: number = 1
  ): void {
    if (map.getLayer(id)) return;

    map.addLayer({
      id,
      type: 'raster', // El tipo para WMS
      source, // El ID de la fuente WMS (Ej: 'capa-wms-predios')
    });
  }
}
