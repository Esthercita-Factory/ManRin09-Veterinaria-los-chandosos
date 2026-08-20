import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    // Verificar si la ruta requiere un rol específico
    const requiredRoles = route.data?.['roles'] as Array<string>;
    const currentRole = authService.getRole();

    if (requiredRoles && currentRole && !requiredRoles.includes(currentRole)) {
      // Redirigir al inicio correspondiente si no tiene permisos
      if (currentRole === 'Veterinario') {
        router.navigate(['/dashboard']);
      } else {
        router.navigate(['/portal-dueno']);
      }
      return false;
    }
    return true;
  }

  // Si no hay token, redirigir al login
  router.navigate(['/auth/login']);
  return false;
};
