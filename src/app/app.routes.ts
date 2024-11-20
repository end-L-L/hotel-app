import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: 'hotel',
        loadChildren: () => import('./hotel/hotel.routes')
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];