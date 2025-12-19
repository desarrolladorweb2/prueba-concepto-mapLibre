import { Injectable } from '@angular/core';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Map } from 'maplibre-gl';


@Injectable({
providedIn: 'root'
})
export class MapDrawService {


private draw!: MapboxDraw;


initialize(map: Map): void {
if (this.draw) return;


this.draw = new MapboxDraw({
displayControlsDefault: false,
styles: this.getDrawStyles(),
controls: {
polygon: true,
line_string: true,
point: true,
trash: true
},
defaultMode: 'draw_polygon'
});


map.addControl(this.draw, 'top-left');
}

private getDrawStyles(): any[] {
  return [
    /* =====================
     * POINTS
     * ===================== */
    {
      id: 'gl-draw-point',
      type: 'circle',
      filter: ['all', ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
      paint: {
        'circle-radius': 3,
        'circle-color': '#1978c8',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ffffff'
      }
    },

    /* =====================
     * LINES
     * ===================== */
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#D20C0C',
        'line-width': 1,
        'line-dasharray': ['literal', [0.1, 1]]
      }
    },

    /* =====================
     * POLYGON FILL
     * ===================== */
    {
      id: 'gl-draw-polygon-fill',
      type: 'fill',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      paint: {
        'fill-color': '#D20C0C',
        'fill-opacity': 0.1
      }
    },

    /* =====================
     * POLYGON STROKE
     * ===================== */
    {
      id: 'gl-draw-polygon-stroke',
      type: 'line',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#D20C0C',
        'line-width': 1
      }
    }
  ];
}

getAll() {
return this.draw?.getAll();
}

deleteAll(): void {
this.draw?.deleteAll();
}

changeMode(mode: 'draw_polygon' | 'draw_line_string' | 'draw_point' | 'simple_select'): void {
this.draw?.changeMode(mode);
}

onCreate(map: Map, callback: (e: any) => void): void {
map.on('draw.create', callback);
}

onUpdate(map: Map, callback: (e: any) => void): void {
map.on('draw.update', callback);
}

onDelete(map: Map, callback: (e: any) => void): void {
map.on('draw.delete', callback);
}

getSelected() {
  return this.draw?.getSelected();
}

getSelectedIds(): string[] {
  return this.draw?.getSelectedIds() || [];
}

deleteSelected(): void {
  const ids = this.getSelectedIds();

  if (!ids.length) {
    console.warn('No hay elementos seleccionados para eliminar');
    return;
  }

  this.draw.delete(ids);
}

}