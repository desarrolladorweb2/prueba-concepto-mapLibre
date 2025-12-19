import { Injectable } from '@angular/core';
import { Map } from 'maplibre-gl';
import Compare from 'mapbox-gl-compare';

export type CompareOrientation = 'vertical' | 'horizontal';

@Injectable({ providedIn: 'root' })
export class MapCompareService {
  private compare?: Compare;

  init(
    mapA: Map,
    mapB: Map,
    container: string | HTMLElement = '#compare-container',
    orientation: CompareOrientation = 'vertical'
  ): void {
    this.compare?.remove();

    this.compare = new Compare(mapA, mapB, container, {
      mousemove: false, // solo drag manual
      orientation,
    });

    // 🔧 Forzar layout + centrar divisor
    setTimeout(() => {
      mapA.resize();
      mapB.resize();

      const swiper = document.querySelector(
        '.mapboxgl-compare .compare-swiper'
      ) as HTMLElement;

      const containerEl =
        typeof container === 'string'
          ? (document.querySelector(container) as HTMLElement)
          : container;

      if (!swiper || !containerEl) return;

      if (orientation === 'vertical') {
        const width = containerEl.offsetWidth;
        swiper.style.left = `${width / 2}px`;
        swiper.style.top = '';
      } else {
        const height = containerEl.offsetHeight;
        swiper.style.top = `${height / 2}px`;
        swiper.style.left = '';
      }
    }, 80);
  }

  remove(): void {
    this.compare?.remove();
    this.compare = undefined;
  }
}
