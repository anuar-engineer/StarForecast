import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CookieConsent } from './layout/cookie-consent/cookie-consent';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CookieConsent],
  template: '<router-outlet /><app-cookie-consent />',
})
export class App {}
