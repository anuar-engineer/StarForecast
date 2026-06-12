import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    // El formulario solo registra en consola mientras no haya backend.
    vi.spyOn(console, 'info').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function create() {
    // `form`, `submit` y `submitted` son protected: el test accede vía cast.
    return TestBed.createComponent(Contact).componentInstance as unknown as {
      form: import('@angular/forms').FormGroup;
      submit: () => void;
      submitted: () => boolean;
    };
  }

  it('arranca con el formulario inválido y sin enviar', () => {
    const c = create();
    expect(c.form.invalid).toBe(true);
    expect(c.submitted()).toBe(false);
  });

  it('valida email y longitud mínima de nombre y mensaje', () => {
    const c = create();
    c.form.setValue({ name: 'A', email: 'no-es-email', company: '', message: 'corto' });
    expect(c.form.controls['name'].invalid).toBe(true);
    expect(c.form.controls['email'].invalid).toBe(true);
    expect(c.form.controls['message'].invalid).toBe(true);
  });

  it('no marca como enviado si el formulario es inválido', () => {
    const c = create();
    c.submit();
    expect(c.submitted()).toBe(false);
  });

  it('marca como enviado y resetea el formulario cuando es válido', () => {
    const c = create();
    c.form.setValue({
      name: 'Ana',
      email: 'ana@empresa.com',
      company: 'ACME',
      message: 'Hola, me gustaría una demo de Star4cast.',
    });
    expect(c.form.valid).toBe(true);

    c.submit();

    expect(c.submitted()).toBe(true);
    expect(c.form.getRawValue().name).toBe('');
  });
});
