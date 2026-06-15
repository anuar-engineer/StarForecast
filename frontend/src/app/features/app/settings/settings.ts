import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/auth/auth.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
})
export class Settings {
  private readonly service = inject(SettingsService);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  protected readonly user = this.auth.user;
  protected readonly isOwner = this.auth.isOwner;
  protected readonly roleLabel = computed(() => {
    switch (this.user()?.role) {
      case 'admin':
        return 'Administrador de plataforma';
      case 'owner':
        return 'Gestor de la organización';
      default:
        return 'Usuario';
    }
  });

  // --- Perfil ---
  protected readonly profileForm = this.fb.nonNullable.group({
    name: [this.user()?.name ?? '', [Validators.required, Validators.minLength(2)]],
  });
  protected readonly savingProfile = signal(false);
  protected readonly profileMsg = signal<string | null>(null);
  protected readonly profileError = signal<string | null>(null);

  // --- Contraseña ---
  protected readonly passwordForm = this.fb.nonNullable.group({
    current_password: ['', [Validators.required]],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
  });
  protected readonly savingPassword = signal(false);
  protected readonly passwordMsg = signal<string | null>(null);
  protected readonly passwordError = signal<string | null>(null);

  // --- Organización (solo gestor) ---
  protected readonly orgForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });
  protected readonly savingOrg = signal(false);
  protected readonly orgMsg = signal<string | null>(null);
  protected readonly orgError = signal<string | null>(null);

  constructor() {
    if (this.auth.isOwner()) {
      this.service.getOrganization().subscribe({
        next: (org) => this.orgForm.patchValue({ name: org.name }),
      });
    }
  }

  protected saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.savingProfile.set(true);
    this.profileMsg.set(null);
    this.profileError.set(null);
    this.service.updateProfile(this.profileForm.getRawValue().name).subscribe({
      next: (updated) => {
        this.auth.updateStoredUser(updated);
        this.savingProfile.set(false);
        this.profileMsg.set('Perfil actualizado.');
      },
      error: (err: HttpErrorResponse) => {
        this.savingProfile.set(false);
        this.profileError.set(err.error?.detail ?? 'No se pudo guardar el perfil.');
      },
    });
  }

  protected savePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.savingPassword.set(true);
    this.passwordMsg.set(null);
    this.passwordError.set(null);
    const { current_password, new_password } = this.passwordForm.getRawValue();
    this.service.changePassword(current_password, new_password).subscribe({
      next: () => {
        this.savingPassword.set(false);
        this.passwordMsg.set('Contraseña actualizada.');
        this.passwordForm.reset({ current_password: '', new_password: '' });
      },
      error: (err: HttpErrorResponse) => {
        this.savingPassword.set(false);
        this.passwordError.set(err.error?.detail ?? 'No se pudo cambiar la contraseña.');
      },
    });
  }

  protected saveOrg(): void {
    if (this.orgForm.invalid) return;
    this.savingOrg.set(true);
    this.orgMsg.set(null);
    this.orgError.set(null);
    this.service.updateOrganization(this.orgForm.getRawValue().name).subscribe({
      next: () => {
        this.savingOrg.set(false);
        this.orgMsg.set('Organización actualizada.');
      },
      error: (err: HttpErrorResponse) => {
        this.savingOrg.set(false);
        this.orgError.set(err.error?.detail ?? 'No se pudo guardar la organización.');
      },
    });
  }
}
