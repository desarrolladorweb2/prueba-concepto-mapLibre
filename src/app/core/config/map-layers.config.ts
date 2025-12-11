// core/config/map-layers.config.ts
import {
  CALIDAD_FILL_PAINT,
  CALIDAD_ICON_SIMBOLO,
} from '../styles/calidad-layers';
import { MapLayerConfig } from '../models/map-layer.model';

export const MAP_LAYERS: MapLayerConfig[] = [
  {
    id: 'formulario-calidad-completo',
    serviceType: 'WMS',
    sourceId: 'formulario-calidad-completo',
    sourceLayer: 'formulario-calidad-completo',
    type: 'fill',
    visible: false,
    minzoom: 9,
    maxzoom: 19,
  },
  {
    id: 'prueba-concepto-mapLibre',
    serviceType: 'MVT',
    sourceId: 'prueba-concepto-mapLibre',
    sourceLayer: 'prueba-concepto-mapLibre',
    type: 'fill',
    visible: true,
    paint: CALIDAD_FILL_PAINT,//{...CALIDAD_ICON_SIMBOLO, ...CALIDAD_FILL_PAINT},
    minzoom: 15,
  },
];
