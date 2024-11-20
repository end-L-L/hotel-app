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
                path: '**',
                redirectTo: ''
            }
        ]
    }

] as Routes;