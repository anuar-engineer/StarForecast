import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);

  protected readonly submitted = signal(false);

  constructor() {
    this.seo.update({
      title: 'Contacto',
      description:
        '¿Tienes dudas o quieres una demo de Star4cast? Escríbenos y te respondemos en menos de 24 horas.',
      path: '/contact',
      keywords: 'contacto Star4cast, demo, soporte, predicción de stock',
    });
  }

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: enviar a la API (POST /api/contact) cuando el backend esté listo.
    console.info('[contact] mensaje enviado', this.form.getRawValue());
    this.submitted.set(true);
    this.form.reset();
  }
}
