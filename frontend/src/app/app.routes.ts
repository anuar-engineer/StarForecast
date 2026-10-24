import { Routes } from '@angular/router';

import { PublicLayout } from './layout/public-layout/public-layout';
import { adminGuard, authGuard, customerGuard, guestGuard, ownerGuard } from './core/auth/auth.guard';

/**
 * Landings comerciales (contenido en `landing-data.ts`). Se listan aquí y no se
 * derivan de los datos para no meter todo su texto en el bundle inicial; un
 * test comprueba que ambas listas coinciden.
 */
export const LANDING_SLUGS = [
  'software-de-prevision-de-demanda',
  'software-de-reposicion-de-stock',
  'alternativa-a-excel-para-prevision-de-demanda',
  'prevision-de-stock-para-ecommerce',
] as const;

export const routes: Routes = [
  // -------- Acceso / app interna (autenticada) --------
  {
    path: 'login',
    title: 'Acceder · Star4cast',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/app/login/login').then((m) => m.Login),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-layout/app-layout').then((m) => m.AppLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Dashboard · Star4cast',
        canActivate: [customerGuard],
        loadComponent: () =>
          import('./features/app/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'products',
        title: 'Productos · Star4cast',
        canActivate: [customerGuard],
        loadComponent: () =>
          import('./features/app/products/products').then((m) => m.Products),
      },
      {
        path: 'import',
        title: 'Importar datos · Star4cast',
        canActivate: [ownerGuard],
        loadComponent: () =>
          import('./features/app/import-data/import-data').then((m) => m.ImportData),
      },
      {
        path: 'team',
        title: 'Equipo · Star4cast',
        canActivate: [ownerGuard],
        loadComponent: () =>
          import('./features/app/team/team').then((m) => m.Team),
      },
      {
        path: 'admin',
        title: 'Administración · Star4cast',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/app/admin/admin').then((m) => m.Admin),
      },
      {
        path: 'settings',
        title: 'Ajustes · Star4cast',
        loadComponent: () =>
          import('./features/app/settings/settings').then((m) => m.Settings),
      },
    ],
  },

  // -------- Sitio público (marketing) --------
  {
    path: '',
    component: PublicLayout,
    // Sin `title` en estas rutas: el título lo fija SeoService en cada página
    // (si no, el TitleStrategy del router lo pisaría al terminar la navegación).
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/marketing/home/home').then((m) => m.Home),
      },
      {
        path: 'features',
        loadComponent: () => import('./features/marketing/features-page/features-page').then((m) => m.FeaturesPage),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./features/marketing/pricing/pricing').then((m) => m.Pricing),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/marketing/about/about').then((m) => m.About),
      },
      {
        path: 'blog',
        loadComponent: () => import('./features/marketing/blog/blog-list/blog-list').then((m) => m.BlogList),
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./features/marketing/blog/blog-post/blog-post').then((m) => m.BlogPost),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/marketing/contact/contact').then((m) => m.Contact),
      },
      ...LANDING_SLUGS.map((slug) => ({
        path: slug,
        data: { slug },
        loadComponent: () => import('./features/marketing/landing/landing').then((m) => m.Landing),
      })),
      {
        path: 'privacy',
        data: { doc: 'privacy' },
        loadComponent: () => import('./features/marketing/legal/legal').then((m) => m.Legal),
      },
      {
        path: 'terms',
        data: { doc: 'terms' },
        loadComponent: () => import('./features/marketing/legal/legal').then((m) => m.Legal),
      },
      {
        path: 'cookies',
        data: { doc: 'cookies' },
        loadComponent: () => import('./features/marketing/legal/legal').then((m) => m.Legal),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
