import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ConsentService } from '../../core/services/consent.service';

interface NavLink {
  readonly label: string;
  readonly path: string;
}

@Component({
  selector: 'app-public-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public-layout.html',
})
export class PublicLayout {
  protected readonly consent = inject(ConsentService);
  protected readonly year = new Date().getFullYear();
  protected readonly mobileOpen = signal(false);

  protected readonly navLinks: readonly NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Funcionalidades', path: '/features' },
    { label: 'Precios', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contacto', path: '/contact' },
  ];

  protected readonly footerColumns = [
    {
      title: 'Producto',
      links: [
        { label: 'Funcionalidades', path: '/features' },
        { label: 'Precios', path: '/pricing' },
      ],
    },
    {
      title: 'Soluciones',
      links: [
        { label: 'Previsión de demanda', path: '/software-de-prevision-de-demanda' },
        { label: 'Reposición de stock', path: '/software-de-reposicion-de-stock' },
        { label: 'Alternativa a Excel', path: '/alternativa-a-excel-para-prevision-de-demanda' },
        { label: 'Ecommerce', path: '/prevision-de-stock-para-ecommerce' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Soporte', path: '/contact' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre nosotros', path: '/about' },
        { label: 'Contacto', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', path: '/privacy' },
        { label: 'Términos', path: '/terms' },
        { label: 'Cookies', path: '/cookies' },
      ],
    },
  ];

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
