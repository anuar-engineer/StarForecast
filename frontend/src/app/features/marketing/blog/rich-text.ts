import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { findPost } from './blog-data';

/** Trozo de texto de un bloque, con enlace interno opcional. */
export interface TextSegment {
  readonly text: string;
  readonly path?: string;
  readonly fragment?: string;
}

const LINK_RE = /\[([^\]]+)\]\((\/[^)\s#]*)(?:#([^)\s]+))?\)/g;

/**
 * Convierte la sintaxis `[texto](/ruta#ancla)` de los artículos en segmentos.
 * Solo admite rutas internas. Un enlace a un artículo que todavía no está
 * publicado se deja como texto plano, para no generar enlaces rotos (404)
 * hasta que el artículo destino salga.
 */
export function parseInlineLinks(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [raw, label, path, fragment] = m;
    if (m.index > last) segments.push({ text: text.slice(last, m.index) });
    const blogSlug = path.match(/^\/blog\/([^/]+)$/)?.[1];
    const linkable = !blogSlug || findPost(blogSlug) !== undefined;
    segments.push(linkable ? { text: label, path, fragment } : { text: label });
    last = m.index + raw.length;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return segments;
}

/** Pinta el texto de un bloque del blog con sus enlaces internos. */
@Component({
  selector: '[appRichText]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `@for (s of segments(); track $index) {@if (s.path) {<a [routerLink]="s.path" [fragment]="s.fragment" class="font-medium text-accent-300 underline decoration-accent-400/30 underline-offset-4 transition hover:decoration-accent-300">{{ s.text }}</a>} @else {<ng-container>{{ s.text }}</ng-container>}}`,
})
export class RichText {
  readonly appRichText = input.required<string>();

  protected readonly segments = computed(() => parseInlineLinks(this.appRichText()));
}
