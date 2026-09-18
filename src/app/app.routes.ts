import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';

export const routes: Routes = [
    {
        path:'dashboard',
        component:Dashboard
    },
      {
    path: 'employee',
    loadComponent: () =>
      import('./pages/employee/employee').then(
        m => m.Employee
      )
  },
];
