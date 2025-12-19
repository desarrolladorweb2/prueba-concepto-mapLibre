declare module '@mapbox/mapbox-gl-draw' {
    import { IControl } from 'maplibre-gl';
  
    export interface MapboxDrawOptions {
      displayControlsDefault?: boolean;
      controls?: {
        point?: boolean;
        line_string?: boolean;
        polygon?: boolean;
        trash?: boolean;
        combine_features?: boolean;
        uncombine_features?: boolean;
      };
      defaultMode?: string;
      styles?: any[];
    }
  
    export default class MapboxDraw implements IControl {
      constructor(options?: MapboxDrawOptions);
  
      onAdd(map: any): HTMLElement;
      onRemove(): void;
  
      /* ======================
       * DATA
       * ====================== */
      getAll(): GeoJSON.FeatureCollection;
      getSelected(): GeoJSON.FeatureCollection;
      getSelectedIds(): string[];
  
      /* ======================
       * MUTATIONS
       * ====================== */
      delete(id: string | string[]): void;
      deleteAll(): void;
  
      /* ======================
       * MODES
       * ====================== */
      changeMode(mode: string, options?: any): void;
    }
  }
  