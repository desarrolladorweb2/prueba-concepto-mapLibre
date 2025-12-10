// core/config/map-layers.config.ts
import {
  CALIDAD_FILL_PAINT,
  CALIDAD_ICON_SIMBOLO,
} from '../styles/calidad-layers';
import { MapLayerConfig } from '../models/map-layer.model';

export const MAP_LAYERS: MapLayerConfig[] = [
  {
    id: 'calidad-fill-wms',
    sourceId: 'formulario-calidad-completo',
    sourceLayer: 'formulario-calidad-completo',
    type: 'fill',
    visible: true,
    paint: CALIDAD_FILL_PAINT,
    minzoom: 9,
    maxzoom: 19,
  },
//   {
//     id: 'calidad-symbol-mvt-dos',
//     sourceId: 'prueba-concepto-mapLibre',
//     sourceLayer: 'prueba-concepto-mapLibre',
//     type: 'symbol',
//     visible: true,
//     layout: CALIDAD_ICON_SIMBOLO.layout,
//     paint: CALIDAD_ICON_SIMBOLO.paint,
//     minzoom: 15,
//   },
];
