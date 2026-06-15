import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, AuthUser, LoginCredentials, RegisterPayload } from './auth.models';

const TOKEN_KEY = 's4c.token';
const USER_KEY = 's4c.user';

/**
 * Estado de sesión del cliente. El token JWT y el usuario se persisten en
 * localStorage (solo en navegador; durante el prerender SSG no se toca).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly base = `${environment.apiBaseUrl}/auth`;

  private readonly _token = signal<string | null>(this.read(TOKEN_KEY));
  private readonly _user = signal<AuthUser | null>(this.readUser());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => {
    const token = this._token();
    return token !== null && !this.isExpired(token);
  });
  readonly isAdmin = computed(() => this._user()?.role === 'admin');
  /** Gestor del equipo de su organización (responsable de la empresa). */
  readonly isOwner = computed(() => this._user()?.role === 'owner');

  token(): string | null {
    return this._token();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/login`, credentials)
      .pipe(tap((res) => this.persist(res)));
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/register`, payload)
      .pipe(tap((res) => this.persist(res)));
  }

  /** Actualiza el usuario en sesión (p. ej. tras editar el perfil). */
  updateStoredUser(user: AuthUser): void {
    this._user.set(user);
    if (this.isBrowser) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    if (this.isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  private persist(res: AuthResponse): void {
    this._token.set(res.access_token);
    this._user.set(res.user);
    if (this.isBrowser) {
      localStorage.setItem(TOKEN_KEY, res.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
  }

  /** True si el JWT lleva `exp` y ya ha caducado. Sin `exp`, no se fuerza. */
  private isExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload || typeof payload.exp !== 'number') return false;
    return payload.exp * 1000 <= Date.now();
  }

  private decodePayload(token: string): { exp?: number } | null {
    const part = token.split('.')[1];
    if (!part) return null;
    try {
      const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json) as { exp?: number };
    } catch {
      return null;
    }
  }

  private read(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  private readUser(): AuthUser | null {
    const raw = this.read(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
