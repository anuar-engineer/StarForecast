import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ogImage, SeoService } from '../../../core/services/seo.service';
import { environment } from '../../../../environments/environment';

interface Option {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly seo = inject(SeoService);

  protected readonly submitted = signal(false);
  protected readonly sending = signal(false);
  protected readonly errorMsg = signal<string | null>(null);

  protected readonly plans: readonly Option[] = [
    { value: '', label: 'Aún no lo sé' },
    { value: 'starter', label: 'Starter · 29 €/mes' },
    { value: 'pro', label: 'Pro · 99 €/mes' },
    { value: 'business', label: 'Business · 199 €/mes' },
    { value: 'empresa', label: 'Empresa · a medida' },
  ];

  protected readonly platforms: readonly Option[] = [
    { value: '', label: 'Selecciona una opción' },
    { value: 'shopify', label: 'Shopify' },
    { value: 'prestashop', label: 'PrestaShop' },
    { value: 'woocommerce', label: 'WooCommerce' },
    { value: 'erp', label: 'ERP o programa de gestión' },
    { value: 'excel', label: 'Excel / hojas de cálculo' },
    { value: 'otro', label: 'Otro' },
  ];

  protected readonly catalogSizes: readonly Option[] = [
    { value: '', label: 'Selecciona una opción' },
    { value: '<300', label: 'Menos de 300' },
    { value: '300-3000', label: 'Entre 300 y 3.000' },
    { value: '3000-15000', label: 'Entre 3.000 y 15.000' },
    { value: '>15000', label: 'Más de 15.000' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    plan: [''],
    platform: [''],
    catalog_size: [''],
    message: [''],
    privacy: [false, Validators.requiredTrue],
    // Honeypot anti-spam (oculto a personas y lectores de pantalla).
    website: [''],
  });

  constructor() {
    this.seo.update({
      title: 'Contacto',
      description:
        '¿Quieres probar Star4cast con tus propios datos o tienes dudas sobre la previsión de stock? Escríbenos y te respondemos en menos de 24 horas.',
      path: '/contact',
      image: ogImage('contact'),
    });

    // En el prerender no hay query params; en el navegador preselecciona el
    // plan elegido desde /pricing (?plan=pro).
    const plan = inject(ActivatedRoute).snapshot.queryParamMap.get('plan');
    if (plan && this.plans.some((p) => p.value === plan)) {
      this.form.controls.plan.setValue(plan);
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.errorMsg.set(null);

    const { privacy: _privacy, ...payload } = this.form.getRawValue();
    this.http.post(`${environment.apiBaseUrl}/leads`, payload).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
        this.form.reset();
      },
      error: () => {
        this.sending.set(false);
        this.errorMsg.set('No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a hola@star4cast.es.');
      },
    });
  }
}
