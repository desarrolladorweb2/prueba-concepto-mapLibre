export interface MapLayerConfig {
  id: string;
  sourceId: string;
  sourceLayer: string;
  type: 'fill' | 'symbol' | 'raster';
  visible: boolean;
  paint?: any;
  layout?: any;
  minzoom?: number;
  maxzoom?: number;
}
