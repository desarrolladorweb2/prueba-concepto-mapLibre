import { Component } from '@angular/core';
import { MapCompareService, CompareOrientation } from '../../../core/services/map/map-compare.service';
import { MapStateService } from '../../../core/services/map/map-state.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-map-compare-button',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <div class="compare-panel">
      <button class="compare-btn" (click)="toggleCompare()">
        {{ active ? 'Desactivar comparación' : 'Comparar mapas' }}
      </button>

      <div *ngIf="active" class="orientation-selector">
        <label>
          <input
            type="radio"
            name="orientation"
            value="vertical"
            [checked]="orientation === 'vertical'"
            (change)="changeOrientation('vertical')"
          />
          Vertical
        </label>

        <label>
          <input
            type="radio"
            name="orientation"
            value="horizontal"
            [checked]="orientation === 'horizontal'"
            (change)="changeOrientation('horizontal')"
          />
          Horizontal
        </label>
      </div>
    </div>
  `,
  styleUrls: ['./map-compare-button.component.scss'],
})
export class MapCompareButtonComponent {
  active = false;
  orientation: CompareOrientation = 'vertical';

  constructor(
    private compareService: MapCompareService,
    private mapState: MapStateService
  ) {}

  toggleCompare(): void {
    const maps = this.mapState.getCompareMaps();
    if (!maps) return;

    if (this.active) {
      this.compareService.remove();
      this.mapState.setCompareActive(false);
    } else {
      this.mapState.setCompareActive(true);

      this.compareService.init(
        maps.left,
        maps.right,
        '#compare-container',
        this.orientation
      );
    }

    this.active = !this.active;
  }

  changeOrientation(orientation: CompareOrientation): void {
    if (this.orientation === orientation) return;

    this.orientation = orientation;

    if (!this.active) return;

    const maps = this.mapState.getCompareMaps();
    if (!maps) return;

    // 🔁 Reiniciar comparación con nueva orientación
    this.compareService.init(
      maps.left,
      maps.right,
      '#compare-container',
      this.orientation
    );
  }
}
