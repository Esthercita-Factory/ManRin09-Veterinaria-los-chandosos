import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('../features/home/ui/pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../features/dashboard/ui/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    canActivate: [authGuard],
    data: { roles: ['Veterinario'] }
  },
  {
    path: 'portal-dueno',
    loadComponent: () => import('../features/portal-dueno/ui/pages/portal-dueno-page/portal-dueno-page.component').then(m => m.PortalDuenoPageComponent),
    canActivate: [authGuard],
    data: { roles: ['Dueno'] }
  },
  { path: '**', redirectTo: 'home' }
];
