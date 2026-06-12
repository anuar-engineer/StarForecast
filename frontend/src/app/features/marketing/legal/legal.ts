import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { LEGAL_DOCS, type LegalDoc } from './legal-data';

@Component({
  selector: 'app-legal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe],
  templateUrl: './legal.html',
})
export class Legal {
  private readonly seo = inject(SeoService);

  /** Documento a mostrar; viene de la `data` de la ruta. */
  readonly doc = input.required<keyof typeof LEGAL_DOCS>();

  protected readonly content = computed<LegalDoc>(() => LEGAL_DOCS[this.doc()]);

  constructor() {
    effect(() => {
      const c = this.content();
      this.seo.update({
        title: c.title,
        description: c.description,
        path: c.path,
      });
    });
  }
}
