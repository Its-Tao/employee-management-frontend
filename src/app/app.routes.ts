import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Department } from './pages/department/department';
import { Role } from './pages/role/role';
import { User } from './pages/users/user/user';




  


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
    path: 'role',
    component: Role,
  },

  {
    path: 'users',
    component: User
  }
  
];





