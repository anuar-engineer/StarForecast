import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  protected readonly year = new Date().getFullYear();
  protected readonly mobileOpen = signal(false);

  protected readonly navLinks: readonly NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Funcionalidades', path: '/features' },
    { label: 'Precios', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'Sobre nosotros', path: '/about' },
    { label: 'Contacto', path: '/contact' },
  ];

  protected readonly footerColumns = [
    {
      title: 'Producto',
      links: [
        { label: 'Funcionalidades', path: '/features' },
        { label: 'Precios', path: '/pricing' },
        { label: 'Solicitar acceso', path: '/contact' },
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
