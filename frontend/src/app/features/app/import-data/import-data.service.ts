import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface ImportJob {
  readonly id: number;
  readonly filename: string;
  readonly status: 'pending' | 'processing' | 'completed' | 'error';
  readonly kind: string;
  readonly rows_total: number;
  readonly rows_ok: number;
  readonly rows_error: number;
  readonly products_affected: number;
  readonly detected_columns: Record<string, string> | null;
  readonly errors: { row: number; reason: string }[] | null;
  readonly message: string | null;
  readonly created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ImportService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/imports`;

  upload(file: File): Observable<ImportJob> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<ImportJob>(this.base, form);
  }

  list(): Observable<ImportJob[]> {
    return this.http.get<ImportJob[]>(this.base);
  }
}
