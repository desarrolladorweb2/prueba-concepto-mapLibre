import { Inject, Injectable, NgZone } from '@angular/core';
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
  private readonly ZOOM_THRESHOLD = 17;
  private moveTimeout: any;

  constructor(@Inject(NgZone) private readonly ngZone: NgZone) {}

  addVectorSource(map: Map, id: string, tilesUrl: string): void {
    if (map.getSource(id)) return;
    this.ngZone.runOutsideAngular(() => {
      console.log('inica peticion geoserver');

      // 1. FUENTE PARA CLUSTERS (GeoJSON)
      // Nota: Usamos format_options=filename:data.json para que sea rápido
      // map.addSource('puntos-cluster', {
      //   type: 'geojson',
      //   data: `http://34.196.171.243:8080/geoserver/wsrealidad/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=wsrealidad:prueba-concepto-mapLibre-wfs&outputFormat=application/json`,
      //   cluster: true,
      //   clusterMaxZoom: this.ZOOM_THRESHOLD - 1,
      //   clusterRadius: 50
      // });
      map.addSource('puntos-cluster', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
        cluster: true,
        clusterRadius: 50,
        clusterMaxZoom: this.ZOOM_THRESHOLD - 1,
      });

      // 2. FUENTE PARA MVT (Detalle)
      map.addSource('puntos-mvt', {
        type: 'vector',
        scheme: 'tms',
        tiles: [
          `http://34.196.171.243:8080/geoserver/gwc/service/tms/1.0.0/wsrealidad:${tilesUrl}@EPSG:900913@pbf/{z}/{x}/{y}.pbf`,
        ],
        minzoom: this.ZOOM_THRESHOLD,
      });
    });

    this.addLayers(map, tilesUrl);

    map.on('moveend', () => {
      clearTimeout(this.moveTimeout);
      this.moveTimeout = setTimeout(() => {
        this.updateClusterWfs(map);
      }, 250); // 200–300 ms ideal
    });

    // carga inicial
    this.updateClusterWfs(map);
    console.log('Adding vector source:', id);

    // map.addSource(id, {
    //   type: 'vector',
    //   tiles: [
    //     `http://34.196.171.243:8080/geoserver/gwc/service/tms/1.0.0/wsrealidad:${tilesUrl}@EPSG:900913@pbf/{z}/{x}/{y}.pbf`,
    //   ],
    //   minzoom: 10,
    //   maxzoom: 25,
    //   scheme: 'tms',
    // });
  }

  private addLayers(map: Map, layerName: string) {
    map.addLayer({
      id: 'clusters-layer',
      type: 'circle',
      source: 'puntos-cluster',
      filter: ['has', 'point_count'], // Muestra solo si es un grupo
      maxzoom: this.ZOOM_THRESHOLD,
      paint: {
        'circle-color': '#51bbd6',
        'circle-radius': 20,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    });

    // 2. EL TEXTO DEL CLUSTER (El número)
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'puntos-cluster',
      filter: ['has', 'point_count'], // Muestra solo si es un grupo
      maxzoom: this.ZOOM_THRESHOLD,
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 12,
      },
    });

    // 3. PUNTOS INDIVIDUALES (Cuando no hay suficiente densidad para agrupar)
    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'puntos-cluster',
      filter: ['!', ['has', 'point_count']], // Muestra si NO es un grupo
      maxzoom: this.ZOOM_THRESHOLD,
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 6,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      },
    });

    map.addLayer({
      id: 'predios-poligonos',
      type: 'fill',
      source: 'puntos-mvt',
      'source-layer': layerName,
      minzoom: 18,
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.4,
        'fill-outline-color': '#fff',
      },
    });
  }

  private updateClusterWfs(map: Map): void {
    if (map.getZoom() >= this.ZOOM_THRESHOLD) return;
    const bounds = map.getBounds();

    // Obtenemos el BBOX en formato [minLon, minLat, maxLon, maxLat] que es EPSG:4326
    const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

    const url =
      `http://34.196.171.243:8080/geoserver/wsrealidad/ows` +
      `?service=WFS` +
      `&version=1.1.0` + // Versión 1.1.0 es muy estable para GeoJSON
      `&request=GetFeature` +
      `&typeName=wsrealidad:prueba-concepto-mapLibre-wfs` +
      `&outputFormat=application/json` +
      `&propertyName=geometria` +
      `&srsName=EPSG:4326` + // <--- ESTO ES LA CLAVE: Forzar grados decimales
      `&bbox=${bbox},EPSG:4326&maxFeatures=3000`;

    const source = map.getSource('puntos-cluster') as any;
    if (source) {
      source.setData(url);
    }
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
      `&SRS=EPSG:3857` +
      `&WIDTH=256` +
      `&HEIGHT=256` +
      `&BBOX={bbox-epsg-3857}`;

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

    console.log('Adding XYZ source:', id, layerName);

    map.addSource(id, {
      type: 'raster',
      tiles: [
        `http://34.196.171.243:8080/geoserver/gwc/service/tms/1.0.0/wsrealidad:${layerName}@EPSG:900913@png8/{z}/{x}/{y}.png8`,
      ],
      minzoom: 10,
      maxzoom: 25,
      scheme: 'tms',
    });

    map.addLayer({
      id: `${id}-layer`,
      type: 'raster',
      source: id,
      paint: {
        'raster-opacity': 1,
      },
    });

    console.log('XYZ layer added');
  }
}
