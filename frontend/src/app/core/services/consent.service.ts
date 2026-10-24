import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const CONSENT_KEY = 's4c.consent';

/** Súbelo si cambian las categorías o la política: vuelve a pedir consentimiento. */
const CONSENT_VERSION = 1;

/** La AEPD recomienda renovar el consentimiento como máximo cada 24 meses; usamos 12. */
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

interface StoredConsent {
  readonly version: number;
  readonly analytics: boolean;
  readonly date: string;
}

/**
 * Consentimiento de cookies/almacenamiento no esencial.
 *
 * Las técnicas (sesión, esta propia preferencia) no requieren consentimiento.
 * Hoy no hay nada analítico; si se añade, su script debe cargarse solo cuando
 * `analytics()` sea true (p. ej. con un `effect` en el navegador).
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly stored = signal<StoredConsent | null>(null);
  /** False durante el prerender SSG: así el banner nunca se incrusta en el HTML estático. */
  private readonly loaded = signal(false);

  readonly analytics = computed(() => this.stored()?.analytics ?? false);
  readonly bannerVisible = computed(() => this.loaded() && this.stored() === null);
  readonly settingsOpen = signal(false);

  constructor() {
    if (!this.isBrowser) return;
    this.stored.set(this.read());
    this.loaded.set(true);
  }

  acceptAll(): void {
    this.save(true);
  }

  rejectAll(): void {
    this.save(false);
  }

  save(analytics: boolean): void {
    const consent: StoredConsent = { version: CONSENT_VERSION, analytics, date: new Date().toISOString() };
    this.stored.set(consent);
    this.settingsOpen.set(false);
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      // Almacenamiento bloqueado: la elección vale para esta visita.
    }
  }

  openSettings(): void {
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    this.settingsOpen.set(false);
  }

  private read(): StoredConsent | null {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const c = JSON.parse(raw) as StoredConsent;
      const expired = Date.now() - new Date(c.date).getTime() > CONSENT_MAX_AGE_MS;
      return c.version === CONSENT_VERSION && !expired ? c : null;
    } catch {
      return null;
    }
  }
}
