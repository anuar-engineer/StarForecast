import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Product, ProductDetail } from './products.models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/products`;

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  detail(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.base}/${id}`);
  }

  reforecast(): Observable<{ reforecasted: number }> {
    return this.http.post<{ reforecasted: number }>(`${this.base}/reforecast`, {});
  }
}
