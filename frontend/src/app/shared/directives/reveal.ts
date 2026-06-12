import { afterNextRender, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Revela el elemento con un fade + slide-up cuando entra en el viewport.
 *
 * Es una mejora progresiva: la clase que oculta el contenido solo se añade en
 * el navegador (vía `afterNextRender`), por lo que el HTML prerenderizado (SSG)
 * y los usuarios sin JS ven siempre el contenido. Respeta `prefers-reduced-motion`.
 *
 * Uso: `<div appReveal>` o `<div [appReveal]="120">` para escalonar (delay en ms).
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Retardo de entrada en milisegundos, para escalonar grupos de elementos. */
  readonly appReveal = input<number | ''>('');

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;

      // Si el usuario prefiere menos movimiento, no ocultamos ni animamos.
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const delay = Number(this.appReveal()) || 0;
      el.style.setProperty('--reveal-delay', `${delay}ms`);
      el.classList.add('reveal-init');

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('reveal-in');
              observer.unobserve(el);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );

      observer.observe(el);
    });
  }
}
