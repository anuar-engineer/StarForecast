import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

interface NavItem {
  readonly label: string;
  readonly path?: string;
  readonly icon: string; // path SVG (d)
  readonly soon?: boolean;
}

@Component({
  selector: 'app-app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-layout.html',
})
export class AppLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.auth.user;
  protected readonly sidebarOpen = signal(false);
  protected readonly menuOpen = signal(false);

  /** Contenedor del menú de usuario, para detectar clics fuera. */
  private readonly userMenu = viewChild<ElementRef<HTMLElement>>('userMenu');

  /** Cierra el menú de usuario al hacer clic fuera de él. */
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) return;
    const menu = this.userMenu()?.nativeElement;
    if (menu && !menu.contains(event.target as Node)) {
      this.menuOpen.set(false);
    }
  }

  /** Escape cierra tanto el menú como el sidebar móvil. */
  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.menuOpen.set(false);
    this.sidebarOpen.set(false);
  }

  protected readonly initials = computed(() => {
    const name = this.user()?.name ?? '';
    return name
      .split(' ')
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join('');
  });

  protected readonly nav: readonly NavItem[] = [
    { label: 'Dashboard', path: '/app/dashboard', icon: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z' },
    { label: 'Productos', icon: 'M3 7l9-4 9 4-9 4-9-4Zm0 5l9 4 9-4M3 17l9 4 9-4', soon: true },
    { label: 'Importar datos', icon: 'M12 16V4m0 0L8 8m4-4 4 4M4 20h16', soon: true },
    { label: 'Ajustes', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 1-.1 1.3l2 1.6-2 3.4-2.4-1a8 8 0 0 1-2.2 1.3l-.3 2.6h-4l-.3-2.6a8 8 0 0 1-2.2-1.3l-2.4 1-2-3.4 2-1.6A8 8 0 0 1 4 12a8 8 0 0 1 .1-1.3l-2-1.6 2-3.4 2.4 1A8 8 0 0 1 8.7 5.4L9 2.8h4l.3 2.6a8 8 0 0 1 2.2 1.3l2.4-1 2 3.4-2 1.6A8 8 0 0 1 20 12Z', soon: true },
  ];

  protected toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
