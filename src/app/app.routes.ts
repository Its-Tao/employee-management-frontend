import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Department } from './pages/department/department';
import { Role } from './pages/role/role';




  


export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'employee',
    loadComponent: () => import('./pages/employee/employee').then((m) => m.Employee),
  },

  {
    path: 'department',
    component: Department,
  },
  {
      path: 'department',
    component: Department,
  },
{
      path: 'department',
    component: Department,
  }
  
];





