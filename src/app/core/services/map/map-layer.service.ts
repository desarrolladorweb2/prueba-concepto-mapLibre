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
      minzoom: 15,
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
      minzoom: 9,
      maxzoom: 19,
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

  addLayerFromConfig(map: Map, config: any) {
    if (map.getLayer(config.id)) return;

    map.addLayer({
      id: config.id,
      type: config.type,
      source: config.sourceId,
      'source-layer': config.sourceLayer,
      paint: config.paint,
      layout: config.layout,
      minzoom: config.minzoom,
      maxzoom: config.maxzoom,
    });

    map.setLayoutProperty(
      config.id,
      'visibility',
      config.visible ? 'visible' : 'none'
    );
  }

  toggleLayer(map: Map, layerId: string, visible: boolean) {
    if (!map.getLayer(layerId)) return;

    map.setLayoutProperty(
      layerId,
      'visibility',
      visible ? 'visible' : 'none'
    );
  }
}
