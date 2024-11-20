import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export default [
    {
        path: '',
        component: DashboardComponent,

        children: [
            // {
            //     path: 'books',
            //     loadComponent: () => import('./pages/view-books/view-books.component').then(m => m.ViewBooksComponent)
            // },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }

] as Routes;