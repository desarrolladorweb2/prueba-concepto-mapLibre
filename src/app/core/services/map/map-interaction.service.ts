import { Injectable } from '@angular/core';
import { Map } from 'maplibre-gl';

@Injectable({
  providedIn: 'root',
})
export class MapInteractionService {
  registerClick(
    map: Map,
    layerId: string,
    callback: (feature: any) => void
  ): void {
    map.on('click', layerId, (e) => {
      const f = e.features?.[0];
      if (f) callback(f);
    });
  }
}
