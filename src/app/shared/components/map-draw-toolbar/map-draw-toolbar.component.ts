import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDrawService } from '../../../core/services/map/map-draw.service';

@Component({
  selector: 'app-map-draw-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="draw-toolbar">
      <button (click)="setMode('draw_polygon')">Polígono</button>
      <button (click)="setMode('draw_line_string')">Línea</button>
      <button (click)="setMode('draw_point')">Punto</button>
      <!-- <button (click)="setMode('simple_select')">Seleccionar</button> -->
      <button (click)="deleteSelected()">Eliminar seleccionado</button>
      <button (click)="clear()">Limpiar</button>
    </div>
  `,
  styleUrls: ['./map-draw-toolbar.component.scss']
})
export class MapDrawToolbarComponent {
  constructor(private drawService: MapDrawService) {}

  setMode(mode: any) {
    this.drawService.changeMode(mode);
  }

  clear() {
    this.drawService.deleteAll();
  }

  deleteSelected() {
    this.drawService.deleteSelected();
  }  

}
