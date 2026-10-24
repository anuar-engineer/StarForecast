import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConsentService } from '../../core/services/consent.service';

@Component({
  selector: 'app-cookie-consent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: { '(document:keydown.escape)': 'consent.closeSettings()' },
  template: `
    <!-- ===================== Banner ===================== -->
    @if (consent.bannerVisible() && !consent.settingsOpen()) {
      <aside
        role="region"
        aria-label="Aviso de cookies"
        class="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md motion-safe:animate-[s4c-fade-in_420ms_cubic-bezier(0.22,1,0.36,1)_600ms_both]"
      >
        <div class="rounded-2xl border border-white/10 bg-night-900/90 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <div class="flex items-start gap-3.5">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-400/10 text-accent-300 ring-1 ring-accent-400/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4.5 w-4.5" aria-hidden="true">
                <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z" />
                <path d="M8.5 11.5h.01M14 16h.01M9.5 16.5h.01" />
              </svg>
            </span>
            <div class="min-w-0">
              <p class="font-display text-sm font-semibold text-white">Tu privacidad, bajo control</p>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-400">
                Usamos cookies y almacenamiento técnico necesarios para que la web y tu sesión funcionen.
                Puedes aceptar, rechazar las opcionales o configurarlas. Más información en la
                <a routerLink="/cookies" class="font-medium text-accent-300 underline-offset-2 transition hover:text-accent-200 hover:underline">Política de cookies</a>.
              </p>
            </div>
          </div>
          <div class="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            <button type="button" (click)="consent.openSettings()" class="rounded-full px-3 py-2 text-sm font-medium text-slate-400 transition hover:text-white sm:mr-auto">
              Configurar
            </button>
            <button type="button" (click)="consent.rejectAll()" class="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Rechazar
            </button>
            <button type="button" (click)="consent.acceptAll()" class="rounded-full border border-accent-400 bg-accent-400 px-5 py-2 text-sm font-semibold text-night-950 transition hover:bg-accent-300">
              Aceptar
            </button>
          </div>
        </div>
      </aside>
    }

    <!-- ===================== Panel de configuración ===================== -->
    @if (consent.settingsOpen()) {
      <div class="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6">
        <div class="absolute inset-0 bg-night-950/70 backdrop-blur-sm motion-safe:animate-[s4c-fade-in_200ms_ease_both]" (click)="consent.closeSettings()" aria-hidden="true"></div>

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          class="relative w-full max-w-lg rounded-2xl border border-white/10 bg-night-900 p-6 shadow-2xl shadow-black/60 motion-safe:animate-[s4c-fade-in_320ms_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 id="cookie-settings-title" class="font-display text-lg font-bold text-white">Configuración de cookies</h2>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-400">
                Elige qué categorías permites. Puedes cambiarlo cuando quieras desde el pie de página.
              </p>
            </div>
            <button type="button" (click)="consent.closeSettings()" class="-mr-2 -mt-1 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white" aria-label="Cerrar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-4.5 w-4.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <ul class="mt-6 space-y-3">
            <li class="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div class="flex items-center justify-between gap-4">
                <p class="text-sm font-semibold text-white">Técnicas y necesarias</p>
                <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-300">Siempre activas</span>
              </div>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-400">
                Imprescindibles para que la web funcione: mantener tu sesión iniciada y recordar esta elección. No se pueden desactivar.
              </p>
            </li>
            <li class="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div class="flex items-center justify-between gap-4">
                <label for="cookie-analytics" class="text-sm font-semibold text-white">Analíticas</label>
                <button
                  id="cookie-analytics"
                  type="button"
                  role="switch"
                  [attr.aria-checked]="analyticsDraft()"
                  (click)="analyticsDraft.set(!analyticsDraft())"
                  class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition"
                  [class]="analyticsDraft() ? 'bg-accent-400' : 'bg-white/15'"
                >
                  <span class="inline-block h-5 w-5 rounded-full bg-white shadow transition" [class]="analyticsDraft() ? 'translate-x-5.5' : 'translate-x-0.5'"></span>
                </button>
              </div>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-400">
                Nos ayudarían a entender de forma agregada cómo se usa la web para mejorarla. Actualmente no utilizamos ninguna herramienta de este tipo.
              </p>
            </li>
          </ul>

          <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" (click)="consent.rejectAll()" class="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Rechazar todo
            </button>
            <button type="button" (click)="consent.save(analyticsDraft())" class="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Guardar selección
            </button>
            <button type="button" (click)="consent.acceptAll()" class="rounded-full border border-accent-400 bg-accent-400 px-5 py-2 text-sm font-semibold text-night-950 transition hover:bg-accent-300">
              Aceptar todo
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CookieConsent {
  protected readonly consent = inject(ConsentService);

  /** Selección en curso del panel; vuelve a lo guardado cada vez que se abre. */
  protected readonly analyticsDraft = linkedSignal(() => {
    this.consent.settingsOpen();
    return this.consent.analytics();
  });
}
