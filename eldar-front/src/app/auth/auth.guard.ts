import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; 
import { inject } from '@angular/core';
import { RouteData } from '../interfaces/roles';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si hay un usuario autenticado
  if (authService.isLoggedIn()) {
    const expectedRoles: string[] = route.data['roles']; 
    const userRole = authService.getRole() || 'user';

    // Verifica si el rol del usuario coincide con los roles permitidos para la ruta
    if (expectedRoles.includes(userRole)) {
      return true;
    }
  }  
  // Redirige al login si no está autenticado o no tiene el rol adecuado
  router.navigate(['/login']);
  return false;
};