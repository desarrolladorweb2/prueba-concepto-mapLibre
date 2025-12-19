declare module 'mapbox-gl-compare' {
    export default class Compare {
      constructor(
        mapA: any,
        mapB: any,
        container: string | HTMLElement,
        options?: {
          orientation?: 'vertical' | 'horizontal';
          mousemove?: boolean;
        }
      );
  
      remove(): void;
    }
  }