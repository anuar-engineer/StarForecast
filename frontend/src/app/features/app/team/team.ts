import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/auth/auth.service';
import { TeamMember, TeamService } from './team.service';

@Component({
  selector: 'app-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './team.html',
})
export class Team {
  private readonly service = inject(TeamService);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  protected readonly currentUserId = computed(() => this.auth.user()?.id ?? -1);

  protected readonly members = signal<TeamMember[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly updatingId = signal<number | null>(null);

  protected readonly showForm = signal(false);
  protected readonly creating = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['member', [Validators.required]],
  });

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.service.list().subscribe({
      next: (data) => {
        this.members.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected toggleForm(): void {
    this.showForm.update((v) => !v);
    this.formError.set(null);
    this.form.reset({ name: '', email: '', password: '', role: 'member' });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.creating.set(true);
    this.formError.set(null);
    this.service.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.creating.set(false);
        this.showForm.set(false);
        this.load();
      },
      error: (err: HttpErrorResponse) => {
        this.creating.set(false);
        this.formError.set(err.error?.detail ?? 'No se pudo crear el usuario.');
      },
    });
  }

  protected toggleActive(u: TeamMember): void {
    this.updatingId.set(u.id);
    this.service.update(u.id, { is_active: !u.is_active }).subscribe({
      next: (updated) => {
        this.members.update((list) => list.map((x) => (x.id === updated.id ? updated : x)));
        this.updatingId.set(null);
      },
      error: () => this.updatingId.set(null),
    });
  }

  protected onRoleChange(u: TeamMember, event: Event): void {
    const role = (event.target as HTMLSelectElement).value;
    if (role === u.role) return;
    this.updatingId.set(u.id);
    this.service.update(u.id, { role }).subscribe({
      next: (updated) => {
        this.members.update((list) => list.map((x) => (x.id === updated.id ? updated : x)));
        this.updatingId.set(null);
      },
      error: () => this.updatingId.set(null),
    });
  }
}
