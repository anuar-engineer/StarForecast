import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';
import {
  AdminOrganization,
  AdminOverview,
  AdminService,
  AdminUserRow,
} from './admin.service';

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.html',
})
export class Admin {
  private readonly service = inject(AdminService);
  private readonly auth = inject(AuthService);

  protected readonly currentUserId = computed(() => this.auth.user()?.id ?? -1);

  protected readonly overview = signal<AdminOverview | null>(null);
  protected readonly organizations = signal<AdminOrganization[]>([]);
  protected readonly users = signal<AdminUserRow[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly updatingId = signal<number | null>(null);

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(false);
    let pending = 3;
    const done = () => {
      if (--pending === 0) this.loading.set(false);
    };
    const fail = () => {
      this.error.set(true);
      this.loading.set(false);
    };
    this.service.overview().subscribe({ next: (d) => (this.overview.set(d), done()), error: fail });
    this.service.organizations().subscribe({ next: (d) => (this.organizations.set(d), done()), error: fail });
    this.service.users().subscribe({ next: (d) => (this.users.set(d), done()), error: fail });
  }

  protected toggleActive(u: AdminUserRow): void {
    this.updatingId.set(u.id);
    this.service.updateUser(u.id, { is_active: !u.is_active }).subscribe({
      next: (updated) => {
        this.users.update((list) => list.map((x) => (x.id === updated.id ? updated : x)));
        this.updatingId.set(null);
      },
      error: () => this.updatingId.set(null),
    });
  }

  protected setRole(u: AdminUserRow, role: string): void {
    if (role === u.role) return;
    this.updatingId.set(u.id);
    this.service.updateUser(u.id, { role }).subscribe({
      next: (updated) => {
        this.users.update((list) => list.map((x) => (x.id === updated.id ? updated : x)));
        this.updatingId.set(null);
      },
      error: () => this.updatingId.set(null),
    });
  }

  protected onRoleChange(u: AdminUserRow, event: Event): void {
    this.setRole(u, (event.target as HTMLSelectElement).value);
  }

  protected eur(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
