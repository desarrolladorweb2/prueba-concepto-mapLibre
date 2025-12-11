import { Component } from '@angular/core';
import { Expression, Map } from 'maplibre-gl';
import { MapStateService } from '../../core/services/map/map-state.service';
import { MapSourceService } from '../../core/services/map/map-source.service';
import { MapLayerService } from '../../core/services/map/map-layer.service';
import { MapInteractionService } from '../../core/services/map/map-interaction.service';
import {
  CALIDAD_FILL_PAINT,
  CALIDAD_ICON_SIMBOLO,
} from '../../core/styles/calidad-layers';
import { MAP_LAYERS } from '../../core/config/map-layers.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent {
  constructor(
    private mapState: MapStateService,
    private sourceService: MapSourceService,
    private layerService: MapLayerService,
    private interactionService: MapInteractionService
  ) {}

  ngAfterViewInit(): void {
    const map = this.mapState.initMap('map');

    /** 2. Espera que cargue */
    map.on('load', () => {
      /** 3. Guardamos el objeto map en MapStateService */
      this.mapState.initializeMap(map);

      /** -----------------------------
       * 4. Añadir fuentes (sources)
       * ----------------------------- */

      // Fuente 1: Capa WMS de GeoServer
      const geoServerUrl =
        'https://desa.realidad5.com/geoserver/wsrealidad/wms'; //http://34.196.171.243:8080/geoserver/
      const wmsLayerName = 'wsrealidad:prueba-concepto-mapLibre'; // El nombre de tu capa

      // this.sourceService.addWmsSource(
      //     map,
      //     'prueba-concepto-mapLibre', // ID único de la fuente
      //     geoServerUrl,
      //     wmsLayerName
      // );

      // Fuente 2: Capa MVT de GeoServer
      // this.sourceService.addVectorSource(
      //   map,
      //   'prueba-concepto-mapLibre',
      //   'http://34.196.171.243:8080/geoserver/gwc/service/tms/1.0.0/wsrealidad:prueba-concepto-mapLibre@EPSG:900913@pbf/{z}/{x}/{y}.pbf'
      // );

      //  Fuente 3: Capa WMTS de GeoServer
      // this.sourceService.addWmtsSource(
      //     map,
      //     'prueba-concepto-mapLibre', // ID único de la fuente
      //     geoServerUrl,
      //     wmsLayerName
      // );

      /** -----------------------------
       * 5. Añadir capas (layers)
       * ----------------------------- */
      // Capa A: WMS (Tipo 'raster')
      // this.layerService.addRasterLayer(
      //     map,
      //     'prueba-concepto-mapLibre', // ID de la capa
      //     'prueba-concepto-mapLibre',  // Debe coincidir con el ID de la fuente WMS
      //     0.8                 // Opacidad
      // );

      // Capa B: Calidad MVT (Tipo 'fill' y 'symbol')
      // this.layerService.addFillLayerWithPaint(
      //   map,
      //   'prueba-concepto-mapLibre',
      //   'prueba-concepto-mapLibre',
      //   'prueba-concepto-mapLibre',
      //   CALIDAD_FILL_PAINT
      // );
      // this.layerService.addSymbolLayer(
      //   map,
      //   'prueba-concepto-mapLibre',
      //   'prueba-concepto-mapLibre',
      //   CALIDAD_ICON_SIMBOLO
      // );

      /** -----------------------------
       * 6. Registrar interacciones
       * ----------------------------- */
      this.interactionService.registerClick(
        map,
        'prueba-concepto-mapLibre',
        (feature) => {
          console.log('Predio seleccionado', feature);
        }
      );

      this.interactionService.registerZoom(
        map,
        () => {
          console.log('Zoom level is now:', map.getZoom());
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.mapState.destroy();
  }

  layers = MAP_LAYERS;

  // toggle(layer: any) {
  //   layer.visible = !layer.visible;
  //   const map = this.mapState.getMap() as Map;

  //   this.layerService.toggleLayer(map, layer.id, layer.visible);
  // }

  toggle(layer: any) {
    const map = this.mapState.getMap() as Map;

    if (!map.getSource(layer.sourceId)) {
      if (layer.serviceType === 'WMS') {
        this.sourceService.addWmsSource(
          map,
               layer.sourceId, // ID único de la fuente
           layer.sourceLayer,
            layer.sourceLayer
        );
        this.layerService.addRasterLayer(
          map,
          layer.sourceId,
          layer.sourceLayer,
          0.8 // Opacidad
        );

      }
      if (layer.serviceType === 'MVT') {
        this.sourceService.addVectorSource(
          map,
          layer.sourceId,
          layer.sourceLayer
        );

        this.layerService.addFillLayerWithPaint(
          map,
          'prueba-concepto-mapLibre',
          'prueba-concepto-mapLibre',
          'prueba-concepto-mapLibre',
          CALIDAD_FILL_PAINT
        );
        this.layerService.addSymbolLayer(
          map,
          'prueba-concepto-mapLibre',
          'prueba-concepto-mapLibre',
          CALIDAD_ICON_SIMBOLO
        );
      }
    }

    // if (!map.getLayer(layer.id)) {
    //   this.layerService.addLayerFromConfig(map, layer);
    // }

    layer.visible = !layer.visible;
    this.layerService.toggleLayer(map, layer.id, layer.visible);
  }
}
