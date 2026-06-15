import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';

/** Protege las rutas de la app: sin sesión redirige a /login. */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

/** Evita ver /login si ya hay sesión: redirige a la app. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? router.createUrlTree(['/app']) : true;
};

/** Protege el panel de administración: solo usuarios con rol admin. */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated() && auth.isAdmin()) {
    return true;
  }
  return router.createUrlTree([auth.isAuthenticated() ? '/app' : '/login']);
};

/**
 * Área de cliente (Dashboard, Productos, Importar): para usuarios de una
 * organización. El admin de plataforma no usa la app de forecasting: se le
 * redirige a su panel de administración.
 */
export const customerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) return router.createUrlTree(['/login']);
  if (auth.isAdmin()) return router.createUrlTree(['/app/admin']);
  return true;
};

/** Gestión del equipo: solo el gestor (owner) de la organización. */
export const ownerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) return router.createUrlTree(['/login']);
  if (auth.user()?.role === 'owner') return true;
  return router.createUrlTree([auth.isAdmin() ? '/app/admin' : '/app/dashboard']);
};
