import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<div appReveal></div>`,
})
class Host {}

describe('Reveal', () => {
  let observe: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observe = vi.fn();
    // jsdom no implementa IntersectionObserver: lo simulamos.
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      observe = observe;
      unobserve = vi.fn();
      disconnect = vi.fn();
      constructor(_cb: unknown) {}
    };
  });

  it('oculta el elemento (reveal-init) y lo observa cuando no se reduce el movimiento', async () => {
    (window as unknown as { matchMedia: unknown }).matchMedia = vi.fn().mockReturnValue({
      matches: false,
    });

    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.classList.contains('reveal-init')).toBe(true);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('no oculta nada ni observa si el usuario prefiere reducir el movimiento', async () => {
    (window as unknown as { matchMedia: unknown }).matchMedia = vi.fn().mockReturnValue({
      matches: true,
    });

    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.classList.contains('reveal-init')).toBe(false);
    expect(observe).not.toHaveBeenCalled();
  });
});
