import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface AdminOverview {
  readonly organizations: number;
  readonly users: number;
  readonly active_users: number;
  readonly products: number;
  readonly sales_records: number;
  readonly forecasts: number;
  readonly imports: number;
}

export interface AdminOrganization {
  readonly id: number;
  readonly name: string;
  readonly users: number;
  readonly products: number;
  readonly inventory_value: number;
  readonly created_at: string;
}

export interface AdminUserRow {
  readonly id: number;
  readonly email: string;
  readonly name: string;
  readonly company: string | null;
  readonly role: string;
  readonly is_active: boolean;
  readonly organization_id: number;
  readonly organization_name: string;
  readonly created_at: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/admin`;

  overview(): Observable<AdminOverview> {
    return this.http.get<AdminOverview>(`${this.base}/overview`);
  }

  organizations(): Observable<AdminOrganization[]> {
    return this.http.get<AdminOrganization[]>(`${this.base}/organizations`);
  }

  users(): Observable<AdminUserRow[]> {
    return this.http.get<AdminUserRow[]>(`${this.base}/users`);
  }

  updateUser(id: number, patch: { is_active?: boolean; role?: string }): Observable<AdminUserRow> {
    return this.http.patch<AdminUserRow>(`${this.base}/users/${id}`, patch);
  }
}
