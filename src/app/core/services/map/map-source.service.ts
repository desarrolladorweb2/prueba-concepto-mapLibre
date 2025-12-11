import { Injectable } from '@angular/core';
import { Map, StyleSpecification } from 'maplibre-gl';

export const BASEMAP_SOURCES: StyleSpecification['sources'] = {
  osm: {
    type: 'raster',
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    tileSize: 256,
    attribution: '© OpenStreetMap contributors',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MapSourceService {
  addVectorSource(map: Map, id: string, tilesUrl: string): void {
    if (map.getSource(id)) return;
    console.log('Adding vector source:', id);

    map.addSource(id, {
      type: 'vector',
      tiles: [`http://34.196.171.243:8080/geoserver/gwc/service/tms/1.0.0/wsrealidad:${tilesUrl}@EPSG:900913@pbf/{z}/{x}/{y}.pbf`],
      minzoom: 10,
      maxzoom: 25,
      scheme: 'tms',
    });
  }

  addWmsSource(
    map: Map,
    id: string,
    wmsBaseUrl: string,
    layerName: string
  ): void {
    if (map.getSource(id)) return;
    console.log('Adding WMS source:', id, layerName);

    /** URL válida para MapLibre + GeoServer WMS */
    const wmsUrlTemplate =
      `http://34.196.171.243:8080/geoserver/wsrealidad/wms` +
      `?SERVICE=WMS` +
      `&VERSION=1.1.1` +
      `&REQUEST=GetMap` +
      `&LAYERS=wsrealidad:${layerName}` +
      `&STYLES=` +
      `&FORMAT=image/png` +
      `&TRANSPARENT=true` +
      `&SRS=EPSG:3857` + // ← OBLIGATORIO
      `&WIDTH=256` +
      `&HEIGHT=256` +
      `&BBOX={bbox-epsg-3857}`; // ← OBLIGATORIO

    console.log('WMS URL Template:', wmsUrlTemplate);

    map.addSource(id, {
      type: 'raster',
      tiles: [wmsUrlTemplate],
      tileSize: 256,
    });
  }

  addWmtsSource(
  map: Map,
  id: string,
  wmtsBaseUrl: string,
  layerName: string
): void {
  if (map.getSource(id)) return;

  console.log('Adding WMTS source:', id, layerName);

  /** URL template para WMTS desde GeoServer GWC */
  const wmtsUrlTemplate =
    `${wmtsBaseUrl}` +
    `?SERVICE=WMTS` +
    `&REQUEST=GetTile` +
    `&VERSION=1.0.0` +
    `&LAYER=${layerName}` +
    `&STYLE=` +
    `&TILEMATRIXSET=EPSG:4326` +
    `&TILEMATRIX=EPSG:4326:{z}` +
    `&TILEROW={y}` +
    `&TILECOL={x}` +
    `&FORMAT=image/png`;

  console.log("WMTS URL Template:", wmtsUrlTemplate);

  /** 1. Agregar el source */
  map.addSource(id, {
    type: 'raster',
    tiles: [wmtsUrlTemplate],
    tileSize: 256,
  });

  /** 2. Agregar la capa */
  map.addLayer({
    id: `${id}-layer`,
    type: 'raster',
    source: id,
    paint: {
      "raster-opacity": 1
    }
  });

  console.log("WMTS layer added");
}

}
