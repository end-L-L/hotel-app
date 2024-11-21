import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export default [
    {
        path: '',
        component: DashboardComponent,

        children: [
            {
                path: 'rooms',
                loadComponent: () => import('./pages/rooms-page/rooms-page.component').then(m => m.RoomsPageComponent)
            },
            {
                path: 'roomTypes',
                loadComponent: () => import('./pages/room-types-page/room-types-page.component').then(m => m.RoomTypesPageComponent)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }

] as Routes;