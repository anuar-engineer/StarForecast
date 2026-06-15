import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface TeamMember {
  readonly id: number;
  readonly email: string;
  readonly name: string;
  readonly role: string;
  readonly is_active: boolean;
  readonly created_at: string;
}

export interface CreateMemberPayload {
  email: string;
  name: string;
  password: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/team`;

  list(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.base}/members`);
  }

  create(payload: CreateMemberPayload): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${this.base}/members`, payload);
  }

  update(id: number, patch: { role?: string; is_active?: boolean }): Observable<TeamMember> {
    return this.http.patch<TeamMember>(`${this.base}/members/${id}`, patch);
  }
}
