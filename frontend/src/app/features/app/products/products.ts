import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { ForecastChart } from '../dashboard/forecast-chart/forecast-chart';
import { ProductsService } from './products.service';
import { Product, ProductDetail } from './products.models';

@Component({
  selector: 'app-products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ForecastChart],
  templateUrl: './products.html',
})
export class Products {
  private readonly service = inject(ProductsService);
  /** El gestor (owner) puede importar y recalcular; el member solo consulta. */
  protected readonly isOwner = inject(AuthService).isOwner;

  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly reforecasting = signal(false);

  protected readonly selected = signal<ProductDetail | null>(null);
  protected readonly detailLoading = signal(false);

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.service.list().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected reforecast(): void {
    this.reforecasting.set(true);
    this.service.reforecast().subscribe({
      next: () => {
        this.reforecasting.set(false);
        this.load();
      },
      error: () => this.reforecasting.set(false),
    });
  }

  protected openDetail(p: Product): void {
    this.detailLoading.set(true);
    this.selected.set(null);
    this.service.detail(p.id).subscribe({
      next: (d) => {
        this.selected.set(d);
        this.detailLoading.set(false);
      },
      error: () => this.detailLoading.set(false),
    });
  }

  protected closeDetail(): void {
    this.selected.set(null);
  }

  protected eur(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  protected num(value: number | null): string {
    return value === null ? '—' : new Intl.NumberFormat('es-ES').format(value);
  }

  protected cover(p: Product): string {
    return p.days_of_cover === null ? '—' : `${p.days_of_cover.toFixed(0)} d`;
  }
}
