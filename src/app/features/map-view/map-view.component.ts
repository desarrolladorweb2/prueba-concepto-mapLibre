import { Component } from '@angular/core';
import { Expression, Map } from 'maplibre-gl';
import { MapStateService } from '../../core/services/map/map-state.service';
import { MapSourceService } from '../../core/services/map/map-source.service';
import { MapLayerService } from '../../core/services/map/map-layer.service';
import { MapInteractionService } from '../../core/services/map/map-interaction.service';
import { MapDrawService } from '../../core/services/map/map-draw.service';
import { MapDrawToolbarComponent } from '../../shared/components/map-draw-toolbar/map-draw-toolbar.component';


import {
  CALIDAD_FILL_PAINT,
  CALIDAD_ICON_SIMBOLO,
} from '../../core/styles/calidad-layers';
import { MAP_LAYERS } from '../../core/config/map-layers.config';
import { CommonModule } from '@angular/common';
import { MapCompareButtonComponent } from '../../shared/components/map-compare-button/map-compare-button.component';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule, MapDrawToolbarComponent, MapCompareButtonComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent {
  constructor(
    public  mapState: MapStateService,
    private sourceService: MapSourceService,
    private layerService: MapLayerService,
    private interactionService: MapInteractionService,
    private drawService: MapDrawService
  ) {}

  // ngAfterViewInit(): void {
  //   const map = this.mapState.initMap('map');

  //   /** 2. Espera que cargue */
  //   map.on('load', () => {
  //     /** 3. Guardamos el objeto map en MapStateService */
  //     this.mapState.initializeMap(map);
  //     this.drawService.initialize(map);

  //     /** -----------------------------
  //      * 4. Añadir fuentes (sources)
  //      * ----------------------------- */

  //     // Fuente 1: Capa WMS de GeoServer
  //     const geoServerUrl =
  //       'https://desa.realidad5.com/geoserver/wsrealidad/wms'; //http://34.196.171.243:8080/geoserver/
  //     const wmsLayerName = 'wsrealidad:prueba-concepto-mapLibre'; // El nombre de tu capa

  //     // this.sourceService.addWmsSource(
  //     //     map,
  //     //     'prueba-concepto-mapLibre', // ID único de la fuente
  //     //     geoServerUrl,
  //     //     wmsLayerName
  //     // );

  //     // Fuente 2: Capa MVT de GeoServer
  //     // this.sourceService.addVectorSource(
  //     //   map,
  //     //   'prueba-concepto-mapLibre',
  //     //   'http://34.196.171.243:8080/geoserver/gwc/service/tms/1.0.0/wsrealidad:prueba-concepto-mapLibre@EPSG:900913@pbf/{z}/{x}/{y}.pbf'
  //     // );

  //     //  Fuente 3: Capa WMTS de GeoServer
  //     // this.sourceService.addWmtsSource(
  //     //     map,
  //     //     'prueba-concepto-mapLibre', // ID único de la fuente
  //     //     geoServerUrl,
  //     //     wmsLayerName
  //     // );

  //     /** -----------------------------
  //      * 5. Añadir capas (layers)
  //      * ----------------------------- */
  //     // Capa A: WMS (Tipo 'raster')
  //     // this.layerService.addRasterLayer(
  //     //     map,
  //     //     'prueba-concepto-mapLibre', // ID de la capa
  //     //     'prueba-concepto-mapLibre',  // Debe coincidir con el ID de la fuente WMS
  //     //     0.8                 // Opacidad
  //     // );

  //     // Capa B: Calidad MVT (Tipo 'fill' y 'symbol')
  //     // this.layerService.addFillLayerWithPaint(
  //     //   map,
  //     //   'prueba-concepto-mapLibre',
  //     //   'prueba-concepto-mapLibre',
  //     //   'prueba-concepto-mapLibre',
  //     //   CALIDAD_FILL_PAINT
  //     // );
  //     // this.layerService.addSymbolLayer(
  //     //   map,
  //     //   'prueba-concepto-mapLibre',
  //     //   'prueba-concepto-mapLibre',
  //     //   CALIDAD_ICON_SIMBOLO
  //     // );

  //     /** -----------------------------
  //      * 6. Registrar interacciones
  //      * ----------------------------- */
  //     this.interactionService.registerClick(
  //       map,
  //       'prueba-concepto-mapLibre',
  //       (feature) => {
  //         console.log('Predio seleccionado', feature);
  //       }
  //     );

  //     this.interactionService.registerZoom(map, () => {
  //       console.log('Zoom level is now:', map.getZoom());
  //     });

  //     this.drawService.onCreate(map, (e) => {
  //       console.log('Geometría creada:', e.features);
  //     });
        
  //     this.drawService.onUpdate(map, (e) => {
  //       console.log('Geometría actualizada:', e.features);
  //     });
      
  //     this.drawService.onDelete(map, (e) => {
  //       console.log('Geometría eliminada');
  //     });      

  //   });
  // }

  ngAfterViewInit(): void {
    this.mapState.initCompareMaps('map-left', 'map-right');
  
    const maps = this.mapState.getCompareMaps();
    if (!maps) return;
  
    maps.left.on('load', () => {
      this.mapState.initializeMap(maps.left);
      this.drawService.initialize(maps.left);
    });
  
    maps.right.on('load', () => {
      this.mapState.initializeMap2(maps.right);
      // mapa B: capas distintas si quieres
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
    const map2 = this.mapState.getMap2() as Map;

    if (!map.getSource(layer.sourceId)) {
      if (layer.serviceType === 'WMS') {
        this.sourceService.addWmsSource(
          map,
          'capaWMS1_POC',//layer.id, 
          'capaWMS1_POC',//layer.sourceLayer,
          'capaWMS1_POC',//layer.sourceLayer
        );
        this.layerService.addRasterLayer(
          map,
          'capaWMS1_POC',//layer.sourceId,
          'capaWMS1_POC',//layer.sourceLayer,
          0.8 
        );

        this.sourceService.addWmsSource(
          map2,
          'capaWMS2_POC',//layer.id, 
          'capaWMS2_POC',//layer.sourceLayer,
          'capaWMS2_POC',//layer.sourceLayer
        );
        this.layerService.addRasterLayer(
          map2,
          'capaWMS2_POC',//layer.sourceId,
          'capaWMS2_POC',//layer.sourceLayer,
          0.8 
        );        

        layer.visible = !layer.visible;
        this.layerService.toggleLayer(map, 'capaWMS1_POC', layer.visible);
        this.layerService.toggleLayer(map2, 'capaWMS2_POC', layer.visible);

      }

      if (layer.serviceType === 'WMTS') {
        this.sourceService.addWmtsSource(
          map,
          layer.id, // ID único de la fuente
          layer.sourceLayer,
          layer.sourceLayer
        );

        // this.sourceService.addWmtsSource(
        //   map2,
        //   layer.id, // ID único de la fuente
        //   layer.sourceLayer,
        //   layer.sourceLayer
        // );        

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

        // this.sourceService.addVectorSource(
        //   map2,
        //   layer.sourceId,
        //   layer.sourceLayer
        // );
        // this.layerService.addFillLayerWithPaint(
        //   map2,
        //   'prueba-concepto-mapLibre',
        //   'prueba-concepto-mapLibre',
        //   'prueba-concepto-mapLibre',
        //   CALIDAD_FILL_PAINT
        // );
        // this.layerService.addSymbolLayer(
        //   map2,
        //   'prueba-concepto-mapLibre',
        //   'prueba-concepto-mapLibre',
        //   CALIDAD_ICON_SIMBOLO
        // );

      }
    }

    // if (!map.getLayer(layer.id)) {
    //   this.layerService.addLayerFromConfig(map, layer);
    // }

    if (layer.serviceType !== 'WMS'){
      layer.visible = !layer.visible;
      this.layerService.toggleLayer(map, layer.id, layer.visible);
      this.layerService.toggleLayer(map2, layer.id, layer.visible);
    }
  }
}
