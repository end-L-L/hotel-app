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
                path: 'booking-form',
                loadComponent: () => import('./pages/booking-form-page/booking-form-page.component').then(m => m.BookingFormPageComponent)
            },
            {
                path: 'bookings',
                loadComponent: () => import('./pages/bookings-page/bookings-page.component').then(m => m.BookingsPageComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }

] as Routes;