import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';
import { DashboardService } from './dashboard.service';
import { DashboardSummary } from './dashboard.models';
import { ForecastChart } from './forecast-chart/forecast-chart';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ForecastChart],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dashboard = inject(DashboardService);
  private readonly auth = inject(AuthService);

  protected readonly summary = signal<DashboardSummary | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  protected readonly firstName = computed(() => this.auth.user()?.name?.split(' ')[0] ?? '');
  protected readonly maxCategoryValue = computed(() =>
    Math.max(1, ...(this.summary()?.categories.map((c) => c.inventory_value) ?? [1])),
  );

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dashboard.summary().subscribe({
      next: (data) => {
        this.summary.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected eur(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  protected num(value: number): string {
    return new Intl.NumberFormat('es-ES').format(value);
  }
}
