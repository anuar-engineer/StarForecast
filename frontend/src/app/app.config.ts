import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';

// Fechas y números en español (DatePipe del blog), también en el prerender.
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'es' },
    provideRouter(
      routes,
      withComponentInputBinding(),
      // Al navegar, vuelve arriba; al usar atrás/adelante, restaura la posición.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      // Cross-fade sutil entre páginas (View Transitions API).
      withViewTransitions(),
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    // Reutiliza el HTML prerenderizado (SSG) en lugar de re-renderizar en cliente.
    provideClientHydration(withEventReplay()),
  ],
};
