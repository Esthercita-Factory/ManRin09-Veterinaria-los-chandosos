import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('../features/auth/ui/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  { 
    path: 'registro', 
    loadComponent: () => import('../features/auth/ui/pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
  },
  { 
    path: 'register', 
    redirectTo: 'registro', 
    pathMatch: 'full' 
  }
];
