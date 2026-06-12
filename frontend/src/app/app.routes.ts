import { Routes } from '@angular/router';

import { PublicLayout } from './layout/public-layout/public-layout';

export const routes: Routes = [
  // -------- Sitio público (marketing) --------
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Star4cast · Predicción de stock y forecasting de inventario',
        loadComponent: () => import('./features/marketing/home/home').then((m) => m.Home),
      },
      {
        path: 'features',
        title: 'Funcionalidades · Star4cast',
        loadComponent: () => import('./features/marketing/features-page/features-page').then((m) => m.FeaturesPage),
      },
      {
        path: 'pricing',
        title: 'Precios · Star4cast',
        loadComponent: () => import('./features/marketing/pricing/pricing').then((m) => m.Pricing),
      },
      {
        path: 'about',
        title: 'Sobre nosotros · Star4cast',
        loadComponent: () => import('./features/marketing/about/about').then((m) => m.About),
      },
      {
        path: 'blog',
        title: 'Blog · Star4cast',
        loadComponent: () => import('./features/marketing/blog/blog-list/blog-list').then((m) => m.BlogList),
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./features/marketing/blog/blog-post/blog-post').then((m) => m.BlogPost),
      },
      {
        path: 'contact',
        title: 'Contacto · Star4cast',
        loadComponent: () => import('./features/marketing/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'privacy',
        title: 'Política de privacidad · Star4cast',
        data: { doc: 'privacy' },
        loadComponent: () => import('./features/marketing/legal/legal').then((m) => m.Legal),
      },
      {
        path: 'terms',
        title: 'Términos y condiciones · Star4cast',
        data: { doc: 'terms' },
        loadComponent: () => import('./features/marketing/legal/legal').then((m) => m.Legal),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
