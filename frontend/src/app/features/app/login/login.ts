import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly mode = signal<'login' | 'register'>('login');
  protected readonly loading = signal(false);
  protected readonly errorMsg = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    company: [''],
  });

  protected toggleMode(): void {
    const next = this.mode() === 'login' ? 'register' : 'login';
    this.mode.set(next);
    this.errorMsg.set(null);
    const name = this.form.controls.name;
    if (next === 'register') {
      name.setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      name.clearValidators();
    }
    name.updateValueAndValidity();
  }

  protected useDemo(): void {
    this.mode.set('login');
    this.form.patchValue({ email: 'demo@star4cast.com', password: 'demo1234' });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set(null);

    const { email, password, name, company } = this.form.getRawValue();
    const request$ =
      this.mode() === 'register'
        ? this.auth.register({ email, password, name, company: company || null })
        : this.auth.login({ email, password });

    request$.subscribe({
      next: () => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect') ?? '/app';
        this.router.navigateByUrl(redirect);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMsg.set(
          err.error?.detail ??
            (err.status === 0
              ? 'No se pudo conectar con el servidor.'
              : 'Ha ocurrido un error. Inténtalo de nuevo.'),
        );
      },
    });
  }
}
