import { Routes } from '@angular/router';

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
    loadComponent: () => import('../features/dashboard/ui/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: 'portal-dueno',
    loadComponent: () => import('../features/portal-dueno/ui/pages/portal-dueno-page/portal-dueno-page.component').then(m => m.PortalDuenoPageComponent)
  },
  { path: '**', redirectTo: 'home' }
];
