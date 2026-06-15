import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthUser } from '../../../core/auth/auth.models';

export interface Organization {
  readonly id: number;
  readonly name: string;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiBaseUrl;

  updateProfile(name: string): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.api}/auth/me`, { name });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.api}/auth/password`, {
      current_password: currentPassword,
      new_password: newPassword,
    });
  }

  getOrganization(): Observable<Organization> {
    return this.http.get<Organization>(`${this.api}/organization`);
  }

  updateOrganization(name: string): Observable<Organization> {
    return this.http.patch<Organization>(`${this.api}/organization`, { name });
  }
}
