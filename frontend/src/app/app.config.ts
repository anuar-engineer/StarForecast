import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      // Al navegar, vuelve arriba; al usar atrás/adelante, restaura la posición.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      // Cross-fade sutil entre páginas (View Transitions API).
      withViewTransitions(),
    ),
    provideHttpClient(withFetch()),
    // Reutiliza el HTML prerenderizado (SSG) en lugar de re-renderizar en cliente.
    provideClientHydration(withEventReplay()),
  ],
};
