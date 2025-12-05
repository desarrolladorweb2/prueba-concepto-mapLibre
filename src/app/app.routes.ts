import { Routes } from '@angular/router';
import { MapViewComponent } from './features/map-view/map-view.component';

export const routes: Routes = [
     { 
        path: '', 
        component: MapViewComponent,
        data: { animation: 'VisorPage' },
    }
];
