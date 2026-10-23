import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { Contact } from './contact';

type ContactInternals = {
  form: import('@angular/forms').FormGroup;
  submit: () => void;
  submitted: () => boolean;
  sending: () => boolean;
  errorMsg: () => string | null;
};

const VALID = {
  name: 'Ana',
  email: 'ana@empresa.com',
  company: 'ACME',
  plan: 'pro',
  message: 'Hola, me gustaría probar Star4cast.',
  privacy: true,
};

describe('Contact', () => {
  let http: HttpTestingController;

  function setup(queryParams: Record<string, string> = {}): ContactInternals {
    TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap(queryParams) } },
        },
      ],
    });
    http = TestBed.inject(HttpTestingController);
    // `form`, `submit`, etc. son protected: el test accede vía cast.
    return TestBed.createComponent(Contact).componentInstance as unknown as ContactInternals;
  }

  afterEach(() => http.verify());

  it('arranca con el formulario inválido y sin enviar', () => {
    const c = setup();
    expect(c.form.invalid).toBe(true);
    expect(c.submitted()).toBe(false);
  });

  it('valida nombre, email y aceptación de la privacidad; el mensaje es opcional', () => {
    const c = setup();
    c.form.patchValue({ name: 'A', email: 'no-es-email', message: '', privacy: false });
    expect(c.form.controls['name'].invalid).toBe(true);
    expect(c.form.controls['email'].invalid).toBe(true);
    expect(c.form.controls['privacy'].invalid).toBe(true);
    expect(c.form.controls['message'].valid).toBe(true);
  });

  it('no envía nada si el formulario es inválido', () => {
    const c = setup();
    c.submit();
    http.expectNone('/api/leads');
    expect(c.submitted()).toBe(false);
  });

  it('envía la solicitud sin el check de privacidad y resetea el formulario', () => {
    const c = setup();
    c.form.patchValue(VALID);
    expect(c.form.valid).toBe(true);

    c.submit();
    expect(c.sending()).toBe(true);

    const req = http.expectOne('/api/leads');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Ana',
      email: 'ana@empresa.com',
      company: 'ACME',
      plan: 'pro',
      platform: '',
      catalog_size: '',
      message: 'Hola, me gustaría probar Star4cast.',
      website: '',
    });
    req.flush({ status: 'ok' }, { status: 202, statusText: 'Accepted' });

    expect(c.submitted()).toBe(true);
    expect(c.sending()).toBe(false);
    expect(c.form.getRawValue().name).toBe('');
  });

  it('muestra un error y no marca como enviado si el servidor falla', () => {
    const c = setup();
    c.form.patchValue(VALID);
    c.submit();

    http.expectOne('/api/leads').flush(null, { status: 500, statusText: 'Server Error' });

    expect(c.submitted()).toBe(false);
    expect(c.sending()).toBe(false);
    expect(c.errorMsg()).toContain('hola@star4cast.es');
  });

  it('preselecciona el plan que llega desde /pricing (?plan=)', () => {
    expect(setup({ plan: 'business' }).form.controls['plan'].value).toBe('business');
  });

  it('ignora un plan desconocido en la URL', () => {
    expect(setup({ plan: 'inventado' }).form.controls['plan'].value).toBe('');
  });
});
